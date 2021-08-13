import React, { useEffect } from 'react'
import HomeBlogCont from './HomeBlogCont'
import HomeBlogSafe from './HomeBlogSafe'

const VntripBlog = () => {
    return (
        <div className="homeBlog">
            <div className="container">
                <HomeBlogCont title={'Lễ hội - Festival'} id={113091} />
                <HomeBlogCont title={'Khám phá'} id={113089} />
                <HomeBlogSafe id={112572} />
                <HomeBlogCont title={'Mẹo du lịch hay'} id={113127} />
            </div>
        </div>
    )
}

export default VntripBlog
