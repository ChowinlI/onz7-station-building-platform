<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <v-menu></v-menu>
    </el-aside>
    <el-container class="content">
      <el-header class="content-header" height="60px">
        <v-top-bar></v-top-bar>
      </el-header>
      <el-main class="content-main"> </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./componets/menu";
import topBar from "./componets/topBar";

export default {
  name: "layout",
  components: {
    "v-menu": Menu,
    "v-top-bar": topBar,
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;

  .aside {
    background-color: #001529;
    overflow: hidden;
  }

  .content {
    &-header {
      background-color: #ffffff;
    }
    &-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
  }
}
</style>
