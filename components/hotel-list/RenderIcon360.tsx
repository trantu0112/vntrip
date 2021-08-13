import React from 'react'
import { IconImage360 } from '../../constants/icons'

interface iProps {
    isHave360img: boolean
}

const RenderIcon360: React.FC<iProps> = ({ isHave360img }) => {
    if (isHave360img) {
        return (
            <div className="tooltip360">
                <div className="tooltipBox">
                    <IconImage360 />
                    <div className="tooltipBox__cont">
                        <p className="semibold">Khám phá ảnh khách sạn 360°</p>
                        <p className="mb0">
                            Lo ngại vì thực tế "không như là ảnh mạng"? Hãy trải nghiệm những hình ảnh khách sạn 360°
                            chân thực nhất, duy nhất chỉ có trên Vntrip.vn, giúp bạn an tâm hơn về lựa chọn của mình
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default RenderIcon360
