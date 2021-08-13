import React, { useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { Booker } from '../../constants/interface'
import { useTranslation } from 'react-i18next'
import { useUserInfo } from '../../utils/custom-hook'
import { useDispatch, useSelector } from 'react-redux'
import { setBookerData, setCustomerNote, validateBookerData } from '../../store/checkout/action'
import { getFullName, splitFirstAndLastName } from '../../utils/user'

interface Props {
    isShow: boolean
}

const CustomerInfo: React.FC<Props> = ({ isShow }) => {
    const { t } = useTranslation(['common'])
    const dispatch = useDispatch()
    const userInfo = useUserInfo()
    const { bookerData, customerNote, validateBooker } = useSelector((state: any) => {
        return {
            bookerData: state.checkout.bookerData,
            customerNote: state.checkout.customerNote,
            validateBooker: state.checkout.validateBooker || {
                gender: { status: 'success', text: '' },
                firstName: { status: 'success', text: '' },
                lastName: { status: 'success', text: '' },
                fullName: { status: 'success', text: '' },
                phone: { status: 'success', text: '' },
                email: { status: 'success', text: '' },
            },
            fullName: state.common.fullName,
        }
    })

    useEffect(() => {
        if (userInfo) {
            const booker: Booker = {
                user_id: userInfo.user_id,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                full_name: getFullName(userInfo.first_name, userInfo.last_name),
                email: userInfo.email,
                phone: userInfo.phone,
                gender: userInfo.gender,
                is_receiver: true,
            }
            dispatch(setBookerData(booker))
        } else {
            const booker: Booker = {
                user_id: 0,
                first_name: '',
                last_name: '',
                full_name: '',
                email: '',
                phone: '',
                gender: 1,
                is_receiver: true,
            }
            dispatch(setBookerData(booker))
        }
    }, [userInfo])

    const onChangeGender = (gender: number) => {
        dispatch(setBookerData({ ...bookerData, gender }))
    }

    const onChangeName = (full_name: string) => {
        // dispatch(setFullName(full_name))
        const { first_name, last_name } = splitFirstAndLastName(full_name)
        dispatch(setBookerData({ ...bookerData, first_name, last_name, full_name }))
        dispatch(
            validateBookerData({
                ...validateBooker,
                fullName: { status: 'success', text: '' },
            })
        )
    }

    const onBlurName = (full_name: string) => {
        const { first_name, last_name } = splitFirstAndLastName(full_name)
        dispatch(setBookerData({ ...bookerData, first_name, last_name, full_name }))
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

    const onChangeRequest = (value: string) => {
        dispatch(setCustomerNote(value))
    }

    return (
        <div className={`modal-deal__item ${isShow ? 'open' : ''}`}>
            <Form layout="vertical" size={'large'}>
                <div className="dealForm">
                    <div className="dealForm__col">
                        <div className="form-group">
                            <Form.Item
                                label={t('Danh xưng')}
                                validateStatus={validateBooker?.gender.status}
                                help={validateBooker?.gender.text}
                            >
                                <Select
                                    value={bookerData ? bookerData.gender : 1}
                                    onChange={(value) => onChangeGender(value)}
                                >
                                    <Select.Option value={1}>{t('Anh')}</Select.Option>
                                    <Select.Option value={2}>{t('Chị')}</Select.Option>
                                    <Select.Option value={0}>{t('Khác')}</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                label={t('Họ và tên')}
                                validateStatus={validateBooker?.fullName.status}
                                help={validateBooker?.fullName.text}
                            >
                                <Input
                                    type={'text'}
                                    value={bookerData?.full_name}
                                    onChange={(event) => onChangeName(event.target.value)}
                                    onBlur={(event) => onBlurName(event.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="dealForm__col">
                        <div className="form-group">
                            <Form.Item
                                label={'Email'}
                                validateStatus={validateBooker?.email.status}
                                help={validateBooker?.email.text}
                            >
                                <Input
                                    type={'text'}
                                    value={bookerData?.email}
                                    onChange={(event) => onChangeEmail(event.target.value)}
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                label={t('Số điện thoại')}
                                validateStatus={validateBooker?.phone.status}
                                help={validateBooker?.phone.text}
                            >
                                <Input
                                    type={'text'}
                                    addonBefore={'(+84)'}
                                    value={bookerData?.phone}
                                    onChange={(event) => onChangePhone(event.target.value)}
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item label={t('Yêu cầu khác')}>
                                <Input.TextArea
                                    value={customerNote}
                                    autoSize={{ minRows: 4, maxRows: 10 }}
                                    onChange={(event) => onChangeRequest(event.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default CustomerInfo
