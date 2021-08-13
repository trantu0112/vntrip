import React, { useState, useEffect } from 'react'
import * as queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'antd'
import { IconClose } from '../../constants/icons'
import { HOTEL_FILTER } from '../../constants/enums'
import { HOTEL_FILTER_BY_PRICE, HOTEL_FILTER_STAR } from '../../constants/hotel'
import { PATH_HOTEL_SEARCH } from '../../constants/common'
import { setOpenFilterMobile } from '../../store/hotel/action'
import { toggleClassNoScroll } from '../../utils/common'
import RenderStarRate from './RenderStarRate'
import CheckboxShowFinalPriceHotel from '../common/CheckboxShowFinalPriceHotel'
import { genLinkHotelList } from '../../utils/hotel'

interface Props {
    countByPrices?: any
    countByStars?: any
    countByCities?: any
    countByArea?: any
    countByFacilities?: any
    countByType?: any
    minPrice?: number
    maxPrice?: number
    isDomestic: boolean
}

const HotelListFilter: React.FC<Props> = ({
    countByStars,
    countByPrices,
    countByCities,
    countByArea,
    countByFacilities,
    countByType,
    isDomestic,
}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['common', 'hotel'])
    const isOpenFilterMobile = useSelector((state: any) => state.hotel.isOpenFilterMobile)
    const [filterByPrice, setFilterByPrice] = useState<any[]>([])
    const [filterByStar, setFilterByStar] = useState<any[]>([])
    const [filterByCity, setFilterByCity] = useState<any[]>([])
    const [filterByArea, setFilterByArea] = useState<any[]>([])
    const [filterByFacility, setFilterByFacility] = useState<any[]>([])
    const [filterByType, setFilterByType] = useState<any[]>([])

    // handle price
    useEffect(() => {
        const array_query = router?.query[HOTEL_FILTER.FILTER_BY_PRICE]
            ? String(router.query[HOTEL_FILTER.FILTER_BY_PRICE]).split(',')
            : []
        const array_index = array_query.map((key) => HOTEL_FILTER_BY_PRICE.findIndex((item) => item.key === key))
        const min_index = Math.min.apply(null, array_index)
        const max_index = Math.max.apply(null, array_index)
        setFilterByPrice(
            HOTEL_FILTER_BY_PRICE.map((item: any, index) => {
                const count = countByPrices ? countByPrices[item.key] : 0
                // ksqt thì disable các checkbox ở giữa
                const checked = isDomestic ? array_index.includes(index) : min_index <= index && index <= max_index
                const disabled = isDomestic ? false : min_index < index && index < max_index
                return { ...item, checked, count, disabled }
            })
        )
    }, [countByPrices, router?.query[HOTEL_FILTER.FILTER_BY_PRICE], isDomestic])

    // handle star
    useEffect(() => {
        const array_query = router?.query[HOTEL_FILTER.FILTER_BY_STAR]
            ? String(router.query[HOTEL_FILTER.FILTER_BY_STAR]).split(',')
            : []
        const array_index = array_query.map((value) =>
            HOTEL_FILTER_STAR.findIndex((item) => item.value === Number(value))
        )
        const min_index = Math.min.apply(null, array_index)
        const max_index = Math.max.apply(null, array_index)
        setFilterByStar(
            HOTEL_FILTER_STAR.map((item: any, index) => {
                const count = countByStars ? countByStars[item.key] : 0
                // ksqt thì disable các checkbox ở giữa
                // const checked = array_query.includes(String(item.value))
                const checked = isDomestic ? array_index.includes(index) : min_index <= index && index <= max_index
                const disabled = isDomestic ? false : min_index < index && index < max_index
                return { ...item, checked, count, disabled }
            })
        )
    }, [countByStars, router?.query[HOTEL_FILTER.FILTER_BY_STAR], isDomestic])

    // handle area
    useEffect(() => {
        if (countByArea) {
            const array_query = router?.query[HOTEL_FILTER.FILTER_BY_AREA]
                ? String(router.query[HOTEL_FILTER.FILTER_BY_AREA]).split(',')
                : []
            const count_by_area = Object.values(countByArea).map((item: any) => {
                const checked = array_query.includes(String(item.id))
                const count = countByArea ? countByStars[item.id] : 0
                return { ...item, checked, count }
            })
            setFilterByArea(count_by_area)
        }
    }, [countByArea, router?.query[HOTEL_FILTER.FILTER_BY_AREA]])

    // handle city
    useEffect(() => {
        if (countByCities) {
            const array_query = router?.query[HOTEL_FILTER.FILTER_BY_CITY]
                ? String(router.query[HOTEL_FILTER.FILTER_BY_CITY]).split(',')
                : []
            const count_by_cities = Object.values(countByCities).map((item: any) => {
                const checked = array_query.includes(String(item.id))
                const count = countByArea ? countByStars[item.id] : 0
                return { ...item, checked, count }
            })
            setFilterByCity(count_by_cities)
        }
    }, [countByCities, router?.query[HOTEL_FILTER.FILTER_BY_CITY]])

    // handle facilities
    useEffect(() => {
        if (countByFacilities) {
            const array_query = router?.query[HOTEL_FILTER.FILTER_BY_FACILITY]
                ? String(router.query[HOTEL_FILTER.FILTER_BY_FACILITY]).split(',')
                : []
            const count_by_facilities = Object.values(countByFacilities)
                .slice(0, 10)
                .map((item: any) => {
                    const checked = array_query.includes(String(item.id))
                    const count = countByArea ? countByStars[item.id] : 0
                    return { ...item, checked, count }
                })
            setFilterByFacility(count_by_facilities)
        }
    }, [countByFacilities, router?.query[HOTEL_FILTER.FILTER_BY_FACILITY]])

    // handle type
    useEffect(() => {
        if (countByFacilities) {
            const array_query = router?.query[HOTEL_FILTER.FILTER_BY_TYPE]
                ? String(router.query[HOTEL_FILTER.FILTER_BY_TYPE]).split(',')
                : []
            const count_by_type = Object.values(countByType).map((item: any) => {
                const checked = array_query.includes(item.type)
                const count = countByArea ? countByStars[item.id] : 0
                return { ...item, checked, count }
            })
            setFilterByType(count_by_type)
        }
    }, [countByType, router?.query[HOTEL_FILTER.FILTER_BY_TYPE]])

    const handleChangeFilter = (type: string) => (checked: boolean) => (value: string) => {
        // handleChecked(type)(checked)(value)

        // handle redirect url
        // create an array filter_by_price,...
        let _array: string[] = router.query[type] ? String(router.query[type]).split(',') : []
        if (checked) {
            _array.push(value)
        } else {
            // unchecked => remove value filter from current array
            let index = _array.indexOf(value)
            if (index !== -1) _array.splice(index, 1)
        }
        // clone all query from old url, set [type] = null to skipNull
        const new_query: any = { ...router.query, [type]: _array.join(',') || null }
        delete new_query.page // reset page when filter
        router.push(genLinkHotelList(new_query), undefined, { shallow: true })
        // closeFilterMobile()
    }

    const handleResetFilter = () => {
        const new_query: any = { ...router.query }
        delete new_query[HOTEL_FILTER.FILTER_BY_PRICE]
        delete new_query[HOTEL_FILTER.FILTER_BY_MIN_PRICE]
        delete new_query[HOTEL_FILTER.FILTER_BY_MAX_PRICE]
        delete new_query[HOTEL_FILTER.FILTER_BY_STAR]
        delete new_query[HOTEL_FILTER.FILTER_BY_AREA]
        delete new_query[HOTEL_FILTER.FILTER_BY_CITY]
        delete new_query[HOTEL_FILTER.FILTER_BY_FACILITY]
        delete new_query[HOTEL_FILTER.FILTER_BY_TYPE]
        delete new_query.page // reset page when filter
        router.push(genLinkHotelList(new_query), undefined, { shallow: false })
    }

    const closeFilterMobile = () => {
        dispatch(setOpenFilterMobile(false))
        toggleClassNoScroll('remove')
    }

    return (
        <div className={`filterBox ${isOpenFilterMobile ? 'open' : ''}`}>
            <div className="headerPopup">
                <p>{t('Bộ lọc')}</p>
                <button type="button" className="headerPopup__close" onClick={closeFilterMobile}>
                    <IconClose />
                </button>
            </div>
            <div className="filterBox__body">
                <div className="filterBox__group">
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('Xem giá')}</p>
                        {/* <div className="filterBox__cont">
                            <CheckboxShowFinalPriceHotel />
                        </div> */}
                    </div>
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('hotel:Mức giá')}</p>
                        <div className="filterBox__cont">
                            {filterByPrice.map(({ key, checked, label, disabled }) => {
                                return (
                                    <div key={key} className="mb5">
                                        <Checkbox
                                            disabled={disabled}
                                            checked={checked}
                                            onChange={(event) =>
                                                handleChangeFilter(HOTEL_FILTER.FILTER_BY_PRICE)(event.target.checked)(
                                                    key
                                                )
                                            }
                                        >
                                            {t(`common:${label}`)}
                                        </Checkbox>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('hotel:Xếp hạng khách sạn')}</p>
                        <div className="filterBox__cont">
                            {filterByStar.map(({ value, checked, disabled }) => {
                                return (
                                    <div key={value} className="mb5">
                                        <Checkbox
                                            disabled={disabled}
                                            checked={checked}
                                            onChange={(event) =>
                                                handleChangeFilter(HOTEL_FILTER.FILTER_BY_STAR)(event.target.checked)(
                                                    String(value)
                                                )
                                            }
                                        >
                                            <RenderStarRate starRate={value} />
                                        </Checkbox>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* ---CITY--- */}
                    {isDomestic && filterByCity.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('hotel:Quận huyện')}</p>
                            <div className="filterBox__cont">
                                {filterByCity.map((item) => {
                                    return (
                                        <div key={item.id} className="mb5">
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={(event) =>
                                                    handleChangeFilter(HOTEL_FILTER.FILTER_BY_CITY)(
                                                        event.target.checked
                                                    )(String(item.id))
                                                }
                                            >
                                                {item.name}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* ---AREA--- */}
                    {isDomestic && filterByArea.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('hotel:Khu vực')}</p>
                            <div className="filterBox__cont">
                                {filterByArea.map((item) => {
                                    return (
                                        <div key={item.id} className="mb5">
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={(event) =>
                                                    handleChangeFilter(HOTEL_FILTER.FILTER_BY_AREA)(
                                                        event.target.checked
                                                    )(String(item.id))
                                                }
                                            >
                                                {item.name}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* ---FACILITY--- */}
                    {isDomestic && filterByFacility.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('hotel:Tiện nghi khách sạn')}</p>
                            <div className="filterBox__cont">
                                {filterByFacility.map((item) => {
                                    return (
                                        <div key={item.id} className="mb5">
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={(event) =>
                                                    handleChangeFilter(HOTEL_FILTER.FILTER_BY_FACILITY)(
                                                        event.target.checked
                                                    )(String(item.id))
                                                }
                                            >
                                                {item.name}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* ---TYPE--- */}
                    {isDomestic && filterByType.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('hotel:Loại chỗ ở')}</p>
                            <div className="filterBox__cont">
                                {filterByType.map((item) => {
                                    return (
                                        <div key={item.type} className="mb5">
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={(event) =>
                                                    handleChangeFilter(HOTEL_FILTER.FILTER_BY_TYPE)(
                                                        event.target.checked
                                                    )(item.type)
                                                }
                                            >
                                                {t(item.type)}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <button type="button" className="btnLink filterBox__reset" onClick={handleResetFilter}>
                    <span>{t('Đặt lại bộ lọc')}</span>
                </button>
            </div>
        </div>
    )
}

export default HotelListFilter
