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
                                        {t('user:H???t h???n')}: {moment(data.expiry_date).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                                <div className="profileCouponDetail__label">
                                    {expired_day > 0 ? (
                                        <span>C??n {expired_day} ng??y</span>
                                    ) : (
                                        <span>{t('user:???? h???t h???n')}</span>
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
                                    <span>{isCopy ? t('common:???? sao ch??p') : t('common:Sao ch??p')}</span>
                                </button>
                            </div>
                        </div>
                        <div className="profileCouponDetail__cont">
                            <p className="size-16 semibold mb15">{t('common:Ch??nh s??ch v?? ??i???u ki???n')}</p>
                            {/*<p dangerouslySetInnerHTML={{ __html: data?.term_and_condition }} />*/}

                            {i18n.language === 'vi' ? (
                                <>
                                    <p>
                                        - Voucher ??p d???ng khi kh??ch h??ng ?????t ph??ng kh??ch s???n online tr??n website
                                        www.vntrip.vn ho???c tr???i nghi???m d???ch v??? Business Traveller c???a Vntrip qua hotline
                                    </p>
                                    <p>- M???i voucher ch??? ??p d???ng cho 01 ????n ?????t ph??ng kh??ch s???n.</p>
                                    <p>
                                        - N???u gi?? tr??? ????n ?????t ph??ng cao h??n m???nh gi?? voucher kh??ch h??ng s??? ???????c gi???m tr???
                                        v??o kho???n thanh to??n.
                                    </p>
                                    <p>
                                        - N???u gi?? tr??? ????n ph??ng th???p h??n m???nh gi?? voucher kh??ch h??ng s??? kh??ng ???????c ho??n
                                        l???i.
                                    </p>
                                    <p>
                                        - Kh??ng ??p d???ng ?????ng th???i v???i c??c ch????ng tr??nh khuy???n m???i v?? gi???m gi?? kh??c tr??n
                                        h??? th???ng
                                    </p>
                                    <p>- Voucher kh??ng c?? gi?? tr??? quy ?????i th??nh ti???n m???t.</p>
                                    <p>
                                        - Voucher ph???i c??n nguy??n v???n, kh??ng r??ch, kh??ng ch???p v?? v?? c?? ????ng d???u c???a
                                        Vntrip
                                    </p>
                                    <p className="semibold">L??u ??: Kh??ng ??p d???ng:</p>
                                    <p>- ?????t v?? m??y bay, kh??ch s???n Qu???c t???</p>
                                    <p>
                                        - Kh??ng ??p d???ng ?????ng th???i v???i c??c ch????ng tr??nh khuy???n m???i gi???m gi?? kh??c c???a
                                        VNTRIP
                                    </p>
                                    <p>
                                        - Kh??ng ??p d???ng xu???t VAT cho kh??ch h??ng l??? ???????c t???ng v?? s??? d???ng voucher ????? ?????t
                                        ph??ng
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
