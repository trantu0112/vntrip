import { Button, Form, Input, Modal } from 'antd'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { getSlotId } from '../../api/partner-service'
import {
    verificationRequestPhone,
    verificationRequestPhoneNotMember,
    verifyPhone,
    verifyPhoneNotMember,
} from '../../api/user-services'
import { VERIFICATION_FEATURES } from '../../constants/enums'
import { ValidationForm } from '../../constants/interface'
import { useTranslation } from '../../i18n'
import { getLimitLotte } from '../../utils/checkout'
import { convertPhone, isPhoneValid, showMessage } from '../../utils/common'
import { getBookerAndPassengers, getBookerAndReceiver, getPhoneNotMember, savePhoneNotMember } from '../../utils/user'
import EnterOtp from './EnterOtp'

interface Props {
    presetPhone: string
    bookerDataRoot: any
    onClose?: () => void
}

const VerifyPhone: React.FC<Props> = (props: Props) => {
    const { t } = useTranslation(['common', 'notification'])
    const [verificationId, setVerificationId] = useState<number>(0)
    const [phone, setPhone] = useState<string>(props.presetPhone || '')
    const [bookerDataRoot, setBookerDataRoot] = useState<any>(props.bookerDataRoot || '')
    const [validatePhone, setValidatePhone] = useState<ValidationForm | null>(null)
    const [popupToShow, setPopupToShow] = useState<'ENTER_PHONE' | 'ENTER_OTP'>('ENTER_PHONE')
    const [loading, setLoading] = useState<boolean>(false)
    const [loginAdmin, setLoginAdmin] = useState<boolean>(false)
    const accessToken = Cookies.get('accessToken')

    const onChangePhone = (value: string) => {
        setPhone(value.trim())
        setValidatePhone(null)
    }

    const onClickRequestVerifyPhone = async () => {
        if (!phone) {
            setValidatePhone({ status: 'error', text: t('notification:Vui lòng nhập số điện thoại') })
            return false
        }
        if (!isPhoneValid(phone)) {
            setValidatePhone({ status: 'error', text: t('notification:Số điện thoại không đúng định dạng') })
            return false
        }
        setLoading(true)
        let res
        if (accessToken) {
            res = await verificationRequestPhone({
                feature: VERIFICATION_FEATURES.PROFILE_VERIFIED,
                phone: convertPhone(phone),
            })
        } else {
            res = await verificationRequestPhoneNotMember({
                feature: VERIFICATION_FEATURES.PROFILE_VERIFIED,
                phone: convertPhone(phone),
            })
        }
        setLoading(false)
        if (res.status === 'error') {
            if (!accessToken) {
                setLoginAdmin(true)
            }
            showMessage('error', res.message)
        } else {
            setVerificationId(res.data.verificationId)
            setPopupToShow('ENTER_OTP')
        }
    }

    const onConfirmOtpSuccess = async () => {
        let res
        if (accessToken) {
            res = await verifyPhone({ verificationId, phone: convertPhone(phone) })
        } else {
            res = await verifyPhoneNotMember({ verificationId, phone: convertPhone(phone) })
            if (res.status !== 'error') {
                savePhoneNotMember(convertPhone(phone))
                const phone_not_member = convertPhone(phone).replace('+84', '0')
                await getSlotId(phone_not_member)
                await getLimitLotte(bookerDataRoot)
            }
        }
        if (res.status === 'error') {
            showMessage('error', res.message)
            return
        }
        showMessage('success', t('common:Xác thực số điện thoại thành công, vui lòng tiếp tục!'))
        onClose()
    }

    const onClose = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    const openPopupSignIn = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/login?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }

    return (
        <>
            {popupToShow === 'ENTER_PHONE' ? (
                <Modal
                    footer={null}
                    visible={true}
                    maskClosable={false}
                    title={t('common:Xác thực số điện thoại')}
                    onCancel={onClose}
                >
                    <div>
                        <Form size={'large'}>
                            <Form.Item validateStatus={validatePhone?.status} help={validatePhone?.text}>
                                <Input
                                    placeholder={t('common:Số điện thoại')}
                                    value={phone}
                                    onChange={(event) => onChangePhone(event.target.value)}
                                    onKeyPress={async (e: any) => {
                                        if (e.charCode === 13) {
                                            await onClickRequestVerifyPhone()
                                        }
                                    }}
                                />
                            </Form.Item>
                            <Button
                                type="primary"
                                block={true}
                                style={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                }}
                                onClick={onClickRequestVerifyPhone}
                                loading={loading}
                            >
                                {t('common:Tiếp tục')}
                            </Button>
                            {loginAdmin && false ? (
                                <>
                                    <p className="orPopupVerify">{t('Hoặc')}</p>
                                    <Button
                                        type="primary"
                                        block={true}
                                        style={{
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={openPopupSignIn}
                                    >
                                        {t('Đăng nhập')}
                                    </Button>
                                </>
                            ) : null}
                        </Form>
                    </div>
                </Modal>
            ) : null}
            {popupToShow === 'ENTER_OTP' ? (
                <EnterOtp
                    verificationId={verificationId}
                    type="phone"
                    feature={VERIFICATION_FEATURES.PROFILE_VERIFIED}
                    value={convertPhone(phone)}
                    onClose={onClose}
                    onResend={(verificationId) => {
                        setVerificationId(verificationId)
                    }}
                    onConfirmSuccess={onConfirmOtpSuccess}
                />
            ) : null}
        </>
    )
}

export default VerifyPhone
