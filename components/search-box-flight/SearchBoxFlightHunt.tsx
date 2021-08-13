import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { IconDestinationFlight, IconOriginFlight } from '../../constants/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenSearchBoxHunt } from '../../store/common/action'
import { setValidateDestin, setValidateOrigin } from '../../store/flight/action'
import { useTranslation } from 'react-i18next'
import SelectAirport from './SelectAirport'
import LoadingRedirectAtadi from '../common/LoadingRedirectAtadi'

interface Props {
    isShow?: boolean
}

const SearchBoxFlightHunt: React.FC<Props> = React.memo(({ isShow }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['flight', 'common', 'notification'])
    const { originCode, destinCode } = useSelector((state: any) => {
        return {
            originCode: state.flight.originCode,
            destinCode: state.flight.destinCode,
        }
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onClickSearchBox = (elementId: string) => {
        const element = document.getElementById(elementId)
        element?.click()
        element?.focus()
        dispatch(setOpenSearchBoxHunt(true))
    }

    const handleSubmit = () => {
        if (!originCode) {
            dispatch(setValidateOrigin({ status: 'error', text: t('notification:Vui lòng chọn sân bay') }))
            return
        }
        if (!destinCode) {
            dispatch(setValidateDestin({ status: 'error', text: t('notification:Vui lòng chọn sân bay') }))
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            const url = `https://atadi.vntrip.vn/#/promo/live/routes?list=${originCode}${destinCode}&type=RT&utm_medium=Searchbanner`
            isMobile
                ? (window.location.href = url)
                : window.open(
                      url,
                      '_blank' // <- This is what makes it open in a new window.
                  )
        }, 1000)
    }

    return (
        <div className={`searchBox__flight ${isShow ? 'open' : ''}`}>
            <div className="searchBox__cont">
                <div className="searchBox__item">
                    <div className="searchBox__input">
                        <IconOriginFlight />
                        <SelectAirport isOrigin={true} code={originCode} />
                        <div
                            className="searchBox__click"
                            onClick={() => onClickSearchBox('inputOrigin')}
                            onKeyUp={() => onClickSearchBox('inputOrigin')}
                            role={'button'}
                            tabIndex={0}
                        />
                    </div>
                </div>
                <div className="searchBox__item">
                    <div className="searchBox__input">
                        <IconDestinationFlight />
                        <SelectAirport isOrigin={false} code={destinCode} />
                        <div
                            className="searchBox__click"
                            onClick={() => onClickSearchBox('inputDestin')}
                            onKeyUp={() => onClickSearchBox('inputDestin')}
                            role={'button'}
                            tabIndex={0}
                        />
                    </div>
                </div>
            </div>

            <div className="searchBox__btn">
                <button type="button" className="btn btn_orange btn_lg" onClick={handleSubmit}>
                    <span>{t('common:Săn ngay')}</span>
                </button>
            </div>
            <LoadingRedirectAtadi isShow={isLoading} />
        </div>
    )
})

export default SearchBoxFlightHunt
