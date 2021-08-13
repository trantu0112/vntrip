import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import Layout from '../components/layout/Layout'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { sendInternalEmail } from '../api/common-services'
import { showMessage, isEmailValid, isPhoneValid } from '../utils/common'

const { TextArea } = Input

const SIZE: 'large' | 'default' | 'small' = 'large'

// let data = {
//     "mail_to": slDepartment,
//     "subject": "Liên hệ từ khách hàng tới " + slDepartment,
//     "body": txtName + " vừa gửi 1 yêu cầu thông qua https://www.vntrip.vn/lien-he/<br><br>----------- Thông tin khách hàng ----------- <br>- " + txtName + "<br>- " + txtEmail + "<br>- " + txtPhone + "<br><br>----------- Nội dung -----------<br>" + txtContent
// };

const ContactVntrip = () => {
    const { t } = useTranslation(['common'])
    const [isLoading, setIsLoading] = useState(false)
    const [department, setDepartment] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const handleSubmit = async () => {
        if (!department) {
            showMessage('error', 'Vui lòng chọn bộ phận')
            return false
        }
        if (!name) {
            showMessage('error', 'Vui lòng điền tên của bạn')
            return false
        }

        if (!phone) {
            showMessage('error', 'Vui lòng điền số điện thoại')
            return false
        }
        if (!isPhoneValid(phone)) {
            showMessage('error', 'Số điện thoại không đúng định dạng')
            return false
        }

        if (!mail) {
            showMessage('error', 'Vui lòng điền email')
            return false
        }

        if (!isEmailValid(mail)) {
            showMessage('error', 'Email không đúng định dạng')
            return false
        }

        if (!content) {
            showMessage('error', 'Vui lòng điền nội dung')
            return false
        }

        try {
            setIsLoading(true)
            const data = {
                mail_to: department,
                subject: 'Liên hệ từ khách hàng tới ' + department,
                body:
                    name +
                    ' vừa gửi 1 yêu cầu thông qua https://www.vntrip.vn/lien-he/<br><br>----------- Thông tin khách hàng ----------- <br> ' +
                    name +
                    '<br>- ' +
                    mail +
                    '<br>- ' +
                    phone +
                    '<br><br>----------- Nội dung -----------<br>' +
                    content,
            }
            const res = await sendInternalEmail(data)
            if (res.status === 'success') {
                showMessage(
                    'success',
                    ' Vntrip.vn đã nhận được thông tin từ quý khách, bộ phận Chăm sóc khách hàng sẽ xử lý và thông báo tới quý khách'
                )
                setIsLoading(false)
            }
        } catch (e) {
            throw e
        }
    }

    const handleChangeDepartment = (value: string) => {
        setDepartment(value)
    }

    const handleChangeName = (value: string) => {
        setName(value)
    }

    const handleChangePhone = (value: string) => {
        setPhone(value)
    }

    const handleChangeMail = (value: string) => {
        setMail(value)
    }

    const handleChangeContent = (value: string) => {
        setContent(value)
    }

    return (
        <Layout>
            <section className="contact">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">
                                <a>
                                    <span>{t('common:Trang chủ')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className="active">{t('common:Liên hệ')}</li>
                    </ul>
                    <div className="contact__body">
                        <div className="contact__cont">
                            <div className="contact__form">
                                <Form layout="vertical" size={SIZE}>
                                    <Form.Item>
                                        <Select
                                            onChange={handleChangeDepartment}
                                            value={department ? department : 'Chọn bộ phận muốn liên hệ'}
                                        >
                                            {[
                                                {
                                                    value: 'CS',
                                                    label: 'Chăm sóc khách hàng',
                                                },
                                                {
                                                    value: 'MKT',
                                                    label: 'Marketing',
                                                },
                                                {
                                                    value: 'HR',
                                                    label: 'Nhân sự',
                                                },
                                                {
                                                    value: 'HO',
                                                    label: 'Hotel Operation',
                                                },
                                            ].map((item) => {
                                                return (
                                                    <Select.Option value={item.value} key={item.value}>
                                                        {item.label}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Tên của bạn:">
                                        <Input
                                            type={'text'}
                                            value={name}
                                            onChange={(event) => {
                                                handleChangeName(event.target.value)
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Điện thoại:">
                                        <Input
                                            type={'number'}
                                            value={phone}
                                            onChange={(event) => {
                                                handleChangePhone(event.target.value)
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Email:">
                                        <Input
                                            type={'text'}
                                            value={mail}
                                            onChange={(event) => {
                                                handleChangeMail(event.target.value)
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Nội dung:">
                                        <TextArea
                                            rows={4}
                                            value={content}
                                            onChange={(event) => {
                                                handleChangeContent(event.target.value)
                                            }}
                                        />
                                    </Form.Item>
                                </Form>
                                <div className="contact__btn text-center">
                                    <Button
                                        type="primary"
                                        className={'btn-contact'}
                                        onClick={() => {
                                            handleSubmit()
                                        }}
                                        loading={isLoading}
                                    >
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                            <div className="contact__info">
                                <div className="infoCommitment">
                                    <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với tư vấn viên VNTRIP theo</p>
                                    <p className="semibold">
                                        Hotline:&nbsp;
                                        <a href="tel:096 326 6688" className="green-1">
                                            096 326 6688
                                        </a>
                                    </p>
                                </div>
                                <div className="infoCompany">
                                    <div className="infoCompany__title">
                                        <h3 className="size-14">CÔNG TY TNHH VNTRIP.VN</h3>
                                    </div>
                                    <div className="infoCompany__cont">
                                        <p>Tầng 2 Tòa nhà 17T4 Hapulico Complex</p>
                                        <p>Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội</p>
                                        <p>Số tài khoản: 0491000136688</p>
                                        <p>Ngân hàng: Vietcombank</p>
                                        <p>Chi nhánh Thăng Long</p>
                                        <p>Ngày cấp ĐKKD: 9/5/2016</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default ContactVntrip
