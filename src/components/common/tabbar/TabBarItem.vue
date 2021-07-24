<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: String,
    },
    data() {
      return {
        // isActive: true,
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? { color: this.activeColor } : {}
      },
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path).catch(() => {})
      },
    },
  }
</script>

<style scoped>
  /* 在style里面引用资源时要用@ */
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    /* margin-top: 10px; */
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    /* 图片下面默认3px的距离，需要去掉 */
    vertical-align: middle;
  }
</style>