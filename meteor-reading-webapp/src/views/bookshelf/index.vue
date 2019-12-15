<template>
    <div class="bookshelf-wrap">
        <nav-bar left-text="书架" @click-left="$router.push('/')" @click-right="$router.push('/')" left-arrow>
            <home-svg name="home" class="home-btn" slot="right"></home-svg>
        </nav-bar>
        <div v-if="isLoading">
            <van-loading />
        </div>
        <div v-else>
            <div v-if="!isLogin" class="login-tip">
                <p class="empty-tip-p">登录可实时同步进度</p>
                <vant-button type="default" class="red" to="/login">前往登录</vant-button>
            </div>
            <div class="empty-tip" v-else-if="list.length <= 0">
                <img src="@/assets/bookshelf-bg.jpg" alt />
                <p class="empty-tip-p">赶快用好书塞满书架</p>
                <vant-button type="default" class="red" to="/">去精选找好书</vant-button>
            </div>
            <ul class="list-wrap" v-else>
                <li v-for="item in list" :key="item.id" class="book-item">
                    <div class="list-item-left">
                        <img :src="item.picUrl" />
                    </div>
                    <div class="list-item-right">
                        <h3>
                            {{ item.name }}
                            <router-link :to="`/book/detail/${item.id}`" class="continue-read-btn">
                                <span class="continue-read-btn">继续阅读 ></span>
                            </router-link>
                        </h3>
                        <p class="author">
                            <user-svg></user-svg>
                            {{ item.author }}
                            |
                            {{ TagName(item.tagId) }}
                            |
                            {{ parseTime(item.lastUpdatedAt) }}
                        </p>
                        <p class="lastest_chapter">
                            <span class="content"
                                >最新章节：{{ (item.lastChapter && item.lastChapter.title) || '暂无最新章节...' }}</span
                            >
                            <vant-button type="danger" class="delBtn" @click="del(item.id)">
                                <i class="fa fa-trash"></i>
                            </vant-button>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '@/api/user';
import HomeSvg from '@/svgs/home.vue';
import { NavBar, Button, Toast, Dialog, Loading } from 'vant';
import UserSvg from '@/svgs/user.vue';
import config from '@/config';
import * as time from '@/utils/time';

export default {
    components: {
        HomeSvg,
        NavBar,
        VantButton: Button,
        UserSvg,
        VanLoading: Loading,
    },

    data() {
        return {
            list: [],
            isLoading: false,
            isLogin: false,
        };
    },

    created() {
        this.isLoading = true;
        api.fetchUserBookRecord()
            .then(res => {
                this.isLoading = false;
                this.isLogin = true;
                const list = res.data.data;
                this.list = list;
            })
            .catch(() => {
                this.isLoading = false;
                this.isLogin = false;
            });
    },

    methods: {
        del(id) {
            Dialog.confirm({
                title: '提示',
                message: '确定从书架上移除该小说吗？',
            })
                .then(() => {
                    api.delUserBookRecord(id).then(res => {
                        Toast('移除成功！');
                        this.list = this.list.filter(item => {
                            return item.id !== id;
                        });
                    });
                })
                .catch(() => {});
        },
        TagName(tagId) {
            return config.TagName[tagId];
        },
        parseTime(str) {
            return time.timeAgo(str);
        },
    },
};
</script>

<style lang="scss" scoped>
.home-btn {
    width: 16px;
    vertical-align: middle;
}
.bookshelf-wrap {
    background-color: #fff;
    height: 100%;
    width: 100%;
    .login-tip {
        width: 100%;
        padding: 50% 0.4rem;
        box-sizing: border-box;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        .empty-tip-p {
            text-align: center;
            margin-bottom: 0.4rem;
            color: #cecece;
            font-size: 0.28rem;
        }
    }
    .empty-tip {
        width: 100%;
        padding: 1rem 0.4rem;
        box-sizing: border-box;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        img {
            background-size: 100% 100%;
            height: 2rem;
            width: auto;
            background-position: 100% 100%;
            margin: 0 auto;
        }
        p {
            text-align: center;
            color: #999;
            margin-bottom: 2rem;
        }
    }
}

.red {
    background-color: #ed424b;
    color: #fff;
    width: 100%;
    border: none;
    border-radius: 4px;
    height: 0.8rem;
    line-height: 0.8rem;
}

.delBtn {
    background-color: #fff;
    color: #333;
    border: none;
    position: absolute;
    right: 0.4rem;
    padding-top: 0;
    padding-bottom: 0;
    color: #ed424b;
    line-height: inherit;
    height: auto;
    display: inline-block;
}

.list-wrap {
    list-style: none;
    padding: 0.4rem;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        flex: 1;
        display: flex;
        vertical-align: top;
        white-space: normal;
        margin-bottom: 0.32rem;
        width: 100%;
    }
    .book-item {
        display: flex;
        width: 100%;
    }
    .list-item-left {
        min-width: 1.8rem;
        margin-right: 0.1rem;
    }
    .list-item-right {
        width: 100%;
    }
    img {
        height: 1.8rem;
        width: auto;
        display: block;
    }
    h3 {
        font-size: 0.28rem;
        word-break: break-all;
        line-height: 1.5;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
    }
    .author {
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #b3b3b3;
        margin: 1px 0 0 0;
        svg {
            vertical-align: text-bottom;
            width: 16px;
            height: 16px;
        }
    }
    .lastest_chapter {
        color: #b3b3b3;
        font-size: 13px;
        .content {
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 4.04rem;
            white-space: nowrap;
            word-break: keep-all;
            display: inline-block;
        }
    }
}

.continue-read-btn {
    position: absolute;
    right: 0;
    color: #555;
    font-weight: 400;
}
</style>

<style lang="scss">
html,
body {
    height: 100%;
}
</style>
