import React from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { IconHotel, IconFlight } from '../../constants/icons'
import Link from 'next/link'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const HomeBanner = dynamic(() => import('../../components/banner/HomeBanner'))
const SearchBoxHotel = dynamic(() => import('../../components/search-box-hotel/SearchBoxHotel'))
const HomeServices = dynamic(() => import('../../components/common/HomeServices'))
const PopularPlacesDomestic = dynamic(() => import('../../components/common/PopularPlacesDomestic'))
const PopularPlacesInter = dynamic(() => import('../../components/common/PopularPlacesInter'))
const VntripAward = dynamic(() => import('../../components/common/VntripAward'))
const TheMediaTalk = dynamic(() => import('../../components/common/TheMediaTalk'))

interface Props {
    t: any
    isMobile?: boolean
}

const HomeHotel: React.FC<Props> = React.memo(() => {
    const { t } = useTranslation(['common', 'hotel', 'flight'])
    return (
        <Layout isHome={true} canonical={process.env.NEXT_PUBLIC_ROOT_DOMAIN}>
            <section className="homeWrapper">
                <HomeBanner className={'hotel'} />
                <div className="vntSearch">
                    <div className="container">
                        <div className="vntSearch__body">
                            <ul className="vntSearch__tab">
                                <li className={'active'}>
                                    <Link href={'/khach-san'}>
                                        <a>
                                            <IconHotel />
                                            <span>{t('hotel:Khách sạn')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/ve-may-bay'}>
                                        <a>
                                            <IconFlight />
                                            <span>{t('flight:Máy bay')}</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                            <div className="vntSearch__main">
                                <SearchBoxHotel isShow={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <HomeServices /> */}

                {/* <div className="homeDownApp">
                    <div className="container">
                        <div className="homeDownApp__cont">
                            <div className="homeDownApp__img">
                                <img src="https://statics.vntrip.vn/logo/image_download_app.png" alt="Vntrip app" />
                            </div>
                            <div className="homeDownApp__text">
                                <p>
                                    <span className="semibold size-16">
                                        {t('Theo dõi chuyến bay 24/7 cùng Vntrip App')}
                                    </span>
                                    <span className="homeDownApp__new">{t('Mới')}</span>
                                </p>
                                <p className="mb0">
                                    {t(
                                        'Theo dõi chuyến bay của các thành viên trong gia đình, những người thân yêu như thể bạn đang đi du lịch cùng với họ, hoặc tìm được thời điểm tốt nhất để đón họ tại sân bay'
                                    )}
                                </p>
                            </div>
                            <div className="homeDownApp__qrcode">
                                <img src="https://statics.vntrip.vn/logo/logo_QR_app.png" alt="Qrcode" />
                                <p className="mb0 mt5 semibold size-12">{t('QUÉT MÃ ĐỂ TẢI ỨNG DỤNG')}</p>
                            </div>
                            <div className="homeDownApp__logo">
                                <a
                                    target="_blank"
                                    href="https://itunes.apple.com/us/app/vntrip-at-phong-khach-san/id1046183734?ls=1&mt=8"
                                    rel="noopener noreferrer"
                                >
                                    <img src="https://statics.vntrip.vn/images/logo/appStore.png" alt="appStore" />
                                </a>
                                <a
                                    target="_blank"
                                    href="https://play.google.com/store/apps/details?id=vn.vntrip.hotel"
                                    rel="noopener noreferrer"
                                >
                                    <img src="https://statics.vntrip.vn/images/logo/googlePlay.png" alt="googlePlay" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <PopularPlacesDomestic />

                {/* hide khách sạn QT (a Linh) */}
                {/*<PopularPlacesInter />*/}

                <VntripAward />

                <TheMediaTalk />
            </section>
        </Layout>
    )
})

export async function getStaticProps(context: any) {
    return {
        props: {
            namespacesRequired: ['common', 'hotel', 'flight'],
        },
    }
}

export default HomeHotel
