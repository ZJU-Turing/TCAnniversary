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
    <el-card shadow="hover" class="card" :rank="rank">
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
                            {{ row.score.toFixed(2) }} 分
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
    color: #f5f4ff;
    user-select: none;
    left: 2px;
    top: -10px;
    font-family: Arial, Helvetica, sans-serif;
}

.name {
    display: block;
    text-align: center;
    position: relative;
    color: #8f89d8;
}

.right {
    position: absolute;
    right: 20px;
    height: 32px;
    line-height: 32px;
    top: calc((62.5px - 32px) / 2);
    --el-text-color-regular: #b9b3ff;
}

.score {
    margin-right: 2px;
    vertical-align: middle;
}

.icon {
    transition: rotate .2s;
}

.detail {
    position: relative;
}

.table {
    width: 100%;
    padding-top: 15px;
    background-color: transparent;
}

.card[rank="1"] {
    background: linear-gradient(160deg, #fff8c3 0%, transparent 80%);
    border-color: #ffe87f;
    --el-color-primary: #fad209;
    --el-color-primary-light-3: #ffe056;
}

.card[rank="1"]:hover {
    box-shadow: 0 0 12px #fdeb9acc;
}

.card[rank="1"] .right {
    --el-text-color-regular: #f5cd1a;
}

.card[rank="1"] .rank {
    color: #ffe87f;
}

.card[rank="1"] .name {
    color: #ffc004;
}

.card[rank="2"] {
    background: linear-gradient(160deg, #f3f3f3 0%, transparent 80%);
    border-color: #d6d6d6;
    --el-color-primary: #9e9e9e;
    --el-color-primary-light-3: #c4c4c4;
}

.card[rank="2"]:hover {
    box-shadow: 0 0 12px #e8e8e8cc;
}

.card[rank="2"] .right {
    --el-text-color-regular: #b5b5b5;
}

.card[rank="2"] .rank {
    color: #d6d6d6;
}

.card[rank="2"] .name {
    color: #969696;
}

.card[rank="3"] {
    background: linear-gradient(160deg, #ffecda 0%, transparent 70%);
    border-color: #ffc9b9;
    --el-color-primary: #ff865f;
    --el-color-primary-light-3: #ffa98c;
}

.card[rank="3"]:hover {
    box-shadow: 0 0 12px #ffdacecc;
}

.card[rank="3"] .right {
    --el-text-color-regular: #ffa98c;
}

.card[rank="3"] .rank {
    color: #ffc9b9;
}

.card[rank="3"] .name {
    color: #ff8159;
}
</style>

<style>
.table tr {
    background-color: transparent;
}

.el-table__inner-wrapper::before {
    background-color: transparent;
}

.el-table__row:last-child td.el-table__cell {
    border-bottom: 1px solid transparent;
}

.el-table__row:hover>td.el-table__cell {
    background-color: #e9e6ff4d !important;
}

.card[rank="1"] .el-table__row:hover>td.el-table__cell {
    background-color: #ffee7852 !important;
}

.card[rank="2"] .el-table__row:hover>td.el-table__cell {
    background-color: #d9d9d952 !important;
}

.card[rank="3"] .el-table__row:hover>td.el-table__cell {
    background-color: #ffc7b452 !important;
}
</style>