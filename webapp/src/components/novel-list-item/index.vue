<template>
    <router-link :to="`/book/detail/${item.id}`" class="NovelListItem">
        <div class="NovelListItem__thumb">
            <img :src="`/public/novel-images/${item.pic}`" :alt="item.name">
        </div>
        <div class="NovelListItem__content">
            <h2 class="NovelListItem__name">{{ item.name }}</h2>
            <p class="NovelListItem__info">
                <span>{{getTagName(item.tagId)}}</span>
                <span class="author">{{ item.author }}</span>
            </p>
            <p class="NovelListItem__des">{{ item.summary }}</p>
            <p class="NovelListItem__tags" v-if="isShowTagInfo">
                <span class="NovelListItem__tag red">{{item.status == 0 ? '连载' : '完结'}}</span>
                <span class="NovelListItem__tag blue">{{ (item.sumWords / 10000).toFixed(2) }}万字</span>
            </p>
        </div>
    </router-link>
</template>

<script>
import config from '@/config';
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        isShowTagInfo: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getTagName(tagId) {
            return config.TagName[tagId];
        }
    }
};
</script>

<style lang="scss">
.NovelListItem {
    background-color: #fff;
    display: flex;
    padding: 0.24rem;

    &__content {
        margin-left: 10px;
    }

    &__name {
        margin: 0;
        font-size: 16px;
        color: #333;
    }

    &__info {
        font-size: 12px;
        color: #999;
        margin: 0;
        padding-top: 5px;
        > .author {
            border-left: 1px solid #eee;
            padding-left: 8px;
            padding-right: 4px;
            margin-left: 4px;
        }
    }

    &__des {
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
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    &__tags {
        line-height: 1.5;
        font-size: 12px;
        padding-top: 5px;
        margin: 0;
    }

    &__tag {
        line-height: 1.5;
        display: inline-block;
        padding: 0 0.25em;
        transform: scale(1);
        position: relative;
        margin-right: 5px;
        border-radius: 2px;
        &:before {
            position: absolute;
            z-index: -1;
            top: -1px;
            right: 0;
            bottom: 1px;
            left: 0;
            content: '';
            opacity: 0.5;
            border: 1px solid;
            border-radius: 2px;
        }
        &.red {
            color: #ed424b;
        }
        &.blue {
            color: #4284ed;
        }
    }
}
</style>
