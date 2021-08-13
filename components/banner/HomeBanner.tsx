import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isWideScreen, isDesktopScreen, isTableScreen, isMobileScreen } from '../../utils/common'
import { getBanners } from '../../api/common-services'
import Slider from 'react-slick'
import LazyLoad from 'react-lazyload'

interface iProps {
    className: 'hotel' | 'flight' | ''
}

const DEFAULT_ALT: string = 'banner - vntrip'

const HomeBanner: React.FC<iProps> = ({ className }) => {
    const { t } = useTranslation(['common', 'hotel', 'flight'])
    const { i18n } = useTranslation()
    const [listBanner, setListBanner] = useState<any[]>([])

    useEffect(() => {
        async function fetchDataBanner() {
            const dataBanner = await getBanners({ position: 'home_slideshow' })
            if (dataBanner.status === 'success') {
                setListBanner(
                    dataBanner.data.map((bn: any) => {
                        bn.medias.forEach((media: any) => {
                            if (media.screen_type === 'WIDESCREEN') {
                                bn.media_url_lg = media.url
                                bn.media_title_lg = media.title
                                bn.media_alt_lg = media.alt
                            }
                            if (media.screen_type === 'DESKTOP') {
                                bn.media_url_md = media.url
                                bn.media_title_md = media.title
                                bn.media_alt_md = media.alt
                            }
                            if (media.screen_type === 'TABLET') {
                                bn.media_url_sm = media.url
                                bn.media_title_sm = media.title
                                bn.media_alt_sm = media.alt
                            }
                            if (media.screen_type === 'MOBILE') {
                                bn.media_url_xs = media.url
                                bn.media_title_xs = media.title
                                bn.media_alt_xs = media.alt
                            }
                        })
                        return bn
                    })
                )
            }
        }

        fetchDataBanner()
    }, [i18n.language])

    const settings = {
        arrows: false,
        autoplay: false,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'homeBanner ' + className,
    }

    if (listBanner?.length === 0) {
        return (
            <div
                style={{ backgroundImage: 'url(https://statics.vntrip.vn/images/homeBannerV2.jpg)' }}
                className="homeBannerV2"
            >
                <div className="homeBannerV2__text">
                    <p className="p1">{t('common:Làm chủ chuyến đi Săn ngay đợi gì')}</p>
                    <p className="p2">{t('common:Hành trình tuyệt vời bắt đầu từ một cú nhấp chuột')}</p>
                </div>
            </div>
        )
    }

    return (
        <Slider {...settings}>
            {listBanner.map((banner: any) => {
                if (banner.is_open_new_tab && banner.url) {
                    return (
                        <a
                            key={banner.id}
                            target={'_blank'}
                            href={banner.url}
                            className={'homeBanner__item'}
                            rel="noopener noreferrer"
                        >
                            <LazyLoad height={250}>
                                {isWideScreen() && (
                                    <img src={banner.media_url_lg} alt={banner.media_alt_lg || DEFAULT_ALT} />
                                )}
                                {isDesktopScreen() && (
                                    <img src={banner.media_url_md} alt={banner.media_alt_md || DEFAULT_ALT} />
                                )}
                                {isTableScreen() && (
                                    <img src={banner.media_url_sm} alt={banner.media_alt_sm || DEFAULT_ALT} />
                                )}
                                {isMobileScreen() && (
                                    <img src={banner.media_url_xs} alt={banner.media_alt_xs || DEFAULT_ALT} />
                                )}
                            </LazyLoad>
                        </a>
                    )
                }
                return (
                    <div key={banner.id} className={'homeBanner__item'}>
                        <LazyLoad height={250}>
                            {isWideScreen() && (
                                <img src={banner.media_url_lg} alt={banner.media_alt_lg || DEFAULT_ALT} />
                            )}
                            {isDesktopScreen() && (
                                <img src={banner.media_url_md} alt={banner.media_alt_md || DEFAULT_ALT} />
                            )}
                            {isTableScreen() && (
                                <img src={banner.media_url_sm} alt={banner.media_alt_sm || DEFAULT_ALT} />
                            )}
                            {isMobileScreen() && (
                                <img src={banner.media_url_xs} alt={banner.media_alt_xs || DEFAULT_ALT} />
                            )}
                        </LazyLoad>
                    </div>
                )
            })}
        </Slider>
    )
}

export default HomeBanner
