import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconBlogDate } from '../../constants/icons'
import { getContentBlogFromId } from '../../api/blog-api'
import moment from 'moment'
interface Props {
    id: number
}
const HomeBlogSafe: React.FC<Props> = ({ id }) => {
    const [dataBlog, setDataBlog] = useState<any>(null)
    const { t } = useTranslation(['flight'])
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await getContentBlogFromId(id, 4)
                    setDataBlog(data?.data)
                } catch (e) {
                    throw e
                }
            }
            fetchData()
        }
    }, [id])
    return (
        <div className="homeBlogSafe">
            <h3 className="mb15">Du lịch an toàn thời Covid</h3>
            <div className="listSafe">
                {Array.isArray(dataBlog) &&
                    dataBlog.map((blog: any, index: number) => {
                        if (index < 4) {
                            return (
                                <div className="safeItem" key={index}>
                                    <a target="_blank" href={blog.url}>
                                        <div className="safeItemContent">
                                            <div className="safeItemImg">
                                                <img src={blog.image} alt={''} />
                                            </div>
                                            <div className="safeItemCont">
                                                <p className="mt5 safeItemTitle semibold size-16">{blog.title}</p>
                                                <div className="safeItemView">
                                                    <div className="experienceBook__info">
                                                        <div className="experienceBook__date">
                                                            <IconBlogDate />
                                                            <span>
                                                                {moment(blog?.created_at, 'DD/MM/YYYY').format(
                                                                    'DD/MM/YYYY'
                                                                )}
                                                            </span>
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
                                                                {blog?.post_view} {t('flight:lượt xem')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                        return null
                    })}
            </div>
        </div>
    )
}

export default HomeBlogSafe
