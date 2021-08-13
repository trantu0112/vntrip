import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconReason1, IconReason2, IconReason3 } from '../../constants/icons'
const ReasonCombo = () => {
    const { t } = useTranslation(['combo', 'flight', 'hotel'])

    return (
        <div className="reasonCombo">
            <div className="container">
                <div className="reasonComboTitle">
                    <p className="semibold size-24">
                        {t('combo:Tại sao chọn')}
                        <span className="yellow-2"> {t('combo:COMBO VNTRIP')}</span>?
                    </p>
                </div>
                <div className="reasonComboContent">
                    <div className="reasonComboItem">
                        <div className="image">
                            <IconReason1 />
                        </div>
                        <div className="text">
                            <p className="title">{t('combo:Công nghệ trí tuệ nhân tạo')}</p>
                            <p>
                                {t('combo:Tự động tìm vé rẻ nhất để đảm bảo giá thành phù hợp cho ngân sách của bạn')}.
                            </p>
                        </div>
                    </div>
                    <div className="reasonComboItem">
                        <div className="image">
                            <IconReason2 />
                        </div>
                        <div className="text">
                            <p className="title">{t('combo:Tiết kiệm thời gian')}</p>
                            <p>
                                {t('combo:Xác nhận ngay, không cần đợi nhân viên tư vấn tìm phòng và vé mất thời gian')}
                                .
                            </p>
                        </div>
                    </div>
                    <div className="reasonComboItem">
                        <div className="image">
                            <IconReason3 />
                        </div>
                        <div className="text">
                            <p className="title">{t('combo:Rẻ nhất thị trường')}</p>
                            <p>{t('combo:Giá cuối cùng, không thu thêm phí ngoài như các trang khác')}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReasonCombo
