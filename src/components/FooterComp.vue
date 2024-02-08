<script setup>
const $ = defineProps({ updated: String });
const nowYear = new Date().getFullYear();
</script>

<template>
    <div class="wrapper">
        <div class="upd">排行榜最后更新于 {{ updated }}</div>
        Developed by <a href="https://xecades.xyz/">Xecades</a> &copy; {{ nowYear }}
    </div>
</template>

<style scoped>
.wrapper {
    font-size: 1rem;
    text-align: center;
    color: #A8ABB2;
    margin-top: 3rem;
    margin-bottom: 2.5rem;
}

.wrapper a {
    text-decoration: none;
    color: #857ebd;
}

.upd {
    font-size: .9rem;
    margin-bottom: 5px;
}
</style>