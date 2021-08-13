import axios from 'axios'

const ApiMicroService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MICRO_API_URL,
    responseType: 'json',
})

ApiMicroService.defaults.timeout = 2000000
ApiMicroService.defaults.headers.post['Content-Type'] = 'application/json'

ApiMicroService.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if ((response.data && response.data.error_code === 401) || (response.data && response.data.code === 401)) {
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

export default ApiMicroService
