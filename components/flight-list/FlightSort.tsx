import React, { memo } from 'react'
import { IconClose } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenSortMobile, setSortFlight } from '../../store/flight/action'
import { toggleClassNoScroll } from '../../utils/common'
import { LIST_SORT_FLIGHT } from '../../constants/flight'

const FlightSort = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'flight'])
    const { isOpen, sortFlight } = useSelector((state: any) => {
        return {
            isOpen: state.flight.isOpenSortMobile,
            sortFlight: state.flight.sortFlight,
        }
    })

    const closeSort = () => {
        // for mobile
        dispatch(setOpenSortMobile(false))
        toggleClassNoScroll('remove')
    }

    const onChangeSort = (value: string) => {
        dispatch(setSortFlight(value))
        closeSort()
    }

    return (
        <div className={`flightSort ${isOpen ? 'open' : ''}`}>
            <div
                role={'button'}
                tabIndex={0}
                className="flightSort__backdrop"
                onClick={closeSort}
                onKeyUp={closeSort}
            />
            <div className="flightSort__main">
                <div className="headerPopup">
                    <p>{t('Sắp xếp')}</p>
                    <button type="button" className="headerPopup__close" onClick={closeSort}>
                        <IconClose />
                    </button>
                </div>
                <div className="flightSort__cont">
                    <ul>
                        <li className="liTitle">
                            <p className="semibold size-16 mb0">{t('Sắp xếp theo')}:</p>
                        </li>
                        {LIST_SORT_FLIGHT.map((item) => {
                            return (
                                <li key={item.key}>
                                    <div className="radio">
                                        <input
                                            name="sort_flight"
                                            id={`sort_${item.key}`}
                                            type="radio"
                                            checked={sortFlight === item.key}
                                            value={item.key}
                                            onChange={(event) => onChangeSort(event.target.value)}
                                        />
                                        <label htmlFor={`sort_${item.key}`}>{t(`flight:${item.label}`)}</label>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default memo(FlightSort)
