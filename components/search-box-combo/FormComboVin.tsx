import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListComboVin, ListPlace } from '../../constants/combo'
import { ComboVin } from '../../constants/interface'
import Link from 'next/link'

const FormComboVin = () => {
    const { t } = useTranslation(['common', 'hotel', 'flight', 'combo'])
    const handleClickCombo = (id: number) => {
        window.open(process.env.NEXT_PUBLIC_COMBOVIN_URL + '/home?province_id=' + id)
    }
    return (
        <div className="comboVinPearl">
            <p className="semibold size-16">{t('combo:Bạn muốn du lịch ở đâu')}?</p>
            <div className="flexGroup2 placeMobile">
                {ListComboVin.map((res: ComboVin) => {
                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                        <div
                            key={res.provinceId}
                            onClick={() => handleClickCombo(res.provinceId)}
                            className="comboVinPearl__box"
                        >
                            <div className="comboVinPearl__img">
                                <img src={res.image} alt={res.name} />
                            </div>
                            <div className="comboVinPearl__cont">
                                <p className="semibold">{t(`combo:${res.name}`)}</p>
                                <p className="size-12 blue-2">{res.quantity} combo</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="list__place flexGroup2 placeDesktop">
                {ListPlace.map((res: { image: string; text: string; link: string }, index: number) => {
                    return (
                        <Link href={res.link} key={index}>
                            <div className="item__place">
                                <div className="image">
                                    <img src={res.image} alt={res.text} />
                                </div>
                                <div className="text">{res.text}</div>
                                <div className="bg"></div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default FormComboVin
