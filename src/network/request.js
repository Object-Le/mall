import axios from 'axios'
export function request(config) {
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器
  //2.1 请求拦截的使用
  instance1.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })
  //2.2 响应拦截
  instance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  //3. 发送真正的网络请求  
  return instance1(config)
}