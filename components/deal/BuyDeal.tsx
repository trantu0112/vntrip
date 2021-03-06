import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { togglePopupByDeal, setStepByDeal } from '../../store/common/action'
import { validateBookerData } from '../../store/checkout/action'
import { useTranslation } from 'react-i18next'
import { getCookie, isEmailValid, isPhoneValid, showMessage } from '../../utils/common'
import { VNTRIP_INFO } from '../../constants/common'
import { buyDeal } from '../../api/common-services'
import SelectDeal from './SelectDeal'
import CustomerInfo from './CustomerInfo'

interface Props {
    dealId: number
    listPrice: any[]
    buyIndex: number
}

const BuyDeal: React.FC<Props> = ({ dealId, listPrice, buyIndex }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common'])
    const { isOpenPopupByDeal, stepBuyDeal, bookerData, validateBooker, customerNote } = useSelector((state: any) => {
        return {
            isOpenPopupByDeal: state.common.isOpenPopupByDeal || false,
            stepBuyDeal: state.common.stepBuyDeal || 1,
            customerNote: state.checkout.customerNote,
            bookerData: state.checkout.bookerData,
            validateBooker: state.checkout.validateBooker || {
                gender: { status: 'success', text: '' },
                firstName: { status: 'success', text: '' },
                lastName: { status: 'success', text: '' },
                fullName: { status: 'success', text: '' },
                phone: { status: 'success', text: '' },
                email: { status: 'success', text: '' },
            },
        }
    })
    const [options, setOptions] = useState<any[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (Array.isArray(listPrice)) {
            // set option default when open popup
            let _options = listPrice.map((item) => {
                return {
                    id: item.id,
                    name: item.price_name,
                    price: item.sell_price,
                    quantity: 1,
                    info: item.info,
                }
            })
            if (buyIndex !== -1) {
                const item = { ...listPrice[buyIndex] }
                _options = [
                    {
                        id: item.id,
                        name: item.price_name,
                        price: item.sell_price,
                        quantity: 1,
                        info: item.info,
                    },
                ]
            }
            const _totalPrice = _options.reduce((accumulator, currentValue) => {
                return accumulator + Number(currentValue.price) * currentValue.quantity
            }, 0)
            setTotalPrice(_totalPrice)
            setOptions(_options)
        }
    }, [listPrice, buyIndex])

    // disable button "Ti???p t???c" n???u t???t c??? quantity <= 0
    useEffect(() => {
        setIsDisableSubmit(options.every((_opt) => _opt.quantity <= 0))
    }, [options])

    // handle cancel
    const onCancel = () => {
        if (stepBuyDeal === 1) {
            // close popup
            dispatch(togglePopupByDeal(false))
        } else {
            // back to preview step
            dispatch(setStepByDeal(1))
        }
    }

    const isFormValid = (data: any) => {
        if (!data?.email) {
            dispatch(
                validateBookerData({
                    ...validateBooker,
                    email: { status: 'error', text: t('Vui l??ng nh???p email') },
                })
            )
            return false
        }

        // validate emal format
        if (!isEmailValid(data?.email)) {
            dispatch(
                validateBookerData({
                    ...validateBooker,
                    email: { status: 'error', text: t('Email kh??ng h???p l???') },
                })
            )
            return false
        }

        // check is exist full name
        if (!data?.first_name || !data?.last_name) {
            dispatch(
                validateBookerData({
                    ...validateBooker,
                    fullName: { status: 'error', text: t('Vui l??ng nh???p h??? v?? t??n') },
                })
            )
            return false
        }

        // check is exist phone number
        if (!data?.phone) {
            dispatch(
                validateBookerData({
                    ...validateBooker,
                    phone: { status: 'error', text: t('Vui l??ng nh???p s??? ??i???n tho???i') },
                })
            )
            return false
        }

        // validate phone number format
        if (!isPhoneValid(data?.phone)) {
            dispatch(
                validateBookerData({
                    ...validateBooker,
                    phone: { status: 'error', text: t('S??? ??i???n tho???i kh??ng h???p l???') },
                })
            )
            return false
        }
        return true
    }

    // handle submit
    const onOk = async () => {
        // chuy???n m??n h??nh
        if (stepBuyDeal === 1) {
            dispatch(setStepByDeal(2))
        }
        if (stepBuyDeal === 2) {
            // validate booker information
            if (isFormValid(bookerData)) {
                try {
                    const data: any = {
                        deal_id: dealId,
                        options: options,
                        booker_data: bookerData,
                        request_from: isMobile ? 'WEBMOBILE' : 'WEBSITE',
                        customer_request: customerNote,
                    }
                    if (getCookie('publisher')) {
                        data.publisher_data = JSON.parse(getCookie('publisher'))
                    }
                    setIsLoading(true)
                    const res = await buyDeal(data)
                    setIsLoading(false)
                    if (res.status === 'success') {
                        dispatch(setStepByDeal(3))
                    } else {
                        showMessage(
                            'error',
                            `C?? l???i x???y ra trong qu?? tr??nh x??? l??. Vui l??ng th???c hi???n l???i thao t??c ho???c li??n h??? hotline ${VNTRIP_INFO.hotline}`
                        )
                    }
                } catch (e) {
                    setIsLoading(false)
                    showMessage(
                        'error',
                        `C?? l???i x???y ra trong qu?? tr??nh x??? l??. Vui l??ng th???c hi???n l???i thao t??c ho???c li??n h??? hotline ${VNTRIP_INFO.hotline}`
                    )
                    throw e
                }
            }
        }
        if (stepBuyDeal === 3) {
            // close popup
            dispatch(togglePopupByDeal(false))
        }
    }

    const onChangeQuantity = (index: number, quan: number) => {
        let total_price = 0
        const new_options = options.map((item, ind) => {
            const option = { ...item }
            if (ind === index) option['quantity'] = quan
            total_price += option.price * option.quantity
            return option
        })
        setOptions(new_options)
        setTotalPrice(total_price)
    }

    const PopupHeader = (
        <div className="dealStep">
            <div className={`dealStep__item ${stepBuyDeal === 1 ? 'active' : ''}`}>
                <div className="dealStep__numb">1</div>
                <div className="dealStep__text">{t('Ch???n Deal')}</div>
            </div>
            <div className={`dealStep__item ${stepBuyDeal === 2 ? 'active' : ''}`}>
                <div className="dealStep__numb">2</div>
                <div className="dealStep__text">{t('Th??ng tin li??n h???')}</div>
            </div>
            <div className={`dealStep__item ${stepBuyDeal === 3 ? 'active' : ''}`}>
                <div className="dealStep__numb">3</div>
                <div className="dealStep__text">{t('X??c nh???n y??u c???u')}</div>
            </div>
        </div>
    )
    const PopupFooter = (
        <div className="modal-deal__btn">
            {[1, 2].includes(stepBuyDeal) && (
                <button type="button" className="btn btn_outline" onClick={onCancel}>
                    <span>{stepBuyDeal === 1 ? 'H???y' : 'Quay l???i'}</span>
                </button>
            )}
            <Button type="primary" className="btn" onClick={onOk} disabled={isDisableSubmit} loading={isLoading}>
                <span>{stepBuyDeal === 3 ? 'Ho??n t???t' : 'Ti???p t???c'}</span>
            </Button>
        </div>
    )

    return (
        <Modal
            title={PopupHeader}
            footer={PopupFooter}
            visible={isOpenPopupByDeal}
            maskClosable={false}
            onCancel={() => dispatch(togglePopupByDeal(false))}
            width={680}
        >
            <div className="modal-deal__main">
                <SelectDeal
                    isShow={stepBuyDeal === 1}
                    options={options}
                    totalPrice={totalPrice}
                    onChangeQuantity={onChangeQuantity}
                />
                <CustomerInfo isShow={stepBuyDeal === 2} />
                <div className={`modal-deal__item ${stepBuyDeal === 3 ? 'open' : ''}`}>
                    <div className="dealConfirm text-center">
                        <p className="semibold size-18 mb15 yellow-1">{t('B???n ???? g???i y??u c???u ?????t Deal th??nh c??ng')}</p>
                        <img src="https://statics.vntrip.vn/checkout-success.png" alt={'checkout-success'} />
                        <p className="mb0">{t('C??m ??n ???? ?????t Deal t???i VNTRIP.VN')}</p>
                        <p className="mb0">{t('Ch??ng t??i s??? li??n h??? l???i cho b???n')}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default BuyDeal
