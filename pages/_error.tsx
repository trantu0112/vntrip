import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout/Layout'

interface Props {
    // statusCode: number
}

const Error: React.FC<Props> = () => {
    return (
        <Layout>
            <section className="error">
                <div className="container">
                    <div
                        style={{ backgroundImage: 'url("https://statics.vntrip.vn/images/eror-image.png")' }}
                        className="error__main"
                    >
                        <div className="error__text">
                            <svg
                                width={106}
                                height={70}
                                viewBox="0 0 106 70"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M29.292 1.09375V45.083H33.0176V54.6191H29.292V68.1543H19.6191V54.6191H0V46.1426L16.9531 1.09375H29.292ZM9.53613 45.083H19.6191V16.5771L9.53613 45.083Z"
                                    fill="#2E3A59"
                                />
                                <path
                                    d="M66.8213 55.1318C66.8213 64.5199 62.1842 69.2139 52.9102 69.2139C43.6589 69.2139 39.0332 64.5199 39.0332 55.1318V14.1162C39.0332 4.7054 43.6589 0 52.9102 0C62.1842 0 66.8213 4.7054 66.8213 14.1162V55.1318ZM57.1484 14.1162C57.1484 11.0856 55.7471 9.57031 52.9443 9.57031H52.876C50.096 9.57031 48.7061 11.0856 48.7061 14.1162V55.1318C48.7061 58.1624 50.1074 59.6777 52.9102 59.6777C55.7357 59.6777 57.1484 58.1624 57.1484 55.1318V14.1162Z"
                                    fill="#2E3A59"
                                />
                                <path
                                    d="M102.026 1.09375V45.083H105.752V54.6191H102.026V68.1543H92.3535V54.6191H72.7344V46.1426L89.6875 1.09375H102.026ZM82.2705 45.083H92.3535V16.5771L82.2705 45.083Z"
                                    fill="#2E3A59"
                                />
                            </svg>
                            <p className="p1">Xin lỗi quý khách!</p>
                            <p className="p2">
                                Thông tin bạn đang tìm kiếm hiện đang không tồn tại. Bạn có thể quay lại để tiếp tục tìm
                                kiếm. Xin cảm ơn quý khách.
                            </p>
                            <Link href="/">
                                <a className="btn btn_orange">Trang chủ</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

// function getInitialProps = ({ res, err }:any) => {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404
//     return { statusCode }
// }

export default Error
