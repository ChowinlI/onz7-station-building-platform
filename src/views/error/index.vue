<template>
  <div>
    <div class="big">
      <div class="inner">
        <img src="../../assets/notFound.png" />
        <p>页面被神秘力量吸走了，请联系我们修复</p>
        <!-- <p style="font-size:18px;line-height:40px;">常见问题为菜单未分配仪表盘，可自行分配仪表盘或修改默认路由</p>
        <p>↓</p>
        <img src="../../assets/qm.png" class="leftPic" />-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style lang="less">
.inner {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 10px auto;
  }
  p {
    text-align: center;
    font-size: 24px;
  }
}
</style>
