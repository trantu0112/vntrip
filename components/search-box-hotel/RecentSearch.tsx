import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { convertRegionType } from '../../utils/hotel'
import { getRecentSearch } from '../../utils/common'
import { useRouter } from 'next/router'

interface Props {
    handleSelectedItem?: any
}

const RecentSearch: React.FC<Props> = () => {
    const router = useRouter()
    const { t, i18n } = useTranslation(['hotel'])
    const [recentSearch, setRecentSearch] = useState([])
    useEffect(() => {
        setRecentSearch(getRecentSearch())
    }, [])

    const handleSelectedItem = (item: any) => {
        router.push({
            pathname: item.pathname,
            query: item.queryObj,
        })
    }

    if (Array.isArray(recentSearch) && recentSearch.length > 0) {
        return (
            <>
                <p className="suggestDefault__title">{t('Tìm kiếm gần đây')}</p>
                <ul className="listPlace">
                    {recentSearch.map((item: any) => {
                        return (
                            <li key={`recent-search-${item.regionId}`} className="listPlace__item">
                                <button
                                    onClick={() => {
                                        handleSelectedItem(item)
                                    }}
                                >
                                    <div className="listPlace__text">
                                        <p className="p1">
                                            {i18n.language === 'vi' ? item.regionNameVi : item.regionName}
                                        </p>
                                    </div>
                                    <div className="listPlace__label">{t(convertRegionType(item.regiontype))}</div>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
    return null
}

export default RecentSearch
