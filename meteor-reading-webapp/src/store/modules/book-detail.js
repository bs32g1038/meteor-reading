import bookApi from '@/api/book';

const getInitState = () => ({
    novel: {},
    otherItems: [],
    startChapter: {},
    lastChapter: {},
});

export default {
    namespaced: true,
    state: getInitState(),
    actions: {
        fetchBookDetailData({ commit }, id) {
            return bookApi.fetchBookDetail(id).then(_ => {
                return commit('setBookDetailData', _.data.data);
            });
        },
        initData({ commit }) {
            return commit('initData');
        },
    },
    mutations: {
        setBookDetailData(state, data) {
            state.novel = data.novel;
            state.otherItems = data.otherItems;
            state.startChapter = data.startChapter;
            state.lastChapter = data.lastChapter;
        },
        initData(state) {
            const initState = getInitState();
            Object.keys(initState).forEach(key => {
                state[key] = initState[key];
            });
        },
    },
};
