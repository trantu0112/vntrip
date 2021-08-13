import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'antd'
import { PAGE_SIZE } from '../../constants/common'
import SearchBoxHotel from '../search-box-hotel/SearchBoxHotel'
import OpenFilterSortMobile from './OpenFilterSortMobile'
import HotelListFilter from './HotelListFilter'
import HotelListSort from './HotelListSort'
import HotelListLoading from './HotelListLoading'
import HotelSoldOut from './HotelSoldOut'
import HotelItem from './HotelItem'

interface Props {
    keyword: string
    regionId: number
    isOpenSearchBoxMobile: boolean
    closeSearchBoxMobile: () => void
    extraData: any
    total: number
    checkInDate: Date
    checkOutDate: Date
    nights: number
    isLoading: boolean
    isDomestic: boolean
    hotels: any[]
    page: number
    handleChangePaging: (page: number) => void
    handleSwitchMap: (type: 'list' | 'map') => void
    seoCode?: any
}

const ListView: React.FC<Props> = ({
    keyword,
    regionId,
    isOpenSearchBoxMobile,
    closeSearchBoxMobile,
    extraData,
    total,
    checkInDate,
    checkOutDate,
    nights,
    isLoading,
    isDomestic,
    hotels,
    page,
    handleChangePaging,
    handleSwitchMap,
    seoCode,
}) => {
    const { t } = useTranslation(['common', 'hotel'])
    const hasFulladdr = extraData?.location_info.hasOwnProperty('full_addr')

    return (
        <section className="hotelList">
            <div className={`hotelList__search${isOpenSearchBoxMobile ? ' open' : ''}`}>
                <div
                    role="button"
                    tabIndex={0}
                    className="hotelList__search__backdrop"
                    onClick={closeSearchBoxMobile}
                    onKeyDown={closeSearchBoxMobile}
                />
                <div className="vntSearch">
                    <div className="container">
                        <div className="vntSearch__body">
                            <div className="vntSearch__main">
                                <SearchBoxHotel isShow={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---start hotelList__tab, bottom, ONLY SHOW ON MOBILE--- */}
            <OpenFilterSortMobile handleSwitchMap={() => handleSwitchMap('map')} />

            <div className="hotelList__body">
                <div className="container">
                    <div className="hotelList__left">
                        <div className="mapBox">
                            <img src="https://statics.vntrip.vn/images/maps/showmap.jpg" alt={'showmap'} />
                            <button
                                type="button"
                                className="btn btn_black btn_sm"
                                onClick={() => handleSwitchMap('map')}
                            >
                                <span>{t('Xem bản đồ')}</span>
                            </button>
                        </div>
                        <HotelListFilter
                            countByStars={extraData ? extraData.count_by_star : null}
                            countByPrices={extraData ? extraData.count_by_price_range : null}
                            countByCities={extraData ? extraData.count_by_cities : null}
                            countByArea={extraData ? extraData.count_by_area : null}
                            countByFacilities={extraData ? extraData.count_by_facilities : null}
                            countByType={extraData ? extraData.count_by_type : null}
                            minPrice={extraData ? extraData.min_price_all : 0}
                            maxPrice={extraData ? extraData.max_price_all : 50000000}
                            isDomestic={isDomestic}
                        />
                    </div>

                    <div className="hotelList__right">
                        <ul className="breadcrumb">
                            <li>
                                <Link href="/">
                                    <span>{t('Trang chủ')}</span>
                                </Link>
                            </li>
                            <li className="active">
                                {t('hotel:Khách sạn tại')} {isDomestic ? extraData?.location_info?.full_addr : keyword}:{' '}
                                {total} {t('hotel:khách sạn có phòng từ ngày')} {moment(checkInDate).format('DD/MM')}{' '}
                                {t('hotel:đến')} {moment(checkOutDate).format('DD/MM')}&nbsp;({nights}&nbsp;
                                {t(nights > 1 ? 'hotel:đêms' : 'hotel:đêm')})
                            </li>
                        </ul>
                        <h1 className="mb15">
                            {seoCode?.star_rating
                                ? `${t('hotel:Khách sạns')} ${seoCode.star_rating} ${t('common:Sao')} ${t(
                                      'common:tại'
                                  )} ${seoCode.full_addr}`
                                : `${hasFulladdr ? t('hotel:Khách sạn tại') : ''} ${
                                      hasFulladdr && isDomestic ? extraData?.location_info?.full_addr || '' : ''
                                  }`}
                        </h1>

                        <HotelListSort totalHotel={total} isDomestic={isDomestic} nights={nights} />

                        {isLoading && <HotelListLoading />}

                        {!isLoading && Array.isArray(hotels) && hotels.length === 0 && (
                            <HotelSoldOut checkInDate={checkInDate} checkOutDate={checkOutDate} />
                        )}
                        {!isLoading && (
                            <div className="listHotel">
                                {Array.isArray(hotels) &&
                                    hotels.length > 0 &&
                                    hotels.map((item: any) => {
                                        return (
                                            <HotelItem
                                                hotel={item}
                                                key={item.id || item.vntrip_id}
                                                nights={nights}
                                                checkInDate={checkInDate}
                                                isMapView={false}
                                                isDomestic={isDomestic}
                                                keyword={keyword}
                                                regionId={regionId}
                                            />
                                        )
                                    })}
                            </div>
                        )}

                        <ul className="pagination">
                            <Pagination
                                current={page || 1}
                                pageSize={PAGE_SIZE}
                                total={total}
                                showSizeChanger={false}
                                onChange={handleChangePaging}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListView
