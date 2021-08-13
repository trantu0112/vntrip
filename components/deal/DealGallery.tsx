import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { getUrlDealImage } from '../../utils/common'
import { IconEye } from '../../constants/icons'
import ImageGallery from 'react-image-gallery'

interface Props {
    images: any[]
    name: string
}

const DealGallery: React.FC<Props> = ({ images, name }) => {
    const { t } = useTranslation(['common'])
    const [isShow, setIsShow] = useState<boolean>(false)
    const [convertImages, setConvertImages] = useState<any[]>([])
    const [startIndex, setStartIndex] = useState<number>(0)

    useEffect(() => {
        if (images.length > 0) {
            setConvertImages(
                images.map((img: any) => {
                    return {
                        original: img.image, //getUrlDealImage(img.image, 'max'),
                        thumbnail: getUrlDealImage(img.image, '65x65'),
                    }
                })
            )
        }
    }, [images, name])

    const handleOpenPopup = (index: number) => {
        setIsShow(true)
        setStartIndex(index)
    }
    return (
        <>
            <div className="galleryGrid">
                <div className="galleryGrid__item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events */}
                    <button type="button" onClick={() => handleOpenPopup(0)}>
                        <img src={getUrlDealImage(images?.[0]?.image, '272x310')} alt={name} />
                    </button>
                </div>
                <div className="galleryGrid__item">
                    <button type="button" onClick={() => handleOpenPopup(1)}>
                        <img src={getUrlDealImage(images?.[1]?.image, '550x310')} alt={name} />
                    </button>
                </div>
                <div className="galleryGrid__item">
                    <button type="button" className="small" onClick={() => handleOpenPopup(2)}>
                        <img src={getUrlDealImage(images?.[2]?.image, '272x150')} alt={name} />
                        <div className="itemBg">
                            <IconEye />
                            <p>{t('Xem tất cả hình ảnh')}</p>
                        </div>
                    </button>
                </div>
                <div className="galleryGrid__item">
                    <button className="small" onClick={() => handleOpenPopup(3)}>
                        <img src={getUrlDealImage(images?.[3]?.image, '272x150')} alt={name} />
                    </button>
                </div>
                <div className="galleryGrid__item">
                    <button className="small" onClick={() => handleOpenPopup(4)}>
                        <img src={getUrlDealImage(images?.[4]?.image, '272x150')} alt={name} />
                    </button>
                </div>
            </div>
            <Modal
                title={name}
                wrapClassName={'modal-gallery'}
                visible={isShow}
                maskClosable={false}
                footer={null}
                onCancel={() => {
                    setIsShow(false)
                }}
            >
                <ImageGallery items={convertImages} startIndex={startIndex} lazyLoad={true} />
            </Modal>
        </>
    )
}

export default DealGallery
