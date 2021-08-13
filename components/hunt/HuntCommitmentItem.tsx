import React from 'react'
import { useTranslation } from 'react-i18next'

import {
    IconHunt0Dong,
    IconHuntComboCalendar,
    IconHuntComboDonggia,
    IconHuntComboTrend,
    IconHuntDiscount,
    IconHuntFlightTicket,
} from '../../constants/icons'
interface Props {
    type?: 'combo' | 'hunt'
}
const HuntCommitmentItem: React.FC<Props> = ({ type }) => {
    const { t } = useTranslation(['common'])

    if (type === 'hunt') {
        return (
            <div className="commitment__row">
                <div className="commitment__col">
                    <div className="commitment__item">
                        <div className="commitment__icon">
                            <IconHuntFlightTicket />
                        </div>
                        <div className="commitment__text">
                            <p className="mb0 semibold">{t('common:Giá vé tốt nhất cập nhật từng phút')}</p>
                        </div>
                    </div>
                </div>
                <div className="commitment__col">
                    <div className="commitment__item">
                        <div className="commitment__icon">
                            <IconHunt0Dong />
                        </div>
                        <div className="commitment__text">
                            <p className="mb0 semibold">{t('common:Khả năng săn vé 0đ cao')}</p>
                        </div>
                    </div>
                </div>
                <div className="commitment__col">
                    <div className="commitment__item">
                        <div className="commitment__icon">
                            <IconHuntDiscount />
                        </div>
                        <div className="commitment__text">
                            <p className="mb0 semibold">{t('common:Giá phòng giảm sâu cho thành viên của Vntrip')}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (type === 'combo') {
        return (
            <div className="commitment__row">
                <div className="commitment__col">
                    <div className="commitment__item">
                        <div className="commitment__icon">
                            <IconHuntComboDonggia />
                        </div>
                        <div className="commitment__text">
                            <p className="mb0 semibold">{t('common:home_commitment_combo')}</p>
                        </div>
                    </div>
                </div>
                <div className="commitment__col">
                    <div className="commitment__item">
                        <div className="commitment__icon">
                            <IconHuntComboCalendar />
                        </div>
                        <div className="commitment__text">
                            <p className="mb0 semibold">{t('common:Combo tự động, chủ động lịch trình')}</p>
                        </div>
                    </div>
                </div>
                <div className="commitment__col">
                    <div className="commitment__item">
                        <div className="commitment__icon">
                            <IconHuntComboTrend />
                        </div>
                        <div className="commitment__text">
                            <p className="mb0 semibold">{t('common:Cập nhật liên tục xu hướng du lịch mới')}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default HuntCommitmentItem
