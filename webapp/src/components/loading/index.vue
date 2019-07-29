<template>
    <div class="rd-loading" :style="style">
        <span
            class="rd-loading-dot"
            v-for="(item, index) in dotNum"
            :key="index"
            :style="dotTransform(index, dotNum)"
        >
            <i :style="dotAimation(index, dotNum)"></i>
        </span>
    </div>
</template>

<script>
const DEFAULT_COLOR = '#c9c9c9';
export default {
    name: 'loading',
    props: {
        size: {
            type: Number,
            default: 30
        },
        color: {
            type: String,
            default: DEFAULT_COLOR
        },
        dotNum: {
            type: Number,
            default: parseInt(30 / 3)
        }
    },
    data() {
        return {
            loadingRadiusVal: 20
        };
    },
    methods: {
        dotTransform(index, dotNums) {
            let rad = ((2 * Math.PI) / dotNums) * index;
            let dotX = (Math.cos(rad) * this.loadingRadiusVal) / 2;
            let dotY = (Math.sin(rad) * this.loadingRadiusVal) / 2;
            return { transform: `translate(${dotX}px,${dotY}px)` };
        },
        dotAimation(index, dotNums) {
            let delayTime = `${-1 * (1 + ((index + 1) * 1) / dotNums)}s`;
            return { animationDelay: delayTime };
        }
    },
    computed: {
        style() {
            return (
                this.size && {
                    width: this.size + 'px',
                    height: this.size + 'px'
                }
            );
        }
    }
};
</script>

<style lang="scss">
@keyframes ball-spin {
    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }
    20% {
        opacity: 1;
    }
    80% {
        opacity: 0;
        transform: scale(0);
    }
}

.rd-loading {
    width: 30px;
    height: 30px;
    z-index: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    vertical-align: middle;
    font-size: 0;
}

.rd-loading-dot {
    width: 6px;
    height: 6px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    i {
        width: 6px;
        height: 6px;
        animation: ball-spin 1s infinite ease-in-out;
        display: block;
        border-radius: 100%;
        background-color: red;
    }
}
</style>
