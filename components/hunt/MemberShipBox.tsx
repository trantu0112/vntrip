import React from 'react'
import { useTranslation } from 'react-i18next'

const MemberShipBox = () => {
    const { t } = useTranslation(['common'])

    const openPopupSignIn = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/login?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }
    const openPopupSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/register?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }
    return (
        <div className="membershipBox">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="membershipBox__img">
                            <img src="https://statics.vntrip.vn/images/membershipBox-img.png" alt="" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="membershipBox__cont">
                            <h2 className="bold mb15 size-24">{t('common:Ưu đãi đặc biệt cho thành viên Vntrip')}</h2>
                            <p className="semibold mb0">
                                {t(
                                    'common:Giảm thêm tối thiểu 10% cho khách hàng là thành viên Vntrip đảm bảo giá tốt nhất'
                                )}
                                .
                            </p>
                            <p className="mb0">
                                {t(
                                    'common:Ưu đãi đặc biệt chỉ áp dụng khi đặt phòng tại các khách sạn 4 sao, 5 sao trên Vntrip'
                                )}
                            </p>
                            <div className="membershipBox__btn">
                                <button type="button" className="btn btn_orange" onClick={openPopupSignUp}>
                                    <span>{t('common:Đăng ký thành viên')}</span>
                                </button>
                                <div className="d-block ml15">
                                    <p className="mb0 semibold gray-5">{t('common:Bạn đã là thành viên')}?</p>
                                    <button type="button" className="yellow-1 semibold" onClick={openPopupSignIn}>
                                        <span>{t('common:Đăng nhập ngay')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberShipBox
