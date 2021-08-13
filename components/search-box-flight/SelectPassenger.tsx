import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { IconPassengers, IconClose } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setAdultCount, setChildCount, setInfantCount } from '../../store/flight/action'
import { toggleClassNoScroll } from '../../utils/common'

const SelectPassenger: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const { t } = useTranslation('flight')
    const { adultCount, childCount, infantCount } = useSelector((state: any) => {
        return {
            adultCount: state.flight.adultCount || 1,
            childCount: state.flight.childCount || 0,
            infantCount: state.flight.infantCount || 0,
        }
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setIsOpen((prevState) => {
            toggleClassNoScroll(prevState ? 'remove' : 'add')
            return !prevState
        })
    }

    /* HANDLE CLICK OUTSIDE SUGGESTION BOX */
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClickDropdown)
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickDropdown)
        }
    }, [])

    /* HANDLE EVENT REGION */
    const handleClickDropdown = (event: any) => {
        // @ts-ignore
        if (dropdownRef.current.contains(event.target)) {
            // inside click
            return
        }
        // outside click
        setIsOpen(false) // close dropdown
    }

    /*
        1. Tổng số người lớn + trẻ em max là 6, min là 1
        2. Số em bé max là 5, min là 0
        3. 1 người lớn chỉ được kèm thêm 1 em bé, trẻ sơ sinh max là 2
     */
    const handleChangePassenger = (type1: 'adult' | 'child' | 'infant') => (type2: 'descrease' | 'increase') => () => {
        let newAdtCount = 1
        let newChdCount = 0
        let newInfCount = 0
        switch (type1 + '-' + type2) {
            case 'adult-descrease':
                newAdtCount = adultCount > 1 ? adultCount - 1 : adultCount
                dispatch(setAdultCount(newAdtCount))
                if (newAdtCount < infantCount) {
                    dispatch(setInfantCount(newAdtCount))
                }
                break
            case 'adult-increase':
                if (adultCount + childCount + infantCount < 6) {
                    newAdtCount = adultCount + 1
                    dispatch(setAdultCount(newAdtCount))
                }
                break
            case 'child-descrease':
                newChdCount = childCount >= 1 ? childCount - 1 : childCount
                dispatch(setChildCount(newChdCount))
                break
            case 'child-increase':
                if (adultCount + childCount + infantCount < 6) {
                    newChdCount = childCount + 1
                    dispatch(setChildCount(newChdCount))
                }
                break
            case 'infant-descrease':
                newInfCount = infantCount >= 1 ? infantCount - 1 : infantCount
                dispatch(setInfantCount(newInfCount))
                break
            case 'infant-increase':
                if (adultCount + childCount + infantCount < 6) {
                    if (infantCount < adultCount && infantCount < 2) {
                        newInfCount = infantCount + 1
                        dispatch(setInfantCount(newInfCount))
                    }
                }
                break
        }
    }

    return (
        <div className="passengerBox">
            <p>{t('Hành khách')}</p>
            <div className={`dropdown ${isOpen ? 'dropdown-open' : ''}`}>
                <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
                    <span>
                        {adultCount} {t('người lớn')}, {childCount} {t('trẻ em')}, {infantCount} {t('trẻ sơ sinh')}
                    </span>
                    <IconPassengers />
                </button>
                <div className="dropdown-menu" ref={dropdownRef}>
                    <div
                        role="button"
                        tabIndex={0}
                        className="passengerBox__backdrop"
                        onClick={toggleDropdown}
                        onKeyUp={toggleDropdown}
                    />

                    <div className="passengerBox__body">
                        <div className="headerPopup">
                            <p>{t('Hành khách')}</p>
                            <button type="button" className="headerPopup__close" onClick={toggleDropdown}>
                                <IconClose />
                            </button>
                        </div>
                        <div className="passengerBox__main">
                            <div className="passengerBox__item">
                                <Button
                                    type="text"
                                    className="passengerBox__minus"
                                    onClick={handleChangePassenger('adult')('descrease')}
                                    icon={<MinusOutlined />}
                                    disabled={adultCount <= 1}
                                />
                                <p>
                                    {adultCount} {t('người lớn')}
                                </p>
                                <Button
                                    type="text"
                                    className="passengerBox__plus"
                                    onClick={handleChangePassenger('adult')('increase')}
                                    icon={<PlusOutlined />}
                                    disabled={adultCount + childCount + infantCount >= 6}
                                />
                            </div>
                            <div className="passengerBox__item">
                                <Button
                                    type="text"
                                    className="passengerBox__minus"
                                    onClick={handleChangePassenger('child')('descrease')}
                                    icon={<MinusOutlined />}
                                    disabled={childCount <= 0}
                                />
                                <p>
                                    {childCount} {t('trẻ em')}
                                    <span className="d-block">2 - 12 {t('tuổi')}</span>
                                </p>
                                <Button
                                    type="text"
                                    className="passengerBox__plus"
                                    onClick={handleChangePassenger('child')('increase')}
                                    icon={<PlusOutlined />}
                                    disabled={adultCount + childCount + infantCount >= 6}
                                />
                            </div>
                            <div className="passengerBox__item">
                                <Button
                                    type="text"
                                    className="passengerBox__minus"
                                    onClick={handleChangePassenger('infant')('descrease')}
                                    icon={<MinusOutlined />}
                                    disabled={infantCount <= 0}
                                />
                                <p>
                                    {infantCount} {t('trẻ sơ sinh')}
                                    <span className="d-block">&lt; 2 {t('tuổi')}</span>
                                </p>
                                <Button
                                    type="text"
                                    className="passengerBox__plus"
                                    onClick={handleChangePassenger('infant')('increase')}
                                    icon={<PlusOutlined />}
                                    disabled={infantCount >= 2 || adultCount + childCount + infantCount >= 6}
                                />
                            </div>
                        </div>
                    </div>
                    {/*<div className="passengerBox__title">*/}
                    {/*    <p>{t('Hành khách')}</p>*/}
                    {/*    <button type="button" className="passengerBox__close" onClick={toggleDropdown}>*/}
                    {/*        <IconClose />*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
})

export default SelectPassenger
