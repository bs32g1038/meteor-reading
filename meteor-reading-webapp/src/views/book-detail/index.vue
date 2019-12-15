<template>
    <div v-if="!isInitLoading" class="book-detail-wrap">
        <app-header :centerText="novel.name" headerClass="app-header"></app-header>
        <div class="book-detail-info">
            <img :src="`/public/novel-images/${novel.pic}`" class="book-cover-blur" />
            <div class="book-layout">
                <img :src="novel.picUrl" class="book-cover" />
                <div class="book-cell">
                    <h2 class="book-title">{{ novel.name }}</h2>
                    <div class="book-author">
                        作者：
                        {{ novel.author }}
                    </div>
                    <p class="book-meta" role="option">
                        小说类别
                        <span class="char-pipe">|</span>
                        {{ getTagName(novel.tagId) }}
                    </p>
                    <p class="book-meta">
                        连载
                        <span class="char-pipe">|</span>
                        {{ (novel.sumWords / 10000).toFixed(2) }}万字
                    </p>
                    <p class="book-meta">
                        更新时间
                        <span class="char-pipe">|</span>
                        {{ novel.lastUpdatedAt || new Date() }}
                    </p>
                </div>
            </div>
            <div class="book-detail-tool-btn">
                <ul class="btn-group">
                    <li class="btn-group-cell">
                        <van-button
                            type="default"
                            class="red"
                            size="small"
                            :to="`/book/${novel.id}/read/${startChapter && startChapter.id}`"
                            >开始阅读</van-button
                        >
                    </li>
                    <li class="btn-group-cell">
                        <van-button
                            type="default"
                            class="white"
                            size="small"
                            @click="addToShelf"
                            :disabled="isAddBookShelf"
                            >{{ isAddBookShelf ? '已加入书架' : '加入书架' }}</van-button
                        >
                    </li>
                </ul>
            </div>
            <div class="book-summary" @click="openSummary">
                <a href="javascript:;" class="content" :style="{ display: !isOpenSummary ? 'block' : 'none' }">
                    {{ subString(novel.summary) }}...
                    <font color="#3B80E3">展开</font>
                </a>
                <a href="javascript:;" class="content" :style="{ display: isOpenSummary ? 'block' : 'none' }">
                    {{ novel.summary }}
                    <font color="#3B80E3">收起</font>
                </a>
            </div>
            <div class="book-mata-wrap">
                <a :href="`/book/${novel.id}/catalog`" class="book-meta book-status">
                    <div class="book-meta-l">
                        <div class="catalog">
                            <catalog-svg :height="16" />
                            <span>目录</span>
                            <span class="border_r"></span>
                        </div>
                    </div>
                    <div class="book-meta-r">
                        <p class="green ell">{{ lastChapter && lastChapter.title }}</p>
                        <svg class="icon icon-arrow-r" viewBox="0 0 7 12" width="100%" height="100%">
                            <path
                                d="M6.146 6.354v-.708l-5.5 5.5a.5.5 0 0 0 .708.708l5.5-5.5a.5.5 0 0 0 0-.708l-5.5-5.5a.5.5 0 1 0-.708.708l5.5 5.5z"
                            />
                        </svg>
                    </div>
                </a>
            </div>
            <div class="module">
                <div class="module-header">
                    <h3 class="module-title">书友还看过</h3>
                </div>
                <div class="module-content">
                    <module-slide-novel-list :items="items"></module-slide-novel-list>
                </div>
            </div>
        </div>
    </div>
    <div class="book-detail-content-loading" v-else>
        <content-loader :height="140">
            <rect x="0" y="0" rx="3" ry="3" width="120" height="130" />
            <rect x="140" y="0" rx="3" ry="3" width="260" height="20" />
            <rect x="140" y="30" rx="3" ry="3" width="260" height="20" />
            <rect x="140" y="60" rx="3" ry="3" width="260" height="60" />
        </content-loader>
        <content-loader :height="100" v-for="i in 5" :key="i">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="30" />
            <rect x="0" y="45" rx="3" ry="3" width="220" height="20" />
            <rect x="0" y="85" rx="3" ry="3" width="400" height="20" />
        </content-loader>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import config from '@/config';
import api from '@/api/book';
import { ContentLoader } from '@/libs/vue-content-loader';
import * as time from '@/utils/time';
import CatalogSvg from '@/svgs/catalog.vue';
import ModuleSlideNovelList from '@/components/module-slide-novel-list';
import { Button, Toast } from 'vant';
import helper from '@/utils/helper';
import AppHeader from '@/components/app-header';

