import React, { useEffect, useRef, useState } from 'react'
import moment, { Moment } from 'moment'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { userQueryCheckInDate } from '../../utils/custom-hook'
import { useDispatch, useSelector } from 'react-redux'
import { setValidateAutoComplete } from '../../store/common/action'
import { getHotelDetailLink, handleCalendarChange } from '../../utils/hotel'
import {
    LIST_CITY_HUNT,
    LIST_PROVINCE__HUNT,
    PATH_HOTEL_HUNT,
    PATH_HOTEL_SEARCH,
    YYYYMMDD,
} from '../../constants/common'
import VntAutoComplete from './VntAutoComplete'
import DateRangeHotel from './DateRangeHotel'
import { toggleClassNoScroll } from '../../utils/common'
import { toggleSearchBoxMobile } from '../../store/hotel/action'

interface Props {
    isShow?: boolean
}

const SearchBoxHotel: React.FC<Props> = React.memo(({ isShow }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel', 'common', 'notification'])
    const inputRef = useRef<any>(null) // this input use both mobile and desktop
    const { checkInDateInUrl, nightsInUrl } = userQueryCheckInDate() // get checkIn, nights from url
    const [checkInDatePicker, setCheckInDatePicker] = useState<string>(moment().format(YYYYMMDD))
    const [nightsPicker, setNightsPicker] = useState<number>(1)
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
        setCheckInDatePicker(checkInDateInUrl)
        setNightsPicker(nightsInUrl)
    }, [checkInDateInUrl, nightsInUrl])

    const handleSubmit = () => {
        const pathname = router.pathname
        const type = searchData?.type || 'region'
        const seo_url = searchData?.seo_url || router.query.keyword
        const countrycode = searchData?.countrycode
        const regionid = searchData?.regionid
        const regionname = searchData?.regionname
        const regiontype = searchData?.regiontype
        const isDomestic = countrycode === 'VN'
        const queryObj: any = {
            checkInDate: checkInDatePicker,
            nights: nightsPicker,
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
        toggleClassNoScroll('remove')
        dispatch(toggleSearchBoxMobile(false))
        if (type === 'region') {
            if (pathname.startsWith('/san-khach-san-gia-tot-nhat/')) {
                // nếu search từ trang săn giá rẻ thì khi search thì search theo săn giá rẻ còn không thì search khách sạn thường
                if (
                    (LIST_PROVINCE__HUNT.includes(regionid * 1) && regiontype === 'vntrip province') ||
                    (LIST_CITY_HUNT.includes(regionid * 1) && regiontype === 'vntrip city')
                ) {
                    router.push({
                        pathname: `${PATH_HOTEL_HUNT}/${seo_url}`,
                        query: queryObj,
                    })
                } else {
                    if (isDomestic) {
                        queryObj.keyword = seo_url
                    } else {
                        // tim kiem ksqt
                        queryObj.keyword = regionname
                        queryObj.countryCode = countrycode
                        queryObj.regionId = regionid
                    }
                    router.push({
                        pathname: PATH_HOTEL_SEARCH,
                        query: queryObj,
                    })
                }
            } else {
                // search khách sạn thường
                if (router.query.view && String(router.query.view).toLowerCase() === 'map') {
                    queryObj.view = 'map'
                }
                if (isDomestic) {
                    queryObj.keyword = seo_url
                } else {
                    // tim kiem ksqt
                    queryObj.keyword = regionname
                    queryObj.countryCode = countrycode
                    queryObj.regionId = regionid
                }
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
        <div className={`vntSearch__hotel ${isShow ? 'open' : ''}`}>
            <div className="vntSearch__flex">
                <VntAutoComplete inputRef={inputRef} />
                <DateRangeHotel
                    isHunt={false}
                    checkInDate={checkInDatePicker}
                    nights={nightsPicker}
                    onCalendarChange={(
                        dates: [Moment, Moment],
                        dateStrings: [string, string],
                        info: { range: 'start' | 'end' }
                    ) => handleCalendarChange(setCheckInDatePicker, setNightsPicker)(dates, dateStrings, info)}
                />

                <div className="vntSearch__btn">
                    <Button type="primary" className={'w100'} size={'large'} onClick={handleSubmit}>
                        {t('common:Tìm kiếm')}
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default SearchBoxHotel
