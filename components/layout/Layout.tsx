import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import PopupGoogleMap from '../common/PopupGoogleMap'

const Header = dynamic(() => import('./Header'))
const Footer = dynamic(() => import('./Footer'))
const HeaderMobile = dynamic(() => import('./HeaderMobile'))
const MenuMobile = dynamic(() => import('./MenuMobile'))

interface Props {
    children: any
    isMobile?: boolean
    title?: string
    description?: string
    keyword?: string
    canonical?: string
    isHome?: boolean
    schemaList?: any[]
}

const Layout: React.FC<Props> = ({
    children,
    title = 'Vntrip: Đặt phòng khách sạn, vé máy bay, combo du lịch giá rẻ',
    description = 'Hơn 12.000 khách sạn trong nước đang có giá cực tốt, ưu đãi vé máy bay và combo du lịch giá rẻ. Đặt trực tuyến hoặc gọi ngay hotline 0963266688',
    keyword = 'khách sạn, đặt phòng khách sạn, vé máy bay, đặt vé máy bay giá rẻ, combo du lịch, du lịch giá rẻ, đặt phòng theo giờ, quickstay, du lịch đồng giá',
    canonical = 'https://www.vntrip.vn',
    isHome,
    schemaList = [],
    isMobile,
}) => {
    let structureData = {
        '@context': 'https://schema.org',
        '@graph': schemaList,
    }
    return (
        <div className="pageBody">
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <meta name="dc.creator" content="Vntrip.vn" />
                <meta name="dc.title" content="Vntrip.vn" />
                <meta name="generator" />
                <meta name="fragment" content="!" />
                <meta property="og:title" content="Vntrip - Đặt phòng khách sạn online" />
                <meta property="og:type" content="website" />
                <meta property="al:web:should_fallback" content="false" />
                <meta property="fb:app_id" content={'1216538601705933'} />
                <meta property="og:type" content="website" />
                {/*<meta name="google-site-verification" content="6z67o90G5c8c-2QwhDo1Jry0Wd9Nv2IP-V_ZAW1kAfY" />*/}
                <meta name="google-site-verification" content="M2EMICJQvA3aaAyK0caH7t-6vd669677Pe80lDPsSMA" />
                {/*App Store */}
                <meta name="apple-itunes-app" content="app-id= 1046183734" />
                {/*Play Store */}
                <meta name="google-play-app" content="app-id=vn.vntrip.hotel" />
                {/*Facebook*/}
                <meta name="facebook-domain-verification" content="lzpd4svdyyzop3asxu7t8sc7rfqn73" />
                {/*Facebook*/}
                <link rel="icon" sizes="16x16" href="https://statics.vntrip.vn/images/vntrip_favicon.png" />
                <link rel="manifest" href="/manifest.json" />
                <link href="https://plus.google.com/u/0/109413829820414132407/about" rel="author" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
                <script src="https://accounts.google.com/gsi/client" async defer></script>

                {/*Start Google Analytics & GTM*/}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134441135-1"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date()); gtag('config', 'UA-134441135-1');
                    `,
                    }}
                    async
                    defer
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-P7TQ2Q');
                    `,
                    }}
                    async
                    defer
                />
                {/*End Google Analytics & GTM*/}

                {/*Start of Zendesk Chat Script*/}
                {!isMobile && (
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: `
                    window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
                    d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
                    _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
                    $.src="https://v2.zopim.com/?3xgDyuE77jEH8Nk9bHpgsBSVCOXfNMQd";z.t=+new Date;$.
                    type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
                    `,
                        }}
                        async
                        defer
                    />
                )}
                {/*End of Zendesk Chat Script*/}

                {/*Start OneSignal*/}
                {/*<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" />*/}
                {/*<script*/}
                {/*    dangerouslySetInnerHTML={{*/}
                {/*        __html: `*/}
                {/*    var OneSignal = window.OneSignal || [];*/}
                {/*    OneSignal.push(["init", {*/}
                {/*        appId: "d4eeb859-1489-4942-bad8-ec68a800a72c",*/}
                {/*        autoRegister: !1,*/}
                {/*        notifyButton: {enable: !0, prenotify: !0, position: "bottom-left", size: "medium", showCredit: !1, offset: {bottom: "60px"}},*/}
                {/*        persistNotification: !1,*/}
                {/*        safari_web_id: "web.onesignal.auto.597eddd1-7088-4460-8312-f4c61675b8f7"*/}
                {/*    }])*/}
                {/*    `,*/}
                {/*    }}*/}
                {/*/>*/}
                {/*End OneSignal*/}
            </Head>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                {canonical && <link rel="canonical" href={canonical} />}
                {schemaList?.length && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structureData) }}
                    />
                )}
            </Head>

            {/*{isMounted && (*/}
            {/*    <>*/}
            {/*        {isMobile ? (*/}
            {/*            <>*/}
            {/*                <HeaderMobile />*/}
            {/*                <MenuMobile />*/}
            {/*            </>*/}
            {/*        ) : (*/}
            {/*            <Header isHome={isHome} />*/}
            {/*        )}*/}
            {/*    </>*/}
            {/*)}*/}
            <HeaderMobile />
            <MenuMobile />
            <Header isHome={isHome} />

            <main className="main">{children}</main>

            <Footer />

            <PopupGoogleMap />
            <script async src="//vntripvn.api.useinsider.com/ins.js?id=10003114" />
        </div>
    )
}

export default Layout
