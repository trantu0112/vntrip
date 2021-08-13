import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { toggleClassNoScroll } from '../../utils/common'
import { setOpenUpdateRoom } from '../../store/hotel/action'
import { IconDown } from '../../constants/icons'
import { useTranslation } from 'react-i18next'

// only show checkIn, checkOut, roomCount, adultCount on mobile
const ShowAdultAndRoomMobile = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel', 'flight'])
    const {
        checkInDate,
        checkOutDate,
        roomCount,
        adultCount,
    }: {
        checkInDate: Date
        checkOutDate: Date
        roomCount: number
        adultCount: number
    } = useSelector((state: any) => {
        return {
            checkInDate: state.hotel.checkInHotel || moment().toDate(),
            checkOutDate: state.hotel.checkOutHotel || moment().add(1, 'day').toDate(),
            roomCount: state.hotel.roomCount || 1,
            adultCount: state.hotel.adultCount || 1,
            isOpenUpdateRoom: state.hotel.isOpenUpdateRoom || false,
        }
    })

    const openUpdateRoom = () => {
        dispatch(setOpenUpdateRoom(true))
        toggleClassNoScroll('add')
    }

    return (
        <div className="updateMobile" role="button" onClick={openUpdateRoom} onKeyDown={openUpdateRoom} tabIndex={0}>
            <div className="updateMobile__passenger">
                <p>
                    {roomCount} {t(roomCount > 1 ? 'phòngs' : 'phòng')}, {adultCount}{' '}
                    {t(adultCount > 1 ? 'flight:người lớns' : 'flight:người lớn')}
                </p>
            </div>
            <div className="updateMobile__date">
                <p>
                    <span>
                        {moment(checkInDate).format('DD/MM/YYYY')} - {moment(checkOutDate).format('DD/MM/YYYY')}
                    </span>
                    <IconDown />
                </p>
            </div>
        </div>
    )
}

export default ShowAdultAndRoomMobile
