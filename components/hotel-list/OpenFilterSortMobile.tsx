import React from 'react'
import { IconFilter, IconMap, IconSort } from '../../constants/icons'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleClassNoScroll } from '../../utils/common'
import { setOpenFilterMobile, setOpenSortMobile } from '../../store/hotel/action'

interface Props {
    handleSwitchMap: () => void
}

const OpenFilterSortMobile: React.FC<Props> = ({ handleSwitchMap }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const openFilterMobile = () => {
        dispatch(setOpenFilterMobile(true))
        toggleClassNoScroll('add')
    }

    const openSortMobile = () => {
        dispatch(setOpenSortMobile(true))
        toggleClassNoScroll('add')
    }

    return (
        <div className="hotelList__tab">
            <ul>
                <li>
                    <button onClick={handleSwitchMap}>
                        <IconMap />
                        <span>{t('Bản đồ')}</span>
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
