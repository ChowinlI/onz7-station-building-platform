<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <v-menu></v-menu>
    </el-aside>
    <el-container class="content">
      <el-header class="content-header" height="auto">
        <v-top-bar></v-top-bar>
      </el-header>
      <history></history>
      <el-scrollbar>
        <el-main class="content-main">
          <transition mode="out-in" name="el-fade-in-linear">
            <keep-alive>
              <router-view class="view-container" v-if="$route.meta.keepAlive" />
            </keep-alive>
          </transition>
          <transition mode="out-in" name="el-fade-in-linear">
            <router-view class="view-container" v-if="!$route.meta.keepAlive" />
          </transition>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './componets/menu'
import TopBar from './componets/topBar'
import History from './componets/history'

export default {
  name: 'layout',
  components: {
    'v-menu': Menu,
    'v-top-bar': TopBar,
    History
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .aside {
    background-color: #001529;
    overflow: hidden;
  }

  .content {
    overflow: hidden;
    &-header {
      background-color: #ffffff;
      padding: 0;
    }
    .el-scrollbar {
      height: calc(100vh - 114px);

      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;

        /deep/ .el-scrollbar__view {
          height: 100%;
        }
      }
    }
    &-main {
      background-color: #f9f9f9;
      color: #333;
      padding: 20px;
      min-height: 100%;
      box-sizing: border-box;

      .view-container {
        margin: 0;
        height: 100%;
      }
    }
  }
}
</style>
