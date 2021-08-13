import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Button, Modal } from 'antd'
import {
    confirmVerification,
    verificationRequestEmail,
    verificationRequestPhone,
    verificationRequestPhoneNotMember,
} from '../../api/user-services'
import { convertPhone, showMessage } from '../../utils/common'
import { getBookerAndPassengers, getBookerAndReceiver } from '../../utils/user'

interface Props {
    type: 'email' | 'phone'
    verificationId: number
    value: string
    feature: string
    onClose?: (data?: any) => void
    onResend: (verificationId: number) => void
    onConfirmSuccess?: (data?: any) => void
    onConfirmFail?: (data?: any) => void
}

const EnterOtp: React.FC<Props> = (props: Props) => {
    const { t } = useTranslation(['common', 'notification'])
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [listDigit, setListDigit] = useState<string[]>(['', '', '', '', '', ''])
    const [timeLeft, setTimeLeft] = useState<number>(60)
    const [failTimes, setFailTimes] = useState<number>(0)
    const digitRef = useRef<any>([])
    useEffect(() => {
        setIsDisabled(listDigit.some((digit: string) => digit === '' || isNaN(Number(digit))) || failTimes >= 5)
    }, [listDigit, failTimes])
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)
        return () => clearTimeout(timer)
    })

    const handleConfirmOtp = async (otp: string) => {
        setIsLoading(true)
        const resConfirmOtp = await confirmVerification({
            code: otp,
            feature: props.feature,
            verificationId: props.verificationId,
        })
        if (resConfirmOtp.status === 'success') {
            if (props.onConfirmSuccess) {
                props.onConfirmSuccess()
            }
        } else {
            showMessage('error', resConfirmOtp.message)
            setFailTimes(Math.min(failTimes + 1, 5))
            if (props.onConfirmFail) {
                props.onConfirmFail()
            }
        }
        setIsLoading(false)
    }

    const handleChange = (index: number, value: string) => {
        if (!value) {
            const _newList = [...listDigit]
            _newList[index] = ''
            setListDigit(_newList)
            if (index > 0) {
                digitRef.current[index - 1].focus() // focus into prev input
                digitRef.current[index - 1].select() // focus into next input
            }
        } else if ('0123456789'.includes(value.slice(-1))) {
            const _newList = [...listDigit]
            _newList[index] = value.slice(-1)
            setListDigit(_newList)
            if (index < 5) {
                digitRef.current[index + 1].focus() // focus into next input
                digitRef.current[index + 1].select() // focus into next input
            }
        }
    }

    const handleBackspace = (index: number) => {
        const _newList = [...listDigit]
        _newList[index] = ''
        setListDigit(_newList)
        if (index > 0) {
            digitRef.current[index - 1].focus() // focus into prev input
            digitRef.current[index - 1].select() // focus into next input
        }
    }

    const handlePaste = (index: number, value: string) => {
        value.replace(/ /g, '') // remove space
        if (value.length > 1) {
            setListDigit(
                Array.from(value.substr(0, 6)).map((digit) => {
                    return isNaN(Number(digit)) ? '' : digit
                })
            )
        } else {
            handleChange(index, value)
        }
    }

    const onResendClick = async () => {
        let booker
        if (getBookerAndReceiver()) {
            booker = getBookerAndReceiver()['booker']
        } else {
            booker = getBookerAndPassengers()['booker']
        }
        const res =
            props.type === 'email'
                ? await verificationRequestEmail({ feature: props.feature, email: props.value })
                : booker && booker.user_id !== 0
                ? await verificationRequestPhone({
                      feature: props.feature,
                      phone: convertPhone(props.value),
                  })
                : await verificationRequestPhoneNotMember({
                      feature: props.feature,
                      phone: convertPhone(props.value),
                  })
        if (res.status === 'error') {
            showMessage('error', res.message)
        } else {
            setListDigit(['', '', '', '', '', ''])
            setTimeLeft(60)
            setFailTimes(0)
            props.onResend(res.data.verificationId)
        }
    }

    return (
        <Modal
            visible={true}
            footer={null}
            maskClosable={false}
            title={t('common:Nhập mã OTP')}
            onCancel={props.onClose}
        >
            <p>
                {props.type === 'email' ? t('common:Mã OTP vừa được gửi tới email') : null}
                {props.type === 'phone' ? t('common:Mã OTP vừa được gửi tới số điện thoại') : null}{' '}
                <strong>{props.value}</strong>
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                {[0, 1, 2, 3, 4, 5].map((item) => {
                    return (
                        <div key={`digit-${item}`} style={{ padding: '5px' }}>
                            <Input
                                type="number"
                                style={{
                                    padding: '0 5px',
                                    textAlign: 'center',
                                    width: '40px',
                                    height: '40px',
                                }}
                                ref={(ref) => {
                                    digitRef.current[item] = ref
                                }}
                                maxLength={1}
                                value={listDigit[item]}
                                // onChange={(event) => handleChange(item, event.target.value)}
                                onPaste={(event: any) => handlePaste(item, event.clipboardData.getData('text'))}
                                onPressEnter={() => {
                                    if (!isDisabled) {
                                        handleConfirmOtp(listDigit.join(''))
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        handleBackspace(item)
                                    } else if ('0123456789'.includes(e.key)) {
                                        handleChange(item, e.key)
                                    }
                                }}
                            />
                        </div>
                    )
                })}
            </div>
            <Button
                type="primary"
                size="large"
                style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}
                disabled={isDisabled}
                onClick={() => handleConfirmOtp(listDigit.join(''))}
                loading={isLoading}
                block={true}
            >
                <span>{t('common:Xác thực')}</span>
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('common:Chưa nhận được mã?')}</span>
                {timeLeft > 0 ? (
                    <div>
                        <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="sync"
                            width="12px"
                            height="12px"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z" />
                        </svg>{' '}
                        {`${timeLeft}s`}
                    </div>
                ) : (
                    <a style={{ color: '#ff8917' }} onClick={onResendClick}>
                        {t('common:Gửi lại mã')}
                    </a>
                )}
            </div>
        </Modal>
    )
}

export default EnterOtp
