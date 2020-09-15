<template>
    <div class="search">
        <transition name="el-fade-in-linear">
            <div class="transition-box"
                 v-show="show">
                <el-select @blur="handleShowSearch"
                           @change="changeRouter"
                           filterable
                           placeholder="搜索..."
                           v-model="value"
                           ref="searchInput">
                    <el-option :key="item.value"
                               :label="item.label"
                               :value="item.value"
                               v-for="item in routerList"></el-option>
                </el-select>
            </div>
        </transition>
        <el-button class="tools-btn"
                   :icon="`el-icon-search`"
                   circle
                   @click="handleShowSearch"></el-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'search',
    data() {
        return {
            show: false,
            value: ''
        };
    },
    computed: {
        ...mapGetters({
            routerList: 'router/routerList'
        })
    },
    methods: {
        changeRouter() {
            this.$router.push({ name: this.value });
            this.value = '';
        },
        handleShowSearch() {
            this.show = !this.show;
            this.show && this.$refs.searchInput.focus();
        }
    }
};
</script>

<style lang="less" scoped>
.search {
    display: flex;
    align-items: center;
    margin-left: 16px;

    /deep/ .el-input__inner {
        border: none;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .tools-btn {
        &:focus,
        &:hover {
            color: inherit;
            border-color: #dcdfe6;
            background-color: transparent;
        }
    }
}
</style>