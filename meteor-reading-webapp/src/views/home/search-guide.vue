<template>
    <router-link class="search-guide" :to="`/search?kw=${kw}`">
        <svg id="icon-find" viewBox="0 0 16 16">
            <path
                d="M14.423 15.13a.5.5 0 0 0 .707-.707l-4.128-4.128c-.196-.196-.158.2-.353.395-.195.196-.55.116-.354.312l4.128 4.128zm-1.548-8.255a6 6 0 1 0-12 0 6 6 0 0 0 12 0zm-11 0a5 5 0 1 1 10 0 5 5 0 0 1-10 0z"
            ></path>
        </svg>
        {{ kw }}
    </router-link>
</template>
<script>
export default {
    props: {
        kw: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.search-guide {
    font-size: 13px;
    line-height: 0.64rem;
    display: block;
    text-align: center;
    color: #969ba3;
    border-radius: 4px;
    background-color: #fff;
    margin: 6px 12px;
}
svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: -0.25ex;
}
</style>
