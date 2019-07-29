<template>
    <div class="search-wrap">
        <!-- 搜索框 S -->
        <header class="header">
            <form action="/">
                <van-search
                    v-model="kw"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
                />
            </form>
        </header>
        <div class="novel-list" id="novel-entries">
            <List :finished="true">
                <ListItem v-for="item in novels" :key="item.id" :item="item" :isShowTagInfo="true"></ListItem>
            </List>
        </div>
    </div>
</template>

<script>
import { List, Search, Toast } from 'vant';
import bookApi from '@/api/book';
import ListItem from '@/components/novel-list-item/index.vue';

export default {
    components: {
        VanSearch: Search,
        ListItem,
        List
    },
    props: {
        value: {
            type: Boolean
        }
    },
    data() {
        return {
            kw: '',
            isShowSearch: this.value,
            novels: []
        };
    },
    methods: {
        onSearch() {
            const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '加载中...'
            });
            bookApi.getSearchResults(this.kw).then(res => {
                this.novels = res.data.data;
                toast.clear();
            });
        },
        onCancel() {
            this.$router.back(-1);
        }
    },
    watch: {
        value(value) {
            this.isShowSearch = value;
        }
    },
    mounted() {
        const kw = this.$route.query.kw;
        this.kw = kw;
        bookApi.getSearchResults(kw).then(res => {
            this.novels = res.data.data;
        });
    }
};
</script>

<style lang="scss" scoped>
.search-wrap {
    background-color: #fff;
    min-height: calc(100vh - 4rem);
    .header {
        position: fixed;
        top: 0;
        z-index: 1000;
        border-bottom: 1px solid #f0f1f0;
        width: 7.5rem;
    }
}
.search-title-bar {
    overflow: hidden;
    padding: 0.1rem 0.4rem 0;
    background-color: rgba(0, 0, 0, 0.03);
}
.search-title {
    font-size: 13px;
    font-weight: 400;
    float: left;
    color: #969ba3;
    margin: 10px;
}
.search-tags {
    padding: 0.2rem 0.3rem;
}
.btn-line-gray {
    color: #969ba3;
    font-size: 0.28rem;
    display: inline-block;
    padding: 0.1rem 0.2rem;
    text-align: center;
    border: 1px solid;
    border-radius: 50px;
    margin: 0.1rem;
}
.novel-list {
    margin-top: 55px;
}
.novel-list /deep/ .NovelListItem {
    position: relative;
}
.novel-list /deep/ .NovelListItem:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: -1px;
    content: '';
    -webkit-transition: margin-left 0.15s;
    transition: margin-left 0.15s;
    border-bottom: 1px solid #f0f1f2;
}
</style>
