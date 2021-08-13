import React, { useEffect, useState } from 'react'
import { Button, Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import DisplayPrice from '../common/DisplayPrice'
import { setRedisVoucher } from '../../api/voucher'
import { useRouter } from 'next/router'
import { PATH_VOUCHER_CHECKOUT_STEP1 } from '../../constants/common'
import { IconGroupUser, IconTime, IconUser } from '../../constants/icons'
import moment, { Moment } from 'moment'
import { calculatorDiscount } from '../../utils/common'
interface Props {
    voucherId: number
    extraData: any
    dealPrice: any
    countPerson: number
    appliedToDate: Moment
}

const BoxVoucher: React.FC<Props> = ({ voucherId, extraData, dealPrice, countPerson, appliedToDate }) => {
    const router = useRouter()
    const { t } = useTranslation(['common', 'deal', 'flight', 'voucher', 'combo'])
    const [quantity, setQuantity] = useState<number>(1)
    const [diffDate, setDiffDate] = useState<string>('')

    useEffect(() => {
        if (appliedToDate) {
            let diffMinutes = appliedToDate.diff(moment(), 'minutes')

            let days: string | number = Math.floor(diffMinutes / 1440)
            let hours: string | number = Math.floor((diffMinutes % 1440) / 60)
            let minutes: string | number = Math.floor((diffMinutes % 1440) % 60)
            if (hours < 10) {
                hours = '0' + hours
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            if (days < 10) {
                days = '0' + days
            }

            setDiffDate(days + ` ${t('combo:ngày')}` + ' ' + hours + 'h ' + minutes + 'm ')
        }
    }, [appliedToDate])

    const handleChangeQuantity = (type: 'PLUS' | 'MINUS') => {
        let _quantity = quantity
        switch (type) {
            case 'PLUS':
                _quantity += 1
                break
            case 'MINUS':
                if (_quantity > 1) _quantity -= 1
                break
            default:
                return
        }

        setQuantity(_quantity)
    }

    const handleContinue = async () => {
        try {
            let data = {
                deal_id: voucherId,
                quantity,
                extra_data: extraData,
            }
            const result = await setRedisVoucher(data)
            if (result?.status === 'success') {
                await router.push(
                    PATH_VOUCHER_CHECKOUT_STEP1 + '/[token]',
                    PATH_VOUCHER_CHECKOUT_STEP1 + '/' + result?.data
                )
            }
        } catch (e) {
            throw e
        }
    }

    return (
        <div className="boxVoucher boxShadow mb20" style={{ padding: 15 }}>
            {dealPrice?.[0]?.origin_price !== dealPrice?.[0]?.sell_price && (
                <div className="flexGroup2">
                    <span className="gray-11 size-12">{t('voucher:Giá gốc')}:</span>
                    <span className="gray-11 ml5 size-12" style={{ textDecoration: 'line-through' }}>
                        {' '}
                        <DisplayPrice price={dealPrice?.[0]?.origin_price} />
                    </span>
                </div>
            )}
            <div className="flexGroup2">
                <span className="semibold size-24 yellow-1">
                    <DisplayPrice price={dealPrice?.[0]?.sell_price} />
                </span>
                {calculatorDiscount(dealPrice?.[0]?.origin_price, dealPrice?.[0]?.sell_price) > 0 && (
                    <span className="discount">
                        - {calculatorDiscount(dealPrice?.[0]?.origin_price, dealPrice?.[0]?.sell_price)}%
                    </span>
                )}
            </div>

            <div className="flexGroup2 mt10">
                <span className="gray-11 mr15">{t('Số lượng')}:</span>
                <Radio.Group value={''}>
                    <Radio.Button
                        style={{ width: 34, textAlign: 'center', padding: 0 }}
                        onClick={() => handleChangeQuantity('MINUS')}
                    >
                        {' '}
                        <MinusOutlined style={{ fontSize: 12 }} />
                    </Radio.Button>
                    <Radio.Button style={{ width: 34, textAlign: 'center', padding: 0 }}>{quantity}</Radio.Button>
                    <Radio.Button
                        style={{ width: 34, textAlign: 'center', padding: 0 }}
                        onClick={() => handleChangeQuantity('PLUS')}
                    >
                        <PlusOutlined style={{ fontSize: 12 }} />
                    </Radio.Button>
                </Radio.Group>
            </div>

            <Button type={'primary'} className="w100 mt25" onClick={handleContinue}>
                {t('deal:Mua ngay')}
            </Button>

            <div className="flexGroup mt10">
                <div className="flexGroup2">
                    <span>
                        <IconGroupUser />
                    </span>
                    <span className="gray-11 ml5">
                        {' '}
                        {countPerson} {t('voucher: đã mua')}
                    </span>
                </div>
                <div className="flexGroup2">
                    <IconTime />
                    <span className="gray-11 ml5">{diffDate}</span>
                </div>
            </div>
        </div>
    )
}

export default BoxVoucher
