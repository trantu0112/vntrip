import React, { useState } from 'react'
import { Modal } from 'antd'
import { IconCheapest, IconHomePayment, IconSupport247, IconDoubleArrow } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import { VNTRIP_INFO } from '../../constants/common'

const HomeServices: React.FC = () => {
    const { t } = useTranslation(['common'])
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleModal = () => {
        setIsVisible((prevState) => !prevState)
    }
    return (
        <div className="homeServices">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <div className="homeServices__item">
                            <div className="homeServices__icon">
                                <IconCheapest />
                            </div>
                            <h2>
                                {t('RẺ HƠN GIÁ RẺ NHẤT')},
                                <br />
                                {t('NGẠI GÌ KHÔNG ĐẶT')}?
                            </h2>
                            <p>
                                {t('Ở đâu giá rẻ hơn')},&nbsp;
                                <span className="yellow-1">{t('ALERT_WITH_VNTRIP')}</span>&nbsp;
                                {t('để được mua giá rẻ hơn rẻ nhất')} &nbsp;
                                <button type="button" onClick={() => toggleModal()}>
                                    <IconDoubleArrow />
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="homeServices__item">
                            <div className="homeServices__icon">
                                <IconHomePayment />
                            </div>
                            <h2>{t('THANH TOÁN LINH HOẠT & AN TOÀN')}</h2>
                            <p>
                                {t('Chấp nhận mọi hình thức thanh toán, không cần thẻ tín dụng')}.
                                {t('Bảo mật tuyệt đối thông tin cá nhân')}
                            </p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="homeServices__item">
                            <div className="homeServices__icon">
                                <IconSupport247 />
                            </div>
                            <h2>{t('HỖ TRỢ 24/7')}</h2>
                            <p>{t('Gọi ngay 096 326 6688 kể cả 2h sáng để được hỗ trợ')}.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal visible={isVisible} width={800} footer={null} onCancel={toggleModal}>
                <div className="modal-price__img">
                    <img
                        src="https://statics.vntrip.vn/images/icons/icon-price-guarantee.png"
                        alt={'price-guarantee'}
                    />
                </div>
                <div className="modal-price__cont">
                    <h4 className="text-center mb15">RẺ HƠN GIÁ RẺ NHẤT, NGẠI GÌ KHÔNG ĐẶT?</h4>
                    <ul>
                        <li>
                            <p className="semibold">I. Cách thức khớp giá:</p>
                            <p>
                                Quý khách tìm được đơn vị khác cung cấp cùng loại phòng, ở cùng khách sạn, ở cùng thời
                                điểm với mức giá thấp hơn Vntrip.vn?
                            </p>
                            <p>Xin liên hệ hotline: {VNTRIP_INFO.hotline} để Vntrip.vn hỗ trợ Quý khách:</p>
                            <ul>
                                <li>- Đặt phòng với giá rẻ hơn giá phòng vừa tìm được.</li>
                                <li>- Vntrip.vn sẽ gửi phiếu xác nhận trong vòng 72h kể từ cuộc gọi của Quý khách.</li>
                            </ul>
                        </li>
                        <li>
                            <p className="semibold">II. Điều kiện ​khớp giá:</p>
                            <p>
                                - Thời điểm khớp giá là thời điểm Quý khách chưa ​hoàn tất ​thanh toán đơn hàng trên
                                Vntrip.vn.
                            </p>
                            <p>- Thông báo ngay cho Vntrip.vn qua hotline: 096 326 6688 trong vòng 24h.</p>
                            <p>- Cung cấp đường dẫn (link) website/app hiển thị mức giá rẻ hơn.</p>
                            <p>- Phòng được so sánh phải ở cùng khách sạn, cùng thời điểm check-in, cùng hạng phòng.</p>
                            <p>
                                - Giá so sánh là giá niêm yết​ công khai​, chưa áp dụng bất kì mã giảm giá nào hay bất
                                kì hình thức giảm giá/ chiết khấu nào khác.
                            </p>
                            <p>- Chỉ áp dụng với phòng khách sạn tại Việt Nam.</p>
                            <p className="semibold mt15">Lưu ý:</p>
                            <p>
                                • Vntrip.vn có quyền từ chối khớp giá nếu phát hiện khách hàng không trung thực, lợi
                                dụng chính sách để trục lợi.
                            </p>
                            <p>• Chương trình có thể kết thúc sớm hơn dự kiến.</p>
                            <p>• Trong mọi trường hợp, quyết định của Vntrip.vn là quyết định cuối cùng.</p>
                            <p className="mt15">
                                Chúng tôi luôn mong muốn đem tới cho Quý khách hàng trải nghiệm dễ chịu nhất với mức giá
                                tiết kiệm nhất. Hi vọng Quý khách sẽ lựa chọn Vntrip.vn là người đồng hành trên chuyến
                                đi này.
                            </p>
                        </li>
                    </ul>
                </div>
            </Modal>
        </div>
    )
}

export default HomeServices
