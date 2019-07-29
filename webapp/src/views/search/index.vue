<template>
    <div class="novel-entries" id="novel-entries">
        <a href="/book/detail/{{ item.id }}" class="novel-list-item">
            <div class="novel-list-item-thumb">
                <img class="lozad" data-src="/public/novel-images/{{ item.pic }}" alt>
            </div>
            <div class="novel-list-item-content">
                <h2 class="novel-name">{{ item.novel_name }}</h2>
                <p class="novel-info">
                    <span>{{ TagName[item.tag_id]}}</span>
                    <span class="author">{{ item.author }}</span>
                </p>
                <p class="novel-des">{{ item.summary }}</p>
                <p class="novel-item-tags">
                    <span class="tag-small red">{{ item.status == 0 ? '完结' : '连载中'}}</span>
                    <span class="tag-small blue">{{ item.sum_words / 10000 }}万字</span>
                </p>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>
