import React from 'react'
import DealItem from '../deal/DealItem'

interface Props {
    data: any[]
}

const HotDeal: React.FC<Props> = ({ data }) => {
    return (
        <div className="hotDeal">
            <div className="container">
                <h2 className="size-24 text-center mb25 bold">Hot deal</h2>
                <div className="listDeal">
                    {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((deal) => {
                            return <DealItem key={deal.id} data={deal} isHideDetail={true} />
                        })}
                </div>
                <div className="btnCenter">
                    <a href="/khuyen-mai" className="btn btn_outlineOrange btn_lg">
                        <span>Xem thêm các Deal hot nhất</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HotDeal
