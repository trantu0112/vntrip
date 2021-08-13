import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    IconAirConditioner,
    IconBathtub,
    IconBedFacility,
    IconLCD,
    IconMiniBar,
    IconNoSmoking,
    IconPool,
    IconTvAndCable,
} from '../../constants/icons-facilities'

interface iProps {
    specificFacilities?: any
    roomArea: string
    reformatBedTypes: any
    isRapid: any
}

const RenderRoomFacility: React.FC<iProps> = ({ specificFacilities, roomArea, reformatBedTypes, isRapid }) => {
    const { t } = useTranslation(['hotel'])
    const renderBedData = () => {
        if (reformatBedTypes.length === 1) {
            if (reformatBedTypes[0].bed_data.length === 1) {
                return (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconBedFacility />
                            {isRapid === 'rapid' ? (
                                <span>{reformatBedTypes[0].description}</span>
                            ) : (
                                <span>
                                    {`${reformatBedTypes[0].bed_data[0].count}  ${
                                        reformatBedTypes[0].bed_data[0].type ||
                                        reformatBedTypes[0].bed_data[0].description
                                    }`}
                                </span>
                            )}
                        </div>
                    </div>
                )
            } else if (reformatBedTypes[0].bed_data.length > 1) {
                return (
                    <div className="facilities__item beds">
                        <div className="tooltip">
                            <IconBedFacility />

                            {reformatBedTypes[0].bed_data.map((item: any, index: any) => {
                                return <span key={index}>{`${item.count} ${item.description || item.type}`}</span>
                            })}
                        </div>
                    </div>
                )
            }
        }
    }
    return (
        <div className="roomItem__facilities">
            <div className="facilities">
                {renderBedData()}

                <div className="facilities__item">
                    <div className="tooltip">
                        <svg width={14} height={14} viewBox="0 0 512 512.001" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#878787"
                                d="m497.355469 401.644531c19.496093 19.496094 19.496093 51.214844 0 70.710938-.027344.03125-.058594.058593-.089844.089843l-34.210937 33.785157c-3.898438 3.847656-8.976563 5.769531-14.050782 5.769531-5.164062 0-10.320312-1.984375-14.234375-5.945312-7.757812-7.859376-7.679687-20.523438.179688-28.285157l20.015625-19.769531h-320.964844c-44.113281 0-80-35.886719-80-80v-321.449219l-19.953125 19.6875c-7.863281 7.757813-20.527344 7.671875-28.285156-.191406-7.757813-7.863281-7.671875-20.527344.191406-28.285156l33.789063-33.332031c19.441406-19.179688 51.074218-19.179688 70.515624 0l33.789063 33.332031c7.863281 7.757812 7.949219 20.421875.191406 28.285156-3.914062 3.964844-9.074219 5.953125-14.238281 5.953125-5.074219 0-10.148438-1.917969-14.046875-5.761719l-21.953125-21.660156v323.421875c0 22.054688 17.945312 40 40 40h322.992188l-22.042969-21.769531c-7.859375-7.761719-7.941407-20.425781-.179688-28.285157 7.761719-7.855468 20.425781-7.9375 28.285157-.175781l34.210937 33.785157c.03125.03125.0625.058593.089844.089843zm-45.355469-401.644531h-259c-11.074219 0-20.039062 9-20 20.074219.042969 11.015625 8.984375 19.925781 20 19.925781h259c11.046875 0 20 8.953125 20 20v260c0 11.015625 8.910156 19.960938 19.925781 20 11.074219.039062 20.074219-8.925781 20.074219-20v-260c0-33.136719-26.863281-60-60-60zm-158 342.890625c11.046875 0 20-8.953125 20-20v-89.015625c0-30.328125-24.671875-55-55-55-13.285156 0-25.484375 4.734375-35 12.605469-9.515625-7.871094-21.714844-12.605469-35-12.605469-7.628906 0-14.902344 1.566406-21.511719 4.386719-3.558593-3.257813-8.285156-5.261719-13.488281-5.261719-11.046875 0-20 8.953125-20 20v125c0 11.046875 8.953125 20 20 20s20-8.953125 20-20v-89.125c0-8.269531 6.730469-15 15-15s15 6.730469 15 15v89.125c0 11.046875 8.953125 20 20 20s20-8.953125 20-20v-89.125c0-8.269531 6.730469-15 15-15s15 6.730469 15 15v89.015625c0 11.046875 8.953125 20 20 20zm90.75-234.890625c-.105469 0-.207031.015625-.3125.015625-.101562 0-.203125-.015625-.308594-.015625-25.433594 0-46.128906 20.71875-46.128906 46.183594 0 11.042968 8.953125 20 20 20s20-8.957032 20-20c0-3.351563 2.808594-6.183594 6.128906-6.183594.105469 0 .207032-.015625.3125-.015625.101563 0 .203125.015625.308594.015625 3.183594 0 5.894531 2.601562 6.113281 5.769531-.394531 1.464844-3.460937 10.523438-22.625 31.605469-11.886719 13.070312-23.566406 23.714844-23.679687 23.816406-6.121094 5.554688-8.191406 14.304688-5.214844 22.011719 2.976562 7.710937 10.390625 12.796875 18.65625 12.796875h54c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20h-6.878906c17.757812-20.90625 25.757812-36.464844 25.757812-49.816406 0-25.464844-20.695312-46.183594-46.128906-46.183594zm0 0"
                            />
                        </svg>
                        <span>
                            {t('Diện tích')} {roomArea}
                        </span>
                    </div>
                </div>

                {specificFacilities?.air_conditioner && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconAirConditioner />
                            <span>{t('Điều hòa')}</span>
                        </div>
                    </div>
                )}
                {specificFacilities?.no_smoking && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconNoSmoking />
                            <span>{t('Không hút thuốc')}</span>
                        </div>
                    </div>
                )}
                {specificFacilities?.private_pool && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconPool color={'#878787'} />
                            <span>{t('Hồ bơi riêng')}</span>
                        </div>
                    </div>
                )}
                {specificFacilities?.bathtub && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconBathtub />
                            <span>{t('Bồn tắm')}</span>
                        </div>
                    </div>
                )}
                {specificFacilities?.lcd && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconLCD />
                            <span>{t('TV màn hình phẳng')}</span>
                        </div>
                    </div>
                )}
                {specificFacilities?.tv_and_cable && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconTvAndCable />
                            <span>{t('TV + Truyền hình cáp')}</span>
                        </div>
                    </div>
                )}
                {specificFacilities?.minibar && (
                    <div className="facilities__item">
                        <div className="tooltip">
                            <IconMiniBar />
                            <span>{t('Mini bar')}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RenderRoomFacility
