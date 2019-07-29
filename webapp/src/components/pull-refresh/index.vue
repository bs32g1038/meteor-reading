<template>
    <div class="rd-pull-fresh">
        <div
            class="rd-pull-fresh-track"
            :style="style"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        >
            <div class="rpf-track-head">
                <slot v-if="status === 'normal'" name="normal"/>
                <slot v-if="status === 'pulling'" name="pulling">
                    <loading/>
                    <span class="rpf-track-head-text">{{ pullingText }}</span>
                </slot>
                <slot v-if="status === 'loosing'" name="loosing">
                    <span class="rpf-track-head-text">{{ loosingText }}</span>
                </slot>
                <slot v-if="status === 'loading'" name="loading">
                    <div class="rpf-track-head-loading">
                        <loading/>
                        <span>{{ loadingText }}</span>
                    </div>
                </slot>
            </div>
            <slot/>
        </div>
    </div>
</template>

<script>
// import create from '../utils/create';
import scrollUtils from '../utils/scroll';
import Touch from '../mixins/touch';
import Loading from '../loading';

export default {
    name: 'pull-refresh',
    mixins: [Touch],
    props: {
        disabled: Boolean,
        pullingText: String,
        loosingText: String,
        loadingText: String,
        value: {
            type: Boolean,
            required: true
        },
        animationDuration: {
            type: Number,
            default: 300
        },
        headHeight: {
            type: Number,
            default: 50
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            status: 'normal',
            height: 0,
            duration: 0
        };
    },
    computed: {
        style() {
            return {
                transition: `${this.duration}ms`,
                transform: `translate3d(0,${this.height}px, 0)`
            };
        },
        untouchable() {
            return this.status === 'loading' || this.disabled;
        }
    },
    mounted() {
        this.scrollEl = scrollUtils.getScrollEventTarget(this.$el);
    },
    watch: {
        value(val) {
            this.duration = this.animationDuration;
            this.getStatus(val ? this.headHeight : 0, val);
        }
    },
    methods: {
        onTouchStart(event) {
            if (this.untouchable) {
                return;
            }
            if (this.getCeiling()) {
                this.duration = 0;
                this.touchStart(event);
            }
        },
        onTouchMove(event) {
            if (this.untouchable) {
                return;
            }
            this.touchMove(event);
            if (!this.ceiling && this.getCeiling()) {
                this.duration = 0;
                this.startY = event.touches[0].clientY;
                this.deltaY = 0;
            }
            if (this.ceiling && this.deltaY >= 0) {
                if (this.direction === 'vertical') {
                    this.getStatus(this.ease(this.deltaY));
                    event.cancelable && event.preventDefault();
                }
            }
        },
        onTouchEnd() {
            if (this.untouchable) {
                return;
            }
            if (this.ceiling && this.deltaY) {
                this.duration = this.animationDuration;
                if (this.status === 'pulling') {
                    this.getStatus(this.headHeight, true);
                    this.$emit('input', true);
                    this.$emit('refresh');
                } else {
                    this.getStatus(0);
                }
            }
        },
        getCeiling() {
            this.ceiling = scrollUtils.getScrollTop(this.scrollEl) === 0;
            return this.ceiling;
        },
        ease(height) {
            const { headHeight } = this;
            return height < headHeight
                ? height
                : height < headHeight * 2
                    ? Math.round(headHeight + (height - headHeight) / 2)
                    : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
        },
        getStatus(height, isLoading) {
            this.height = height;
            const status = isLoading
                ? 'loading'
                : height === 0
                    ? 'normal'
                    : height > this.headHeight
                        ? 'pulling'
                        : 'loosing';
            if (status !== this.status) {
                this.status = status;
            }
        }
    }
};
</script>

<style lang="scss">
@import './index.scss';
</style>
