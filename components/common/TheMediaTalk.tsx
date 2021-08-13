import React from 'react'
import { useTranslation } from 'react-i18next'

const TheMediaTalk: React.FC = () => {
    const { t } = useTranslation(['common'])
    return (
        <div className="homeNews">
            <div className="container">
                <h2 className="text-center mb30">{t('TRUYỀN THÔNG NÓI VỀ CHÚNG TÔI')}</h2>
                <div className="homeNews__cont">
                    <div className="homeNews__col">
                        <a
                            href="http://vtv.vn/kinh-te/doanh-nghiep-viet-gianh-thi-phan-du-lich-truc-tuyen-20170506195725496.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homeNews__item"
                        >
                            <div className="spriteLogo spriteLogo_vtv" />
                        </a>
                    </div>
                    <div className="homeNews__col">
                        <a
                            href="https://kinhdoanh.vnexpress.net/tin-tuc/startup/ung-dung-dat-phong-khach-san-viet-duoc-tap-doan-thuy-sy-rot-von-3795054.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homeNews__item"
                        >
                            <div className="spriteLogo spriteLogo_vnexpress" />
                        </a>
                    </div>
                    <div className="homeNews__col">
                        <a
                            href="http://cafebiz.vn/vntripvn-goi-von-thanh-cong-lan-3-duoc-tap-doan-thuy-sy-dinh-gia-1000-ty-dong-20180820111940602.chn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homeNews__item"
                        >
                            <div className="spriteLogo spriteLogo_cafebiz" />
                        </a>
                    </div>
                    <div className="homeNews__col">
                        <a
                            href="https://www.dealstreetasia.com/stories/vietnams-online-travel-app-vntrip-raises-third-round-from-swiss-ihag-holding-105055/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homeNews__item"
                        >
                            <div className="spriteLogo spriteLogo_deal" />
                        </a>
                    </div>
                    <div className="homeNews__col">
                        <a
                            href="http://vneconomictimes.com/article/business/vntrip-vn-secures-funding-from-swiss-investor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homeNews__item"
                        >
                            <div className="spriteLogo spriteLogo_times" />
                        </a>
                    </div>
                    <div className="homeNews__col">
                        <a
                            href="http://thoibaonganhang.vn/ihag-holding-rot-45-trieu-usd-vao-vntripvn-79083.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="homeNews__item"
                        >
                            <div className="spriteLogo spriteLogo_banks" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheMediaTalk
