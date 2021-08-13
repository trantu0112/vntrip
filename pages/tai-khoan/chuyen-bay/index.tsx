import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { withAuth } from '../../../utils/custom-hoc'
import { PATH_USER } from '../../../constants/common'
import { IconDonggia, IconFlight, IconHotel } from '../../../constants/icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Radio, Pagination } from 'antd'
import { getBookingRequests, getOrdersByUser } from '../../../api/order-services'
import { StatusFilterFlight } from '../../../constants/types'
import * as queryString from 'query-string'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../store/common/action'

const Layout = dynamic(() => import('../../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../../components/user/ProfileNavbar'))
const OrderItemFlight = dynamic(() => import('../../../components/order/OrderItemFlight'))

const MyFlightBooking = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel', 'flight'])
    const [status, setStatus] = useState<StatusFilterFlight>('arrived')
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [orderData, setOrderData] = useState<any[]>([])
    const [bookingRequestData, setBookingRequestData] = useState<any[]>([])
    // console.log(status)
    useEffect(() => {
        const _status = router.query.status ? String(router.query.status) : 'arrived'
        const page = Number(router.query.page) || 1
        const params: any = {
            order_type: 'flight',
            page: page,
            page_size: 10,
        }
        switch (_status) {
            case 'cancelled':
                params.order_status = 'order_cancel'
                break
            case 'arrived':
                params.order_status = 'order_success'
                params.stay_status = 'order_departed'
                break
            case 'upcoming':
                params.order_status = 'order_success'
                params.stay_status = 'order_upcoming'
                break
            case 'pending_payment':
                params.is_booked = true
                params.made_order = 'pending'
                params.type = 'flight'
                break
            default:
                break
        }
        if (
            _status === 'arrived' ||
            _status === 'upcoming' ||
            _status === 'pending_payment' ||
            _status === 'cancelled' ||
            _status === 'success'
        ) {
            setStatus(_status)
            setPage(page)
            fetchData(_status, params)
        }
        async function fetchData(status: StatusFilterFlight, params: any) {
            try {
                dispatch(setLoading(true))
                const res =
                    status === 'pending_payment' ? await getBookingRequests(params) : await getOrdersByUser(params)
                dispatch(setLoading(false))
                if (res.status === 'success') {
                    status === 'pending_payment' ? setBookingRequestData(res.data) : setOrderData(res.data)
                    setTotal(res.paging.total)
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }
    }, [router.query, router.pathname])

    const onChangeStatus = (value: StatusFilterFlight) => {
        setStatus(value)
        const new_query: any = { ...router.query, status: value }
        delete new_query.page
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_USER.FLIGHT}?${stringify}`, undefined, { shallow: true })
    }

    const handleChangePaging = (_page: number) => {
        const new_query: any = { ...router.query, page: _page }
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_USER.FLIGHT}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }

    const showTotalPriceBookingRequest = (flight_items: any[]) => {
        let totalPrice = 0
        totalPrice = flight_items.reduce(
            (acc: number, cur: any) => acc + cur.flight_reservation && cur.flight_reservation.total_price,
            0
        )
        flight_items.forEach((item) => {
            item.flight_rate.passengers.forEach((passenger: any) => {
                passenger.listBaggage.forEach((baggage: any) => {
                    totalPrice += baggage.price * 1
                })
            })
        })
        return totalPrice
    }

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileOrder">
                        <div className="profileOrder__left">
                            <ul className="profileTab">
                                <li>
                                    <Link href={PATH_USER.HOTEL}>
                                        <a>
                                            <IconHotel />
                                            <span>{t('hotel:Khách sạns')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="active">
                                    <Link href={PATH_USER.FLIGHT}>
                                        <a>
                                            <IconFlight />
                                            <span>{t('flight:Máy bay')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={PATH_USER.COMBO}>
                                        <a>
                                            <IconDonggia />
                                            <span>{t('Combo')}</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="profileOrder__right">
                            <div className="profileFlight">
                                <div className="profileFilter">
                                    <div className="profileFilter__item">
                                        <p className="mb0 semibold size-16">{t('common:Lọc theo')}:</p>
                                    </div>
                                    <Radio.Group
                                        className="hotelSort__group mt0 ml30"
                                        value={status}
                                        onChange={(event) => onChangeStatus(event.target.value)}
                                    >
                                        {[
                                            {
                                                key: 'arrived',
                                                label: 'Đã bay',
                                            },
                                            {
                                                key: 'upcoming',
                                                label: 'Sắp tới',
                                            },
                                            {
                                                key: 'pending_payment',
                                                label: 'Chờ thanh toán',
                                            },
                                        ].map((item) => {
                                            return (
                                                <div className="profileFilter__item" key={item.key}>
                                                    <Radio value={item.key}>{t('flight:' + item.label)}</Radio>
                                                </div>
                                            )
                                        })}
                                    </Radio.Group>
                                </div>
                                <div className="profileFlight__body">
                                    {status === 'pending_payment'
                                        ? bookingRequestData.map((bookingRequest) => {
                                              return (
                                                  <OrderItemFlight
                                                      key={bookingRequest.id}
                                                      type={'booking_request'}
                                                      orderCode={bookingRequest.order_code || ''}
                                                      orderId={bookingRequest.id}
                                                      bookingSuggestionId={bookingRequest.suggestion_id}
                                                      orderStatus={''}
                                                      flightItems={bookingRequest.flight_items}
                                                      totalPrice={showTotalPriceBookingRequest(
                                                          bookingRequest.flight_items
                                                      )}
                                                  />
                                              )
                                          })
                                        : orderData.map((order) => {
                                              return (
                                                  <OrderItemFlight
                                                      key={order.id}
                                                      type={'order'}
                                                      orderId={order.id}
                                                      bookingSuggestionId={''}
                                                      orderCode={order.order_data.order_code}
                                                      orderStatus={order.order_data.order_status}
                                                      flightItems={order.flight_item}
                                                      totalPrice={order.order_data.final_price}
                                                  />
                                              )
                                          })}
                                    <ul className="pagination">
                                        <Pagination
                                            current={page || 1}
                                            pageSize={10}
                                            total={total}
                                            showSizeChanger={false}
                                            onChange={handleChangePaging}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default withAuth()(MyFlightBooking)
