import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFullName } from '../../utils/user'
import { useTranslation } from 'react-i18next'
import DisplayPrice from '../common/DisplayPrice'

interface iProps {
    userId: number
    bookingRequestId: string
    cashbackInfo: any
}

const LoyaltyEarnPoint: React.FC<iProps> = ({ cashbackInfo, bookingRequestId }) => {
    const { t, i18n } = useTranslation(['common'])
    const isVi = i18n.language === 'vi'
    const { bookerData } = useSelector((state: any) => {
        return {
            bookerData: state.checkout.bookerData,
        }
    })
    const [isShowEarnPoint, setIsShowEarnPoint] = useState<boolean>(false)
    const [vntrip, setVntrip] = useState<any>(null)

    useEffect(() => {
        if (cashbackInfo) {
            const { price_list } = cashbackInfo
            // tìm trong price_list, nếu có id trùng booking request thì có dữ liệu => show earn point
            const pointInfo = price_list.find((item: any) => item.id === bookingRequestId)
            if (pointInfo) {
                setIsShowEarnPoint(true)
                setVntrip(pointInfo.loyalty)
            }
        }
    }, [cashbackInfo])

    if (isShowEarnPoint)
        return (
            <>
                <div className="checkoutLayout__title">
                    <span>
                        {t('Tài khoản')}&nbsp;
                        <strong className="yellow-1">
                            {getFullName(bookerData?.first_name, bookerData?.last_name)}
                        </strong>
                        <i>&nbsp;({bookerData?.email})</i>&nbsp;{t('common:sẽ được hoàn tiền từ')} Vntrip.vn
                    </span>
                </div>
                <ul className="checkoutPayment__point">
                    {vntrip && (
                        <li>
                            <div className="radio">
                                <input id="point1" type="radio" name="loyalty" defaultChecked />
                                <label htmlFor="point1">
                                    {vntrip[isVi ? 'name_vi' : 'name']}:&nbsp;
                                    <span className="yellow-1">
                                        <DisplayPrice price={vntrip.point} />
                                    </span>
                                </label>
                            </div>
                        </li>
                    )}
                </ul>
            </>
        )
    return null
}

export default LoyaltyEarnPoint
