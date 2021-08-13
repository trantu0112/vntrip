import React from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Dropdown } from 'antd'
import { IconDown } from '../../constants/icons'
import { IconBed } from '../../constants/icons-facilities'
import { BedType } from '../../constants/interface'

interface iProps {
    dropdownClass?: string
    roomIndex?: number
    bedTypeSelected?: BedType
    reformatBedTypes: BedType[]
    bedTypes?: any[]
    isDomestic?: boolean
    handleSelectBedType: (bedData: any, roomIndex?: number) => void
}

const RenderBedType: React.FC<iProps> = ({
    dropdownClass,
    bedTypeSelected,
    reformatBedTypes,
    handleSelectBedType,
    roomIndex,
}) => {
    const { t } = useTranslation(['hotel'])
    const menu = Array.isArray(reformatBedTypes) ? (
        <Menu selectedKeys={[bedTypeSelected?.group_id || reformatBedTypes[0]['group_id']]}>
            {reformatBedTypes.map((item) => {
                return (
                    <Menu.Item
                        key={item.group_id}
                        className={'active'}
                        onClick={() => handleSelectBedType(item, roomIndex)}
                    >
                        <button type="button">
                            <IconBed />
                            <span>
                                {item.bed_data.length === 1 ? (
                                    <strong>
                                        {item.bed_data[0].count + ' ' + item.bed_data[0].type ||
                                            item.bed_data[0].description}
                                    </strong>
                                ) : (
                                    item.bed_data.map((bed: any, index) => {
                                        return (
                                            <strong key={index} className="strongBed">
                                                {bed.count + ' ' + bed.type || bed.description}
                                            </strong>
                                        )
                                    })
                                )}
                            </span>
                        </button>
                    </Menu.Item>
                )
            })}
            <Menu.Item>
                <li>
                    <p>{t('Yêu cầu loại giường không được đảm bảo')}</p>
                </li>
            </Menu.Item>
        </Menu>
    ) : (
        <Menu></Menu>
    )

    return (
        <div className={`roomItem__bed dropdown ${dropdownClass ? dropdownClass : ''}`}>
            <Dropdown overlay={menu} trigger={['click']} getPopupContainer={(trigger: any) => trigger.parentNode}>
                <button type="button" className="dropdown-toggle dropdown-toggle_sm">
                    <IconBed />
                    <span>
                        {bedTypeSelected
                            ? bedTypeSelected['bed_data'].map((item: any, index: any) => {
                                  return <strong key={index}>{item.count + ' ' + item.type || item.description}</strong>
                              })
                            : reformatBedTypes[0]['bed_data'].map((item: any, index: any) => {
                                  return <strong key={index}>{item.count + ' ' + item.type || item.description}</strong>
                              })}
                    </span>

                    <IconDown />
                </button>
            </Dropdown>
        </div>
    )
}

export default RenderBedType
