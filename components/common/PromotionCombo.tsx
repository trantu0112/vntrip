import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { getDeals } from '../../api/common-services'
import { useRouter } from 'next/router'
import DisplayPrice from './DisplayPrice'
import { useTranslation } from 'react-i18next'
import { PATH_DEAL_LIST } from '../../constants/common'
import { convertUnicode } from '../../utils/common'

const PromotionCombo: React.FC = () => {
    const { t } = useTranslation(['flight', 'hotel', 'deal'])
    const [listDeal, setListDeal] = useState<any[]>([])
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        className: 'promotionCombo__slide',
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getDeals({})
                if (res.status === 'success') {
                    setListDeal(res.data)
                }
            } catch (e) {
                throw e
            }
        }
        fetchData()
    }, [])

    return (
        <div className="promotionCombo">
            <div className="container">
                <h2 className="text-center mb30 uppercase">
                    {t('flight:TOP COMBO KHUYẾN MÃI')}: {t('flight:Vé máy bay')} & {t('hotel:Khách sạn')}
                </h2>
                <Slider {...settings}>
                    {listDeal.map((item) => {
                        return (
                            <div className="promotionCombo__col" key={item.id}>
                                <a
                                    className="promotionCombo__item"
                                    href={`${PATH_DEAL_LIST}/${convertUnicode(item.name)}-${item.id}`}
                                    target="_blank"
                                >
                                    <div className="promotionCombo__img">
                                        <img src={item.image_deal[0]?.image} alt={item.name} />
                                    </div>
                                    <div className="promotionCombo__info">
                                        <div className="promotionCombo__title">
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="promotionCombo__address">
                                            <p>
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12.2001 6.93329C12.4001 6.39996 12.5335 5.79996 12.5335 5.19996C12.5335 2.66663 10.5335 0.666626 8.00013 0.666626C5.4668 0.666626 3.4668 2.66663 3.4668 5.19996C3.4668 5.79996 3.60013 6.39996 3.80013 6.93329C3.8668 7.13329 3.93346 7.26663 4.0668 7.46663L8.00013 15.3333L11.9335 7.46663C12.0001 7.26663 12.1335 7.13329 12.2001 6.93329Z"
                                                        stroke="#BFBFBF"
                                                        strokeMiterlimit={10}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M9 5.42857C9 5.71429 8.71429 6 8.42857 6H7.57143C7.28571 6 7 5.71429 7 5.42857V4.57143C7 4.28571 7.28571 4 7.57143 4H8.42857C8.71429 4 9 4.28571 9 4.57143V5.42857Z"
                                                        stroke="#BFBFBF"
                                                        strokeMiterlimit={10}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <span>{item.destination[0]?.name}</span>
                                            </p>
                                            <p>
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                                                        stroke="#BFBFBF"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8 8V5.5"
                                                        stroke="#BFBFBF"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8 8L11.1247 11.1253"
                                                        stroke="#BFBFBF"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <span>
                                                    <strong className="mr5">{item.custom_count}</strong>
                                                    {t('deal:người mua')}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="promotionCombo__price">
                                            <p>{t('flight:Chỉ từ')}</p>
                                            <p className="yellow-1 size-24 bold">
                                                <DisplayPrice price={item.price_deal[0]?.sell_price} />
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default PromotionCombo
