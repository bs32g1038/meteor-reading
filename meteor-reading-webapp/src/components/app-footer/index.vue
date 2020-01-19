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
        <div class="footer-copy">
            copyright © 2018-2030 星点阅读
            <a href="http://www.beian.miit.gov.cn" rel="noopener noreferrer" target="_blank">
                <span className="icon-icp"></span>粤ICP备16021965号-1
            </a>
        </div>
    </footer>
    <div v-else>
        <content-loader :height="100">
            <rect x="0" y="0" rx="3" ry="3" width="400" height="100" />
        </content-loader>
    </div>
</template>

<script>
import { ContentLoader } from '@/libs/vue-content-loader';

export default {
    components: {
        ContentLoader,
    },
    data() {
        return {
            isRead: false,
        };
    },
    watch: {
        $route() {
            this.isRead = this.$route.path.indexOf('read') > -1;
        },
    },
    mounted() {
        this.isRead = this.$route.path.indexOf('read') > -1;
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        },
    },
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
    a {
        color: #969ba3;
        font-size: 12px;
    }
}
</style>
