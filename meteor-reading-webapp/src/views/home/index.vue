<template>
    <div v-if="!isLoading">
        <page-header></page-header>
        <TopNav></TopNav>
        <div class="banner-box">
            <div class="banner-box-view">
                <swipe :autoplay="3000" indicator-color="white">
                    <swipe-item v-for="item in banners" :key="item">
                        <img :src="item" alt />
                    </swipe-item>
                </swipe>
            </div>
        </div>
        <search-guide :kw="tags[0].name"></search-guide>
        <div class="hot recommend">
            <h3 class="item-title">
                <span class="left-sign"></span>
                热门推荐
            </h3>
            <div class="item-body">
                <list-item v-for="item in hotRecommends" :item="item" :key="item.id"></list-item>
            </div>
        </div>
        <div class="module">
            <div class="module-header">
                <h3 class="item-title">
                    <span class="left-sign"></span>
                    分类推荐
                </h3>
                <div class="module-header-r">
                    <router-link to="/bookstore?tagId=0" class="module-header-btn">更多</router-link>
                </div>
            </div>
            <div class="module-body">
                <tabs v-model="tabs1" type="card" animated>
                    <tab title="玄幻奇幻">
                        <list-item :item="sliceArr(categoryRecommend.xuanhuan, 0, 1)"></list-item>
                        <module-slide-novel-list
                            :items="sliceArr(categoryRecommend.xuanhuan, 1)"
                        ></module-slide-novel-list>
                    </tab>
                    <tab title="仙侠修真">
                        <list-item :item="sliceArr(categoryRecommend.xianxia, 0, 1)"></list-item>
                        <module-slide-novel-list
                            :items="sliceArr(categoryRecommend.xianxia, 1)"
                        ></module-slide-novel-list>
                    </tab>
                </tabs>
                <hr class="hr" />
                <tabs v-model="tabs2" type="card" animated>
                    <tab title="历史军事">
                        <list-item :item="sliceArr(categoryRecommend.junshi, 0, 1)"></list-item>
                        <module-slide-novel-list
                            :items="sliceArr(categoryRecommend.junshi, 1)"
                        ></module-slide-novel-list>
                    </tab>
                    <tab title="都市言情">
                        <list-item :item="sliceArr(categoryRecommend.dushi, 0, 1)"></list-item>
                        <module-slide-novel-list
                            :items="sliceArr(categoryRecommend.dushi, 1)"
                        ></module-slide-novel-list>
                    </tab>
                </tabs>
            </div>
        </div>
        <div class="hot recommend">
            <h3 class="item-title">
                <span class="left-sign"></span>
                猜你喜欢
            </h3>
            <div class="item-body">
                <list-item title="热门小说" v-for="item in guessRecommends" :item="item" :key="item.id"></list-item>
            </div>
        </div>
    </div>
    <div class="home-content-loading" v-else>
        <content-loader :height="290">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="30" />
            <rect x="0" y="45" rx="3" ry="3" width="220" height="20" />
            <rect x="0" y="80" rx="3" ry="3" width="400" height="130" />
            <rect x="25" y="220" rx="3" ry="3" width="350" height="60" />
        </content-loader>
        <content-loader :height="160" v-for="i in 5" :key="i">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="20" />
            <rect x="0" y="30" rx="3" ry="3" width="120" height="130" />
            <rect x="140" y="30" rx="3" ry="3" width="260" height="20" />
            <rect x="140" y="60" rx="3" ry="3" width="260" height="20" />
            <rect x="140" y="90" rx="3" ry="3" width="260" height="60" />
        </content-loader>
    </div>
</template>

<script>
import { Tabs, Tab, Swipe, SwipeItem } from 'vant';
import pageHeader from './header.vue';
import TopNav from './top-nav.vue';
import searchGuide from './search-guide.vue';
import ListItem from '@/components/novel-list-item/index.vue';
import ModuleSlideNovelList from '@/components/module-slide-novel-list';
import { mapState } from 'vuex';
import { ContentLoader } from '@/libs/vue-content-loader';
import bookApi from '@/api/book';

