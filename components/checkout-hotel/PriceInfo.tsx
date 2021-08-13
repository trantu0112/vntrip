import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import DisplayPrice from '../common/DisplayPrice'
import { useMounted, useUserInfo } from '../../utils/custom-hook'

interface Props {
    step: number
    isVat?: boolean
    isVatInclude?: boolean
    hotel?: any
    listHotel?: any
    redeemInfo?: any
    loyaltyBenefit?: any
    loyaltyBenefitPrice?: any
    rate?: any
    provider: string
    prices?: any
    finalPrice: number
    showPrices?: any
    showPrettyPrice?: any
}

const PriceInfo: React.FC<Props> = React.memo(
    ({
        step,
        isVat,
        isVatInclude,
        hotel,
        listHotel,
        redeemInfo,
        loyaltyBenefit,
        loyaltyBenefitPrice,
        rate,
        provider,
        prices,
        finalPrice,
        showPrices,
        showPrettyPrice,
    }) => {
        const { t, i18n } = useTranslation('payment')
        const isCheckedIncl = useSelector((state: any) => state.hotel.isShowFinalPriceHotel || false)
        const [key, setKey] = useState<'incl_vat_fee_price' | 'excl_vat_fee_price'>('incl_vat_fee_price')
        const [isShowPriceAfterPromotion, setIsShowPriceAfterPromotion] = useState<boolean>(false)
        const couponInfo = useSelector((state: any) => state.checkout.couponInfo || null)
        const userInfo = useUserInfo()
        const isMounted = useMounted()
        const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

        useEffect(() => {
            if (isMounted) {
                setIsLoggedIn(!!userInfo)
            }
        }, [isMounted, userInfo])

        useEffect(() => {
            // logic show giá: include vat_and_fee , exclude vat_and_fê
            // step 1 thì dựa vào checked/unchecked ở bước trước
            // step 2 luôn show giá sau thuế phí
            setKey(isCheckedIncl || step === 2 ? 'incl_vat_fee_price' : 'excl_vat_fee_price')
        }, [isCheckedIncl, step])

        useEffect(() => {
            setIsShowPriceAfterPromotion(
                step !== 1 &&
                    ((typeof loyaltyBenefitPrice !== 'undefined' && loyaltyBenefitPrice > 0) ||
                        showPrices?.loyalty_discount.show ||
                        (redeemInfo?.status && !['TEMPORARY', 'REDEEM_SETTINGS'].includes(redeemInfo?.status)) ||
                        (couponInfo &&
                            ['SUCCESS'].includes(couponInfo.status) &&
                            Number(couponInfo.final_discount_value) > 0))
            )
        }, [showPrices, loyaltyBenefitPrice, redeemInfo, couponInfo, step])

        console.log(redeemInfo)
        return (
            <>
                <div className={`boxPriceItem`}>
                    <div
                        className="bookingInfo__price"
                        key={`bookingInfo__price_${
                            hotel?.booking_request_rate_id ? hotel?.booking_request_rate_id : 0
                        }`}
                    >
                        <h5 className={`yellow-1`}>
                            <span className={`floatRight size-14 black-1`}>
                                {' '}
                                x
                                {step === 2
                                    ? hotel?.token_data?.room_count
                                    : step === 1
                                    ? hotel?.roomCount
                                    : hotel?.rooms}
                            </span>
                            {t(`Phòng`)}:&nbsp;
                            {step === 2
                                ? hotel?.token_data?.room_info?.name
                                : step === 1
                                ? hotel?.hotel?.name
                                : hotel?.token_data?.extra_rate_data?.room_name}
                        </h5>

                        <ul style={{ borderTop: 'none' }}>
                            <li>
                                <p className="semibold mb0">{t('Giá từ khách sạn')}</p>
                                <p className="yellow-1 semibold mb0 text-right">
                                    <DisplayPrice price={showPrettyPrice?.base_price} />
                                </p>
                                <ul>
                                    <div className="mb0 gray-11">
                                        (
                                        {rate?.included_service_fee > 0
                                            ? t('Đã bao gồm phí dịch vụ khách sạn')
                                            : t('Chưa bao gồm phí dịch vụ khách sạn')}
                                        )
                                    </div>

                                    {showPrices?.promotion && showPrices?.promotion?.show && (
                                        <li className={`green-1`}>
                                            <p className="mb0">{showPrices?.promotion.name}</p>
                                            <p className="semibold mb0 text-right">
                                                <DisplayPrice price={showPrices?.promotion[key]} />
                                            </p>
                                        </li>
                                    )}
                                    {isLoggedIn && showPrices?.member_discount && showPrices?.member_discount?.show && (
                                        <li className={`green-1`}>
                                            <p className="mb0">{t('Ưu đãi nội bộ')}</p>
                                            <p className="semibold mb0 text-right">
                                                <DisplayPrice price={showPrices?.member_discount[key]} />
                                            </p>
                                        </li>
                                    )}
                                    {showPrices?.mobile_rate && showPrices?.mobile_rate?.show && (
                                        <li className={`green-1`}>
                                            <p className="mb0">{t('Ưu đãi trên điện thoại')}</p>
                                            <p className="semibold mb0 text-right">
                                                <DisplayPrice price={showPrices?.mobile_rate[key]} />
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </li>
                            <li>
                                <p className="semibold mb0">{t('Giá khuyến mại')}</p>
                                <p className="yellow-1 semibold mb0 text-right">
                                    {/** Với step1 Giá khuyến mãi = totalPrice = finalPrice còn step 2 Giá khuyến mãi = totalPrice **/}
                                    <DisplayPrice
                                        // price={
                                        //     showPrettyPrice?.base_price -
                                        //     (showPrices?.promotion?.show ? showPrices?.promotion?.[key] : 0) -
                                        //     (showPrices?.member_discount?.show &&
                                        //     showPrices?.member_discount?.logging_mode
                                        //         ? showPrices?.member_discount?.[key]
                                        //         : 0) -
                                        //     (showPrices?.mobile_rate?.show ? showPrices?.mobile_rate?.[key] : 0)
                                        // }
                                        price={prices?.total_price || finalPrice}
                                    />
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                {/** Chỉ show ở step2 **/}
                {isShowPriceAfterPromotion && (
                    <div className="bookingInfo__price_total">
                        <ul>
                            {isShowPriceAfterPromotion && (
                                <li>
                                    <p className="flexGroup mb0">
                                        <span className={`semibold`}>{t('Tổng giá phòng')}</span>
                                        <span className={`yellow-1 semibold text-right`}>
                                            <DisplayPrice price={prices?.total_price} />
                                        </span>
                                    </p>

                                    <ul>
                                        {/* -----LOYALTY BENEFIT DISCOUNT----- */}
                                        {typeof loyaltyBenefitPrice !== 'undefined' && loyaltyBenefitPrice > 0 && (
                                            <li className="green-1 flexGroup">
                                                <p className="mb0">
                                                    {
                                                        loyaltyBenefit?.[
                                                            i18n.language === 'vi' ? 'benefit_name' : 'benefit_name_en'
                                                        ]
                                                    }
                                                </p>
                                                <p className="semibold mb0 text-right">
                                                    -<DisplayPrice price={loyaltyBenefitPrice} />
                                                </p>
                                            </li>
                                        )}

                                        {/* -----VVIP (loyalty_discount)----- */}
                                        {showPrices?.loyalty_discount.show && (
                                            <li className="green-1 flexGroup">
                                                <p className="mb0">{showPrices?.loyalty_discount.title}</p>
                                                <p className="semibold mb0 text-right">
                                                    -<DisplayPrice price={showPrices?.loyalty_discount[key]} />
                                                </p>
                                            </li>
                                        )}
                                        {/* -----COUPON BEFORE VAT----- chỉ show ở step 2 */}
                                        {((couponInfo?.status.toLowerCase() === 'success' &&
                                            !couponInfo?.campaign_data?.ref_data?.after_vat) ||
                                            (couponInfo?.status.toLowerCase() === 'success' &&
                                                couponInfo?.campaign_data?.ref_data?.after_vat &&
                                                !isVat)) && (
                                            <li className="green-1 flexGroup">
                                                <p className="mb0">
                                                    {t('Mã giảm giá')}: {couponInfo?.coupon_code}
                                                </p>
                                                <p className="semibold mb0 text-right">
                                                    -<DisplayPrice price={couponInfo?.final_discount_value} />
                                                </p>
                                            </li>
                                        )}
                                        {/* -----Redemption----- */}
                                        {redeemInfo?.status &&
                                            !isVat &&
                                            !['TEMPORARY', 'REDEEM_SETTINGS'].includes(redeemInfo?.status) && (
                                                <li className="green-1 flexGroup">
                                                    <p className="mb0">{t('Sử dụng hoàn tiền')}</p>
                                                    <p className="semibold mb0 text-right">
                                                        -
                                                        <DisplayPrice
                                                            price={redeemInfo?.additional_settings?.actual_redeem_point}
                                                        />
                                                    </p>
                                                </li>
                                            )}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
                {/** Chỉ show ở step2 **/}
                {isVat && (
                    <div className={'bookingInfo__price_total'}>
                        <ul>
                            <li>
                                <p className={'flexGroup mb0'}>
                                    <span className={'semibold'}>{t('hotel:Giá chưa bao gồm VAT')}</span>
                                    <span className={'floatRight yellow-1 semibold'}>
                                        <DisplayPrice price={(prices?.vat || 0) * 10} />
                                    </span>
                                </p>
                                <ul>
                                    <li className={'gray-5 flexGroup'}>
                                        <p className={'semibold mb0'}>{t('hotel:Thuế VAT')}</p>
                                        <p className={'semibold mb0 text-right'}>
                                            <DisplayPrice price={prices?.vat} />
                                        </p>
                                    </li>
                                    {/* -----COUPON AFTER VAT----- chỉ show ở step 2 */}
                                    {couponInfo?.campaign_data?.ref_data?.after_vat &&
                                        couponInfo?.status.toLowerCase() === 'success' && (
                                            <li className="green-1 flexGroup">
                                                <p className="mb0">
                                                    {t('Mã giảm giá')}: {couponInfo?.coupon_code}
                                                </p>
                                                <p className="semibold mb0 text-right">
                                                    -<DisplayPrice price={couponInfo.final_discount_value} />
                                                </p>
                                            </li>
                                        )}
                                    {/* -----Redemption----- */}
                                    {redeemInfo?.status &&
                                        !['TEMPORARY', 'REDEEM_SETTINGS'].includes(redeemInfo?.status) && (
                                            <li className="green-1 flexGroup">
                                                <p className="mb0">{t('Sử dụng hoàn tiền')}</p>
                                                <p className="semibold mb0 text-right">
                                                    -
                                                    <DisplayPrice
                                                        price={redeemInfo?.additional_settings?.actual_redeem_point}
                                                    />
                                                </p>
                                            </li>
                                        )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                )}
                {step !== 3 && (
                    <div className="bookingInfo__total">
                        <div className="flexGroup flexWrap">
                            <p className="size-20 semibold mb0">{t('Tổng cộng')}:</p>
                            <p className="yellow-1 semibold size-20 mb0 text-right">
                                <DisplayPrice price={finalPrice} />
                                {/*<DisplayPrice price={step === 3 ? Number(finalPrice) : showFinalPrice} />*/}
                            </p>
                            {['expedia', 'rapid'].includes(provider) ? (
                                <p className="green-1 w100">({t('common:Không bao gồm thuế VAT')})</p>
                            ) : (
                                ''
                            )}
                        </div>
                        <p className="gray-11">
                            ({isVatInclude || isVat ? t('Đã bao gồm thuế VAT') : t('Chưa bao gồm thuế VAT')})
                        </p>
                    </div>
                )}
            </>
        )
    }
)

export default PriceInfo
