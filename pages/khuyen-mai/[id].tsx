import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import moment from 'moment'
import { PATH_DEAL_LIST, PATH_HOTEL_DETAIL } from '../../constants/common'
import { getDealById } from '../../api/common-services'
import { convertUnicode, isMobileByUserAgent } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import { IconClockDeal, IconUserDeal } from '../../constants/icons'
import { sum } from '../../utils/common'
import { useDispatch } from 'react-redux'
import { togglePopupByDeal, setStepByDeal } from '../../store/common/action'
import DisplayPrice from '../../components/common/DisplayPrice'
import { useRouter } from 'next/router'
import FacebookLikeShare from '../../components/facebook/FacebookLikeShare'
import FacebookComment from '../../components/facebook/FacebookComment'
import { getHotelDetailLink } from '../../utils/hotel'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const DealGallery = dynamic(() => import('../../components/deal/DealGallery'))
const BuyDeal = dynamic(() => import('../../components/deal/BuyDeal'))

interface Props {
    data: any
    isMobile: boolean
    url: string
}

const LIST_CONTENT = [
    {
        key: 'buy_now',
        label: 'Mua ngay',
    },
    {
        key: 'information',
        label: 'Thông tin chi tiết',
    },
    {
        key: 'condition',
        label: 'Điều kiện sử dụng',
    },
    {
        key: 'location',
        label: 'Địa điểm sử dụng',
    },
    {
        key: 'comment',
        label: 'Bình luận',
    },
]

