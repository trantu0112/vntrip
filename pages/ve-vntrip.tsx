import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { articles } from '../api/common-services'

const AboutVntrip = () => {
    const { t, i18n } = useTranslation(['common'])
    const [aboutUs, setAboutUs] = useState<any>('')

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await articles()
                if (res.status === 'success') {
                    setAboutUs(res.data[0])
                }
            } catch (e) {
                throw e
            }
        }
        fetchData()
    }, [i18n.language])

    return (
        <Layout>
            <section className="aboutUs">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">
                                <a>
                                    <span>{t('common:Trang chủ')}</span>
                                </a>
                            </Link>
                        </li>
                        <li className="active">{t('common:Giới thiệu VNTRIP')}</li>
                    </ul>
                    <div className="aboutUs__body">
                        <h2 className="size-24 mb15 uppercase">{aboutUs.title}</h2>
                        <div className="aboutUs__cont" dangerouslySetInnerHTML={{ __html: aboutUs.content }} />
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

export default AboutVntrip
