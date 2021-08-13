import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { articles } from '../api/common-services'

const PrivacyPolicy = () => {
    const { t, i18n } = useTranslation(['common'])
    const [policy, setPolicy] = useState<any>('')

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await articles()
                if (res.status === 'success') {
                    setPolicy(res.data[1])
                }
            } catch (e) {
                throw e
            }
        }
        fetchData()
    }, [i18n.language])

    return (
        <Layout>
            <section className="policy">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">
                                <a>
                                    <span>{t('common:Trang chủ')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className="active">{t('common:Chính sách bảo mật')}</li>
                    </ul>
                    <div className="policy__body">
                        <h2 className="size-24 mb30 uppercase">{policy.title}</h2>
                        <div className="policy__cont" dangerouslySetInnerHTML={{ __html: policy.content }} />
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

export default PrivacyPolicy
