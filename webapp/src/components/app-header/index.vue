<template>
    <div>
        <nav-bar
            :class="headerClass"
            :title="centerText"
            :left-text="leftText"
            @click-left="onClickLeft"
            @click-right="onClickRight"
            left-arrow
        >
            <search-svg name="search" class="search-btn" slot="right"></search-svg>
            <home-svg name="home" class="home-btn" slot="right"></home-svg>
        </nav-bar>
        <SearchPage v-model="showSearchPage"></SearchPage>
    </div>
</template>

<script>
import SearchSvg from '@/svgs/search.vue';
import HomeSvg from '@/svgs/home.vue';
import SearchPage from '@/components/search-page';
import { NavBar } from 'vant';

export default {
    components: {
        NavBar,
        SearchSvg,
        HomeSvg,
        SearchPage
    },
    props: {
        headerClass: {
            type: String
        },
        centerText: {
            type: String
        },
        leftText: {
            type: String,
            default: '返回'
        }
    },
    data() {
        return {
            showSearchPage: false
        };
    },
    methods: {
        onClickLeft(event) {
            this.$router.push('/');
            this.$emit('click-left', event);
        },
        onClickRight(event) {
            if (event.target.getAttribute('name') === 'home') {
                this.$router.push('/');
            } else {
                this.showSearchPage = true;
            }
        }
    }
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
</style>
