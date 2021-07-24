<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <cart-list></cart-list>
    <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/navBar'
  import CartList from './childComponent/cartList.vue'
  import CartBottomBar from './childComponent/cartBottomBar.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      // 将getters转为计算属性的两种写法

      // ...mapGetters(['cartLength','cartlist'])
      ...mapGetters({
        length: 'CartLength',
        // list: 'CartList',
      }),
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart-nav {
    background-color: orangered;
    font-weight: 700;
  }
  .bottom-bar {
    height: 40px;
    /* position: relative; */
    bottom: 0;
  }
</style>