import axios from 'axios'
// import { Message } from 'element-ui'
// create an axios instance

const service = axios.create({
  proxy: true,
  baseURL: 'http://47.98.122.133/JustLikeThis/public/index.php/api/admin/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
  // defaults.headers.post['Content-Type'] = 'application/json';
})
// request interceptor

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return res
    } else {
      return res
    }
  }
)

export default service
