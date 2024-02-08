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
    color: #f2f1f9;
    user-select: none;
    left: 2px;
    top: -10px;
    font-family: Arial, Helvetica, sans-serif;
}

.name {
    display: block;
    text-align: center;
    position: relative;
    color: #777a81;
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
    background: linear-gradient(160deg, #fffce6 0%, transparent 80%);
    border-color: #ffed9c;
    --el-color-primary: #ffd518;
    --el-color-primary-light-3: #fee98b;
}

.card[rank="1"]:hover {
    box-shadow: 0 0 12px #feeb91cc;
}

.card[rank="1"] .rank {
    color: #ffed9f;
}

.card[rank="1"] .name {
    color: #fcce06;
}

.card[rank="2"] {
    background: linear-gradient(160deg, #f5f5f5 0%, transparent 80%);
    border-color: #dedede;
    --el-color-primary: #b9b9b9;
    --el-color-primary-light-3: #d8d8d8;
}

.card[rank="2"]:hover {
    box-shadow: 0 0 12px #e8e8e8cc;
}

.card[rank="2"] .rank {
    color: #e8e8e8;
}

.card[rank="2"] .name {
    color: #adadad;
}

.card[rank="3"] {
    background: linear-gradient(160deg, #fff4e9 0%, transparent 70%);
    border-color: #ffdfd5;
    --el-color-primary: #ff9a7a;
    --el-color-primary-light-3: #ffcab8;
}

.card[rank="3"]:hover {
    box-shadow: 0 0 12px #ffdacecc;
}

.card[rank="3"] .rank {
    color: #ffdace;
}

.card[rank="3"] .name {
    color: #ff9a7a;
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