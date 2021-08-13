import React, { useEffect, useState } from 'react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { insertFlightSelected, searchFlight } from '../api/flight-services'
import { compareTimeFilter, parseQueryFlight, sortFlightByKey } from '../utils/flight'
import { FlightActionType } from '../constants/enums'
import {
    setActionType,
    setDepartSelected,
    setFilterByProvider,
    setFilterByTime,
    setReturnSelected,
} from '../store/flight/action'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { showMessage } from '../utils/common'
import { PATH_FLIGHT_CHECKOUT_STEP1 } from '../constants/common'

const Layout = dynamic(() => import('../components/layout/Layout'))
const SearchBoxFlight = dynamic(() => import('../components/search-box-flight/SearchBoxFlight'))
const FlightFilter = dynamic(() => import('../components/flight-list/FlightFilter'))
const FlightSort = dynamic(() => import('../components/flight-list/FlightSort'))
const FlightDateSlide = dynamic(() => import('../components/flight-list/FlightDateSlide'))
const OpenFilterSortMobile = dynamic(() => import('../components/flight-list/OpenFilterSortMobile'))
const FlightItem = dynamic(() => import('../components/flight-list/FlightItem'))
const FlightLoading = dynamic(() => import('../components/flight-list/FlightLoading'))
const FlightCommonInfo = dynamic(() => import('../components/flight-list/FlightCommonInfo'))

interface Props {}

