import bookApi from '@/api/book';

const getInitState = () => ({
    curTagId: 0,
    curPage: 1,
    items: [],
    isFinished: false,
    cache: {
        // 0: {
        //     items: []
        //     curPage: 1,
        //     isFinished: false
        // }
    },
});

const initCache = (state, tagId) => {
    if (!state.cache[tagId]) {
        state.cache[tagId] = {
            items: [],
            curPage: 1,
            isFinished: false,
        };
    }
};

export default {
    namespaced: true,
    state: getInitState(),
    actions: {
        fetchNovelListData({ commit }, { page, status, tagId }) {
            return bookApi.fetchNovelList(page, tagId, status).then(_ =>
                commit('setNovelListData', {
                    tagId,
                    page,
                    items: _.data.data,
                })
            );
        },
        initCache({ commit }) {
            return commit('initCache');
        },
        increasePage({ commit }, tagId) {
            return commit('increasePage', tagId);
        },
        setCurTagId({ commit }, curTagId) {
            return commit('setCurTagId', curTagId);
        },
        setDataFromCache({ commit }, curTagId) {
            return commit('setDataFromCache', curTagId);
        },
    },
    mutations: {
        setNovelListData(state, data) {
            const tagId = data.tagId;

            initCache(state, tagId || 0);

            state.isFinished = false;
            if (data.items.length <= 0) {
                state.isFinished = true;
                state.cache[tagId].isFinished = true;
                return;
            }

            // 缓存
            state.cache[tagId].items = state.cache[tagId].items.concat(data.items);
            state.cache[tagId].curPage = data.page;
            state.curPage = data.page;
            state.items = state.cache[tagId].items;
        },
        initCache(state) {
            const initState = getInitState();
            Object.keys(initState).forEach(key => {
                state[key] = initState[key];
            });
        },
        increasePage(state) {
            initCache(state, state.curTagId);
            state.curPage = state.curPage + 1;
            state.cache[state.curTagId].curPage = state.curPage;
        },
        setCurTagId(state, curTagId) {
            state.curTagId = curTagId;
        },
        setDataFromCache(state, curTagId) {
            const data = state.cache[curTagId];
            state.curPage = data.curPage;
            state.items = data.items;
            state.isFinished = data.isFinished;
            state.curTagId = curTagId;
        },
    },
    getters: {
        items: state => state.items,
        curTagId: state => state.curTagId,
        isFinished: state => state.isFinished,
    },
};
