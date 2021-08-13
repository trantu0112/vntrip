import React, { useEffect, useState } from 'react'
import { ShowPriceHotel } from '../../constants/interface'
import { useDispatch } from 'react-redux'
import { IconExclamationCircle, IconLock } from '../../constants/icons'
import { ShowPriceType } from '../../constants/enums'
import { blurPrice, displayPrice, convertDiscountCode } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import { useMounted, useUserInfo } from '../../utils/custom-hook'
import DisplayPrice from '../common/DisplayPrice'

interface Props {
    nights: number
    showPrices: ShowPriceHotel
    basePrice: number // giá nhiều đêm hotel list
    baseNetPrice: number
    isFromDetail?: boolean
    onlyShowFinal?: boolean
    isInclVatAndFee: boolean
    isPriceOneNight: boolean
    disabledPromotion?: boolean
    provider: any
    includedFee: number
    includedVAT: number
}

const ShowPrice: React.FC<Props> = React.memo(
    ({
        nights,
        showPrices,
        basePrice,
        baseNetPrice,
        onlyShowFinal,
        isInclVatAndFee,
        isPriceOneNight,
        disabledPromotion,
        provider,
        includedFee,
        includedVAT,
    }) => {
        const dispatch = useDispatch()
        const { t, i18n } = useTranslation(['hotel', 'common', 'payment'])
        const userInfo = useUserInfo()
        const isMounted = useMounted()
        const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

        useEffect(() => {
            if (isMounted) {
                setIsLoggedIn(!!userInfo)
            }
        }, [isMounted, userInfo])

        // convert price to string eg: 28xxxx
        const getXxxPrice = (showPrices: ShowPriceHotel, nights: number) => {
            const secretPrice =
                showPrices['final_price'][isInclVatAndFee ? 'incl_vat_fee_price' : 'excl_vat_fee_price'] -
                showPrices['member_discount'][isInclVatAndFee ? 'incl_vat_fee_price' : 'excl_vat_fee_price']

            const _price = displayPrice(isPriceOneNight ? secretPrice / nights : secretPrice, 'VND')
            return blurPrice(String(_price))
        }

        const calculatePrice = (
            type:
                | 'promotion'
                | 'member_discount'
                | 'mobile_rate'
                | 'loyalty_discount'
                | 'final_price'
                | 'price_hotel'
                | 'base_net'
                | 'tax_and_fee',
            showPrices: ShowPriceHotel,
            basePrice: number,
            baseNetPrice: number
        ) => {
            switch (type) {
                case 'tax_and_fee':
                    return isPriceOneNight ? basePrice / nights - baseNetPrice / nights : basePrice - baseNetPrice
                case 'base_net':
                    return isPriceOneNight ? baseNetPrice / nights : baseNetPrice
                case 'price_hotel':
                    const priceFromHotel = isInclVatAndFee ? basePrice : baseNetPrice
                    return isPriceOneNight ? priceFromHotel / nights : priceFromHotel
                case 'final_price':
                    return isPriceOneNight
                        ? showPrices.final_price[isInclVatAndFee ? 'incl_vat_fee_price' : 'excl_vat_fee_price'] / nights
                        : showPrices.final_price[isInclVatAndFee ? 'incl_vat_fee_price' : 'excl_vat_fee_price']
                default:
                    return isPriceOneNight
                        ? showPrices[type][isInclVatAndFee ? 'incl_vat_fee_price' : 'excl_vat_fee_price'] / nights
                        : showPrices[type][isInclVatAndFee ? 'incl_vat_fee_price' : 'excl_vat_fee_price']
            }
        }

        const renderTextVatAndFee = () => {
            if (isInclVatAndFee) {
                if (['expedia', 'rapid'].includes(provider)) {
                    return (
                        <p className="promotion__price green-1">
                            {t('common:Đã bao gồm phí và thuế')}
                            <br />({t('common:Không bao gồm thuế VAT')})
                        </p>
                    )
                } else if (!includedFee && !includedVAT) {
                    return <p className="promotion__price">{t('common:Giá chưa bao gồm phí và thuế')}</p>
                } else if (includedFee && includedVAT) {
                    return <p className="promotion__price green-1">{t('common:Giá đã bao gồm phí và thuế')}</p>
                } else if (!includedFee && includedVAT) {
                    return <p className="promotion__price">{t('common:Giá đã bao gồm thuế và không bao gồm phí')}</p>
                } else if (includedFee && !includedVAT) {
                    return <p className="promotion__price">{t('common:Giá đã bao gồm phí và không bao gồm thuế')}</p>
                }
            }
            return null
        }

        const renderTextFeeForToolTip = (className?: string) => {
            if (isInclVatAndFee) {
                if (!includedFee) {
                    return (
                        <p className={`promotion__price ${className ? className : ''}`}>
                            ({t('payment:Chưa bao gồm phí dịch vụ khách sạn')})
                        </p>
                    )
                } else {
                    return (
                        <p className={`promotion__price ${className ? className : ''}`}>
                            ({t('payment:Đã bao gồm phí dịch vụ khách sạn')})
                        </p>
                    )
                }
            }
            return null
        }

        const renderTextTaxForToolTip = (className?: string) => {
            if (isInclVatAndFee) {
                if (!includedVAT) {
                    return (
                        <p className={`promotion__price ${className ? className : ''}`}>
                            ({t('payment:Chưa bao gồm thuế VAT')})
                        </p>
                    )
                } else {
                    return (
                        <p className={`promotion__price ${className ? className : ''}`}>
                            ({t('payment:Đã bao gồm thuế VAT')})
                        </p>
                    )
                }
            }
            return null
        }

        if (showPrices) {
            // this case for price on map maker
            if (onlyShowFinal) {
                return (
                    <DisplayPrice
                        price={calculatePrice(ShowPriceType.FINAL_PRICE, showPrices, basePrice, baseNetPrice)}
                    />
                )
            }
            return (
                <div className="pricing">
                    {showPrices?.final_price[isInclVatAndFee ? 'incl_discount_value' : 'excl_discount_value'] > 0 && (
                        <p className="pricing__old">
                            <s>
                                <DisplayPrice
                                    price={calculatePrice(
                                        ShowPriceType.PRICE_HOTEL,
                                        showPrices,
                                        basePrice,
                                        baseNetPrice
                                    )}
                                />
                            </s>
                            <span className="pricing__percent">
                                -
                                {
                                    showPrices?.final_price[
                                        isInclVatAndFee ? 'incl_discount_value' : 'excl_discount_value'
                                    ]
                                }
                                %
                            </span>
                        </p>
                    )}

                    <div className="pricing__current">
                        <p className="pPrice">
                            {showPrices['final_price']['incl_discount_value'] !== 0 && <IconExclamationCircle />}

                            <DisplayPrice
                                price={calculatePrice(ShowPriceType.FINAL_PRICE, showPrices, basePrice, baseNetPrice)}
                            />
                        </p>

                        {showPrices['final_price']['incl_discount_value'] !== 0 && (
                            <div className="priceTooltip">
                                {/*{isInclVatAndFee && (*/}
                                {/*    <div className="priceTooltip__group">*/}
                                {/*        <div className="priceTooltip__line">*/}
                                {/*            <span>{t('payment:Giá chưa thuế phí')}</span>*/}
                                {/*            <span>*/}
                                {/*                <DisplayPrice*/}
                                {/*                    price={calculatePrice(*/}
                                {/*                        ShowPriceType.BASE_NET,*/}
                                {/*                        showPrices,*/}
                                {/*                        basePrice,*/}
                                {/*                        baseNetPrice*/}
                                {/*                    )}*/}
                                {/*                />*/}
                                {/*            </span>*/}
                                {/*        </div>*/}
                                {/*        <div className="priceTooltip__line">*/}
                                {/*            <span>{t('payment:Phí dịch vụ khách sạn')}</span>*/}
                                {/*            <span>*/}
                                {/*                +*/}
                                {/*                <DisplayPrice*/}
                                {/*                    price={calculatePrice(*/}
                                {/*                        ShowPriceType.TAX_AND_FEE,*/}
                                {/*                        showPrices,*/}
                                {/*                        basePrice,*/}
                                {/*                        baseNetPrice*/}
                                {/*                    )}*/}
                                {/*                />*/}
                                {/*            </span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                <div className="priceTooltip__group">
                                    <div className="priceTooltip__line">
                                        <span>{t('payment:Giá từ khách sạn')}</span>
                                        <span className="text-through">
                                            <s>
                                                <DisplayPrice
                                                    price={calculatePrice(
                                                        ShowPriceType.PRICE_HOTEL,
                                                        showPrices,
                                                        basePrice,
                                                        baseNetPrice
                                                    )}
                                                />
                                            </s>
                                        </span>
                                    </div>
                                    <span>{renderTextFeeForToolTip('white-1')}</span>
                                    <ul>
                                        {/* -----PROMOTION----- */}
                                        {showPrices.promotion.show && (
                                            <li>
                                                <span>
                                                    {convertDiscountCode(
                                                        showPrices.promotion.title,
                                                        i18n.language === 'en' ? 'en' : 'vi'
                                                    )}
                                                </span>
                                                <span>
                                                    -
                                                    <DisplayPrice
                                                        price={calculatePrice(
                                                            ShowPriceType.PROMOTION,
                                                            showPrices,
                                                            basePrice,
                                                            baseNetPrice
                                                        )}
                                                    />
                                                </span>
                                            </li>
                                        )}

                                        {/* -----MEMBER DISCOUNT----- */}
                                        {isLoggedIn && showPrices.member_discount.show && (
                                            <li>
                                                <span>{t('payment:Ưu đãi nội bộ')}</span>
                                                <span>
                                                    -
                                                    <DisplayPrice
                                                        price={calculatePrice(
                                                            ShowPriceType.MEMBER,
                                                            showPrices,
                                                            basePrice,
                                                            baseNetPrice
                                                        )}
                                                    />
                                                </span>
                                            </li>
                                        )}

                                        {/* -----MOBILE RATE----- */}
                                        {isLoggedIn && showPrices.mobile_rate.show && (
                                            <li>
                                                <span>{t('payment:Ưu đãi trên điện thoại')}</span>
                                                <span>
                                                    -
                                                    <DisplayPrice
                                                        price={calculatePrice(
                                                            ShowPriceType.MOBILE,
                                                            showPrices,
                                                            basePrice,
                                                            baseNetPrice
                                                        )}
                                                    />
                                                </span>
                                            </li>
                                        )}

                                        {/* -----VVIP (loyalty_discount)----- */}
                                        {showPrices.loyalty_discount.show && (
                                            <li>
                                                <span>{showPrices.loyalty_discount.title}</span>
                                                <span>
                                                    -
                                                    <DisplayPrice
                                                        price={calculatePrice(
                                                            ShowPriceType.LOYALTY,
                                                            showPrices,
                                                            basePrice,
                                                            baseNetPrice
                                                        )}
                                                    />
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="priceTooltip__total" style={{ paddingBottom: '0px' }}>
                                    <span>
                                        {t('Giá')} {isPriceOneNight ? t('mỗi') : nights} {t('đêm')}
                                    </span>
                                    <span className="yellow-3 bold">
                                        <DisplayPrice
                                            price={calculatePrice(
                                                ShowPriceType.FINAL_PRICE,
                                                showPrices,
                                                basePrice,
                                                baseNetPrice
                                            )}
                                        />
                                    </span>
                                </div>
                                <span className="mb10 d-block">{renderTextTaxForToolTip('white-1')}</span>
                            </div>
                        )}
                    </div>

                    {/* Nếu chưa đăng nhập và member_discount.show = true =>  hiển thị secreat deal */}
                    {!isLoggedIn && showPrices.member_discount.show && (
                        <div className="pricing__secret d-block">
                            <div className="secretDeal">
                                <span>
                                    {t('Chỉ còn')} {getXxxPrice(showPrices, nights)}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = `${
                                            process.env.NEXT_PUBLIC_SSO_URL
                                        }/login?callbackUrl=${encodeURIComponent(window.location.href)}`
                                    }}
                                >
                                    <span>{t('common:Đăng nhập')}</span>
                                    <IconLock />
                                </button>
                            </div>
                        </div>
                    )}
                    {!disabledPromotion && (
                        <div className="pricing__promotion">
                            <div className="promotion">
                                {(showPrices.promotion.show ||
                                    (isLoggedIn && showPrices.member_discount.show) ||
                                    (isLoggedIn && showPrices.mobile_rate.show) ||
                                    (isLoggedIn && showPrices.loyalty_discount.show)) && (
                                    <p className="promotion__title">
                                        {isPriceOneNight || nights === 1
                                            ? t('Giá mỗi đêm đã áp dụng')
                                            : `${t('Giá')} ${nights} ${t('đêms')} ${t('đã áp dụng')}`}
                                    </p>
                                )}

                                {/* -----PROMOTION----- */}
                                {showPrices.promotion.show && (
                                    <p className="promotion__price">
                                        {convertDiscountCode(
                                            showPrices.promotion.title,
                                            i18n.language === 'en' ? 'en' : 'vi'
                                        )}
                                        <span>
                                            (-
                                            <DisplayPrice
                                                price={calculatePrice(
                                                    ShowPriceType.PROMOTION,
                                                    showPrices,
                                                    basePrice,
                                                    baseNetPrice
                                                )}
                                            />
                                            )
                                        </span>
                                    </p>
                                )}

                                {/* -----MEMBER DISCOUNT----- */}
                                {isLoggedIn && showPrices.member_discount.show && (
                                    <p className="promotion__price">
                                        {t('payment:Ưu đãi nội bộ')}
                                        <span>
                                            (-
                                            <DisplayPrice
                                                price={calculatePrice(
                                                    ShowPriceType.MEMBER,
                                                    showPrices,
                                                    basePrice,
                                                    baseNetPrice
                                                )}
                                            />
                                            )
                                        </span>
                                    </p>
                                )}

                                {/* -----MOBILE RATE----- */}
                                {isLoggedIn && showPrices.mobile_rate.show && (
                                    <p className="promotion__price">
                                        {t('payment:Ưu đãi trên điện thoại')}
                                        <span>
                                            (-
                                            <DisplayPrice
                                                price={calculatePrice(
                                                    ShowPriceType.MOBILE,
                                                    showPrices,
                                                    basePrice,
                                                    baseNetPrice
                                                )}
                                            />
                                            )
                                        </span>
                                    </p>
                                )}

                                {/* -----LOYALTY DISCOUNT (VVIP)----- */}
                                {isLoggedIn && showPrices.loyalty_discount.show && (
                                    <p className="promotion__price">
                                        {t('payment:Ưu đãi VVIP')}
                                        <span>
                                            (-
                                            <DisplayPrice
                                                price={calculatePrice(
                                                    ShowPriceType.LOYALTY,
                                                    showPrices,
                                                    basePrice,
                                                    baseNetPrice
                                                )}
                                            />
                                            )
                                        </span>
                                    </p>
                                )}

                                {renderTextVatAndFee()}

                                {/*{isInclVatAndFee && (*/}
                                {/*    <p className="promotion__price">*/}
                                {/*        {t('payment:Thuế và phí')}*/}
                                {/*        <span>*/}
                                {/*            (+*/}
                                {/*            <DisplayPrice*/}
                                {/*                price={calculatePrice(*/}
                                {/*                    ShowPriceType.TAX_AND_FEE,*/}
                                {/*                    showPrices,*/}
                                {/*                    basePrice,*/}
                                {/*                    baseNetPrice*/}
                                {/*                )}*/}
                                {/*            />*/}
                                {/*            )*/}
                                {/*        </span>*/}
                                {/*    </p>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        return null
    }
)

export default ShowPrice
