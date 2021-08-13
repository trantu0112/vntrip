import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { getContentBlogFromId } from '../../api/blog-api'
import { IconBlogDate } from '../../constants/icons'
interface Props {
    id: number
    title: string
}
const HomeBlogCont: React.FC<Props> = ({ id, title }) => {
    const { t } = useTranslation(['flight', 'hotel'])
    const [dataBlog, setDataBlog] = useState<any>(null)
    const [urlReadMore, setUrlReadMore] = useState<string>('')
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await getContentBlogFromId(id, 9)
                    if (data?.success) {
                        setDataBlog(data?.data)
                        setUrlReadMore(data?.url_read_more)
                    }
                } catch (e) {
                    throw e
                }
            }
            fetchData()
        }
    }, [id])
    return (
        <div className="homeBlogCont row">
            <div className="col-lg-4 col-xs-12 col-sm-12">
                <div className="blogView">
                    <h2 className="mb15">{title}</h2>
                    <div className="imgBlog">
                        <a target="_blank" href={dataBlog?.[0]?.url}>
                            <img src={dataBlog?.[0]?.image} alt="" />
                        </a>
                    </div>
                    <div className="blogTitle mb5">
                        <a
                            target="_blank"
                            href={dataBlog?.[0]?.url}
                            dangerouslySetInnerHTML={{ __html: dataBlog?.[0]?.title }}
                        ></a>
                    </div>
                    <div className="experienceBook__info">
                        <div className="experienceBook__date">
                            <IconBlogDate />
                            <span>{moment(dataBlog?.[0]?.created_at, 'DD/MM/YYYY').format('DD/MM/YYYY')}</span>
                        </div>
                        <div className="experienceBook__view">
                            <svg
                                width={16}
                                height={10}
                                viewBox="0 0 16 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.99984 0C4.6665 0 1.81984 2.07333 0.666504 5C1.81984 7.92667 4.6665 10 7.99984 10C11.3332 10 14.1798 7.92667 15.3332 5C14.1798 2.07333 11.3332 0 7.99984 0ZM7.99984 8.33333C6.15984 8.33333 4.6665 6.84 4.6665 5C4.6665 3.16 6.15984 1.66667 7.99984 1.66667C9.83984 1.66667 11.3332 3.16 11.3332 5C11.3332 6.84 9.83984 8.33333 7.99984 8.33333ZM7.99984 3C6.89317 3 5.99984 3.89333 5.99984 5C5.99984 6.10667 6.89317 7 7.99984 7C9.1065 7 9.99984 6.10667 9.99984 5C9.99984 3.89333 9.1065 3 7.99984 3Z"
                                    fill="#8C8C8C"
                                />
                            </svg>
                            <span>
                                {dataBlog?.[0]?.post_view} {t('flight:lượt xem')}
                            </span>
                        </div>
                    </div>
                    <p
                        className="mt10 description"
                        dangerouslySetInnerHTML={{ __html: dataBlog?.[0]?.description }}
                    ></p>
                </div>
            </div>
            <div className="col-lg-8 col-xs-12 col-sm-12">
                <div className="listCard">
                    <div className="itemCard">
                        {Array.isArray(dataBlog) &&
                            dataBlog.map((blog: any, index: number) => {
                                if (index > 0 && index < 9) {
                                    return (
                                        <div className="card" key={index}>
                                            <div className="cardImg">
                                                <a target="_blank" href={blog.url}>
                                                    <img src={blog.image} alt="" />
                                                </a>
                                            </div>
                                            <div className="cardCont">
                                                <div className="cardTitle">
                                                    <a
                                                        target="_blank"
                                                        href={blog.url}
                                                        dangerouslySetInnerHTML={{ __html: blog.title }}
                                                    ></a>
                                                </div>
                                                <div className="dateLine">
                                                    <IconBlogDate />
                                                    <span>
                                                        {moment(blog?.created_at, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                    </div>
                    <a target="_blank" href={urlReadMore} className="btnMore">
                        {t('hotel:Xem tất cả')}
                        <svg width={11} height={13} viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.957031 0.734375V0.761719C0.875 0.707031 0.792969 0.652344 0.710938 0.652344C0.601562 0.652344 0.546875 0.679688 0.492188 0.734375L0.300781 0.953125C0.21875 1.00781 0.191406 1.08984 0.191406 1.17188C0.191406 1.28125 0.21875 1.33594 0.300781 1.39062L5.63281 6.75L0.273438 12.082C0.21875 12.1641 0.191406 12.2461 0.191406 12.3281C0.191406 12.4375 0.21875 12.4922 0.273438 12.5469L0.492188 12.7656C0.546875 12.8203 0.601562 12.8477 0.710938 12.8477C0.792969 12.8477 0.875 12.8203 0.957031 12.7383L6.72656 6.99609C6.78125 6.94141 6.80859 6.85938 6.80859 6.75C6.80859 6.66797 6.78125 6.58594 6.72656 6.50391L0.957031 0.734375ZM3.99219 0.734375L3.96484 0.761719C4.01953 0.707031 4.10156 0.652344 4.21094 0.652344C4.29297 0.652344 4.375 0.707031 4.45703 0.761719L10.2266 6.53125C10.2812 6.58594 10.3086 6.66797 10.3086 6.75C10.3086 6.85938 10.2812 6.94141 10.2266 6.99609L4.45703 12.7656C4.375 12.8203 4.29297 12.8477 4.21094 12.8477C4.10156 12.8477 4.04688 12.8203 3.99219 12.7656L3.80078 12.5742C3.71875 12.5195 3.69141 12.4375 3.69141 12.3281C3.69141 12.2461 3.71875 12.1641 3.80078 12.082L9.13281 6.75L3.77344 1.41797C3.71875 1.36328 3.69141 1.28125 3.69141 1.17188C3.69141 1.08984 3.71875 1.00781 3.77344 0.953125L3.99219 0.734375Z"
                                fill="#1890FF"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HomeBlogCont
