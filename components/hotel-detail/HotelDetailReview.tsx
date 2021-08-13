import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { getFullName } from '../../utils/user'
import { convertReviewToText, convertReviewRatingToText, convertReviewPointToText } from '../../utils/hotel'
import { getHotelReview, getHotelReviewSummary } from '../../api/hotel-services'
import { IconVntripStarRate } from '../../constants/icons'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import RenderStarRate from '../hotel-list/RenderStarRate'

interface Props {
    hotelId: number
    hotelName: string
}

const HotelDetailRewview: React.FC<Props> = ({ hotelId, hotelName }) => {
    const { t } = useTranslation(['hotel', 'common'])
    const [userReviews, setUserReviews] = useState([])
    const [averageRating, setAverageRating] = useState<{ key: string; text: string; point: number }>({
        key: 'average',
        text: '',
        point: 0,
    })
    const [totalRatings, setTotalRatings] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])
    const [paging, setPaging] = useState<{ page: number; pageSize: number; total: number }>({
        page: 1,
        pageSize: 5,
        total: 0,
    })

    useEffect(() => {
        if (hotelId) {
            fetchDataReviewSumary(hotelId)
        }

        async function fetchDataReviewSumary(hotel_id: number) {
            try {
                const res1 = await getHotelReviewSummary(hotel_id)
                if (res1.status === 'success') {
                    const { total_ratings, total_reviews } = res1.data
                    setTotalRatings(
                        Object.keys(total_ratings)
                            .filter((item) => item !== 'average')
                            .map((item) => {
                                const point = total_ratings[item] ? total_ratings[item].toFixed(1) : 0
                                return {
                                    key: item,
                                    text: t(convertReviewRatingToText(item)),
                                    point: point,
                                    point_to_star: Math.floor(point / 2), // 20% = 1 star
                                }
                            })
                    )
                    setAverageRating({
                        key: 'average',
                        text: convertReviewPointToText(total_ratings['average']),
                        point: total_ratings['average'] ? total_ratings['average'].toFixed(1) : 0,
                        // point: total_ratings['average'] ? Math.ceil(total_ratings['average']) : 0,
                    })
                    setReviews(
                        Object.keys(total_reviews)
                            .filter((item) => item !== 'total')
                            .map((item) => {
                                return {
                                    key: item,
                                    text: convertReviewToText(item),
                                    point: total_reviews[item],
                                }
                            })
                    )
                }
            } catch (err) {
                throw err
            }
        }
    }, [hotelId])

    useEffect(() => {
        if (hotelId) {
            fetchUserReview(hotelId, paging.page, paging.pageSize)
        }

        async function fetchUserReview(hotel_id: number, page: number, pageSize: number) {
            try {
                const res2 = await getHotelReview({
                    page: page,
                    page_size: pageSize,
                    review_status: 'review_public',
                    hotel: hotelId,
                })
                if (res2.status === 'success') {
                    setUserReviews(res2.data)
                    setPaging({
                        ...paging,
                        page: res2.paging.page,
                        total: res2.paging.total,
                    })
                }
            } catch (err) {
                throw err
            }
        }
    }, [paging.page, paging.pageSize, hotelId])

    const handleChangePaging = (_page: number) => {
        setPaging({ ...paging, page: _page })
    }

    return (
        <>
            {averageRating.point > 0 ? (
                <div className="hotelReview" id="hotelReview">
                    <h2 className="mb30">{t('hotel:Đánh giá từ khách hàng Vntrip', { hotelName: hotelName })}</h2>
                    <div className="hotelReview__top">
                        <div className="d-flex">
                            <div className="hotelReview__point">
                                <IconVntripStarRate width={101} height={32} />
                                <p className="p1">
                                    <span>{averageRating.point}</span>
                                </p>
                                <p className="p2">{t(averageRating.text)}</p>
                            </div>
                            <ul className="hotelReview__progress">
                                {reviews.map((item) => {
                                    return (
                                        <li key={item.key}>
                                            <p className="p1">{t(item.text)}</p>
                                            <progress value={item.point} max={10} />
                                            <p className="p2">{item.point}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <ul className="hotelReview__star">
                                {totalRatings.map((rating) => {
                                    return (
                                        <li key={rating.key}>
                                            <p className="p1">{t(rating.text)}</p>
                                            <RenderStarRate starRate={rating.point_to_star} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="hotelReview__bot">
                        <ul className="hotelFeedback">
                            {userReviews.map((item: any) => {
                                return (
                                    <li className="hotelFeedback__item" key={item.id}>
                                        <div className="hotelFeedback__user">
                                            <img
                                                src="https://statics.vntrip.vn/images/default-avatar.png"
                                                alt={'avatar'}
                                            />
                                            <div className="d-block">
                                                <p className="p1">
                                                    {item.user_status === 'anonymous'
                                                        ? t('common:Ẩn danh')
                                                        : getFullName(item.user.first_name, item.user.last_name)}
                                                </p>
                                                <p className="p2">{moment(item.created_at).format('DD/MM/YYYY')}</p>
                                            </div>
                                        </div>

                                        <p className="hotelFeedback__text">
                                            {item.advantage ? (
                                                <>
                                                    <PlusOutlined style={{ color: 'green' }} />
                                                    &nbsp; {item.advantage}
                                                </>
                                            ) : null}
                                        </p>
                                        <p className="hotelFeedback__text">
                                            {item.disadvantage ? (
                                                <>
                                                    <MinusOutlined style={{ color: 'red' }} />
                                                    &nbsp; {item.disadvantage}
                                                </>
                                            ) : null}
                                        </p>

                                        <div className="hotelFeedback__photo">&nbsp;</div>
                                        <div className="ratePoint">
                                            <div className="ratePoint__numb">
                                                <svg
                                                    width={25}
                                                    height={8}
                                                    viewBox="0 0 19 5"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.95083 2.82918L7.57851 5L9.52803 3.97508L11.4775 5L11.1052 2.82918L12.6824 1.2918L10.5028 0.975078L9.52803 -1L8.55327 0.975078L6.37364 1.2918L7.95083 2.82918ZM6.56612 3.47137C6.36876 3.76149 3.61758 2.15104 2.50053 1.3774C2.35534 1.27889 2.22955 1.15444 2.1295 1.01031C2.01865 0.854072 1.99206 0.653192 2.05845 0.473496C2.07247 0.434616 2.09102 0.397521 2.11371 0.362975V0.347187C2.13938 0.314581 2.16777 0.28421 2.19857 0.256402C2.34566 0.129634 2.54656 0.0851549 2.73341 0.137987C2.90309 0.182489 3.06303 0.258109 3.2051 0.361002C4.31623 1.15044 6.75755 3.17533 6.56019 3.46545L6.56612 3.47137ZM6.57598 4.12265C6.46152 4.55092 2.54987 3.83254 0.905875 3.40032C0.693051 3.34785 0.492132 3.25542 0.3138 3.12797C0.118447 2.994 0.00119249 2.77276 0 2.53589C0.000612062 2.48464 0.00723597 2.43363 0.0197358 2.38393V2.36024C0.0340043 2.31078 0.0538686 2.26311 0.0789434 2.21814C0.198292 2.01055 0.412531 1.87536 0.651283 1.85698C0.868988 1.83705 1.0885 1.85779 1.29862 1.91816C2.93867 2.36419 6.68453 3.69439 6.57006 4.12857L6.57598 4.12265ZM16.2904 1.3774C15.1734 2.15104 12.4242 3.76149 12.2268 3.47137L12.2367 3.46545C12.0393 3.17533 14.4826 1.15044 15.5918 0.361001C15.734 0.25846 15.8939 0.182872 16.0634 0.137987C16.2478 0.0861994 16.4459 0.129064 16.5924 0.252454C16.621 0.281016 16.6461 0.312808 16.6674 0.347186L16.6772 0.362975C16.7013 0.397 16.7206 0.434192 16.7345 0.473496C16.801 0.653434 16.7736 0.854681 16.6614 1.01031C16.5614 1.15444 16.4356 1.27889 16.2904 1.3774ZM12.2169 4.12265C12.3314 4.55092 16.243 3.83254 17.887 3.40032C18.0997 3.34744 18.3006 3.25505 18.4791 3.12797C18.675 2.99447 18.7924 2.77294 18.7929 2.53589C18.7919 2.48478 18.786 2.43389 18.7751 2.38393V2.36024C18.7593 2.31104 18.7388 2.26346 18.714 2.21814C18.5951 2.01005 18.3806 1.87468 18.1416 1.85698C17.9233 1.83712 17.7031 1.85787 17.4923 1.91816C15.8523 2.36419 12.1064 3.69439 12.2209 4.12857L12.2169 4.12265Z"
                                                        fill="#FA8C16"
                                                    />
                                                </svg>
                                                <span>{Number(item.score).toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul className="pagination">
                            <Pagination
                                current={paging?.page || 1}
                                pageSize={paging.pageSize}
                                total={paging.total}
                                showSizeChanger={false}
                                onChange={handleChangePaging}
                            />
                        </ul>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default HotelDetailRewview
