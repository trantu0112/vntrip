import React from 'react'
import { IconSearch } from '../../constants/icons'
import { PATH_HOTEL_SEARCH } from '../../constants/common'
import { POPULAR_PLACES_DOMESTIC } from '../../constants/hotel'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
interface iProps {
    isMobile?: boolean
}

const PopularPlacesDomestic: React.FC<iProps> = () => {
    const { t } = useTranslation('hotel')
    const renderClassByIndex = (index: number) => {
        return [0, 3, 6].includes(index)
            ? 'col-xs-12 col-sm-4'
            : [1, 2].includes(index)
            ? 'col-xs-6 col-sm-2'
            : 'col-xs-6 col-sm-4'
    }

    return (
        <div className="homePlace">
            <div className="container">
                <h2 className="text-center mb30">{t('ĐIỂM ĐẾN VIỆT NAM PHỔ BIẾN')}</h2>
                <div className="row">
                    {POPULAR_PLACES_DOMESTIC.map((item, index) => {
                        return (
                            <div key={item.keyword} className={`homePlace__col ${renderClassByIndex(index)}`}>
                                <Link href={`${PATH_HOTEL_SEARCH}?keyword=${item.keyword}`}>
                                    <a className="homePlace__item">
                                        <img src={item.image} alt={item.label} />
                                        <div className="homePlace__cont">
                                            <h3>{item.label}</h3>
                                            <div className="homePlace__list">
                                                <ul>
                                                    <li>
                                                        <IconSearch width={12} height={12} />
                                                        <span>{item.des1}</span>
                                                    </li>
                                                    <li>
                                                        <IconSearch width={12} height={12} />
                                                        <span>{item.des2}</span>
                                                    </li>
                                                    <li>
                                                        <IconSearch width={12} height={12} />
                                                        <span>{item.des3}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PopularPlacesDomestic
