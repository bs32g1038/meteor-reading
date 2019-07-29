import Vue from 'vue';
import './styles/index.scss';
import Main from './Main.vue';
import router from './router';
import store from './store';
// import config from './config';
// Object.assign(Vue.config, config);

new Vue({
    router,
    store,
    render: h => h(Main)
}).$mount('#app');
