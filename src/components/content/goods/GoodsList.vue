<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :goods-item="item"
      :key="index"
    ></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    name: 'GoodsList',
    components: {
      GoodsListItem,
    },

    props: {
      goods: {
        type: Array,
        default() {
          return []
        },
      },
    },
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* 自动设置一行显示多少个item */
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>