import React, { useEffect, useRef, useState } from 'react'
import { Moment } from 'moment'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { IconClose, IconPassengers, IconRoll } from '../../constants/icons'
import { setRoomCountHotel, setAdultCountHotel, setOpenUpdateRoom } from '../../store/hotel/action'
import { useTranslation } from 'react-i18next'
import { toggleClassNoScroll } from '../../utils/common'
import DateRangeHotel from '../search-box-hotel/DateRangeHotel'

interface Props {
    checkInDate: string // YYYYMMDD
    nights: number
    onCalendarChange: (dates: [Moment, Moment], dateStrings: [string, string], info: { range: 'start' | 'end' }) => void
    onSubmit: () => void
}

const BoxUpdateRoom: React.FC<Props> = ({ checkInDate, nights, onCalendarChange, onSubmit }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel', 'common', 'flight'])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { roomCount, adultCount, isOpenUpdateRoom } = useSelector((state: any) => {
        return {
            roomCount: state.hotel.roomCount || 1,
            adultCount: state.hotel.adultCount || 1,
            isOpenUpdateRoom: state.hotel.isOpenUpdateRoom || false,
        }
    })
    const dropdownRef = useRef(null)

    /* HANDLE CLICK OUTSIDE SUGGESTION BOX */
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClickDropdown)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickDropdown)
        }
    }, [])

    /* HANDLE EVENT REGION */
    const handleClickDropdown = (event: any) => {
        // @ts-ignore
        if (dropdownRef.current.contains(event.target)) {
            // inside click
            return
        }
        // outside click
        setIsOpen(false) // close dropdown
    }

    const toggleDropdown = () => {
        setIsOpen((prevState) => {
            // toggleClassNoScroll(prevState ? 'remove' : 'add')
            return !prevState
        })
    }

    const handleChangeCount = (type1: 'room' | 'adult') => (type2: 'descrease' | 'increase') => () => {
        switch (type1 + '-' + type2) {
            case 'room-descrease':
                if (roomCount > 1) {
                    dispatch(setRoomCountHotel(roomCount - 1))
                }
                break
            case 'room-increase':
                if (roomCount >= adultCount) {
                    dispatch(setAdultCountHotel(roomCount + 1))
                }
                dispatch(setRoomCountHotel(roomCount + 1))
                break
            case 'adult-descrease':
                if (adultCount > roomCount && adultCount > 1) {
                    dispatch(setAdultCountHotel(adultCount - 1))
                }
                break
            case 'adult-increase':
                dispatch(setAdultCountHotel(adultCount + 1))
                break
        }
    }

    const closeUpdateRoom = () => {
        dispatch(setOpenUpdateRoom(false))
        toggleClassNoScroll('remove')
    }

    // // handle change datepicker
    // const onChangeDate = (dates: Moment[]) => {
    //     setCheckInDate(dates[0].format(YYYYMMDD))
    //     setNights(Math.abs(dates[1].diff(dates[0], 'days')))
    // }

    // if checkout step1: set data to store: dataSearchHotel => trigger call api
    // if hotel detail: change router
    const handleSubmit = () => {
        onSubmit()
        closeUpdateRoom()
    }

    return (
        <div className={`dateUpdate ${isOpenUpdateRoom ? 'open' : ''}`}>
            <div
                className="dateUpdate__backdrop"
                onClick={closeUpdateRoom}
                onKeyUp={closeUpdateRoom}
                role={'button'}
                tabIndex={0}
            />
            <div className="dateUpdate__body">
                <div className="headerPopup">
                    <p>{t('common:Cập nhật')}</p>
                    <button id="closeDateUpdate" type="button" className="headerPopup__close" onClick={closeUpdateRoom}>
                        <IconClose />
                    </button>
                </div>
                <div className="dateUpdate__main">
                    <div className="vntSearch">
                        <div className="vntSearch__flex">
                            <DateRangeHotel
                                isHunt={false}
                                checkInDate={checkInDate}
                                nights={nights}
                                onCalendarChange={onCalendarChange}
                            />

                            <div className="passengerBox">
                                <p>{t('Số phòng và khách')}</p>
                                <div className={`dropdown ${isOpen ? 'dropdown-open' : ''}`}>
                                    <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
                                        <span>
                                            {roomCount} {t(roomCount > 1 ? 'phòngs' : 'phòng')} , {adultCount}{' '}
                                            {t(adultCount > 1 ? 'flight:người lớns' : 'flight:người lớn')}
                                        </span>
                                        <IconPassengers />
                                    </button>
                                    <div className="dropdown-menu" ref={dropdownRef}>
                                        <div
                                            className="passengerBox__backdrop"
                                            onClick={toggleDropdown}
                                            onKeyUp={toggleDropdown}
                                            role={'button'}
                                            tabIndex={0}
                                        />
                                        <div className="passengerBox__body">
                                            <div className="headerPopup">
                                                <p>{t('Số phòng và khách')}</p>
                                                <button
                                                    type="button"
                                                    className="headerPopup__close"
                                                    onClick={toggleDropdown}
                                                >
                                                    <IconClose />
                                                </button>
                                            </div>
                                            <div className="passengerBox__main">
                                                <div className="passengerBox__item">
                                                    <Button
                                                        type="text"
                                                        className="passengerBox__minus"
                                                        onClick={handleChangeCount('room')('descrease')}
                                                        icon={<MinusOutlined />}
                                                        disabled={roomCount <= 1}
                                                    />
                                                    <p>
                                                        {roomCount} {t(roomCount > 1 ? 'phòngs' : 'phòng')}
                                                    </p>
                                                    <Button
                                                        type="text"
                                                        className="passengerBox__plus"
                                                        onClick={handleChangeCount('room')('increase')}
                                                        icon={<PlusOutlined />}
                                                        // disabled={adultCount + childCount + infantCount >= 6}
                                                    />
                                                </div>
                                                <div className="passengerBox__item">
                                                    <Button
                                                        type="text"
                                                        className="passengerBox__minus"
                                                        onClick={handleChangeCount('adult')('descrease')}
                                                        icon={<MinusOutlined />}
                                                        disabled={adultCount <= roomCount}
                                                    />
                                                    <p>
                                                        {adultCount}{' '}
                                                        {t(adultCount > 1 ? 'flight:người lớns' : 'flight:người lớn')}
                                                    </p>
                                                    <Button
                                                        type="text"
                                                        className="passengerBox__plus"
                                                        onClick={handleChangeCount('adult')('increase')}
                                                        icon={<PlusOutlined />}
                                                        // disabled={adultCount + childCount + infantCount >= 6}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="vntSearch__btn">
                                <button type="button" className="btn btn_green" onClick={handleSubmit}>
                                    <IconRoll />
                                    <span>{t('common:Cập nhật')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxUpdateRoom
