import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { Modal, Input, Form } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/common/action'
import { ValidationForm } from '../../constants/interface'
import { getLoyaltyProgram, getMembershipInfo, activeMembershipCard } from '../../api/user-services'
import { useTranslation } from 'react-i18next'
import { withAuth } from '../../utils/custom-hoc'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../components/user/ProfileNavbar'))
const ProfileSidebar = dynamic(() => import('../../components/user/ProfileSidebar'))

const MemberCard = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['user', 'error', 'common'])
    const [isShowCard, setIsShowCard] = useState<boolean>(false)
    const [membershipInfo, setMembershipInfo] = useState<any>(null)
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
    const [cardNumber, setCardNumber] = useState<string>('')
    const [validateCard, setValidateCard] = useState<ValidationForm>({ status: 'success', text: '' })
    const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true)
    const [programId, setProgramId] = useState<string>('')

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(setLoading(true))
                const res = await getLoyaltyProgram()
                if (res.status === 'success') {
                    const loyaltyProgram = res.data.find((item: any) => item.is_third_party === false)
                    if (loyaltyProgram) {
                        setProgramId(loyaltyProgram.id)
                        const resInfo = await getMembershipInfo(loyaltyProgram.id)
                        if (resInfo.status === 'success') {
                            setMembershipInfo(resInfo.data)
                            setIsShowCard(resInfo.data?.membership_card.status === 'ACTIVE')
                        }
                    }
                }
                dispatch(setLoading(false))
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }

        fetchData()
    }, [])

    const openPopup = () => {
        setIsOpenPopup(true)
    }

    const closePopup = () => {
        setIsOpenPopup(false)
        setCardNumber('') // reset input
        setValidateCard({ status: 'success', text: '' })
    }

    const onChangeCardNumber = (value: string) => {
        setCardNumber(value)
        setValidateCard({ status: 'success', text: '' })
        setIsDisableSubmit(value.trim().length <= 11)
    }

    const onSubmit = async () => {
        try {
            const res = await activeMembershipCard(membershipInfo.member_id, cardNumber)
            if (res.status === 'success') {
                const resInfo = await getMembershipInfo(programId)
                // set membership again
                if (resInfo.status === 'success') {
                    setMembershipInfo(resInfo.data)
                    setIsShowCard(resInfo.data?.membership_card.status === 'ACTIVE')
                    closePopup()
                }
            } else {
                setValidateCard({ status: 'error', text: t(`error:${res.error_code}`) })
            }
        } catch (e) {
            throw e
        }
    }

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />

                    <div className="profileAccount">
                        <div className="profileAccount__left">
                            <ProfileSidebar />
                        </div>
                        <div className="profileAccount__right">
                            <div id="tab-3" className="profileAccount__group open">
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <span>{t('Thẻ thành viên')}</span>
                                        </div>
                                        <div className="profileForm">
                                            <p className="semibold mb15">
                                                {t(
                                                    'Nếu bạn đã nhận thẻ thành viên của Vntrip, hãy nhập thông tin thẻ của bạn để kích hoạt'
                                                )}
                                                .
                                            </p>
                                            {isShowCard ? (
                                                <div className="profileAccount__card">
                                                    <div className="d-block">
                                                        <p>
                                                            Card Number:
                                                            <span className="semibold">
                                                                {' '}
                                                                {membershipInfo?.membership_card?.card_number}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Card type:
                                                            <span className="semibold">
                                                                {' '}
                                                                {membershipInfo?.level_name}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Activated on:
                                                            <span className="semibold">
                                                                {' '}
                                                                {moment(
                                                                    membershipInfo?.membership_card?.activated_at
                                                                ).format('DD/MM/YYYY')}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="d-img">
                                                        <img
                                                            src="https://statics.vntrip.vn/images/card-vip.jpg"
                                                            alt="card-vip"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="red-1">{t('Bạn chưa có thẻ nào đang được kích hoạt')}</p>
                                            )}

                                            <button type="button" className="btnLink" onClick={openPopup}>
                                                <PlusCircleOutlined /> &nbsp;
                                                <span>{t('Thêm thẻ mới')}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Modal
                            visible={isOpenPopup}
                            title={t('Thẻ thành viên')}
                            okText={t('common:Kích hoạt')}
                            cancelText={t('common:Hủy')}
                            onOk={onSubmit}
                            onCancel={closePopup}
                            centered={true}
                            maskClosable={false}
                            okButtonProps={{ disabled: isDisableSubmit }}
                        >
                            <Form layout="vertical" size="large">
                                <p className="mb15 semibold">{t('Nhập mã được in ở mặt trước trên thẻ của bạn')}</p>
                                <div className="form-group">
                                    <Form.Item
                                        label={t('Mã số thẻ')}
                                        validateStatus={validateCard.status}
                                        help={validateCard.text}
                                    >
                                        <Input
                                            placeholder={t('Mã số thẻ')}
                                            value={cardNumber}
                                            onChange={(event) => onChangeCardNumber(event.target.value)}
                                            onPressEnter={onSubmit}
                                        />
                                    </Form.Item>
                                </div>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default withAuth()(MemberCard)
