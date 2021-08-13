import React, { Fragment, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getFullName, saveBookerAndReceiver } from '../../utils/user'
import { setBookerData, setOpenPopupChangePerson, setReceiverData } from '../../store/checkout/action'
import BookerInfo from '../checkout-common/BookerInfo'
import ReceiverInfo from './ReceiverInfo'
import { getReceiverData, isBookerDataValid, isRoomReceiverValid } from '../../utils/checkout'
import { isMobile } from 'react-device-detect'
import { collectInfo } from '../../api/hotel-services'
import { PATH_HOTEL_CHECKOUT_STEP2 } from '../../constants/common'
import { showMessage } from '../../utils/common'
import { useRouter } from 'next/router'

interface Props {
    roomCount: number
    availToken: string
}

const BookerAndReceiverInfo: React.FC<Props> = ({ roomCount, availToken }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel', 'common', 'payment'])
    const { bookerData, receiverData, bookerDataRoot, receiverDataRoot, isOpen, validateBooker } = useSelector(
        (state: any) => {
            return {
                bookerData: state.checkout.bookerData,
                receiverData: state.checkout.receiverData,
                bookerDataRoot: state.checkout.bookerDataRoot,
                receiverDataRoot: state.checkout.receiverDataRoot,
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
        }
    )
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const togglePopup = () => {
        dispatch(setOpenPopupChangePerson(!isOpen))
    }

    const handleCancelPopup = () => {
        // rever data to root
        dispatch(setBookerData({ ...bookerDataRoot }))
        dispatch(setReceiverData([...receiverDataRoot]))
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
        const receiver = getReceiverData(bookerData, receiverData, roomCount)
        const dataCollect = {
            booker_data: { ...bookerData, reference_url: 'vntrip.vn-nextjs' },
            customer_request: '',
            coupon_code: '',
            request_from: isMobile ? 'WEBMOBILE' : 'WEBSITE',
            hotel: {
                token_id: availToken,
                receiver_data: receiver,
                // bed_type_group_id: bedTypeSelected.group_id,
            },
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
                dispatch(setOpenPopupChangePerson(false)) // close popup
                await router.push(
                    PATH_HOTEL_CHECKOUT_STEP2 + '/[booking_request_id]',
                    PATH_HOTEL_CHECKOUT_STEP2 + '/' + booking_request_id
                )
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
                <span>{t('payment:Thông tin đặt phòng')}</span>
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
                        <span>{t('payment:Thông tin người đặt phòng')}</span>
                    </div>
                    <div className="checkoutInfo__form">
                        <BookerInfo />
                        <ReceiverInfo />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookerAndReceiverInfo
