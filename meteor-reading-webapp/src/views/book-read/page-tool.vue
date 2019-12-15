<template>
    <div class="page-read-tool">
        <i class="fa" :class="isActiveMenu ? 'fa-close' : 'fa-reorder'" @click="isActiveMenu = !isActiveMenu"></i>
        <div class="page-read-tool-group">
            <a
                href="javascript:;"
                class="page-read-tool-btn"
                :class="isActiveMenu && 'btn-font-plus'"
                @click="fontBigger"
            >
                <i class="fa fa-plus"></i>
            </a>
            <a
                href="javascript:;"
                class="page-read-tool-btn"
                :class="isActiveMenu && 'btn-font-minus'"
                @click="fontSmaller"
            >
                <i class="fa fa-minus"></i>
            </a>
            <a
                href="javascript:;"
                class="page-read-tool-btn"
                :class="isActiveMenu && 'btn-list'"
                @click="$router.push(`/book/${novel_id}/catalog`)"
            >
                <i class="fa fa-list"></i>
            </a>
            <a
                href="javascript:;"
                class="page-read-tool-btn"
                :class="isActiveMenu && 'btn-return'"
                @click="$router.push(`/book/detail/${novel_id}`)"
            >
                <i class="fa fa-reply"></i>
            </a>
        </div>
    </div>
</template>

<script>
const CHAPTER_CONTENT_FONT_SIZE = 'chapter-content-font-size';
export function getFontSizeInStorage() {
    const size = window.localStorage.getItem(CHAPTER_CONTENT_FONT_SIZE);
    return size && parseInt(size);
}
export default {
    props: {
        novel_id: {
            type: String,
            required: true,
        },
        fontSize: {
            type: Number,
            default: 18,
            required: true,
        },
    },
    data() {
        return {
            isActiveMenu: false,
        };
    },
    methods: {
        fontBigger() {
            if (this.fontSize < 30) {
                this.fontSize += 1;
                window.localStorage.setItem(CHAPTER_CONTENT_FONT_SIZE, this.fontSize);
                this.$emit('on-font-size', this.fontSize);
            }
        },
        fontSmaller() {
            if (this.fontSize > 14) {
                this.fontSize = this.fontSize - 1;
                window.localStorage.setItem(CHAPTER_CONTENT_FONT_SIZE, this.fontSize);
            }
            this.$emit('on-font-size', this.fontSize);
        },
    },
};
</script>

<style lang="scss" scoped>
.page-read-tool {
    position: fixed;
    top: 50%;
    right: 0.2rem;
    width: 1rem;
    height: 1rem;
    margin-top: -0.5rem;
    z-index: 2;
    border-radius: 100%;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    color: #fff;
    background-color: #2196f3;
    text-align: center;
    line-height: 1rem;
    font-size: 18px;
    > i {
        display: inline-block;
        height: 1rem;
        width: 1rem;
    }
}
.page-read-tool-group {
    background-color: #2196f3;
    transition: all 0.4s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    z-index: -1;
}

.page-read-tool-btn {
    // background-color: #2196f3;
    color: #fff;
    font-size: 16px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    transition: all 0.4s ease-in;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    display: block;
    background-color: #2196f3;
    border-radius: 50%;
    position: absolute;
    z-index: -2;
    opacity: 0;
    &.btn-font-plus {
        opacity: 1;
        transform: translateY(-1.4rem);
        // &.is-active {
        //     transform: translateY(-1.4rem);
        // }
    }
    &.btn-font-minus {
        transform: translate(-1.4rem, -0.8rem);
        opacity: 1;
    }
    &.btn-list {
        transform: translate(-1.4rem, 0.8rem);
        opacity: 1;
    }
    &.btn-return {
        opacity: 1;
        transform: translateY(1.4rem);
    }
}
</style>
