import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useTranslation } from 'react-i18next'
import { articles } from '../api/common-services'
import Link from 'next/link'

const PolicyVntrip = () => {
    const { t, i18n } = useTranslation(['common'])
    const [policyVntrip, setPolicyVntrip] = useState<any>('')

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await articles()
                if (res.status === 'success') {
                    setPolicyVntrip(res.data[2])
                }
            } catch (e) {
                throw e
            }
        }
        fetchData()
    }, [i18n.language])
    return (
        <Layout>
            <section className="termOfUse">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">
                                <a>
                                    <span>{t('common:Trang chủ')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className="active">{t('common:Điều khoản và Điều kiện')}</li>
                    </ul>
                    <div className="termOfUse__body">
                        <h2 className="size-24 mb15 uppercase">{policyVntrip.title}</h2>
                        <div className="termOfUse__cont" dangerouslySetInnerHTML={{ __html: policyVntrip.content }} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default PolicyVntrip
