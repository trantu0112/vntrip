import axios from 'axios'

const ApiService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    responseType: 'json',
})

ApiService.defaults.timeout = 20000
ApiService.defaults.headers.post['Content-Type'] = 'application/json'

ApiService.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response.data && response.data.error_code === 401) {
            // removeUserSessionWhenExpired()
        }
        return response
    },
    function (error) {
        if (error?.response?.status === 401 && error?.response?.data?.code === 401) {
            // removeUserSessionWhenExpired()
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

export default ApiService
