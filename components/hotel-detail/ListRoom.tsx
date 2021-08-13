import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import { HOTEL_NO_IMAGE } from '../../constants/common'
import { IconViewDetail } from '../../constants/icons'
import RenderBedType from './RenderBedType'
import RenderRoomFacility from './RenderRoomFacility'
import ListRate from './ListRate'
import ListRoomLoading from './ListRoomLoading'
import RoomSoldOut from './RoomSoldOut'
import { IconBed, IconBedFacility } from '../../constants/icons-facilities'

interface Props {
    hotel: any
    checkInDate: string // YYYYMMDD
    nights: number
    roomData: any[]
    isLoading: boolean
}

const ListRoom: React.FC<Props> = ({ hotel, checkInDate, nights, roomData, isLoading }) => {
    const { t } = useTranslation(['hotel', 'common'])
    const [rooms, setRooms] = useState<any[]>([])
    const [detailRoom, setDetailRoom] = useState<any>(null)
    const [filterRefund, setFilterRefund] = useState<boolean>(false)
    const [filterMeal, setFilterMeal] = useState<boolean>(false)

    // reformat room, filter by refundable, filter by meal plan
    useEffect(() => {
        if (Array.isArray(roomData)) {
            const reformat_room = roomData
                .map((room) => {
                    const new_rates = room.rates.filter((rate: any) => {
                        if (filterRefund && filterMeal) {
                            return rate.refundable && rate.meal_plan !== 'no_meal'
                        } else if (filterRefund && !filterMeal) {
                            return rate.refundable
                        } else if (!filterRefund && filterMeal) {
                            return rate.meal_plan !== 'no_meal'
                        } else {
                            return true
                        }
                    })
                    return { ...room, rates: new_rates }
                })
                .filter((room) => room.rates.length > 0)

            setRooms(reformat_room)
        } else {
            setRooms([])
        }
    }, [roomData, filterRefund, filterMeal])

    // filter room, rate by refundable
    const handleClickFilterRefund = () => {
        setFilterRefund((prevState) => !prevState)
    }

    // filter room, rate by meal plan
    const handleClickFilterMeal = () => {
        setFilterMeal((prevState) => !prevState)
    }

    // open popup view detail room
    const handleClickViewDetail = (data: any) => {
        setDetailRoom(data)
    }

    // close popup view detail room
    const handleClosePopup = () => {
        setDetailRoom(null)
    }

    // handle select bedtype
    const handleSelectBedType = (bedData: any, roomIndex?: number) => {
        if (typeof roomIndex !== 'undefined') {
            setRooms((prevState) => {
                const _room = [...prevState]
                _room[roomIndex].bedTypeSelected = bedData
                return _room
            })
        }
    }

    if (isLoading) {
        return <ListRoomLoading showHeader={true} />
    }

    return (
        <>
            <div className="roomFilter">
                <ul>
                    <li className="liTitle">
                        <p>{t('Chọn lọc')}:</p>
                    </li>
                    <li className={filterRefund ? 'active' : ''}>
                        <button type="button" className="btn btn_outline btn_sm" onClick={handleClickFilterRefund}>
                            <span>{t('Miễn phí hủy phòng')}</span>
                        </button>
                    </li>
                    <li className={filterMeal ? 'active' : ''}>
                        <button type="button" className="btn btn_outline btn_sm" onClick={handleClickFilterMeal}>
                            <span>{t('Bao gồm bữa ăn')}</span>
                        </button>
                    </li>
                    {/* <li className="liPrice">
                        <CheckboxShowFinalPriceHotel />
                    </li> */}
                </ul>
            </div>

            {!isLoading && Array.isArray(roomData) && roomData.length === 0 && (
                <RoomSoldOut checkInDate={checkInDate} nights={nights} hotel={hotel} />
            )}

            <div className="listRoom">
                {Array.isArray(rooms) &&
                    rooms.map((item, index) => {
                        let key = item.id + '_' + index
                        if (filterRefund) key += '_refund'
                        else key += '_no_refund'
                        if (filterMeal) key += '_meal'
                        else key += '_no_meal'
                        return (
                            <div className="listRoom__item" key={key}>
                                <div className="roomItem">
                                    <div
                                        className={`roomItem__header ${
                                            Array.isArray(item.reformat_bed_types) && item.reformat_bed_types.length > 1
                                                ? 'pb60'
                                                : ''
                                        }`}
                                    >
                                        <div
                                            className="roomItem__img"
                                            onClick={() => handleClickViewDetail(item)}
                                            onKeyUp={() => handleClickViewDetail(item)}
                                            tabIndex={0}
                                            role="button"
                                        >
                                            {item?.provider === 'VNTRIP' ? (
                                                <img src={item?.thumb?.thumb_image || HOTEL_NO_IMAGE} alt={'room'} />
                                            ) : (
                                                <img
                                                    src={item?.photos?.[0]?.thumb_image || HOTEL_NO_IMAGE}
                                                    alt={'room'}
                                                />
                                            )}
                                        </div>
                                        <div className="roomItem__info">
                                            <div className="roomItem__info__left">
                                                <div className="roomItem__name">
                                                    <button
                                                        type="button"
                                                        className="yellow-1 semibold"
                                                        onClick={() => handleClickViewDetail(item)}
                                                    >
                                                        <span>{item.name}</span>
                                                    </button>
                                                </div>
                                                <div className="roomItem__flex">
                                                    <RenderRoomFacility
                                                        reformatBedTypes={item.reformat_bed_types}
                                                        roomArea={item.room_area}
                                                        specificFacilities={item.specific_facilities}
                                                        isRapid={item.provider}
                                                    />
                                                    {Array.isArray(item.reformat_bed_types) &&
                                                        item.reformat_bed_types.length > 1 && (
                                                            <RenderBedType
                                                                roomIndex={index}
                                                                bedTypes={item.bed_types}
                                                                reformatBedTypes={item.reformat_bed_types}
                                                                bedTypeSelected={item.bedTypeSelected}
                                                                handleSelectBedType={handleSelectBedType}
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                            <div className="roomItem__info__right">
                                                <div className="roomItem__show">
                                                    <button
                                                        type="button"
                                                        className="btnShowDetail"
                                                        onClick={() => handleClickViewDetail(item)}
                                                    >
                                                        <span>{t('Xem chi tiết')}</span>
                                                        <IconViewDetail />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <ListRate rates={item.rates} room={item} hotel={hotel} nights={nights} />
                                </div>
                            </div>
                        )
                    })}
            </div>
            <Modal
                title={t('Chi tiết phòng') + ' ' + detailRoom?.name}
                wrapClassName={'modal-room'}
                visible={!!detailRoom}
                maskClosable={false}
                footer={null}
                onCancel={handleClosePopup}
            >
                <div className="roomDetail">
                    <div className="roomDetail__slide">
                        {detailRoom && Array.isArray(detailRoom.photos) && detailRoom.photos.length > 0 && (
                            <ImageGallery
                                items={detailRoom.photos.map((item: any) => {
                                    return {
                                        original: item.room_image,
                                        thumbnail: item.thumb_image,
                                    }
                                })}
                                startIndex={0}
                                lazyLoad={true}
                            />
                        )}
                    </div>
                    <div className="roomDetail__text">
                        <p className="medium">{t('Mô tả phòng')}:</p>
                        {detailRoom?.description ? (
                            <div dangerouslySetInnerHTML={{ __html: detailRoom?.description }} />
                        ) : null}
                        <p>
                            • {t('Diện tích')}:&nbsp;{detailRoom?.room_area}
                        </p>
                        <p>
                            • {t('Điều hòa')}:&nbsp;
                            {detailRoom?.specific_facilities?.air_conditioner ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p>
                            • {t('Hút thuốc')}:&nbsp;
                            {detailRoom?.specific_facilities?.no_smoking ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p>
                            • {t('Bể bơi')}:&nbsp;
                            {detailRoom?.specific_facilities?.private_pool ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p>
                            • {t('Bồn tắm')}:&nbsp;
                            {detailRoom?.specific_facilities?.bathtub ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p>
                            • {t('Truyền hình cáp')}:&nbsp;
                            {detailRoom?.specific_facilities?.tv_and_cable ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p>
                            • {t('Tivi mmàn hình phẳng')}:&nbsp;
                            {detailRoom?.specific_facilities?.lcd ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p>
                            • {t('Minibar')}:&nbsp;
                            {detailRoom?.specific_facilities?.minibar ? t(`common:Có`) : t(`common:Không`)}
                        </p>
                        <p className="medium">{t('Tiện ích phòng')}</p>
                        <p>{detailRoom?.facilities}</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ListRoom
