import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { IconDate, IconFilter, IconSort } from '../../constants/icons'
import { toggleClassNoScroll } from '../../utils/common'
import { setOpenDateSlideMobile, setOpenFilterMobile, setOpenSortMobile } from '../../store/flight/action'

const OpenFilterSortMobile = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('common')

    const openFilterMobile = () => {
        dispatch(setOpenFilterMobile(true))
        toggleClassNoScroll('add')
    }

    const openSortMobile = () => {
        dispatch(setOpenSortMobile(true))
        toggleClassNoScroll('add')
    }

    const openDateSlideMobile = () => {
        dispatch(setOpenDateSlideMobile(true))
        toggleClassNoScroll('add')
    }
    return (
        <div className="flightList__tab">
            <ul>
                <li>
                    <button type="button" className="btnChangeDate" onClick={openDateSlideMobile}>
                        <IconDate />
                        <span>{t('Đổi ngày')}</span>
                    </button>
                </li>
                <li>
                    <button type="button" className="btnFilter" onClick={openFilterMobile}>
                        <IconFilter />
                        <span>{t('Lọc')}</span>
                    </button>
                </li>
                <li>
                    <button type="button" className="btnSort" onClick={openSortMobile}>
                        <IconSort />
                        <span>{t('Sắp xếp')}</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default OpenFilterSortMobile
