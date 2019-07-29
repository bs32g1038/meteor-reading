<template>
    <footer class="footer" v-if="!isLoading" :class="isRead && 'read'">
        <div class="link-list">
            <a class="link-a">客户端</a>
            <a class="link-a dark" href="/">触屏版</a>
            <a class="link-a" href="#">反馈</a>
            <a class="link-a" href="#">帮助</a>
        </div>
        <div class="footer-info">
            <p>本站仅展示用于学术研究，请勿用于商业用途！</p>
            <p>本站作品收集整理自网络, 版权归属拥有者全权所有, 如侵犯了您的利益，请联系删除 - bs32g1038#163.com</p>
        </div>
        <div class="footer-copy">copyright © 2018-2020 read.lize.com</div>
        <div class="support-area">
            <svg
                height="20"
                class="octicon octicon-mark-github"
                viewBox="0 0 16 16"
                version="1.1"
                width="20"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                ></path>
            </svg>
            <div class="support-area-info">
                <h3>bs32g1038</h3>
                <p>努力打造完美体验的阅读webapp</p>
            </div>
            <div class="support-area-ctrl">
                <a href="javascript:;" class="support-area-btn">支持</a>
            </div>
        </div>
    </footer>
    <div v-else>
        <content-loader :height="100">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="100"/>
        </content-loader>
    </div>
</template>

<script>
import { ContentLoader } from '@/libs/vue-content-loader';

export default {
    components: {
        ContentLoader
    },
    data() {
        return {
            isRead: false
        };
    },
    watch: {
        $route() {
            this.isRead = this.$route.path.indexOf('read') > -1;
        }
    },
    mounted() {
        this.isRead = this.$route.path.indexOf('read') > -1;
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        }
    }
};
</script>

<style lang="scss" scoped>
.footer {
    background-color: #fff;
    padding-top: 0.1rem;
    &.read {
        background: #fff;
        .link-list,
        .footer-info,
        .support-area,
        .footer-copy {
            background: #fff;
        }
    }
}
.link-list {
    font-size: 0.28rem;
    display: flex;
    padding: 0.1rem 0.48rem 0;
    text-align: center;
    color: #969ba3;
    justify-content: space-between;
    box-sizing: border-box;
    .link-a {
        display: block;
        padding: 0.1rem 0;
        color: inherit;
        font-size: 14px;
        display: block;
        &.dark {
            color: #33373d;
            font-size: 15px;
            font-weight: bold;
        }
    }
}
.footer-info {
    background-color: #fff;
    font-size: 12px;
    color: #666;
    padding: 0 0.32rem;
    p {
        line-height: 1.4;
        margin: 0.12rem;
    }
}
.support-area {
    display: flex;
    background-color: #f6f7f9;
    padding: 0.2rem 0.32rem;
    align-items: center;
    svg {
        fill: #ed424b;
    }
    .support-area-info {
        margin-left: 0.2rem;
        flex: 1 0 auto;
        h3 {
            font-size: 14px;
            margin: 0;
        }
        p {
            font-size: 12px;
            padding-top: 3px;
            margin: 0;
        }
    }
    .support-area-btn {
        color: #333;
        font-size: 14px;
        position: relative;
        padding: 0.1rem 0.32rem;
        line-height: 1.5;
        display: block;
        background-color: #ed424b;
        color: #fff;
        border-radius: 5px;
    }
}
.footer-copy {
    font-size: 12px;
    font-weight: 300;
    padding-bottom: 0.24rem;
    text-align: center;
    color: #969ba3;
    box-sizing: border-box;
}
</style>
