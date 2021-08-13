import React, { useState, useEffect, memo } from 'react'
import moment from 'moment'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { IconClose } from '../../constants/icons'
import { searchDay } from '../../api/flight-services'
import { YYYYMMDD } from '../../constants/common'
import DisplayPrice from '../common/DisplayPrice'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenDateSlideMobile } from '../../store/flight/action'
import { toggleClassNoScroll } from '../../utils/common'
import { useRouter } from 'next/router'

interface iProps {
    currentDate: Date
    startPoint: string
    endPoint: string
    leg: number
}

const FlightDateSlide: React.FC<iProps> = ({ currentDate, startPoint, endPoint }) => {
    const router = useRouter()
    const { t, i18n } = useTranslation(['flight', 'common'])
    const dispatch = useDispatch()
    const { isOpen, isInclTaxAndFee, departSelected, returnSelected } = useSelector((state: any) => {
        return {
            isOpen: state.flight.isOpenDateSlideMobile,
            isInclTaxAndFee: state.flight.isInclTaxAndFee,
            departSelected: state.flight.departSelected,
            returnSelected: state.flight.returnSelected,
        }
    })
    const [listDate, setListDate] = useState<any[]>([])
    const [listPriceData, setListPriceData] = useState<any[]>([])
    const [middleDate, setMiddleDate] = useState<Date>(moment().toDate()) // moment type
    const [disablePrev, setDisablePrev] = useState<boolean>(false)
    const [disableNext, setDisableNext] = useState<boolean>(false)

    useEffect(() => {
        setMiddleDate(moment(currentDate).toDate())
    }, [currentDate])

    useEffect(() => {
        async function fetchData(_date: Date, _startPoint: string, _endPoint: string) {
            try {
                const fromDate = moment(_date).add(-3, 'day').toDate()
                const toDate = moment(_date).add(3, 'day').toDate()
                const response = await searchDay({
                    start_point: _startPoint,
                    end_point: _endPoint,
                    from_date: moment(fromDate).format('YYYY-MM-DD'),
                    to_date: moment(toDate).format('YYYY-MM-DD'),
                    is_simple: true,
                })
                const data = response.data.map((item: any) => {
                    item.dateFomated = moment(item.DepartDate).format(YYYYMMDD)
                    return item
                })
                const arrSearchMin = [-3, -2, -1, 0, 1, 2, 3].map((item) => {
                    const date = moment(_date).add(item, 'day')
                    const filterByDate = data
                        .filter((d: any) => d.dateFomated === date.format(YYYYMMDD))
                        .sort((item1: any, item2: any) => item1['TotalPrice'] - item2['TotalPrice'])
                    return filterByDate.length > 0
                        ? {
                              key: filterByDate[0]['dateFomated'],
                              totalPrice: filterByDate[0]['TotalPrice'],
                              totalNetPrice: filterByDate[0]['TotalNetPrice'],
                          }
                        : null
                })
                setListPriceData(arrSearchMin)
            } catch (err) {
                throw err
            }
        }

        if (currentDate && startPoint && endPoint) {
            fetchData(currentDate, startPoint, endPoint)
        }
    }, [startPoint, endPoint, currentDate])

    useEffect(() => {
        if (middleDate) {
            const isSameOrBefore = moment(middleDate).startOf('day').isSameOrBefore(moment())
            setDisablePrev(isSameOrBefore)
        }
    }, [middleDate])

    useEffect(() => {
        let _list = []
        for (let i = -3; i <= 3; i++) {
            const date = moment(middleDate).add(i, 'day').startOf('day')
            const objMin: any =
                Array.isArray(listPriceData) && listPriceData.length > 0
                    ? listPriceData.find((item) => item && item.key === date.format(YYYYMMDD))
                    : null
            _list.push({
                key: i,
                dayOfWeek: date.locale(i18n.language === 'vi' ? 'vi' : 'en-gb').format('dddd'),
                dateFormated: date.locale(i18n.language === 'vi' ? 'vi' : 'en-gb').format('ddd, DD/MM'),
                date,
                active: date.format(YYYYMMDD) === moment(currentDate).format(YYYYMMDD),
                disabled: date.isBefore(moment().startOf('day')),
                totalPrice: objMin?.totalPrice,
                totalNetPrice: objMin?.totalNetPrice,
            })
        }

        setListDate(_list)
    }, [middleDate, listPriceData])

    // close mobile
    const handleClose = () => {
        dispatch(setOpenDateSlideMobile(false))
        toggleClassNoScroll('remove')
    }

    const handleNextAndPrev = async (type: 'prev' | 'next') => {
        // disable button
        type === 'prev' ? setDisablePrev(true) : setDisableNext(true)
        setMiddleDate((prevState) =>
            moment(prevState)
                .add(type === 'prev' ? -1 : 1, 'day')
                .toDate()
        )
        const diffDay = type === 'prev' ? -4 : 4 // diff day to call api
        const _date = moment(middleDate).add(diffDay, 'day').startOf('day')
        const condition =
            moment(_date).isSameOrAfter(moment()) &&
            !listPriceData.map((item) => item.key).includes(_date.format(YYYYMMDD))
        if (condition) {
            const response = await searchDay({
                start_point: startPoint,
                end_point: endPoint,
                from_date: moment(_date).format('YYYY-MM-DD'),
                to_date: moment(_date).format('YYYY-MM-DD'),
                is_simple: true,
            })
            const afterSort = response.data.sort((item1: any, item2: any) => item1['TotalPrice'] - item2['TotalPrice'])
            const flight = afterSort[0] ? afterSort[0] : null
            if (type === 'prev') {
                setListPriceData([
                    {
                        key: _date.format(YYYYMMDD),
                        totalPrice: flight?.TotalPrice || null,
                        totalNetPrice: flight?.TotalNetPrice || null,
                    },
                    ...listPriceData,
                ])
            } else {
                setListPriceData([
                    ...listPriceData,
                    {
                        key: _date.format(YYYYMMDD),
                        totalPrice: flight?.TotalPrice || null,
                        totalNetPrice: flight?.TotalNetPrice || null,
                    },
                ])
            }
        }
        type === 'prev' ? setDisablePrev(false) : setDisableNext(false)
    }

    const handleClickItem = (data: any) => () => {
        const dt = router.query.dt || moment().format(YYYYMMDD) + '.' + moment().add(1, 'day').format(YYYYMMDD)
        const diffDay = moment(dt.slice(9, 17), YYYYMMDD).diff(moment(dt.slice(0, 8), YYYYMMDD), 'day')
        const newStartDate = data.date.format(YYYYMMDD)
        const newEndDate = data.date.add(diffDay, 'day').format(YYYYMMDD)
        if (departSelected || returnSelected) {
            Modal.confirm({
                title: t('Tìm kiếm lại') + '?',
                content: t('Chuyến bay bạn vừa chọn sẽ không được lưu lại, bạn có chắc chắn muốn tiếp tục') + '?',
                okText: t('common:Tiếp tục'),
                cancelText: t('common:Hủy'),
                onOk: () => {
                    changeQueryRouter({ ...router.query, dt: newStartDate + '.' + newEndDate })
                },
            })
        } else {
            changeQueryRouter({ ...router.query, dt: newStartDate + '.' + newEndDate })
        }
    }

    const changeQueryRouter = (queryObj: any) => {
        router.push(
            {
                pathname: '/tim-ve-may-bay',
                query: queryObj,
            },
            undefined,
            { shallow: true } // allow handle change query in useEffect  https://nextjs.org/docs/routing/shallow-routing
        )
    }

    return (
        <div className={`flightGroup__date ${isOpen ? 'open' : ''}`}>
            <div className="flightGroup__date__main">
                <div className="headerPopup">
                    <p>{t('common:Đổi ngày')}</p>
                    <button type="button" className="headerPopup__close" onClick={handleClose}>
                        <IconClose />
                    </button>
                </div>
                <div className="flightDate">
                    <div className={`flightDate__arrow ${disablePrev ? 'disabled' : ''}`}>
                        <button
                            type="button"
                            className={'slick-prev slick-arrow'}
                            onClick={() => handleNextAndPrev('prev')}
                        >
                            Previous
                        </button>
                    </div>
                    <div className="flightDate__slide">
                        {listDate.map((item) => {
                            return (
                                <div
                                    className={`flightDate__item ${item.disabled ? 'disabled' : ''} ${
                                        item.active ? 'active' : ''
                                    }`}
                                    key={item.key}
                                >
                                    <button type="button" className="flightDate__btn" onClick={handleClickItem(item)}>
                                        <p className="p1">{item.dateFormated}</p>
                                        <p className="semibold">
                                            {item.disabled ? (
                                                'N/A'
                                            ) : item.totalPrice ? (
                                                <DisplayPrice
                                                    price={item[isInclTaxAndFee ? 'totalPrice' : 'totalNetPrice']}
                                                />
                                            ) : (
                                                <i className="fas fa-spinner"></i>
                                            )}
                                        </p>
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <div className={`flightDate__arrow ${disableNext ? 'disabled' : ''}`}>
                        <button
                            type="button"
                            className={'slick-next slick-arrow'}
                            onClick={() => handleNextAndPrev('next')}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div
                role="button"
                tabIndex={0}
                className="flightGroup__date__backdrop"
                onClick={handleClose}
                onKeyUp={handleClose}
            />
        </div>
    )
}

export default memo(FlightDateSlide)
