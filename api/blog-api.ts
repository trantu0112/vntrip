import axios from 'axios'

export const getContentBlogFromId = async (id: number, limit: number) => {
    try {
        const results = await axios.get(`https://www.vntrip.vn/cam-nang/wp-json/v1/posts?limit=${limit}&cat_id=${id}`)
        return results.data
    } catch (e) {
        throw e
    }
}
