<template>
    <div class="support-wrapper">
        <div class="support-main">
            <div class="left">
                <div class="title">
                    星点阅读
                    <span class="des">学术研究</span>
                </div>
                <p class="features">
                    <span>网上收集</span>
                    <span>自动更新</span>
                    <span>请勿用于商业用途</span>
                </p>
            </div>
            <a class="right" href="#">
                <svg
                    height="20"
                    class="octicon octicon-mark-github"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="20"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                    ></path>
                </svg>
                <p>支持作者</p>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.support-wrapper {
    width: 100%;
    position: relative;
    padding: 8px 0 8px;
    background-color: #f6f7f9;
}

.support-main {
    width: 90%;
    margin: 0 auto;
    display: flex;
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 1000;
    position: relative;
    .left {
        flex: 1 0 auto;
    }
    .title {
        font-size: 20px;
        line-height: 1;
        color: #8a54ed;
        .des {
            font-size: 16px;
        }
    }
    .features {
        font-size: 12px;
        margin: 12px 0 0 0;
        color: #999;
    }
    .right {
        text-align: center;
        color: #999;
        svg {
            fill: #8a54ed;
        }
        p {
            margin: 10px 0 0 0;
            font-size: 12px;
        }
    }
}
</style>
