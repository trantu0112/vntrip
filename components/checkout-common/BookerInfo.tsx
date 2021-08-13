import React, { memo, useState, useEffect } from 'react'
import { Form, Checkbox, Input, Select } from 'antd'
import { getFullName, splitFirstAndLastName } from '../../utils/user'

import { useDispatch, useSelector } from 'react-redux'
import { setBookerData, validateBookerData } from '../../store/checkout/action'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const SIZE: 'large' | 'default' | 'small' = 'large'

interface Props {}

const BookerInfo: React.FC<Props> = memo(() => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel'])
    const { bookerData, validateBooker } = useSelector((state: any) => {
        return {
            bookerData: state.checkout.bookerData,
            validateBooker: state.checkout.validateBooker || {
                gender: { status: 'success', text: '' },
                firstName: { status: 'success', text: '' },
                lastName: { status: 'success', text: '' },
                fullName: { status: 'success', text: '' },
                phone: { status: 'success', text: '' },
                email: { status: 'success', text: '' },
            },
        }
    })
    const [fullName, setFullName] = useState('')
    const [type, setType] = useState<'hotel' | 'flight'>('hotel')

    useEffect(() => {
        setType(router.pathname.includes('/khach-san') ? 'hotel' : 'flight')
    }, [router.pathname])

    useEffect(() => {
        setFullName(getFullName(bookerData?.first_name, bookerData?.last_name))
    }, [bookerData?.first_name, bookerData?.last_name])

    const onChangeGender = (gender: number) => {
        dispatch(setBookerData({ ...bookerData, gender }))
        dispatch(
            validateBookerData({
                ...validateBooker,
                gender: { status: 'success', text: '' },
            })
        )
    }

    const onChangeName = (full_name: string) => {
        setFullName(full_name)
        dispatch(
            validateBookerData({
                ...validateBooker,
                fullName: { status: 'success', text: '' },
            })
        )
    }

    const onBlurName = (full_name: string) => {
        const { first_name, last_name } = splitFirstAndLastName(full_name)
        dispatch(setBookerData({ ...bookerData, first_name, last_name }))
    }

    const onChangePhone = (phone: string) => {
        dispatch(setBookerData({ ...bookerData, phone }))
        dispatch(
            validateBookerData({
                ...validateBooker,
                phone: { status: 'success', text: '' },
            })
        )
    }

    const onChangeEmail = (email: string) => {
        dispatch(setBookerData({ ...bookerData, email }))
        dispatch(
            validateBookerData({
                ...validateBooker,
                email: { status: 'success', text: '' },
            })
        )
    }

    const onChangeIsReceiver = (checked: boolean) => {
        dispatch(setBookerData({ ...bookerData, is_receiver: checked }))
    }

    return (
        <Form layout="vertical" size={SIZE}>
            <div className="checkoutInfo__row">
                <div className="form-group form-group_gender">
                    <Form.Item
                        label={
                            <>
                                {t('Danh xưng')} <span className={'red-1'}>&nbsp;*</span>
                            </>
                        }
                        validateStatus={validateBooker?.gender.status}
                        help={validateBooker?.gender.text}
                    >
                        <Select
                            placeholder={t('Danh xưng')}
                            value={bookerData ? bookerData.gender : 1}
                            onChange={(value) => onChangeGender(value)}
                        >
                            <Select.Option value={1}>{t('Anh')}</Select.Option>
                            <Select.Option value={2}>{t('Chị')}</Select.Option>
                            <Select.Option value={0}>{t('Khác')}</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="form-group form-group_name">
                    <Form.Item
                        label={
                            <>
                                {t('Họ và tên')} <span className={'red-1'}>&nbsp;*</span>
                            </>
                        }
                        validateStatus={validateBooker?.fullName.status}
                        help={validateBooker?.fullName.text}
                    >
                        <Input
                            placeholder={t('Họ và tên')}
                            type={'text'}
                            value={fullName}
                            onChange={(event) => onChangeName(event.target.value)}
                            onBlur={(event) => onBlurName(event.target.value)}
                        />
                    </Form.Item>
                </div>
            </div>
            <div className="checkoutInfo__row">
                <div className="form-group">
                    <Form.Item
                        label={
                            <>
                                {t('Số điện thoại')} <span className={'red-1'}>&nbsp;*</span>
                            </>
                        }
                        validateStatus={validateBooker?.phone.status}
                        help={validateBooker?.phone.text}
                    >
                        <Input
                            placeholder={t('Số điện thoại')}
                            type={'text'}
                            addonBefore={'(+84)'}
                            value={bookerData?.phone}
                            onChange={(event) => onChangePhone(event.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item
                        label={
                            <>
                                {t('Email')} <span className={'red-1'}>&nbsp;*</span>
                            </>
                        }
                        validateStatus={validateBooker?.email.status}
                        help={validateBooker?.email.text}
                    >
                        <Input
                            placeholder={t('Email')}
                            type={'text'}
                            value={bookerData?.email}
                            onChange={(event) => onChangeEmail(event.target.value)}
                        />
                    </Form.Item>
                </div>
            </div>
            {type === 'hotel' && (
                <Checkbox
                    className="mb15"
                    checked={typeof bookerData?.is_receiver === 'undefined' ? true : bookerData?.is_receiver}
                    onChange={(event) => onChangeIsReceiver(event.target.checked)}
                >
                    {t('hotel:Tôi là người nhận phòng')}
                </Checkbox>
            )}
        </Form>
    )
})

export default BookerInfo
