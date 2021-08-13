import React from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { toggleViewHotelInMap } from '../../store/hotel/action'
import { useTranslation } from 'react-i18next'

interface Props {
    width?: number
    height?: number
}

const PopupGoogleMap: React.FC<Props> = ({ width, height }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel'])
    const gMapDataHotel = useSelector((state: any) => state.hotel.gMapDataHotel)

    const handleClose = () => dispatch(toggleViewHotelInMap(false, null, null))

    return (
        <Modal
            title={t('Bản đồ khách sạn')}
            wrapClassName={'modal-map'}
            maskClosable={false}
            visible={gMapDataHotel?.isShow}
            footer={null}
            onCancel={handleClose}
        >
            <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}&q=${gMapDataHotel?.latitude},${gMapDataHotel?.longitude}`}
                width={width || 1250 - 24 * 2} // 24 là padding 1 phía
                height={height || 650}
                frameBorder={0}
                style={{ border: 0 }}
                allowFullScreen
                title={'Popup google map'}
            />
        </Modal>
    )
}

export default PopupGoogleMap
