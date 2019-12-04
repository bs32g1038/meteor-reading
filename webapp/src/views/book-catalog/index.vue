<template>
    <div v-if="!isInitLoading">
        <nav-bar
            :left-text="novel.name"
            @click-left="$router.push('/')"
            @click-right="onClickRight"
            left-arrow
        >
            <search-svg name="search" class="search-btn" slot="right"></search-svg>
            <home-svg name="home" class="home-btn" slot="right"></home-svg>
        </nav-bar>
        <SearchPage v-model="showSearchPage"></SearchPage>
        <div class="catalog-wraper">
            <h3 class="title">目录</h3>
            <div class="m-header">
                <div class="m-header-l">
                    <h4 class="chapter-sum">
                        共
                        <output>{{ chapterTotalCount }}</output>章
                    </h4>
                </div>
                <a href="javascript:;" class="m-header-r" @click="desOrder">
                    <span class="m-header-r-title">{{isASC ? '正序' : '倒序'}}</span>
                </a>
            </div>
            <ol class="chapter-ol-chapter">
                <li class="chapter-bar">正文卷</li>
                <List
                    :immediateCheck="false"
                    :finished="true"
                    v-model="isLoading"
                    @load="onLoad"
                    finished-text="没有更多了"
                    error-text="请求失败，点击重新加载"
                >
                    <li class="chapter-li" v-for="item in chapters" :key="item.id">
                        <router-link :to="`/book/${novel.id}/read/${item.id}`" class="chapter-li-a">
                            <span class="chapter-index">{{ item.title }}</span>
                        </router-link>
                    </li>
                </List>
            </ol>
        </div>
    </div>
    <div class="book-catalog-content-loading" v-else>
        <content-loader :height="70" v-for="i in 14" :key="i">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="30" />
            <rect x="0" y="40" rx="3" ry="3" width="350" height="20" />
        </content-loader>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { ContentLoader } from '@/libs/vue-content-loader';
import { NavBar, List } from 'vant';
import SearchSvg from '@/svgs/search.vue';
import HomeSvg from '@/svgs/home.vue';
import SearchPage from '@/components/search-page';

export default {
    components: {
        ContentLoader,
        NavBar,
        SearchSvg,
        HomeSvg,
        List,
        SearchPage,
    },
    data() {
        return {
            isLoading: false,
            page: 1,
            isASC: false,
            showSearchPage: false,
        };
    },
    asyncData({ store, route }) {
        return store.dispatch('bookCatalog/fetchBookCatalogData', {
            id: this.$route.params.id,
        });
    },
    mounted() {
        if (this.$store.state.bookCatalog.chapters.length <= 0) {
            this.fetchData();
        }
    },
    methods: {
        fetchData(page, isASC) {
            this.$store.dispatch('setLoading', true);
            return this.$store
                .dispatch('bookCatalog/fetchBookCatalogData', {
                    id: this.$route.params.id,
                    page,
                    isASC,
                })
                .then(() => {
                    this.$store.dispatch('setLoading', false);
                });
        },
        onClickRight(event) {
            if (event.target.getAttribute('name') === 'home') {
                this.$router.push('/');
            } else {
                this.showSearchPage = true;
            }
        },
        onLoad() {
            this.page++;
            this.$store
                .dispatch('bookCatalog/fetchBookCatalogData', {
                    id: this.$route.params.id,
                    page: this.page,
                    isASC: this.isASC,
                })
                .then(() => {
                    this.$store.dispatch('setLoading', false);
                    this.isLoading = false;
                })
                .catch(() => {
                    this.isLoading = false;
                });
        },
        desOrder() {
            this.isASC = !this.isASC;
            setTimeout(() => {
                this.$store.dispatch('bookCatalog/reverse');
            });
        },
    },
    computed: {
        ...mapState('bookCatalog', {
            novel: state => state.novel,
            chapters: state => state.chapters,
            finished: state => state.finished,
            chapterTotalCount: state => state.chapters.length,
        }),
        isInitLoading() {
            return this.$store.state.isLoading;
        },
    },
};
</script>

<style lang="scss" scoped>
.search-btn {
    width: 16px;
    vertical-align: middle;
    margin-right: 20px;
}
.home-btn {
    width: 16px;
    vertical-align: middle;
}
.catalog-wraper {
    background-color: #fff;
    .title {
        font-size: 14px;
        line-height: 1.8;
        transition: color 0.15s;
        color: #969ba3;
        border-bottom: 1px solid #e3e4e6;
        color: #ed424b;
        border-bottom-color: #ed424b;
        font-weight: normal;
        padding: 0.2rem 0;
        text-align: center;
        margin: 0;
    }

    .m-header {
        display: flex;
        justify-content: space-between;
        padding: 8px 0.32rem;
        align-items: center;
        font-size: 14px;
        .chapter-sum {
            font-size: 14px;
            margin: 0.2rem 0;
        }
    }

    .chapter-ol-chapter {
        list-style: none;
        padding: 0;
        font-size: 14px;
        margin: 0;
    }

    .chapter-li-a {
        font: 14px/20px a;
        display: block;
        overflow: hidden;
        padding: 11px 0.32rem;
        padding-right: 2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #333;
    }

    .chapter-bar {
        padding: 8px 0.32rem 8px;
        color: #969ba3;
        background-color: #f6f7f9;
        line-height: 26px;
    }

    .chapter-li:after {
        display: block;
        margin-top: -1px;
        margin-left: 0.32rem;
        content: '';
        transform: scaleY(0.75);
        border-top: 1px solid #f0f1f2;
    }
}
.m-header-r {
    display: flex;
    align-items: center;
    .m-header-r-title {
        font-size: 14px;
        color: #333;
        width: 42px;
        text-align: center;
        line-height: 24px;
    }
    svg {
        fill: #585858;
        vertical-align: bottom;
    }
}
.book-catalog-content-loading {
    background-color: #fff;
    padding: 0.2rem;
}
</style>
