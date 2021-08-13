import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import DisplayPrice from '../common/DisplayPrice'
import { HOTEL_NO_IMAGE, STATIC2_VNTRIP } from '../../constants/common'
import { calculatorDiscount, convertUnicode } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import { router } from 'next/client'
import { IconGroupUser } from '../../constants/icons'

interface Props {
    data: any
}

const VoucherItem: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation(['common', 'voucher'])

    const renderThumbImg = (dataDeal: any) => {
        const { image_deal } = dataDeal
        if (Array.isArray(image_deal) && image_deal.length > 0) {
            const _default = image_deal.find((item) => item.is_default)
            const _dealImg = _default ? _default : image_deal[0]
            return `${STATIC2_VNTRIP}/260x150/smart/${_dealImg.image}`
        }
        return HOTEL_NO_IMAGE
    }

    return (
        <div className="listDeal__item">
            <Link href={`${router.pathname}/${convertUnicode(data?.name)}-${data?.id}`}>
                <a className="dealItem">
                    <div className="dealItem__img">
                        <img src={renderThumbImg(data)} alt={data.name} />
                    </div>
                    <div className="dealItem__cont">
                        <p className="dealItem__title semibold">{data.name}</p>
                        <p className="gray-5">
                            <span> {t('voucher:Hạn sử dụng')}:</span>
                            <span className="ml5">{moment(data.created_at).format('DD/MM/YYYY')}</span>
                        </p>
                        <div className="mt10 flexGroup2">
                            <span className="yellow-1 semibold size-20">
                                <DisplayPrice price={data?.price_deal?.[0]?.sell_price} />
                            </span>
                            {calculatorDiscount(
                                data?.price_deal?.[0]?.origin_price,
                                data?.price_deal?.[0]?.sell_price
                            ) > 0 && (
                                <span className="discount">
                                    -
                                    {calculatorDiscount(
                                        data?.price_deal?.[0]?.origin_price,
                                        data?.price_deal?.[0]?.sell_price
                                    )}
                                    %
                                </span>
                            )}
                        </div>
                        <div className="flexGroup">
                            {data.price_deal?.[0]?.origin_price !== data.price_deal?.[0]?.sell_price ? (
                                <span className="size-12 gray-5" style={{ textDecoration: 'line-through' }}>
                                    <DisplayPrice price={data.price_deal?.[0]?.origin_price} />
                                </span>
                            ) : (
                                <p></p>
                            )}

                            <div className="flexGroup2">
                                <span>
                                    <IconGroupUser />
                                </span>
                                <span className="gray-5 ml5 size-14">
                                    {' '}
                                    {data?.custom_count} {t('voucher:đã mua')}
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default VoucherItem
