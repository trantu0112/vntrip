import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { getExChangeRate } from '../../utils/common'

interface Props {
    price: number
    curr?: 'VND' | 'USD'
}

const currencies: any = {
    USD: ['$', 2, ',', 'before', 'United States dollar'],
    VND: ['₫', 0, '.', 'after', 'Vietnamese dong'],
}

// currency lấy từ props hoặc state global
// ưu tiên lấy từ props truyền vào, nếu ko truyền thì lấy từ global, global ko có thì mặc định lấy VND

const DisplayPrice: FC<Props> = ({ price, curr }) => {
    const { currency } = useSelector((state: any) => {
        return {
            currency: state.common.currency || 'VND',
        }
    })

    // price = Number(price)
    if (typeof price === 'undefined' || price === null) {
        price = 0
    }
    const formatCurr = (_price: number, _curr: 'VND' | 'USD') => {
        if (!_curr) _curr = 'VND'
        let sym = currencies[_curr][0]
        let dec = currencies[_curr][1]

        let y = Number(Math.round(Number(_price + 'e' + dec)) + 'e-' + dec)
        // let y = x.toFixed(dec);
        let z = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, currencies[_curr][2])
        return currencies[_curr][3] === 'before' ? sym + z : z + sym
    }
    const formatPrice = () => {
        const exChangeRate = getExChangeRate()
        const rate = (curr || currency) === 'USD' ? Number(exChangeRate['transfer']) : 1
        return formatCurr(price / rate, curr || currency)
    }
    return <>{formatPrice()}</>
}

export default DisplayPrice
