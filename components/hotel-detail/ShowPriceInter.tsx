import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import DisplayPrice from '../common/DisplayPrice'

interface Props {
    discount: any
    finalPrice: any
    nights: number
}

const ShowPriceInter: React.FC<Props> = ({ discount, finalPrice, nights }) => {
    const { t } = useTranslation(['hotel', 'common', 'payment'])
    const { isIncl, isPriceOneNight } = useSelector((state: any) => {
        return {
            isIncl: state.hotel.isShowFinalPriceHotel || false,
            isPriceOneNight: state.hotel.isPriceOneNight || false,
        }
    })

    return (
        <div className="pricing">
            {discount?.has_discount && (
                <p className="pricing__old">
                    <s>
                        <DisplayPrice price={discount?.[isPriceOneNight ? 'nightly' : 'total']['strikethrough']} />
                    </s>
                    <span className="pricing__percent">
                        -{discount?.[isPriceOneNight ? 'nightly' : 'total']['percent']}%
                    </span>
                </p>
            )}

            <div className="pricing__current">
                <p className="pPrice">
                    <DisplayPrice
                        price={
                            finalPrice?.[isPriceOneNight ? 'nightly' : 'total']?.[isIncl ? 'inclusive' : 'exclusive']
                        }
                    />
                </p>
            </div>
            {/*<div className="pricing__promotion">*/}
            {/*    <div className="promotion">*/}
            {/*        <p className="promotion__title">*/}
            {/*            {isPriceOneNight || nights === 1*/}
            {/*                ? t('Giá mỗi đêm đã áp dụng')*/}
            {/*                : `${t('Giá')} ${nights} ${t('đêms')} ${t('đã áp dụng')}`}*/}
            {/*        </p>*/}
            {/*        /!*<p className="promotion__price">*!/*/}
            {/*        /!*    Khuyến mại giờ chót<span>(-420.000đ)</span>*!/*/}
            {/*        /!*</p>*!/*/}
            {/*        /!*<p className="promotion__price">*!/*/}
            {/*        /!*    Ưu đãi nội bộ<span>(-120.000đ)</span>*!/*/}
            {/*        /!*</p>*!/*/}
            {/*        /!*<p className="promotion__price">*!/*/}
            {/*        /!*    Ưu đãi VVIP<span>(-32.400đ)</span>*!/*/}
            {/*        /!*</p>*!/*/}
            {/*        /!*<p className="promotion__price">*!/*/}
            {/*        /!*    Phí khác<span>(+32.400đ)</span>*!/*/}
            {/*        /!*</p>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default ShowPriceInter
