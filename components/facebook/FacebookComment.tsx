import React from 'react'
interface Props {
    url: string
}
const FacebookComment: React.FC<Props> = ({ url }) => {
    return <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5" />
}
export default FacebookComment