const FlightList: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['common', 'flight', 'notification'])
    let {
        actionType,
        departSelected,
        returnSelected,
        filterByProvider,
        filterByTime,
        sortFlight,
        isInclTaxAndFee,
        isShowPriceEachPassenger,
    } = useSelector((state: any) => {
        return {
            actionType: state.flight.actionType || FlightActionType?.DEPART,
            departSelected: state.flight.departSelected,
            returnSelected: state.flight.returnSelected,
            filterByProvider: state.flight.filterByProvider,
            filterByTime: state.flight.filterByTime,
            sortFlight: state.flight.sortFlight,
            isInclTaxAndFee: state.flight.isInclTaxAndFee,
            isShowPriceEachPassenger: state.flight.isShowPriceEachPassenger,
        }
    })
    // search info from query url
    const [originCode, setOriginCode] = useState<string>('')
    const [destinCode, setDestinCode] = useState<string>('')
    const [departDate, setDepartDate] = useState<Date>(moment().toDate())
    const [returnDate, setReturnDate] = useState<Date>(moment().toDate())
    const [leg, setLeg] = useState<number>(0)
    // session in search
    const [sessionInter, setSessionInter] = useState('')
    const [sessionVN, setSessionVN] = useState<string>('')
    // loading
    const [isLoading, setIsLoading] = useState(true)

    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    // data from api
    const [flights, setFlights] = useState<any[]>([])
    // data after group
    const [departData, setDepartData] = useState<any[]>([])
    const [returnData, setReturnData] = useState<any[]>([])
    // data root after group: for filter and sort
    const [departDataRoot, setDepartDataRoot] = useState<any[]>([])
    const [returnDataRoot, setReturnDataRoot] = useState<any[]>([])

    // fetch data
    useEffect(() => {
        if (
            router.query.hasOwnProperty('ap') &&
            router.query.hasOwnProperty('dt') &&
            router.query.hasOwnProperty('ps')
        ) {
            const parseQuery = parseQueryFlight(router.query)
            const {
                isDomestic,
                adultCount,
                childCount,
                infantCount,
                listFlight,
                originCode,
                destinCode,
                departDate,
                returnDate,
                leg,
            } = parseQuery
            // set data search
            setOriginCode(originCode)
            setDestinCode(destinCode)
            setDepartDate(departDate)
            setReturnDate(returnDate)
            setLeg(leg)
            // clear old data
            setDepartData([])
            setReturnData([])
            setDepartDataRoot([])
            setReturnDataRoot([])
            dispatch(setActionType(FlightActionType.DEPART))
            dispatch(setDepartSelected(null))
            dispatch(setReturnSelected(null))
            // clear filter
            dispatch(setFilterByProvider([]))
            dispatch(setFilterByTime([]))
            // loading
            setIsLoading(true)

            const data = {
                adultCount,
                childCount,
                infantCount,
                viewMode: '',
                // hasPromo: false,
                listFlight: listFlight,
            }
            if (!isDomestic) {
                // international
                setFlights([])
                callApiSearchFlight(data, setFlights, setSessionInter)
            } else {
                // const dataVN = {
                //     ...data,
                //     listFlight: [...listFlight].map((item) => {
                //         return { ...item }
                //     }),
                // }
                setFlights([])

                callApiSearchFlight(data, setFlights, setSessionVN)
            }
        }

        function callApiSearchFlight(data: any, setDataCallBack: any, setSessionCallBack: any) {
            return searchFlight(data)
                .then((res: any) => {
                    setDataCallBack(res && res.status && res.message === 'OK' ? res.listFareData : [])
                    setSessionCallBack(res && res.status && res.message === 'OK' ? res.session : '')
                })
                .catch((err: any) => {
                    setDataCallBack([])
                    setSessionCallBack('')
                    throw err
                })
        }
    }, [router.query])

    // ghép data chuyến nội địa
    useEffect(() => {
        if (Array.isArray(flights) && flights.length > 0) {
            setIsLoading(false)
            const _dep = flights.filter((flight: any) => flight.leg === 0)
            const _ret = flights.filter((flight: any) => flight.leg === 1)
            setDepartData([...departData, ..._dep])
            setDepartDataRoot([...departDataRoot, ..._dep])
            setReturnData([...returnData, ..._ret])
            setReturnDataRoot([...returnDataRoot, ..._ret])
        }
    }, [flights])

    // handle filter, sort
    useEffect(() => {
        let cloneDepart = [...departDataRoot]
        let cloneReturn = [...returnDataRoot]
        // filter by provider
        if (Array.isArray(filterByProvider) && filterByProvider.length > 0) {
            cloneDepart = cloneDepart.filter((item: any) => filterByProvider.includes(item.airline))
            cloneReturn = cloneReturn.filter((item: any) => filterByProvider.includes(item.airline))
        }
        // filter by start time
        if (Array.isArray(filterByTime) && filterByTime.length > 0) {
            cloneDepart = cloneDepart.filter((item: any) =>
                compareTimeFilter(item.listFlight[0]?.startDate, filterByTime)
            )
            cloneReturn = cloneReturn.filter((item: any) =>
                compareTimeFilter(item.listFlight[0]?.startDate, filterByTime)
            )
        }
        // sort
        if (sortFlight || isShowPriceEachPassenger || isInclTaxAndFee) {
            if (sortFlight === 'price_asc') {
                sortFlight += isInclTaxAndFee ? '_taxFee' : '_noTaxFee'
                sortFlight += isShowPriceEachPassenger ? '_one' : '_all'
            }
            cloneDepart = sortFlightByKey(cloneDepart, sortFlight)
            cloneReturn = sortFlightByKey(cloneReturn, sortFlight)
        }
        // set data
        setDepartData(cloneDepart)
        setReturnData(cloneReturn)
    }, [filterByProvider, filterByTime, sortFlight, isShowPriceEachPassenger, isInclTaxAndFee])

    const handleSelectedChange = (data: any) => {
        if (data.leg === 0) {
            dispatch(setDepartSelected(null))
            dispatch(setReturnSelected(null))
            dispatch(setActionType(FlightActionType.DEPART))
        } else {
            dispatch(setReturnSelected(null))
            dispatch(setActionType(FlightActionType.RETURN))
        }
    }

    const handleSelectItem = (data: any) => {
        if (data.leg === 0) {
            dispatch(setDepartSelected(data))
            dispatch(setActionType(leg === 1 ? FlightActionType.RETURN : FlightActionType.FINISH))
        } else {
            dispatch(setReturnSelected(data))
            dispatch(setActionType(FlightActionType.FINISH))
        }
    }

    const handleSubmit = async () => {
        const parseQuery = parseQueryFlight(router.query)
        const {
            isDomestic,
            adultCount,
            childCount,
            infantCount,
            originCode,
            destinCode,
            departDate,
            returnDate,
            leg,
        } = parseQuery
        if (!departSelected) {
            showMessage('error', t('notification:Vui lòng chọn chuyến đi'))
            return
        }
        if (leg === 1 && !returnSelected) {
            showMessage('error', t('notification:Vui lòng chọn chuyến về'))
            return
        }
        if (departSelected && returnSelected) {
            const depStartDate = departSelected.listFlight[0].startDate
            const retStartDate = returnSelected.listFlight[0].startDate
            const diffHour = moment(retStartDate).diff(moment(depStartDate), 'hour')
            if (diffHour < 4) {
                showMessage('error', t('notification:Chuyến đi và chuyến về phải cách nhau ít nhất 4 tiếng'))
                return
            }
        }

        const data: any = {
            departData: departSelected,
            returnData: returnSelected,
            isDomestic,
            adultCount,
            childCount,
            infantCount,
            originCode,
            destinCode,
            departDate,
            returnDate,
            leg,
            sessionInter,
            sessionDomes: {
                VN: sessionVN,
            },
        }
        try {
            setIsLoadingSubmit(true)
            const results = await insertFlightSelected(data)
            setIsLoadingSubmit(false)
            if (results.status === 'success') {
                let flight_token = results.flight_token
                await router.push(PATH_FLIGHT_CHECKOUT_STEP1 + '/' + flight_token)
            }
        } catch (e) {
            setIsLoadingSubmit(false)
            showMessage('error', 'error insert flight info')
            throw e
        }
    }

    return (
        <Layout
            title={'Săn vé máy bay giá rẻ trên Vntrip.vn'}
            description={
                'Đặt vé máy bay giá rẻ tại Vntrip.vn - Săn vé giá rẻ cho chuyến bay của bạn với các hãng bay: VN Airlines, Bamboo, Vietjet và Pacific Airlines chỉ 10s có ngay.'
            }
            keyword={
                'vé máy bay, vé máy bay giá rẻ, mua vé máy bay, săn vé máy bay giá rẻ, đặt vé máy bay giá rẻ, đặt vé máy bay online, vé máy bay vietjet, vé máy bay bambo, vé máy bay jetstar, vé máy bay'
            }
            canonical={process.env.NEXT_PUBLIC_ROOT_DOMAIN + '/tim-ve-may-bay'}
        >
            <section className="flightList">
                <div className="flightList__search">
                    <div className="flightList__search__backdrop" />
                    <div className="vntSearch">
                        <div className="container">
                            <div className="vntSearch__body">
                                <div className="vntSearch__main">
                                    <SearchBoxFlight isShow={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* flightList__tab show bottom mobile*/}
                <OpenFilterSortMobile />

                <div className="flightList__body">
                    <div className="container">
                        <div className="flightList__left">
                            <FlightFilter />
                        </div>
                        <div className="flightList__right">
                            {/* -----START SELECT FLIGHT----- */}
                            <div className="flightActive">
                                {departSelected && (
                                    <div className="flightActive__item">
                                        <p className="flightActive__title">{t('flight:Chuyến đi')}</p>
                                        <FlightCommonInfo
                                            originCode={departSelected.listFlight[0].startPoint}
                                            destinCode={departSelected.listFlight[0].endPoint}
                                            departDate={departSelected.listFlight[0].startDate}
                                        />
                                        <FlightItem
                                            data={departSelected}
                                            index={0}
                                            handleSelectedChange={handleSelectedChange}
                                        />
                                    </div>
                                )}

                                {returnSelected && (
                                    <div className="flightActive__item">
                                        <p className="flightActive__title">{t('flight:Chuyến về')}</p>
                                        <FlightCommonInfo
                                            originCode={returnSelected.listFlight[0].startPoint}
                                            destinCode={returnSelected.listFlight[0].endPoint}
                                            departDate={returnSelected.listFlight[0].startDate}
                                        />
                                        <FlightItem
                                            data={returnSelected}
                                            index={1}
                                            handleSelectedChange={handleSelectedChange}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* -----END SELECT FLIGHT----- */}

                            <div className="flightGroup">
                                {actionType !== FlightActionType.FINISH && <FlightSort />}

                                {/* header chiều đi */}
                                {actionType === FlightActionType.DEPART && (
                                    <div className="flightGroup__header">
                                        <p className="size-16 semibold">{t('flight:Chọn chuyến bay đi')}</p>
                                        <FlightCommonInfo
                                            originCode={actionType === 0 ? originCode : destinCode}
                                            destinCode={actionType === 0 ? destinCode : originCode}
                                            departDate={departDate}
                                        />
                                        <FlightDateSlide
                                            currentDate={departDate}
                                            startPoint={originCode}
                                            endPoint={destinCode}
                                            leg={0}
                                        />
                                    </div>
                                )}

                                {/* header chiều về */}
                                {actionType === FlightActionType.RETURN && (
                                    <div className="flightGroup__header">
                                        <p className="size-16 semibold">{t('flight:Chọn chuyến bay về')}</p>
                                        <FlightCommonInfo
                                            originCode={destinCode}
                                            destinCode={originCode}
                                            departDate={returnDate}
                                        />
                                        <FlightDateSlide
                                            currentDate={returnDate}
                                            startPoint={destinCode}
                                            endPoint={originCode}
                                            leg={1}
                                        />
                                    </div>
                                )}

                                <div className="flightGroup__body">
                                    {isLoading && <FlightLoading />}

                                    {actionType === FlightActionType.DEPART &&
                                        departData.map((item, index) => {
                                            return (
                                                <FlightItem
                                                    key={`flight_depart_${index}`}
                                                    data={item}
                                                    index={index}
                                                    handleSelectItem={handleSelectItem}
                                                />
                                            )
                                        })}

                                    {/*
                                        leg === 1:          vé 2 chiều,
                                        actionType === 1:   vé hiện tại chọn là chiều về
                                    */}
                                    {leg === 1 &&
                                        actionType === FlightActionType.RETURN &&
                                        returnData.map((item, index) => {
                                            return (
                                                <FlightItem
                                                    key={`flight_return_${index}`}
                                                    data={item}
                                                    index={index}
                                                    handleSelectItem={handleSelectItem}
                                                />
                                            )
                                        })}
                                </div>
                            </div>
                            <div className="flightList__btn">
                                <Button
                                    size={'large'}
                                    type="primary"
                                    className="btn_orange"
                                    onClick={handleSubmit}
                                    loading={isLoadingSubmit}
                                >
                                    <span>{t('Tiếp tục')}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {
            // namespacesRequired: ['common', 'flight'],
        }, // will be passed to the page component as props
    }
}

export default FlightList
// export default withTranslation(['common', 'flight'])(FlightList)
