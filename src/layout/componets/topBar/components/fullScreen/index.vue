<template>
    <div class="fullscreen">
        <el-button class="tools-btn"
                   :icon="`el-icon-${icon}`"
                   circle
                   @click="handleFullScreen"></el-button>
    </div>
</template>

<script>
import ScreenFull from 'screenfull';

export default {
    name: 'fullScreen',
    data() {
        return {
            status: false
        };
    },
    computed: {
        icon() {
            return this.status ? 'copy-document' : 'full-screen';
        }
    },
    mounted() {
        if (ScreenFull.isEnabled) {
            ScreenFull.on('change', this.statusToggle);
        }
    },
    methods: {
        handleFullScreen() {
            if (ScreenFull.isEnabled) {
                ScreenFull.toggle();
            }
        },
        statusToggle() {
            this.status = ScreenFull.isFullscreen;
        }
    },
    destroyed() {
        Screenfull.off('change', this.statusToggle);
    }
};
</script>

<style lang="less" scoped>
.tools-btn {
    margin-left: 16px;
    &:focus,
    &:hover {
        color: inherit;
        border-color: #dcdfe6;
        background-color: transparent;
    }
}
</style>