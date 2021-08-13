import React from 'react'
import DisplayPrice from '../common/DisplayPrice'
import { HOTEL_NO_IMAGE } from '../../constants/common'
import { getCodeFromProvinceId } from '../../utils/combo'
interface Props {
    data: any
    priceForOnePeople: any
}
const ItemCombo: React.FC<Props> = ({ data, priceForOnePeople }) => {
    return (
        <div className="itemCombo">
            <a
                href={
                    process.env.NEXT_PUBLIC_COMBOVIN_URL +
                    '/combo-detail?province_id=' +
                    data?.hotel?.[0]?.province_id +
                    '&code=' +
                    getCodeFromProvinceId(data?.hotel?.[0]?.province_id) +
                    '&id=' +
                    data?.id +
                    '&nights=' +
                    data?.nights
                }
            >
                <div className="itemComboContent">
                    <div className="image">
                        <img src={data?.image_deal?.[0]?.image || HOTEL_NO_IMAGE} alt="" />
                    </div>
                    <div className="content">
                        <div className="textCombo">
                            <p className="title">{data.name}</p>
                            <p dangerouslySetInnerHTML={{ __html: data?.details }}></p>
                        </div>
                        <div className="priceCombo">
                            <div className="priceText">
                                <p>
                                    <span className="size-20 semibold yellow-2">
                                        {' '}
                                        <DisplayPrice price={priceForOnePeople(data)} />{' '}
                                    </span>
                                    <span className="size-12">/khách</span>
                                </p>
                                <p className="size-12">Giá cuối, không phụ phí</p>
                            </div>
                            <div className="priceBtn">
                                <button className="btn btn_orange">Xem ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default ItemCombo
