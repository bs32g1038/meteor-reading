import axios from '../utils/axios';

export default class Home {
    static fetchHomeInfo() {
        return axios.get('/home/info');
    }
}
