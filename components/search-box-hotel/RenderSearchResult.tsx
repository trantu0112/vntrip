import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { convertRegionType } from '../../utils/hotel'

interface Props {
    regions?: any[]
    hotels?: any[]
    handleSelectedItem?: any
    regionsRef?: any
    hotelsRef?: any
    indexType: 'region' | 'hotel'
    indexRegion: number
    indexHotel: number
}

const RenderSearchResult: React.FC<Props> = React.memo(
    ({ regions, hotels, handleSelectedItem, regionsRef, hotelsRef, indexType, indexRegion, indexHotel }) => {
        const { t, i18n } = useTranslation(['hotel'])

        return (
            <Fragment>
                {Array.isArray(regions) && regions.length > 0 && (
                    <>
                        <p className="suggestDefault__title">{t('Khu vực')}</p>
                        <ul className="listPlace" ref={regionsRef}>
                            {regions.map((item: any, index: number) => {
                                return (
                                    <li
                                        className={`listPlace__item ${
                                            indexType === 'region' && indexRegion === index ? 'active' : ''
                                        } `}
                                        key={item.regionid}
                                    >
                                        <button
                                            onClick={() => {
                                                handleSelectedItem({
                                                    type: 'region',
                                                    ...item,
                                                    index,
                                                })
                                            }}
                                        >
                                            <div className="listPlace__text">
                                                <p className="p1">
                                                    {item[i18n.language === 'vi' ? 'regionname_vi' : 'regionname']}
                                                </p>
                                                <p className="p2">
                                                    {item[i18n.language === 'vi' ? 'regionname_vi' : 'regionname']},{' '}
                                                    {item.countryname}
                                                </p>
                                            </div>
                                            <div className="listPlace__label">
                                                {t(convertRegionType(item.regiontype))}
                                            </div>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}

                {Array.isArray(hotels) && hotels.length > 0 && (
                    <>
                        <p className="suggestDefault__title">{t('Khách sạn')}</p>
                        <ul className="listPlace" ref={hotelsRef}>
                            {hotels.map((item: any, index: number) => {
                                return (
                                    <li
                                        className={`listPlace__item ${
                                            indexType === 'hotel' && indexHotel === index ? 'active' : ''
                                        }`}
                                        key={item.id || item.ean_hotel_id}
                                    >
                                        <button
                                            onClick={() => {
                                                handleSelectedItem({
                                                    type: 'hotel',
                                                    ...item,
                                                    index,
                                                })
                                            }}
                                        >
                                            <div className="listPlace__text">
                                                <p className="p1">
                                                    {i18n.language === 'vi' ? item.name_vi : item.name}
                                                </p>
                                                <p className="p2">
                                                    {item.address}, {item.countryname}
                                                </p>
                                            </div>
                                            <div className="listPlace__label">{t('Khách sạn')}</div>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}
            </Fragment>
        )
    }
)

export default RenderSearchResult
