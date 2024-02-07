<script setup>
import { ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";

const $ = defineProps({ data: Object, rank: Number });

const showComp = ref(false);
const typeFn = (type) => {
    switch (type) {
        case "remark": return "课程评价";
        case "pr": return "PR";
        case "issue": return "Issue";
        case "comment": return "评论";
    }
};

const more = () => { showComp.value = !showComp.value; };
</script>

<template>
    <el-card shadow="hover" class="card">
        <span class="rank">{{ rank }}</span>
        <el-text class="name" size="large">{{ data.name }}</el-text>
        <el-text class="right">
            <span class="score">{{ data.score.toFixed(1) }} 分</span>
            <el-button text circle :icon="ArrowRight" @click="more" class="icon" :style="`rotate: ${90 * showComp}deg;`" />
        </el-text>
        <el-collapse-transition>
            <div v-if="showComp" class="detail">
                <el-table class="table" :data="data.composition" :show-header="false">
                    <el-table-column align="center">
                        <template #default="{ row }">
                            {{ typeFn(row.type) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center">
                        <template #default="{ row }">
                            {{ row.score.toFixed(1) }} 分
                        </template>
                    </el-table-column>
                    <el-table-column align="center">
                        <template #default="{ row }">
                            <el-link :href="row.link" type="primary" target="_blank">详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-collapse-transition>
    </el-card>
</template>

<style scoped>
.card {
    margin-bottom: 1.2rem;
    position: relative;
}

.rank {
    font-weight: 800;
    font-size: 90px;
    font-style: italic;
    height: 90px;
    position: absolute;
    color: #f7f7f7;
    left: 2px;
    top: -10px;
    font-family: Arial, Helvetica, sans-serif;
}

.name {
    display: block;
    text-align: center;
    position: relative;
}


.right {
    position: absolute;
    right: 20px;
    height: 32px;
    line-height: 32px;
    top: calc((62.5px - 32px) / 2);
    color: #9c9fa6;
}

.score {
    margin-right: 5px;
}

.icon {
    transition: rotate .2s;
}

.detail {
    position: relative;
}

.table {
    width: 100%;
    margin-top: 15px;
    background-color: transparent;
}
</style>

<style>
.table tr {
    background-color: transparent;
}
</style>