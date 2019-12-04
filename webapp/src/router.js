import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home';
import Bookstore from './views/book-store';
import BookDetail from './views/book-detail';
import BookCatalog from './views/book-catalog';
import BookRead from './views/book-read';
import Login from './views/login';
import Register from './views/register';
import Bookshelf from './views/bookshelf';
import BookSearch from './views/book-search';

import App from './App.vue';

// import Category from './views/book/category/index.vue';
// import Loading from './components/loading';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // },
    routes: [
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/bookshelf',
            name: 'bookshelf',
            component: Bookshelf
        },
        {
            path: '/',
            component: App,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/bookstore',
                    name: 'book-store',
                    component: Bookstore
                },
                {
                    path: '/book/detail/:id',
                    name: 'book-detail',
                    component: BookDetail
                },
                {
                    path: '/book/:novelId/read/:chapterId',
                    name: 'book-read',
                    component: BookRead
                },
                {
                    path: '/book/:id/catalog',
                    name: 'book-catalog',
                    component: BookCatalog
                },
                {
                    path: '/search',
                    name: 'book-search',
                    component: BookSearch
                }
                // {
                //     path: '/book/category',
                //     name: 'book-category',
                //     component: Category
                // },
                // {
                //     path: '/loading',
                //     name: 'loading',
                //     component: Loading
                // }
                // {
                //     path: '/about',
                //     name: 'about',
                //     // route level code-splitting
                //     // this generates a separate chunk (about.[hash].js) for this route
                //     // which is lazy-loaded when the route is visited.
                //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
                // }
            ]
        }]
});

export default router;
