import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Input } from 'antd'
import { IconClose } from '../../constants/icons'
import { DEAL_FILTER } from '../../constants/enums'
import { getDealCategoryByType } from '../../api/common-services'
import { convertUnicode } from '../../utils/common'
import { toggleFilterDeal } from '../../store/common/action'
import { HOTEL_FILTER_STAR } from '../../constants/hotel'
import { DEAL_FILTER_BY_PERCENT, PATH_DEAL_LIST, DEAL_FILTER_BY_PRICE } from '../../constants/common'
import * as queryString from 'query-string'
import RenderStarRate from '../hotel-list/RenderStarRate'

const DealFilter = () => {
    const { t } = useTranslation(['common', 'flight', 'hotel', 'payment'])
    const dispatch = useDispatch()
    const router = useRouter()
    const isOpenFilterDeal = useSelector((state: any) => state.common.isOpenFilterDeal)
    const [listCateg, setListCateg] = useState<any[]>([])
    const [listTopic, setListTopic] = useState<any[]>([])
    const [listDesti, setListDesti] = useState<any[]>([])
    const [rootDesti, setRootDesti] = useState<any[]>([])
    const [isShowAllCateg, setIsShowAllCateg] = useState<boolean>(false)
    const [isShowAllTopic, setIsShowAllTopic] = useState<boolean>(false)
    const [isShowAllDesti, setIsShowAllDesti] = useState<boolean>(false)

    useEffect(() => {
        async function fechtCategory() {
            try {
                const [categ, topic, desti] = await Promise.all([
                    getDealCategoryByType('deal_category').then((res) => (res.status === 'success' ? res.data : [])),
                    getDealCategoryByType('deal_topic').then((res) => (res.status === 'success' ? res.data : [])),
                    getDealCategoryByType('deal_destination').then((res) => (res.status === 'success' ? res.data : [])),
                ])
                setListCateg(categ)
                setListTopic(topic)
                setListDesti(desti)
                setRootDesti(desti)
            } catch (e) {
                throw e
            }
        }

        fechtCategory()
    }, [])

    const toggleShowAllCate = () => {
        setIsShowAllCateg((prevState) => !prevState)
    }

    const toggleShowAllTopic = () => {
        setIsShowAllTopic((prevState) => !prevState)
    }

    const toggleShowAllDesti = () => {
        setIsShowAllDesti((prevState) => !prevState)
    }

    const handleChangeFilter = (type: string) => (checked: boolean) => (value: string) => {
        let _array: string[] = router.query[type] ? String(router.query[type]).split(',') : []
        if (checked) {
            _array.push(value)
        } else {
            // unchecked => remove value filter from current array
            let index = _array.indexOf(value)
            if (index !== -1) _array.splice(index, 1)
        }
        // clone all query from old url, set [type] = null to skipNull
        const new_query: any = { ...router.query, [type]: _array.join(',') || null }
        delete new_query.page // reset page when filter
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_DEAL_LIST}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }

    const handleCloseFilter = () => {
        dispatch(toggleFilterDeal(false)) // close filter on mobilee
    }

    // search destination by keyword
    const handleSearchDestination = (keyword: string) => {
        const results = rootDesti.filter((item) => {
            const name = convertUnicode(item.name)
            const keywordToUnicode = convertUnicode(keyword)
            const position = name.search(keywordToUnicode)
            return position > -1
        })
        setListDesti(results)
    }

    return (
        <div className={`filterBox ${isOpenFilterDeal ? 'open' : ''}`}>
            <div className="headerPopup">
                <p>{t('Bộ lọc')}</p>
                <button type="button" className="headerPopup__close" onClick={handleCloseFilter}>
                    <IconClose />
                </button>
            </div>
            <div className="filterBox__body">
                <div className="filterBox__group">
                    {Array.isArray(listCateg) && listCateg.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('Danh mục')}</p>
                            <div className={'filterBox__cont mb10'}>
                                {listCateg.slice(0, isShowAllCateg ? listCateg.length : 5).map((item) => {
                                    return (
                                        <div key={item.id} className="mb5">
                                            <Checkbox
                                                checked={String(router.query[DEAL_FILTER.BY_CATEGORY])
                                                    .split(',')
                                                    .includes(item.id)}
                                                onChange={(event) =>
                                                    handleChangeFilter(DEAL_FILTER.BY_CATEGORY)(event.target.checked)(
                                                        item.id
                                                    )
                                                }
                                            >
                                                {t(item.name)}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                            {listCateg.length > 5 && (
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                                <a className="sidebar__item__show" onClick={toggleShowAllCate}>
                                    {isShowAllCateg
                                        ? t(`common:Hiển thị ít đi`)
                                        : t(`common:Hiển thị tất cả`) + ` (${listCateg.length})`}
                                </a>
                            )}
                        </div>
                    )}

                    {Array.isArray(listTopic) && listTopic.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('Du lịch theo chủ đề')}</p>
                            <div className={'filterBox__cont mb10'}>
                                {listTopic.slice(0, isShowAllTopic ? listTopic.length : 5).map((item) => {
                                    return (
                                        <div key={item.id} className="mb5">
                                            <Checkbox
                                                checked={router.query[DEAL_FILTER.BY_TOPIC]?.includes(item.id)}
                                                onChange={(event) =>
                                                    handleChangeFilter(DEAL_FILTER.BY_TOPIC)(event.target.checked)(
                                                        item.id
                                                    )
                                                }
                                            >
                                                {t(item.name)}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                            {listTopic.length > 5 && (
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                                <a className="sidebar__item__show" onClick={toggleShowAllTopic}>
                                    {isShowAllTopic
                                        ? t(`common:Hiển thị ít đi`)
                                        : t(`common:Hiển thị tất cả`) + ` (${listTopic.length})`}
                                </a>
                            )}
                        </div>
                    )}

                    {Array.isArray(rootDesti) && rootDesti.length > 0 && (
                        <div className="filterBox__item">
                            <p className="filterBox__title">{t('flight:Điểm đến')}</p>
                            <div className="filterBox__search mb20">
                                <Input
                                    type="text"
                                    className="des-search form-control"
                                    onChange={(event) => handleSearchDestination(event.target.value)}
                                />
                            </div>
                            <div className={`filterBox__cont mb10${isShowAllDesti ? 'show' : ''}`}>
                                {listDesti.slice(0, isShowAllDesti ? listDesti.length : 5).map((item) => {
                                    return (
                                        <div key={item.id} className="mb5">
                                            <Checkbox
                                                checked={String(router.query[DEAL_FILTER.BY_DESTINATION])
                                                    .split(',')
                                                    ?.includes(item.id)}
                                                onChange={(event) =>
                                                    handleChangeFilter(DEAL_FILTER.BY_DESTINATION)(
                                                        event.target.checked
                                                    )(item.id)
                                                }
                                            >
                                                {t(item.name)}
                                            </Checkbox>
                                        </div>
                                    )
                                })}
                            </div>
                            {listDesti.length > 5 && (
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                                <a className="sidebar__item__show" onClick={toggleShowAllDesti}>
                                    {isShowAllDesti
                                        ? t(`common:Hiển thị ít đi`)
                                        : t(`common:Hiển thị tất cả`) + ` (${listDesti.length})`}
                                </a>
                            )}
                        </div>
                    )}

                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('hotel:Mức giá')}</p>
                        <div className="filterBox__cont">
                            {DEAL_FILTER_BY_PRICE.map((item) => (
                                <div key={item.value} className="mb5">
                                    <Checkbox
                                        checked={String(router.query[DEAL_FILTER.BY_PRICE])
                                            .split(',')
                                            .includes(item.value)}
                                        onChange={(event) =>
                                            handleChangeFilter(DEAL_FILTER.BY_PRICE)(event.target.checked)(item.value)
                                        }
                                    >
                                        {t(`common:${item.label}`)}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('payment:Khuyến mại')}</p>
                        <div className="filterBox__cont">
                            {DEAL_FILTER_BY_PERCENT.map((item) => (
                                <div key={item.value} className="mb5">
                                    <Checkbox
                                        checked={String(router.query[DEAL_FILTER.BY_PERCENT])
                                            .split(',')
                                            .includes(item.value)}
                                        onChange={(event) =>
                                            handleChangeFilter(DEAL_FILTER.BY_PERCENT)(event.target.checked)(item.value)
                                        }
                                    >
                                        {t(`common:${item.label}`)}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filterBox__item">
                        <p className="filterBox__title">{t('Quy chuẩn khách sạn')}</p>
                        <div className="filterBox__cont">
                            {HOTEL_FILTER_STAR.map((item) => (
                                <div key={item.value} className="mb5">
                                    <Checkbox
                                        checked={String(router.query[DEAL_FILTER.BY_RATING])
                                            .split(',')
                                            .includes(String(item.value))}
                                        onChange={(event) =>
                                            handleChangeFilter(DEAL_FILTER.BY_RATING)(event.target.checked)(
                                                String(item.value)
                                            )
                                        }
                                    >
                                        <RenderStarRate starRate={item.value} />
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DealFilter
