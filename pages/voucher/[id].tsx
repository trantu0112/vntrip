import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { getDealById } from '../../api/common-services'
import Link from 'next/link'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { PATH_VOUCHER_LIST } from '../../constants/common'
const Layout = dynamic(() => import('../../components/layout/Layout'))
const FacebookLikeShare = dynamic(() => import('../../components/facebook/FacebookLikeShare'))
const VoucherGallery = dynamic(() => import('../../components/voucher/VoucherGallery'))
const BoxVoucher = dynamic(() => import('../../components/voucher/BoxVoucher'))
interface Props {
    data: any
    voucherId: number
}
const VoucherDetail: React.FC<Props> = ({ voucherId, data }) => {
    const { t } = useTranslation(['common', 'deal'])
    return (
        <Layout
            title={'Săn voucher giá rẻ trên Vntrip.vn'}
            canonical={process.env.NEXT_PUBLIC_ROOT_DOMAIN + '/voucher/' + voucherId}
        >
            <div className="voucherDetail">
                <div className="container">
                    <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul className="breadcrumb">
                            <li>
                                <Link href={'/'}>
                                    <a>
                                        <span>{t('Trang chủ')}</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={PATH_VOUCHER_LIST}>
                                    <a>
                                        <span>Voucher</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="active">{data?.name}</li>
                        </ul>
                        <FacebookLikeShare />
                    </div>
                    <div className="voucherGallery mt10 dealDetail__gallery">
                        <div className="row">
                            <div className="col-xs-12">
                                <VoucherGallery images={data?.image_deal} name={data?.name} />
                            </div>
                        </div>
                    </div>
                    <div className="voucherTitleMobile mt10">{data?.name}</div>
                    <div className="voucherDetailContent">
                        <div className="row">
                            <div className="col-xs-12 col-sm-7 col-md-8 voucherLeft">
                                <div className="boxShadow dealDetail" style={{ padding: 15 }}>
                                    <div className="voucherTitle">{data?.name}</div>
                                    <div className="dealDetail__group">
                                        <h5>{t('deal:Thông tin chi tiết')}</h5>
                                        <div
                                            className="description"
                                            dangerouslySetInnerHTML={{
                                                __html: data.details
                                                    .replace(/<table/g, '<div class="tableResponsive"><table')
                                                    .replace(/<\/table>/g, '</table></div>'),
                                            }}
                                        />
                                    </div>
                                    <div className="dealDetail__group">
                                        <h5>{t('deal:Điều kiện sử dụng')}</h5>
                                        <div dangerouslySetInnerHTML={{ __html: data.used_condition }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-5 col-md-4 voucherRight">
                                <BoxVoucher
                                    voucherId={voucherId}
                                    extraData={data?.extra_data}
                                    dealPrice={data?.price_deal}
                                    countPerson={data?.custom_count}
                                    appliedToDate={moment(data?.applied_to_date)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ params, query, res, req }: any) => {
    const id_split = params?.id?.split('-')
    const voucher_id = id_split?.[id_split?.length - 1]
    const voucher_data = await getDealById(voucher_id).then((res) => {
        return res?.data
    })
    return {
        props: {
            data: voucher_data,
            voucherId: voucher_id,
        },
    }
}

export default VoucherDetail
