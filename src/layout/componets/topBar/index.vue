<template>
    <div class="top-bar-wrapper">
        <div class="top-bar">
            <el-button size="middle"
                       class="handle-collapse-btn"
                       :icon="handleCollapseIcon"
                       @click="toggleMenu"></el-button>
            <el-breadcrumb class="breadcrumb"
                           separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :key="item.path"
                                    v-for="item in matched.slice(1, matched.length)">{{item.meta.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="tools">
                <search />
                <fullScreen />
                <settings />
                <!-- 个人设置 -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import fullScreen from './components/fullScreen';
import search from './components/search';
import settings from './components/settings';

export default {
    name: 'topBar',
    components: {
        search,
        fullScreen,
        settings
    },
    computed: {
        ...mapGetters({
            menu: 'menu'
        }),
        handleCollapseIcon() {
            return this.menu.opened ? 'el-icon-s-unfold' : 'el-icon-s-fold';
        },
        matched() {
            return this.$route.matched;
        }
    },
    mounted() {},
    methods: {
        toggleMenu() {
            this.$store.dispatch('app/toggleMenu');
        }
    }
};
</script>

<style lang="less" scoped>
@import url('~common/styles/variables.less');
.top-bar-wrapper {
    background-color: @color-white;

    .top-bar {
        height: 60px;
        display: flex;
        align-items: center;
        color: @color-font;
        padding: 0;
        position: relative;

        .handle-collapse-btn {
            background-color: transparent;
            border: none;
            outline: none;
            font-size: 24px;

            &:focus,
            &:hover {
                color: inherit;
            }
        }

        .tools {
            position: absolute;
            right: 0;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }
    }
}
</style>
