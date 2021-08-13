import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dist/next-server/lib/dynamic'
const FormComboDongGia = dynamic(() => import('./FormComboDongGia'))
const FormComboVin = dynamic(() => import('./FormComboVin'))
const ListHuntCombo = dynamic(() => import('./ListHuntCombo'))

interface Props {
    isShow?: boolean
}

const SearchBoxCombo: React.FC<Props> = React.memo(({ isShow }) => {
    const { t } = useTranslation(['common', 'hotel', 'flight', 'combo'])
    const [isShowCombo, setIsShowCombo] = useState<'comboDongGia' | 'comboVinpearl'>('comboDongGia')
    const handleTypeCombo = (combo: any) => {
        setIsShowCombo(combo)
    }
    return (
        <div className={`searchBox__combo ${isShow ? 'open' : ''}`}>
            <div className="searchBox__cont">
                <div className="searchBox__item">
                    <p className="size-16 semibold">{t('combo:Bạn muốn trải nghiệm combo nào')}?</p>
                    <div className="flexGroup2">
                        <ListHuntCombo handleTypeCombo={handleTypeCombo} isShowCombo={isShowCombo} />
                    </div>
                </div>
                <div className={`searchBox__item ${isShowCombo === 'comboDongGia' ? 'combo1' : 'combo2'} open`}>
                    {isShowCombo === 'comboDongGia' && <FormComboDongGia />}
                    {isShowCombo === 'comboVinpearl' && <FormComboVin />}
                </div>
            </div>
        </div>
    )
})

export default SearchBoxCombo
