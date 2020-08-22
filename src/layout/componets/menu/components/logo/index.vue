<template>
  <div class="nemu-logo-container" :class="{ collapse: collapse }">
    <transition name="nemuLogoFade">
      <router-link v-if="collapse" key="collapse" class="nemu-logo-link" to="/">
        <img v-if="logo" :src="logo" class="nemu-logo" />
        <h1 v-else class="nemu-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="nemu-logo-link" to="/">
        <img v-if="logo" :src="logo" class="nemu-logo" />
        <h1 class="nemu-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'nemuLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'onz7建站平台',
      logo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="less" scoped>
.nemuLogoFade-enter-active {
  transition: opacity 1.5s;
}

.nemuLogoFade-enter,
.nemuLogoFade-leave-to {
  opacity: 0;
}

.nemu-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #001529;
  text-align: center;
  overflow: hidden;

  & .nemu-logo-link {
    height: 100%;
    width: 100%;

    & .nemu-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .nemu-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .nemu-logo {
      margin-right: 0px;
    }
  }
}
</style>
