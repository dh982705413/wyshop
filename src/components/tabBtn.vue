<template>
  <div>
    <van-tabbar v-model="active"
                :placeholder="true"
                active-color="#c0392b"
                route>
      <van-tabbar-item name="home"
                       icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item name="medal"
                       icon="medal-o"
                       to="/medel">专题</van-tabbar-item>
      <van-tabbar-item name="category"
                       icon="apps-o"
                       to="/category">分类</van-tabbar-item>
      <van-tabbar-item name="cart"
                       icon="shopping-cart-o"
                       to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item name="setting"
                       icon="user-o"
                       to="/setting">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'home'
    }
  },
  watch: {
    $route: function () {
      switch (this.$route.path) {
        case '/category':
          this.active = 'category'
          break
        case '/':
          this.active = 'home'
          break
        case '/medal':
          this.active = '/medal'
          break
        case '/cart':
          this.active = '/cart'
          break
        case '/setting':
          this.active = '/setting'
          break
      }
    }
  }
}
</script>

<style>
</style>
