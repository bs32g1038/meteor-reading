import homeApi from '@/api/home';

const getInitState = () => ({
    hotRecommends: [],
    guessRecommends: [],
    categoryRecommend: {
        xuanhuan: [],
        xianxia: [],
        junshi: [],
        dushi: []
    },
    banners: []
});

export default {
    namespaced: true,
    state: getInitState(),
    actions: {
        fetchHomeData: ({ commit }) => {
            return homeApi.fetchHomeInfo().then((_) => {
                return commit('setHomeData', _.data.data);
            });
        },
        initData({ commit }) {
            return commit('initData');
        }
    },
    mutations: {
        setHomeData(state, data) {
            state.hotRecommends = data.hotRecommends;
            state.guessRecommends = data.guessRecommends;
            state.categoryRecommend = data.categoryRecommend;
            state.banners = data.banners;
        },
        initData(state) {
            const initState = getInitState();
            Object.keys(initState).forEach(key => {
                state[key] = initState[key];
            });
        }
    }
};
