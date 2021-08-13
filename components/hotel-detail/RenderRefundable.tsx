import React from 'react'
import { IconRefundable, IconTooltip } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'

interface Props {
    refundable: boolean
    cancelPolicies: string
    provider: string
    rateIdentifier: string
    isNoneAllotment: string
}

const RenderRefundable: React.FC<Props> = ({
    refundable,
    cancelPolicies,
    provider,
    rateIdentifier,
    isNoneAllotment,
}) => {
    const { t } = useTranslation(['hotel'])

    const providerToNumber = (provider: string) => {
        if (!provider) return null
        switch (provider.toLowerCase()) {
            case 'vntrip':
                return rateIdentifier
            case 'bookingcom':
                return 2
            case 'expedia':
                return 3
            default:
                return 0
        }
    }

    const ToolTipConfirmAllotment = () => {
        return <span>{t('Đây là giá phòng đặc biệt ưu đãi Vntrip dành riêng cho bạn')}</span>
    }

    return (
        <div className={`roomPolicy__item ${refundable ? 'green-1' : 'red-1'}`}>
            <Tooltip title={providerToNumber(provider)} placement="bottom">
                <div className="roomPolicy__icon">
                    <IconRefundable isRefund={refundable} />
                </div>
            </Tooltip>
            <div className="roomPolicy__text">
                <span>{t('Hủy phòng')}</span>
                <span>
                    {refundable ? t('Có hoàn hủy') : t('Không hoàn hủy')}
                    <div className="tooltipBox">
                        <IconTooltip />
                        <div className="tooltipBox__cont">
                            <p className="semibold">{t('Chính sách hủy phòng')}</p>
                            <p className="mb0">{cancelPolicies}</p>
                        </div>
                    </div>
                    {provider.toLowerCase() === 'vntrip' &&
                        (rateIdentifier.toUpperCase() === 'OT' ||
                            (rateIdentifier.toUpperCase() === 'NT' && isNoneAllotment)) && (
                            <div className="flexGroup">
                                <div className="yellow-1">
                                    {t('Xác nhận đặt phòng trong 1h')}
                                    <Tooltip
                                        className="d-inline-block iconToolTip n-after ml5"
                                        title={<ToolTipConfirmAllotment />}
                                        placement="bottom"
                                    >
                                        {' '}
                                        <IconTooltip />
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                </span>
            </div>
        </div>
    )
}

export default RenderRefundable
