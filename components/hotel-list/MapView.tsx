import React, { useState } from 'react'
import { FilterFilled } from '@ant-design/icons'
import { setOpenFilterMobile } from '../../store/hotel/action'
import { toggleClassNoScroll } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { IconArrowBack, IconArrowMap } from '../../constants/icons'
import { Pagination } from 'antd'
import { PAGE_SIZE } from '../../constants/common'
import HotelItem from './HotelItem'
import HotelListSort from './HotelListSort'
import HotelListFilter from './HotelListFilter'
import SearchBoxHotel from '../search-box-hotel/SearchBoxHotel'
import HotelListLoading from './HotelListLoading'
import HotelSoldOut from './HotelSoldOut'
import RenderGoogleMap from './RenderGoogleMap'

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
}

const MapView: React.FC<Props> = ({
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
}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common'])
    const [isShowSearchBox, setIsShowSearchBox] = useState<boolean>(true)
    const openFilterMobile = () => {
        dispatch(setOpenFilterMobile(true))
        toggleClassNoScroll('add')
    }
    return (
        <section className="hotelMap">
            <div className={`hotelMap__header ${isShowSearchBox ? 'open' : ''}`}>
                <div className="hotelMap__arrow">
                    <button type="button" className="btn" onClick={() => setIsShowSearchBox((prevState) => !prevState)}>
                        <IconArrowMap />
                    </button>
                </div>
                <div className={`hotelMap__search${isOpenSearchBoxMobile ? ' open' : ''}`}>
                    <div
                        className="hotelMap__search__backdrop"
                        role="button"
                        tabIndex={0}
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
            </div>
            <div className="hotelMap__body">
                <div className="hotelMap__left">
                    <div className="hotelMap__btn">
                        <button type={'button'} className="btn btn_outline" onClick={() => handleSwitchMap('list')}>
                            <IconArrowBack />
                            <span>{t('Quay lại danh sách')}</span>
                        </button>
                        <button type="button" className="btn btn_outline btnFilter" onClick={openFilterMobile}>
                            <FilterFilled />
                            <span>{t('Bộ lọc')}</span>
                        </button>
                    </div>
                    <div className="hotelMap__list">
                        {/*include jades/blocks/_hotelAnimated*/}

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
                                                elementId={`hotel_item_${item.id || item.vntrip_id}_in_map`}
                                                isMapView={true}
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
                                showLessItems={true}
                            />
                        </ul>
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
                <div className="hotelMap__right">
                    <HotelListSort totalHotel={total} isDomestic={isDomestic} nights={nights} />

                    <div className="hotelMap__iframe">
                        <RenderGoogleMap
                            hotels={hotels}
                            nights={nights}
                            checkInDate={checkInDate}
                            isDomestic={isDomestic}
                            keyword={keyword}
                            regionId={regionId}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MapView
