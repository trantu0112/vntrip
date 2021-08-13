import React from 'react'
import HeaderTop from './HeaderTop'
import HeaderNav from './HeaderNav'

interface Props {
    isHome?: boolean
}

const Header: React.FC<Props> = ({ isHome }) => {
    return (
        <header className="header">
            <div className="header__desktop">
                <HeaderTop isHome={isHome} />
                <HeaderNav />
            </div>
        </header>
    )
}

export default Header
