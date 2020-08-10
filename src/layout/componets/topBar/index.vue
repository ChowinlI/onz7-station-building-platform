<template>
  <div class="top-bar">
    <el-button
      size="middle"
      class="handle-collapse-btn"
      :icon="handleCollapseIcon"
      @click="toggleMenu"
    ></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "top-bar",
  computed: {
    ...mapGetters(["menu"]),
    handleCollapseIcon() {
      return this.menu.opened ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
  },
  mounted() {
    console.log(this);
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("app/toggleMenu");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~common/styles/variables.less");
.top-bar {
  height: 60px;
  display: flex;
  align-items: center;
  color: @color-font;

  .handle-collapse-btn {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 24px;
  }
}
</style>
