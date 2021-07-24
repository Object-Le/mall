<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: 'Slide',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      imgLoad() {
        if(!this.isLoad){
          this.$emit('swiperImageLoad');
          this.isLoad = true;//四张轮播图只用发出一次就行了
        }
        
      },
    },
  }
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }
  .slide img {
    width: 100%;
  }
</style>