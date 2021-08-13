import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type SizeType = Parameters<typeof Form>[0]['size']
interface Props {
    handleChangeFieldForm: any
    validateForm: any
    handleSubmit?: any
    isLoading?: boolean
    data: any
}
const CreateBookingRequest: React.FC<Props> = ({
    handleChangeFieldForm,
    validateForm,
    handleSubmit,
    isLoading,
    data,
}) => {
    const { t } = useTranslation(['common'])
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default')
    return (
        <>
            <Form layout="vertical" initialValues={{ size: 'default' }} size={componentSize as SizeType}>
                <Form.Item label={t('Họ và tên')}>
                    <Input
                        placeholder={t('Họ và tên')}
                        value={data?.name}
                        onChange={(event) => handleChangeFieldForm(event.target.value, 'name')}
                    />
                </Form.Item>
                <Form.Item
                    label={t('Số điện thoại')}
                    validateStatus={validateForm?.phone.status}
                    help={validateForm?.phone.text}
                >
                    <Input
                        placeholder={t('Số điện thoại')}
                        value={data?.phone}
                        onChange={(event) => handleChangeFieldForm(event.target.value, 'phone')}
                    />
                </Form.Item>
                <Form.Item
                    label={t('Email')}
                    validateStatus={validateForm?.email.status}
                    help={validateForm?.email.text}
                >
                    <Input
                        placeholder={t('Email')}
                        value={data?.email}
                        onChange={(event) => handleChangeFieldForm(event.target.value, 'email')}
                    />
                </Form.Item>
                <Form.Item label={t('Yêu cầu khác')}>
                    <Input.TextArea
                        placeholder={t('Yêu cầu khác')}
                        value={data?.customer_request}
                        onChange={(event) => handleChangeFieldForm(event.target.value, 'customer_request')}
                    />
                </Form.Item>
                {handleSubmit && (
                    <Form.Item>
                        <Button type={'primary'} onClick={() => handleSubmit()} loading={isLoading}>
                            {t('Gửi yêu cầu')}
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </>
    )
}
export default CreateBookingRequest
