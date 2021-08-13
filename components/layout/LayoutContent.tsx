import Head from 'next/head'

interface iProps {
    children: any
}

const LayoutContent: React.FC<iProps> = ({ children }) => {
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
            </Head>
            <main className="main">{children}</main>
        </div>
    )
}

export default LayoutContent
