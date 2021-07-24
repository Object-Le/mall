<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
        :class="{ fixed: isTabFixed }"
      >
      </tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!-- 组件不能直接监听，要加native -->
    <back-top @click.native="backClick" v-show="showBack"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComponent/homeSwiper.vue'
  import HomeRecommend from './childComponent/recommend.vue'
  import FeatureView from './childComponent/featureView.vue'

  import NavBar from 'components/common/navbar/navBar'
  import Scroll from 'components/common/scroll/scroll'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/backTop'

  import { getHomeMultidata, getHomeGoods } from 'network/home.js'

  import { debounce } from 'components/common/utils.js'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },

    data() {
      return {
        banners: [],
        recommends: [],
        // 把服务器的数据都请求下来，用一个对象保存。就不用了每次都向服务器请求数据
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] },
        },
        currentType: 'pop',
        showBack: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },

    created() {
      //组件一旦创建完后就发送网络请求
      // 1.请求多个数据,轮播图及下面
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    computed: {
      activated() {
        this.$refs.scroll.scroll.scrollTo(0, this.saveY, 1)
        this.$refs.scroll.scroll.refresh()
      },
      deactivate() {
        this.saveY = this.$refs.scroll.scroll.y
      },
    },

    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 500)

      // 3.监听首页图片是否加载完(不要在created里面，要不然可能拿不到scroll)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    },

    methods: {
      //1.事件监听相关方法

      // //防抖函数，用于防止加载的图片频繁更新
      // debounce(func, delay) {
      //   let timer = null
      //   return function (...args) {
      //     //清除之前的timer
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this, args)
      //     }, delay)
      //   }
      // },

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },

      //返回顶部事件
      backClick() {
        //拿到scroll组件对象,然后访问scroll属性（在scroll.vue里的data里定义的）
        // this.$refs.scroll.scroll = scrollTo(0, 0)

        this.$refs.scroll.scrollTo(0, 0, 300)
      },

      //当滚动到一定区域，返回顶部的图标才出现
      contentScroll(position) {
        //1. 当滚动到一定区域，返回顶部的图标才出现
        this.showBack = Math.abs(position.y) > 300

        //2. 决定tabControl是否吸顶（position： fixed）
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      },

      //上拉加载事件
      loadMore() {
        //在这个方法里，原来已经在第一页了，下面再调用一次，页码就加1
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },

      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },

      //2. 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          // console.log(res)
          this.banners = res.data.banner.list
          // console.log(this.banners)
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1 //用于请求下一页的数据
        getHomeGoods(type, page).then((res) => {
          // 将数组保存起来
          this.goods[type].list.push(...res.data.list)
          // 更新页码
          this.goods[type].page++

          //调用这个方法，才能继续下一页的上拉加载，否则就只能拉一次
          this.$refs.scroll.scroll.finishPullUp()
        })
      },
    },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: rgb(255, 115, 0);
    color: #fff;

    /* 让导航栏不随着页面下滑而移动 */
    position: sticky;
    top: 0;
    z-index: 9;
  }

  /* 商品条栏上升到导航栏的下面就固定 */
  /* .tab-control{
                      position: sticky;
                      top: 44px;
                      z-index: 9;
                      } 
                      */

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>