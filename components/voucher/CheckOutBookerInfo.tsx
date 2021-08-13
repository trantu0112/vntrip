import React, { Component, Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setBookerData, setOpenPopupChangePerson, setReceiverData } from '../../store/checkout/action'
import { getReceiverData, isBookerDataValid, isRoomReceiverValid } from '../../utils/checkout'
import { isMobile } from 'react-device-detect'
import { collectInfo } from '../../api/hotel-services'
import { getFullName, saveBookerAndReceiver } from '../../utils/user'
import { showMessage } from '../../utils/common'
import { Modal } from 'antd'
import BookerInfo from '../checkout-common/BookerInfo'
import { setRefreshTime } from '../../store/common/action'
import { PATH_VOUCHER_CHECKOUT_STEP2 } from '../../constants/common'
interface Props {
    otherExpanse: any[]
    dealId: number | string
}
const CheckOutBookerInfo: React.FC<Props> = ({ dealId, otherExpanse }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel', 'common', 'payment'])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { bookerData, receiverData, bookerDataRoot, isOpen, validateBooker } = useSelector((state: any) => {
        return {
            bookerData: state.checkout.bookerData,
            receiverData: state.checkout.receiverData,
            bookerDataRoot: state.checkout.bookerDataRoot,
            isOpen: state.checkout.isOpenPopupChangePerson || false,
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

    const togglePopup = () => {
        dispatch(setOpenPopupChangePerson(!isOpen))
    }

    const handleCancelPopup = () => {
        // rever data to root
        dispatch(setBookerData({ ...bookerDataRoot }))
        togglePopup()
    }

    const handleOkPopup = async () => {
        // tạo lại booking request vs thông tin mới, sau đó đổi url sang booking request mới
        if (!isBookerDataValid(bookerData, validateBooker, dispatch, t)) {
            return
        }
        if (!bookerData.is_receiver && !isRoomReceiverValid(receiverData, dispatch, t)) {
            return
        }
        const receiver = getReceiverData(bookerData, receiverData, 1)
        const dataCollect = {
            booker_data: { ...bookerData, reference_url: 'vntrip.vn-nextjs' },
            customer_request: '',
            coupon_code: '',
            request_from: isMobile ? 'WEBMOBILE' : 'WEBSITE',
            other: {},
            deal_id: dealId,
            other_expense: otherExpanse,
        }
        try {
            setIsLoading(true)
            const res = await collectInfo(dataCollect)
            if (res.status === 'success') {
                saveBookerAndReceiver({
                    booker: bookerData,
                    receiver: receiver,
                })
                const booking_request_id = res.data.booking_request_id
                await router.push(
                    PATH_VOUCHER_CHECKOUT_STEP2 + '/[br_id]',
                    PATH_VOUCHER_CHECKOUT_STEP2 + '/' + booking_request_id
                )
                dispatch(setOpenPopupChangePerson(false)) // close popup
                dispatch(setRefreshTime(+new Date())) // close popup
            } else {
                showMessage('error', res.message)
            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            throw e
        }
    }
    return (
        <div className="bookingUser">
            <div className="checkoutLayout__title">
                <span>{t('payment:Thông tin liên hệ')}</span>
            </div>
            <ul>
                <li>
                    <p className="mb0">{t('Người đặt phòng')}</p>
                    <p className="mb0 text-right">{getFullName(bookerData?.first_name, bookerData?.last_name)}</p>
                </li>
                <li>
                    <p className="mb0">{t('common:Số điện thoại')}</p>
                    <p className="mb0 text-right">{bookerData?.phone}</p>
                </li>
                <li>
                    <p className="mb0">Email</p>
                    <p className="mb0 text-right">{bookerData?.email}</p>
                </li>
                {Array.isArray(receiverData) &&
                    receiverData.length > 0 &&
                    receiverData.map((item, index) => {
                        return (
                            <Fragment key={`receiver-${index}`}>
                                <li>
                                    <p className="mb0">
                                        {t('Người nhận phòng')} {index + 1}
                                    </p>
                                    <p className="mb0 text-right">{getFullName(item.first_name, item.last_name)}</p>
                                </li>
                                <li>
                                    <p className="mb0">{t('common:Số điện thoại')}</p>
                                    <p className="mb0 text-right">{item.phone}</p>
                                </li>
                            </Fragment>
                        )
                    })}
                <li>
                    <p className="text-right mb0">
                        <button className="btnLink" onClick={togglePopup}>
                            <span>{t('common:Sửa')}</span>
                        </button>
                    </p>
                </li>
            </ul>

            {/* popup change person */}
            <Modal
                width={750}
                maskClosable={false}
                visible={isOpen}
                cancelText={t('common:Hủy')}
                okText={t('common:Thay đổi')}
                onCancel={handleCancelPopup}
                onOk={handleOkPopup}
                confirmLoading={isLoading}
            >
                <div className="checkoutInfo__group">
                    <div className="checkoutLayout__title">
                        <span>{t('payment:Thông tin liên hệ')}</span>
                    </div>
                    <div className="checkoutInfo__form">
                        <BookerInfo />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CheckOutBookerInfo
