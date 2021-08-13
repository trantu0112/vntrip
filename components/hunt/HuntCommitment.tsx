import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import { useMounted } from '../../utils/custom-hook'
import { isMobileScreen } from '../../utils/common'
import HuntCommitmentItem from './HuntCommitmentItem'

const HuntCommitment = () => {
    const { t } = useTranslation(['common'])
    const [isMobile, setIsMobile] = useState(false)
    const isMount = useMounted()
    const setting = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        className: `commitment__group`,
    }
    useEffect(() => {
        if (isMount) {
            if (isMobileScreen()) {
                setIsMobile(true)
            }
        }
    }, [isMount])
    return (
        <div className="commitment">
            <div className="container">
                <h2 className="size-24 text-center mb25 bold">{t('common:Cam kết từ Vntrip')}</h2>
                {isMobile ? (
                    <Slider {...setting}>
                        <HuntCommitmentItem type="hunt" />
                        <HuntCommitmentItem type="combo" />
                    </Slider>
                ) : (
                    <div className="commitment__group">
                        <HuntCommitmentItem type="hunt" />
                        <HuntCommitmentItem type="combo" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default HuntCommitment
