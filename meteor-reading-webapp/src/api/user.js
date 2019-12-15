import axios from '../utils/axios';
import config from '../config';

export default class User {
    static checkLogin() {
        return axios.post(
            '/site-user/check-login',
            {},
            {
                headers: {
                    authorization: window.localStorage.getItem(config.tokenKey),
                },
            }
        );
    }

    static register(info) {
        return axios.post('/register', info);
    }

    static login(info) {
        return axios.post('/login', info);
    }

    static fetchUserBookRecord(id) {
        return axios.get('/book-shelf/records');
    }

    static delUserBookRecord(id) {
        return axios.delete(`/book-shelf/${id}`, {});
    }
}
