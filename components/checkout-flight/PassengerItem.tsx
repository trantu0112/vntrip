import React from 'react'
import { useTranslation } from 'react-i18next'
import { convertAirportCodeToCityName, showLogoAirProvider } from '../../utils/flight'
import { IconArrowFlight } from '../../constants/icons'
import { PASSENGER } from '../../constants/enums'
import { Form, Input, Select, DatePicker } from 'antd'
import DisplayPrice from '../common/DisplayPrice'
import moment from 'moment'

const { Option } = Select

interface Props {
    data: any
    departData: { airline: string; startPoint: string; endPoint: string }
    returnData: { airline: string; startPoint: string; endPoint: string } | null
    loadingBaggage: boolean
    listBaggageDepart: any[]
    listBaggageReturn: any[]
    listPassenger: any[]
    handleChangeBaggage: (leg: number, value: string, index: number) => void
    handleChangeName: (index: number, value: string) => void
    handleBlurName: (index: number, value: string) => void
    handleChangeGender: (index: number, value: number) => void
    handleChangeBirthday: (index: number, value: any) => void
}

const PassengerItem: React.FC<Props> = ({
    data,
    departData,
    returnData,
    loadingBaggage,
    listBaggageDepart,
    listBaggageReturn,
    handleChangeBaggage,
    handleChangeName,
    handleBlurName,
    handleChangeGender,
    handleChangeBirthday,
}) => {
    const { t } = useTranslation(['flight', 'common'])
    const currentBagDepart = Array.isArray(data?.listBaggage)
        ? data.listBaggage.find((item: any) => item.leg === 0)
        : null
    const currentBagReturn = Array.isArray(data?.listBaggage)
        ? data.listBaggage.find((item: any) => item.leg === 1)
        : null
    const disabledDateFunc = (current: any, type: string) => {
        let dates: any =
            returnData && returnData.constructor === Object && Object.keys(returnData).length !== 0
                ? returnData
                : departData
        let minDate, maxDate
        if (type === 'CHD') {
            minDate = current.diff(dates['date'], 'years') > -2
            maxDate = moment(dates['date']).diff(current, 'years') > 11
        } else if (type === 'INF') {
            minDate = current.diff(dates['date'], 'days') > 0
            maxDate = moment(dates['date']).diff(current, 'years') > 1
        } else {
            return true
        }
        return minDate || maxDate
    }
    return (
        <div className="dItem">
            <div className="checkoutLayout__title">
                <span>{data?.title}</span>
            </div>
            <div className={`checkoutInfo__row ${data?.type !== PASSENGER.ADT ? 'formChild' : ''}`}>
                <div className={`form-group ${data?.type === PASSENGER.ADT ? 'form-group_gender' : ''}`}>
                    <Form.Item
                        label={
                            <>
                                {t('common:Gi???i t??nh')}
                                <span className={'red-1'}>&nbsp;*</span>
                            </>
                        }
                    >
                        <Select
                            placeholder={t('common:Gi???i t??nh')}
                            style={{ width: '100%' }}
                            value={data?.gender}
                            onChange={(value) => handleChangeGender(data?.index, value)}
                        >
                            <Option value={1}>{t('common:Nam')}</Option>
                            <Option value={2}>{t('common:N???')}</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className={`form-group ${data?.type === PASSENGER.ADT ? 'form-group_name' : ''}`}>
                    <Form.Item
                        label={
                            <>
                                {t('common:H??? v?? t??n')} <span className={'red-1'}>&nbsp;*</span>
                            </>
                        }
                        validateStatus={data?.validateName?.status}
                        help={data?.validateName?.text}
                    >
                        <Input
                            placeholder={t('common:H??? v?? t??n')}
                            value={data?.fullName}
                            onChange={(event) => handleChangeName(data?.index, event.target.value)}
                            onBlur={(event) => handleBlurName(data?.index, event.target.value)}
                            id={`full_name_${data?.index}`}
                        />
                    </Form.Item>
                </div>
                {data?.type !== PASSENGER.ADT && (
                    <div className="form-group">
                        <Form.Item
                            label={
                                <>
                                    {t('common:Ng??y sinh')} <span className={'red-1'}>&nbsp;*</span>
                                </>
                            }
                            validateStatus={data?.validateBirthday.status}
                            help={data?.validateBirthday.text}
                        >
                            <DatePicker
                                disabledDate={(current) => disabledDateFunc(current, data?.type)}
                                style={{ width: '100%' }}
                                value={data?.birthday ? moment(data?.birthday, 'DDMMYYYY') : null}
                                onChange={(date) => handleChangeBirthday(data?.index, date)}
                                defaultPickerValue={data?.type === PASSENGER.CHD ? moment().add(-2, 'years') : moment()}
                                showNow={false}
                                showToday={false}
                                id={`birthday_${data?.index}`}
                            />
                        </Form.Item>
                    </div>
                )}
            </div>
            <div className="checkoutInfo__flight">
                <div className="checkoutInfo__flight__item">
                    <div className="checkoutInfo__flight__logo">
                        <img src={showLogoAirProvider(departData?.airline)} alt={departData.airline} />
                    </div>
                    <div className="checkoutInfo__flight__trip">
                        <p className="gray-5 mb0 pTitle">{t('Chi???u ??i')}:</p>
                        <div className="d-flex">
                            <p className="mb0">
                                {departData.startPoint} - {convertAirportCodeToCityName(departData.startPoint)}
                            </p>
                            <p className="pIcon mb0">
                                <IconArrowFlight />
                            </p>
                            <p className="mb0">
                                {departData.endPoint} - {convertAirportCodeToCityName(departData.endPoint)}
                            </p>
                        </div>
                    </div>
                    {data?.type !== 'INF' && (
                        <div className="checkoutInfo__flight__baggage">
                            {loadingBaggage || listBaggageDepart.length > 1 ? (
                                <Select
                                    style={{ width: '100%' }}
                                    loading={loadingBaggage}
                                    placeholder={t('Ch???n h??nh l??')}
                                    value={currentBagDepart ? currentBagDepart.value : ''}
                                    onChange={(value) => handleChangeBaggage(0, value, data?.index)}
                                >
                                    {listBaggageDepart.map((bag) => {
                                        return (
                                            <Option value={bag.value} data={bag} key={bag.value}>
                                                {bag.name} (<DisplayPrice price={bag.price} />)
                                            </Option>
                                        )
                                    })}
                                </Select>
                            ) : (
                                <p className="mb0 red-1">{t('Kh??ng h??? tr??? mua th??m h??nh l?? k?? g???i')}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* chi???u v??? n???u c?? */}
                {returnData && (
                    <div className="checkoutInfo__flight__item">
                        <div className="checkoutInfo__flight__logo">
                            <img src={showLogoAirProvider(returnData?.airline)} alt={returnData.airline} />
                        </div>
                        <div className="checkoutInfo__flight__trip">
                            <p className="gray-5 mb0 pTitle">{t('Chi???u v???')}:</p>
                            <div className="d-flex">
                                <p className="mb0">
                                    {returnData.startPoint} - {convertAirportCodeToCityName(returnData.startPoint)}
                                </p>
                                <p className="pIcon mb0">
                                    <IconArrowFlight />
                                </p>
                                <p className="mb0">
                                    {returnData.endPoint} - {convertAirportCodeToCityName(returnData.endPoint)}
                                </p>
                            </div>
                        </div>
                        {data?.type !== 'INF' && (
                            <div className="checkoutInfo__flight__baggage">
                                {loadingBaggage || listBaggageReturn.length > 1 ? (
                                    <Select
                                        style={{ width: '100%' }}
                                        loading={loadingBaggage}
                                        placeholder={t('Ch???n h??nh l??')}
                                        value={currentBagReturn ? currentBagReturn.value : ''}
                                        onChange={(value) => handleChangeBaggage(1, value, data?.index)}
                                    >
                                        {listBaggageReturn.map((bag) => {
                                            return (
                                                <Option
                                                    value={bag.value}
                                                    data={bag}
                                                    key={`${bag.value} ${data?.index} `}
                                                >
                                                    {bag.name} (<DisplayPrice price={bag.price} />)
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                ) : (
                                    <p className="mb0 red-1">{t('Kh??ng h??? tr??? mua th??m h??nh l?? k?? g???i')}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PassengerItem
