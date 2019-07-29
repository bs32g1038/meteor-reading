<template>
    <header class="header header-search">
        <div class="logo">星点阅读
            <!-- <img src="/public/images/logo.png" alt=""> -->
        </div>
        <div class="search-wrapper">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 36 37">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-280.000000, -70.000000)" fill="#CBCBCB">
                        <g transform="translate(262.000000, 58.000000)">
                            <g>
                                <path
                                    d="M53.1182975,43.7396033 L44.507405,34.9024959 C44.407686,34.8000496 44.2959174,34.722595 44.1907438,34.6375537 C45.7008099,32.2587273 46.5,29.4981322 46.4941983,26.6804132 C46.4941983,18.6068926 40.1184298,12.0631736 32.2470744,12.0631736 C24.3804298,12.0631736 18,18.6068926 18,26.6794215 C18,34.7539339 24.3812231,41.2959174 32.2480661,41.2959174 C35.1109091,41.2959174 37.7725289,40.4225455 40.008595,38.929686 C40.0897686,39.0405124 40.1654876,39.1503471 40.2633223,39.2537355 L48.8760992,48.0906446 C49.4632066,48.691686 50.2294711,48.9917355 50.9967273,48.9917355 C51.7637355,48.9917355 52.53,48.691686 53.1173058,48.0906446 C54.2878512,46.876562 54.2881983,44.9540826 53.1182975,43.7396033 Z M32.2470744,36.679686 C26.8729587,36.679686 22.4988595,32.1938182 22.4988595,26.6794215 C22.4988595,21.1669587 26.8729587,16.6784132 32.2470744,16.6784132 C37.6200992,16.6784132 41.9953388,21.1669587 41.9953388,26.6794215 C41.9953388,32.1938182 37.6210413,36.679686 32.2470744,36.679686 Z"
                                ></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <div class="search-input">
                <input
                    type="text"
                    class="search-input-field"
                    name="key"
                    placeholder="请输入书名/作者名/主角名"
                    id="search"
                >
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    height: 0.88rem;
    line-height: 0.88rem;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .logo {
        font-size: 16px;
        color: #ff0036;
        text-align: center;
        margin-left: 0.4rem;
        font-weight: bold;
    }
}

.header-search {
    .search-wrapper {
        background-color: #f5f5f5;
        display: flex;
        border-radius: 15px;
        align-items: center;
        height: 26px;
        box-sizing: border-box;
        flex: 1 0 auto;
        padding-left: 0.1rem;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }
    .search-icon {
        fill: #999;
    }
    .search-input {
        flex: 1 0 auto;
    }
    .search-input-field {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        margin-left: 8px;
        color: #70707d;
        font-family: PingFang SC;
        height: auto;
        line-height: auto;
        &:-webkit-input-placeholder {
            color: #999;
            font-size: 14px;
        }
        &:-moz-placeholder {
            color: #999;
            font-size: 14px;
        }
        &:-ms-input-placeholder {
            color: #999;
            font-size: 14px;
        }
    }
}

.header-back {
    .a-back {
        padding-left: 0.2rem;
        display: flex;
        align-items: center;
        > svg {
            vertical-align: middle;
            fill: #403a32;
        }
        &.read {
            flex: 1 0 auto;
        }
    }
    .back-title {
        font-size: 14px;
        color: #403a32;
        vertical-align: middle;
        margin-left: 4px;
        line-height: 1;
    }
    .center-title {
        font-size: 16px;
        flex: 1 0 auto;
        text-align: center;
    }
    .home-btn {
        padding: 0 0.2rem;
        display: block;
        flex: 0 0 auto;
        > img {
            width: 20px;
        }
    }
    .book-chapter-title {
        font-size: 14px;
        color: #403a32;
        vertical-align: middle;
        margin-left: -4px;
    }
    .add-bookshelf {
        color: #403a32;
        font-size: 14px;
        position: relative;
        padding: 0 0.24rem;
        line-height: 0.48rem;
        height: 0.48rem;
        color: #ed424b;
        margin-right: 0.5rem;
        display: block;
        &:after {
            content: " ";
            display: block;
            width: 200%;
            height: 200%;
            border: 1px solid #ed424b;
            transform: scale(0.5);
            transform-origin: 0 0;
            border-radius: 24px;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
}
</style>
