import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import { appWithTranslation } from '../i18n'
import 'antd/dist/antd.css'
import 'react-image-gallery/styles/css/image-gallery.css'
import 'nprogress/nprogress.css'
import '../styles/global.css'
import '../styles/common.css'
import { Spin } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/vi' // without this line, moment.locale('vi') didn't work
import 'moment/locale/en-gb'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useMounted } from '../utils/custom-hook'
import { setIsShowFinalPriceHotel } from '../store/hotel/action'
import { getShowFinalPriceHotelFromLS } from '../utils/hotel'
import { getExchangeRatesAndStore } from '../api/common-services'
import { getCookie, getCurrency, setCookie } from '../utils/common'
import { setCurrency } from '../store/common/action'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { ProvideAuth } from '../components/contexts/authContext'

declare global {
    interface Window {
        fbAsyncInit: () => void
        FB: any
    }
}

const TopProgressBar = dynamic(
    () => {
        return import('../components/common/TopProgressBar')
    },
    { ssr: false }
)

// change text
moment.updateLocale('vi', {
    weekdays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
})

Spin.setDefaultIndicator(<Loading3QuartersOutlined style={{ fontSize: 40 }} spin />)

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { i18n } = useTranslation()
    const dispatch = useDispatch()
    const isMounted = useMounted()
    const router = useRouter()
    const isLoading = useSelector((state: any) => state.common.isLoading || false)

    // handle data from localStorage
    // lấy dữ liệu từ localStorage, đảm bảo mỗi page đều có data trong redux store
    useEffect(() => {
        if (isMounted) {
            // save show final price from localStorage to redux store
            // dispatch(setIsShowFinalPriceHotel(getShowFinalPriceHotelFromLS()))
            // setDefault = true
            dispatch(setIsShowFinalPriceHotel(true))
        }
    }, [isMounted, router.pathname])

    useEffect(() => {
        // ---get rate USD---
        getExchangeRatesAndStore()
        // ---set currency---
        dispatch(setCurrency(getCurrency() || 'VND'))
    }, [])

    // change locale golbal
    useEffect(() => {
        moment.locale(i18n.language === 'vi' ? 'vi' : 'en-gb')
    }, [i18n.language])

    useEffect(() => {
        window.scrollTo(0, 0) // set scroll

        // save utm_source into cookie
        const { query } = router
        if (query.utm_source) {
            const utm_source = String(query.utm_source).toLowerCase()
            let traffic_id = query.traffic_id,
                session_id = query.session_id,
                publisher_id = query.publisher_id,
                utm_campaign = query.utm_campaign || '',
                utm_content = query.utm_content || '',
                utm_agent = query.utm_agent || '',
                utm_team = query.utm_team || '',
                utm_medium = query.utm_medium || '',
                click_id = query.click_id,
                cookie_expires = 30
            let publisher: any = {
                utm_agent,
                utm_team,
                utm_source,
                utm_campaign,
                utm_content,
                utm_medium,
                publisherid: publisher_id,
                click_id,
                click_time: moment().format('DD/MM/YYYY h:mm:ss'),
            }
            if (utm_source === 'masoffer') {
                publisher.publisherid = traffic_id || publisher.publisherid
            } else if (utm_source === 'accesstrade') {
                publisher.publisherid = session_id || publisher.publisherid
                cookie_expires = 45
            } else if (utm_source === 'trivago') {
                publisher.publisherid = 1760
            } else if (utm_source === 'hotelads') {
                // Session.set('publisher_hotelads', JSON.stringify({
                //     utm_source,
                //     hotel_id,
                //     utm_content,
                //     click_time: publisher.click_time
                // }));
            } else if (utm_source === 'cityads') {
                if (query.utm_campaign && query.click_id && query.utm_medium) {
                    publisher.utm_medium = publisher.utm_medium || 'cpa'
                    publisher.publisherid = 29152
                }
            }
            console.log('>>>>> save publisher', publisher)
            setCookie('publisher', JSON.stringify(publisher), cookie_expires)
        }
        //
    }, [router.pathname, router.query])

    // init facebook SDK
    useEffect(() => {
        if (isMounted) {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                    cookie: true,
                    xfbml: true,
                    version: 'v3.0',
                })
                window.FB.AppEvents.logPageView()
                window.FB.Event.subscribe('xfbml.render', function () {
                    // $(".social-button").show();
                })
            }
            ;(function (d, s, id) {
                let js: any,
                    fjs: any = d.getElementsByTagName(s)[0]
                if (d.getElementById(id)) {
                    return
                }
                js = d.createElement(s)
                js.id = id
                js.src = 'https://connect.facebook.net/en_US/sdk.js'
                fjs.parentNode.insertBefore(js, fjs)
            })(document, 'script', 'facebook-jssdk')
        }
    }, [isMounted, router.pathname])

    return (
        <>
            <Head>
                <title>Vntrip: Đặt phòng khách sạn, vé máy bay, combo du lịch giá rẻ</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <script
                    type="text/javascript"
                    src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
                ></script>
            </Head>
            <TopProgressBar />
            <Spin spinning={isLoading}>
                <ProvideAuth>
                    <Component {...pageProps} />
                </ProvideAuth>
            </Spin>
        </>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
