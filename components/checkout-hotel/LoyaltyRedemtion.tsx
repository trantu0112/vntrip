import React, { useEffect, useState } from 'react'
import { Form, Button, Input } from 'antd'
// import { IconCheckedGreen } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import { useUserInfo } from '../../utils/custom-hook'
import { displayPrice, showMessage } from '../../utils/common'
import { applyRedemption, deletePoints, removeRedemption } from '../../api/user-services'
import { ValidationForm } from '../../constants/interface'
import { useDispatch, useSelector } from 'react-redux'
import { setRefreshTime } from '../../store/common/action'
import DisplayPrice from '../common/DisplayPrice'

interface Props {
    bookingRequestId: string
    orderCode: string
    redeemInfo: any
    businessAccountId?: number | null
    couponInfo: any
    bookerData: {
        user_id: number
        first_name: string
        last_name: string
        email: string
        phone: string
        gender: 0 | 1 | 2
        is_receiver?: boolean
        language?: string
        type?: string
    }
}

const LoyaltyRedemtion: React.FC<Props> = ({ bookingRequestId, orderCode, redeemInfo, bookerData }) => {
    const { t } = useTranslation(['common', 'error'])
    const dispatch = useDispatch()
    const [disabledSubmit, setDisableSubmit] = useState<boolean>(true)
    const [isUsedPoint, setIsUsedPoint] = useState<boolean>(false)
    const [cashbackValue, setCashbackValue] = useState<string>('')
    const [validateCashback, setValidateCashback] = useState<ValidationForm>({ status: 'success', text: '' })
    const userInfo = useUserInfo()
    const { refreshTime } = useSelector((state: any) => {
        return {
            refreshTime: state.common.refreshTime,
        }
    })
    useEffect(() => {
        if (redeemInfo?.status === 'REDEEM_SETTINGS') {
            setIsUsedPoint(false)
            setValidateCashback({
                status: 'success',
                text: t(``),
            })
        }
        if (['TEMPORARY', 'DRAFT'].includes(redeemInfo?.status)) {
            redeemInfo?.status === 'TEMPORARY'
                ? setValidateCashback({
                      status: 'warning',
                      text: t(`error:${redeemInfo?.temporary_reason?.error_code}`),
                  })
                : setValidateCashback({
                      status: 'warning',
                      // text: t(redeemInfo?.temporary_reason?.message),
                      text: t(
                          redeemInfo?.temporary_reason?.error_code
                              ? `error:${redeemInfo?.temporary_reason?.error_code}`
                              : redeemInfo?.temporary_reason?.message
                      ),
                  })
            setIsUsedPoint(true)
            setCashbackValue(redeemInfo?.additional_settings?.actual_redeem_point)
        }
    }, [redeemInfo, refreshTime])
    const onChangeCashback = (value: string) => {
        setCashbackValue(value)
        if (value === '' || value.trim() === '') {
            setDisableSubmit(true)
            setValidateCashback({ status: 'success', text: '' })
            return
        }

        const point = Number(value.replace('.', ''))
        const addSetting = redeemInfo.additional_settings
        if (isNaN(point)) {
            setDisableSubmit(true)
            setValidateCashback({ status: 'error', text: 'Số điểm không hợp lệ' })
            return
        }
        if (point <= 0) {
            setDisableSubmit(true)
            setValidateCashback({ status: 'error', text: 'Số điểm phải lớn hơn 0' })
            return
        }
        if (point < addSetting.min_point_redeem) {
            setDisableSubmit(true)
            setValidateCashback({
                status: 'error',
                text: `Số tiền tối thiểu cần tiêu: ${displayPrice(addSetting.min_point_redeem, 'VND')}`,
            })
            return
        }
        if (point > addSetting.max_point_redeem) {
            setDisableSubmit(true)
            setValidateCashback({
                status: 'error',
                text: `Số tiền tối đa được tiêu: ${displayPrice(addSetting.max_point_redeem, 'VND')}`,
            })
            return
        }
        setValidateCashback({ status: 'success', text: '' })
        setDisableSubmit(false)
    }

    const onSubmit = async () => {
        try {
            const res = await applyRedemption(bookingRequestId, Number(cashbackValue.replace('.', '')))
            if (res.status === 'success') {
                dispatch(setRefreshTime(+new Date()))
                setIsUsedPoint(true)
                if (res.data.status === 'DRAFT') {
                    showMessage('success', 'Áp dụng tiêu điểm thành công')
                }
            } else {
                setValidateCashback({
                    status: 'error',
                    text: res.message,
                })
            }
        } catch (e) {
            throw e
        }
    }

    const onCancel = async () => {
        let response: any
        if (orderCode) {
            response = await deletePoints(bookingRequestId, 'DEBIT')
        } else {
            response = await removeRedemption(bookingRequestId)
        }
        if (response.status === 'success') {
            dispatch(setRefreshTime(+new Date()))
            setIsUsedPoint(false)
            setCashbackValue('')
            setDisableSubmit(true)
            showMessage('success', 'Bỏ tiêu điểm thành công')
        } else {
            setValidateCashback({
                status: 'error',
                text: response.message,
            })
        }
    }

    const additonSetting = redeemInfo?.additional_settings

    if (!!userInfo && !!additonSetting && userInfo.user_id === bookerData.user_id) {
        return (
            <>
                <div className="checkoutLayout__title">
                    <span>{t('Sử dụng hoàn tiền')}</span>
                </div>
                <div className="checkoutPayment__cashback">
                    <p>
                        {t('Hoàn tiền khả dụng')}:&nbsp;
                        <span className="yellow-1">
                            <DisplayPrice price={additonSetting.account_available_point} />
                        </span>
                    </p>

                    <div className="cashbackInput">
                        <p className="mr15">{t('Số tiền muốn sử dụng')}:</p>
                        <div className="d-flex">
                            <Form.Item label={''} validateStatus={validateCashback.status} help={validateCashback.text}>
                                <Input
                                    className={'form-control form-control_xs'}
                                    size={'small'}
                                    value={cashbackValue}
                                    disabled={isUsedPoint}
                                    onChange={(event) => onChangeCashback(event.target.value)}
                                />
                            </Form.Item>
                            {isUsedPoint ? (
                                <Button type="primary" size={'small'} onClick={onCancel}>
                                    <span>{t('Hủy')}</span>
                                </Button>
                            ) : (
                                <Button type="primary" disabled={disabledSubmit} size={'small'} onClick={onSubmit}>
                                    <span>{t('Áp dụng')}</span>
                                </Button>
                            )}
                        </div>
                    </div>
                    <p className="size-12 gray-5">
                        {additonSetting.min_point_setting > 0 ? (
                            <>
                                (*) {t('Quý khách có thể sử dụng tối thiểu')}&nbsp;
                                <strong className="black-1">
                                    <DisplayPrice price={additonSetting.min_point_setting} />
                                </strong>
                                {t('và tối đa')}
                                <strong className="black-1">
                                    <DisplayPrice price={additonSetting.max_point_order} />
                                </strong>
                            </>
                        ) : (
                            <>
                                (*) {t('Số tiền tối đa quý khách có thể sử dụng cho đơn hàng này là')}&nbsp;{' '}
                                <strong className="black-1">
                                    <DisplayPrice price={additonSetting.max_point_order} />
                                </strong>
                            </>
                        )}
                    </p>
                    <p className="mb0">
                        {additonSetting.account_available_point > 0 &&
                            typeof additonSetting.actual_redeem_point === 'number' && (
                                <>
                                    {t('Tài khoản còn lại')}:&nbsp;
                                    <span className="yellow-1">
                                        <DisplayPrice
                                            price={
                                                additonSetting.account_available_point -
                                                additonSetting.actual_redeem_point
                                            }
                                        />
                                    </span>
                                </>
                            )}
                    </p>
                </div>
            </>
        )
    }
    return null
}

export default LoyaltyRedemtion
