import React from 'react'
import LayoutContent from '../../components/layout/LayoutContent'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const AboutFlightRadar = () => {
    const { t } = useTranslation(['common'])
    return (
        <LayoutContent>
            <div className="container">
                <p></p>
                <h2 className="size-24 mb5 uppercase text-center">Giới thiệu về Flight Radar</h2>
                <div className="termOfUse__cont" style={{ textAlign: 'justify' }}>
                    <p>
                        <strong>Vntrip - Theo dõi chuyến bay</strong> là một ứng dụng theo dõi chuyến bay dễ sử dụng
                        nhưng vô cùng mạnh mẽ, cho phép bạn cập nhật trực tuyến tình trạng của chuyến bay trong nước.
                        Kiểm tra nhanh chóng và dễ dàng chuyến bay của các thành viên trong gia đình và có mặt đúng lúc
                        khi đến giờ đón họ từ sân bay.
                    </p>
                    <p>
                        Bạn chắc chắn sẽ đánh giá cao giao diện đơn giản, dễ sử dụng nhưng luôn cung cấp thông tin đầy
                        đủ và nhanh chóng nhất. Hãy biến thiết bị của bạn thành một thiết bị theo dõi chuyến bay mạnh mẽ
                        với Vntrip - Theo dõi chuyến bay ngay hôm nay !!!
                    </p>

                    <p>
                        <strong>Với Vntrip - Theo dõi chuyến bay bạn có thể:</strong>
                        <br />
                        Nhận lịch trình chuyến bay chi tiết với thông tin máy bay khởi hành và hạ cánh theo thời gian
                        thực.
                        <br />
                        Tìm kiếm & cập nhật thông tin Nhà ga và Cổng cùng với các thông tin hữu ích khác giúp chuẩn bị
                        tốt nhất cho chuyến bay của bạn.
                        <br />
                        Tìm kiếm các chuyến bay, sân bay và vị trí cụ thể: từ đặc điểm máy bay và hình ảnh cho đến lộ
                        trình và lịch trình của chuyến bay.
                        <br />
                        Cập nhật thông tin chuyến bay liên tục: nhận biết tình trạng chuyến bay, chuyến bay bị hủy, giờ
                        khởi hành và đến mới, v.v.
                    </p>
                    <p>
                        <strong>Tính năng:</strong>
                        <br />
                        <ul>
                            <li>- Không giới hạn số lượt tìm kiếm.</li>
                            <li>- Không giới hạn việc nhận thông báo về chuyến bay.</li>
                            <li>- Không quảng cáo.</li>
                            <li>- Có ứng dụng cho cả hệ điều hành IOS và Android.</li>
                        </ul>
                        Tải xuống Vntrip - Theo dõi chuyến bay máy bay miễn phí ngay hôm nay và theo dõi tình trạng các
                        chuyến bay trên toàn thế giới!
                    </p>
                    <p>
                        <strong>Lưu ý quan trọng:</strong>
                        <br />
                        Ứng dụng theo dõi chuyến bay sử dụng dữ liệu từ một số nhà cung cấp, dữ liệu này được thu thập
                        từ máy bay được trang bị bộ truyền ADS-B. ADS-B không được sử dụng bởi tất cả các hãng hàng
                        không hoặc máy bay. Do các giới hạn kỹ thuật về cách thu thập dữ liệu chuyến bay, dữ liệu này có
                        thể không đầy đủ trong một số trường hợp. Chúng tôi đang nỗ lực cải thiện điều này để cung cấp
                        cho bạn thông tin chuyến bay và trạng thái chuyến bay chính xác nhất.
                    </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="106" height="40" fill="none" viewBox="0 0 106 40">
                        <path
                            fill="#8C8C8C"
                            d="M41.028 24.505v-7.923h5.458c0-1.937-1.585-3.258-3.434-3.258h-1.936c0-3.96-3.522-3.873-3.522-3.873v15.054c0 4.313 2.993 6.514 8.892 6.514v-3.521c-2.201 0-3.698-.264-4.49-.88-.704-.44-.968-1.145-.968-2.113zM57.138 16.582c-2.201 0-3.698.264-4.49.88-.616.44-.88 1.145-.88 2.113V30.93h-3.522V19.575c0-4.314 2.993-6.338 8.892-6.338v3.345zM58.722 13.148c1.937 1.585 3.521 0 3.521 0V31.02h-3.52v-17.87z"
                        ></path>
                        <path
                            fill="#8C8C8C"
                            fillRule="evenodd"
                            d="M72.72 30.931c5.545 0 8.362-3.081 8.362-8.98 0-5.986-2.729-8.979-8.45-8.979-5.547 0-8.276 2.994-8.276 8.98v18.046s3.521.176 3.521-3.169v-5.898h4.842zm3.96-12.94c.617.791.881 2.112.881 3.96 0 1.761-.264 3.258-.792 4.05-.793.968-2.113 1.497-3.962 1.497h-4.841v-5.546c0-1.849.264-3.17.88-3.962.704-.968 2.025-1.496 3.873-1.496 1.849 0 3.17.44 3.962 1.496z"
                            clipRule="evenodd"
                        ></path>
                        <path
                            fill="#8C8C8C"
                            d="M58.018 8.923c-.528.792-7.835-3.521-10.828-5.634-.44-.264-.792-.616-.968-.968-.265-.44-.353-.969-.177-1.409 0-.088.088-.176.176-.264l.265-.264c.44-.352.968-.44 1.408-.352.44.088.792.264 1.233.616 2.905 2.113 9.419 7.483 8.89 8.275zM58.018 10.684c-.264 1.144-10.74-.793-15.142-1.937a6.607 6.607 0 01-1.584-.704c-.529-.352-.88-.969-.88-1.585 0-.176 0-.264.087-.44V5.93c0-.088.088-.264.176-.352.353-.616.88-.88 1.497-.969.528-.088 1.144 0 1.76.177 4.402 1.232 14.438 4.753 14.086 5.898zM34.777 30.931h-3.521v-8.98c0-1.848-.264-3.169-.88-3.96-.705-.97-2.025-1.497-3.874-1.497-1.848 0-3.169.528-3.961 1.496-.616.793-.88 2.113-.88 3.962v9.067h-3.522v-9.067c0-5.987 2.817-8.98 8.363-8.98 5.546 0 8.275 2.994 8.275 8.98v8.979z"
                        ></path>
                        <path
                            fill="#8C8C8C"
                            d="M17.875 13.325c-3.081 0-4.402 1.672-4.93 2.905-.528 1.32-3.873 9.595-3.873 9.595l-4.93-12.5H.357l7.042 17.694h3.433l5.018-12.677c1.761-4.577 4.842-5.105 4.842-5.105h-2.817v.088zM81.258 29.523c0 .88.705 1.496 1.497 1.496.88 0 1.496-.704 1.496-1.496 0-.793-.704-1.497-1.496-1.497s-1.497.704-1.497 1.497zM103.707 30.931h-2.113v-5.634c0-1.144-.176-1.937-.528-2.377-.441-.616-1.233-.88-2.377-.88-1.145 0-1.937.264-2.377.88-.352.528-.528 1.32-.528 2.377v5.634H93.67v-5.634c0-3.61 1.672-5.458 5.106-5.458 3.345 0 5.018 1.849 5.018 5.458v5.634h-.088z"
                        ></path>
                        <path
                            fill="#8C8C8C"
                            d="M93.407 20.015c-1.849 0-2.73.968-2.993 1.76-.264.793-2.377 5.899-2.377 5.899l-2.993-7.659h-2.29l4.314 11.004h2.025l3.081-7.923c1.057-2.817 2.905-3.08 2.905-3.08h-1.672zM58.546 10.508c0 1.056.88 1.936 1.937 1.936 1.056 0 1.936-.88 1.936-1.937 0-1.056-.88-1.936-1.936-1.936-1.057 0-1.937.88-1.937 1.937zM58.986 6.37c0 .88.705 1.497 1.497 1.497.88 0 1.496-.705 1.496-1.497 0-.88-.704-1.496-1.496-1.496s-1.497.616-1.497 1.496zM62.948 8.923c.528.792 7.834-3.521 10.828-5.634.44-.264.792-.616.968-.968.352-.353.44-.88.264-1.409 0-.088-.088-.176-.176-.264l-.264-.264a1.721 1.721 0 00-1.409-.352c-.44.088-.792.264-1.232.616-2.905 2.113-9.508 7.483-8.98 8.275zM62.948 10.684c.264 1.144 10.74-.793 15.141-1.937a6.607 6.607 0 001.585-.704c.528-.352.88-.969.88-1.585 0-.176 0-.264-.088-.44V5.93c0-.088-.088-.264-.176-.352-.352-.616-.88-.88-1.497-.969-.528-.088-1.144 0-1.76.177-4.402 1.232-14.35 4.753-14.085 5.898z"
                        ></path>
                        <path
                            fill="#8C8C8C"
                            fillRule="evenodd"
                            d="M103.971 21.776c.176.176.44.264.704.264.352 0 .528-.088.704-.264.176-.176.264-.44.264-.705 0-.264-.088-.528-.264-.704-.176-.176-.44-.264-.704-.264-.264 0-.528.088-.704.264-.176.176-.264.44-.264.704 0 .264.088.529.264.705zm.088-.176a.8.8 0 01-.264-.617c0-.176.088-.44.264-.616a.799.799 0 01.616-.264c.264 0 .44.088.616.264a.8.8 0 01.264.616.8.8 0 01-.264.617.799.799 0 01-.616.264.799.799 0 01-.616-.264z"
                            clipRule="evenodd"
                        ></path>
                        <path
                            fill="#8C8C8C"
                            fillRule="evenodd"
                            d="M104.763 20.455h-.528V21.6h.264v-.44H104.939c.051.05.072.072.081.098.007.019.007.04.007.078v.264h.176c-.088 0-.088-.088-.088-.088v-.441c0-.088-.088-.088-.088-.088l.088-.088v-.176c0-.088-.088-.176-.176-.264h-.176zm.264.353c0 .087-.088.175-.088.175h-.44v-.352H104.939c.051.051.072.072.081.098.007.02.007.041.007.079z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <p style={{ color: '#8C8C8C', fontSize: '14px' }}>Copyright © Vntrip 2020 Version 1.0.0</p>
                </div>
            </div>
        </LayoutContent>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default AboutFlightRadar
