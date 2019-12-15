<template>
    <header class="header header-search">
        <div class="logo">星点阅读</div>
        <div class="right">
            <router-link to="/login" class="btn" v-if="!isLogin">
                <user-svg></user-svg>
            </router-link>
            <span class="btn" v-else>
                <user-active-svg></user-active-svg>
            </span>
            <router-link to="/bookshelf" class="btn">
                <book-svg></book-svg>
            </router-link>
        </div>
    </header>
</template>

<script>
import UserActiveSvg from '@/svgs/user-active.vue';
import UserSvg from '@/svgs/user.vue';
import BookSvg from '@/svgs/book.vue';
import helper from '@/utils/helper';

export default {
    components: {
        BookSvg,
        UserSvg,
        UserActiveSvg,
    },
    data() {
        return {
            isLogin: false,
            account: '',
        };
    },
    mounted() {
        if (helper.isValidToken()) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
    },
};
</script>

<style lang="scss" scoped>
.header {
    height: 0.88rem;
    line-height: 0.88rem;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #fff;
    .logo {
        font-size: 18px;
        color: #333;
        text-align: center;
        margin-left: 0.4rem;
        font-weight: bold;
    }
}

.header-search {
    .search-wrapper {
        background-color: #f5f5f5;
        display: flex;
        border-radius: 4px;
        align-items: center;
        height: 26px;
        box-sizing: border-box;
        flex: 1 0 auto;
        padding-left: 0.1rem;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }
    .search-icon {
        fill: #999;
    }
    .search-input {
        flex: 1 0 auto;
    }
    .search-input-field {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        margin-left: 8px;
        color: #70707d;
        font-family: PingFang SC;
        height: auto;
        line-height: auto;
        &:-webkit-input-placeholder {
            color: #999;
            font-size: 14px;
        }
        &:-moz-placeholder {
            color: #999;
            font-size: 14px;
        }
        &:-ms-input-placeholder {
            color: #999;
            font-size: 14px;
        }
    }
}

.header-back {
    .a-back {
        padding-left: 0.2rem;
        display: flex;
        align-items: center;
        > svg {
            vertical-align: middle;
            fill: #403a32;
        }
        &.read {
            flex: 1 0 auto;
        }
    }
    .back-title {
        font-size: 14px;
        color: #403a32;
        vertical-align: middle;
        margin-left: 4px;
        line-height: 1;
    }
    .center-title {
        font-size: 16px;
        flex: 1 0 auto;
        text-align: center;
    }
    .home-btn {
        padding: 0 0.2rem;
        display: block;
        flex: 0 0 auto;
        > img {
            width: 20px;
        }
    }
    .book-chapter-title {
        font-size: 14px;
        color: #403a32;
        vertical-align: middle;
        margin-left: -4px;
    }
    .add-bookshelf {
        color: #403a32;
        font-size: 14px;
        position: relative;
        padding: 0 0.24rem;
        line-height: 0.48rem;
        height: 0.48rem;
        color: #ed424b;
        margin-right: 0.5rem;
        display: block;
        &:after {
            content: ' ';
            display: block;
            width: 200%;
            height: 200%;
            border: 1px solid #ed424b;
            transform: scale(0.5);
            transform-origin: 0 0;
            border-radius: 24px;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
}
.right {
    flex: 1 0 auto;
    text-align: right;
    margin-right: 0.4rem;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    svg {
        vertical-align: middle;
    }
}
.btn {
    font-size: 16px;
    width: 0.68rem;
    display: inline-block;
    text-align: center;
    color: #ed424b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 0.16rem;
}
</style>
