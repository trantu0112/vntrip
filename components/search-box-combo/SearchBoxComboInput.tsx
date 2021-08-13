// @ts-ignore
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input } from 'antd'
import { ACTIVE_ROUTE, DOMESTIC_AIRPORT, ORIGIN_AIRPORT } from '../../constants/combo'
import { useDispatch, useSelector } from 'react-redux'
import { setListAirPortReturn } from '../../store/combo/action'
import { getNamePointFromCode } from '../../utils/combo'
import { ValidationForm } from '../../constants/interface'
interface Props {
    title: string
    type: 'departure' | 'return'
    code: string
    placeholder: string
    validatePoint: ValidationForm
    handleChangeCode: any
    clearValidate: any
}
// @ts-ignore
const SearchBoxComboInput: React.FC<Props> = ({
    title,
    type,
    code,
    placeholder,
    validatePoint,
    handleChangeCode,
    clearValidate,
}) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [valueInput, setValueInPut] = useState<string>('')
    const [listAirPort, setListAirPort] = useState<any[]>([])
    const [dataAirPort, setDataAirPort] = useState<any[]>([])
    const [listCurrentReturn, setListCurrentReturn] = useState<any[]>([])
    const [listCurrent, setListCurrent] = useState<any[]>([])
    const defaultAirPort = useRef<any>(null)
    const { listAirPortReturn } = useSelector((state: any) => {
        return {
            listAirPortReturn: state.combo.listAirPortReturn || [],
        }
    })
    const toggleSearchInput = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getListAirPort()
    }, [])

    // set Name for point
    useEffect(() => {
        if (code?.length > 0) {
            setValueInPut(getNamePointFromCode(code))
        } else {
            setValueInPut('')
        }
    }, [code])

    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClickOutSidePassenger)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutSidePassenger)
        }
    }, [listAirPort])

    // render list airport when onchange inout
    useEffect(() => {
        getDataListAirPort(type)
    }, [listCurrent, listCurrentReturn])

    const handleClickOutSidePassenger = (event: any) => {
        if (defaultAirPort?.current?.contains(event.target)) {
            // inside click
            return
        }
        // outside click
        if (!code && valueInput) {
            handleChangeCode(type, listAirPort?.[0]?.code)
            if (type === 'departure') {
                const dataList = DOMESTIC_AIRPORT.filter((res: any) => {
                    return ACTIVE_ROUTE?.[listAirPort?.[0]?.code]?.indexOf(res.code) !== -1
                })
                dispatch(setListAirPortReturn(dataList))
            }
        } else if (code) {
            handleChangeCode(type, code)
            setValueInPut(getNamePointFromCode(code))
            if (type === 'departure') {
                const dataList = DOMESTIC_AIRPORT.filter((res: any) => {
                    return ACTIVE_ROUTE?.[code]?.indexOf(res.code) !== -1
                })
                dispatch(setListAirPortReturn(dataList))
            }
        }
        setIsOpen(false) // close dropdown
    }

    const getListAirPort = () => {
        try {
            const dataList = DOMESTIC_AIRPORT.filter((res: any) => {
                return ORIGIN_AIRPORT.indexOf(res.code) !== -1
            })
            setDataAirPort(dataList)
        } catch (e) {
            throw e
        }
    }

    const handleClickOpen = () => {
        type === 'departure' ? setListCurrent(dataAirPort) : setListCurrentReturn([])
        setIsOpen(true)
        clearValidate()
    }

    const handleChangeInput = async (event: any) => {
        setValueInPut(event.target.value)
        const keyword = event.target.value.trim()

        if (keyword.length === 0) {
            handleChangeCode(type, '')
        }
    }

    const handleClickItem = async (code: string, type: string) => {
        setIsOpen(false)
        handleChangeCode(type, code)
        setValueInPut(getNamePointFromCode(code))
        if (type === 'departure') {
            const dataList = DOMESTIC_AIRPORT.filter((res: any) => {
                return ACTIVE_ROUTE[code].indexOf(res.code) !== -1
            })
            dispatch(setListAirPortReturn(dataList))
        }
    }

    const handleKeyup = (e: any, type: string) => {
        const keyword = e.target.value.toLowerCase()
        setIsOpen(true)
        let list = []
        if (type === 'return') {
            if (listAirPortReturn.length > 0) {
                list = listAirPortReturn.filter((item: any) => {
                    return item.key.indexOf(keyword) !== -1
                })
            } else {
                list = dataAirPort.filter((item: any) => {
                    return item.key.indexOf(keyword) !== -1
                })
            }
            setListCurrentReturn(list)
        } else {
            list = dataAirPort.filter((item) => {
                return item.key.indexOf(keyword) !== -1
            })
            setListCurrent(list)
        }
    }

    const getDataListAirPort = (type: string) => {
        let result: any = []
        if (type === 'return') {
            if (listCurrentReturn.length > 0) {
                result = listCurrentReturn
            } else {
                if (listAirPortReturn?.length > 0) {
                    result = listAirPortReturn
                } else {
                    result = dataAirPort
                }
            }
        } else {
            if (listCurrent.length > 0) {
                result = listCurrent
            } else {
                result = dataAirPort
            }
        }
        setListAirPort(result)
    }

    return (
        <div className="placeInput" ref={defaultAirPort}>
            <p className="semibold size-16">{title}?</p>
            <Form.Item validateStatus={validatePoint.status} help={validatePoint.text}>
                <div className="inputInline">
                    <Input
                        type="text"
                        value={valueInput}
                        placeholder={placeholder}
                        className="form-control"
                        onKeyUp={(e) => handleKeyup(e, type)}
                        onChange={handleChangeInput}
                        onClick={handleClickOpen}
                    />
                    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.2125 12.3516L9.15469 8.29375C9.78438 7.47969 10.125 6.48438 10.125 5.4375C10.125 4.18438 9.63594 3.00937 8.75156 2.12344C7.86719 1.2375 6.68906 0.75 5.4375 0.75C4.18594 0.75 3.00781 1.23906 2.12344 2.12344C1.2375 3.00781 0.75 4.18438 0.75 5.4375C0.75 6.68906 1.23906 7.86719 2.12344 8.75156C3.00781 9.6375 4.18438 10.125 5.4375 10.125C6.48438 10.125 7.47813 9.78438 8.29219 9.15625L12.35 13.2125C12.3619 13.2244 12.376 13.2338 12.3916 13.2403C12.4071 13.2467 12.4238 13.2501 12.4406 13.2501C12.4575 13.2501 12.4741 13.2467 12.4897 13.2403C12.5052 13.2338 12.5194 13.2244 12.5312 13.2125L13.2125 12.5328C13.2244 12.5209 13.2338 12.5068 13.2403 12.4912C13.2467 12.4757 13.2501 12.459 13.2501 12.4422C13.2501 12.4254 13.2467 12.4087 13.2403 12.3931C13.2338 12.3776 13.2244 12.3635 13.2125 12.3516ZM7.9125 7.9125C7.25 8.57344 6.37187 8.9375 5.4375 8.9375C4.50312 8.9375 3.625 8.57344 2.9625 7.9125C2.30156 7.25 1.9375 6.37187 1.9375 5.4375C1.9375 4.50312 2.30156 3.62344 2.9625 2.9625C3.625 2.30156 4.50312 1.9375 5.4375 1.9375C6.37187 1.9375 7.25156 2.3 7.9125 2.9625C8.57344 3.625 8.9375 4.50312 8.9375 5.4375C8.9375 6.37187 8.57344 7.25156 7.9125 7.9125Z"
                            fill="#8C8C8C"
                        />
                    </svg>
                </div>
            </Form.Item>
            <div className={`suggestDefault ${isOpen ? 'open' : ''}`}>
                <div className="suggestDefault__header">
                    <div className="suggestDefault__input">
                        <Input value={code} type="text" placeholder={placeholder} className="form-control" />
                    </div>
                    <button onClick={toggleSearchInput} type="button" className="suggestDefault__close">
                        <svg width={14} height={14} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.4434 1.44332L9.91017 9.91009"
                                stroke="#fff"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                            <path
                                d="M10.1464 1.44332L1.67967 9.91009"
                                stroke="#fff"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="suggestDefault__body">
                    <div className="flightDefault">
                        <div className="flightDefault__body">
                            <div className="flightDefault__content">
                                <ul className="flightDefault__list">
                                    {listAirPort.map((item: any) => {
                                        return (
                                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                                            <li key={item?.code} onClick={() => handleClickItem(item?.code, type)}>
                                                <button type="button">{item.province_name}</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
// @ts-ignore
export default SearchBoxComboInput
