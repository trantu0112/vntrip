import React, { useEffect, useState } from 'react'
import { searchMonth } from '../../api/flight-services'
import DisplayPrice from './DisplayPrice'
import moment from 'moment'
import { convertAirportCodeToCityName } from '../../utils/flight'
import { useTranslation } from 'react-i18next'

const FlightCheap: React.FC = () => {
    const { t } = useTranslation(['flight'])
    const [cheapItem, setCheapItem] = useState<any[]>([])
    const [isActive, setIsActive] = useState<any>('VJ')
    useEffect(() => {
        async function fetchData() {
            const date = new Date()
            try {
                let params = {
                    start_point: 'HAN',
                    end_point: 'SGN',
                    airline: '',
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    is_simple: true,
                }

                const res = await searchMonth(params)
                setCheapItem(res.data)
            } catch (e) {
                throw e
            }
        }

        fetchData()
    }, [])

    const airlines = [
        {
            name: 'VietJet Air',
            code: 'VJ',
        },
        {
            name: 'Vietnam Airlines',
            code: 'VN',
        },
        {
            name: 'Bamboo Airways',
            code: 'QH',
        },
        {
            name: 'Jetstar',
            code: 'JQ',
        },
    ]

    function dynamicsort(property: any, order: any) {
        var sort_order = 1
        if (order === 'desc') {
            sort_order = -1
        }
        return function (a: any, b: any) {
            // a should come before b in the sorted order
            if (a[property] < b[property]) {
                return -1 * sort_order
                // a should come after b in the sorted order
            } else if (a[property] > b[property]) {
                return 1 * sort_order
                // a and b are the same
            } else {
                return 0 * sort_order
            }
        }
    }

    const handleClickSearch = (data: any) => {
        // const queryObj: any = {
        //     ap: data.StartPoint + '.' + data.EndPoint,
        //     dt:
        //         moment(data.DepartDate).format('YYYYMMDD') +
        //         '.' +
        //         moment(data.DepartDate).add(1, 'days').format('YYYYMMDD'),
        //     ps: '1.0.0',
        //     leg: '0',
        // }

        // window.open(
        //     `/tim-ve-may-bay?ap=${queryObj.ap}&dt=${queryObj.dt}&ps=${queryObj.ps}&leg=${queryObj.leg}`,
        //     '_blank'
        // )

        const redirect_url = encodeURIComponent(
            `https://atadi.vntrip.vn/#/promo/month/v1?m=${moment(data.DepartDate).format('YYYYMM')}&pa=${
                data.StartPoint
            }&pb=${data.EndPoint}&utm_medium=HotFlight`
        )
        window.open(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/chuyen-huong?url=${redirect_url}`)
    }

    return (
        <div className="flightCheap">
            <div className="container">
                <div className="flightCheap__title mb30">
                    <h2 className="text-center">{t('flight:VÉ MÁY BAY GIÁ RẺ')}</h2>
                    <p className="text-center size-14">
                        {t(
                            'flight:Giá vé 1 chiều trung bình cho một người lớn đã bao gồm thuế và phí Lưu ý giá vé liên tục thay đổi'
                        )}
                    </p>
                </div>
                <div className="flightCheap__cont">
                    <ul className="flightCheap__tab">
                        {airlines.map((airline, index) => {
                            return (
                                <li className={`${isActive === airline.code ? 'active' : ''}`} key={index}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsActive(airline.code)
                                        }}
                                    >
                                        <span>{airline.name}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    {airlines.map((airline, index) => {
                        return (
                            <div
                                className={`flightCheap__group ${isActive === airline.code ? 'open' : ''}`}
                                key={index}
                            >
                                {cheapItem
                                    .filter((item) => item.Airline === airline.code)
                                    .sort(dynamicsort('TotalNetPrice', 'asc'))
                                    .map((item, index) => {
                                        if (index < 4) {
                                            return (
                                                <div className="flightCheap__col" key={index}>
                                                    <button
                                                        type="button"
                                                        className="cheapItem"
                                                        onClick={() => {
                                                            handleClickSearch(item)
                                                        }}
                                                    >
                                                        <div className="cheapItem__title">
                                                            <p className="size-16 semibold">
                                                                {convertAirportCodeToCityName(item.StartPoint)}
                                                            </p>
                                                            <svg
                                                                width={12}
                                                                height={6}
                                                                viewBox="0 0 12 6"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11.6422 4.31563L9.07969 1.06563C9.03296 1.00629 8.97339 0.958321 8.90547 0.925306C8.83755 0.892291 8.76302 0.875092 8.6875 0.875H7.675C7.57031 0.875 7.5125 0.995312 7.57656 1.07812L9.83125 3.9375H0.375C0.30625 3.9375 0.25 3.99375 0.25 4.0625V5C0.25 5.06875 0.30625 5.125 0.375 5.125H11.2484C11.6672 5.125 11.9 4.64375 11.6422 4.31563Z"
                                                                    fill="black"
                                                                />
                                                            </svg>
                                                            <p className="size-16 semibold">
                                                                {convertAirportCodeToCityName(item.EndPoint)}
                                                            </p>
                                                        </div>
                                                        <p>{moment(item.DepartDate).format('DD/MM/YYYY')}</p>
                                                        <div className="text-right">
                                                            <p className="mb0">{t('flight:Chỉ từ')}</p>
                                                            <p className="semibold size-16 yellow-1 mb0">
                                                                <DisplayPrice price={item.TotalNetPrice} />
                                                            </p>
                                                        </div>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default FlightCheap
