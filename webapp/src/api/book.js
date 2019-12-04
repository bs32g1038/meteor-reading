import axios from '../utils/axios';

export default class Book {
    static fetchReadData(novelId, chapterId) {
        return axios
            .get(`/book/${novelId}/read/${chapterId}`);
    }

    static fetchBookDetail(id) {
        return axios.get('/book/detail/' + id);
    }

    static fetchNovelList(page = 1, tagId = '0', status = '') {
        return axios.get('/book/store', {
            params: {
                page,
                tagId,
                status
            }
        });
    }

    static fetchBookCatalog(id, page = 1, isASC = false) {
        return axios.get(`/book/catalog?novelId=${id}&page=${page}&isASC=${isASC}`);
    }

    static addBookShelf(id) {
        return axios.post('/book-shelf', {
            novelId: id
        });
    }

    static isExistBookShelf(id) {
        return axios.post('/is-exist-book-shelf', {
            novelId: id
        });
    }

    static getKeyWords() {
        return axios.get('/key-wrods');
    }

    static getSearchResults(key) {
        return axios.get('/search?kw=' + key);
    }
};
