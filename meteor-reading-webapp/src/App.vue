<template>
    <div id="app" class="app">
        <router-view />
        <app-footer></app-footer>
    </div>
</template>

<script>
import AppFooter from '@/components/app-footer';
export default {
    components: {
        AppFooter,
    },
};
</script>
