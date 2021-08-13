import React from 'react'
import { useSelector } from 'react-redux'
import { getFullName } from '../../utils/user'
import { PASSENGER } from '../../constants/enums'
import { useTranslation } from 'react-i18next'

const ShowPassenger = () => {
    const { t } = useTranslation(['flight'])
    const { listPassenger } = useSelector((state: any) => {
        return {
            listPassenger: state.flight.listPassenger || [],
        }
    })

    const convertType = (type: PASSENGER.ADT | PASSENGER.CHD | PASSENGER.INF) => {
        switch (type) {
            case PASSENGER.ADT:
                return t('Người lớn')
            case PASSENGER.CHD:
                return t('Trẻ em')
            case PASSENGER.INF:
                return t('Trẻ sơ sinh')
            default:
                return ''
        }
    }

    // const convertGender = (type: PASSENGER.ADT | PASSENGER.CHD | PASSENGER.INF, gender: boolean) => {
    //     switch (type) {
    //         case PASSENGER.ADT:
    //             return t(gender ? 'Ông' : 'Bà')
    //         default:
    //             return t(gender ? 'Bé trai' : 'Bé gái')
    //     }
    // }
    return (
        <div className="bookingUser">
            <div className="checkoutLayout__title">
                <span>{t('Thông tin hành khách')}</span>
            </div>
            <ul>
                {listPassenger.map((item: any) => {
                    return (
                        <li className="flexAuto" key={item.index}>
                            <p className="mb0">{item.gender ? t('common:Nam') : t('common:Nữ')}</p>
                            <p className="mb0">{getFullName(item.firstName, item.lastName)}</p>
                            <p className="mb0 text-right">{convertType(item.type)}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ShowPassenger
