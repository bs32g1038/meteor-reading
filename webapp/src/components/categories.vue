<template>
    <ul class="Categories">
        <li class="Categories-item">
            <i class="fa fa-book fa-fw"></i>分类
        </li>
        <li class="Categories-item" v-for="item in categories" :key="item.id">
            <router-link class="Categories-link" :to="'/blog/articles?cid=$' + item.id">
                {{item.name}}
                <span>({{item.articleCount}})</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            categories: [
                {
                    id: 'sss',
                    name: '前端',
                    articleCount: 10
                }
            ]
        };
    }
};
</script>

<style lang="scss">
.Categories {
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex: 0 0 auto;
    font-size: 12px;
    margin: 0;
    padding: 10px 42px;
}

.Categories-item {
    display: inline-block;
    margin-right: 20px;
}

.Categories-link {
    color: #90979c;
}
</style>
