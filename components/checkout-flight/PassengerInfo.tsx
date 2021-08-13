import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { PASSENGER } from '../../constants/enums'
import { getAirBaggage } from '../../api/flight-services'
import PassengerItem from './PassengerItem'
import { useTranslation } from 'react-i18next'
import { setListPassenger } from '../../store/flight/action'
import { changeAlias } from '../../utils/common'
import { getBookerAndPassengers, splitFirstAndLastName } from '../../utils/user'
import { useMounted } from '../../utils/custom-hook'

interface Props {
    adultCount: number
    childCount: number
    infantCount: number
    departData: any
    returnData?: any
    isDomestic: boolean
    sessionInter: string
    sessionDomes: any
}

const DEFAULT_PASSENGER = {
    index: 0,
    gender: 1,
    firstName: '',
    lastName: '',
    fullName: '',
    type: PASSENGER.ADT,
    birthday: '',
    listBaggage: [],
    validateName: { status: 'success', text: '' },
    validateBirthday: { status: 'success', text: '' },
}
const PassengerInfo: React.FC<Props> = ({
    adultCount,
    childCount,
    infantCount,
    departData,
    returnData,
    sessionDomes,
    sessionInter,
    isDomestic,
}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['flight'])
    const [loadingBaggage, setLoadingBaggage] = useState<boolean>(false)
    const [listBaggageDepart, setListBaggageDepart] = useState<any[]>([])
    const [listBaggageReturn, setListBaggageReturn] = useState<any[]>([])
    const listPassenger = useSelector((state: any) => state.flight.listPassenger || [])
    const [convertDepart, setConvertDepart] = useState<{
        airline: string
        startPoint: string
        endPoint: string
        date: any
    }>({
        airline: '',
        startPoint: '',
        endPoint: '',
        date: '',
    })
    const [convertReturn, setConvertReturn] = useState<{
        airline: string
        startPoint: string
        endPoint: string
        date: any
    } | null>(null)
    // fetch data baggage
    useEffect(() => {
        async function fetchDataAirBaggage() {
            const dataAirBaggage: any = {
                listToken: [],
            }
            const _list = [departData, returnData]
            _list.forEach((item) => {
                if (item) {
                    dataAirBaggage.listToken.push(item.token)
                }
            })
            try {
                setLoadingBaggage(true)
                const response = await getAirBaggage(dataAirBaggage)
                setLoadingBaggage(false)
                if (response && response.status) {
                    const listBaggage = response.listBaggage
                    const option_default = {
                        name: t('Chọn hành lý'),
                        value: '',
                        price: 0,
                        code: 0,
                    }
                    if (!returnData) {
                        // chỉ có chiều đi
                        setListBaggageDepart(
                            Array.isArray(listBaggage) ? [{ ...option_default, leg: 0 }, ...listBaggage] : []
                        )
                    } else {
                        // cả chiều đi và chiều về
                        if (Array.isArray(listBaggage)) {
                            const baggageDepart = listBaggage.filter((item) => item.leg === 0)
                            const baggageReturn = listBaggage.filter((item) => item.leg === 1)
                            setListBaggageDepart([{ ...option_default, leg: 0 }, ...baggageDepart])
                            setListBaggageReturn([{ ...option_default, leg: 1 }, ...baggageReturn])
                        } else {
                            setListBaggageDepart([{ ...option_default, leg: 0 }])
                            setListBaggageReturn([{ ...option_default, leg: 1 }])
                        }
                    }
                }
            } catch (e) {
                throw e
            }
        }

        if (departData || returnData) {
            fetchDataAirBaggage()
        }
    }, [departData, returnData])

    // convert depart data and return data
    useEffect(() => {
        if (departData) {
            const { listFlight } = departData
            if (Array.isArray(listFlight) && listFlight.length > 0) {
                setConvertDepart({
                    airline: listFlight[0]['airline'],
                    startPoint: listFlight[0].startPoint,
                    endPoint: listFlight[0].endPoint,
                    date: listFlight[0]['startDate'],
                })
            }
        }
        if (returnData) {
            const { listFlight } = returnData
            if (Array.isArray(listFlight) && listFlight.length > 0) {
                setConvertReturn({
                    airline: listFlight[0]['airline'],
                    startPoint: listFlight[0].startPoint,
                    endPoint: listFlight[0].endPoint,
                    date: listFlight[0]['startDate'],
                })
            }
        }
    }, [departData, returnData])

    // set list adult, child, infant
    useEffect(() => {
        let historyPassenger = getBookerAndPassengers()?.passengers
        let filterHistoryAdult = Array.isArray(historyPassenger)
            ? historyPassenger.filter((item: any) => item['type'] === 'ADT')
            : []
        let filterHistoryChild = Array.isArray(historyPassenger)
            ? historyPassenger.filter((item: any) => item['type'] === 'CHD')
            : []
        let filterHistoryInfant = Array.isArray(historyPassenger)
            ? historyPassenger.filter((item: any) => item['type'] === 'INF')
            : []
        const _passenger = [...new Array(adultCount)]
            .map((item, index) => {
                return {
                    ...DEFAULT_PASSENGER,
                    fullName: filterHistoryAdult[index] ? filterHistoryAdult[index]['fullName'] : '',
                    lastName: filterHistoryAdult[index] ? filterHistoryAdult[index]['lastName'] : '',
                    firstName: filterHistoryAdult[index] ? filterHistoryAdult[index]['firstName'] : '',
                    gender: filterHistoryAdult[index] ? filterHistoryAdult[index]['gender'] : 1,
                    type: PASSENGER.ADT,
                    index: index,
                    title: `${t('Người lớn')} ${index + 1}`,
                }
            })
            .concat(
                [...new Array(childCount)].map((item, index) => {
                    return {
                        ...DEFAULT_PASSENGER,
                        fullName: filterHistoryChild[index] ? filterHistoryChild[index]['fullName'] : '',
                        lastName: filterHistoryChild[index] ? filterHistoryChild[index]['lastName'] : '',
                        firstName: filterHistoryChild[index] ? filterHistoryChild[index]['firstName'] : '',
                        gender: filterHistoryChild[index] ? filterHistoryChild[index]['gender'] : 1,
                        birthday: filterHistoryChild[index] ? filterHistoryChild[index]['birthday'] : '',
                        type: PASSENGER.CHD,
                        index: index + adultCount,
                        title: `${t('Trẻ em')} ${index + 1}`,
                    }
                }),
                [...new Array(infantCount)].map((item, index) => {
                    return {
                        ...DEFAULT_PASSENGER,
                        fullName: filterHistoryInfant[index] ? filterHistoryInfant[index]['fullName'] : '',
                        lastName: filterHistoryInfant[index] ? filterHistoryInfant[index]['lastName'] : '',
                        firstName: filterHistoryInfant[index] ? filterHistoryInfant[index]['firstName'] : '',
                        gender: filterHistoryInfant[index] ? filterHistoryInfant[index]['gender'] : 1,
                        birthday: filterHistoryInfant[index] ? filterHistoryInfant[index]['birthday'] : '',
                        type: PASSENGER.INF,
                        index: index + adultCount + childCount,
                        title: `${t('Trẻ sơ sinh')} ${index + 1}`,
                    }
                })
            )
        dispatch(setListPassenger(_passenger))
    }, [adultCount, childCount, infantCount])

    const handleChangeBaggage = (leg: number, value: string, index: number) => {
        const listBaggage = leg === 0 ? [...listBaggageDepart] : [...listBaggageReturn] // leg = 0 => chiều đi, leg = 1 =>  chiều về
        const baggage = listBaggage.find((bag) => bag.value === value) // find object baggage by value
        const _passenger = [...listPassenger] // clone list passenger
        const currPass = _passenger[index] // get current passenger by index
        const _listBaggage = [...currPass.listBaggage] // clone listBaggage from current passenger
        const indexInListBaggage = _listBaggage.findIndex((bag) => bag.leg === leg) // find index bagge is changed by leg (leg = 0|1)
        if (indexInListBaggage === -1) {
            // do not exist => push data
            _listBaggage.push(baggage)
        } else {
            // exist => set current baggage = new baggage
            _listBaggage[indexInListBaggage] = baggage
        }
        // set new value to listBaggage
        _passenger[index]['listBaggage'] = _listBaggage
        // set data to state => view change
        dispatch(setListPassenger(_passenger))
    }

    const handleChangeName = (index: number, value: string) => {
        const _passenger = [...listPassenger]
        _passenger[index]['fullName'] = value
        _passenger[index]['validateName'] = { status: 'success', text: '' }
        dispatch(setListPassenger(_passenger))
    }

    const handleBlurName = (index: number, value: string) => {
        const _passenger = [...listPassenger]
        const fullName = changeAlias(value)
        if (fullName !== _passenger[index]['fullName']) {
            const { first_name, last_name } = splitFirstAndLastName(fullName)
            _passenger[index]['fullName'] = fullName
            _passenger[index]['firstName'] = first_name
            _passenger[index]['lastName'] = last_name
            _passenger[index]['validateName'] = { status: 'success', text: '' }
            dispatch(setListPassenger(_passenger))
        }
    }

    const handleChangeGender = (index: number, value: number) => {
        const _passenger = [...listPassenger]
        _passenger[index]['gender'] = value
        dispatch(setListPassenger(_passenger))
    }

    const handleChangeBirthday = (index: number, date: any) => {
        // date: moment
        const _passenger = [...listPassenger]
        _passenger[index]['birthday'] = date ? date.format('DDMMYYYY') : ''
        _passenger[index]['validateBirthday'] = { status: 'success', text: '' }
        dispatch(setListPassenger(_passenger))
    }

    return (
        <div className="checkoutInfo">
            <h2 className="mb15">{t('DANH SÁCH HÀNH KHÁCH')}</h2>
            <div className="checkoutInfo__body">
                <div className="checkoutInfo__group">
                    <Form size={'large'} layout="vertical">
                        {listPassenger.map((item: any) => {
                            return (
                                <PassengerItem
                                    key={`${item.type}_${item.index}`}
                                    data={item}
                                    departData={convertDepart}
                                    returnData={convertReturn}
                                    loadingBaggage={loadingBaggage}
                                    listBaggageDepart={listBaggageDepart}
                                    listBaggageReturn={listBaggageReturn}
                                    listPassenger={listPassenger}
                                    handleChangeBaggage={handleChangeBaggage}
                                    handleChangeName={handleChangeName}
                                    handleBlurName={handleBlurName}
                                    handleChangeGender={handleChangeGender}
                                    handleChangeBirthday={handleChangeBirthday}
                                />
                            )
                        })}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default PassengerInfo
