import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import ItemCombo from './ItemCombo'
import { getListComboVin } from '../../api/combo-services'

const HomeComboVinPearl = () => {
    const { t } = useTranslation(['combo', 'flight', 'hotel'])
    const [listCombo, setListCombo] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // setIsLoading(true)
                const data = await getListComboVin()
                setIsLoading(false)
                if (data?.status === 'success') {
                    let _listCombo = data.data.filter(
                        (res: any) => res.nights === 2 && [737, 749, 743].includes(res.id)
                    )
                    setListCombo(_listCombo)
                }
            } catch (e) {
                throw e
            }
        }
        fetchData()
    }, [])
    const priceForOnePeople = (item: any) => {
        const adultNumber = item?.price_deal?.[0]?.unit || 2
        const sellPrice = item?.price_deal?.[0]?.sell_price || 0
        return Number(sellPrice / adultNumber).toFixed(0)
    }
    return (
        <Spin spinning={isLoading} indicator={<Loading3QuartersOutlined spin style={{ fontSize: 25 }} />}>
            {listCombo?.length > 0 && (
                <div className="comboHot">
                    <div className="container">
                        <div className="comboHotContent">
                            <h2
                                className="comboTitle"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {t('combo:Những combo Vinpearl được nhiều người đặt nhất')}
                                <a
                                    target="_blank"
                                    href={process.env.NEXT_PUBLIC_COMBOVIN_URL + '/home'}
                                    style={{
                                        fontWeight: 400,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                    className="btnMore size-14 d-none-mobile"
                                >
                                    {t('hotel:Xem tất cả')}
                                    <svg
                                        style={{ marginLeft: 5, transform: 'translateY(1px)' }}
                                        width={11}
                                        height={13}
                                        viewBox="0 0 11 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.957031 0.734375V0.761719C0.875 0.707031 0.792969 0.652344 0.710938 0.652344C0.601562 0.652344 0.546875 0.679688 0.492188 0.734375L0.300781 0.953125C0.21875 1.00781 0.191406 1.08984 0.191406 1.17188C0.191406 1.28125 0.21875 1.33594 0.300781 1.39062L5.63281 6.75L0.273438 12.082C0.21875 12.1641 0.191406 12.2461 0.191406 12.3281C0.191406 12.4375 0.21875 12.4922 0.273438 12.5469L0.492188 12.7656C0.546875 12.8203 0.601562 12.8477 0.710938 12.8477C0.792969 12.8477 0.875 12.8203 0.957031 12.7383L6.72656 6.99609C6.78125 6.94141 6.80859 6.85938 6.80859 6.75C6.80859 6.66797 6.78125 6.58594 6.72656 6.50391L0.957031 0.734375ZM3.99219 0.734375L3.96484 0.761719C4.01953 0.707031 4.10156 0.652344 4.21094 0.652344C4.29297 0.652344 4.375 0.707031 4.45703 0.761719L10.2266 6.53125C10.2812 6.58594 10.3086 6.66797 10.3086 6.75C10.3086 6.85938 10.2812 6.94141 10.2266 6.99609L4.45703 12.7656C4.375 12.8203 4.29297 12.8477 4.21094 12.8477C4.10156 12.8477 4.04688 12.8203 3.99219 12.7656L3.80078 12.5742C3.71875 12.5195 3.69141 12.4375 3.69141 12.3281C3.69141 12.2461 3.71875 12.1641 3.80078 12.082L9.13281 6.75L3.77344 1.41797C3.71875 1.36328 3.69141 1.28125 3.69141 1.17188C3.69141 1.08984 3.71875 1.00781 3.77344 0.953125L3.99219 0.734375Z"
                                            fill="#1890FF"
                                        />
                                    </svg>
                                </a>
                            </h2>
                            <div className="listComboHot row">
                                {Array.isArray(listCombo) &&
                                    listCombo.map((res: any) => {
                                        return (
                                            <div key={res.id} className="col-lg-4 col-sm-6 col-xs-12">
                                                <ItemCombo data={res} priceForOnePeople={priceForOnePeople} />
                                            </div>
                                        )
                                    })}
                            </div>
                            <a
                                target="_blank"
                                href={process.env.NEXT_PUBLIC_COMBOVIN_URL + '/home'}
                                style={{ fontWeight: 400, textAlign: 'center' }}
                                className="btnMore size-14 d-none-desktop mb10"
                            >
                                {t('hotel:Xem tất cả')}
                                <svg
                                    style={{ marginLeft: 5, transform: 'translateY(1px)' }}
                                    width={11}
                                    height={13}
                                    viewBox="0 0 11 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.957031 0.734375V0.761719C0.875 0.707031 0.792969 0.652344 0.710938 0.652344C0.601562 0.652344 0.546875 0.679688 0.492188 0.734375L0.300781 0.953125C0.21875 1.00781 0.191406 1.08984 0.191406 1.17188C0.191406 1.28125 0.21875 1.33594 0.300781 1.39062L5.63281 6.75L0.273438 12.082C0.21875 12.1641 0.191406 12.2461 0.191406 12.3281C0.191406 12.4375 0.21875 12.4922 0.273438 12.5469L0.492188 12.7656C0.546875 12.8203 0.601562 12.8477 0.710938 12.8477C0.792969 12.8477 0.875 12.8203 0.957031 12.7383L6.72656 6.99609C6.78125 6.94141 6.80859 6.85938 6.80859 6.75C6.80859 6.66797 6.78125 6.58594 6.72656 6.50391L0.957031 0.734375ZM3.99219 0.734375L3.96484 0.761719C4.01953 0.707031 4.10156 0.652344 4.21094 0.652344C4.29297 0.652344 4.375 0.707031 4.45703 0.761719L10.2266 6.53125C10.2812 6.58594 10.3086 6.66797 10.3086 6.75C10.3086 6.85938 10.2812 6.94141 10.2266 6.99609L4.45703 12.7656C4.375 12.8203 4.29297 12.8477 4.21094 12.8477C4.10156 12.8477 4.04688 12.8203 3.99219 12.7656L3.80078 12.5742C3.71875 12.5195 3.69141 12.4375 3.69141 12.3281C3.69141 12.2461 3.71875 12.1641 3.80078 12.082L9.13281 6.75L3.77344 1.41797C3.71875 1.36328 3.69141 1.28125 3.69141 1.17188C3.69141 1.08984 3.71875 1.00781 3.77344 0.953125L3.99219 0.734375Z"
                                        fill="#1890FF"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </Spin>
    )
}

export default HomeComboVinPearl
