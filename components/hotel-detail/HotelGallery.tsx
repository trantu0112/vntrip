import React, { Fragment, useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import ImageGallery from 'react-image-gallery'
import { toggleViewHotelInMap } from '../../store/hotel/action'
import { getUrlHotelImage } from '../../utils/hotel'
import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { IconEye, IconImage360 } from '../../constants/icons'
// @ts-ignore
import ScriptTag from 'react-script-tag'

interface Props {
    hotelId: number
    hotelName: string
    images: any[]
    images360: any[]
    latitude: number
    longitude: number
    isDomestic: boolean
    isCombo: boolean
}

const HotelGallery: React.FC<Props> = ({
    hotelId,
    hotelName,
    images,
    images360,
    latitude,
    longitude,
    isDomestic,
    isCombo,
}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel'])
    const [isShow, setIsShow] = useState<boolean>(false)
    const [isShow360, setIsShow360] = useState<boolean>(false)
    const [convertImages, setConvertImages] = useState<any[]>([])
    const [preImages, setPreImages] = useState<any[]>([])
    const [startIndex, setStartIndex] = useState<number>(0)
    useEffect(() => {
        if (images.length > 0) {
            if (isDomestic) {
                setConvertImages(
                    images.map((img: any) => {
                        return {
                            original: getUrlHotelImage({ hotelId, slug: img?.slug ? img?.slug : '', size: 'max' }),
                            thumbnail: getUrlHotelImage({ hotelId, slug: img?.slug ? img?.slug : '', size: '65x65' }),
                        }
                    })
                )

                setPreImages([
                    getUrlHotelImage({ hotelId, slug: images[0] ? images[0].slug : '', size: '471x290' }),
                    getUrlHotelImage({ hotelId, slug: images[1] ? images[1].slug : '', size: '886x290' }),
                    getUrlHotelImage({ hotelId, slug: images[2] ? images[2].slug : '', size: '584x290' }),
                    getUrlHotelImage({ hotelId, slug: images[3] ? images[3].slug : '', size: '275x140' }),
                    getUrlHotelImage({ hotelId, slug: images[4] ? images[4].slug : '', size: '275x140' }),
                    getUrlHotelImage({ hotelId, slug: images[5] ? images[5].slug : '', size: '142x140' }),
                    getUrlHotelImage({ hotelId, slug: images[6] ? images[6].slug : '', size: '142x140' }),
                ])
            } else {
                setConvertImages(
                    images.map((img) => {
                        const converted_img = img.links['1000px'] ? img.links['1000px'].href : img.links['350px'].href
                        return {
                            original: converted_img,
                            thumbnail: converted_img,
                        }
                    })
                )

                setPreImages([
                    images[0] && images[0].links['350px']
                        ? images[0].links['350px'].href
                        : images[0].links['1000px'].href,
                    images[1] && images[1].links['350px']
                        ? images[1].links['350px'].href
                        : images[1].links['1000px'].href,
                    images[2] && images[2].links['350px']
                        ? images[2].links['350px'].href
                        : images[2].links['1000px'].href,
                    images[3] && images[3].links['350px']
                        ? images[3].links['350px'].href
                        : images[3].links['1000px'].href,
                    images[4] && images[4].links['350px']
                        ? images[4].links['350px'].href
                        : images[4].links['1000px'].href,
                    images[5] && images[5].links['350px']
                        ? images[5].links['350px'].href
                        : images[5].links['1000px'].href,
                    images[6] && images[6].links['350px']
                        ? images[6].links['350px'].href
                        : images[6].links['1000px'].href,
                ])
            }
        }
    }, [hotelId, hotelName, images, isDomestic])

    const handleOpenPopup = (index: number) => {
        setIsShow(true)
        setStartIndex(index)
    }

    const handleOpenPopup360 = () => {
        setIsShow360(true)
    }

    const handleClose360 = () => {
        setIsShow360(false)
    }

    const handleOpenMap = () => {
        dispatch(toggleViewHotelInMap(true, latitude, longitude))
    }

    if (Array.isArray(images) && images.length > 0) {
        return (
            <Fragment>
                <div className="hotelDetail__gallery">
                    <div className="gallery">
                        {preImages.map((img, index) => {
                            if (index === 6) {
                                return (
                                    <div className="gallery__col" key={index}>
                                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                        <div className="gallery__item" onClick={() => handleOpenPopup(index)}>
                                            <img src={img} alt={hotelName} />
                                            <div className="gallery__all">
                                                <IconEye />
                                                <p>
                                                    {t('Xem toàn bộ')}
                                                    <br />
                                                    {images.length} {t('hình')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if (Array.isArray(images360) && images360.length > 0 && index === 5) {
                                return (
                                    <div className="gallery__col" key={index}>
                                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                        <div className="gallery__item" onClick={handleOpenPopup360}>
                                            <img src={img} alt={hotelName} />
                                            <div className="gallery__360">
                                                <IconImage360 />
                                                <p>{t('hotel:Xem hình 360')}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                <div className="gallery__col" key={index}>
                                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                    <div className="gallery__item" onClick={() => handleOpenPopup(index)}>
                                        <img src={img} alt={hotelName} />
                                    </div>
                                </div>
                            )
                        })}
                        {!isCombo && (
                            <div className="gallery__col">
                                <div className="gallery__item">
                                    <div className="gallery__map">
                                        <img src="https://statics.vntrip.vn/images/maps/showmap.jpg" alt="show-map" />
                                        <button type="button" onClick={handleOpenMap} className="btn btn_black btn_sm">
                                            <span>{t('Xem bản đồ')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <!--modal-image-360--> */}
                {Array.isArray(images360) && images360.length > 0 && (
                    <div className={`hide-slide360 popup-360 image360-show ${isShow360 ? 'active' : ''}`}>
                        <input id="input_hidden_hotel_id" type="hidden" value={hotelId}></input>
                        <div className="all-image360 addblock">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                            <a id="close-popup-360" className="close-gallery" onClick={handleClose360}>
                                <span>&times;</span>
                            </a>
                            <div className="slideshow-360">
                                <div id="pano" style={{ width: '100%', height: '100%' }}>
                                    <noscript>
                                        <table style={{ width: '100%', height: '100%' }}>
                                            <tr style={{ verticalAlign: 'middle' }}>
                                                <td style={{ textAlign: 'center' }}>
                                                    ERROR:
                                                    <br />
                                                    <br />
                                                    Javascript not activated
                                                </td>
                                            </tr>
                                        </table>
                                    </noscript>
                                    <ScriptTag isHydrating={true} type="text/javascript" src="/viewer.js" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* <!--end modal-image-360--> */}
                <Modal
                    title="Ảnh khách sạn"
                    wrapClassName={'modal-gallery'}
                    visible={isShow}
                    maskClosable={false}
                    footer={null}
                    onCancel={() => {
                        setIsShow(false)
                    }}
                >
                    <ImageGallery items={convertImages} startIndex={startIndex} lazyLoad={true} slideDuration={200} />
                </Modal>
            </Fragment>
        )
    }
    return null
}

export default memo(HotelGallery)
