import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFlightPromotion } from '../../api/common-services'
import DisplayPrice from './DisplayPrice'

const PromotionHot: React.FC = () => {
    const { t } = useTranslation(['flight'])
    const [promotionHot, setPromotionHot] = useState<any[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getFlightPromotion()
                setPromotionHot(res.data)
            } catch (e) {
                throw e
            }
        }

        fetchData()
    }, [])

    return (
        <div className="promotionHot">
            <div className="container">
                <h2 className="text-center mb30">{t('flight:KHUYẾN MÃI HOT TRONG THÁNG')}</h2>

                {!promotionHot.length && (
                    <div className="promotionHot__loading">
                        <div className="promotionHot__loading__col">
                            <div className="promotionHot__loading__item animated-background" />
                        </div>
                        <div className="promotionHot__loading__col">
                            <div className="promotionHot__loading__item animated-background" />
                        </div>
                        <div className="promotionHot__loading__col">
                            <div className="promotionHot__loading__item animated-background" />
                        </div>
                        <div className="promotionHot__loading__col">
                            <div className="promotionHot__loading__item animated-background" />
                        </div>
                        <div className="promotionHot__loading__col">
                            <div className="promotionHot__loading__item animated-background" />
                        </div>
                    </div>
                )}

                <div className="promotionHot__group">
                    {promotionHot.map((item) => {
                        return (
                            <div className="promotionHot__col" key={item.id}>
                                <a href={item.url} className="promotionHot__item" target="_blank">
                                    <div className="promotionHot__img">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="promotionHot__text">
                                        <div className="promotionHot__info">
                                            <p className="size-16 bold">{item.title}</p>
                                            <p>{item.sub_title}</p>
                                        </div>
                                        <div className="promotionHot__price">
                                            <p className="text-right">{t('flight: Chỉ từ')}</p>
                                            <p className="size-20 bold">
                                                <DisplayPrice price={item.price} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promotionHot__bg" />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PromotionHot
