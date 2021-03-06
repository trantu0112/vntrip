import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Modal, Table } from 'antd'
import { IconArrowFlight, IconDown, IconFlight, IconFlightTrip } from '../../constants/icons'
import {
    convertAirportCodeToCityName,
    convertAirportCodeToName,
    convertMinsToHrsMins,
    showLogoAirProvider,
} from '../../utils/flight'
import DisplayPrice from '../common/DisplayPrice'
import { displayPrice, renderGender } from '../../utils/common'
import { sendMailConfirm } from '../../api/flight-services'

interface Props {
    departData: any
    returnData?: any
    reservationData: any
}

const ReservationInfo: React.FC<Props> = ({ departData, returnData, reservationData }) => {
    const { t } = useTranslation(['flight', 'payment', 'common'])
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isOpenDetail, setIsOpenDetail] = useState<any[]>([])
    const [departReservation, setDepartReservation] = useState<any>()
    const [returnReservation, setReturnReservation] = useState<any>()
    const [packageStatus, setPackageStatus] = useState<any[]>([])
    const [rateSelected, setRateSelected] = useState<any[]>([])
    const [expiredTime, setExpiredTime] = useState<Date | null>(null)
    const [isExpired, setIsExpired] = useState<boolean>(false)
    useEffect(() => {
        // packageStatus = [PROCESSING, BOOKED, FAILED, PAID, HAS_PROMO_24H]
        if (Array.isArray(reservationData) && reservationData.length > 0) {
            setPackageStatus(reservationData.map((item) => item.packageStatus))
            reservationData.forEach((item) => {
                item.differencePrice = item.differencePrice || 0
                if (departData && departData.flightItem.flightValue === item.flight) {
                    setDepartReservation(item)
                }
                if (returnData && returnData.flightItem.flightValue === item.flight) {
                    setReturnReservation(item)
                }
            })
            const object = [...reservationData]
                .sort(
                    (a: any, b: any) =>
                        moment(a.orderExpiredAt).toDate().getTime() - moment(b.orderExpiredAt).toDate().getTime()
                )
                .find((item) => item.packageStatus === 'BOOKED' || item.packageStatus === 'HAS_PROMO_24H')
            setExpiredTime(object ? object.orderExpiredAt : null)
            setIsExpired(object ? moment(object.orderExpiredAt).isBefore(moment()) : false)
            let dataRateSelected = [...rateSelected]
            reservationData.forEach((item: any, index: number) => {
                dataRateSelected.push({
                    rateId: item['flightRateId'],
                    isSelected: ['BOOKED', 'HAS_PROMO_24H', 'PAID'].includes(item['packageStatus']),
                })
                setRateSelected(dataRateSelected)
                item['flightRate']['totalBaggage'] = 0
                item['flightRate']['passengers'].forEach((passengers: any) => {
                    passengers['fullName'] = passengers['lastName'] + ' ' + passengers['firstName']
                    passengers['fullInfo'] =
                        renderGender(passengers['type'], passengers['gender']) +
                        ' ' +
                        passengers['lastName'] +
                        ' ' +
                        passengers['firstName'] +
                        ' ' +
                        (passengers['birthday'] ? moment(passengers['birthday'], 'DDMMYYYY').format('DD/MM/YYYY') : '')
                    passengers['genderText'] = renderGender(passengers['type'], passengers['gender'])
                    passengers['listBaggage'] = passengers['listBaggage'].filter(
                        (i: any) => i['leg'] === item['flightRate']['leg']
                    )
                    passengers['listBaggage'].forEach((baggage: any) => {
                        item['flightRate']['totalBaggage'] += baggage['price']
                    })
                })
            })
        }
    }, [reservationData, departData, returnData])

    const renderText = (packageStatus: string, differencePrice: number) => {
        switch (packageStatus) {
            case 'BOOKED':
                return differencePrice ? (
                    <p className="mb0 yellow-1">
                        {t('H??? th???ng ???? gi??? ch??? th??nh c??ng')}.{' '}
                        {t('Tuy nhi??n ch??ng t??i ghi nh???n c?? s??? thay ?????i v??? gi?? v?? t??? ph??a h??ng bay')}.
                        {t('Vui l??ng ki???m tra l???i th??ng tin chi ti???t gi?? tr?????c khi ti???p t???c')}.
                    </p>
                ) : (
                    <p className="mb0 green-1">
                        {t('H??? th???ng ???? ti???n h??nh gi??? ch??? th??nh c??ng cho l???a ch???n c???a qu?? kh??ch')}.{' '}
                        {t('Vui l??ng ki???m tra l???i th??ng tin v?? ti???n h??nh thanh to??n tr?????c h???n')}.
                    </p>
                )
            case 'HAS_PROMO_24H':
                return (
                    <p className="mb0 yellow-1">
                        {t('V?? n??y l?? v?? Khuy???n m???i/C???n ng??y v?? h??ng kh??ng cho ph??p gi??? ch???')}.{' '}
                        {t('Vui l??ng thanh to??n ngay ????? kh??ng b??? l???')}.
                    </p>
                )
            case 'PROCESSING':
                return <p className="mb0 yellow-1">{t('??ang gi??? ch???')}</p>
            case 'PAID':
                return <p className="mb0 green-1">{t('???? thanh to??n')}</p>
            default:
                return <p className="mb0 red-1">{t('Gi??? ch??? th???t b???i')}</p>
        }
    }

    const renderTextHeader = (packageStatus: string) => {
        switch (packageStatus) {
            case 'BOOKED':
                return <strong className="green-1">{t('Gi??? ch??? th??nh c??ng')}</strong>
            case 'HAS_PROMO_24H':
                return <strong className="yellow-1">{t('V?? khuy???n m???i/c???n ng??y, kh??ng h??? tr??? gi??? ch???')}</strong>
            case 'PROCESSING':
                return <strong className="yellow-1">{t('??ang gi??? ch???')}</strong>
            case 'PAID':
                return <strong className="green-1">{t('???? thanh to??n')}</strong>
            default:
                return <strong className="red-1">{t('Gi??? ch??? th???t b???i')}</strong>
        }
    }

    const backToHome = () => {
        router.push('/')
    }

    const closePopup = async () => {
        // let rateSelected = []
        setIsOpen(false)
        try {
            let res = await sendMailConfirm({ listRateSelect: rateSelected })
        } catch (e) {
            console.log(e)
        }
    }
    const handleOpenDetail = (leg: number) => {
        let isOpenDetailNew = [...isOpenDetail]
        if (
            isOpenDetailNew.length === 0 ||
            (isOpenDetailNew.length && !isOpenDetailNew.filter((i) => i['leg'] === leg).length)
        ) {
            isOpenDetailNew.push({ leg, show: true })
        } else {
            for (let i = 0; i < isOpenDetailNew.length; i++) {
                if (isOpenDetailNew[i]['leg'] === leg) {
                    isOpenDetailNew[i]['show'] = !isOpenDetailNew[i]['show']
                    break
                }
            }
        }
        setIsOpenDetail(isOpenDetailNew)
    }
    const selectedRateDiffPrice = (rateId: string) => {
        let rate = [...rateSelected]
        for (let i = 0; i < rate.length; i++) {
            if (rate[i]['rateId'] === rateId) {
                rate[i]['isSelected'] = !rate[i]['isSelected']
                break
            }
        }
        setRateSelected(rate)
    }
    const columnsData: any = [
        {
            title: 'Gi???i t??nh',
            dataIndex: 'genderText',
            key: 'genderText',
            // render: (field: any) => field['lastName'] + ' ' + field['firstName'],
            responsive: ['md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'H??nh kh??ch',
            dataIndex: 'fullName',
            key: 'fullName',
            // render: (field: any) => field['lastName'] + ' ' + field['firstName'],
            responsive: ['sm', 'md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'H??nh kh??ch',
            dataIndex: 'fullInfo',
            key: 'fullInfo',
            responsive: ['xs'],
            // render : (field: any) => field['gender']+ ' ' + field['lastName'] + ' ' + field['firstName'] + '-' + field['birthday']
        },
        {
            title: 'Ng??y sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            responsive: ['lg', 'xl', 'xxl'],
            render: (field: any) => {
                return field ? moment(field, 'DDMMYYYY').format('DD/MM/YYYY') : ''
            },
        },
        {
            title: 'Th??ng tin h??nh l??',
            dataIndex: 'listBaggage',
            key: 'listBaggage',
            align: 'right',
            render: (field: any) => {
                return field.length ? field[0]['name'] + ` (${displayPrice(field[0]['price'], 'VND')})` : ''
            },
        },
    ]

    return (
        <Modal title={null} visible={isOpen} maskClosable={false} footer={null} closable={false} width={1000}>
            <div className="holdResult">
                <div className="holdResult__title">
                    <span>{t('K???t qu??? gi??? ch???')}</span>
                </div>
                <div className="holdResult__alert">
                    {isExpired ? (
                        <p className="mb0 red-1 text-center">{t('payment:???? h???t h???n thanh to??n')}</p>
                    ) : (
                        <>
                            {departData && (
                                <p>
                                    {convertAirportCodeToCityName(departData.flightItem.startPoint)} (
                                    {departData.flightItem.startPoint}) -{' '}
                                    {convertAirportCodeToCityName(departData.flightItem.endPoint)} (
                                    {departData.flightItem.endPoint}):&nbsp;
                                    {renderTextHeader(departReservation?.packageStatus)}
                                </p>
                            )}
                            {returnData && (
                                <p>
                                    {convertAirportCodeToCityName(returnData.flightItem.startPoint)} (
                                    {returnData.flightItem.startPoint}) -{' '}
                                    {convertAirportCodeToCityName(returnData.flightItem.endPoint)} (
                                    {returnData.flightItem.endPoint}):&nbsp;
                                    {renderTextHeader(returnReservation?.packageStatus)}
                                </p>
                            )}
                            {departReservation?.packageStatus === 'HAS_PROMO_24H' ||
                            returnReservation?.packageStatus === 'HAS_PROMO_24H' ? (
                                expiredTime ? (
                                    <p>
                                        {t(`V?? c???a qu?? kh??ch s??? h???t h???n thanh to??n v??o`)}:
                                        <strong>{moment(expiredTime).format('HH:mm - DD/MM/YYYY')}</strong>
                                    </p>
                                ) : (
                                    ''
                                )
                            ) : expiredTime ? (
                                <p>
                                    {t(`Vui l??ng thanh to??n tr?????c`)}:
                                    <strong>{moment(expiredTime).format('HH:mm - DD/MM/YYYY')}</strong>
                                </p>
                            ) : (
                                ''
                            )}
                        </>
                    )}
                </div>
                <div className="holdResult__body">
                    {!isExpired &&
                        reservationData.map((item: any, index: number) => {
                            return (
                                <div className="holdResult__item" key={index}>
                                    <div className="holdResult__header">
                                        <div className="dLeft">
                                            <p>{t('Chi???u ??i')}:</p>
                                            <div className="flexGroup">
                                                <div className="dIcon">
                                                    <IconFlight width={16} height={16} />
                                                </div>
                                                <div className="dText ml10">
                                                    <div className="flightName">
                                                        <p>
                                                            {item['flightRate']['rate']['flightItem']['startPoint']} -{' '}
                                                            {convertAirportCodeToCityName(
                                                                item.flightRate.rate.flightItem.startPoint
                                                            )}
                                                        </p>
                                                        <IconArrowFlight />
                                                        <p>
                                                            {item['flightRate']['rate']['flightItem']['endPoint']} -{' '}
                                                            {convertAirportCodeToCityName(
                                                                item.flightRate.rate.flightItem.endPoint
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dRight">
                                            {item?.providerBookingCode && (
                                                <div className="holdResult__code">
                                                    {t('M?? ?????t ch???')}:&nbsp;
                                                    <strong className="">{item?.providerBookingCode}</strong>
                                                </div>
                                            )}
                                        </div>
                                        <div className="holdResult__note">
                                            {item ? renderText(item.packageStatus, item.differencePrice) : null}
                                        </div>
                                    </div>
                                    <div className="holdResult__cont">
                                        <div className={`flightTicket `}>
                                            <div className={`flightTicket__box `}>
                                                <div className={`flightTicket__left`}>
                                                    <div className="flightTicket__logo">
                                                        <img
                                                            src={showLogoAirProvider(
                                                                item['flightRate']['rate']['flightItem'].airline
                                                            )}
                                                            alt={item['flightRate']['rate']['flightItem'].airline}
                                                        />
                                                    </div>
                                                    <div className="flightTicket__info">
                                                        <div className="tripBox">
                                                            <div className="tripBox__item">
                                                                <p className="p1">
                                                                    {
                                                                        item['flightRate']['rate']['flightItem']
                                                                            .startPoint
                                                                    }
                                                                </p>
                                                                <p className="p2">
                                                                    {convertAirportCodeToCityName(
                                                                        item['flightRate']['rate']['flightItem']
                                                                            .startPoint
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="tripBox__item">
                                                                <p className="p3">
                                                                    {convertMinsToHrsMins(
                                                                        item['flightRate']['rate']['flightItem']
                                                                            .duration
                                                                    )}
                                                                </p>
                                                                <div className="tripBox__icon">
                                                                    <IconFlightTrip />
                                                                </div>
                                                                <p className="p3">
                                                                    {
                                                                        item['flightRate']['rate']['flightItem']
                                                                            .flightNumber
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="tripBox__item">
                                                                <p className="p1">
                                                                    {item['flightRate']['rate']['flightItem'].endPoint}
                                                                </p>
                                                                <p className="p2">
                                                                    {convertAirportCodeToCityName(
                                                                        item['flightRate']['rate']['flightItem']
                                                                            .endPoint
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flightTicket__date">
                                                        <p className="p1">
                                                            {moment(
                                                                item['flightRate']['rate']['flightItem'].startDate
                                                            ).format('dd, DD-MM')}
                                                        </p>
                                                        <p className="p2">
                                                            {moment(
                                                                item['flightRate']['rate']['flightItem'].startDate
                                                            ).format('HH:mm')}{' '}
                                                            -{' '}
                                                            {moment(
                                                                item['flightRate']['rate']['flightItem'].endDate
                                                            ).format('HH:mm')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`flightTicket__right`}
                                                    style={{ flex: '1', alignItems: 'center' }}
                                                >
                                                    <div className="text-right mr15" style={{ flex: '1' }}>
                                                        {item['differencePrice'] === 0 ? (
                                                            <>
                                                                <p className={`semibold`}>
                                                                    {t(`T???ng chi ph??`)}
                                                                    <br />
                                                                    <small className={`italic`}>
                                                                        {t(`???? bao g???m h??nh l?? k?? g???i`)}
                                                                    </small>
                                                                </p>
                                                                <p className="size-18 yellow-1 bold">
                                                                    <DisplayPrice
                                                                        price={
                                                                            item['flightRate']['totalPrice'] +
                                                                            item['flightRate']['totalBaggage']
                                                                        }
                                                                    />
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="">
                                                                    <small className="yellow-1">
                                                                        {t('TXT_GIA_DA_THAY_DOI_TRONG_QUA_TRINH_DAT')}!
                                                                    </small>
                                                                </p>
                                                                <p className="">
                                                                    <del>
                                                                        <small>
                                                                            {t('TXT_GIA_CU')}&nbsp;
                                                                            <DisplayPrice
                                                                                price={
                                                                                    item['flightRate']['totalPrice'] +
                                                                                    item['flightRate']['totalBaggage']
                                                                                }
                                                                            />
                                                                        </small>
                                                                    </del>
                                                                </p>
                                                                <p>
                                                                    {t('TXT_TONG_CHI_PHI')}&nbsp;{' '}
                                                                    <DisplayPrice
                                                                        price={
                                                                            item['flightRate']['totalPrice'] +
                                                                            item['flightRate']['totalBaggage'] +
                                                                            item['differencePrice']
                                                                        }
                                                                    />
                                                                </p>
                                                                <div className="col-md-2">
                                                                    <label
                                                                        htmlFor={`Cookies_${item['flightRate']['rate']['flightItem']}`}
                                                                    >
                                                                        <input
                                                                            id={`Cookies_${item['flightRate']['rate']['flightItem']}`}
                                                                            name={`name_${item['flightRate']['rate']['flightItem']}`}
                                                                            type="checkbox"
                                                                            defaultChecked={false}
                                                                            onChange={() =>
                                                                                selectedRateDiffPrice(
                                                                                    item['flightRateId']
                                                                                )
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flightTicket__show mt0">
                                                        <button
                                                            type="button"
                                                            className="btnAdd"
                                                            style={{ display: 'block' }}
                                                            onClick={(event) =>
                                                                handleOpenDetail(item['flightRate']['rate']['leg'])
                                                            }
                                                        >
                                                            <span>
                                                                {isOpenDetail.filter(
                                                                    (open) =>
                                                                        open['leg'] ===
                                                                            item['flightRate']['rate']['leg'] &&
                                                                        open['show']
                                                                ).length > 0
                                                                    ? t('Thu g???n')
                                                                    : t('Xem chi ti???t')}
                                                            </span>
                                                            <IconDown />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {isOpenDetail.filter(
                                                (open) =>
                                                    open['leg'] === item['flightRate']['rate']['leg'] && open['show']
                                            ).length > 0 ? (
                                                <div
                                                    className="ticketDetail"
                                                    style={{ padding: '15px', borderRadius: '5px', background: '#eee' }}
                                                >
                                                    <div className="ticketDetail__item">
                                                        <p className="semibold size-18 mb15 ticketDetail__title">
                                                            {t('H??NH TR??NH')}
                                                        </p>
                                                        {Array.isArray(
                                                            item['flightRate']['rate']['flightItem'].listSegment
                                                        ) &&
                                                            item['flightRate']['rate']['flightItem'].listSegment
                                                                .length > 0 &&
                                                            item['flightRate']['rate']['flightItem'].listSegment.map(
                                                                (segment: any) => {
                                                                    return (
                                                                        <div
                                                                            className="ticketDetail__list"
                                                                            key={`segment_${segment.id}`}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('??i???m ??i')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {convertAirportCodeToName(
                                                                                            segment.startPoint
                                                                                        )}{' '}
                                                                                        ({segment.startPoint})
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('??i???m ?????n')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {convertAirportCodeToName(
                                                                                            segment.endPoint
                                                                                        )}{' '}
                                                                                        ({segment.endPoint})
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('M?? chuy???n bay')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {segment.flightNumber}
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('Gi??? c???t c??nh')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {moment(
                                                                                            segment.startTime
                                                                                        ).format('HH:mm | DD-MM-YYYY')}
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('Gi??? h??? c??nh')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {moment(segment.endTime).format(
                                                                                            'HH:mm | DD-MM-YYYY'
                                                                                        )}
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('Th???i gian bay')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {convertMinsToHrsMins(
                                                                                            segment.duration
                                                                                        )}
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('H??nh l?? x??ch tay')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {segment.handBaggage}
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('H??nh l?? k?? g???i')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {segment.allowanceBaggage}
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <p className="p1">
                                                                                        {t('H???ng ?????t ch???')}:
                                                                                    </p>
                                                                                    <p className="semibold">
                                                                                        {segment.class}
                                                                                    </p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    )
                                                                }
                                                            )}
                                                    </div>
                                                    <div className="ticketDetail__item">
                                                        <p className="semibold size-18 mb15 ticketDetail__title">
                                                            {t('Chi ti???t gi?? v??')}
                                                        </p>
                                                        <div className="ticketDetail__table">
                                                            <div className="ticketDetail__table__header">
                                                                <div className="ticketDetail__table__cell">
                                                                    <p className="semibold"></p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell">
                                                                    <p className="semibold">{t('H??nh kh??ch')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell">
                                                                    <p className="semibold">{t('S??? l?????ng')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Gi?? v??')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Thu??? v?? ph??')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Chi ph?? v???n h??nh')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('T???ng gi??')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="ticketDetail__table__body">
                                                                {item?.['flightRate']['rate']?.adt > 0 && (
                                                                    <div className="ticketDetail__table__row">
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile" />
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('H??nh kh??ch')}
                                                                            </p>
                                                                            <p>{t('Ng?????i l???ns')}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('S??? l?????ng')}
                                                                            </p>
                                                                            <p>{item?.['flightRate']['rate']?.adt}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">{t('Gi?? v??')}</p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.fareAdt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('Thu??? v?? ph??')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.feeAdt +
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.taxAdt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('Chi ph?? v???n h??nh')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.serviceFeeAdt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('T???ng gi??')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        (item?.['flightRate']['rate']
                                                                                            ?.fareAdt +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.feeAdt +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.taxAdt +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.serviceFeeAdt) *
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.adt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {item?.['flightRate']['rate']?.chd > 0 && (
                                                                    <div className="ticketDetail__table__row">
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile" />
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('H??nh kh??ch')}
                                                                            </p>
                                                                            <p>{t('Tr??? em')}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('S??? l?????ng')}
                                                                            </p>
                                                                            <p>{item?.['flightRate']['rate']?.adt}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">{t('Gi?? v??')}</p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.fareChd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('Thu??? v?? ph??')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.feeChd +
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.taxChd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('Chi ph?? v???n h??nh')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.serviceFeeChd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('T???ng gi??')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        (item?.['flightRate']['rate']
                                                                                            ?.fareChd +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.feeChd +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.taxChd +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.serviceFeeChd) *
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.chd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {item?.['flightRate']['rate']?.inf > 0 && (
                                                                    <div className="ticketDetail__table__row">
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile" />
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('H??nh kh??ch')}
                                                                            </p>
                                                                            <p>{t('Tr??? s?? sinh')}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('S??? l?????ng')}
                                                                            </p>
                                                                            <p>{item?.['flightRate']['rate']?.inf}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">{t('Gi?? v??')}</p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.fareInf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('Thu??? v?? ph??')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.feeInf +
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.taxInf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('Chi ph?? v???n h??nh')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.serviceFeeInf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('T???ng gi??')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        (item?.['flightRate']['rate']
                                                                                            ?.fareInf +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.feeInf +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.taxInf +
                                                                                            item?.['flightRate']['rate']
                                                                                                ?.serviceFeeInf) *
                                                                                        item?.['flightRate']['rate']
                                                                                            ?.inf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="ticketDetail__table__total">
                                                                <span className="span1">{t('T????ng gi?? v??')}:&nbsp;</span>
                                                                <span className="yellow-1">
                                                                    <DisplayPrice
                                                                        price={item?.['flightRate']['rate']?.totalPrice}
                                                                    />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ticketDetail__item">
                                                        <p className="semibold size-18 mb15 ticketDetail__title">
                                                            {t('Th??ng tin h??nh kh??ch v?? h??nh l?? k?? g???i')}
                                                        </p>
                                                        <Table
                                                            size={'middle'}
                                                            pagination={false}
                                                            columns={columnsData}
                                                            dataSource={item['flightRate']['passengers']}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <div className="holdResult__btn">
                    {packageStatus.every((stt) => stt === 'FAILED') || isExpired ? (
                        <button type="button" className="btn btn_orange" onClick={backToHome}>
                            <span>{t('common:Quay l???i trang ch???')}</span>
                        </button>
                    ) : (
                        <button type="button" className="btn btn_orange" onClick={closePopup}>
                            <span>{t('common:Ti???p t???c')}</span>
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default ReservationInfo
