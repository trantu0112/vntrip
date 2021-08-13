import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslationId } from '../../utils/custom-hook'
import { copyToClipboard, getLinkOrderDetail, showMessage } from '../../utils/common'
import { VNTRIP_INFO } from '../../constants/common'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import ExportInvoice from '../../components/order/ExportInvoice'
import Head from 'next/head'

const LayoutCheckout = dynamic(() => import('../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../components/checkout-common/HeaderCheckout'))

const PaySuccess = () => {
    const [orderLink, setOrderLink] = useState<string>('')
    const { orderData, errorMessage, isLoading } = useTranslationId()
    const { t } = useTranslation(['common', 'payment'])

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
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.insider_object = {
                        "page": {
                            "type": "Confirmation"
                        }
                    }
                `,
                    }}
                />
            </Head>
            <Spin spinning={isLoading}>
                <section className="checkoutLayout">
                    <HeaderCheckout step={3} type={orderData?.['order_type']} />
                    <div className="checkoutLayout__body">
                        <div className="container">
                            <div className="checkoutState">
                                {orderData && (
                                    <div className="checkoutState__cont">
                                        <div className="checkoutState__title">
                                            <p className="size-20 semibold mb0 uppercase green-1">
                                                {orderData?.['order_type'] === 'hotel'
                                                    ? t('common:ĐẶT PHÒNG THÀNH CÔNG')
                                                    : t('common:THANH TOÁN THÀNH CÔNG')}
                                                !
                                            </p>
                                        </div>
                                        <div className="checkoutState__text">
                                            <p>
                                                {orderData?.['order_status'] === 'order_success' ? (
                                                    <>
                                                        {t(
                                                            'common:Chúc mừng Quý khách đã đặt đơn và thanh toán thành công'
                                                        )}
                                                        .
                                                        <br />
                                                        {t(
                                                            'common:Vui lòng kiểm tra email để nhận được thông tin chi tiết về đơn hàng'
                                                        )}
                                                        .
                                                        <br />
                                                        {t(
                                                            'common:Mọi thông tin thêm Quý khách có thể liên hệ Hotline'
                                                        )}
                                                        : {VNTRIP_INFO.hotline} {t('common:để được giải đáp')}.
                                                    </>
                                                ) : (
                                                    <>
                                                        {t(`payment:Tuy nhiên đơn hàng của bạn chưa được xác nhận`)}
                                                        :&nbsp;{VNTRIP_INFO.hotline}
                                                        <br />
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div className="checkoutState__code">
                                            <p>{t('common:Mã đơn hàng')}</p>
                                            <p className="size-24 mb0 bold">{orderData?.order_code}</p>
                                        </div>
                                        <div className="checkoutState__copy">
                                            <span>{t('Chi tiết')}</span>
                                            <input
                                                type="text"
                                                readOnly
                                                value={orderLink}
                                                className="form-control form-control_xs"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn_xs btn_outlineOrange"
                                                onClick={() => {
                                                    handleClickCopy(orderLink)
                                                }}
                                            >
                                                <span>Copy</span>
                                            </button>
                                        </div>
                                        <div className="checkoutState__btn mb15">
                                            <a href="/" className="btn btn_outlineOrange">
                                                <span>{t('common:Quay về trang chủ')}</span>
                                            </a>
                                        </div>
                                        <ExportInvoice
                                            customerData={orderData?.extra_customer_data}
                                            orderId={orderData?.id}
                                            orderCode={orderData?.order_code}
                                            orderToken={orderData?.order_token_invoice}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Spin>
        </LayoutCheckout>
    )
}

export default PaySuccess
