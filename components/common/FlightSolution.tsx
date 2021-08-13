import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { articles } from '../../api/common-services'

const FlightSolution: React.FC = () => {
    const { t } = useTranslation(['common', 'flight'])
    const [showText, setShowText] = useState<boolean>(false)
    const [flightSolution, setFlightSolution] = useState<any>('')

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await articles()
                setFlightSolution(res.data[3])
            } catch (e) {
                throw e
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flightSolution">
            <div className="container">
                <h2 className="text-center semibold mb30">
                    {t('flight:VNTRIP ĐỒNG HÀNH CÙNG BẠN TRONG NHỮNG CHUYẾN BAY')}!
                </h2>
                <div className="flightSolution__cont">
                    <div className="flightSolution__img">
                        <img src="https://statics.vntrip.vn/images/luachonhangdau.png" alt="luachonhangdau" />
                    </div>
                    <div
                        className={`flightSolution__text ${showText ? 'showFull' : ''}`}
                        dangerouslySetInnerHTML={{ __html: flightSolution.content }}
                    />
                </div>
                <button
                    type="button"
                    className={`btnAdd ${showText ? 'rotate' : ''}`}
                    onClick={() => {
                        setShowText((prevState) => !prevState)
                    }}
                >
                    <span>{showText ? t('common:Thu gọn') : t('common:Xem thêm')}</span>
                    <svg
                        width="10px"
                        height="10px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 491.996 491.996"
                        xmlSpace="preserve"
                    >
                        <path
                            fill="#ff8917"
                            d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848                                                                          L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128                                                                          c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084                                                                          c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224                                                                          C491.996,136.902,489.204,130.046,484.132,124.986z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default FlightSolution
