import axios from 'axios';

let baseUrl = '';
if (typeof window !== 'undefined') {
    // baseUrl = 'http://yapi.demo.qunar.com/mock/36904/api';
    baseUrl = '/v1/api';
} else {
    baseUrl = 'http://127.0.0.1:8080/v1/api';
    // 正式环境下的域名
    if (process.env.NODE_ENV === 'production') {
        baseUrl = 'http://read.lizc.me/v1/api';
    }
}
const instance = axios.create({
    baseURL: baseUrl
});
instance.defaults.timeout = 3000;

instance.interceptors.request.use(cg => {
    return cg;
}, error => {
    Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
