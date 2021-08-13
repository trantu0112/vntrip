import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { useTranslation } from 'react-i18next'
import { DatePicker } from 'antd'
import { IconClose } from '../../constants/icons'
import { YYYYMMDD } from '../../constants/common'

const { RangePicker } = DatePicker

interface Props {
    isHunt?: boolean
    triggerOpen?: number
    checkInDate: string // YYYYMMDD
    nights: number
    // onChangeDate: (dates: [Moment, Moment]) => void
    onCalendarChange: (dates: [Moment, Moment], dateStrings: [string, string], info: { range: 'start' | 'end' }) => void
}

const DateRangeHotel: React.FC<Props> = React.memo(({ isHunt, triggerOpen, checkInDate, nights, onCalendarChange }) => {
    const { t } = useTranslation(['hotel', 'common'])
    const [isOpenDp, setIsOpenDp] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<Moment>(moment())
    const [endDate, setEndDate] = useState<Moment>(moment().add(1, 'days'))

    useEffect(() => {
        if (triggerOpen) {
            setIsOpenDp(true)
        }
    }, [triggerOpen])

    // set start, end when get checkin date and nights from props
    useEffect(() => {
        if (checkInDate || nights) {
            setStartDate(moment(checkInDate, YYYYMMDD))
            setEndDate(moment(checkInDate, YYYYMMDD).add(nights > 0 ? nights : 1, 'days'))
        }
    }, [checkInDate, nights])

    const disabledDate = (current: any) => {
        return current < moment().add(-1, 'day').endOf('day') // Can not select days before today
    }

    // console.log('--startDate--', startDate)
    // const onCalendarChange = (
    //     dates: [Moment, Moment],
    //     dateStrings: [string, string],
    //     info: { range: 'start' | 'end' }
    // ) => {
    //     if (dates[0] && !dates[1]) {
    //         setStartDate(moment(dates[0]))
    //         setEndDate(moment(dates[0]).add(1, 'days'))
    //     } else if (!dates[0] && dates[1]) {
    //         setStartDate(moment(dates[1]).add(-1, 'days'))
    //         setEndDate(moment(dates[1]))
    //     } else {
    //     }
    // }

    const handleOpenDp = (open: boolean) => {
        setIsOpenDp(open)
    }

    const handleCloseDp = () => {
        setIsOpenDp(false)
    }

    const renderExtraFooter = () => (
        <div className="headerPopup">
            <p>{t('common:Chọn ngày')}</p>
            <button type="button" className="headerPopup__close" onClick={handleCloseDp}>
                <IconClose />
            </button>
        </div>
    )

    return (
        <div className="dateInput">
            {isHunt ? (
                <>
                    <p className="pCheckin">{t('Ngày nhận phòng')}</p>
                    <p className="pCheckout">{t('Ngày trả phòng')}</p>
                </>
            ) : (
                <p>{t('Ngày nhận phòng / trả phòng')}</p>
            )}

            <div className="inputInline">
                <div className="vntDatepicker">
                    <RangePicker
                        open={isOpenDp}
                        onOpenChange={handleOpenDp}
                        size={'large'}
                        placeholder={['Nhận phòng', 'Trả phòng']}
                        format={'DD-MM-YYYY'}
                        disabledDate={disabledDate}
                        value={[startDate, endDate]}
                        // @ts-ignore
                        onCalendarChange={onCalendarChange}
                        allowClear={false}
                        getPopupContainer={(trigger: any) => trigger.parentNode}
                        renderExtraFooter={renderExtraFooter}
                        inputReadOnly={true}
                    />
                </div>
            </div>
        </div>
    )
})

export default DateRangeHotel
