<template>
    <div class="hot recommend">
        <h3 class="item-title">
            <span class="left-sign"></span>
            {{ title }}
        </h3>
        <div class="item-body">
            <router-link v-for="item in items" :key="item.id" :to="`/book/detail/${item.id}`" class="item-body-novel">
                <div class="item-body-novel-thumb">
                    <img :src="item.picUrl" />
                </div>
                <div class="item-body-novel-content">
                    <h2 class="novel-name">{{ item.name }}</h2>
                    <p class="novel-info">
                        <span>{{ getTagName(item.tagId) }}</span>
                        <span class="author">{{ item.author }}</span>
                    </p>
                    <p class="novel-des">{{ item.summary }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import config from '@/config';
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getTagName(tagId) {
            return config.TagName[tagId];
        },
    },
};
</script>

<style lang="scss" scoped>
.hot {
    background: #fff;
    padding-bottom: 20px;
    margin-bottom: 10px;
    padding-top: 0.2rem;
    .item-title {
        padding: 8px 0 8px 22px;
        position: relative;
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        display: inline;
        color: #333;
        .left-sign {
            margin-right: 10px;
            display: inline-block;
            box-sizing: border-box;
            height: 1em;
            content: '';
            vertical-align: -0.22ex;
            color: transparent;
            border-left: 2px solid #ed424b;
        }
    }

    h3 {
        width: auto;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        color: #ef3a3a;
        letter-spacing: -0.41px;
        font-weight: normal;
        overflow: hidden;
        position: relative;
        padding-left: 0.1rem;
        padding-bottom: 20px;
    }

    .item-body {
        .content .content_header {
            width: 70px;
            height: 90px;
            display: block;
        }
        .content img {
            width: 100%;
            height: auto;
            box-shadow: 0px 0px 4px #999;
        }
    }
}

.recommend {
    padding-bottom: 0;
}

.item-body-novel {
    padding: 2px 20px 10px;
    display: flex;
}

.item-body-novel-thumb {
    width: 80px;
    max-width: 80px;
    flex: 1 0 auto;
    img {
        width: 100%;
        height: auto;
    }
}

.item-body-novel-content {
    margin-left: 10px;
    h2 {
        margin: 0;
        font-size: 16px;
        color: #333;
    }
    .novel-info {
        font-size: 12px;
        color: #999;
        margin: 0;
        padding-top: 5px;
        .author {
            border-left: 1px solid #eee;
            padding-left: 8px;
            padding-right: 4px;
            margin-left: 4px;
        }
    }
    .novel-des {
        padding-top: 5px;
        color: #666;
        font-size: 12px;
        color: #666666;
        letter-spacing: -0.29px;
        width: 100%;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        margin: 0;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
}
</style>
