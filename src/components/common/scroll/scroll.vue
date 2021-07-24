<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    //接收父组件的值
    props: {
      //在不同的页面，scroll不一定都需要进行监听，通过设置probeType改变是否监听状态
      probeType: {
        type: Number,
        default: 0,
      },

      //上拉加载
      pullUpLoad: {
        type: Boolean,
        default: true,
      },
    },

    data() {
      return {
        scroll: null,
      }
    },

    mounted() {
      // 1.创建BScroll对象
      //为了不拿到其他名为wrapper的元素，使用ref来获取元素
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        //监听是否滚动到底部
        pullUpLoad: this.pullUpLoad,
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })

      //3. 监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },

    //3. 监听上拉事件

    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },

      refresh() {
        //判断scroll对象是否存在
        this.scroll && this.scroll.refresh()
        //console.log('---')
      },
    },
  }
</script>