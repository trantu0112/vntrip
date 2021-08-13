import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { getOrderByTransactionId } from '../api/order-services'
import { YYYYMMDD } from '../constants/common'
import { getCurrency, getExChangeRate } from './common'
import { useAuth } from '../components/contexts/authContext'

export const useTranslationId = () => {
    const router = useRouter()
    const [transactionId, setTransactionId] = useState<string>('')
    const [orderData, setOrderData] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchDataByTransactionId(transactionId: string) {
            try {
                setIsLoading(true)
                const res = await getOrderByTransactionId(transactionId)
                setIsLoading(false)
                if (res.status === 'success') {
                    setOrderData(res.data)
                    setErrorMessage('')
                } else {
                    setOrderData(null)
                    setErrorMessage(res.message)
                }
            } catch (e) {
                setIsLoading(false)
                throw e
            }
        }

        const transaction_id = router.query.transaction_id ? router.query.transaction_id.toString() : ''
        if (transaction_id) {
            setTransactionId(transaction_id)
            fetchDataByTransactionId(transaction_id)
        } else {
            setOrderData(null)
            setErrorMessage('Transaction not found')
        }
    }, [router.query, router.pathname])

    return { transactionId, orderData, errorMessage, isLoading }
}

export const useMounted = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return mounted
}

export const useUserInfo = () => {
    const auth = useAuth()
    return auth.user
}

export const userCurrency = () => {
    const [currency, setCurrency] = useState<'VND' | 'USD'>('VND')
    const [rate, setRate] = useState<number>(1)
    useEffect(() => {
        const _currency = getCurrency()
        setCurrency(_currency || 'VND')
    }, [])
    useEffect(() => {
        if (currency === 'USD') {
            const _exchangerate: any = getExChangeRate()
            if (_exchangerate?.transfer) {
                setRate(_exchangerate?.transfer)
            }
        }
    }, [currency])
    return { currency, rate }
}

export const userQueryCheckInDate = () => {
    const router = useRouter()
    const [checkInDate, setCheckInDate] = useState<string>(moment().format(YYYYMMDD))
    const [checkOutDate, setCheckOutDate] = useState<string>(moment().add(1, 'day').format(YYYYMMDD))
    const [nights, setNights] = useState<number>(1)
    const [roomCount, setRoomCount] = useState<number>(1)
    const [adultCount, setAdultCount] = useState<number>(1)
    useEffect(() => {
        const _checkIn =
            router.query.checkInDate && moment(String(router.query.checkInDate), YYYYMMDD, true).isValid()
                ? String(router.query.checkInDate)
                : moment().format(YYYYMMDD)

        const _nights = router.query.nights ? Number(router.query.nights) : 1
        const _checkOut = moment(_checkIn).add(_nights, 'day').format(YYYYMMDD)
        const _roomCount = router.query.roomCount ? Number(router.query.roomCount) : 1
        const _adultCount = router.query.adultCount ? Number(router.query.adultCount) : 1

        setCheckInDate(_checkIn)
        setNights(_nights)
        setCheckOutDate(_checkOut)
        setRoomCount(_roomCount)
        setAdultCount(_adultCount)
    }, [router.query.checkInDate, router.query.nights, router.query.roomCount, router.query.adultCount])

    return {
        checkInDateInUrl: checkInDate,
        checkOutDateInUrl: checkOutDate,
        nightsInUrl: nights,
        roomCountInUrl: roomCount,
        adultCountInUrl: adultCount,
    }
}
