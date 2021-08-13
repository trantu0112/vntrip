import React, { useEffect, useState, memo } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

interface iProps {
    index: number
    fullName: string
    phone: string
    onChangeName: (index: number, value: string) => void
    onChangePhone: (index: number, value: string) => void
    addonBefore?: string
    name_status: 'success' | 'error' | 'warning' | 'validating' | undefined
    name_text: string
    phone_status: 'success' | 'error' | 'warning' | 'validating' | undefined
    phone_text: string
}

const ReceiverItem: React.FC<iProps> = ({
    index,
    fullName,
    phone,
    onChangeName,
    onChangePhone,
    name_status,
    name_text,
    phone_status,
    phone_text,
}) => {
    const { t } = useTranslation(['common', 'hotel'])
    const [nameItem, setNameItem] = useState<string>('')
    const [phoneItem, setPhoneItem] = useState<string>('')

    useEffect(() => {
        setNameItem(fullName)
    }, [fullName])

    useEffect(() => {
        setPhoneItem(phone)
    }, [phone])

    const handleChangeName = (index: number, _value: string) => {
        setNameItem(_value)
        onChangeName(index, _value)
    }

    const handleChangePhone = (index: number, _value: string) => {
        setPhoneItem(_value)
        onChangePhone(index, _value)
    }
    return (
        <li>
            <div className="checkoutLayout__title">
                <span>
                    {t('hotel:Thông tin người nhận phòng')} {index + 1}
                </span>
            </div>
            <div className="checkoutInfo__row">
                <div className="form-group">
                    <Form.Item label={t('Họ và tên')} validateStatus={name_status} help={name_text}>
                        <Input
                            key={index}
                            type={'text'}
                            value={nameItem}
                            onChange={(event) => handleChangeName(index, event.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item label={t('Số điện thoại')} validateStatus={phone_status} help={phone_text}>
                        <Input
                            type={'text'}
                            addonBefore={'(+84'}
                            value={phoneItem}
                            onChange={(event) => handleChangePhone(index, event.target.value)}
                        />
                    </Form.Item>
                </div>
            </div>
        </li>
    )
}

export default memo(ReceiverItem)
