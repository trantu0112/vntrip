import React from 'react'
import DisplayPrice from '../common/DisplayPrice'
import { useTranslation } from 'react-i18next'

interface Props {
    isShow: boolean
    options: any[]
    totalPrice: number
    onChangeQuantity: (index: number, quan: number) => void
}

const SelectDeal: React.FC<Props> = ({ isShow, options, onChangeQuantity, totalPrice }) => {
    const { t } = useTranslation(['common'])
    return (
        <div className={`modal-deal__item ${isShow ? 'open' : ''}`}>
            <div className="dealOption">
                <div className="vntTable">
                    <div className="vntTable__header">
                        <div className="vntTable__cell">
                            <p className="mb0 semibold">{t('Dịch vụ')}</p>
                        </div>
                        <div className="vntTable__cell">
                            <p className="mb0 semibold">{t('Đơn giá')}</p>
                        </div>
                        <div className="vntTable__cell">
                            <p className="mb0 semibold">{t('Số lượng')}</p>
                        </div>
                        <div className="vntTable__cell">
                            <p className="mb0 semibold">{t('Thành tiền')}</p>
                        </div>
                    </div>
                    <div className="vntTable__body">
                        {Array.isArray(options) &&
                            options.map((item, index) => (
                                <div className="vntTable__row" key={item.id}>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Dịch vụ')}</p>
                                        <p className="mb0 p1">
                                            <span className="semibold">{item.name}</span>
                                            <span className="d-block">{item.info}</span>
                                        </p>
                                    </div>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Đơn giá')}</p>
                                        <p className="mb0">
                                            <DisplayPrice price={item.price} />
                                        </p>
                                    </div>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">Số lượng</p>
                                        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                                        <select
                                            className="form-control w90"
                                            value={item.quantity}
                                            onChange={(event) => onChangeQuantity(index, Number(event.target.value))}
                                        >
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                                                <option value={quantity} key={item.id + '_' + quantity}>
                                                    {quantity}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Thành tiền')}</p>
                                        <p className="mb0 yellow-1 semibold">
                                            <DisplayPrice price={item.quantity * item.price} />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        <div className="vntTable__row">
                            <div className="dealOption__total semibold">
                                <span>{t('Tổng tiền')}:&nbsp;&nbsp;</span>
                                <span className="yellow-1">
                                    <DisplayPrice price={totalPrice} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectDeal
