import React from 'react'
import { useTranslation } from 'react-i18next'
import DisplayPrice from '../common/DisplayPrice'
interface Props {
    rate: any
}
const ExtraCharge: React.FC<Props> = ({ rate }) => {
    const { t } = useTranslation(['payment', 'hotel'])
    const renderNameExtraCharge = (type: string) => {
        let name = ''
        switch (type) {
            case 'SERVICECHARGE':
                return (name = t('Phí phụ thu'))
            case 'VAT':
                return (name = t('hotel:Phí VAT'))
            default:
                return name
        }
    }
    return (
        <div className="couponBox">
            <p className="semibold checkoutLayout__title">
                <span>{t('Phí phụ thu tại khách sạn')}</span>
            </p>

            {rate?.price_details?.extra_charges_breakdown?.extra_charge.map((res: any, index: number) => {
                if (res?.excluded) {
                    return (
                        <div key={index} className="flexGroup">
                            <p className="semibold">{renderNameExtraCharge(res.type) || res.name}</p>
                            <p className="yellow-1 semibold">
                                <DisplayPrice price={res?.converted_amount} />
                            </p>
                        </div>
                    )
                }
                return null
            })}
            <p className="gray-5 mb0 mt10 italic">
                {t(
                    'Các khoản phí trên khách hàng phải thanh toán với khách sạn khi nhận phòng hoặc trả phòng tại khách sạn'
                )}
            </p>
        </div>
    )
}

export default ExtraCharge
