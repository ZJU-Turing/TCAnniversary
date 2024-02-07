<script setup>
import FooterComp from "@/components/FooterComp.vue";
import ItemComp from "@/components/ItemComp.vue";
import TitleComp from "@/components/TitleComp.vue";

import lc from "@/assets/js/leancloud";
import { onMounted, reactive, ref } from "vue";

const data = reactive([]);
const loading = ref(false);
const updTime = ref("");

const scoreFn = d => d.composition.reduce((acc, cur) => acc + cur.score, 0);

const formatDate = d => {
    d = new Date(d);
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 ${d.getHours()}:${d.getMinutes()}`;
};

const getData = async () => {
    loading.value = true;

    let ss = await lc.getAllData("Score");
    let alias = await lc.getAllData("Alias");

    updTime.value = formatDate(ss[0].updatedAt);

    for (let i = 0; i < ss.length; i++) {
        let s = ss[i];
        let al = alias.find(a => a.key == s.name);
        if (al) s.name = al.value;
        let fnd = data.find(d => d.name == s.name);
        let rec = { type: s.type, score: s.score, link: s.link };
        if (fnd) fnd.composition.push(rec);
        else data.push({ name: s.name, composition: [rec] });
    }
    data.forEach(d => d.score = scoreFn(d));
    data.forEach(d => d.composition.sort((a, b) => b.score - a.score));
    data.sort((a, b) => b.score - a.score);

    loading.value = false;
};

onMounted(async () => {
    await getData();
});
</script>

<template>
    <TitleComp title="TuringCourses 周年排行榜" subtitle="浙江大学图灵班" v-loading.fullscreen.lock="loading" />
    <div class="items">
        <ItemComp v-for="(d, r) in data" :data="d" :rank="r + 1" />
    </div>
    <FooterComp :updated="updTime" />
</template>

<style scoped>
.items {
    margin: 0 auto;
    padding: 0 10px;
}
</style>