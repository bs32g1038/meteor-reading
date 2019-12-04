<template>
    <div class="page-read" v-if="!isInitLoading">
        <div class="page-read-top">
            <h1 class="book-chapter-title">{{ novel.name }}</h1>
            <span class="book-cur-chapter">{{curChapterRead.title}}</span>
        </div>
        <chapter-list
            class="book-content"
            ref="chapterContent"
            :style="{fontSize: this.fontSize + 'px'}"
            :finished="isFinished"
            :loading="isLoading"
            @load="onLoad"
            @on-scroll="showChapterRelativeInfo"
        >
            <section
                class="js-chapter"
                v-for="item in chapters"
                :data-id="item.id"
                :data-title="item.title"
                :key="item.id"
            >
                <h3 class="chapter-title">{{ item.title }}</h3>
                <div class="chapter-content" v-html="handleContent(item.content)"></div>
            </section>
        </chapter-list>
        <div class="baseline" v-if="isFinished">------当前章节是最后一章------</div>
        <page-tool
            :fontSize="fontSize"
            :novel_id="novel.id || '-1'"
            @on-font-size="fontSize => this.fontSize = fontSize"
        ></page-tool>
    </div>
    <div class="book-read-content-loading" v-else>
        <content-loader :height="500">
            <rect x="40" y="0" rx="3" ry="3" width="320" height="30" />
            <rect x="10" y="40" rx="3" ry="3" width="380" height="500" />
        </content-loader>
    </div>
</template>

<script>
import scroll from '@/components/utils/scroll';
import { mapState } from 'vuex';
import pageTool, { getFontSizeInStorage } from './page-tool';
import chapterList from './chapter-list';
import { ContentLoader } from '@/libs/vue-content-loader';

export default {
    components: {
        pageTool,
        chapterList,
        ContentLoader,
    },
    data() {
        return {
            isFinished: false,
            curChapterRead: {},
            fontSize: getFontSizeInStorage() || 18,
            isLoading: false,
            pos: [],
        };
    },
    asyncData({ store, route }) {
        if (!store.state.bookRead.isEnter) {
            store
                .dispatch('bookRead/fetchReadData', {
                    novelId: route.params.novelId,
                    chapterId: route.params.chapterId,
                })
                .then(_ => {
                    store.dispatch('bookRead/setIsEnterData');
                });
        }
    },
    mounted() {
        this.$store.dispatch('setLoading', true);
        return this.$store
            .dispatch('bookRead/fetchReadData', {
                novelId: this.$route.params.novelId,
                chapterId: this.$route.params.chapterId,
            })
            .then(() => {
                this.$store.dispatch('bookRead/setIsEnterData');
                this.$store.dispatch('setLoading', false);
                this.curChapterRead = this.$store.state.bookRead.chapter;
            });
    },
    destroyed() {
        this.$store.dispatch('bookRead/initData');
    },
    computed: {
        ...mapState('bookRead', {
            novel: state => state.novel,
            chapters: state => state.chapters,
            preChapter: state => state.preChapter,
            nextChapter: state => state.nextChapter,
        }),
        isInitLoading() {
            return this.$store.state.isLoading;
        },
    },
    methods: {
        handleContent(str = '') {
            const arr = str.split('<br>');
            const tempArr = [];
            for (const item of arr) {
                const content = item.trim();
                if (content !== '<br>' && content !== '') {
                    tempArr.push('<p>', content, '</p>');
                }
            }
            return tempArr.join('');
        },
        onLoad() {
            if (this.isFinished) {
                return;
            }
            if (!this.isLoading) {
                this.isLoading = true;
                const arr = this.chapters.filter(item => {
                    // 一个id为字符串，一个为整型
                    return this.curChapterRead.id === item.id;
                });
                if (arr.length >= 1) {
                    if (this.nextChapter && this.nextChapter.id) {
                        return this.$store
                            .dispatch('bookRead/fetchReadData', {
                                novelId: this.$route.params.novelId,
                                chapterId: this.nextChapter.id,
                            })
                            .then(() => {
                                this.isLoading = false;
                                this.$nextTick(_ => {
                                    this.saveChapterPostions();
                                });
                            })
                            .catch(_ => {
                                this.isLoading = false;
                            });
                    }
                    this.isFinished = true;
                }
                this.isLoading = false;
            }
        },
        saveChapterPostions() {
            this.pos = [];
            const arr = document.querySelectorAll('.js-chapter');
            for (let item of Array.from(arr)) {
                const p = scroll.getElementTop(item);
                this.pos.push({
                    id: item.getAttribute('data-id'),
                    title: item.getAttribute('data-title'),
                    top: p,
                });
            }
        },
        showChapterRelativeInfo(scrollTop) {
            let tmp = null;
            this.pos.map(item => {
                item.top <= scrollTop && (tmp = item);
            });
            if (tmp && tmp.id !== this.$route.params.chapterId) {
                this.curChapterRead = tmp;
                return this.$router.replace({
                    name: 'book-read',
                    params: { chapterId: tmp.id },
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.page-read-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 44px;
    background: #fff;
    width: 7.5rem;
    margin: auto;
}

.page-read {
    background: #fff;
    background-size: contain;
}

.book-chapter-title {
    margin-left: 0.1rem;
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    top: 8px;
    left: 0.4rem;
    color: #555;
}

.book-cur-chapter {
    float: right;
    font-size: 12px;
    margin-top: 15px;
    margin-right: 15px;
    color: #555;
    max-width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.book-content {
    padding-top: 44px;
    font-size: 16px;
}

.chapter-title {
    padding: 0 0.32rem;
    font-size: 22px;
    color: #403a32;
    text-align: center;
    line-height: 1.2;
    margin: 0.4em 0;
}

.chapter-content {
    padding: 0 0.32rem;
    text-align: justify;
    text-indent: 1.6em;
    padding-top: 0.2rem;
    /deep/ p {
        margin: 0.04rem 0 0;
        line-height: 1.8;
        color: #2f2f2f;
    }
}

.baseline {
    text-align: center;
    padding: 0.4rem 0;
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
}
</style>
