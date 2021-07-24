<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in CartList"
        :product="item"
        :key="index"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/scroll'
  import CartListItem from './cartListItem.vue'

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem,
    },
    computed: {
      ...mapGetters(['CartList']),
    },
    activated() {
      //为了解决bscroll不能滚动的问题，需要刷新
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  /* .cart-list {
            position: absolute;
            top: 44px;
            bottom: 89px;
            left: 0;
            right: 0;
          } */
  .content {
    /* margin-top: 44px; */
    height: calc(100vh - 49px - 84px);
    /* height: calc(100vh - 49px - 84px- 44px); */
    overflow: hidden;
    /* height: 100%;
            overflow: hidden; */
  }
</style>