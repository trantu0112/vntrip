import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { IconClose } from '../../constants/icons'
import { toggleSortDeal } from '../../store/common/action'
import { useTranslation } from 'react-i18next'
import { toggleClassNoScroll } from '../../utils/common'
import * as queryString from 'query-string'
import { PATH_DEAL_LIST } from '../../constants/common'

const DealSort = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['common'])
    const isOpenSortDeal = useSelector((state: any) => state.common.isOpenSortDeal)

    const handleCloseSort = () => {
        dispatch(toggleSortDeal(false)) // close sort on mobilee
        toggleClassNoScroll('remove')
    }

    const handleChangeSort = (sort_by: string) => {
        const new_query: any = { ...router.query, sort: sort_by }
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_DEAL_LIST}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
        handleCloseSort()
    }

    return (
        <div className={`hotelSort ${isOpenSortDeal ? 'open' : ''}`}>
            <div
                className="hotelSort__backdrop"
                onClick={handleCloseSort}
                role={'button'}
                tabIndex={0}
                onKeyUp={handleCloseSort}
            />
            <div className="hotelSort__main">
                <div className="headerPopup">
                    <p>{t('Sắp xếp')}</p>
                    <button type="button" className="headerPopup__close" onClick={handleCloseSort}>
                        <IconClose />
                    </button>
                </div>
                <div className="hotelSort__cont">
                    <div className="hotelSort__flex">
                        <p className="semibold size-16 mb0 pTitle">{t('Sắp xếp')}</p>
                        <div className="hotelSort__group">
                            {[
                                { key: 'hot', label: 'Nổi bật' },
                                { key: 'best_selling', label: 'Bán chạy' },
                                { key: 'best_price', label: 'Giá tốt' },
                            ].map((item) => {
                                return (
                                    <div className="radio" key={item.key}>
                                        <input
                                            id={`sort_by_${item.key}`}
                                            type="radio"
                                            name="sortDeal"
                                            checked={router.query.sort === item.key}
                                            onChange={(event) => handleChangeSort(event.target.value)}
                                            value={item.key}
                                        />
                                        <label htmlFor={`sort_by_${item.key}`}>{t(item.label)}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DealSort
