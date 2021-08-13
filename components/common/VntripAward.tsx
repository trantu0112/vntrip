import React from 'react'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'

const VntripAward: React.FC = () => {
    const { t } = useTranslation(['common'])
    const settings = {
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        className: 'homePrize__slide',
    }
    return (
        <div className="homePrize">
            <div className="container">
                <h2 className="text-center mb30">{t('VNTRIP_AWARDS_ACHIEVEMENTS')}</h2>
                <Slider {...settings}>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_prize2" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">{t('GIẢI THƯỞNG')}</p>
                                <p>{t('Doanh nghiệp văn hóa Việt Nam tiêu biểu')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_hornors" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">{t('TUYÊN DƯƠNG')}</p>
                                <p>{t('AWARD_1')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_awards" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">{t('GIẢI THƯỞNG')}</p>
                                <p>The Guide Awards</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_top10" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">TOP 10</p>
                                <p>{t('Dịch vụ xuất sắc vì người tiêu dùng')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_gold" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">{t('BẢNG VÀNG')}</p>
                                <p>{t('Doanh nghiệp uy tín, phát triển thịnh vượng')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_apell" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">{t('DANH HIỆU')}</p>
                                <p>{t('Doanh nghiệp tiêu biểu của năm')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="homePrize__col">
                        <div className="homePrize__item">
                            <div className="homePrize__img">
                                <div className="spriteLogo spriteLogo_hornors" />
                            </div>
                            <div className="homePrize__cont">
                                <p className="semibold">{t('TUYÊN DƯƠNG')}</p>
                                <p>{t('Gương thanh niên thủ đô. Khởi nghiệp tiêu biểu')}</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default VntripAward
