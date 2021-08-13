import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import { setOpenCheckoutHotelInfo } from '../../store/checkout/action'
import { IconCheckedOrange, IconLogoBlack } from '../../constants/icons'

interface Props {
    step: number
    type: 'hotel' | 'flight' | 'voucher'
}

const HeaderCheckout: React.FC<Props> = ({ step, type }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['payment', 'voucher'])

    const openInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(true))
    }

    const renderTitleFromOrderType = (orderType: string) => {
        switch (orderType) {
            case 'hotel':
                return t('Thông tin đơn phòng')
            case 'flight':
                return t('Thông tin đơn vé')
            case 'voucher':
                return t('voucher:Thông tin đơn voucher')
            default:
                return ''
        }
    }

    return (
        <>
            <div className="checkoutLayout__header">
                <div className="container">
                    <div className="checkoutLayout__logo">
                        <div className="logo">
                            <a href="/" className="logo">
                                {t('Đặt phòng khách sạn - vé máy bay - combo du lịch giá rẻ')}
                                <IconLogoBlack />
                            </a>
                        </div>
                    </div>
                    <div className="checkoutLayout__step">
                        <div className="vntStep">
                            <div className={`vntStep__item ${step >= 1 ? 'active' : ''}`}>
                                <div className="vntStep__check">
                                    <IconCheckedOrange />
                                </div>
                                <p>
                                    1. {type === 'hotel' && t('Thông tin đặt phòng')}{' '}
                                    {type === 'flight' && t('Thông tin đặt vé')}
                                    {type === 'voucher' && t('voucher:Thông tin đặt voucher')}
                                </p>
                            </div>
                            <div className={`vntStep__item ${step > 1 ? 'active' : ''}`}>
                                <div className="vntStep__check">
                                    <IconCheckedOrange />
                                </div>
                                <p>2. {t('Thanh toán')}</p>
                            </div>
                            <div className={`vntStep__item ${step > 2 ? 'active' : ''}`}>
                                <div className="vntStep__check">
                                    <IconCheckedOrange />
                                </div>
                                <p>3. {t('Hoàn tất')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="showBookingMobile" onClick={openInfo} onKeyUp={openInfo} role={'button'} tabIndex={0}>
                <span>{renderTitleFromOrderType(type)}</span>
                <DownOutlined />
            </div>
        </>
    )
}

export default HeaderCheckout
