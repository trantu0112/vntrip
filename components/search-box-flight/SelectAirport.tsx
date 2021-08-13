import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { IconClose } from '../../constants/icons'
import { getListAirports } from '../../api/flight-services'
import { AIRPORT_DEFAULT_VN } from '../../constants/airport-config'
import { DEFAULT_VALIDATION } from '../../constants/common'
import { setOriginCode, setDestinCode, setValidateOrigin, setValidateDestin } from '../../store/flight/action'
import { isMobileScreen } from '../../utils/common'
import { convertAirportCodeToCityName } from '../../utils/flight'

interface Props {
    isOrigin: boolean
    code: string
}

const SelectAirport: React.FC<Props> = React.memo(({ isOrigin, code }) => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation('flight')
    const { originCode, destinCode, validateOrigin, validateDestin } = useSelector((state: any) => {
        return {
            originCode: state.flight.originCode,
            destinCode: state.flight.destinCode,
            validateOrigin: state.flight.validateOrigin || DEFAULT_VALIDATION,
            validateDestin: state.flight.validateDestin || DEFAULT_VALIDATION,
        }
    })
    const [inputValue, setInputValue] = useState<string>('')
    const [isOpenSu, setIsOpenSu] = useState<boolean>(false) // su = suggestion
    const [isOpenDe, setIsOpenDe] = useState<boolean>(false) // de = default
    const [suggestedAirports, setSuggestedAirports] = useState<any[]>([])
    const [defaultAirports, setDefaultAirports] = useState<any[]>([])
    const [indexRegionAir, setIndexRegionAir] = useState<number>(0)
    const inputRef = useRef<any>(null) // this input use both mobile and desktop
    const inputMobileRef = useRef<any>(null) // only for mobile
    const dropdownRef = useRef<any>(null)

    const validateInput = isOrigin ? validateOrigin : validateDestin

    useEffect(() => {
        if (code) {
            const cityName = convertAirportCodeToCityName(code)
            setInputValue(`${cityName} (${code})`)
        }
    }, [code])

    useEffect(() => {
        const list_air_default = AIRPORT_DEFAULT_VN.find((item) => item.key === i18n.language)
        if (list_air_default) {
            setDefaultAirports(list_air_default.datas)
        }
    }, [i18n.language])

    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClickDropdown)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickDropdown)
        }
    }, [])

    const handleClickDropdown = (event: any) => {
        if (dropdownRef.current.contains(event.target)) {
            // inside click
            return
        }
        // outside click
        setIsOpenSu(false) // close dropdown
        setIsOpenDe(false) // close dropdown
    }

    const handleClickInput = () => {
        setIsOpenDe(true)
        dispatch(isOrigin ? setValidateOrigin(DEFAULT_VALIDATION) : setValidateDestin(DEFAULT_VALIDATION))
        if (typeof window !== 'undefined' && isMobileScreen()) {
            inputRef.current.blur()
            inputMobileRef.current.focus()
        }
    }

    const handleChangeInput = async (keyword: string) => {
        setInputValue(keyword)
        keyword.length === 0 ? dispatch(isOrigin ? setOriginCode(keyword) : setDestinCode(keyword)) : ''
        if (keyword.length >= 2) {
            try {
                const results = await getListAirports({ keyword, page: 1, page_size: 100 })
                if (results.status === 200) {
                    const data = results.data
                    setSuggestedAirports(data)
                    if (data.length > 0) {
                        setIsOpenSu(true)
                        setIsOpenDe(false)
                    }
                }
            } catch (e) {
                throw e
            }
        }
    }

    const handleSelectRegion = (index: number) => () => {
        setIndexRegionAir(index)
    }

    const handleCloseDropdownMobile = () => {
        setIsOpenDe(false)
        setIsOpenSu(false)
    }

    const handleSelectAirport = (airport: any) => () => {
        // airport from default has key "code", "cityName", airport from suggestion has key "airportCode", "cityNameVi"
        const code = airport.code || airport.airportCode
        // const cityName = airport.cityName || airport.cityNameVi
        isOrigin ? dispatch(setOriginCode(code)) : dispatch(setDestinCode(code))
        // setInputValue(`${cityName} (${code})`)
        setIsOpenSu(false) // close dropdown suggestion
        setIsOpenDe(false) // close dropdown default
    }

    const renderDefaultAirport = ({ subData, dataGeoCode }: any) => {
        let _listAp = [...dataGeoCode]
        if (subData.length > 0) {
            _listAp = subData.flatMap((sub: any) => {
                return sub.dataGeoCode
            })
        }
        // const list_code = Array.isArray(flightList) ? flightList.map(item => item.startPoint) : []
        const already_selected_code: any[] = [originCode, destinCode]
        return _listAp.map((item, index) => {
            return (
                <li key={index} className={already_selected_code.includes(item.code) ? 'vntDisabled' : ''}>
                    <button type="button" onClick={handleSelectAirport(item)}>
                        {item.cityName} ({item.code})
                    </button>
                </li>
            )
        })
    }

    return (
        <div className="placeInput flightOrigin">
            <p>{t(isOrigin ? 'Điểm khởi hành' : 'Điểm đến')}</p>
            <div className="inputInline">
                <Form.Item validateStatus={validateInput.status} help={validateInput.text}>
                    <Input
                        placeholder={t(isOrigin ? 'Điểm khởi hành' : 'Điểm đến')}
                        size={'large'}
                        suffix={<SearchOutlined />}
                        ref={inputRef}
                        value={inputValue}
                        onClick={handleClickInput}
                        onChange={(event: any) => handleChangeInput(event.target.value)}
                        id={isOrigin ? 'inputOrigin' : 'inputDestin'}
                        autoComplete={'off'}
                    />
                </Form.Item>
            </div>
            <div className={`suggestDefault ${isOpenSu || isOpenDe ? 'open' : ''}`} ref={dropdownRef}>
                <div className="suggestDefault__header">
                    <div className="suggestDefault__input">
                        <Form.Item validateStatus={validateInput.status} help={validateInput.text}>
                            <Input
                                placeholder={t(isOrigin ? 'Điểm khởi hành' : 'Điểm đến')}
                                size={'large'}
                                suffix={<SearchOutlined />}
                                ref={inputMobileRef}
                                value={inputValue}
                                onClick={handleClickInput}
                                onChange={(event: any) => handleChangeInput(event.target.value)}
                                autoComplete={'off'}
                            />
                        </Form.Item>
                    </div>
                    <button type="button" className="suggestDefault__close" onClick={handleCloseDropdownMobile}>
                        <IconClose />
                    </button>
                </div>
                <div className="suggestDefault__body">
                    <div className={`flightDefault ${isOpenDe ? '' : 'hidden'}`}>
                        {/*<div className="flightDefault__header">*/}
                        {/*    <h5>{t('Chọn điểm đi')}:</h5>*/}
                        {/*</div>*/}
                        <div className="flightDefault__body">
                            <ul className="flightDefault__tab">
                                {Array.isArray(defaultAirports) &&
                                    defaultAirports.length > 0 &&
                                    defaultAirports.map((item, index) => {
                                        return (
                                            <li
                                                className={`${indexRegionAir === index ? 'active' : ''}`}
                                                key={item.title}
                                            >
                                                <button type="button" onClick={handleSelectRegion(index)}>
                                                    {item.title}
                                                </button>
                                            </li>
                                        )
                                    })}
                            </ul>
                            <div className="flightDefault__content">
                                <ul className="flightDefault__list">
                                    {Array.isArray(defaultAirports) &&
                                        defaultAirports[indexRegionAir] &&
                                        renderDefaultAirport(defaultAirports[indexRegionAir])}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className={`listPlace ${isOpenSu ? '' : 'hidden'}`}>
                        {Array.isArray(suggestedAirports) &&
                            suggestedAirports.map((air) => {
                                return (
                                    <li
                                        key={air.id}
                                        className={`listPlace__item ${air.is_disable ? 'vnt-disable' : ''}`}
                                    >
                                        <button type="button" onClick={handleSelectAirport(air)}>
                                            <div className="listPlace__text">
                                                <p className="p1">
                                                    {air.airportCode} - {air['airportNameVi']}
                                                </p>
                                                <p className="p2">{air.cityNameVi + ', ' + air.countryNameVi}</p>
                                            </div>
                                        </button>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>
        </div>
    )
})

export default SelectAirport
