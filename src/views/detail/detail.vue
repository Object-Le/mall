<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" class="detailGood"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        class="detailparam"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        class="detailComment"
      ></detail-comment-info>
      <goods-list :goods="recommends" class="detailRecommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="showBack"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComponent/detailnavbar'
  import DetailSwiper from './childComponent/detailSwiper'
  import DetailBaseInfo from './childComponent/detailBaseInfo.vue'
  import DetailShopInfo from './childComponent/detailShopInfo.vue'
  import DetailGoodsInfo from './childComponent/detailGoodsInfo.vue'
  import DetailParamInfo from './childComponent/detailParamInfo.vue'
  import DetailCommentInfo from './childComponent/detailCommentInfo.vue'
  import DetailBottomBar from './childComponent/detailBottomBar.vue'

  import BackTop from 'components/content/backTop/backTop'
  import Scroll from 'components/common/scroll/scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam,
  } from 'network/detail.js'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      BackTop,
    },

    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        showBack: false,
      }
    },
    created() {
      //1. 保存传入的iid
      this.iid = this.$route.params.iid

      //2. 根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        // console.log(res)
        const data = res.result

        // 2.1 获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        //2.2. 获取商品的信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )

        //2.3. 获取店铺的信息
        this.shop = new Shop(data.shopInfo)

        //2.4 保存商品的详情数据
        this.detailInfo = data.detailInfo

        //2.5 获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )

        //2.6 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.获取详情页的推荐商品
      getRecommend().then((res) => {
        // console.log(res)
        this.recommends = res.data.list
      })
    },

    methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh()
      },
      //点击标题跳到对应模块
      titleClick(index) {
        // console.log(index)
        if (index === 0) {
          this.$refs.scroll.scroll.scrollTo(0, 0, 200)
        } else if (index === 1) {
          this.$refs.scroll.scroll.scrollToElement('.detailparam', 200)
        } else if (index === 2) {
          this.$refs.scroll.scroll.scrollToElement('.detailComment', 200)
        } else {
          this.$refs.scroll.scroll.scrollToElement('.detailRecommend', 200)
        }
      },

      //返回顶部事件
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      // 监听详情页的scroll,到对应的模块，对应标题变色
      contentScroll(position) {
        // console.log(position)
        this.showBack = Math.abs(position.y) > 300
      },

      addCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.detailInfo.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //将商品加到购物车里面
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then((res) => {
          console.log(res)
        })

        //3. 判断是否添加到购物车成功
      },
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    /* height: calc(100% - 44px); */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>    