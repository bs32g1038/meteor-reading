import bookApi from '@/api/book';

const getInitState = () => ({
    isEnter: false,
    novel: {},
    chapter: {},
    chapters: [],
    nextChapter: {},
    preChapter: {}
});

export default {
    namespaced: true,
    state: getInitState(),
    actions: {
        fetchReadData({ commit }, chapterId) {
            return bookApi.fetchReadData(chapterId).then(_ => {
                return commit('setReadData', _.data.data);
            });
        },
        initData({ commit }) {
            return commit('initData');
        },
        setIsEnterData({ commit }) {
            return commit('setIsEnterData');
        }
    },
    mutations: {
        setReadData(state, data) {
            state.novel = data.novel;
            state.chapter = data.chapter;
            if (data.chapter) {
                state.chapters.push(state.chapter);
            }
            state.nextChapter = data.nextChapter;
            state.preChapter = data.preChapter;
        },
        initData(state) {
            const initState = getInitState();
            Object.keys(initState).forEach(key => {
                state[key] = initState[key];
            });
        },
        setIsEnterData(state) {
            state.isEnter = true;
        }
    }
};
