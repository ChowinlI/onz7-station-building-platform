<template>
  <div class="menu-wrapper">
    <logo :collapse="menu.opened"></logo>
    <transition :duration="{ enter: 800, leave: 100 }" mode="out-in" name="el-fade-in-linear">
      <el-menu
        default-active="active"
        class="sidebar-menu"
        :background-color="variables.dark"
        :text-color="variables.white"
        :active-text-color="variables.primaryColor"
        :collapse="menu.opened"
      >
        <template v-for="item in asyncRouters[0].children">
          <menuListItem :key="item.name" :routerInfo="item" v-if="!item.hidden" />
        </template>
      </el-menu>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from 'common/styles/variables.less'
import logo from './components/logo'
import menuListItem from './components/menuListItem'
export default {
  name: 'v-menu',
  components: {
    logo,
    menuListItem
  },
  data() {
    return {
      variables: { ...variables }
    }
  },
  computed: {
    ...mapGetters({
      menu: 'menu',
      asyncRouters: 'router/asyncRouters'
    })
  },
  created() {
    this.active = this.$route.name
  },
  mounted() {
    console.log(this)
  },
  watch: {
    $$route() {
      this.active = this.$route.name
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-menu {
  border-right: transparent;

  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
