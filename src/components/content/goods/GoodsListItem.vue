<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      },
    },

    methods: {
      //监听图片是否加载完了
      imgLoad() {
        //加上判断是因为详情页里面的详情图片加载完后不用传给主页
        if (this.$route.path.indexOf('/home') !== -1) {
          this.$bus.$emit('itemImgLoad')
        } else if (this.$route.path.indexOf('/detail') !== -1) {
          this.$bus.$emit('itemDetilImgLoad')
        }
      },
      itemClick() {
        //跳转路由到详情页（通过动态路由跳转）
        // this.$router.push({
        //   path: '/detail',
        //   query: {
        //     id: this.goodsItem.iid,
        //   },
        // })
        this.$router.push('/detail/' + this.goodsItem.iid)
      },
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    /* 不换行 */
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: rgb(255, 115, 0);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .good-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>