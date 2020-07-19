import axios from 'axios';


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // 拦截器
    instance.interceptors.request.use(config => {
        // 发送请求成功
       return config 
    }, err => {
        // 发送请求失败
       console.log(err); 
    })

    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        // 返回失败
        console.log(err);
    })

    return instance(config)
}