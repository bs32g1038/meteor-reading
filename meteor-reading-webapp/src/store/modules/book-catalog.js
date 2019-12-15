import bookApi from '@/api/book';

const getInitState = () => ({
    finished: false,
    novel: {},
    chapters: [],
    chapterTotalCount: 0,
});

export default {
    namespaced: true,
    state: getInitState(),
    actions: {
        fetchBookCatalogData({ commit }, { id, page, isASC }) {
            return bookApi.fetchBookCatalog(id, page, isASC).then(_ => {
                return commit('setBookCatalogData', _.data.data);
            });
        },
        initData({ commit }) {
            return commit('initData');
        },
        reverse({ commit }) {
            return commit('reverse');
        },
    },
    mutations: {
        setBookCatalogData(state, data) {
            if (!data.chapters) {
                state.finished = true;
                return;
            }
            state.novel = data.novel;
            state.chapters = state.chapters.concat(data.chapters);
            state.chapterTotalCount = data.chapterTotalCount;
        },
        initData(state) {
            const initState = getInitState();
            Object.keys(initState).forEach(key => {
                state[key] = initState[key];
            });
        },
        reverse(state) {
            state.chapters = state.chapters.reverse();
        },
    },
};
