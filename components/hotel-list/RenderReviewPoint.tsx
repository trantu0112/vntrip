import React, { useEffect, useState } from 'react'
import { IconVntripStarRate } from '../../constants/icons'
import { useTranslation } from 'react-i18next'

interface iProps {
    count?: number
    point?: number
}

const RenderRewviewPoint: React.FC<iProps> = ({ count, point }) => {
    const { t } = useTranslation('hotel')
    const [reviewText, setReviewText] = useState<string>('')
    const [reviewPoint, setReviewPoint] = useState<number | string>(0)
    useEffect(() => {
        if (point) {
            const _point = point % 1 === 0 ? point : point.toFixed(1)
            let reviewText = ''
            if (_point >= 9.5) {
                reviewText = t('Xuất sắc')
            } else if (9 <= _point && _point < 9.5) {
                reviewText = t('Tuyệt hảo')
            } else if (8.6 <= _point && _point < 9) {
                reviewText = t('Tuyệt vời')
            } else if (8 <= _point && _point < 8.6) {
                reviewText = t('Rất tốt')
            } else if (7 <= _point && _point < 8) {
                reviewText = t('Tốt')
            } else if (4 <= _point && _point < 7) {
                reviewText = t('Điểm đánh giá')
            }
            setReviewText(reviewText)
            setReviewPoint(_point)
        }
    }, [point, t])
    if (point)
        return (
            <div className="ratePoint">
                <div className="ratePoint__numb">
                    <IconVntripStarRate />
                    <span>{reviewPoint}</span>
                </div>
                <div className="ratePoint__text">
                    <p className="p1">{reviewText}&nbsp;</p>
                    {typeof count === 'number' && count > 0 && (
                        <p className="p2">
                            ({count} {t('đánh giá')})
                        </p>
                    )}
                </div>
            </div>
        )
    return null
}

export default RenderRewviewPoint
