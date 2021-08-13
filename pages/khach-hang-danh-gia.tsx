import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { checkReviewWoLogin, submitReviewWoLogin } from '../api/user-services'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { showMessage } from '../utils/common'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/common/action'
import moment from 'moment'
import { Form, Input, Rate } from 'antd'
import { IconMarker } from '../constants/icons'
import { ValidationForm } from '../constants/interface'
import RenderStarRate from '../components/hotel-list/RenderStarRate'
import { PATH_HOME } from '../constants/common'

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

const WriteReview = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['user', 'notification', 'common'])
    const [stepReview, setStepReview] = useState<any>(1)
    const [dataDetail, setDataDetail] = useState<any>({})
    const [dataReviewSubmit, setDataReviewSubmit] = useState<any>({})
    // const [newFileList, setFileList] = useState<any>([])
    const [validateTitle, setValidateTitle] = useState<ValidationForm>({ status: 'success', text: '' })
    const [validateAdvantage, setValidateAdvantage] = useState<ValidationForm>({ status: 'success', text: '' })
    const [validateDisadvantage, setValidateDisadvantage] = useState<ValidationForm>({ status: 'success', text: '' })
    const cleanliness = useRef<any>()
    const csRating = useRef<any>()
    const comfort = useRef<any>()
    const facilities = useRef<any>()
    const price = useRef<any>()
    const location = useRef<any>()
    const staffs = useRef<any>()
    const satisfied = useRef<any>()
    const disadvantage = useRef<any>()
    const title = useRef<any>()
    const advantage = useRef<any>()
    const userStatus = useRef<any>()
    useEffect(() => {
        async function checkTokenReview(p: { token: string | string[] | undefined }) {
            dispatch(setLoading(true))
            let res = await checkReviewWoLogin({ token: p.token })
            if (res['status'] === 'error') {
                showMessage('error', res['message'])
                dispatch(setLoading(false))
                await router.push(PATH_HOME)
                return
            }
            setDataDetail(res['data'])
            dispatch(setLoading(false))
        }

        checkTokenReview({ token: router['query']['token'] })
    }, [router.query])

    const clearValidate = () => {
        setValidateTitle({ status: 'success', text: '' })
        setValidateAdvantage({ status: 'success', text: '' })
        setValidateDisadvantage({ status: 'success', text: '' })
    }
    const changeParamReview = (data: any, field: string) => {
        if (field === 'satisfied') {
            dataReviewSubmit[field] = data === 'true'
        } else if (['cleanliness', 'comfort', 'facilities', 'staffs', 'price', 'location'].includes(field)) {
            if (!dataReviewSubmit['ratings']) {
                dataReviewSubmit['ratings'] = {}
                dataReviewSubmit['ratings'][field] = data
            } else {
                dataReviewSubmit['ratings'][field] = data
            }
        } else {
            clearValidate()
            dataReviewSubmit[field] = data
        }
        setDataReviewSubmit(dataReviewSubmit)
    }

    const handleSendReview = async () => {
        if (!dataReviewSubmit['title']) {
            title.current.focus()
            setValidateTitle({ status: 'error', text: t(`notification:Vui lòng nhập thông tin`) })
            return
        }
        if (!dataReviewSubmit['advantage']) {
            advantage.current.focus()
            setValidateAdvantage({ status: 'error', text: t(`notification:Vui lòng nhập thông tin`) })
            return
        }
        if (!dataReviewSubmit['disadvantage']) {
            disadvantage.current.focus()
            setValidateDisadvantage({ status: 'error', text: t(`notification:Vui lòng nhập thông tin`) })
            return
        }
        if (!dataReviewSubmit['satisfied']) {
            csRating.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá dịch vụ CSKH của VNTRIP`))
            return
        }
        if (!dataReviewSubmit['cs_ratings']) {
            csRating.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá cho nhân viên CSKH`))
            return
        }
        if (!dataReviewSubmit['ratings']) {
            cleanliness.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về khách sạn`))
            return
        }
        if (!dataReviewSubmit['ratings']['cleanliness']) {
            cleanliness.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về sự sạch sẽ`))
            return
        }
        if (!dataReviewSubmit['ratings']['comfort']) {
            comfort.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về sự thoải mái`))
            return
        }
        if (!dataReviewSubmit['ratings']['location']) {
            location.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về vị trí`))
            return
        }
        if (!dataReviewSubmit['ratings']['facilities']) {
            facilities.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về trang thiết bị`))
            return
        }
        if (!dataReviewSubmit['ratings']['staffs']) {
            staffs.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về nhân viên khách sạn`))
            return
        }
        if (!dataReviewSubmit['ratings']['price']) {
            price.current.focus()
            showMessage('error', t(`notification:Vui lòng đánh giá về giá cả`))
            return
        }
        if (!dataReviewSubmit['user_status']) {
            userStatus.current.focus()
            showMessage('error', t(`notification:Vui lòng chọn chế độ đánh giá`))
            return
        }
        dataReviewSubmit['image_ids'] = []
        dataReviewSubmit['token'] = router.query.token
        dispatch(setLoading(true))
        let res = await submitReviewWoLogin(router.query.token, dataReviewSubmit)
        if (res['status'] === 'error') {
            showMessage('error', res['message'])
            dispatch(setLoading(false))
            return
        }
        showMessage('success', t(`notification:Gửi review thành công`))
        setStepReview(2)
        dispatch(setLoading(false))
    }

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    {/*<ProfileNavbar />*/}
                    <div className="profileReview__main">
                        {stepReview === 1 ? (
                            <>
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <div className="hotelName">
                                                {dataDetail?.hotel_detail?.hotel_name}
                                                <div className="rateStar rateStar_sm">
                                                    <RenderStarRate
                                                        starRate={Number(dataDetail?.hotel_detail?.hotel_star_rate)}
                                                    />
                                                </div>
                                                <div className="hotelAddress">
                                                    <div className="hotelAddress__icon">
                                                        <IconMarker />
                                                    </div>
                                                    <div className="hotelAddress__text">
                                                        <p className="mb0">{dataDetail?.hotel_detail?.hotel_address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block">
                                            <p className="mb0">
                                                {t(`Ngày check in`)}:&nbsp;
                                                <strong>{moment(dataDetail.checkin_date).format('DD/MM/YYYY')}</strong>
                                            </p>
                                            <p className="mb0">
                                                {t(`Ngày check out`)}:&nbsp;
                                                <strong>{moment(dataDetail.checkout_date).format('DD/MM/YYYY')}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <span>{t(`Đánh giá chỗ nghỉ`)}</span>
                                        </div>
                                        <div className="profileReview__form">
                                            <Form layout="vertical">
                                                <Form.Item
                                                    className={`form-group`}
                                                    label={
                                                        <>
                                                            <strong>
                                                                {t('Tiêu đề')}
                                                                <span className={'red-1'}>&nbsp;*</span>:
                                                            </strong>
                                                        </>
                                                    }
                                                    validateStatus={validateTitle.status}
                                                    help={validateTitle.text}
                                                >
                                                    <Input
                                                        ref={title}
                                                        placeholder={t(`Nhập tiêu đề...`)}
                                                        className="form-control"
                                                        value={dataReviewSubmit?.title}
                                                        onChange={(event) =>
                                                            changeParamReview(event.target.value, 'title')
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={`form-group`}
                                                    label={
                                                        <>
                                                            <strong>
                                                                {t('Điểm cộng')}
                                                                <span className={'red-1'}>&nbsp;*</span>:
                                                            </strong>
                                                        </>
                                                    }
                                                    validateStatus={validateAdvantage.status}
                                                    help={validateAdvantage.text}
                                                >
                                                    <Input.TextArea
                                                        ref={advantage}
                                                        placeholder={t(`Những điểm bạn hài lòng ở chỗ nghỉ`)}
                                                        className="form-control"
                                                        value={dataReviewSubmit?.advantage}
                                                        onChange={(event) =>
                                                            changeParamReview(event.target.value, 'advantage')
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    className={`form-group`}
                                                    label={
                                                        <>
                                                            <strong>
                                                                {t('Điểm trừ')}
                                                                <span className={'red-1'}>&nbsp;*</span>:
                                                            </strong>
                                                        </>
                                                    }
                                                    validateStatus={validateDisadvantage.status}
                                                    help={validateDisadvantage.text}
                                                >
                                                    <Input.TextArea
                                                        ref={disadvantage}
                                                        placeholder={t(`Những điểm bạn chưa hài lòng ở chỗ nghỉ`)}
                                                        className="form-control"
                                                        value={dataReviewSubmit?.disadvantage}
                                                        onChange={(event) =>
                                                            changeParamReview(event.target.value, 'disadvantage')
                                                        }
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <span>{t(`Đánh giá dịch vụ Vntrip`)}</span>
                                        </div>
                                        <div className="profileReview__form">
                                            <ul className="disc pl30 pr15">
                                                <li>
                                                    <div className="form-group">
                                                        <p>
                                                            {t(
                                                                `Quý Khách đánh giá dịch vụ chăm sóc khách hàng của VNTRIP qua kỳ nghỉ vừa rồi như thế nào ?`
                                                            )}
                                                        </p>
                                                        <div className="d-flex" ref={satisfied}>
                                                            <div className="radio">
                                                                <input
                                                                    id="ftt2"
                                                                    type="radio"
                                                                    name="satisfied"
                                                                    value={'true'}
                                                                    onChange={(event) =>
                                                                        changeParamReview(
                                                                            event.target.value,
                                                                            'satisfied'
                                                                        )
                                                                    }
                                                                />
                                                                <label htmlFor="ftt2">{t(`Hài lòng`)}</label>
                                                            </div>
                                                            <div className="radio ml15">
                                                                <input
                                                                    id="ftt3"
                                                                    type="radio"
                                                                    name="satisfied"
                                                                    value={'false'}
                                                                    onChange={(event) =>
                                                                        changeParamReview(
                                                                            event.target.value,
                                                                            'satisfied'
                                                                        )
                                                                    }
                                                                />
                                                                <label htmlFor="ftt3">{t(`Không hài lòng`)}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p>
                                                            {t(
                                                                `Vui lòng đánh giá sự hài lòng của bạn về dịch vụ của Vntrip`
                                                            )}
                                                        </p>
                                                        <div className="profileReview__slider w50">
                                                            <Rate
                                                                ref={csRating}
                                                                tooltips={desc}
                                                                allowHalf
                                                                count={5}
                                                                style={{ fontSize: 24 }}
                                                                onChange={(event) =>
                                                                    changeParamReview(event * 2, 'cs_ratings')
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p>
                                                            {t(
                                                                `Trong quá trình sử dụng dịch vụ của VNTRIP, Quý Khách còn có điều gì chưa hài lòng và muốn góp ý để VNTRIP hoàn thiện dịch vụ trong thời gian tới ?`
                                                            )}
                                                        </p>
                                                        <textarea
                                                            placeholder={t(
                                                                `Nhập góp ý của quý khách về dịch vụ Vntrip`
                                                            )}
                                                            className="form-control"
                                                            defaultValue={dataReviewSubmit?.feedback}
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <span>{t(`Chấm điểm khách sạn`)}</span>
                                        </div>
                                        <div className="profileReview__form">
                                            <ul className="disc pl30 pr15">
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold">{t(`Sạch sẽ`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Không gian phòng khách sạn bạn sử dụng có hình ảnh gây khó chịu, hay có mùi bất thường không?`
                                                            )}
                                                        </p>

                                                        <Rate
                                                            ref={cleanliness}
                                                            tooltips={desc}
                                                            allowHalf
                                                            count={5}
                                                            style={{ fontSize: 24 }}
                                                            onChange={(event) =>
                                                                changeParamReview(event * 2, 'cleanliness')
                                                            }
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold mb0">{t(`Thoải mái`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Khách sạn có đem lại sự thoải mái tiện lợi cho bạn như ở nhà không?`
                                                            )}
                                                        </p>

                                                        <Rate
                                                            ref={comfort}
                                                            tooltips={desc}
                                                            allowHalf
                                                            count={5}
                                                            style={{ fontSize: 24 }}
                                                            onChange={(event) =>
                                                                changeParamReview(event * 2, 'comfort')
                                                            }
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold mb0">{t(`Địa điểm`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Khách sạn nơi bạn ở có vị trí đẹp không? Có gần khu vực trung tâm, thắng cảnh hay bãi biển không?`
                                                            )}
                                                        </p>

                                                        <Rate
                                                            ref={location}
                                                            tooltips={desc}
                                                            allowHalf
                                                            count={5}
                                                            style={{ fontSize: 24 }}
                                                            onChange={(event) =>
                                                                changeParamReview(event * 2, 'location')
                                                            }
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold mb0">{t(`Tiện nghi`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Khách sạn có đủ cả tiện nghi như mô tả và như mong muốn của bạn không? Ví dụ như bể bơi, phòng xông hơi`
                                                            )}
                                                        </p>

                                                        <Rate
                                                            ref={facilities}
                                                            tooltips={desc}
                                                            allowHalf
                                                            count={5}
                                                            style={{ fontSize: 24 }}
                                                            onChange={(event) =>
                                                                changeParamReview(event * 2, 'facilities')
                                                            }
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold mb0">{t(`Nhân viên`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Thái độ của nhân viên phục vụ (lễ tân, dọn phòng,...) có niềm nở, giúp đỡ tận tình không?`
                                                            )}
                                                        </p>

                                                        <Rate
                                                            ref={staffs}
                                                            tooltips={desc}
                                                            allowHalf
                                                            count={5}
                                                            style={{ fontSize: 24 }}
                                                            onChange={(event) => changeParamReview(event * 2, 'staffs')}
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold mb0">{t(`Giá cả`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(`Mức giá có phù hợp với loại phòng và khu vực không?`)}
                                                        </p>

                                                        <Rate
                                                            ref={price}
                                                            tooltips={desc}
                                                            allowHalf
                                                            count={5}
                                                            style={{ fontSize: 24 }}
                                                            onChange={(event) => changeParamReview(event * 2, 'price')}
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <p className="semibold">
                                                <span>{t(`Chế độ gửi`)}</span>
                                            </p>
                                        </div>
                                        <div className="profileReview__radio">
                                            <div className="form-group d-flex" ref={userStatus}>
                                                <div className="radio">
                                                    <input
                                                        id="ft1"
                                                        type="radio"
                                                        name="ft"
                                                        value={'identified'}
                                                        onChange={(event) =>
                                                            changeParamReview(event.target.value, 'user_status')
                                                        }
                                                    />
                                                    <label htmlFor="ft1">{t(`Công khai`)}</label>
                                                </div>
                                                <div className="radio ml15">
                                                    <input
                                                        id="ft2"
                                                        type="radio"
                                                        name="ft"
                                                        value={'anonymous'}
                                                        onChange={(event) =>
                                                            changeParamReview(event.target.value, 'user_status')
                                                        }
                                                    />
                                                    <label htmlFor="ft2">{t(`Ẩn danh`)}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profileReview__btn">
                                            <button
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#sendReviewPopup"
                                                className="btn btn_orange btn_sm"
                                                onClick={handleSendReview}
                                            >
                                                <span>{t(`Gửi đánh giá`)}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="profileBox">
                                <div className="profileBox__cont">
                                    <div className="profileBox__title">
                                        <p className="semibold">
                                            <span>{t(`Đánh giá của bạn`)}</span>
                                        </p>
                                    </div>
                                    <div className="profileReview__form">
                                        <p>
                                            {t(
                                                `Cảm ơn Quý khách đã gửi đánh giá cho chúng tôi. Đánh giá của Quý khách đang được chờ duyệt bởi bộ phận Quản trị.`
                                            )}
                                        </p>
                                        <p>{t(`Vui lòng xem đánh giá của Quý khách bằng cách`)}:</p>
                                        <ul className="disc">
                                            <li>
                                                {t(`Đăng nhập tài khoản đã đặt đơn hàng để xem đánh giá tại đây`)}:{' '}
                                                <a href="/tai-khoan/danh-gia">{t(`Quản lý đánh giá`)}</a>
                                            </li>
                                            <li>
                                                {t(`Xem đánh giá tại trang chi tiết khách sạn`)}:{' '}
                                                <a>{dataDetail?.hotel_detail?.hotel_name}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default WriteReview
