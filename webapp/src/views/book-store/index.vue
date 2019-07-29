<template>
    <div v-if="!isInitLoading">
        <app-header centerText="书库"></app-header>
        <div class="slide-filter-wrap">
            <ol class="filter-list">
                <router-link
                    :to="`/bookstore?tagId=${index}`"
                    v-for="(item, index) in tags"
                    :key="item"
                    class="filter-item"
                    :class="(tagId == index) && 'active'"
                >{{item}}</router-link>
            </ol>
        </div>
        <div class="decoration"></div>
        <div class="status-filter-list" id="j-status-filter-list">
            <div class="status-filter-list-item active" status="-1">全部</div>
            <div class="status-filter-list-item" status="1">已完结</div>
            <div class="status-filter-list-item" status="0">连载中</div>
        </div>
        <div class="novel-list" id="novel-entries">
            <List
                :finished="finished"
                v-if="hackReset"
                v-model="isLoading"
                @load="onLoad"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
            >
                <ListItem v-for="item in novels" :key="item.id" :item="item" :isShowTagInfo="true"></ListItem>
            </List>
        </div>
    </div>
    <div class="bookstore-content-loading" v-else>
        <content-loader :height="100">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="30"/>
            <rect x="0" y="45" rx="3" ry="3" width="220" height="20"/>
            <rect x="0" y="85" rx="3" ry="3" width="400" height="20"/>
        </content-loader>
        <content-loader :height="140" v-for="i in 5" :key="i">
            <rect x="0" y="30" rx="3" ry="3" width="120" height="130"/>
            <rect x="140" y="30" rx="3" ry="3" width="260" height="20"/>
            <rect x="140" y="60" rx="3" ry="3" width="260" height="20"/>
            <rect x="140" y="90" rx="3" ry="3" width="260" height="60"/>
        </content-loader>
    </div>
</template>

<script>
import { List } from 'vant';
import { ContentLoader } from '@/libs/vue-content-loader';
import ListItem from '@/components/novel-list-item/index.vue';
import AppHeader from '@/components/app-header';

export default {
    components: {
        List,
        ContentLoader,
        ListItem,
        AppHeader
    },
    data() {
        return {
            isLoading: false,
            tags: ['全部分类', '玄幻奇幻', '仙侠修真', '都市言情', '历史军事'],
            hackReset: true
        };
    },
    watch: {
        $route() {
            if (this.tagId !== this.$route.query.tagId) {
                if (
                    this.$store.state.bookStore.cache[this.$route.query.tagId]
                ) {
                    return this.$store.commit(
                        'bookStore/setDataFromCache',
                        this.$route.query.tagId
                    );
                }
                this.$store.dispatch('setLoading', true);
                this.fetchData(1).then(() => {
                    this.$store.dispatch('setLoading', false);
                    this.hackReset = true;
                    this.$store.dispatch(
                        'bookStore/setCurTagId',
                        this.$route.query.tagId
                    );
                });
            } else {
                this.fetchData(this.$route.query.page);
            }
        }
    },
    methods: {
        onLoad() {
            this.$store.commit('bookStore/increasePage');
            const curPage = this.$store.state.bookStore.curPage;
            this.fetchData(curPage).then(() => {
                this.isLoading = false;
            });
        },
        fetchData(page) {
            return this.$store.dispatch('bookStore/fetchNovelListData', {
                page,
                tagId: this.$route.query.tagId,
                status: this.$route.query.status
            });
        }
    },
    mounted() {
        const tagId = this.$route.query.tagId;

        if (tagId && this.$store.state.bookStore.cache[tagId]) {
            this.$store.dispatch('bookStore/setDataFromCache', tagId);
            return;
        }

        if (tagId) {
            this.$store.dispatch('bookStore/setCurTagId', tagId);
        }

        this.$store.dispatch('setLoading', true);
        return this.$store
            .dispatch('bookStore/fetchNovelListData', {
                page: 1,
                tagId: this.$route.query.tagId,
                status: this.$route.query.status
            })
            .then(() => {
                this.$store.dispatch('setLoading', false);
            });
    },
    computed: {
        tagId() {
            return this.$store.getters['bookStore/curTagId'];
        },
        novels() {
            return this.$store.getters['bookStore/items'];
        },
        finished() {
            return this.$store.getters['bookStore/isFinished'];
        },
        isInitLoading() {
            return this.$store.state.isLoading;
        }
    }
};
</script>

<style lang="scss" scoped>
.slide-filter-wrap {
    padding: 0 0.32rem 0.4rem;
    background-color: #fff;
    .filter-list {
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: justify;
        -webkit-overflow-scrolling: touch;
    }
    .filter-item {
        margin-right: 0.1rem;
        display: inline-block;
        font-size: 14px;
        text-align: left;
        padding-right: 8px;
        padding-left: 8px;
        padding-top: 5px;
        padding-bottom: 5px;
        white-space: nowrap;
        border-radius: 25px;
        color: #969ba3;
        text-align: center;
        margin-top: 0.24rem;
        &.active {
            color: #ed424b;
            color: #fff;
            background-color: #ed424b;
            border-color: #ed424b;
        }
    }
}

.decoration {
    height: 0.16rem;
    background-color: #f0f0f0;
    width: 100%;
}

.status-filter-list {
    padding: 0.2rem 0.32rem 0.3rem;
    border-bottom: 1px solid #f3f4f5;
    background-color: #fff;
    &-item {
        display: inline-block;
        font-size: 13px;
        flex: 1 0 auto;
        text-align: center;
        border-radius: 100px;
        color: #969ba3;
        padding: 2px 0.2rem;
        line-height: 1.5;
        &.active {
            color: #ed424b;
            border: 1px solid #ed424b;
        }
    }
}

.bookstore-content-loading {
    background-color: #fff;
    padding: 0.2rem;
}
</style>
