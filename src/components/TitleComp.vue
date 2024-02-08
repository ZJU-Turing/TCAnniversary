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
    color: #6b65a6;
    font-size: 1.7rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 1rem;
    font-weight: 500;
}

.subtitle {
    color: #909399;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 3rem;
}

@media screen and (min-width: 650px) {
    .title {
        font-size: 2.2rem;
        font-weight: 400;
    }
}
</style>