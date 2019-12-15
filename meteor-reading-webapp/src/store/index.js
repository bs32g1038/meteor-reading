import Vue from 'vue';
import Vuex from 'vuex';
import bookStore from './modules/book-store';
import bookDetail from './modules/book-detail';
import home from './modules/home';
import bookRead from './modules/book-read';
import bookCatalog from './modules/book-catalog';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            isLoading: false,
        },
        actions: {
            setLoading({ commit }, isLoading) {
                return commit('setLoading', isLoading);
            },
        },
        mutations: {
            setLoading(state, isLoading) {
                state.isLoading = isLoading;
            },
        },
        getters: {},
        modules: {
            home,
            bookRead,
            bookDetail,
            bookStore,
            bookCatalog,
        },
    });
}

export default createStore();
