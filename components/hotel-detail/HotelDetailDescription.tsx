import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconHotel } from '../../constants/icons'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface iProps {
    name: string
    content: string
    categories: any[]
    facilitiesPerCat: any
    checkInTime: string
    checkOutTime: string
}

const HotelDetailDescription: React.FC<iProps> = ({
    name,
    content,
    categories,
    facilitiesPerCat,
    checkInTime,
    checkOutTime,
}) => {
    const { t, i18n } = useTranslation(['hotel', 'common'])
    const [isShowMore, setIsShowMore] = useState<boolean>(false)

    const renderFacilitiesByCategories = (categories: any[], facilitiesPerCat: any) => {
        let allGroups = []
        for (const cate in categories) {
            if (categories.hasOwnProperty(cate)) {
                let title = i18n.language === 'vi' ? 'name_vi' : 'name'
                let facisForOneGroup = []
                if (facilitiesPerCat.hasOwnProperty(cate)) {
                    facisForOneGroup = facilitiesPerCat[cate].map((item: any) => <p key={item.id}>• {item[title]}</p>)
                }
                allGroups.push([
                    <div className="hotelServ__group" key={cate}>
                        <p className="pTitle">
                            <span>{categories[cate][title]}</span>
                        </p>
                        {facisForOneGroup}
                    </div>,
                ])
            }
        }
        return allGroups
    }

    return (
        <div className="hotelServ">
            <h2 className="mb30">
                {t('Thông tin về')} {name}
            </h2>
            <div className="hotelServ__body">
                <div className="hotelServ__item">
                    {content && (
                        <>
                            <div className="hotelServ__title">
                                <p>{t('Mô tả khách sạn')}</p>
                            </div>
                            <div className="hotelServ__cont">
                                <div
                                    className={`pText ${isShowMore ? 'pText_full' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />

                                <button
                                    type="button"
                                    className="btnMore"
                                    onClick={() => {
                                        setIsShowMore((prevState) => !prevState)
                                    }}
                                >
                                    <span> {isShowMore ? t('common:Thu gọn') : t('common:Xem thêm')}</span>&nbsp;
                                    {isShowMore ? (
                                        <UpOutlined style={{ fontSize: 10 }} />
                                    ) : (
                                        <DownOutlined style={{ fontSize: 10 }} />
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className="hotelServ__item">
                    <div className="hotelServ__title">
                        <p>{t('Tiện ích xung quanh')}</p>
                    </div>
                    <div className="hotelServ__cont">
                        <div className="hotelServ__flex">
                            {renderFacilitiesByCategories(categories, facilitiesPerCat)}
                        </div>
                    </div>
                </div>
                <div className="hotelServ__item">
                    <div className="hotelServ__title">
                        <p>{t('Thông tin cần biết')}</p>
                    </div>
                    <div className="hotelServ__cont">
                        <div className="hotelServ__group w100">
                            <p className="pTitle">
                                <IconHotel />
                                <span>{t('Nhận phòng/ trả phòng')}</span>
                            </p>
                            <p>
                                {t('Nhận phòng từ')}: <strong>{checkInTime}</strong>
                            </p>
                            <p>
                                {t('Trả phòng đến')}: <strong>{checkOutTime}</strong>
                            </p>
                            <br />
                            <p>{t('Hủy đặt phòng/ trả trước')}</p>
                            <p>
                                {t(
                                    'Các loại phòng khác nhau có thể có chính sách hủy đặt phòng và chính sách thanh toán trước khác nhau'
                                )}
                                . {t('Vui lòng kiểm tra chi tiết chính sách phòng khi chọn phòng ở phía trên')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelDetailDescription
