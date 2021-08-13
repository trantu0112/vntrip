import React from 'react'
import LayoutContent from '../../components/layout/LayoutContent'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const FlightRadarCode = () => {
    const { t } = useTranslation(['common'])
    return (
        <LayoutContent>
            <div className="container">
                <div className="followFlights" style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#4F4F4F', fontSize: '16px', margin: '15px' }}>
                        Để sử dụng tính năng này, vui lòng tải ứng dụng app Vntrip và tiếp tục!
                    </h2>
                    <div className="group-icon-download">
                        <a
                            className="icon-download"
                            target="_blank"
                            href="https://itunes.apple.com/us/app/vntrip-at-phong-khach-san/id1046183734?ls=1&mt=8"
                        >
                            <img
                                src="https://statics.vntrip.vn/images/logo.AppStore.png"
                                height="50px"
                                alt="AppStore"
                            />
                        </a>
                        &nbsp;&nbsp;
                        <a
                            className="icon-download"
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=vn.vntrip.hotel"
                        >
                            <img
                                src="https://statics.vntrip.vn/images/logo/googlePlay.png"
                                height="50px"
                                alt="GooglePlay"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </LayoutContent>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default FlightRadarCode
