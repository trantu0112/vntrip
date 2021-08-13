import React from 'react'
import { Dropdown, Menu } from 'antd'
import { saveCurrency } from '../../utils/common'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../../store/common/action'
import { IconDown } from '../../constants/icons'

const ChangeCurrency = () => {
    const dispatch = useDispatch()
    const currency = useSelector((state: any) => state.common.currency || 'VND')

    const handleChange = (curr: 'VND' | 'USD') => {
        saveCurrency(curr)
        dispatch(setCurrency(curr))
    }

    const menuCurrency = (
        <Menu selectedKeys={[currency]}>
            <Menu.Item key="VND">
                <button
                    className="currency__link"
                    onClick={() => {
                        handleChange('VND')
                    }}
                >
                    <span className="green-1 semibold">VND</span>
                    <span>Việt Nam đồng</span>
                </button>
            </Menu.Item>
            <Menu.Item key="USD">
                <button
                    className="currency__link"
                    onClick={() => {
                        handleChange('USD')
                    }}
                >
                    <span className="green-1 semibold">USD</span>
                    <span>US Dollar</span>
                </button>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="dropdown currency">
            <Dropdown
                overlay={menuCurrency}
                trigger={['click']}
                getPopupContainer={(trigger: any) => trigger.parentNode}
            >
                <button className="dropdown-toggle">
                    <span>{currency === 'VND' ? 'VND' : 'USD'}</span>
                    <IconDown />
                </button>
            </Dropdown>
        </div>
    )
}

export default ChangeCurrency
