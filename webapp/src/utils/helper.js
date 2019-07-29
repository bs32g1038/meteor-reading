import config from '@/config';
import dayjs from 'dayjs';

export default {
    isExistToken: () => {
        if (window.localStorage.getItem(config.tokenKey)) {
            return true;
        } else {
            return false;
        }
    },
    isValidToken: () => {
        const token = window.localStorage.getItem(config.tokenKey);
        if (!token) {
            return false;
        }
        const _ = JSON.parse(token);
        if (_.expire && (dayjs().valueOf() <= dayjs(_.expire).valueOf())) {
            return true;
        } else {
            window.localStorage.removeItem(config.tokenKey);
            return false;
        }
    }
};
