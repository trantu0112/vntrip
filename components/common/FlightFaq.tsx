import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { useTranslation } from 'react-i18next'
import { articles } from '../../api/common-services'

const FlightFaq: React.FC = () => {
    const { t } = useTranslation(['flight'])
    const { Panel } = Collapse
    const [faq, setFaq] = useState<any>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await articles()
                setFaq(JSON.parse(res.data[4].content))
            } catch (e) {
                throw e
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flightFaq">
            <div className="container">
                <h2 className="size16 semibold text-center mb30">{t('flight:NHỮNG CÂU HỎI THƯỜNG GẶP')}</h2>
                <div className="flightFaq__accordion">
                    <Collapse accordion expandIconPosition="right">
                        {faq.map((item: any, index: any) => {
                            return (
                                <Panel header={item.question} key={index}>
                                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                </Panel>
                            )
                        })}
                    </Collapse>
                </div>
            </div>
        </div>
    )
}

export default FlightFaq
