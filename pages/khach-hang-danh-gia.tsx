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
            setValidateTitle({ status: 'error', text: t(`notification:Vui l??ng nh???p th??ng tin`) })
            return
        }
        if (!dataReviewSubmit['advantage']) {
            advantage.current.focus()
            setValidateAdvantage({ status: 'error', text: t(`notification:Vui l??ng nh???p th??ng tin`) })
            return
        }
        if (!dataReviewSubmit['disadvantage']) {
            disadvantage.current.focus()
            setValidateDisadvantage({ status: 'error', text: t(`notification:Vui l??ng nh???p th??ng tin`) })
            return
        }
        if (!dataReviewSubmit['satisfied']) {
            csRating.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? d???ch v??? CSKH c???a VNTRIP`))
            return
        }
        if (!dataReviewSubmit['cs_ratings']) {
            csRating.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? cho nh??n vi??n CSKH`))
            return
        }
        if (!dataReviewSubmit['ratings']) {
            cleanliness.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? kh??ch s???n`))
            return
        }
        if (!dataReviewSubmit['ratings']['cleanliness']) {
            cleanliness.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? s??? s???ch s???`))
            return
        }
        if (!dataReviewSubmit['ratings']['comfort']) {
            comfort.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? s??? tho???i m??i`))
            return
        }
        if (!dataReviewSubmit['ratings']['location']) {
            location.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? v??? tr??`))
            return
        }
        if (!dataReviewSubmit['ratings']['facilities']) {
            facilities.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? trang thi???t b???`))
            return
        }
        if (!dataReviewSubmit['ratings']['staffs']) {
            staffs.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? nh??n vi??n kh??ch s???n`))
            return
        }
        if (!dataReviewSubmit['ratings']['price']) {
            price.current.focus()
            showMessage('error', t(`notification:Vui l??ng ????nh gi?? v??? gi?? c???`))
            return
        }
        if (!dataReviewSubmit['user_status']) {
            userStatus.current.focus()
            showMessage('error', t(`notification:Vui l??ng ch???n ch??? ????? ????nh gi??`))
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
        showMessage('success', t(`notification:G???i review th??nh c??ng`))
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
                                                {t(`Ng??y check in`)}:&nbsp;
                                                <strong>{moment(dataDetail.checkin_date).format('DD/MM/YYYY')}</strong>
                                            </p>
                                            <p className="mb0">
                                                {t(`Ng??y check out`)}:&nbsp;
                                                <strong>{moment(dataDetail.checkout_date).format('DD/MM/YYYY')}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__title">
                                            <span>{t(`????nh gi?? ch??? ngh???`)}</span>
                                        </div>
                                        <div className="profileReview__form">
                                            <Form layout="vertical">
                                                <Form.Item
                                                    className={`form-group`}
                                                    label={
                                                        <>
                                                            <strong>
                                                                {t('Ti??u ?????')}
                                                                <span className={'red-1'}>&nbsp;*</span>:
                                                            </strong>
                                                        </>
                                                    }
                                                    validateStatus={validateTitle.status}
                                                    help={validateTitle.text}
                                                >
                                                    <Input
                                                        ref={title}
                                                        placeholder={t(`Nh???p ti??u ?????...`)}
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
                                                                {t('??i???m c???ng')}
                                                                <span className={'red-1'}>&nbsp;*</span>:
                                                            </strong>
                                                        </>
                                                    }
                                                    validateStatus={validateAdvantage.status}
                                                    help={validateAdvantage.text}
                                                >
                                                    <Input.TextArea
                                                        ref={advantage}
                                                        placeholder={t(`Nh???ng ??i???m b???n h??i l??ng ??? ch??? ngh???`)}
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
                                                                {t('??i???m tr???')}
                                                                <span className={'red-1'}>&nbsp;*</span>:
                                                            </strong>
                                                        </>
                                                    }
                                                    validateStatus={validateDisadvantage.status}
                                                    help={validateDisadvantage.text}
                                                >
                                                    <Input.TextArea
                                                        ref={disadvantage}
                                                        placeholder={t(`Nh???ng ??i???m b???n ch??a h??i l??ng ??? ch??? ngh???`)}
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
                                            <span>{t(`????nh gi?? d???ch v??? Vntrip`)}</span>
                                        </div>
                                        <div className="profileReview__form">
                                            <ul className="disc pl30 pr15">
                                                <li>
                                                    <div className="form-group">
                                                        <p>
                                                            {t(
                                                                `Qu?? Kh??ch ????nh gi?? d???ch v??? ch??m s??c kh??ch h??ng c???a VNTRIP qua k??? ngh??? v???a r???i nh?? th??? n??o ?`
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
                                                                <label htmlFor="ftt2">{t(`H??i l??ng`)}</label>
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
                                                                <label htmlFor="ftt3">{t(`Kh??ng h??i l??ng`)}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-group">
                                                        <p>
                                                            {t(
                                                                `Vui l??ng ????nh gi?? s??? h??i l??ng c???a b???n v??? d???ch v??? c???a Vntrip`
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
                                                                `Trong qu?? tr??nh s??? d???ng d???ch v??? c???a VNTRIP, Qu?? Kh??ch c??n c?? ??i???u g?? ch??a h??i l??ng v?? mu???n g??p ?? ????? VNTRIP ho??n thi???n d???ch v??? trong th???i gian t???i ?`
                                                            )}
                                                        </p>
                                                        <textarea
                                                            placeholder={t(
                                                                `Nh???p g??p ?? c???a qu?? kh??ch v??? d???ch v??? Vntrip`
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
                                            <span>{t(`Ch???m ??i???m kh??ch s???n`)}</span>
                                        </div>
                                        <div className="profileReview__form">
                                            <ul className="disc pl30 pr15">
                                                <li>
                                                    <div className="form-group">
                                                        <p className="semibold">{t(`S???ch s???`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Kh??ng gian ph??ng kh??ch s???n b???n s??? d???ng c?? h??nh ???nh g??y kh?? ch???u, hay c?? m??i b???t th?????ng kh??ng?`
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
                                                        <p className="semibold mb0">{t(`Tho???i m??i`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Kh??ch s???n c?? ??em l???i s??? tho???i m??i ti???n l???i cho b???n nh?? ??? nh?? kh??ng?`
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
                                                        <p className="semibold mb0">{t(`?????a ??i???m`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Kh??ch s???n n??i b???n ??? c?? v??? tr?? ?????p kh??ng? C?? g???n khu v???c trung t??m, th???ng c???nh hay b??i bi???n kh??ng?`
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
                                                        <p className="semibold mb0">{t(`Ti???n nghi`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Kh??ch s???n c?? ????? c??? ti???n nghi nh?? m?? t??? v?? nh?? mong mu???n c???a b???n kh??ng? V?? d??? nh?? b??? b??i, ph??ng x??ng h??i`
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
                                                        <p className="semibold mb0">{t(`Nh??n vi??n`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(
                                                                `Th??i ????? c???a nh??n vi??n ph???c v??? (l??? t??n, d???n ph??ng,...) c?? ni???m n???, gi??p ????? t???n t??nh kh??ng?`
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
                                                        <p className="semibold mb0">{t(`Gi?? c???`)}</p>
                                                        <p className="gray-5 mb0 italic">
                                                            {t(`M???c gi?? c?? ph?? h???p v???i lo???i ph??ng v?? khu v???c kh??ng?`)}
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
                                                <span>{t(`Ch??? ????? g???i`)}</span>
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
                                                    <label htmlFor="ft1">{t(`C??ng khai`)}</label>
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
                                                    <label htmlFor="ft2">{t(`???n danh`)}</label>
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
                                                <span>{t(`G???i ????nh gi??`)}</span>
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
                                            <span>{t(`????nh gi?? c???a b???n`)}</span>
                                        </p>
                                    </div>
                                    <div className="profileReview__form">
                                        <p>
                                            {t(
                                                `C???m ??n Qu?? kh??ch ???? g???i ????nh gi?? cho ch??ng t??i. ????nh gi?? c???a Qu?? kh??ch ??ang ???????c ch??? duy???t b???i b??? ph???n Qu???n tr???.`
                                            )}
                                        </p>
                                        <p>{t(`Vui l??ng xem ????nh gi?? c???a Qu?? kh??ch b???ng c??ch`)}:</p>
                                        <ul className="disc">
                                            <li>
                                                {t(`????ng nh???p t??i kho???n ???? ?????t ????n h??ng ????? xem ????nh gi?? t???i ????y`)}:{' '}
                                                <a href="/tai-khoan/danh-gia">{t(`Qu???n l?? ????nh gi??`)}</a>
                                            </li>
                                            <li>
                                                {t(`Xem ????nh gi?? t???i trang chi ti???t kh??ch s???n`)}:{' '}
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
