<template>
    <div id="searchPopup" class="search-popup" v-show="isShowSearch">
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
        <!-- 搜索框 E -->
        <div class="search-title-bar">
            <h5 class="search-title">大家都在搜</h5>
        </div>
        <div class="search-tags">
            <router-link
                v-for="item in tags"
                :key="item.id"
                :to="'/search?kw=' + item.name"
                class="btn-line-gray"
                :data-keyword="item.name"
                >{{ item.name }}</router-link
            >
        </div>
    </div>
</template>

<script>
import { Search } from 'vant';
import bookApi from '@/api/book';

export default {
    components: {
        VanSearch: Search,
    },
    props: {
        value: {
            type: Boolean,
        },
    },
    data() {
        return {
            kw: '',
            isShowSearch: this.value,
            tags: [],
        };
    },
    methods: {
        onSearch() {
            this.$router.push('/search?kw=' + this.kw);
        },
        onCancel() {
            this.$emit('input', !this.isShowSearch);
        },
    },
    watch: {
        value(value) {
            this.isShowSearch = value;
        },
    },
    mounted() {
        bookApi.getKeyWords().then(res => {
            this.tags = res.data.data;
        });
    },
};
</script>

<style lang="scss" scoped>
.search-popup {
    position: fixed;
    z-index: 100000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
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
</style>
