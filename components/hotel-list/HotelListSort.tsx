import React, { useEffect, useState } from 'react'
import { Radio } from 'antd'
import { IconClose } from '../../constants/icons'
import * as queryString from 'query-string'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toggleClassNoScroll } from '../../utils/common'
import { setOpenSortMobile } from '../../store/hotel/action'
import { HOTEL_SORT } from '../../constants/hotel'
import { PATH_HOTEL_SEARCH } from '../../constants/common'
import ChangeModePriceOneNight from '../common/ChangeModePriceOneNight'
import { genLinkHotelList } from '../../utils/hotel'

interface Props {
    totalHotel?: number
    isDomestic: boolean
    nights: number
}

const HotelListSort: React.FC<Props> = ({ totalHotel, isDomestic, nights }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel'])
    const router = useRouter()
    const isOpenSortMobile = useSelector((state: any) => state.hotel.isOpenSortMobile)
    const [sortBy, setSortBy] = useState<string>('')
    const [sortMode, setSortMode] = useState<string>('')

    // get sortBy, sortMode from url
    useEffect(() => {
        setSortBy(router?.query?.sort_by ? router?.query?.sort_by.toString() : '')
        setSortMode(router?.query?.sort_mode ? router?.query?.sort_mode.toString() : '')
    }, [router.query.sort_by, router.query.sort_mode])

    const closeSortMobile = () => {
        dispatch(setOpenSortMobile(false))
        toggleClassNoScroll('remove')
    }

    const handleChangeSort = (value: string) => {
        const [sort_by, sort_mode] = value.split('_')
        const new_query: any = { ...router.query }
        sort_mode ? (new_query.sort_mode = sort_mode) : delete new_query.sort_mode
        sort_by ? (new_query.sort_by = sort_by) : delete new_query.sort_by
        router.push(genLinkHotelList(new_query), undefined, { shallow: true })
        closeSortMobile()
    }

    return (
        <div className={`hotelSort ${isOpenSortMobile ? 'open' : ''}`}>
            <div
                role={'button'}
                tabIndex={0}
                className="hotelSort__backdrop"
                onClick={closeSortMobile}
                onKeyUp={closeSortMobile}
            />

            <div className="hotelSort__main">
                <div className="headerPopup">
                    <p>{t('Sắp xếp')}</p>
                    <button type="button" className="headerPopup__close" onClick={closeSortMobile}>
                        <IconClose />
                    </button>
                </div>
                <div className="hotelSort__cont">
                    <div className="hotelSort__flex">
                        {typeof totalHotel !== 'undefined' && (
                            <p className="semibold size-16 mb0 pTitle">
                                {totalHotel} {t(totalHotel > 1 ? 'hotel:khách sạns' : 'hotel:khách sạn')}
                            </p>
                        )}
                        <Radio.Group
                            className="hotelSort__group"
                            value={`${sortBy}_${sortMode}`}
                            onChange={(event) => handleChangeSort(event.target.value)}
                        >
                            {HOTEL_SORT.map((item) => {
                                if (!isDomestic && item.sort_by === 'review') return null
                                return (
                                    <Radio
                                        key={`${item.sort_by}_${item.sort_mode}`}
                                        name={'groupHotelSort'}
                                        value={`${item.sort_by}_${item.sort_mode}`}
                                    >
                                        {t(`hotel:${item.label}`)}
                                    </Radio>
                                )
                            })}
                        </Radio.Group>
                        <div className="hotelSort__price">
                            <ChangeModePriceOneNight nights={nights} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelListSort
