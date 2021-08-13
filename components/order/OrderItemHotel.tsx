import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getUrlHotelImage } from '../../utils/hotel'
import { convertClass, convertOrderStatus } from '../../utils/common'
import { PATH_USER } from '../../constants/common'
import HotelAddress from '../common/HotelAddress'
import DisplayPrice from '../common/DisplayPrice'
import RenderStarRate from '../hotel-list/RenderStarRate'

interface Props {
    data: any
}

const OrderItemHotel: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation(['hotel', 'common'])
    return (
        <div className="listOrder__item">
            <div className="hotelOrder">
                <div className="hotelOrder__img">
                    <div className="lazyload-wrapper">
                        <img
                            src={getUrlHotelImage({
                                slug: data?.hotel_image?.thumb_image,
                                hotelId: data?.hotel_image?.id,
                                size: '200x205',
                            })}
                            alt={data?.hotel_extra_data?.hotel_name}
                        />
                    </div>
                </div>
                <div className="hotelOrder__cont">
                    <div className="hotelOrder__left">
                        <h3 className="hotelName">
                            {data?.hotel_extra_data?.hotel_name}
                            <RenderStarRate starRate={Number(data?.hotel_extra_data?.hotel_star_rate)} />
                        </h3>
                        <HotelAddress
                            fullAddress={data?.hotel_extra_data?.hotel_address}
                            latitude={data?.hotel_extra_data?.latitude}
                            longitude={data?.hotel_extra_data?.longitude}
                        />

                        <ul className="hotelOrder__list">
                            <li>
                                <p className="mb0 gray-5">{t('Mã đơn hàng')}:</p>
                                <p className="mb0 yellow-1 semibold">{data?.order_data?.order_code}</p>
                            </li>
                            <li>
                                <p className="mb0 gray-5">{t('Ngày đặt')}:</p>
                                <p className="mb0 semibold">
                                    {moment(data?.order_data?.created_at).format('dddd, LL')}
                                </p>
                            </li>
                            <li>
                                <p className="mb0 gray-5">{t('Nhận phòng')}:</p>
                                <p className="mb0 semibold">{moment(data?.check_in_date).format('dddd, LL')}</p>
                            </li>
                            <li>
                                <p className="mb0 gray-5">{t('Trả phòng')}:</p>
                                <p className="mb0 semibold">{moment(data?.check_out_date).format('dddd, LL')}</p>
                            </li>
                            <li>
                                <p className="mb0 gray-5">{t('common:Tình trạng')}:</p>
                                <p className={`mb0 semibold ${convertClass(data?.order_data?.order_status)}`}>
                                    {convertOrderStatus(data?.order_data?.order_status)}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="hotelOrder__right">
                        <div className="hotelOrder__price">
                            <p className="mb0 p1 gray-5">{t('common:Tổng cộng')}</p>
                            <p className="mb0 yellow-1 bold size-20 p2">
                                <DisplayPrice price={data?.order_data?.final_price} />
                            </p>
                        </div>
                        <div className="hotelOrder__btn">
                            <Link href={PATH_USER.HOTEL_DETAIL} as={`${PATH_USER.HOTEL}/${data?.id}`}>
                                <a className="btn btn_orange w100">
                                    <span>{t('common:Quản lý')}</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItemHotel
