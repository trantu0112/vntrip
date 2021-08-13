import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { IconClose } from '../../constants/icons'
import { DEFAULT_DESTINATION } from '../../constants/hotel'
import { DEFAULT_VALIDATION } from '../../constants/common'
import { isMobileScreen } from '../../utils/common'
import { suggestionV2, parseSeoCode } from '../../api/search-engine-services'
import {
    setSearchData,
    setInputValue,
    setValidateAutoComplete,
    setListRegionSearchBox,
    setListHotelSearchBox,
} from '../../store/common/action'
import RenderSearchResult from './RenderSearchResult'

interface Props {
    inputRef: any
}

const VntAutoComplete: React.FC<Props> = React.memo(({ inputRef }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t, i18n } = useTranslation(['hotel', 'common'])
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)
    const [indexType, setIndexType] = useState<'region' | 'hotel'>('region')
    const [indexRegion, setIndexRegion] = useState<number>(0)
    const [indexHotel, setIndexHotel] = useState<number>(0)
    const regionsRef = useRef<any>(null)
    const hotelsRef = useRef<any>(null)
    const dropdownRef = useRef<any>(null)
    const inputMobileRef = useRef<any>(null) // only for mobile
    const typingRef = useRef<any>(null)
    const { validateAutoComplete, regions, hotels, inputValue } = useSelector((state: any) => {
        return {
            validateAutoComplete: state.common.validateAutoComplete || DEFAULT_VALIDATION,
            regions: state.common.listRegionsSearchBox || [],
            hotels: state.common.listHotelsSearchBox || [],
            inputValue: state.common.inputValue || '',
        }
    })

    // parse seo_code from open url
    // @ts-ignore
    useEffect(() => {
        let isMount = true
        const fetchDataParseCode = async (seo_code: string) => {
            if (seo_code && !inputValue) {
                // hotel domestic
                const res = await parseSeoCode(seo_code)
                const value_input = res.area_name || res.city_name || res.province_name || ''
                if (isMount) {
                    dispatch(setInputValue(value_input))
                    dispatch(
                        setSearchData({
                            type: 'region',
                            regionname: value_input || '',
                            regionname_vi: value_input || '',
                            seo_url: seo_code,
                            countrycode: 'VN',
                        })
                    )
                }
            }
        }

        const keyword = router.query.keyword
            ? router.query.keyword.toString()
            : Array.isArray(router.query.slug)
            ? router.query.slug.join('/')
            : ''
        const countryCode = router.query.countryCode ? router.query.countryCode.toString() : ''
        const regionId = router.query.regionId ? Number(router.query.regionId) : 0
        if (keyword && countryCode && countryCode.toUpperCase() !== 'VN') {
            dispatch(setInputValue(keyword))
            dispatch(
                setSearchData({
                    type: 'region',
                    regionname: keyword,
                    regionname_vi: keyword,
                    countrycode: countryCode,
                    regionid: regionId,
                })
            )
        } else if (keyword) {
            fetchDataParseCode(keyword)
        }
        return () => (isMount = false)
    }, [router.query])

    /* HANDLE CLICK OUTSIDE SUGGESTION BOX */
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClickDropdown)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickDropdown)
        }
    }, [])

    /* HANDLE EVENT REGION */
    const handleClickDropdown = (event: any) => {
        if (dropdownRef.current.contains(event.target)) {
            // inside click
            return
        }
        // outside click
        setIsOpenDropDown(false) // close dropdown
    }

    // handle when focus autocomplete
    const handleClickInput = (keyword: string) => {
        if (keyword.length === 0 && regions.length === 0) {
            dispatch(setListRegionSearchBox(DEFAULT_DESTINATION))
            if (!isOpenDropDown) setIsOpenDropDown(true) // open dropdown
        } else if (keyword.length > 0 && regions.length === 0 && hotels.length === 0) {
            handleChangeInput(keyword)
        } else {
            if (!isOpenDropDown) setIsOpenDropDown(true) // open dropdown
        }
        if (typeof window !== 'undefined' && isMobileScreen()) {
            inputRef.current.blur()
            inputMobileRef.current.focus()
        }
    }

    // handle when search autocomplete: applied debounce
    const handleChangeInput = async (keyword: string) => {
        dispatch(setInputValue(keyword))
        dispatch(setSearchData(null))
        dispatch(setValidateAutoComplete(DEFAULT_VALIDATION))
        if (!isOpenDropDown) setIsOpenDropDown(true)

        // clear timeout
        if (typingRef.current) {
            clearTimeout(typingRef.current)
        }

        typingRef.current = setTimeout(() => {
            callApiSuggestion(keyword)
        }, 300)

        if (keyword.length === 0) {
            dispatch(setListRegionSearchBox(DEFAULT_DESTINATION))
            dispatch(setListHotelSearchBox([]))
            setIndexRegion(0)
        }
    }

    const callApiSuggestion = async (keyword: string) => {
        try {
            if (keyword.length >= 2) {
                const res = await suggestionV2(keyword)
                if (res.status === 'success') {
                    const _regions = res.data.regions.slice(0, 5)
                    const _hotels = res.data.hotels.slice(0, 10)
                    dispatch(setListRegionSearchBox(_regions))
                    dispatch(setListHotelSearchBox(_hotels))
                    setIndexRegion(0)
                }
            }
        } catch (e) {
            throw e
        }
    }

    // handle when select one item autocomplete
    const handleSelectedItem = (selected: any) => {
        dispatch(setValidateAutoComplete(DEFAULT_VALIDATION))
        const { type, seo_url, regionname, regionname_vi, name, id, regionid, countrycode, regiontype } = selected

        if (type === 'region') {
            setIndexRegion(selected.index)
            setIndexType('region')
            dispatch(setInputValue(i18n.language === 'vi' ? regionname_vi : regionname))
            dispatch(
                setSearchData({
                    type,
                    regionname,
                    regionname_vi,
                    seo_url,
                    countrycode,
                    regionid,
                    regiontype,
                })
            )
        } else if (type === 'hotel') {
            setIndexHotel(selected.index)
            setIndexType('hotel')
            dispatch(setInputValue(selected.name))
            dispatch(
                setSearchData({
                    type,
                    hotel_id: id,
                    hotel_name: name,
                    countrycode,
                    regionid,
                    regiontype,
                })
            )
        }
        setIsOpenDropDown(false) // close drowpdown
    }

    const handlePressEnter = () => {
        let selected: any = null
        if (indexType === 'region' && regions.length > 0) {
            selected = { ...regions[indexRegion], type: 'region', index: indexRegion }
        } else if (indexType === 'hotel' && hotels.length > 0) {
            selected = { ...hotels[indexHotel], type: 'hotel', index: indexHotel }
        }
        if (selected) handleSelectedItem(selected)
    }

    const toggleSearchMobile = (isOpen: boolean) => {
        setIsOpenDropDown(isOpen)
    }

    const scrollIntoView = (element: any, position: any) => {
        if (element) {
            element.parentNode.scrollTo({
                top: position,
                behavior: 'smooth',
            })
        }
    }

    useEffect(() => {
        if (regions.length > 0) {
            const listItems: any = Array.from(regionsRef?.current?.children)
            listItems[indexRegion] && scrollIntoView(regionsRef.current, listItems[indexRegion].offsetTop)
        }
        if (hotels.length > 0) {
            const listItems: any = Array.from(hotelsRef?.current?.children)
            listItems[indexHotel] && scrollIntoView(hotelsRef.current, listItems[indexHotel].offsetTop)
        }
    }, [indexRegion, indexHotel])

    const keyboardNavigation = (key: string) => {
        const maxIndexRegion = regions.length - 1
        const maxIndexHotel = hotels.length - 1
        if (key === 'ArrowDown') {
            if (indexType === 'region') {
                setIndexRegion((prevState) => {
                    if (prevState === maxIndexRegion) {
                        if (hotels.length > 0) {
                            setIndexType('hotel')
                            setIndexHotel(0)
                            return 0
                        }
                        return 0
                    }
                    return prevState + 1
                })
            } else {
                setIndexHotel((prevState) => {
                    if (prevState === maxIndexHotel) {
                        setIndexType('region')
                        setIndexRegion(0)
                        return 0
                    }
                    return prevState + 1
                })
            }
        }
        if (key === 'ArrowUp') {
            if (indexType === 'region') {
                setIndexRegion((prevState) => {
                    if (prevState === 0) {
                        return 0
                    }
                    return prevState - 1
                })
            } else {
                setIndexHotel((prevState) => {
                    if (prevState === 0) {
                        setIndexType('region')
                        setIndexRegion(maxIndexRegion)
                        return 0
                    }
                    return prevState - 1
                })
            }
        }
        if (key === 'Escape') {
            setIsOpenDropDown(false)
        }
    }

    return (
        <div className="placeInput">
            <p>{t('Thành phố, địa điểm hoặc tên khách sạn')}</p>
            <div className="inputInline">
                <Form.Item validateStatus={validateAutoComplete.status} help={validateAutoComplete.text}>
                    <Input
                        size={'large'}
                        placeholder={t('hotel:Nhập điểm đến, khách sạn')}
                        suffix={<SearchOutlined />}
                        onClick={() => handleClickInput(inputValue)}
                        onChange={(event) => handleChangeInput(event.target.value)}
                        value={inputValue}
                        ref={inputRef}
                        onPressEnter={handlePressEnter}
                        onKeyDown={(event) => keyboardNavigation(event.key)}
                    />
                </Form.Item>
            </div>
            {/* start for mobile  */}
            <div className={`suggestDefault ${isOpenDropDown ? 'open' : ''}`} ref={dropdownRef}>
                <div className="suggestDefault__header">
                    <div className="suggestDefault__input">
                        {/*<input type="text" placeholder="Thành phố, địa điểm, khách sạn" className="form-control" />*/}
                        <Input
                            className="form-control"
                            placeholder={t('hotel:Nhập điểm đến, khách sạn')}
                            onClick={() => handleClickInput(inputValue)}
                            onChange={(event) => handleChangeInput(event.target.value)}
                            value={inputValue}
                            ref={inputMobileRef}
                            onPressEnter={handlePressEnter}
                        />
                    </div>
                    <button type="button" className="suggestDefault__close" onClick={() => toggleSearchMobile(false)}>
                        <IconClose />
                    </button>
                </div>
                <div className="suggestDefault__body">
                    {/*<RecentSearch />*/}
                    <RenderSearchResult
                        regions={regions}
                        hotels={hotels}
                        handleSelectedItem={handleSelectedItem}
                        regionsRef={regionsRef}
                        hotelsRef={hotelsRef}
                        indexType={indexType}
                        indexRegion={indexRegion}
                        indexHotel={indexHotel}
                    />
                </div>
            </div>
            {/* end for mobile  */}
        </div>
    )
})

export default VntAutoComplete
