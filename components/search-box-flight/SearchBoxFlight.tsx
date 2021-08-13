import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Radio, Button, DatePicker } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { IconClose, IconSwitchFlight } from '../../constants/icons'
import {
    setOriginCode,
    setDestinCode,
    setAdultCount,
    setChildCount,
    setInfantCount,
    setDepartDate,
    setReturnDate,
    setLeg,
    setValidateOrigin,
    setValidateDestin,
} from '../../store/flight/action'
import { getCookie, toggleClassNoScroll } from '../../utils/common'
import SelectAirport from './SelectAirport'
import SelectPassenger from './SelectPassenger'
import * as queryString from 'query-string'

const { RangePicker } = DatePicker

interface Props {
    isShow?: boolean
}

const SearchBoxFlight: React.FC<Props> = React.memo(({ isShow }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['flight', 'common', 'notification'])
    const { originCode, destinCode, departDate, returnDate, adultCount, childCount, infantCount, leg } = useSelector(
        (state: any) => {
            return {
                originCode: state.flight.originCode,
                destinCode: state.flight.destinCode,
                departDate: state.flight.departDate || moment().add(1, 'day').toDate(),
                returnDate: state.flight.returnDate || moment().add(3, 'day').toDate(),
                adultCount: state.flight.adultCount || 1,
                childCount: state.flight.childCount || 0,
                infantCount: state.flight.infantCount || 0,
                leg: state.flight.leg || 0,
            }
        }
    )
    // const [leg, setLeg] = useState<number>(0)
    const [isOpenDp, setIsOpenDp] = useState<boolean>(false)

    // parse query from url to state
    useEffect(() => {
        const { ap, dt, ps, leg }: any = router.query
        if (ap && ap.includes('.')) {
            const ap_split = ap.split('.')
            dispatch(setOriginCode(ap_split[0]))
            dispatch(setDestinCode(ap_split[1]))
        }
        if (dt && dt.includes('.')) {
            const dt_split = dt.split('.')
            dispatch(setDepartDate(moment(dt_split[0], 'YYYYMMDD').toDate()))
            dispatch(setReturnDate(moment(dt_split[1], 'YYYYMMDD').toDate()))
        }
        if (ps && ps.includes('.')) {
            const ps_split = ps.split('.')
            dispatch(setAdultCount(Number(ps_split[0])))
            dispatch(setChildCount(Number(ps_split[1])))
            dispatch(setInfantCount(Number(ps_split[2])))
        }
        if (leg) {
            dispatch(setLeg(Number(leg)))
        }
    }, [router.query.ap, router.query.dt, router.query.ps, router.query.leg])

    const handleChangeLeg = (leg: number) => {
        dispatch(setLeg(leg))
    }

    const handleSwitchAirport = () => {
        dispatch(setOriginCode(destinCode))
        dispatch(setDestinCode(originCode))
    }

    const disabledDate = (current: any) => {
        // Can not select days before today
        return current < moment().startOf('day') || current > moment().add(6, 'month').endOf('day')
    }

    const handleChangeDateSingle = (date: any) => {
        dispatch(setDepartDate(date.toDate()))
        dispatch(setReturnDate(date.add(1, 'day').toDate()))
    }

    const handleChangeDateRange = (dates: any[]) => {
        if (dates[0]) {
            dispatch(setDepartDate(dates[0].toDate()))
        }
        if (dates[1]) {
            dispatch(setReturnDate(dates[1].toDate()))
        }
    }

    const handleOpenDp = (open: boolean) => {
        setIsOpenDp(open)
        toggleClassNoScroll()
    }

    const handleCloseDp = () => {
        setIsOpenDp(false)
        toggleClassNoScroll()
    }

    const renderExtraFooter = () => (
        <div className="headerPopup">
            <p>Chọn ngày</p>
            <button type="button" className="headerPopup__close" onClick={handleCloseDp}>
                <IconClose />
            </button>
        </div>
    )

    const handleSubmit = () => {
        if (!originCode) {
            dispatch(setValidateOrigin({ status: 'error', text: t('notification:Vui lòng chọn điểm khởi hành') }))
            return
        }
        if (!destinCode) {
            dispatch(setValidateDestin({ status: 'error', text: t('notification:Vui lòng chọn điểm đến') }))
            return
        }

        const queryObj: any = {
            ap: originCode + '.' + destinCode,
            dt: moment(departDate).format('YYYYMMDD') + '.' + moment(returnDate).format('YYYYMMDD'),
            ps: adultCount + '.' + childCount + '.' + infantCount,
            leg: leg,
        }
        const queryStringify = queryString.stringify(queryObj, { encode: false, skipNull: true })

        window.location.href = '/tim-ve-may-bay?' + queryStringify

        router.push(
            {
                pathname: '/tim-ve-may-bay',
                query: queryObj,
            },
            undefined,
            { shallow: true } // allow handle change query in useEffect  https://nextjs.org/docs/routing/shallow-routing
        )

        // let objParams = {}
        // let publisher: any = getCookie('publisher')
        // let param_route =
        //     String(adultCount) +
        //     String(childCount) +
        //     String(infantCount) +
        //     '-' +
        //     originCode +
        //     '-' +
        //     destinCode +
        //     '-' +
        //     moment(departDate).format('YYYYMMDD')
        // param_route = leg ? param_route + '-' + moment(returnDate).format('YYYYMMDD') : param_route
        //
        // if (publisher) {
        //     publisher = JSON.parse(publisher)
        //     objParams = {
        //         ...objParams,
        //         ...publisher,
        //     }
        // }
        //
        // const queryStringify = queryString.stringify(objParams, { encode: false, skipNull: true })
        //
        // const redirect_url = encodeURIComponent(
        //     `https://atadi.vntrip.vn/#/airdom/presearch/search_list?dv=0&route=${param_route}`
        // )
        //
        // window.open(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/chuyen-huong?url=${redirect_url}`)
    }

    return (
        <div className={`vntSearch__flight ${isShow ? 'open' : ''}`}>
            <div className="vntSearch__radio">
                <Radio.Group
                    value={leg}
                    onChange={(event) => {
                        handleChangeLeg(event.target.value)
                    }}
                >
                    <Radio value={0}>{t('Một chiều')}</Radio>
                    <Radio value={1}>{t('Khứ hồi')}</Radio>
                </Radio.Group>
                {/*<Switch />*/}
            </div>
            <div className="vntSearch__flex">
                <SelectAirport isOrigin={true} code={originCode} />
                <div className="vntSearch__toggle">
                    <button type="button" className="flightToggle" onClick={handleSwitchAirport}>
                        <IconSwitchFlight />
                    </button>
                </div>
                <SelectAirport isOrigin={false} code={destinCode} />
                <div className="dateInput">
                    <label htmlFor="date">{t('Ngày đi / ngày về')}</label>
                    <div className="inputInline">
                        <div className="vntDatepicker">
                            {leg === 1 ? (
                                <RangePicker
                                    open={isOpenDp}
                                    onOpenChange={handleOpenDp}
                                    size={'large'}
                                    format={'DD-MM-YYYY'}
                                    disabledDate={disabledDate}
                                    value={[moment(departDate), moment(returnDate)]}
                                    // @ts-ignore
                                    onChange={handleChangeDateRange}
                                    allowClear={false}
                                    renderExtraFooter={renderExtraFooter}
                                    inputReadOnly={true}
                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                />
                            ) : (
                                <DatePicker
                                    open={isOpenDp}
                                    onOpenChange={handleOpenDp}
                                    size={'large'}
                                    format={'DD-MM-YYYY'}
                                    disabledDate={disabledDate}
                                    value={moment(departDate)}
                                    onChange={handleChangeDateSingle}
                                    allowClear={false}
                                    style={{ width: '100%' }}
                                    renderExtraFooter={renderExtraFooter}
                                    inputReadOnly={true}
                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                    showToday={false}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <SelectPassenger />

                <div className="vntSearch__btn">
                    <Button type="primary" className={'w100'} size={'large'} onClick={handleSubmit}>
                        {t('common:Tìm kiếm')}
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default SearchBoxFlight
