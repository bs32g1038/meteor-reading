<template>
    <div class="module-content">
        <div class="module-slide">
            <ol class="module-slide-ol" id="book-friend-list-container" role="listbox" title="水平列表">
                <li v-for="item in items" :key="item.id" class="module-slide-li">
                    <a :href="`/book/detail/${item.id}`" class="module-slide-a">
                        <img
                            :src="`/public/novel-images/${item.pic}`"
                            class="module-slide-img"
                            :alt="item.name"
                        >
                        <figcaption class="module-slide-caption">{{ item.name }}</figcaption>
                        <p class="module-slide-author">{{ item.author }}</p>
                    </a>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.module-content {
    background-color: #fff;
}

.module-slide {
    margin-left: -0.16rem;
}

.module-slide-ol {
    list-style: none;
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    margin: 0;
}

.module-slide-li {
    display: inline-block;
    vertical-align: top;
    white-space: normal;
}

.module-slide-a {
    color: #333;
    display: block;
    padding: 0.24rem 0.16rem 0.1rem;
    word-break: break-all;
    width: 1.4rem;
}

.module-slide-img {
    height: 1.8rem;
    width: auto;
    display: block;
}

.module-slide-caption {
    font-size: 0.28rem;
    word-break: break-all;
    line-height: 1.5;
    margin-top: 0.1rem;
    width: 1.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.module-slide-author {
    font-size: 0.24rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #b3b3b3;
    margin: 1px 0 0 0;
}
</style>
