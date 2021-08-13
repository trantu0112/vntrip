import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
    IconHotel,
    IconFlight,
    IconBlog,
    IconMotel,
    IconBusiness,
    IconHunting,
    IconVoucher,
} from '../../constants/icons'

interface iProps {}

const HeaderNav: React.FC<iProps> = () => {
    const { t } = useTranslation(['hotel', 'flight', 'common'])
    const router = useRouter()

    const renderActive = (arrPath: string[]) => {
        if (router.pathname === '/') {
            const asPath = router.asPath.split('?')[0]
            return arrPath.includes(asPath) ? 'active' : ''
        }
        if (router.pathname === '/hotel/vn/[id]') {
            return arrPath.includes('/hotel/vn/[id]') ? 'active' : ''
        }
        return arrPath.includes(router.pathname) ? 'active' : ''
    }

    return (
        <div className="header__navbar">
            <div className="container">
                <nav className="navbar">
                    <ul>
                        <li className={renderActive(['/'])}>
                            <Link href={'/'}>
                                <a>
                                    <IconHunting />
                                    <span>{t('common:Săn giá rẻ')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className={renderActive(['/tim-khach-san', '/hotel/vn/[id]', '/khach-san'])}>
                            <Link href="/khach-san">
                                <a>
                                    <IconHotel />
                                    <span>{t('hotel:Khách sạn')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className={renderActive(['/ve-may-bay', '/tim-ve-may-bay'])}>
                            <Link href={'/ve-may-bay'} shallow={true}>
                                <a>
                                    <IconFlight />
                                    <span>{t('flight:Vé máy bay')}</span>
                                </a>
                            </Link>
                        </li>
                        {/*<li className={renderActive(['/voucher'])}>*/}
                        {/*    <Link href={'/voucher'} shallow={true}>*/}
                        {/*        <a>*/}
                        {/*            <IconVoucher />*/}
                        {/*            <span>{t('Voucher')}</span>*/}
                        {/*        </a>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li>
                            <a href="https://quickstay.vntrip.vn/" target="_blank" rel="noopener noreferrer">
                                <IconMotel />
                                <span>{t('common:Nhà nghỉ')}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://tms.vntrip.vn?utm_source=Menu_bar&utm_medium=PC"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconBusiness />
                                <span>{t('common:Doanh nghiệp')}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.vntrip.vn/cam-nang" target="_blank" rel="noopener noreferrer">
                                <IconBlog />
                                <span>{t('common:Cẩm nang')}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default HeaderNav
