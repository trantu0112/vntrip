import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { IconDateHunt, IconInputHotel } from '../../constants/icons'
import { setOpenSearchBoxHunt, setValidateAutoComplete } from '../../store/common/action'
import { useDispatch, useSelector } from 'react-redux'
import { userQueryCheckInDate } from '../../utils/custom-hook'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
    LIST_PROVINCE__HUNT,
    PATH_HOTEL_HUNT,
    PATH_HOTEL_SEARCH,
    LIST_CITY_HUNT,
    YYYYMMDD,
} from '../../constants/common'
import { getHotelDetailLink, handleCalendarChange } from '../../utils/hotel'
import VntAutoComplete from './VntAutoComplete'
import DateRangeHotel from './DateRangeHotel'

interface Props {
    isShow?: boolean
}

const SearchBoxHotelHunt: React.FC<Props> = React.memo(({ isShow }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel'])
    const [triggerOpenDate, setTriggerOpenDate] = useState<number>(0)
    const inputRef = useRef<any>(null) // this input use both mobile and desktop
    const { checkInDateInUrl, nightsInUrl } = userQueryCheckInDate() // get checkIn, nights from url
    const [checkInDate, setCheckInDate] = useState<string>(moment().format(YYYYMMDD))
    const [nights, setNights] = useState<number>(1)
    const { searchData, regions, hotels, inputValue } = useSelector((state: any) => {
        return {
            searchData: state.common.searchData,
            regions: state.common.listRegionsSearchBox || [],
            hotels: state.common.listHotelsSearchBox || [],
            inputValue: state.common.inputValue || '',
        }
    })

    // set checkInDate, nights when url change
    useEffect(() => {
        setCheckInDate(checkInDateInUrl)
        setNights(nightsInUrl)
    }, [checkInDateInUrl, nightsInUrl])

    const onClickSearchBox = () => {
        inputRef.current.input.click()
        inputRef.current.input.focus()
        dispatch(setOpenSearchBoxHunt(true))
    }

    // handle open datepicker (click mask)
    const onOpenDatePicker = () => {
        setTriggerOpenDate(+new Date())
        dispatch(setOpenSearchBoxHunt(true))
    }

    const handleSubmit = () => {
        const type = searchData?.type || 'region'
        const seo_url = searchData?.seo_url || router.query.keyword
        const countrycode = searchData?.countrycode
        const regionid = searchData?.regionid
        const regionname = searchData?.regionname
        const regiontype = searchData?.regiontype
        const isDomestic = countrycode === 'VN'
        const queryObj: any = {
            checkInDate: checkInDate,
            nights: nights,
        }

        if (!searchData) {
            if (!inputValue) {
                dispatch(setValidateAutoComplete({ status: 'error', text: t('notification:Vui lòng chọn địa điểm') }))
                return
            }
            if (regions.length === 0 && hotels.length === 0) {
                dispatch(setValidateAutoComplete({ status: 'error', text: t('notification:Không tìm thấy kết quả') }))
                return
            }
        }
        if (type === 'region') {
            if (isDomestic) {
                if (
                    (LIST_PROVINCE__HUNT.includes(regionid * 1) && regiontype === 'vntrip province') ||
                    (LIST_CITY_HUNT.includes(regionid * 1) && regiontype === 'vntrip city')
                ) {
                    router.push({
                        pathname: `${PATH_HOTEL_HUNT}/${seo_url}`,
                        query: queryObj,
                    })
                } else {
                    queryObj.keyword = seo_url
                    router.push({
                        pathname: PATH_HOTEL_SEARCH,
                        query: queryObj,
                    })
                }
            } else {
                // tim kiem ksqt
                if (router.query.view && String(router.query.view).toLowerCase() === 'map') {
                    queryObj.view = 'map'
                }
                queryObj.keyword = regionname
                queryObj.countryCode = countrycode
                queryObj.regionId = regionid
                router.push({
                    pathname: PATH_HOTEL_SEARCH,
                    query: queryObj,
                })
            }
        } else {
            // type : 'hotel'
            const hotel_name = searchData?.hotel_name
            const hotel_id = searchData?.hotel_id
            router.push({
                pathname: getHotelDetailLink({
                    hotelId: Number(hotel_id),
                    hotelName: hotel_name,
                    countryCode: countrycode,
                    onlyReturnPath: true,
                }),
                query: queryObj,
            })
        }
    }

    return (
        <div className={`searchBox__hotel ${isShow ? 'open' : ''}`}>
            <div className="searchBox__cont">
                <div className="searchBox__item">
                    <div className="searchBox__input">
                        <IconInputHotel />
                        <VntAutoComplete inputRef={inputRef} />
                        <div
                            className="searchBox__click"
                            onClick={onClickSearchBox}
                            onKeyUp={onClickSearchBox}
                            role={'button'}
                            tabIndex={0}
                        />
                    </div>
                </div>
                <div className="searchBox__item">
                    <div className="searchBox__date">
                        <div className="searchBox__input">
                            <IconDateHunt />

                            <DateRangeHotel
                                isHunt={true}
                                triggerOpen={triggerOpenDate}
                                checkInDate={checkInDate}
                                nights={nights}
                                onCalendarChange={handleCalendarChange(setCheckInDate, setNights)}
                            />
                            <div
                                className="searchBox__click"
                                onClick={onOpenDatePicker}
                                onKeyUp={onOpenDatePicker}
                                role={'button'}
                                tabIndex={0}
                            />
                        </div>
                        <div className="searchBox__nights">
                            <span>
                                {nights} {t(nights > 1 ? 'đêms' : 'đêm')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="searchBox__btn">
                <button type="button" className="btn btn_orange btn_lg" onClick={handleSubmit}>
                    <span>{t('common:Săn ngay')}</span>
                </button>
            </div>
        </div>
    )
})

export default SearchBoxHotelHunt
