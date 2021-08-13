import React from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const LayoutCheckout = dynamic(() => import('../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../components/checkout-common/HeaderCheckout'))

const SendingRequest = () => {
    const { t } = useTranslation(['common'])
    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={3} type={'hotel'} />
                <div className="checkoutLayout__body">
                    <div className="container">
                        <div className="checkoutState">
                            <div className="checkoutState__cont">
                                <div className="checkoutState__title">
                                    <p className="size-20 semibold mb0 uppercase yellow-1">
                                        {t('common:GỬI YÊU CẦU HỖ TRỢ THÀNH CÔNG')}!
                                    </p>
                                </div>
                                <div className="checkoutState__text">
                                    <p>
                                        {t('common:VNTRIP.VN đã nhận được thông tin yêu cầu hỗ trợ của Quý khách')}.
                                        <br />
                                        {t('common:Bộ phận chăm sóc khách hàng sẽ liên hệ ngay để giải đáp thắc mắc')}.
                                    </p>
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

export default SendingRequest