const DealDetail: React.FC<Props> = ({ data, url }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t, i18n } = useTranslation(['common', 'deal'])
    const [addActive, setAddActive] = useState<any>(null)
    const [keyActive, setKeyActive] = useState<string>('buy_now')
    const [buyIndex, setBuyIndex] = useState<number>(-1)

    useEffect(() => {
        if (data) {
            const { address } = data
            if (Array.isArray(address) && address.length > 0) {
                setAddActive(address[0])
            }
        }
    }, [data])

    useEffect(() => {
        window?.FB?.XFBML?.parse()
    }, [router])

    /* HANDLE CLICK OUTSIDE SUGGESTION BOX */
    useEffect(() => {
        // add when mounted
        document.addEventListener('scroll', handlePageScroll)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('scroll', handlePageScroll)
        }
    }, [])

    const handlePageScroll = (event: Event) => {
        // console.log('---- window.offsetTop-----', window.pageYOffset)
        // const listOffsetTop: number[] = LIST_CONTENT.map((item) => document.getElementById(`section_${item.key}`)?.offsetTop || 0)
        // console.log('---listOffsetTop---', listOffsetTop)
        // let flag = 0;
        // for (let i = 0; i < listOffsetTop.length; i++) {
        //     if (window.pageYOffset > listOffsetTop[i] && window.pageYOffset < listOffsetTop[i === listOffsetTop.length ? i : i+1]) {
        //         flag = i;
        //         break;
        //     }
        // }
        // console.log('--flag--', flag)
    }

    const handleClickContent = (key: string) => {
        setKeyActive(key)
        const element = document.getElementById(`section_${key}`)
        element?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        // console.log('----window.innerHeight-----', element?.offsetTop)
    }

    const handleClickScrollToMap = () => {
        const sectionMap = document.getElementById('section_location')
        sectionMap?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    const handleClickAddress = (address: any) => {
        setAddActive(address)
    }

    const handleClickByDeal = (index: number) => {
        setBuyIndex(index)
        dispatch(setStepByDeal(1)) // reset step to 1 every open new popup
        dispatch(togglePopupByDeal(true)) // open popup
    }

    return (
        <Layout
            title={`${data.name} | Vntrip.vn`}
            description={`Khuyến mãi từ Vntrip: ${data.name} - đặt trực tuyến hoặc gọi ngay 0963266688.`}
            keyword={data.name}
            canonical={`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khuyen-mai/${convertUnicode(data.name)}-${data.id}`}
        >
            <section className="dealDetail">
                <div className="container">
                    <div className="dealDetail__title">
                        <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <ul className="breadcrumb">
                                <li>
                                    <Link href={'/'}>
                                        <a>
                                            <span>{t('Trang chủ')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={PATH_DEAL_LIST}>
                                        <a>
                                            <span>Deal</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="active">{data.name}</li>
                            </ul>
                            <FacebookLikeShare />
                        </div>
                        <h1 className="size-24">{data.name}</h1>
                        <p className="provider mb10">
                            {t('deal:Cung cấp bởi')}:
                            {data.deal_type === 'deal' &&
                                Array.isArray(data.hotels) &&
                                data.hotels.map((item: any) => {
                                    return (
                                        <Link
                                            key={item.hotel_id}
                                            href={getHotelDetailLink({
                                                hotelId: item.hotel_id,
                                                hotelName: item.name_vi,
                                                countryCode: 'vn',
                                            })}
                                        >
                                            <a>{i18n.language === 'vi' ? item.name_vi : item.name}</a>
                                        </Link>
                                    )
                                })}
                        </p>
                    </div>

                    <div className="dealDetail__gallery">
                        <div className="row">
                            <div className="col-sm-8 col-lg-9 col-xs-12">
                                <DealGallery images={data.image_deal} name={data.name} />
                            </div>
                            <div className="col-sm-4 col-lg-3 col-xs-12">
                                <div className="galleryInfo">
                                    <div className="galleryInfo__price">
                                        <span>{t('deal:Giá chỉ từ')}:</span>
                                        <span className="size-24 yellow-1 semibold">
                                            <DisplayPrice price={data.price_deal?.[0]?.['sell_price']} />
                                        </span>
                                    </div>
                                    <div className="galleryInfo__btn">
                                        <button className="btn btn_orange" onClick={() => handleClickByDeal(-1)}>
                                            {t('deal:Mua ngay')}
                                        </button>
                                    </div>
                                    <div className="galleryInfo__time d-flex">
                                        <div className="galleryInfo__icon">
                                            <IconClockDeal />
                                        </div>
                                        <div className="galleryInfo__text">
                                            <div className="title">{t('deal:Thời gian còn lại')}</div>
                                            <div className="content">
                                                {t(`deal:Còn ngày`, {
                                                    day: moment(data.applied_to_date).diff(moment(), 'day'),
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="galleryInfo__person d-flex">
                                        <div className="galleryInfo__icon">
                                            <IconUserDeal />
                                        </div>
                                        <div className="galleryInfo__text">
                                            <div className="title">{t('deal:Số người mua')}</div>
                                            <div className="content">{sum(data.sold_count)(data.custom_count)}</div>
                                        </div>
                                    </div>
                                    {/*<div*/}
                                    {/*    className="galleryInfo__map"*/}
                                    {/*    onClick={() => {*/}
                                    {/*        handleClickScrollToMap()*/}
                                    {/*    }}*/}
                                    {/*    onKeyUp={() => {*/}
                                    {/*        handleClickScrollToMap()*/}
                                    {/*    }}*/}
                                    {/*    role={'button'}*/}
                                    {/*    tabIndex={0}*/}
                                    {/*>*/}
                                    {/*    <img src="https://statics.vntrip.vn/images/maps/showmap.jpg" alt={'showmap'} />*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dealDetail__cont">
                        <div className="dealDetail__tab">
                            <div className="filterNav">
                                <ul className="d-flex">
                                    {LIST_CONTENT.map((item) => (
                                        <li key={item.key} className={item.key === keyActive ? 'active' : ''}>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                            <a onClick={() => handleClickContent(item.key)}>
                                                {t('deal:' + item.label)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="dealDetail__group">
                            <div className="dealDetail__buy page-section" id={'section_buy_now'}>
                                {Array.isArray(data.price_deal) &&
                                    data.price_deal.map((item: any, index: number) => {
                                        return (
                                            <div className="buyItem flexGroup" key={item.id}>
                                                <div className="buyItem__info">
                                                    <p className="p1">{item.price_name}</p>
                                                    <p className="p2">{item.info}</p>
                                                </div>
                                                <div className="buyItem__price">
                                                    <p className="size-16 yellow-1 semibold pr10">
                                                        <DisplayPrice price={item.sell_price} />
                                                    </p>
                                                    <button
                                                        className="btn btn_orange"
                                                        onClick={() => handleClickByDeal(index)}
                                                    >
                                                        {t('deal:Mua ngay')}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className="dealDetail__info page-section" id={'section_information'}>
                                <h5>{t('deal:Thông tin chi tiết')}</h5>
                                {data?.details && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.details
                                                .replace(/<table/g, '<div class="tableResponsive"><table')
                                                .replace(/<\/table>/g, '</table></div>'),
                                        }}
                                    />
                                )}
                            </div>
                            <div className="dealDetail__condition page-section" id={'section_condition'}>
                                <h5>{t('deal:Điều kiện sử dụng')}</h5>
                                <div dangerouslySetInnerHTML={{ __html: data.used_condition }}></div>
                            </div>
                            <div className="dealDetail__map page-section" id={'section_location'}>
                                <div className="mapTitle w100">
                                    <h5>{t('deal:Địa điểm sử dụng')}</h5>
                                </div>
                                <div className="mapInfo">
                                    {Array.isArray(data.address) &&
                                        data.address.map((add: any) => {
                                            return (
                                                <div
                                                    className={`mapInfo__item ${
                                                        addActive?.id === add.id ? 'active' : ''
                                                    }`}
                                                    key={add.id}
                                                    onClick={() => handleClickAddress(add)}
                                                    onKeyUp={() => handleClickAddress(add)}
                                                    role={'button'}
                                                    tabIndex={0}
                                                >
                                                    <div className="itemAddress">
                                                        <p className="p1">{add.address}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                                <div className="mapIframe">
                                    <iframe
                                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}&q=${addActive?.geo?.x},${addActive?.geo?.y}`}
                                        width={'100%'}
                                        height={'100%'}
                                        frameBorder={0}
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        title={'Popup google map'}
                                    />
                                </div>
                            </div>
                            <div className="dealDetail__comment page-section" id={'section_comment'}>
                                <h5>{t('deal:Bình luận')}</h5>
                                <FacebookComment url={url} />
                            </div>
                        </div>
                    </div>

                    <BuyDeal dealId={data.id} listPrice={data.price_deal} buyIndex={buyIndex} />
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = async ({ params, req }: any) => {
    const { headers } = req
    const UA = req.headers['user-agent']
    const split = params.id.split('-')
    const dealId = split[split.length - 1]
    const res = await getDealById(dealId)

    return {
        props: {
            isMobile: isMobileByUserAgent(UA),
            data: res.data,
            url: headers.referer || '',
        },
    }
}

export default DealDetail
