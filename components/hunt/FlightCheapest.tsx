import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { IconFlightCheap, IconHalfArrow } from '../../constants/icons'
import { convertAirportCodeToCityName } from '../../utils/flight'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'
import DisplayPrice from '../common/DisplayPrice'
import LoadingRedirectAtadi from '../common/LoadingRedirectAtadi'

interface Props {
    data: any[]
}

const FlightCheapest: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation(['common', 'flight'])
    const [flights, setFlights] = useState<any>(null)
    const [listMonth, setListMonth] = useState<any[]>([])
    const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month').format('YYYYMM')) // for mobile
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const currentMonth = moment().startOf('month')
        setListMonth(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                const month = moment(currentMonth).add(i, 'month')
                return {
                    key: month.format('YYYYMM'),
                    text: month.format('MM/YYYY'),
                }
            })
        )
    }, [])

    useEffect(() => {
        if (Array.isArray(data)) {
            let new_obj: any = {}
            for (let i = 0; i < data.length; i++) {
                const { _id } = data[i]
                const key = _id.o + '-' + _id.d
                const month = String(_id.m).length > 1 ? _id.m : `0${_id.m}`
                const year = _id.y
                new_obj[key] = new_obj.hasOwnProperty(key)
                    ? {
                          ...new_obj[key],
                          [String(year) + String(month)]: data[i],
                      }
                    : {
                          [String(year) + String(month)]: data[i],
                      }
            }
            setFlights(new_obj)
        }
    }, [data])

    const onClickMonthMobile = (key: string) => {
        setSelectedMonth(key)
    }

    const handleRedirectAtadi = (url: any) => {
        // setIsLoading(true)
        // setTimeout(() => {
        //     setIsLoading(false)
        //     isMobile
        //         ? (window.location.href = url)
        //         : window.open(
        //               url,
        //               '_blank' // <- This is what makes it open in a new window.
        //           )
        // }, 1500)

        url = encodeURIComponent(url)
        window.open(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/chuyen-huong?url=${url}`)
    }

    if (!Array.isArray(data) || data.length === 0) {
        return null
    }
    return (
        <div className="flightCheapV2">
            <div className="container">
                <h2 className="size-24 text-center mb25 bold">
                    {t('common:Chặng bay giá rẻ')}
                    <div className="showMobile">
                        <p className="size-12 mb0 regular">
                            *{t('common:Click để xem chi tiết. Lưu ý giá vé liên tục thay đổi')}
                        </p>
                    </div>
                </h2>
                {/*---------MOBILE---------*/}
                <div className="showMobile">
                    <ul className="flightCheapV2__month">
                        {listMonth.map((item) => (
                            <li key={item.key} className={selectedMonth === item.key ? 'active' : ''}>
                                <button type="button" onClick={() => onClickMonthMobile(item.key)}>
                                    <span>{item.text}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flightCheapV2__group">
                        {flights &&
                            Object.keys(flights).map((item) => {
                                if (!flights[item][selectedMonth]) return null
                                return (
                                    <button
                                        key={item}
                                        className="flightCheapV2__item w100 text-left"
                                        onClick={() => {
                                            handleRedirectAtadi(
                                                `https://atadi.vntrip.vn/#/promo/month/v1?m=${selectedMonth}&pa=${flights[item][selectedMonth]['_id']['o']}&pb=${flights[item][selectedMonth]['_id']['d']}&utm_medium=HotFlight`
                                            )
                                        }}
                                    >
                                        <div className="flightCheapV2__item__top">
                                            <div className="placeLine">
                                                <div className="placeLine__icon">
                                                    <IconFlightCheap />
                                                </div>
                                                <div className="placeLine__text">
                                                    <p className="mb0 p1 flexGroup2">
                                                        <span className="mr10">
                                                            {convertAirportCodeToCityName(item.substr(0, 3))}
                                                        </span>
                                                        <IconHalfArrow />
                                                        <span className="ml10">
                                                            {convertAirportCodeToCityName(item.substr(4, 6))}
                                                        </span>
                                                    </p>
                                                    <p className="mb0 p2 gray-5">
                                                        {t('flight:Một chiều')} | {item.substr(0, 3)} -{' '}
                                                        {item.substr(4, 6)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flightCheapV2__item__bottom text-right">
                                            <p className="mb0">
                                                <span className="size-12">{t('flight:Chỉ từ')}:&nbsp;</span>
                                                <span className="red-2 bold size-18">
                                                    <DisplayPrice price={flights[item][selectedMonth]['c']} />
                                                </span>
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                    </div>
                </div>

                {/*---------DESKTOP---------*/}

                <div className="showDesktop">
                    <div className="flightCheapV2__table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <p className="size-16 mb0 bold">{t('flight:Đường bay nổi bật')}</p>
                                    </th>
                                    {listMonth.slice(0, 4).map((item) => (
                                        <th key={item.key} className="text-center">
                                            <p className="size-16 mb0 bold text-center">{item.text}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {flights &&
                                    Object.keys(flights).map((item) => {
                                        return (
                                            <tr key={item}>
                                                <td>
                                                    <div className="placeLine">
                                                        <div className="placeLine__icon">
                                                            <IconFlightCheap />
                                                        </div>
                                                        <div className="placeLine__text">
                                                            <p className="mb0 p1 flexGroup2">
                                                                <span className="mr10">
                                                                    {convertAirportCodeToCityName(item.substr(0, 3))}
                                                                </span>
                                                                <IconHalfArrow />
                                                                <span className="ml10">
                                                                    {convertAirportCodeToCityName(item.substr(4, 6))}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                {listMonth.slice(0, 4).map((month) => {
                                                    if (!flights[item][month.key]) return null
                                                    return (
                                                        <td key={month.key}>
                                                            <button
                                                                className="red-2 bold text-center size-20 d-block w100"
                                                                onClick={() => {
                                                                    handleRedirectAtadi(
                                                                        `https://atadi.vntrip.vn/#/promo/month/v1?m=${
                                                                            month.key
                                                                        }&pa=${
                                                                            flights[item][month.key]['_id']['o']
                                                                        }&pb=${
                                                                            flights[item][month.key]['_id']['d']
                                                                        }&utm_medium=HotFlight`
                                                                    )
                                                                }}
                                                            >
                                                                <span>
                                                                    <DisplayPrice
                                                                        price={flights[item][month.key]['c']}
                                                                    />
                                                                </span>
                                                            </button>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <LoadingRedirectAtadi isShow={isLoading} />
        </div>
    )
}

export default FlightCheapest
