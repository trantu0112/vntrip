import React, { useState } from 'react'
import { Input } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { BedType } from '../../constants/interface'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerNote } from '../../store/checkout/action'
import RenderBedType from '../hotel-detail/RenderBedType'

interface iProps {
    bedTypeSelected?: BedType
    reformatBedTypes: BedType[]
    handleSelectBedType: (bedData: any) => void
    data: any
}

const OtherInfo: React.FC<iProps> = ({ reformatBedTypes, handleSelectBedType, bedTypeSelected, data }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['payment', 'hotel'])
    const customerNote = useSelector((state: any) => state.checkout.customerNote || '')
    const [isShow, setIsShow] = useState(false)

    const handleShowInfo = () => {
        setIsShow((prevState) => !prevState)
    }

    const handleChangeNote = (note: string) => {
        dispatch(setCustomerNote(note))
    }

    const styleIcon = { fontSize: 10, paddingTop: 4 }

    return (
        <>
            <button type="button" className="btnLink mb15" onClick={handleShowInfo}>
                <span>{t('payment:Thông tin khác')}</span>
                &nbsp;
                {isShow ? <UpOutlined style={styleIcon} /> : <DownOutlined style={styleIcon} />}
            </button>
            <div className={`checkoutInfo__other ${isShow ? 'open' : ''}`}>
                {data?.room?.additional_info?.checkin?.instructions && (
                    <>
                        <p className="semibold">{t('hotel:Hướng dẫn checkin')}</p>
                        <p
                            className="mb10 size-14"
                            dangerouslySetInnerHTML={{ __html: data?.room?.additional_info?.checkin?.instructions }}
                        />
                    </>
                )}

                {data?.room?.additional_info?.checkin?.special_instructions && (
                    <>
                        <p className="semibold">{t('hotel:Hướng dẫn khác')}</p>
                        <p
                            className="mb10 size-14"
                            dangerouslySetInnerHTML={{
                                __html: data?.room?.additional_info?.checkin?.special_instructions,
                            }}
                        />
                    </>
                )}

                {(data?.room?.additional_info?.checkin || data?.room?.additional_info?.checkout) && (
                    <>
                        <p className="semibold">{t('hotel:Nhận phòng/ trả phòng')}</p>
                        <ul className="mb10">
                            <li>
                                {t('hotel:Nhận phòng từ')}: {data?.room?.additional_info?.checkin.begin_time}
                            </li>
                            <li>
                                {t('hotel:Trả phòng đến')}: {data?.room?.additional_info?.checkout.time}
                            </li>
                        </ul>
                    </>
                )}

                {data?.room?.additional_info?.policies && (
                    <>
                        <p className="semibold">{t('hotel:Chính sách')}</p>
                        <p
                            className="mb10 size-14"
                            dangerouslySetInnerHTML={{
                                __html: data?.room?.additional_info?.policies?.know_before_you_go,
                            }}
                        ></p>
                    </>
                )}
                {data?.rate?.cancel_policies && (
                    <>
                        <p className="semibold">{t('hotel:Chính sách hủy phòng')}</p>
                        <p
                            className="mb10 size-14"
                            dangerouslySetInnerHTML={{ __html: data?.rate?.cancel_policies }}
                        ></p>
                    </>
                )}
                <p className="semibold">{t('payment:Yêu cầu giường')}</p>

                {Array.isArray(reformatBedTypes) && reformatBedTypes.length > 0 && (
                    <RenderBedType
                        dropdownClass={'mt0 mb15'}
                        reformatBedTypes={reformatBedTypes}
                        bedTypeSelected={bedTypeSelected}
                        handleSelectBedType={handleSelectBedType}
                    />
                )}

                <p className="semibold">{t('payment:Yêu cầu đặc biệt')}</p>
                <Input.TextArea
                    placeholder={t('payment:Yêu cầu đặc biệt')}
                    rows={3}
                    value={customerNote}
                    onChange={(event) => handleChangeNote(event.target.value)}
                />
            </div>
        </>
    )
}

export default OtherInfo
