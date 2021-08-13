import React from 'react'
import { useTranslation } from 'react-i18next'

const AppInfo = () => {
    const { t } = useTranslation(['common'])
    return (
        <div style={{ backgroundImage: 'url(https://statics.vntrip.vn/images/appBox-bg.jpg)' }} className="appBox">
            <div className="container">
                <div className="appBox__iphone">
                    <img src="https://statics.vntrip.vn/images/appBox-iphone.png" alt="" />
                </div>
                <div className="appBox__cont">
                    <h2 className="bold mb15">{t('common:Du lịch dễ dàng với một ứng dụng duy nhất')}.</h2>
                    <p>
                        {t(
                            'common:Dùng ứng dụng để đặt vé máy bay, khách sạn chỉ trong vài giây cùng với thông tin cập nhật về chuyến bay theo thời gian thực'
                        )}
                        .
                    </p>
                    <div className="appBox__logo">
                        <a
                            href="https://itunes.apple.com/us/app/vntrip-at-phong-khach-san/id1046183734?ls=1&mt=8"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img src="https://statics.vntrip.vn/images/logo/appStore.png" alt="appStore" />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=vn.vntrip.hotel"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img src="https://statics.vntrip.vn/images/logo/googlePlay.png" alt="googlePlay" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppInfo
