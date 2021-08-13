import React from 'react'
import { useTranslation } from 'react-i18next'
import { convertMealPlan } from '../../utils/hotel'
import { IconMeal } from '../../constants/icons'

interface Props {
    mealPlan: string
}

const RenderMealPlan: React.FC<Props> = ({ mealPlan }) => {
    const { t } = useTranslation(['hotel'])
    return (
        <div className={`roomPolicy__item ${mealPlan === 'no_meal' ? 'red-1' : 'green-1'}`}>
            <div className="roomPolicy__icon">
                <IconMeal isHaveMeal={mealPlan !== 'no_meal'} />
            </div>
            <div className="roomPolicy__text">
                <span>{t('Bữa ăn')}</span>
                <span>{convertMealPlan(mealPlan, t)}</span>
            </div>
        </div>
    )
}

export default RenderMealPlan
