import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import CreateBookingRequest from './CreateBookingRequest'
import { Button, Modal } from 'antd'
import { YYYYMMDD } from '../../constants/common'
import { isEmailValid, isPhoneValid, showMessage } from '../../utils/common'
import { createBookingRequestBlank } from '../../api/order-services'
import { SendOutlined } from '@ant-design/icons'
interface Props {
    checkInDate: string
    nights: number
    hotel: any
}

const RoomSoldOut: React.FC<Props> = ({ checkInDate, nights, hotel }) => {
    const { t } = useTranslation(['hotel', 'notification'])
    const [data, setData] = useState<any>({
        hotel_id: hotel.id,
        checkin_date: checkInDate,
        nights,
        request_from: 'WEBSITE',
    })
    const [validateForm, setValidateForm] = useState<any>({
        gender: { status: 'success', text: '' },
        firstName: { status: 'success', text: '' },
        lastName: { status: 'success', text: '' },
        fullName: { status: 'success', text: '' },
        phone: { status: 'success', text: '' },
        email: { status: 'success', text: '' },
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
    const [isShowSendRequest, setIsShowSendRequest] = useState<boolean>(false)
    const handleChangeFieldForm = (value: string, type: string) => {
        let _data = { ...data }
        _data[type] = value
        setData(_data)
        let _validateForm = { ...validateForm }
        _validateForm[type] = { status: 'success', text: '' }
        setValidateForm(_validateForm)
    }
    useEffect(() => {
        let infoHotelRoomSoldOut = window.localStorage.getItem('infoHotelRoomSoldOut')
            ? JSON.parse(window.localStorage.getItem('infoHotelRoomSoldOut') as string)
            : ''
        if (infoHotelRoomSoldOut && infoHotelRoomSoldOut.length) {
            let res = infoHotelRoomSoldOut.find(
                (item: { checkin_date: string; hotel_id: number; nights: number }) =>
                    item.checkin_date === checkInDate && item.hotel_id === hotel.id && item.nights === nights
            )
            if (res) {
                setIsShowSendRequest(false)
            } else {
                // setIsShowSendRequest(true)
                setIsShowSendRequest(false)
            }
        }
    }, [checkInDate, nights, hotel])
    const handleSubmit = async () => {
        if (!data.phone) {
            setValidateForm({
                ...validateForm,
                phone: { status: 'error', text: t('notification:Vui lòng nhập thông tin') },
            })
            return false
        } else {
            if (!isPhoneValid(data?.phone)) {
                setValidateForm({
                    ...validateForm,
                    phone: { status: 'error', text: t('notification:Số điện thoại không đúng định dạng') },
                })
                return false
            }
        }
        if (!data.email) {
            setValidateForm({
                ...validateForm,
                email: { status: 'error', text: t('notification:Vui lòng nhập thông tin') },
            })
            return false
        } else {
            if (!isEmailValid(data?.email)) {
                setValidateForm({
                    ...validateForm,
                    email: { status: 'error', text: t('notification:Email không đúng định dạng') },
                })
                return false
            }
        }
        try {
            setIsLoading(true)
            let res = await createBookingRequestBlank(data)
            setIsLoading(false)
            if (['success', 200, 'Success'].includes(res['status'])) {
                showMessage('success', t('notification:Gửi yêu cầu thành công'))
                let infoHotelRoomSoldOut = window.localStorage.getItem('infoHotelRoomSoldOut')
                    ? JSON.parse(window.localStorage.getItem('infoHotelRoomSoldOut') as string)
                    : []
                infoHotelRoomSoldOut.push(data)
                window.localStorage.setItem('infoHotelRoomSoldOut', JSON.stringify(infoHotelRoomSoldOut))
                setIsOpenPopup(false)
                setIsShowSendRequest(false)
            } else {
                showMessage('error', t('notification:Đã có lỗi xảy ra'))
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    const handleOpenPopup = () => {
        setIsOpenPopup(true)
    }
    const handleClosePopup = () => {
        setIsOpenPopup(false)
        let _data = { ...data }
        _data.phone = ''
        _data.email = ''
        _data.customer_request = ''
        setData(_data)
    }
    return (
        <div className="soldOut">
            <div className="soldOut__text" style={{ padding: '10px 0' }}>
                {!isShowSendRequest && (
                    <div>
                        <div className="soldOut__icon">
                            <svg
                                width={130}
                                height={110}
                                viewBox="0 0 130 110"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x={38} y={26} width={53} height={77} fill="#FDB913" />
                                <rect x="55.2598" y="88.7112" width="8.89545" height="14.4889" fill="white" />
                                <rect x="64.9316" y="88.7112" width="8.89545" height="14.4889" fill="white" />
                                <rect x={68} y={32} width={4} height={51} fill="white" />
                                <rect x="43.6992" y="32.1636" width="9.0125" height="8.42727" fill="white" />
                                <rect x="54.375" y="32.1636" width="9.0125" height="8.42727" fill="white" />
                                <rect x="75.8125" y="32.1636" width="9.0125" height="8.42727" fill="white" />
                                <rect x="43.6992" y="42.3274" width="9.0125" height="8.42727" fill="white" />
                                <rect x="54.375" y="42.3274" width="9.0125" height="8.42727" fill="white" />
                                <rect x="75.8125" y="42.3274" width="9.0125" height="8.42727" fill="white" />
                                <rect x="43.6992" y="52.4092" width="9.0125" height="8.42727" fill="white" />
                                <rect x="54.375" y="52.4092" width="9.0125" height="8.42727" fill="white" />
                                <rect x="75.8125" y="52.4092" width="9.0125" height="8.42727" fill="white" />
                                <rect x="43.6992" y="63.5728" width="9.0125" height="8.42727" fill="white" />
                                <rect x="54.375" y="63.5728" width="9.0125" height="8.42727" fill="white" />
                                <rect x="75.8125" y="63.5728" width="9.0125" height="8.42727" fill="white" />
                                <rect x="43.6992" y="73.75" width="9.0125" height="8.58333" fill="white" />
                                <rect x="54.375" y="73.75" width="9.0125" height="8.58333" fill="white" />
                                <rect x="75.8125" y="73.75" width="9.0125" height="8.58333" fill="white" />
                                <rect x={36} y={102} width={58} height={5} fill="#FDB913" />
                                <path d="M89 27H41L43.5081 22H86.4919L89 27Z" fill="#FDB913" />
                                <path
                                    opacity="0.754604"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.90039 59.8999C8.10953 59.8999 9.90039 58.109 9.90039 55.8999C9.90039 53.6908 8.10953 51.8999 5.90039 51.8999C3.69125 51.8999 1.90039 53.6908 1.90039 55.8999C1.90039 58.109 3.69125 59.8999 5.90039 59.8999Z"
                                    stroke="#36353E"
                                    strokeWidth={2}
                                />
                                <path
                                    opacity="0.754604"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M68.5 8C70.433 8 72 6.433 72 4.5C72 2.567 70.433 1 68.5 1C66.567 1 65 2.567 65 4.5C65 6.433 66.567 8 68.5 8Z"
                                    stroke="#36353E"
                                    strokeWidth={2}
                                />
                                <path
                                    opacity="0.754604"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M123.9 74.8999C126.662 74.8999 128.9 72.6613 128.9 69.8999C128.9 67.1385 126.662 64.8999 123.9 64.8999C121.139 64.8999 118.9 67.1385 118.9 69.8999C118.9 72.6613 121.139 74.8999 123.9 74.8999Z"
                                    stroke="#36353E"
                                    strokeWidth={2}
                                />
                                <path
                                    opacity="0.460728"
                                    d="M25.6797 16.9277C25.7266 16.9746 25.75 17.0332 25.75 17.1035C25.75 17.1738 25.7266 17.2324 25.6797 17.2793L25.0117 17.9297C24.9648 17.9766 24.9121 18 24.8535 18C24.7832 18 24.7246 17.9766 24.6777 17.9297L22.375 15.627L20.0723 17.9297C20.0254 17.9766 19.9727 18 19.9141 18C19.8438 18 19.7852 17.9766 19.7383 17.9297L19.0703 17.2793C19.0234 17.2324 19 17.1738 19 17.1035C19 17.0332 19.0234 16.9746 19.0703 16.9277L21.3906 14.625L19.0703 12.3398C18.9531 12.2227 18.9531 12.1055 19.0703 11.9883L19.7207 11.3203C19.791 11.2734 19.8496 11.25 19.8965 11.25C19.9668 11.25 20.0254 11.2734 20.0723 11.3203L22.375 13.6055L24.6777 11.3203C24.748 11.2734 24.8066 11.25 24.8535 11.25C24.9238 11.25 24.9824 11.2734 25.0293 11.3203L25.6797 11.9883C25.7969 12.1055 25.7969 12.2168 25.6797 12.3223L23.3594 14.6074L25.6797 16.9277Z"
                                    fill="#36353E"
                                />
                                <path
                                    opacity="0.460728"
                                    d="M119.938 35.0469C119.979 35.0885 120 35.1406 120 35.2031C120 35.2656 119.979 35.3177 119.938 35.3594L119.344 35.9375C119.302 35.9792 119.255 36 119.203 36C119.141 36 119.089 35.9792 119.047 35.9375L117 33.8906L114.953 35.9375C114.911 35.9792 114.865 36 114.812 36C114.75 36 114.698 35.9792 114.656 35.9375L114.062 35.3594C114.021 35.3177 114 35.2656 114 35.2031C114 35.1406 114.021 35.0885 114.062 35.0469L116.125 33L114.062 30.9688C113.958 30.8646 113.958 30.7604 114.062 30.6562L114.641 30.0625C114.703 30.0208 114.755 30 114.797 30C114.859 30 114.911 30.0208 114.953 30.0625L117 32.0938L119.047 30.0625C119.109 30.0208 119.161 30 119.203 30C119.266 30 119.318 30.0208 119.359 30.0625L119.938 30.6562C120.042 30.7604 120.042 30.8594 119.938 30.9531L117.875 32.9844L119.938 35.0469Z"
                                    fill="#36353E"
                                />
                                <path
                                    opacity="0.460728"
                                    d="M113.906 106.648C113.969 106.711 114 106.789 114 106.883C114 106.977 113.969 107.055 113.906 107.117L113.016 107.984C112.953 108.047 112.883 108.078 112.805 108.078C112.711 108.078 112.633 108.047 112.57 107.984L109.5 104.914L106.43 107.984C106.367 108.047 106.297 108.078 106.219 108.078C106.125 108.078 106.047 108.047 105.984 107.984L105.094 107.117C105.031 107.055 105 106.977 105 106.883C105 106.789 105.031 106.711 105.094 106.648L108.188 103.578L105.094 100.531C104.938 100.375 104.938 100.219 105.094 100.062L105.961 99.1719C106.055 99.1094 106.133 99.0781 106.195 99.0781C106.289 99.0781 106.367 99.1094 106.43 99.1719L109.5 102.219L112.57 99.1719C112.664 99.1094 112.742 99.0781 112.805 99.0781C112.898 99.0781 112.977 99.1094 113.039 99.1719L113.906 100.062C114.062 100.219 114.062 100.367 113.906 100.508L110.812 103.555L113.906 106.648Z"
                                    fill="#36353E"
                                />
                                <path
                                    opacity="0.460728"
                                    d="M20.9062 100.57C20.9688 100.633 21 100.711 21 100.805C21 100.898 20.9688 100.977 20.9062 101.039L20.0156 101.906C19.9531 101.969 19.8828 102 19.8047 102C19.7109 102 19.6328 101.969 19.5703 101.906L16.5 98.8359L13.4297 101.906C13.3672 101.969 13.2969 102 13.2188 102C13.125 102 13.0469 101.969 12.9844 101.906L12.0938 101.039C12.0312 100.977 12 100.898 12 100.805C12 100.711 12.0312 100.633 12.0938 100.57L15.1875 97.5L12.0938 94.4531C11.9375 94.2969 11.9375 94.1406 12.0938 93.9844L12.9609 93.0938C13.0547 93.0312 13.1328 93 13.1953 93C13.2891 93 13.3672 93.0312 13.4297 93.0938L16.5 96.1406L19.5703 93.0938C19.6641 93.0312 19.7422 93 19.8047 93C19.8984 93 19.9766 93.0312 20.0391 93.0938L20.9062 93.9844C21.0625 94.1406 21.0625 94.2891 20.9062 94.4297L17.8125 97.4766L20.9062 100.57Z"
                                    fill="#36353E"
                                />
                            </svg>
                        </div>
                        <div className="soldOut__text">
                            <p className="p1">{t('Rất tiếc, chúng tôi đã hết phòng')}</p>
                            <p className="p2">
                                {t('Rất tiếc, chúng tôi đã hết phòng trong ngày bạn chọn')}:{' '}
                                {moment(checkInDate, YYYYMMDD).format('DD/MM/YYYY')} -{' '}
                                {moment(checkInDate, YYYYMMDD).add(nights, 'day').format('DD/MM/YYYY')}.
                                <br />
                                {t('Bạn vui lòng chọn lại ngày khác để thực hiện việc đặt phòng')}
                            </p>
                        </div>
                    </div>
                )}
                {isShowSendRequest && (
                    <div>
                        <img
                            src="https://statics.vntrip.vn/images/membershipBox-img.png"
                            alt=""
                            style={{ maxWidth: '200px' }}
                            className={'mb15'}
                        />
                        <p className="p2 mb15" style={{ color: '#666', fontStyle: 'italic' }}>
                            {t('Vui lòng để lại thông tin để nhận giá ưu đãi độc quyền')}
                            <br />
                            {t('Vntrip sẽ liên hệ bạn trong ít phút')}
                        </p>
                        <Button
                            type="primary"
                            size={'middle'}
                            onClick={() => handleOpenPopup()}
                            icon={<SendOutlined />}
                        >
                            <span>{t('Gửi yêu cầu cho Vntrip')}</span>
                        </Button>
                    </div>
                )}
            </div>
            {isShowSendRequest && (
                <Modal
                    title={t('Gửi yêu cầu cho Vntrip')}
                    visible={isOpenPopup}
                    onOk={handleSubmit}
                    onCancel={handleClosePopup}
                    cancelText={t('Hủy')}
                    okText={t('Gửi yêu cầu')}
                >
                    <CreateBookingRequest
                        data={data}
                        isLoading={isLoading}
                        validateForm={validateForm}
                        handleChangeFieldForm={handleChangeFieldForm}
                    />
                </Modal>
            )}
        </div>
    )
}

export default RoomSoldOut
