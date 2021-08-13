import React, { useState } from 'react'
import { IconArrowCombo, IconComboBox, IConComboDongGia, IConComboVin, IConSanve } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dist/next-server/lib/dynamic'
const FormComboDongGia = dynamic(() => import('./FormComboDongGia'))
const FormComboVin = dynamic(() => import('./FormComboVin'))
interface Props {
    handleTypeCombo?: any
    isShowCombo?: 'comboDongGia' | 'comboVinpearl'
}

const ListHuntCombo: React.FC<Props> = ({ handleTypeCombo, isShowCombo }) => {
    const { t } = useTranslation(['combo', 'hotel', 'flight', 'common'])
    const [isShowMobile, setIsShowMobile] = useState<'comboDongGia' | 'comboVin' | ''>('')
    const handleChangeShowMobile = (type: 'comboDongGia' | 'comboVin' | '') => {
        setIsShowMobile(type)
    }
    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className={`comboBox ${isShowCombo === 'comboDongGia' ? 'active' : ''}`}
                onClick={() => handleTypeCombo('comboDongGia')}
            >
                <div className={`comboBox__cont ${isShowMobile === 'comboDongGia' ? 'border_bottom' : ''}`}>
                    <div className="flexGroup2">
                        <div className="icon__desktop">
                            <IConComboDongGia />
                        </div>
                        <div className="comboBox__header addArrow">
                            <div className="comboBox__title">
                                <IconComboBox />
                                <p className="size-16 semibold">{t('common:Combo đồng giá')} 1.999k</p>
                            </div>
                            <p className="gray-11 p1">
                                {t('combo:Vé máy bay khứ hồi + Khách sạn - Đi tất cả địa điểm chỉ với 1 giá duy nhất')}
                            </p>
                        </div>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            className={`btnArrowUp ${isShowMobile === 'comboDongGia' ? 'rotateDown' : ''}`}
                            onClick={() => handleChangeShowMobile('')}
                        >
                            <IconArrowCombo />
                        </div>
                    </div>
                    <button
                        onClick={() => handleChangeShowMobile('comboDongGia')}
                        type="button"
                        className={`btn btn_orange btnSelect ${isShowMobile === 'comboDongGia' ? 'hidden' : ''}`}
                    >
                        {t('combo:Chọn combo', { price: '1.999k' })}
                    </button>
                </div>
                <div className="comboBox__mobile">
                    <div className={`comboBox__mobile__cont ${isShowMobile === 'comboDongGia' ? 'open' : ''}`}>
                        <FormComboDongGia />
                    </div>
                </div>
            </div>
            <div
                className={`comboBox ${isShowCombo === 'comboVinpearl' ? 'active' : ''} `}
                onClick={() => handleTypeCombo('comboVinpearl')}
            >
                <div className={`comboBox__cont ${isShowMobile === 'comboVin' ? 'border_bottom' : ''}`}>
                    <div className="flexGroup2">
                        <div className="icon__desktop">
                            <IConComboVin />
                        </div>
                        <div className="comboBox__header addArrow">
                            <div className="comboBox__title">
                                <IconComboBox />
                                <p className="size-16 semibold mr5">
                                    {t('combo:Combo Vinpearl từ', { price: '2.699k' })}
                                </p>
                                <p className="comboHot">Hot</p>
                            </div>
                            <p className="gray-11 p1">
                                {t('combo:Vé máy bay khứ hồi + Khách sạn - Đi tất cả địa điểm chỉ với 1 giá duy nhất')}
                            </p>
                        </div>
                        <div
                            className={`btnArrowUp ${isShowMobile === 'comboVin' ? 'rotateDown' : ''}`}
                            onClick={() => handleChangeShowMobile('')}
                        >
                            <IconArrowCombo />
                        </div>
                    </div>
                    <button
                        onClick={() => handleChangeShowMobile('comboVin')}
                        type="button"
                        className={`btn btn_orange btnSelect ${isShowMobile === 'comboVin' ? 'hidden' : ''}`}
                    >
                        {t('combo:Chọn combo Vinpearl')}
                    </button>
                </div>
                <div className="comboBox__mobile">
                    <div className={`comboBox__mobile__cont ${isShowMobile === 'comboVin' ? 'open' : ''}`}>
                        <FormComboVin />
                    </div>
                </div>
            </div>
            <div className={`comboBox `}>
                <a href="https://sanve.vntrip.vn" target="_blank">
                    <div className="comboBox__cont">
                        <div className="flexGroup2">
                            <div className="icon__desktop">
                                <IConSanve />
                            </div>
                            <div className="comboBox__header addArrow">
                                <div className="comboBox__title">
                                    <IconComboBox />
                                    <p className="size-16 semibold mr5 black">{t('combo:Săn vé máy bays')} 1.700k</p>
                                    <p className="comboHot">Hot</p>
                                </div>
                                <p className="gray-11 p1">
                                    {t('combo:Công cụ mua vé với mức giá cố định', { price: '1.700k' })}
                                </p>
                            </div>
                        </div>
                        <button type="button" className="btn btn_orange btnSelect">
                            {t('combo:Săn vé máy bay')}
                        </button>
                    </div>
                </a>
            </div>
        </>
    )
}

export default ListHuntCombo
