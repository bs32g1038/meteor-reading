
import axios from '../utils/axios';

export default class Home {
    static fetchHomeInfo() {
        return axios.get('/get_home_data');
    };
}
