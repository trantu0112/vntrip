import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { IconHuntHotel, IconHuntFlight, IconHuntCombo, IconHuntTMS } from '../constants/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getDeals } from '../api/common-services'
import { isMobileByUserAgent } from '../utils/common'
import { setOpenSearchBoxHunt } from '../store/common/action'

const Layout = dynamic(() => import('../components/layout/Layout'))
const HomeBanner = dynamic(() => import('../components/banner/HomeBanner'))
const HotDeal = dynamic(() => import('../components/hunt/HotDeal'))
const ReasonCombo = dynamic(() => import('../components/home/ReasonCombo'))
const SearchBoxHotel = dynamic(() => import('../components/search-box-hotel/SearchBoxHotel'))
const SearchBoxCombo = dynamic(() => import('../components/search-box-combo/SearchBoxCombo'))
const MemberShipBox = dynamic(() => import('../components/hunt/MemberShipBox'))
const AppInfo = dynamic(() => import('../components/hunt/AppInfo'))
const SearchBoxFlight = dynamic(() => import('../components/search-box-flight/SearchBoxFlight'))
const HomeComboVinPearl = dynamic(() => import('../components/home/HomeComboVinPearl'))
const VntripBlog = dynamic(() => import('../components/home/VntripBlog'))

interface Props {
    isMobile?: boolean
}

const Home: React.FC<Props> = React.memo(({ isMobile }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel', 'flight'])
    const [isHuntHotel, setIsHuntHotel] = useState<'hotel' | 'flight' | 'combo'>('combo')
    const isOpenSearchBoxHunt = useSelector((state: any) => state.common.isOpenSearchBoxHunt)
    const [dealData, setDealData] = useState<any>([])
    const schemaData = [
        {
            '@type': 'WebSite',
            url: 'https://www.vntrip.vn/',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.vntrip.vn/tim-khach-san?keyword={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@type': 'Organization',
            name: 'Vntrip OTA',
            legalName: 'CÔNG TY TNHH VNTRIP.VN',
            url: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
            logo: 'https://statics.vntrip.vn/images/logo/vntrip-logo.png',
            email: 'cs@vntrip.vn',
            foundingDate: '2015',
            founders: [
                {
                    '@type': 'Person',
                    name: 'Lê Đắc Lâm',
                },
            ],
            address: [
                {
                    '@type': 'PostalAddress',
                    streetAddress: ' Tầng 2, Tòa nhà 17T4 Hapulico Complex Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội',
                    addressLocality: 'Hà Nội City',
                    addressRegion: 'Northeast',
                    postalCode: '100000',
                    addressCountry: 'VNM',
                },
            ],
            contactPoint: [
                {
                    '@type': 'ContactPoint',
                    telephone: '+84-965166688',
                    contactType: 'customer service',
                },
            ],
            sameAs: [
                'https://www.facebook.com/vntrip',
                'https://www.instagram.com/vntrip.vn',
                'https://www.facebook.com/vntravel',
            ],
        },
    ]

    const changeHuntType = (type: 'hotel' | 'flight' | 'combo') => {
        setIsHuntHotel(type)
    }

    const onClickBackDrop = () => {
        dispatch(setOpenSearchBoxHunt(false))
    }

    useEffect(() => {
        fetchData()

        async function fetchData() {
            try {
                getDeals({
                    page: 1,
                    page_size: 6,
                })
                    .then((res) => {
                        if (res.status === 'success') {
                            setDealData(res.data)
                        }
                    })
                    .catch((err) => {
                        throw err
                    })
            } catch (e) {
                throw e
            }
        }
    }, [])

    // const handleClickOpenCombo = () => {
    //     let objParams = {}
    //     let publisher: any = getCookie('publisher')
    //
    //     if (userInfo) {
    //         objParams = {
    //             ...objParams,
    //             email: userInfo.email,
    //             phone: userInfo.phone,
    //             name: userInfo.last_name + ' ' + userInfo.first_name,
    //         }
    //     }
    //
    //     if (publisher) {
    //         publisher = JSON.parse(publisher)
    //         objParams = {
    //             ...objParams,
    //             ...publisher,
    //         }
    //     }
    //
    //     const queryStringify = queryString.stringify(objParams, { encode: false, skipNull: true })
    //     const url = process.env.NEXT_PUBLIC_ROOT_DOMAIN_DONG_GIA + '?' + queryStringify
    //
    //     if (typeof window !== 'undefined') {
    //         window.open(url)
    //     }
    // }

    return (
        <Layout
            isMobile={isMobile}
            isHome={true}
            canonical={process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            schemaList={schemaData}
        >
            <section className="homeWrapper">
                <HomeBanner className={''} />

                <div className={`searchBox ${isOpenSearchBoxHunt ? 'open' : ''}`}>
                    <div className="container">
                        <ul className="searchBox__tab">
                            <li className={isHuntHotel === 'combo' ? 'active' : ''}>
                                <button type="button" onClick={() => changeHuntType('combo')}>
                                    <IconHuntCombo />
                                    <span>{t('common:Săn')}</span>
                                </button>
                            </li>
                            <li className={isHuntHotel === 'hotel' ? 'active' : ''}>
                                <button id="btnHotel" type="button" onClick={() => changeHuntType('hotel')}>
                                    <IconHuntHotel />
                                    <span>{t('common:Khách sạn')}</span>
                                </button>
                            </li>
                            <li className={isHuntHotel === 'flight' ? 'active' : ''}>
                                <button id="btnFlight" type="button" onClick={() => changeHuntType('flight')}>
                                    <IconHuntFlight />
                                    <span>{t('flight:Máy bay')}</span>
                                </button>
                            </li>
                            <li className="logo">
                                <button>
                                    <a
                                        href="https://tms.vntrip.vn/?utm_source=Menu_bar&utm_medium=Mobile"
                                        className="tms"
                                    >
                                        <IconHuntTMS />
                                    </a>
                                </button>
                            </li>
                        </ul>
                        {/*<div className="searchBox__main">*/}
                        {/*    <SearchBoxFlightHunt isShow={!isHuntHotel} />*/}

                        {/*    <SearchBoxHotelHunt isShow={isHuntHotel} />*/}
                        {/*</div>*/}
                        <div className="searchBox__main bgMain">
                            <div className="vntSearch">
                                <div className="vntSearch__main">
                                    <SearchBoxFlight isShow={isHuntHotel === 'flight'} />
                                    <SearchBoxHotel isShow={isHuntHotel === 'hotel'} />
                                    <SearchBoxCombo isShow={isHuntHotel === 'combo'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="searchBox__backdrop"
                        onClick={onClickBackDrop}
                        onKeyUp={onClickBackDrop}
                        role={'button'}
                        tabIndex={0}
                    />
                </div>

                {/*<FlightCheapest data={atadiData} />*/}
                <ReasonCombo />
                <HomeComboVinPearl />
                <HotDeal data={dealData} />
                <VntripBlog />

                {/*<HuntCommitment />*/}

                <MemberShipBox />

                <AppInfo />
            </section>
        </Layout>
    )
})

export const getServerSideProps = async ({ req }: any) => {
    const UA = req.headers['user-agent']
    return {
        props: {
            isMobile: isMobileByUserAgent(UA),
        },
    }
}

export default Home
