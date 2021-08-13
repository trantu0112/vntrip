import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchBoxComboInput from './SearchBoxComboInput'
import SelectPassengerCombo from './SelectPassengerCombo'
import { getListComBo } from '../../api/combo-services'
import DisplayPrice from '../common/DisplayPrice'
import { useSelector } from 'react-redux'
import * as queryString from 'query-string'
import { ValidationForm } from '../../constants/interface'

const FormComboDongGia = () => {
    const { t } = useTranslation(['combo', 'common', 'hotel', 'flight'])
    const [startPoint, setStartPoint] = useState<string>('')
    const [endPoint, setEndPoint] = useState<string>('')
    const [listCombo, setListCombo] = useState<any[]>([])
    const [comboId, setComboId] = useState<number>(0)
    const [validateStartPoint, setValidateStartPoint] = useState<ValidationForm>({ status: 'success', text: '' })
    const [validateEndPoint, setValidateEndPoint] = useState<ValidationForm>({ status: 'success', text: '' })
    const { adultCount, childCount, infantCount } = useSelector((state: any) => {
        return {
            adultCount: state.combo.adultCount || 2,
            childCount: state.combo.childCount || 0,
            infantCount: state.combo.infantCount || 0,
        }
    })
    useEffect(() => {
        const fetchListCombo = async () => {
            try {
                let filter = {
                    deal_type: 'dynamic-combo',
                    combo_type: 'combo-donggia',
                }
                const data = await getListComBo(filter)
                if (data?.status === 'success') {
                    setListCombo(data?.data)
                    data?.data?.forEach((combo: any) => {
                        if (combo.nights === 2) {
                            setComboId(combo?.id)
                        }
                    })
                }
            } catch (e) {
                throw e
            }
        }
        fetchListCombo()
    }, [])

    const clearValidate = () => {
        setValidateStartPoint({ status: 'success', text: '' })
        setValidateEndPoint({ status: 'success', text: '' })
    }

    const priceForOnePeople = (combo: any) => {
        const adultNumber = combo?.flights?.[0]?.adult_number || 2
        const sellPrice = combo?.price_deal?.[0]?.sell_price
        return Number(sellPrice / adultNumber).toFixed(0)
    }

    const handleChangeCombo = (id: number) => {
        setComboId(id)
    }

    const handleChangeCode = (type: string, code: string) => {
        if (type === 'departure') {
            setStartPoint(code)
            setEndPoint('')
        } else {
            setEndPoint(code)
        }
    }

    const handleClick = () => {
        if (!startPoint) {
            setValidateStartPoint({ status: 'error', text: 'Vui lòng chọn điểm khởi hành' })
            return
        }
        if (!endPoint) {
            setValidateEndPoint({ status: 'error', text: 'Vui lòng chọn điểm đến' })
            return
        }
        let objParams = {
            startPoint,
            endPoint,
            comboId,
            adultCount,
            childCount,
            infantCount,
        }
        const queryStringify = queryString.stringify(objParams, { encode: false, skipNull: true })
        const url = process.env.NEXT_PUBLIC_ROOT_DOMAIN_DONG_GIA + '?' + queryStringify
        if (typeof window !== 'undefined') {
            window.open(url)
        }
    }
    return (
        <>
            <div className="flexGroup2">
                <SearchBoxComboInput
                    code={startPoint}
                    type={'departure'}
                    title={t('combo:Bạn khởi hành từ')}
                    placeholder={t('combo:Chọn điểm khởi hành')}
                    validatePoint={validateStartPoint}
                    handleChangeCode={handleChangeCode}
                    clearValidate={clearValidate}
                />
                <SearchBoxComboInput
                    code={endPoint}
                    type={'return'}
                    title={t('combo:Điểm đến')}
                    placeholder={t('combo:Chọn điểm đến')}
                    validatePoint={validateEndPoint}
                    handleChangeCode={handleChangeCode}
                    clearValidate={clearValidate}
                />
                <SelectPassengerCombo />
            </div>
            <div className="comboDongGia">
                <p className="semibold size-16">{t('combo:Bạn muốn đi trong bao lâu')}?</p>
                <div className="flexGroup2">
                    {listCombo.map((combo: any) => {
                        return (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                            <div
                                onClick={() => handleChangeCombo(combo?.id)}
                                key={combo.id}
                                className={`comboBox ${combo.id === comboId ? 'active' : ''}`}
                            >
                                <p className="size-12">
                                    {combo?.days} {t('combo:ngày')} {combo?.nights} {t('hotel:đêms')}
                                </p>
                                <p className="size-16 semibold">
                                    <DisplayPrice price={Number(priceForOnePeople(combo))} />/{t('combo:người')}
                                </p>
                            </div>
                        )
                    })}
                    <div className="comboDongGia__btn">
                        <button onClick={handleClick} className="btn btn_orange btnSearch open">
                            {t('combo:Săn ngay')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormComboDongGia
