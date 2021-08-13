import React from 'react'
import Link from 'next/link'

const BreadCrumb = () => {
    return (
        <ul className="breadcrumb">
            <li>
                <Link href="/">
                    <span>Trang chủ</span>
                </Link>
            </li>
            <li className="active">Khách sạn tại Hà Nội: 872 khách sạn có phòng từ ngày 26/06 đến 27/06 (1 đêm)</li>
        </ul>
    )
}

export default BreadCrumb
