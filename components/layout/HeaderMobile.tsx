import React from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { IconLogoBlack, IconMenuFold, IconPhone } from '../../constants/icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleClassNoScroll } from '../../utils/common'
import { toggleSidearMobile } from '../../store/common/action'
import { toggleSearchBoxMobile } from '../../store/hotel/action'
import Link from 'next/link'

const HeaderMobile = () => {
    const dispatch = useDispatch()
    const { dataHeaderHotel, isOpenSearchBoxMobile } = useSelector((state: any) => {
        return {
            dataHeaderHotel: state.hotel.dataHeaderHotel,
            isOpenSearchBoxMobile: state.hotel.isOpenSearchBoxMobile,
        }
    })

    const openSidebar = () => {
        toggleClassNoScroll('add')
        dispatch(toggleSidearMobile(true))
    }

    const handleToggleSearchBoxMobile = () => {
        toggleClassNoScroll(isOpenSearchBoxMobile ? 'remove' : 'add')
        dispatch(toggleSearchBoxMobile(!isOpenSearchBoxMobile))
    }

    return (
        <header className="header">
            <div className="header__mobile">
                <div className="header__group">
                    <div className="flexGroup">
                        <button type="button" className="btnToggle" onClick={openSidebar}>
                            <IconMenuFold />
                        </button>
                        {/* show logo if do not in hotel list, detail */}
                    </div>
                    {!dataHeaderHotel && (
                        <h1 className="header__logo">
                            <Link href={'/'}>
                                <a className="logo">
                                    <IconLogoBlack />
                                </a>
                            </Link>
                        </h1>
                    )}
                    <a href="tel:0963266688" className="hotline">
                        <IconPhone />
                    </a>

                    {/* show info if in hotel list, detail */}
                    {dataHeaderHotel && (
                        <div
                            className="header__text"
                            onClick={handleToggleSearchBoxMobile}
                            onKeyUp={handleToggleSearchBoxMobile}
                            role="button"
                            tabIndex={0}
                        >
                            <p className="semibold">{dataHeaderHotel.title1}</p>
                            <p className="size-12">
                                <button type="button" className="btnEditSearch">
                                    <span>{dataHeaderHotel.title2}</span>
                                    {isOpenSearchBoxMobile ? <UpOutlined /> : <DownOutlined />}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HeaderMobile
