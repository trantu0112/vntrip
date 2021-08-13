import React from 'react'
import { IconSearch } from '../../constants/icons'
import { POPULAR_PLACES_INTER } from '../../constants/hotel'
import { useTranslation } from 'react-i18next'

const PopularPlacesInter: React.FC = () => {
    const { t } = useTranslation('hotel')
    return (
        <div className="homePlace">
            <div className="container">
                <h2 className="text-center mb30">{t('ĐIỂM ĐẾN QUỐC TẾ PHỔ BIẾN')}</h2>
                <div className="row">
                    <div className="homePlace__col col-xs-12 col-sm-8">
                        <div className="homePlace__group">
                            <div className="homePlace__col col-sm-12">
                                <a href={POPULAR_PLACES_INTER.bangkok.path} className="homePlace__item">
                                    <img
                                        src={POPULAR_PLACES_INTER.bangkok.image}
                                        alt={POPULAR_PLACES_INTER.bangkok.label}
                                    />
                                    <div className="homePlace__cont">
                                        <h3>{POPULAR_PLACES_INTER.bangkok.label}</h3>
                                        <div className="homePlace__list">
                                            <ul>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.bangkok.des1}</span>
                                                </li>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.bangkok.des2}</span>
                                                </li>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.bangkok.des3}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="homePlace__col col-xs-6">
                                <a href={POPULAR_PLACES_INTER.seoul.path} className="homePlace__item">
                                    <img
                                        src={POPULAR_PLACES_INTER.seoul.image}
                                        alt={POPULAR_PLACES_INTER.seoul.label}
                                    />
                                    <div className="homePlace__cont">
                                        <h3>{POPULAR_PLACES_INTER.seoul.label}</h3>
                                        <div className="homePlace__list">
                                            <ul>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.seoul.des1}</span>
                                                </li>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.seoul.des2}</span>
                                                </li>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.seoul.des3}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="homePlace__col col-xs-6">
                                <a href={POPULAR_PLACES_INTER.kualalumpur.path} className="homePlace__item">
                                    <img
                                        src={POPULAR_PLACES_INTER.kualalumpur.image}
                                        alt={POPULAR_PLACES_INTER.kualalumpur.label}
                                    />
                                    <div className="homePlace__cont">
                                        <h3>{POPULAR_PLACES_INTER.kualalumpur.label}</h3>
                                        <div className="homePlace__list">
                                            <ul>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.kualalumpur.des1}</span>
                                                </li>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.kualalumpur.des2}</span>
                                                </li>
                                                <li>
                                                    <IconSearch width={12} height={12} />
                                                    <span>{POPULAR_PLACES_INTER.kualalumpur.des3}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="homePlace__col col-xs-12 col-sm-4 h380">
                        <a href={POPULAR_PLACES_INTER.singapore.path} className="homePlace__item">
                            <img
                                src={POPULAR_PLACES_INTER.singapore.image}
                                alt={POPULAR_PLACES_INTER.singapore.label}
                            />
                            <div className="homePlace__cont">
                                <h3>{POPULAR_PLACES_INTER.singapore.label}</h3>
                                <div className="homePlace__list">
                                    <ul>
                                        <li>
                                            <IconSearch width={12} height={12} />
                                            <span>{POPULAR_PLACES_INTER.singapore.des1}</span>
                                        </li>
                                        <li>
                                            <IconSearch width={12} height={12} />
                                            <span>{POPULAR_PLACES_INTER.singapore.des2}</span>
                                        </li>
                                        <li>
                                            <IconSearch width={12} height={12} />
                                            <span>{POPULAR_PLACES_INTER.singapore.des3}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularPlacesInter
