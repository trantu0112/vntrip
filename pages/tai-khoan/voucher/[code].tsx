import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { withAuth } from '../../../utils/custom-hoc'
import ProfileNavbar from '../../../components/user/ProfileNavbar'
import { getVoucherDetailByCode } from '../../../api/user-services'
import { useRouter } from 'next/router'
import moment from 'moment'
import { copyToClipboard, showMessage } from '../../../utils/common'
import { useTranslation } from 'react-i18next'

const Layout = dynamic(() => import('../../../components/layout/Layout'))

const VoucherDetail = () => {
    const { t, i18n } = useTranslation(['common', 'user'])
    const router = useRouter()
    const [data, setData] = useState<any>({})
    const [isCopy, setIsCopy] = useState<boolean>(false)

    useEffect(() => {
        const code = String(router.query.code)
        async function fetchVoucherDetail(code: string) {
            try {
                const res = await getVoucherDetailByCode(code)
                if (res.status === 'success') {
                    setData(res.data)
                }
            } catch (e) {
                throw e
            }
        }

        fetchVoucherDetail(code)
    }, [])

    const handleClickCopy = (text: string) => {
        copyToClipboard(text)
        showMessage('success', `${data.code}`)
        setIsCopy(true)
    }

    const expired_day = moment(data.expiry_date).diff(moment(), 'days')

    return (
        <Layout>
            <div className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileCouponDetail">
                        <div className="profileCouponDetail__banner">
                            <img src={data.banner} alt="banner" />
                        </div>
                        <div className="profileCouponDetail__info">
                            <div className="flexGroup">
                                <div className="d-block flex1 mr15">
                                    <p className="size-16 semibold">{data.campaign_name}</p>
                                    <p className="mb0 gray-5">
                                        {t('user:Hết hạn')}: {moment(data.expiry_date).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                                <div className="profileCouponDetail__label">
                                    {expired_day > 0 ? (
                                        <span>Còn {expired_day} ngày</span>
                                    ) : (
                                        <span>{t('user:Đã hết hạn')}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="profileCouponDetail__code">
                            <div className="d-left">
                                <p className="mb0 size-20 bold uppercase yellow-1">{data.code}</p>
                            </div>
                            <div className="d-right">
                                <button
                                    type="button"
                                    className={`yellow-1 semibold ${isCopy ? 'disabled' : ''}`}
                                    onClick={() => {
                                        handleClickCopy(`${data.code}`)
                                    }}
                                >
                                    <span>{isCopy ? t('common:Đã sao chép') : t('common:Sao chép')}</span>
                                </button>
                            </div>
                        </div>
                        <div className="profileCouponDetail__cont">
                            <p className="size-16 semibold mb15">{t('common:Chính sách và điều kiện')}</p>
                            {/*<p dangerouslySetInnerHTML={{ __html: data?.term_and_condition }} />*/}

                            {i18n.language === 'vi' ? (
                                <>
                                    <p>
                                        - Voucher áp dụng khi khách hàng đặt phòng khách sạn online trên website
                                        www.vntrip.vn hoặc trải nghiệm dịch vụ Business Traveller của Vntrip qua hotline
                                    </p>
                                    <p>- Mỗi voucher chỉ áp dụng cho 01 đơn đặt phòng khách sạn.</p>
                                    <p>
                                        - Nếu giá trị đơn đặt phòng cao hơn mệnh giá voucher khách hàng sẽ được giảm trừ
                                        vào khoản thanh toán.
                                    </p>
                                    <p>
                                        - Nếu giá trị đơn phòng thấp hơn mệnh giá voucher khách hàng sẽ không được hoàn
                                        lại.
                                    </p>
                                    <p>
                                        - Không áp dụng đồng thời với các chương trình khuyến mại và giảm giá khác trên
                                        hệ thống
                                    </p>
                                    <p>- Voucher không có giá trị quy đổi thành tiền mặt.</p>
                                    <p>
                                        - Voucher phải còn nguyên vẹn, không rách, không chắp vá và có đóng dấu của
                                        Vntrip
                                    </p>
                                    <p className="semibold">Lưu ý: Không áp dụng:</p>
                                    <p>- Đặt vé máy bay, khách sạn Quốc tế</p>
                                    <p>
                                        - Không áp dụng đồng thời với các chương trình khuyến mại giảm giá khác của
                                        VNTRIP
                                    </p>
                                    <p>
                                        - Không áp dụng xuất VAT cho khách hàng lẻ được tặng và sử dụng voucher để đặt
                                        phòng
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        - Voucher is applied for booking online on website www.vntrip.vn or Vntrip
                                        Business Traveler service via hotline
                                    </p>
                                    <p>- Each voucher is only applied for 1 reservation</p>
                                    <p>
                                        - If the booking value is higher than the voucher value, it will be deducted
                                        from the payment.
                                    </p>
                                    <p>
                                        - If the booking value is lower than the voucher value, the customer will not be
                                        refunded.
                                    </p>
                                    <p>- Not apply with other promotions or discounts</p>
                                    <p>- Voucher is not redeemable for cash.</p>
                                    <p>- Voucher must be intact, not torn, not patched and stamped by Vntrip</p>
                                    <p className="semibold">Notice of not available:</p>
                                    <p>- Airline booking and international hotels booking</p>
                                    <p>- Not VAT invoice for voucher reservation</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default withAuth()(VoucherDetail)
