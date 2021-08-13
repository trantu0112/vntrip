import React, { useState } from 'react'
import Link from 'next/link'
import { LIST_HOTEL_FOOTER } from '../../constants/hotel'
import { LIST_LINK_FOOTER, VNTRIP_INFO } from '../../constants/common'
import { useTranslation } from 'react-i18next'
import { addSubcriber } from '../../api/common-services'
import { ValidationForm } from '../../constants/interface'
import { Button, Input, Form } from 'antd'
import { isEmailValid, showMessage } from '../../utils/common'
import { useRouter } from 'next/router'

const Footer: React.FC = () => {
    const { t, i18n } = useTranslation(['common', 'hotel', 'notification', 'error'])
    const [email, setEmail] = useState<string>('')
    const [validateEmail, setValidateEmail] = useState<ValidationForm>({ status: 'success', text: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleSubmit = async () => {
        if (!email) {
            setValidateEmail({ status: 'error', text: t('notification:Vui lòng nhập email') })
            return
        }
        if (email && !isEmailValid(email)) {
            setValidateEmail({ status: 'error', text: t('notification:Email không đúng định dạng') })
            return
        }

        try {
            setIsLoading(true)
            const data = {
                email: email,
                type: 'subscriber',
            }
            const res = await addSubcriber(data)
            setIsLoading(false)
            if (res.status === 'success') {
                showMessage('success', t('notification:Bạn đăng ký nhận thông báo thành công'))
            } else {
                showMessage('error', t(`error:${res.data.error_code}`))
            }
        } catch (e) {
            throw e
        }
    }

    const clearValidate = () => {
        setValidateEmail({ status: 'success', text: '' })
    }

    const handleChangeEmail = (value: string) => {
        setEmail(value)
        clearValidate()
    }
    const handleLinkPage = async (value: any, type: string) => {
        if (type === 'change') {
            await router.push({
                pathname: value,
            })
        }
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <p className="footer__title">
                        <span>{t('hotel:Khách sạn theo tỉnh thành')}</span>
                    </p>
                    <ul className="footer__list">
                        {LIST_HOTEL_FOOTER.map((item) => {
                            return (
                                <li key={item.path}>
                                    {item.isStrong ? (
                                        <strong>
                                            <Link href={'/khach-san/[...slug]'} as={item.path}>
                                                <a>
                                                    {t('hotel:Khách sạn')} {item.label}
                                                </a>
                                            </Link>
                                        </strong>
                                    ) : (
                                        <Link href={'/khach-san/[...slug]'} as={item.path}>
                                            <a>
                                                {t('hotel:Khách sạn')} {item.label}
                                            </a>
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    {/* for MOBILE */}
                    <div className="footer__select">
                        <select
                            className="form-control"
                            onBlur={(event: any) => handleLinkPage(event.target.value, 'blur')}
                            onChange={(event: any) => handleLinkPage(event.target.value, 'change')}
                        >
                            <option>{t('hotel:Khách sạn theo tỉnh thành')}</option>
                            {LIST_HOTEL_FOOTER.map((item) => {
                                return (
                                    <option key={item.path} value={item.path}>
                                        {t('hotel:Khách sạn')} {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="footer__middle">
                    <div className="footer__nav">
                        {LIST_LINK_FOOTER.map((item) => {
                            if (item.isOpenNewTab) {
                                return (
                                    <a key={item.link} target={'_blank'} href={item.link} rel="noopener noreferrer">
                                        {t(item.label)}
                                    </a>
                                )
                            }
                            return (
                                <Link key={item.link} href={item.link}>
                                    <a>{t(item.label)}</a>
                                </Link>
                            )
                        })}
                    </div>
                    {/* MOBILE */}
                    <div className="footer__select">
                        <select
                            className="form-control"
                            onBlur={(event: any) => handleLinkPage(event.target.value, 'blur')}
                            onChange={(event: any) => handleLinkPage(event.target.value, 'change')}
                        >
                            <option value={''}>{t('Giới thiệu VNTRIP')}</option>
                            {LIST_LINK_FOOTER.map((item) => {
                                return (
                                    <option key={item.link} value={item.link}>
                                        {t(item.label)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="footer__app">
                        <a target="_blank" href={VNTRIP_INFO.appStore} rel="noopener noreferrer">
                            <img src="https://statics.vntrip.vn/images/logo/appStore.png" alt="appStore" />
                        </a>
                        <a target="_blank" href={VNTRIP_INFO.googlePlay} rel="noopener noreferrer">
                            <img src="https://statics.vntrip.vn/images/logo/googlePlay.png" alt="googlePlay" />
                        </a>
                    </div>
                    <div className="footer__contact">
                        <p className="semibold">{VNTRIP_INFO[i18n.language === 'vi' ? 'name' : 'nameEn']}</p>
                        <p className="semibold">{VNTRIP_INFO[i18n.language === 'vi' ? 'address1' : 'address1En']}</p>
                        <p>{VNTRIP_INFO[i18n.language === 'vi' ? 'address2' : 'address2En']}</p>
                        <p>
                            {t('Số tài khoản')}: {VNTRIP_INFO.bankNumber}
                        </p>
                        <p>
                            {t('Ngân hàng')}: {VNTRIP_INFO.bankName}
                        </p>
                        <p>
                            {t('Chi nhánh')}: {VNTRIP_INFO.bankBranch}
                        </p>
                        <p>
                            {t('Ngày cấp ĐKKD')}: {VNTRIP_INFO.businessRegistrationDate}
                        </p>
                        <p>
                            Email:&nbsp;
                            <a href="mailto:cs@vntrip.vn" className="semibold">
                                {VNTRIP_INFO.email}
                            </a>
                        </p>
                        <p>
                            Hotline:&nbsp;
                            <span className="green-1 semibold">
                                <a href={'tel:' + VNTRIP_INFO.hotline} className="green-1">
                                    {VNTRIP_INFO.hotline}
                                </a>
                            </span>
                        </p>
                    </div>
                    <div className="footer__form">
                        <p className="mb15">
                            {i18n.language === 'vi' && <strong>{t('Du lịch thông minh')}!&nbsp;</strong>}
                            {t('Đăng ký nhận tin để lên kế hoạch cho kỳ nghỉ tới ngay từ bây giờ')}:
                        </p>
                        <Form className="d-flex mb15">
                            <Form.Item
                                validateStatus={validateEmail.status}
                                help={validateEmail.text}
                                className="mb0 flex1"
                            >
                                <Input
                                    type="text"
                                    className="form-control"
                                    placeholder={t('common:Email của bạn')}
                                    value={email}
                                    onChange={(event) => handleChangeEmail(event.target.value)}
                                />
                            </Form.Item>

                            <Button type="primary" onClick={handleSubmit} loading={isLoading}>
                                {t('Register')}
                            </Button>
                        </Form>

                        <div className="footer__bocongthuong">
                            <a
                                target="_blank"
                                href="http://online.gov.vn/Home/WebDetails/65609"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="Logo bộ công thương"
                                    src="https://statics.vntrip.vn/images/logo_bocongthuong_blue.png"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="http://online.gov.vn/Home/WebDetails/24227"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="Logo bộ công thương"
                                    src="https://statics.vntrip.vn/images/logo_bocongthuong_red.png"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <p className="footer__copyright">
                        {t('Bản quyền')} © {new Date().getFullYear()} Vntrip.vn
                    </p>
                    <div className="footer__social">
                        <a href={VNTRIP_INFO.facebookLink} target="_blank" rel="noopener noreferrer">
                            <svg width={18} height={18} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="m437 0h-362c-41.351562 0-75 33.648438-75 75v362c0 41.351562 33.648438 75 75 75h151v-181h-60v-90h60v-61c0-49.628906 40.371094-90 90-90h91v90h-91v61h91l-15 90h-76v181h121c41.351562 0 75-33.648438 75-75v-362c0-41.351562-33.648438-75-75-75zm0 0" />
                            </svg>
                            <span>Facebook</span>
                        </a>
                        <a href={VNTRIP_INFO.instagramLink} target="_blank" rel="noopener noreferrer">
                            <svg width={18} height={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z" />
                                <path d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z" />
                                <circle cx="18.406" cy="5.595" r="1.439" />
                            </svg>
                            <span>Instagram</span>
                        </a>
                        <a href="https://www.vntrip.vn/cam-nang" target="_blank" rel="noopener noreferrer">
                            <svg width={18} height={18} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="m162.457 434.408c-23.427 23.444-61.433 23.444-84.861 0-23.075-23.059-23.443-60.249-1.088-83.757l126.465-126.465c-39.112-10.458-82.481-.832-113.748 28.904l-56.231 56.231c-44.711 47.015-43.975 121.395 2.176 167.514 46.855 46.887 122.867 46.887 169.722 0l51.846-51.846c31.425-31.404 41.785-75.905 31.086-115.947z" />
                                <path d="m476.835 35.17c-46.119-46.151-120.499-46.887-167.514-2.176l-56.231 56.231c-29.735 31.268-39.361 74.637-28.904 113.748l126.465-126.465c23.508-22.355 60.697-21.987 83.757 1.088 23.444 23.428 23.443 61.433 0 84.861l-125.367 125.367c40.042 10.699 84.543.34 115.947-31.086l51.846-51.846c46.888-46.855 46.888-122.867.001-169.722z" />
                                <path d="m164.774 347.228c11.714 11.722 30.717 11.722 42.43 0l140.023-140.023c11.722-11.714 11.722-30.717 0-42.43-11.53-11.538-30.125-11.722-41.878-.544l-141.12 141.12c-11.177 11.752-10.993 30.347.545 41.877z" />
                            </svg>
                            <span>{t('Blog du lịch')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
