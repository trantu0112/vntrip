import React, { memo, useEffect } from 'react'
import { IconClose } from '../../constants/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
    setOpenFilterMobile,
    setFilterByProvider,
    setFilterByTime,
    setIncludeTaxAndFee,
    setIsShowPriceEachPassenger,
} from '../../store/flight/action'
import { toggleClassNoScroll } from '../../utils/common'
import { LIST_FILTER_PROVIDER_FLIGHT, LIST_FILTER_TIME_FLIGHT } from '../../constants/flight'

const FlightFilter = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common, flight'])
    const { isOpen, filterByProvider, filterByTime, isInclTaxAndFee, isShowPriceEachPassenger } = useSelector(
        (state: any) => {
            return {
                isOpen: state.flight.isOpenFilterMobile,
                filterByProvider: state.flight.filterByProvider || [],
                filterByTime: state.flight.filterByTime || [],
                isInclTaxAndFee: state.flight.isInclTaxAndFee || false,
                isShowPriceEachPassenger: state.flight.isShowPriceEachPassenger || false,
            }
        }
    )

    useEffect(() => {
        // mặc định set include tax and fee
        dispatch(setIncludeTaxAndFee(true))
    }, [])

    const closeFilter = () => {
        // for mobile
        dispatch(setOpenFilterMobile(false))
        toggleClassNoScroll('remove')
    }

    const onChangeProvider = (checked: boolean, value: string) => {
        if (checked) {
            dispatch(setFilterByProvider([...filterByProvider, value]))
        } else {
            dispatch(setFilterByProvider(filterByProvider.filter((item: string) => item !== value)))
        }
        closeFilter() // close on mobile
    }

    const onChangeTime = (checked: boolean, value: string) => {
        if (checked) {
            dispatch(setFilterByTime([...filterByTime, value]))
        } else {
            dispatch(setFilterByTime(filterByTime.filter((item: string) => item !== value)))
        }
        closeFilter() // close on mobile
    }

    const onChangePriceOneOrAllPassenger = (isShowOne: boolean) => {
        dispatch(setIsShowPriceEachPassenger(isShowOne))
        closeFilter() // close on mobile
    }

    const onChangeInclVatAndFee = (checked: boolean) => {
        dispatch(setIncludeTaxAndFee(checked))
        closeFilter() // close on mobile
    }

    const resetFilter = () => {
        dispatch(setIncludeTaxAndFee(true))
        dispatch(setIsShowPriceEachPassenger(false))
        dispatch(setFilterByProvider([]))
        dispatch(setFilterByTime([]))
    }

    return (
        <div className={`filterBox ${isOpen ? 'open' : ''}`}>
            <div className="headerPopup">
                <p>{t('common: Bộ lọc')}</p>
                <button type="button" className="headerPopup__close" onClick={closeFilter}>
                    <IconClose />
                </button>
            </div>
            <div className="filterBox__body">
                <div className="filterBox__group">
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('common:Xem giá')}</p>
                        <div className="filterBox__cont">
                            <div className="radio">
                                <input
                                    name="showPriceEachOrAll"
                                    id="eachPassenger"
                                    type="radio"
                                    checked={isShowPriceEachPassenger}
                                    value={'one'}
                                    onChange={() => onChangePriceOneOrAllPassenger(true)}
                                />
                                <label htmlFor="eachPassenger">{t('flight:Mỗi hành khách')}</label>
                            </div>
                            <div className="radio">
                                <input
                                    name="showPriceEachOrAll"
                                    id="allPassenger"
                                    type="radio"
                                    checked={!isShowPriceEachPassenger}
                                    value={'all'}
                                    onChange={() => onChangePriceOneOrAllPassenger(false)}
                                />
                                <label htmlFor="allPassenger">{t('flight:Tất cả hành khách')}</label>
                            </div>
                            <div className="filterBox__tax">
                                <div className="checkbox">
                                    <input
                                        id="vatAndFee"
                                        type="checkbox"
                                        checked={isInclTaxAndFee}
                                        onChange={(event) => onChangeInclVatAndFee(event.target.checked)}
                                    />
                                    <label htmlFor="vatAndFee">{t('common:Bao gồm thuế phí')}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('flight:Hãng hàng không')}</p>
                        <div className="filterBox__cont">
                            {LIST_FILTER_PROVIDER_FLIGHT.map((provider) => {
                                return (
                                    <div className="checkbox" key={provider.key}>
                                        <input
                                            name={'filter_provider'}
                                            id={`provider_${provider.key}`}
                                            type="checkbox"
                                            checked={
                                                Array.isArray(filterByProvider) &&
                                                filterByProvider.includes(provider.key)
                                            }
                                            value={provider.key}
                                            onChange={(event) =>
                                                onChangeProvider(event.target.checked, event.target.value)
                                            }
                                        />
                                        <label htmlFor={`provider_${provider.key}`}>{provider.label}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('flight:Thời gian bay')}</p>
                        <div className="filterBox__cont">
                            {LIST_FILTER_TIME_FLIGHT.map((item) => {
                                return (
                                    <div className="checkbox" key={item.key}>
                                        <input
                                            name={'filter_time'}
                                            id={item.key}
                                            type="checkbox"
                                            checked={Array.isArray(filterByTime) && filterByTime.includes(item.key)}
                                            value={item.key}
                                            onChange={(event) => onChangeTime(event.target.checked, event.target.value)}
                                        />
                                        <label htmlFor={item.key}>{t(`flight:${item.label}`)}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <button type="button" className="btnLink filterBox__reset" onClick={resetFilter}>
                    <span>{t('common:Đặt lại bộ lọc')}</span>
                </button>
            </div>
        </div>
    )
}

export default memo(FlightFilter)
