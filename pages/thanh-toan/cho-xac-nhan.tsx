import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslationId } from '../../utils/custom-hook'
import { showMessage, copyToClipboard, getLinkOrderDetail } from '../../utils/common'
import { useTranslation } from 'react-i18next'

const LayoutCheckout = dynamic(() => import('../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../components/checkout-common/HeaderCheckout'))

const PayWaitingConfirm = () => {
    const { t } = useTranslation(['common'])
    const [orderLink, setOrderLink] = useState<string>('')
    const { orderData, errorMessage } = useTranslationId()

    useEffect(() => {
        if (errorMessage) {
            showMessage('error', errorMessage)
        }
    }, [errorMessage])

    useEffect(() => {
        if (orderData) {
            setOrderLink(getLinkOrderDetail(orderData.order_type, orderData.id))
        }
    }, [orderData])

    const handleClickCopy = (text: string) => {
        copyToClipboard(text)
        showMessage('success', 'Copied to clipboard')
    }

    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={3} type={orderData?.order_type} />
                <div className="checkoutLayout__body">
                    <div className="container">
                        <div className="checkoutState">
                            <div className="checkoutState__cont">
                                <div className="checkoutState__title">
                                    <p className="size-20 semibold mb0 uppercase yellow-1">
                                        {t('common:Giao dịch đang được xác nhận')}
                                    </p>
                                    <div className="saving">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                                <div className="checkoutState__img">
                                    <img
                                        src="https://statics.vntrip.vn/success-transfer.png"
                                        alt={'success-transfer'}
                                    />
                                </div>
                                <div className="checkoutState__text">
                                    <p className="semibold size-16 pTitle">
                                        {t('common:Cảm ơn bạn đã sử dụng dịch vụ')}.
                                    </p>
                                    <p>
                                        {t('common:Chúng tôi đã nhận được yêu cầu xác nhận cho đơn hàng của bạn')}.
                                        <br />
                                        {t(
                                            'common:Bộ phận chăm sóc khách hàng sẽ liên hệ với quý khách để hoàn tất việc thanh toán đơn hàng'
                                        )}
                                        .
                                    </p>
                                </div>
                                <div className="checkoutState__code">
                                    <p>{t('common:Mã đơn hàng')}</p>
                                    <p className="size-24 mb0 bold">{orderData?.order_code}</p>
                                </div>
                                <div className="checkoutState__copy">
                                    <span>{t('common:Chi tiết')}</span>
                                    <input
                                        type="text"
                                        readOnly
                                        value={orderLink}
                                        className="form-control form-control_xs"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn_xs btn_orange"
                                        onClick={() => {
                                            handleClickCopy(orderLink)
                                        }}
                                    >
                                        <span>Copy</span>
                                    </button>
                                </div>
                                <div className="checkoutState__btn">
                                    <a href="/" className="btn btn_orange">
                                        <span>{t('common:Quay về trang chủ')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutCheckout>
    )
}

export default PayWaitingConfirm
