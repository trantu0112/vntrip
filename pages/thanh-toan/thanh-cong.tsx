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
                                                    ? t('common:?????T PH??NG TH??NH C??NG')
                                                    : t('common:THANH TO??N TH??NH C??NG')}
                                                !
                                            </p>
                                        </div>
                                        <div className="checkoutState__text">
                                            <p>
                                                {orderData?.['order_status'] === 'order_success' ? (
                                                    <>
                                                        {t(
                                                            'common:Ch??c m???ng Qu?? kh??ch ???? ?????t ????n v?? thanh to??n th??nh c??ng'
                                                        )}
                                                        .
                                                        <br />
                                                        {t(
                                                            'common:Vui l??ng ki???m tra email ????? nh???n ???????c th??ng tin chi ti???t v??? ????n h??ng'
                                                        )}
                                                        .
                                                        <br />
                                                        {t(
                                                            'common:M???i th??ng tin th??m Qu?? kh??ch c?? th??? li??n h??? Hotline'
                                                        )}
                                                        : {VNTRIP_INFO.hotline} {t('common:????? ???????c gi???i ????p')}.
                                                    </>
                                                ) : (
                                                    <>
                                                        {t(`payment:Tuy nhi??n ????n h??ng c???a b???n ch??a ???????c x??c nh???n`)}
                                                        :&nbsp;{VNTRIP_INFO.hotline}
                                                        <br />
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div className="checkoutState__code">
                                            <p>{t('common:M?? ????n h??ng')}</p>
                                            <p className="size-24 mb0 bold">{orderData?.order_code}</p>
                                        </div>
                                        <div className="checkoutState__copy">
                                            <span>{t('Chi ti???t')}</span>
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
                                                <span>{t('common:Quay v??? trang ch???')}</span>
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
