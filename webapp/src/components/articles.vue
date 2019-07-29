<template>
    <ul class="Articles">
        <li class="Articles-item" key="{item.id}">
            <div class="Articles-itemHeader">
                <div class="Articles-itemBrief">
                    <div class="Articles-itemMeta">
                        <strong>TIME</strong>
                        <em>·</em>
                        {parseTime(item.createdAt)}
                    </div>
                    <router-link
                        class="Articles-itemTitle"
                        to="'/blog/articles/'item.id"
                    >{item.title}</router-link>
                    <div class="Articles-itemMeta">
                        <a href="javascript:;">评论：{item.commentCount}</a>
                        <em>·</em>
                        <a href="javascript:;">阅读：{item.viewsCount}</a>
                        <em>·</em>
                        <span>分类：{(item.category && item.category.name) || '暂无分类'}</span>
                    </div>
                </div>
                <div class="Articles-itemThumb">
                    <a class="Articles-itemThumbA" style="backgroundImage: url(${item.screenshot})"></a>
                </div>
            </div>
            <p class="Articles-itemSummary">{item.summary}</p>
        </li>
    </ul>
</template>
