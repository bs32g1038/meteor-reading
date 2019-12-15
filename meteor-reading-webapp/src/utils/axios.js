import axios from 'axios';
import config from '@/config';

let baseUrl = '';
if (typeof window !== 'undefined') {
    // baseUrl = 'http://yapi.demo.qunar.com/mock/36904/api';
    baseUrl = '/v1/api';
} else {
    baseUrl = 'http://127.0.0.1:8080/v1/api';
    // 正式环境下的域名
    if (process.env.NODE_ENV === 'production') {
        baseUrl = 'http://www.icoolstar.com/v1/api';
    }
}
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

instance.interceptors.request.use(
    cg => {
        const tokenKey = config.tokenKey;
        const user = localStorage.getItem(tokenKey);
        if (user) {
            cg.headers.authorization = JSON.parse(user).token;
        }
        return cg;
    },
    error => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default instance;
