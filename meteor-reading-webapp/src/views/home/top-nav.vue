<template>
    <div class="entry-list-wrap">
        <div class="entry-list">
            <router-link to="/" class="entry-list-item active">精选</router-link>
            <router-link to="/bookstore?tagId=0" class="entry-list-item">书库</router-link>
            <a href="#" class="entry-list-item">排行</a>
            <router-link to="/bookshelf" class="entry-list-item">书架</router-link>
            <a href="#" class="entry-list-item">探索</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entry-list-wrap {
    background-color: #fff;
    position: relative;
}

.entry-list {
    background-color: #fff;
    list-style: none;
    display: flex;
    flex: 1 0 auto;
    padding: 0.2rem 0.3rem 0.4rem;
}

.entry-list-item {
    text-align: center;
    flex: 1 0 auto;
    color: #333;
    display: block;
    position: relative;
    outline: none;
    &:focus {
        outline: none;
    }
    &.active {
        position: relative;
        background: #fff;
        color: #222;
        font-size: 17px;
        font-weight: bold;
        &:after {
            position: absolute;
            content: '';
            width: 12px;
            height: 3px;
            bottom: -7px;
            left: 0.54rem;
            background: #e64d2e;
            border-radius: 3px;
        }
    }
    img {
        width: 30px;
        height: 30px;
    }
    p {
        color: #333;
        font-size: 15px;
        margin: 0;
        line-height: 1.6;
    }
}
</style>
