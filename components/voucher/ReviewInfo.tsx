import React, { Component } from 'react'
import { useTranslation } from 'react-i18next'
import { IconClose } from '../../constants/icons'
import { getUrlDealImage } from '../../utils/common'
import DisplayPrice from '../common/DisplayPrice'
import { setOpenCheckoutHotelInfo } from '../../store/checkout/action'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
interface Props {
    data: any
    quantity: number
}
const ReviewInfo: React.FC<Props> = ({ data, quantity }) => {
    const dispatch = useDispatch()
    const couponInfo = useSelector((state: any) => state.checkout.couponInfo || null)
    const { t } = useTranslation(['payment', 'flight', 'voucher'])
    // close info mobile
    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    return (
        <div>
            {/* Header for mobile */}
            <div className="headerPopup">
                <p>{t('voucher:Thông tin voucher')}</p>
                <button type="button" className="headerPopup__close" onClick={closeInfo}>
                    <IconClose />
                </button>
            </div>
            <div className="couponBox">
                <div className="voucherImage">
                    <img className="w100" src={getUrlDealImage(data?.image_deal?.[0]?.image)} alt="" />
                </div>
                <div className="voucherTitle mb10 mt10">
                    <h2 className="semibold size-18">{data?.name}</h2>
                </div>
                <div className="flexGroup mb5">
                    <span className="gray-11">{t('voucher:Giá voucher')}</span>
                    <span className="semibold">
                        <DisplayPrice price={data?.price_deal?.[0]?.sell_price} />
                    </span>
                </div>
                <div className="flexGroup mb5">
                    <span className="gray-11">{t('flight:Số lượng')}</span>
                    <span className="semibold">{quantity || 1}</span>
                </div>
                {/* -----COUPON----- chỉ show ở step 2 */}
                {couponInfo?.status?.toLowerCase() === 'success' && (
                    <li className="green-1 flexGroup">
                        <p className="mb0">
                            {t('Mã giảm giá')}: {couponInfo?.coupon_code}
                        </p>
                        <p className="semibold mb0 text-right">
                            -<DisplayPrice price={couponInfo?.final_discount_value} />
                        </p>
                    </li>
                )}
                {/* -----Total price----- */}
                <div className="voucherTotal">
                    <div className="flexGroup">
                        <span className="size-18 semibold">{t('Tổng cộng')}:</span>
                        <span className="yellow-1 semibold size-18">
                            <DisplayPrice
                                price={
                                    data?.price_deal?.[0]?.sell_price * (quantity || 1) -
                                    (couponInfo && couponInfo.status.toLowerCase() === 'success'
                                        ? couponInfo.final_discount_value
                                        : 0)
                                }
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewInfo
