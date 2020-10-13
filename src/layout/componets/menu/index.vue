<template>
  <div class="menu-wrapper">
    <logo :collapse="menu.opened"></logo>
    <el-scrollbar>
      <transition :duration="{ enter: 800, leave: 100 }"
                  mode="out-in"
                  name="el-fade-in-linear">
        <el-menu :default-active="active"
                 :collapse="menu.opened"
                 :collapse-transition="true"
                 @select="selectMenuItem"
                 class="sidebar-menu"
                 text-color="rgb(191, 203, 217)"
                 active-text-color="#fff"
                 unique-opened>
          <template v-for="item in asyncRouters[0].children">
            <menuListItem :key="item.name"
                          :routerInfo="item"
                          v-if="!item.hidden" />
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import variables from 'common/styles/variables.less';
import logo from './components/logo';
import menuListItem from './components/menuListItem';
export default {
  name: 'v-menu',
  components: {
    logo,
    menuListItem
  },
  data() {
    return {
      variables: { ...variables },
      active: 'dashboard'
    };
  },
  computed: {
    ...mapGetters({
      menu: 'menu',
      asyncRouters: 'router/asyncRouters'
    })
  },
  created() {
    this.active = this.$route.name;
  },
  mounted() {},
  methods: {
    selectMenuItem(index) {
      // 如果当前路由为点击的菜单，则不做处理
      if (index === this.$route.name) return;
      this.$router.push({ name: index });
    }
  },
  watch: {
    $route() {
      this.active = this.$route.name;
    }
  }
};
</script>

<style lang="less" scoped>
.menu-wrapper {
  .el-scrollbar {
    height: calc(100vh - 60px);

    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;

      /deep/ .el-scrollbar__view {
        height: 100%;
        .sidebar-menu {
          background-color: #001529;
        }
        .el-menu-item:hover {
          background-color: #001529;
        }
        .el-menu-item:hover i,
        .el-menu-item:hover span {
          color: #fff;
        }
        li {
          background-color: #001529;
          ul {
            .el-menu-item {
              background-color: #000408;
              height: 44px;
              line-height: 44px;

              &:hover {
                background-color: #000408;
              }
            }
            .is-active {
              background-color: #1890ff;
            }
          }
        }
        .el-submenu__title:hover {
          background-color: #001529;
        }
        .el-submenu__title:hover i,
        .el-submenu__title:hover span {
          color: #fff;
        }
        .el-menu--inline {
          border-left: 5px solid #2c3b41;
        }
      }
    }
  }
}
.sidebar-menu {
  border-right: transparent;
  background-color: #001529;

  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
