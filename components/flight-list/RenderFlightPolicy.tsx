import React from 'react'
import { useTranslation } from 'react-i18next'

interface iProps {
    airline: string
}

const RenderFlightPolicy: React.FC<iProps> = ({ airline }) => {
    const { t } = useTranslation('flight')

    const renderHanleBaggage = (airline: string) => {
        switch (airline) {
            case 'VN':
                return '10 kg'
            case 'VJ':
                return '07 kg'
            case 'JQ':
                return '07 kg'
            case 'QH':
                return '07 kg'
            default:
                return ''
        }
    }

    const renderBaggage = (airline: string) => {
        switch (airline) {
            case 'VN':
                return 'Vui lòng chọn ở bước sau'
            case 'VJ':
                return 'Vui lòng chọn ở bước sau'
            case 'JQ':
                return 'Vui lòng chọn ở bước sau'
            case 'QH':
                return 'Vui lòng chọn ở bước sau'
            default:
                return 'Vui lòng chọn ở bước sau'
        }
    }

    const renderRefund = (airline: string) => {
        switch (airline) {
            case 'VN':
                return 'Liên hệ với Vntrip để biết thêm chi tiết'
            case 'VJ':
                return 'Không được phép'
            case 'JQ':
                return 'Liên hệ với Vntrip để biết thêm chi tiết'
            case 'QH':
                return 'Không được phép'
            default:
                return 'Liên hệ với Vntrip để biết thêm chi tiết'
        }
    }

    return (
        <>
            <div className="ticketDetail__item">
                <p className="semibold size-18 mb15 ticketDetail__title">{t('ĐIỀU KIỆN HÀNH LÝ')}:</p>
                <div className="ticketDetail__policy">
                    <ul>
                        {/*<li>*/}
                        {/*    <span>{t('Hành lý xách tay')}</span>*/}
                        {/*    <span>{t(renderHanleBaggage(airline))}.</span>*/}
                        {/*</li>*/}
                        <li>
                            <span>{t('Hành lý ký gửi')}</span>
                            <span>{t(renderBaggage(airline))}.</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="ticketDetail__item">
                <p className="semibold size-18 mb15 ticketDetail__title">{t('ĐIỀU KIỆN VỀ VÉ')}:</p>
                <div className="ticketDetail__policy">
                    <ul>
                        <li>
                            <span>{t('Hoàn Vé')}</span>
                            <span>{renderRefund(airline)}.</span>
                        </li>
                        <li>
                            <span>{t('Đổi ngày giờ chuyến bay')}</span>
                            <span>{t('Liên hệ với Vntrip để biết thêm chi tiết')}.</span>
                        </li>
                        <li>
                            <span>{t('Đổi hành trình')}</span>
                            <span>{t('Liên hệ với Vntrip để biết thêm chi tiết')}.</span>
                        </li>
                        <li>
                            <span>{t('Đổi tên hành khách')}</span>
                            <span>{t('Không được phép')}.</span>
                        </li>
                        <li>
                            <span>{t('Điểm cộng dặm')}</span>
                            <span>{t('Liên hệ với Vntrip để biết thêm chi tiết')}.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default RenderFlightPolicy