export default {
    components: {
        pageHeader,
        TopNav,
        searchGuide,
        ListItem,
        ModuleSlideNovelList,
        ContentLoader,
        Swipe,
        SwipeItem,
        Tabs,
        Tab,
    },
    data() {
        return {
            loading: false,
            tabs1: 0,
            tabs2: 0,
            tags: [
                {
                    name: '',
                },
            ],
        };
    },
    asyncData({ store, route }) {
        return store.dispatch('home/fetchHomeData');
    },
    mounted() {
        bookApi.getKeyWords().then(res => {
            this.tags = res.data.data;
        });
        this.$store.dispatch('setLoading', true);
        return this.$store.dispatch('home/fetchHomeData').then(() => {
            this.$store.dispatch('setLoading', false);
        });
    },
    computed: {
        ...mapState('home', {
            hotRecommends: state => state.hotRecommends,
            guessRecommends: state => state.guessRecommends,
            categoryRecommend: state => state.categoryRecommend,
            banners: state => {
                return ['/static/0.jpg', '/static/1.jpg', '/static/2.jpg'];
            },
        }),
        isLoading() {
            return this.$store.state.isLoading;
        },
    },
    methods: {
        sliceArr(arr, start, end) {
            const temp = arr.slice(start, end);
            if (temp.length === 1) {
                return temp[0];
            }
            return temp;
        },
    },
};
</script>

<style lang="scss" scoped>
.banner-box {
    position: relative;
    width: 100%;
    padding-bottom: 0.1rem;
    background-color: #fff;
}

.banner-box-view {
    margin: 0 0.2812rem;
    a {
        display: block;
    }
    img {
        width: 100%;
        height: auto;
        min-height: 1.8rem;
        box-shadow: none;
        background: #aaa;
    }
}

.hot {
    background: #fff;
    padding-bottom: 20px;
    margin-bottom: 10px;
    padding-top: 0.2rem;
    .item-title {
        padding: 8px 0 8px 0.24rem;
        position: relative;
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        display: inline;
        color: #333;
        .left-sign {
            margin-right: 10px;
            display: inline-block;
            box-sizing: border-box;
            height: 1em;
            content: '';
            vertical-align: -0.22ex;
            color: transparent;
            border-left: 2px solid #ed424b;
        }
    }

    h3 {
        width: auto;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        color: #ef3a3a;
        letter-spacing: -0.41px;
        font-weight: normal;
        overflow: hidden;
        position: relative;
        padding-left: 0.1rem;
        padding-bottom: 20px;
    }

    .item-body {
        padding: 0;
        margin: 0;
        list-style: none;
        .content .content_header {
            width: 70px;
            height: 90px;
            display: block;
        }
        .content img {
            width: 100%;
            height: auto;
            box-shadow: 0px 0px 4px #999;
        }
    }
}

.module {
    background-color: #fff;
    margin-bottom: 0.2rem;
    padding-top: 0.26rem;
}

.module-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-title {
    padding: 8px 0 8px 0.24rem;
    position: relative;
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    display: inline;
    color: #333;
    .left-sign {
        margin-right: 10px;
        display: inline-block;
        box-sizing: border-box;
        height: 1em;
        content: '';
        vertical-align: -0.22ex;
        color: transparent;
        border-left: 2px solid #ed424b;
    }
}

.module-header-r {
    margin-right: 0.2rem;
}

.module-header-btn {
    white-space: nowrap;
    color: #969ba3;
}

.module-body {
    padding: 0.2rem 0.4rem;
}

.module-body /deep/ .van-tabs__nav--card {
    margin: 0;
}

.module-body /deep/ .van-tabs--card {
    padding-top: 0;
}

.module-body /deep/ .NovelListItem {
    padding-left: 0;
    padding-right: 0;
}

.hr {
    position: relative;
    display: block;
    border: none;
    border-top: 1px solid #f0f1f2;
    background-color: transparent;
}
</style>
