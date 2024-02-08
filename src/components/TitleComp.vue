<script setup>
const $ = defineProps({
    title: String,
    subtitle: String
});
</script>

<template>
    <div>
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
    </div>
</template>

<style scoped>
.title {
    color: #3C3578;
    font-size: 1.7rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: .5rem;
}

.subtitle {
    color: #909399;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 3rem;
}

@media screen and (min-width: 768px) {
    .title {
        font-size: 2.2rem;
    }
}
</style>