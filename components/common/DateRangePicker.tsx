import React, { useEffect } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setDatePickerCheckIn, setDatePickerCheckOut } from '../../store/common/action'

const DateRangePicker: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { datePickerCheckIn, datePickerCheckOut } = useSelector((state: any) => {
        return {
            datePickerCheckIn: state.common.datePickerCheckIn || moment().toDate(),
            datePickerCheckOut: state.common.datePickerCheckOut || moment().add(1, 'day').toDate(),
        }
    })

    // get and set checkin /checkout date from URL
    useEffect(() => {
        if (
            router.query.hasOwnProperty('checkInDate') ||
            router.query.hasOwnProperty('nights') ||
            router.query.hasOwnProperty('days')
        ) {
            const checkInDate = router.query.checkInDate || moment().format('YYYYMMDD')
            const nights = Number(router.query.nights) || Number(router.query.days) || 1
            const diffDay = moment(datePickerCheckOut).diff(moment(datePickerCheckIn), 'day')
            if (checkInDate !== moment(datePickerCheckIn).format('YYYYMMDD') || diffDay !== nights) {
                dispatch(setDatePickerCheckIn(moment(checkInDate, 'YYYYMMDD').toDate()))
                dispatch(setDatePickerCheckOut(moment(checkInDate, 'YYYYMMDD').add(nights, 'day').toDate()))
            }
        }
    }, [router.query])

    const disabledDate = (current: any) => {
        // Can not select days before today
        return current < moment().add(-1, 'day').endOf('day') || current > moment().add(6, 'month').endOf('day')
    }

    const handleChangeDate = (date: any[]) => {
        if (date[0]) {
            dispatch(setDatePickerCheckIn(date[0].toDate()))
        }
        if (date[1]) {
            dispatch(setDatePickerCheckOut(date[1].toDate()))
        }
    }

    return (
        <DatePicker.RangePicker
            size={'large'}
            placeholder={['Nhận phòng', 'Trả phòng']}
            format={'DD-MM-YYYY'}
            disabledDate={disabledDate}
            value={[moment(datePickerCheckIn), moment(datePickerCheckOut)]}
            // @ts-ignore
            onChange={handleChangeDate}
            allowClear={false}
        />
    )
}

export default DateRangePicker