export default {
    components: {
        ContentLoader,
        ModuleSlideNovelList,
        CatalogSvg,
        VanButton: Button,
        AppHeader,
    },
    data() {
        return {
            isOpenSummary: false,
            isAddBookShelf: false,
        };
    },
    asyncData({ store, route }) {
        return store.dispatch('bookDetail/fetchBookDetailData', route.params.id);
    },
    mounted() {
        if (helper.isValidToken()) {
            api.isExistBookShelf(this.$route.params.id)
                .then(res => {
                    this.isAddBookShelf = res.data.data;
                })
                .catch(err => {});
        }
        this.$store.dispatch('setLoading', true);
        return this.$store.dispatch('bookDetail/fetchBookDetailData', this.$route.params.id).then(() => {
            this.$store.dispatch('setLoading', false);
        });
    },
    methods: {
        openSummary(event) {
            this.isOpenSummary = !this.isOpenSummary;
        },
        subString(str = '') {
            return str.substring(0, 80);
        },
        getTagName(tagId) {
            return config.TagName[tagId];
        },
        parseTime(str) {
            return time.timeAgo(str);
        },
        addToShelf() {
            api.addBookShelf(this.$route.params.id)
                .then(_ => {
                    Toast('添加到书架成功');
                    this.isAddBookShelf = true;
                })
                .catch(err => {
                    if (err.response.data.code === 40100) {
                        Toast('请登录后再操作！');
                    }
                });
        },
    },
    computed: {
        ...mapState('bookDetail', {
            novel: state => state.novel,
            items: state => state.otherItems,
            startChapter: state => state.startChapter,
            lastChapter: state => state.lastChapter,
        }),
        isInitLoading() {
            return this.$store.state.isLoading;
        },
    },
};
</script>

<style lang="scss" scoped>
.book-detail-wrap {
    /deep/ .app-header {
        background-color: transparent;
        &:after {
            display: none;
        }
    }
}

.book-detail-info {
    position: relative;
    background: #fff;
    background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0) 8rem) no-repeat center bottom;
}

.book-layout {
    position: relative;
    display: flex;
    overflow: hidden;
    padding: 0.32rem;
}

.book-cover-blur {
    position: absolute;
    top: 0;
    width: 100%;
    height: 4.2rem;
    opacity: 0.1;
    filter: blur(30px);
    box-shadow: none;
}

.book-detail-info {
    position: relative;
    background: #fff;
    z-index: 1000;
    background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0) 8rem) no-repeat center bottom;
    .book-cover {
        max-width: 1.8rem;
        height: 2.24rem;
        border-radius: 2px;
        box-shadow: none;
        flex: 1 0 auto;
    }
    .book-cell {
        margin-left: 0.4rem;
    }
    .book-title {
        line-height: 1.6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        margin: 0;
    }
    .book-author {
        line-height: 0.44rem;
        color: #999;
        font-size: 12px;
    }
    .book-meta {
        font-size: 12px;
        color: #999;
        line-height: 0.4rem;
        margin: 0;
    }
    .char-pipe {
        font-family: Georgia, Helvetica, Arial;
        padding: 0 0.5ch;
    }
    .icon > svg,
    svg.icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.25ex;
        fill: currentColor;
    }
}

.book-detail-tool-btn {
    margin-bottom: 0.4rem;
    .btn-group {
        list-style: none;
        padding: 0;
        padding: 0 0.32rem;
        display: flex;
    }
    .btn-group-cell {
        flex: 1 0 auto;
        max-width: 45%;
        &:first-child {
            margin-right: 0.4rem;
        }
    }
    .red {
        background-color: #ed424b;
        color: #fff;
        border: none;
        width: 100%;
    }
    .white {
        background-color: #fff;
        color: #333;
        width: 100%;
    }
}

.book-summary {
    display: block;
    font-size: 14px;
    position: relative;
    margin-left: 0.32rem;
    padding-right: 0.32rem;
    text-align: justify;
    border-top: 0.32rem solid transparent;
    border-bottom: 0.32rem solid transparent;
    box-shadow: 0 1px #f0f1f2, 0 -1px #f0f1f2;
    .content {
        display: block;
        color: #666;
        font-size: 14px;
        line-height: 100%;
        text-decoration: none;
        word-break: break-all;
        line-height: 1.6;
        text-indent: 2em;
    }
}

.book-mata-wrap {
    padding: 0.2rem 0;
    background-color: #f0f0f0;
    .book-meta {
        font-size: 12px;
        overflow: hidden;
        position: relative;
        background-color: #fff;
    }
    .book-status {
        height: 0.9rem;
        line-height: 0.9rem;
        display: block;
        padding: 0 0.32rem;
    }
}

.book-meta-l {
    float: left;
    .catalog {
        position: relative;
        padding-right: 8px;
        display: flex;
        align-items: center;
    }
    img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-top: -4px;
    }
    .border_r {
        width: 2px;
        height: 13px;
        border-right: 1px solid #e5e5e5;
        position: absolute;
        right: 0;
        top: 0.32rem;
    }
}

.book-meta-r {
    float: left;
    margin-left: 8px;
    p {
        font-size: 12px;
        margin: 0;
    }
    .green {
        color: #579a63;
    }
    .icon {
        position: absolute;
        right: 5px;
        top: calc(0.2rem + 6px);
    }
}

.module-title {
    font-size: 0.32rem;
    color: #5d5d5d;
    border-bottom: 1px solid #f3f4f5;
    padding: 0 16px;
    height: 0.8rem;
    line-height: 0.8rem;
    font-weight: 700;
    margin: 0;
}

.module-content {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}

.book-detail-content-loading {
    background-color: #fff;
    padding: 0.2rem;
}
</style>
