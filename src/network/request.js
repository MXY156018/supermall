import axios from 'axios'

export function request(config) {
  //1、创建axios实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  // 2、axios的拦截器
  instance.interceptors.request.use(config=>{
    return config;
  },err=>{

  })

  instance.interceptors.response.use(res=>{
    return res.data;
  },err => {
    console.log('来到了response拦截failure中');
    console.log(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权的访问'
          break
      }
    }
    return err
  })
  return instance(config)
}
