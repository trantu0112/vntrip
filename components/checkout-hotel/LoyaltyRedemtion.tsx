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
            setValidateCashback({ status: 'error', text: 'S??? ??i???m kh??ng h???p l???' })
            return
        }
        if (point <= 0) {
            setDisableSubmit(true)
            setValidateCashback({ status: 'error', text: 'S??? ??i???m ph???i l???n h??n 0' })
            return
        }
        if (point < addSetting.min_point_redeem) {
            setDisableSubmit(true)
            setValidateCashback({
                status: 'error',
                text: `S??? ti???n t???i thi???u c???n ti??u: ${displayPrice(addSetting.min_point_redeem, 'VND')}`,
            })
            return
        }
        if (point > addSetting.max_point_redeem) {
            setDisableSubmit(true)
            setValidateCashback({
                status: 'error',
                text: `S??? ti???n t???i ??a ???????c ti??u: ${displayPrice(addSetting.max_point_redeem, 'VND')}`,
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
                    showMessage('success', '??p d???ng ti??u ??i???m th??nh c??ng')
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
            showMessage('success', 'B??? ti??u ??i???m th??nh c??ng')
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
                    <span>{t('S??? d???ng ho??n ti???n')}</span>
                </div>
                <div className="checkoutPayment__cashback">
                    <p>
                        {t('Ho??n ti???n kh??? d???ng')}:&nbsp;
                        <span className="yellow-1">
                            <DisplayPrice price={additonSetting.account_available_point} />
                        </span>
                    </p>

                    <div className="cashbackInput">
                        <p className="mr15">{t('S??? ti???n mu???n s??? d???ng')}:</p>
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
                                    <span>{t('H???y')}</span>
                                </Button>
                            ) : (
                                <Button type="primary" disabled={disabledSubmit} size={'small'} onClick={onSubmit}>
                                    <span>{t('??p d???ng')}</span>
                                </Button>
                            )}
                        </div>
                    </div>
                    <p className="size-12 gray-5">
                        {additonSetting.min_point_setting > 0 ? (
                            <>
                                (*) {t('Qu?? kh??ch c?? th??? s??? d???ng t???i thi???u')}&nbsp;
                                <strong className="black-1">
                                    <DisplayPrice price={additonSetting.min_point_setting} />
                                </strong>
                                {t('v?? t???i ??a')}
                                <strong className="black-1">
                                    <DisplayPrice price={additonSetting.max_point_order} />
                                </strong>
                            </>
                        ) : (
                            <>
                                (*) {t('S??? ti???n t???i ??a qu?? kh??ch c?? th??? s??? d???ng cho ????n h??ng n??y l??')}&nbsp;{' '}
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
                                    {t('T??i kho???n c??n l???i')}:&nbsp;
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
