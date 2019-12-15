import axios from '../utils/axios';

export default class Captcha {
    static getCaptcha() {
        return axios.get('/get-captcha');
    }

    static verifyCaptcha(captchaId, value) {
        return axios.get(`/verify-captcha?captchaId=${captchaId}&value=${value}`);
    }
}
