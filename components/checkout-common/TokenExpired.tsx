import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface Props {
    type: 'hotel' | 'flight' | 'voucher'
}

const TokenExpired: React.FC<Props> = ({ type }) => {
    const { t } = useTranslation(['hotel', 'common'])
    return (
        <div className="expiredSession">
            <div className="alert alert_fail">
                <div className="alert__icon">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.0646 8.31445C16.0646 8.21133 15.9802 8.12695 15.8771 8.12695L14.3303 8.13398L12.0006 10.9113L9.67324 8.13633L8.12402 8.1293C8.0209 8.1293 7.93652 8.21133 7.93652 8.3168C7.93652 8.36133 7.95293 8.40352 7.98105 8.43867L11.0303 12.0715L7.98105 15.702C7.95273 15.7363 7.93702 15.7793 7.93652 15.8238C7.93652 15.927 8.0209 16.0113 8.12402 16.0113L9.67324 16.0043L12.0006 13.227L14.3279 16.002L15.8748 16.009C15.9779 16.009 16.0623 15.927 16.0623 15.8215C16.0623 15.777 16.0459 15.7348 16.0177 15.6996L12.9732 12.0691L16.0224 8.43633C16.0506 8.40352 16.0646 8.35898 16.0646 8.31445Z"
                            fill="#F5222D"
                        />
                        <path
                            d="M12 1.52344C6.20156 1.52344 1.5 6.225 1.5 12.0234C1.5 17.8219 6.20156 22.5234 12 22.5234C17.7984 22.5234 22.5 17.8219 22.5 12.0234C22.5 6.225 17.7984 1.52344 12 1.52344ZM12 20.7422C7.18594 20.7422 3.28125 16.8375 3.28125 12.0234C3.28125 7.20938 7.18594 3.30469 12 3.30469C16.8141 3.30469 20.7188 7.20938 20.7188 12.0234C20.7188 16.8375 16.8141 20.7422 12 20.7422Z"
                            fill="#F5222D"
                        />
                    </svg>
                </div>
                <div className="alert__text">
                    <p className="p1">{t('common:Phiên giao dịch hết hạn')}</p>
                    <p className="p2">
                        {t(
                            `Quý khách vui lòng quay lại trang tìm kiếm để tiến hành đặt ${
                                type === 'hotel' ? 'phòng' : 'vé'
                            } lại`
                        )}
                        . {t('Thành thật xin lỗi về sự bất tiện này')}
                    </p>
                </div>
            </div>
            <div className="expiredSession__btn">
                <Link href={type === 'hotel' ? '/' : '/ve-may-bay'}>
                    <a className="btn btn_outline">
                        <span>{t('common:Quay lại trang chủ')}</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default TokenExpired
