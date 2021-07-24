<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        },
      },
    },

    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //告诉父组件（home）哪个数据发生了点击事件，然后向父组件请求商品数据
        this.$emit('tabClick', index)
      },
    },
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .active {
    color: rgb(255, 115, 0);
  }
  .active span {
    border-bottom: 3px solid rgb(255, 115, 0);
  }
</style>