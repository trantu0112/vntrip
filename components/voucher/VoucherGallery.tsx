import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { getUrlDealImage } from '../../utils/common'
import ImageGallery from 'react-image-gallery'

interface Props {
    images: any[]
    name: string
}

const VoucherGallery: React.FC<Props> = ({ images, name }) => {
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
                {images.length === 1 ? (
                    <div className="galleryGrid__item w100">
                        <button type="button" onClick={() => handleOpenPopup(0)}>
                            <img src={getUrlDealImage(images?.[0]?.image, '1140x310')} alt={name} />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="galleryGrid__item">
                            <button type="button" onClick={() => handleOpenPopup(0)}>
                                <img src={getUrlDealImage(images?.[0]?.image, '550x310')} alt={name} />
                            </button>
                        </div>
                        <div className="galleryGrid__item">
                            <button type="button" onClick={() => handleOpenPopup(1)}>
                                <img src={getUrlDealImage(images?.[1]?.image, '550x310')} alt={name} />
                            </button>
                        </div>
                    </>
                )}
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

export default VoucherGallery
