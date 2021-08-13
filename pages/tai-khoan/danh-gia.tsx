import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { withAuth } from '../../utils/custom-hoc'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { countListMyReview, listMyReview } from '../../api/user-services'
import { showMessage } from '../../utils/common'
import RenderStarRate from '../../components/hotel-list/RenderStarRate'
import { convertReviewPointToText } from '../../utils/hotel'
import moment from 'moment'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
// @ts-ignore
import { Pagination, Image } from 'antd'
import { setLoading } from '../../store/common/action'
import { IconMarker } from '../../constants/icons'
import { useRouter } from 'next/router'
const Layout = dynamic(() => import('../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../components/user/ProfileNavbar'))
interface Props {
    review_status: string
    user_status: string
}
const MyReview: React.FC<Props> = ({ review_status, user_status }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['common', 'user', 'notification'])
    const [paramList, setParamList] = useState({ page: 1, page_size: 10, review_status, user_status })
    const [listReview, setListReview] = useState([])
    const [totalReview, setTotalReview] = useState(0)
    const [countListForStatus, setCountListForStatus] = useState({
        total: 0,
        public: 0,
        hidden: 0,
        pending: 0,
    })

    useEffect(() => {
        async function fetchListReview() {
            dispatch(setLoading(true))
            try {
                switch (router.query.type) {
                    case 'review_public':
                        paramList['review_status'] = 'review_public'
                        paramList['user_status'] = 'identified'
                        break
                    case 'review_hidden':
                        paramList['review_status'] = 'review_public'
                        paramList['user_status'] = 'anonymous'
                        break
                    case 'review_pending':
                        paramList['review_status'] = 'review_pending'
                        paramList['user_status'] = ''
                        break
                    case 'all':
                    case '':
                        paramList['review_status'] = ''
                        paramList['user_status'] = ''
                        break
                }
                paramList['page'] = Number(router.query.page) || 1
                let res = await listMyReview(paramList)
                if (res['status'] === 'error') {
                    showMessage('error', res['message'])
                    return
                }
                setListReview(res['data'])
                setTotalReview(res['paging']['total'])
            } catch (e) {
                console.log(e)
            }
            dispatch(setLoading(false))
        }
        fetchListReview()
    }, [paramList, router])

    useEffect(() => {
        try {
            async function fetchCountListReview() {
                let count = await countListMyReview({})
                if (count['status'] === 'error') {
                    showMessage('error', count['message'])
                    return
                }
                setCountListForStatus(count['data'])
            }
            fetchCountListReview()
        } catch (e) {
            console.log(e)
        }
    }, [])

    const convertDateReview = (data: any) => {
        let created_at = moment(data),
            current_date = moment()
        let asMinutes = Math.round(moment.duration(current_date.diff(created_at)).asMinutes())
        let asHours = Math.round(moment.duration(current_date.diff(created_at)).asHours())
        let asDays = Math.round(moment.duration(current_date.diff(created_at)).asDays())
        let asWeeks = Math.round(moment.duration(current_date.diff(created_at)).asWeeks())
        let asMonths = Math.round(moment.duration(current_date.diff(created_at)).asMonths())
        let asYears = Math.floor(moment.duration(current_date.diff(created_at)).asYears())
        if (asMinutes <= 60) {
            return t(`user:Đánh giá theo phút`, { time: asMinutes })
        } else if (asHours <= 24) {
            return t(`user:Đánh giá theo giờ`, { time: asHours })
        } else if (asDays <= 7) {
            return t(`user:Đánh giá theo ngày`, { time: asDays })
        } else if (asWeeks <= 4) {
            return t(`user:Đánh giá theo tuần`, { time: asWeeks })
        } else if (asMonths <= 12) {
            return t(`user:Đánh giá theo tháng`, { time: asMonths })
        } else {
            return t(`user:Đánh giá theo năm`, { time: asYears })
        }
    }

    const handleChangeStatus = (params: string) => {
        router.push({
            pathname: '/tai-khoan/danh-gia',
            query: { ...router.query, type: params },
        })
    }
    const handleChangePaging = (_page: number) => {
        router.push({
            pathname: '/tai-khoan/danh-gia',
            query: { ...router.query, page: _page },
        })
    }
    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileRate__main">
                        <div className="profileFilter">
                            <div className="profileFilter__item">
                                <p className="mb0 semibold size-16">{t(`Lọc theo`)}:</p>
                            </div>
                            <div className="profileFilter__item">
                                <div className="radio">
                                    <input
                                        id="ft1"
                                        type="radio"
                                        name="ft"
                                        checked={!router.query.type || router.query.type === 'all'}
                                        onChange={() => handleChangeStatus('all')}
                                    />
                                    <label htmlFor="ft1">
                                        {t(`user:Review Tất cả`, { count: countListForStatus?.total })}
                                    </label>
                                </div>
                            </div>
                            <div className="profileFilter__item">
                                <div className="radio">
                                    <input
                                        id="ft2"
                                        type="radio"
                                        name="ft"
                                        checked={router.query.type === 'review_public'}
                                        onChange={() => handleChangeStatus('review_public')}
                                    />
                                    <label htmlFor="ft2">
                                        {t(`user:Review Công khai`, { count: countListForStatus?.public })}
                                    </label>
                                </div>
                            </div>
                            <div className="profileFilter__item">
                                <div className="radio">
                                    <input
                                        id="ft3"
                                        type="radio"
                                        name="ft"
                                        checked={router.query.type === 'review_hidden'}
                                        onChange={() => handleChangeStatus('review_hidden')}
                                    />
                                    <label htmlFor="ft3">
                                        {t(`user:Review Ẩn danh`, { count: countListForStatus?.hidden })}
                                    </label>
                                </div>
                            </div>
                            <div className="profileFilter__item">
                                <div className="radio">
                                    <input
                                        id="ft4"
                                        type="radio"
                                        name="ft"
                                        checked={router.query.type === 'review_pending'}
                                        onChange={() => handleChangeStatus('review_pending')}
                                    />
                                    <label htmlFor="ft4">
                                        {t(`user:Review Chờ`, { count: countListForStatus?.pending })}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="listReview">
                            {listReview.map((review: any) => {
                                return (
                                    <div className="listReview__item" key={`${review.id}_${review.hotel_id}`}>
                                        <div className="listReview__top">
                                            <div className="listReview__info">
                                                <h3 className="hotelName">
                                                    <a>{review?.hotel?.name}</a>
                                                    <div className="rateStar rateStar_sm">
                                                        <RenderStarRate starRate={Number(review.hotel.star_rate)} />
                                                    </div>
                                                </h3>
                                                <div className="hotelAddress">
                                                    <div className="hotelAddress__icon">
                                                        <IconMarker />
                                                    </div>
                                                    <div className="hotelAddress__text">
                                                        <p className="mb0">{review.hotel.full_address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="listReview__bottom">
                                            <div className="listReview__icon">
                                                <div className="ratePoint">
                                                    <div className="ratePoint__numb">
                                                        <svg
                                                            width={32}
                                                            height={10}
                                                            viewBox="0 0 32 10"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M12.9044 10L16.224 8.2918L19.5436 10L18.9096 6.38197L21.5952 3.81966L17.8838 3.2918L16.224 0L14.5642 3.2918L10.8528 3.81966L13.5384 6.38197L12.9044 10ZM11.1806 7.45236C10.8445 7.93589 6.1599 5.25182 4.25782 3.96241C4.01059 3.79823 3.79641 3.59082 3.62604 3.3506C3.43729 3.0902 3.39202 2.7554 3.50506 2.45591C3.52894 2.39111 3.56052 2.32928 3.59915 2.2717V2.24539C3.64287 2.19105 3.69121 2.14043 3.74366 2.09408C3.99412 1.8828 4.3362 1.80867 4.65437 1.89672C4.94329 1.97089 5.21563 2.09693 5.45754 2.26841C7.34954 3.58414 11.5066 6.95897 11.1705 7.44249L11.1806 7.45236ZM11.1974 8.53756C11.0025 9.25134 4.34184 8.05403 1.5425 7.33367C1.18011 7.24621 0.837988 7.09218 0.534329 6.87975C0.201688 6.65647 0.00203054 6.28774 0 5.89296C0.0010422 5.80753 0.0123212 5.72253 0.0336056 5.63968V5.60021C0.0579015 5.51777 0.0917258 5.43831 0.134422 5.36338C0.337646 5.01738 0.702445 4.79207 1.10898 4.76143C1.47969 4.72822 1.85347 4.76279 2.21125 4.8634C5.00387 5.60679 11.3822 7.82378 11.1873 8.54743L11.1974 8.53756ZM27.7388 3.9624C25.8367 5.2518 21.1555 7.93588 20.8194 7.45235L20.8362 7.44248C20.5002 6.95896 24.6605 3.58413 26.5492 2.2684C26.7914 2.0975 27.0637 1.97152 27.3524 1.89671C27.6663 1.8104 28.0036 1.88184 28.253 2.08749C28.3017 2.13509 28.3445 2.18808 28.3807 2.24538L28.3975 2.27169C28.4385 2.3284 28.4713 2.39039 28.4949 2.45589C28.6082 2.75579 28.5616 3.0912 28.3706 3.35058C28.2002 3.59081 27.986 3.79821 27.7388 3.9624ZM20.8026 8.53793C20.9975 9.25171 27.6581 8.05441 30.4575 7.33405C30.8196 7.24592 31.1616 7.09193 31.4657 6.88012C31.7992 6.65762 31.9991 6.2884 32 5.89333C31.9983 5.80815 31.9882 5.72332 31.9697 5.64005V5.60058C31.9428 5.51858 31.9079 5.43928 31.8656 5.36375C31.6632 5.01693 31.2979 4.79131 30.891 4.76181C30.5192 4.72872 30.1443 4.76329 29.7854 4.86378C26.9927 5.60716 20.6144 7.82416 20.8093 8.5478L20.8026 8.53793Z"
                                                                fill="#FA8C16"
                                                            />
                                                        </svg>
                                                        <span>{review.rating_average}</span>
                                                    </div>
                                                    <div className="ratePoint__text">
                                                        <p className="p1">
                                                            {convertReviewPointToText(review.rating_average)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="textCont">
                                                    <p className="text-color">{convertDateReview(review.created_at)}</p>
                                                </div>
                                            </div>
                                            <div className="listReview__cont">
                                                <p style={{ textAlign: 'justify' }}>
                                                    <PlusOutlined style={{ color: 'green' }} />
                                                    &nbsp;{review.advantage}
                                                </p>

                                                <p style={{ textAlign: 'justify' }}>
                                                    <MinusOutlined style={{ color: 'red' }} />
                                                    &nbsp;{review.disadvantage}
                                                </p>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        margin: '15px 25px 0 25px',
                                                    }}
                                                >
                                                    {Array.isArray(review.images)
                                                        ? review.images.map((image: any) => {
                                                              return (
                                                                  <Image
                                                                      style={{ margin: '5px' }}
                                                                      width={100}
                                                                      src={`https://test-statics.vntrip.vn/data-v2/review_image/${image}`}
                                                                      placeholder={
                                                                          <Image
                                                                              src={`https://test-statics.vntrip.vn/data-v2/review_image/${image}`}
                                                                              width={100}
                                                                          />
                                                                      }
                                                                  />
                                                              )
                                                          })
                                                        : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {totalReview ? (
                            <ul className="pagination">
                                <Pagination
                                    current={paramList?.page || 1}
                                    pageSize={paramList?.page_size}
                                    total={totalReview}
                                    showSizeChanger={false}
                                    onChange={handleChangePaging}
                                />
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default withAuth()(MyReview)
