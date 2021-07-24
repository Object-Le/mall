<template>
  <div class="bottom-bar">
    <div class="total-check">
      <check-button
        :is-checked="isSelectAll"
        @click.native="checkClick"
        class="checkBtn"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：￥{{ totalPrice.toFixed(2) }}</span>
    </div>
    <div class="calc">去结算({{ calcLength }})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/CheckButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton,
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList
          .filter((item) => {
            return item.isChecked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0.0)
      },

      calcLength() {
        return this.$store.state.cartList.filter((item) => item.isChecked).length
      },

      isSelectAll() {
        if (this.$store.state.cartList.length === 0) {
          return false
        } else {
          return this.$store.state.cartList.every((item) => item.isChecked)
        }
      },
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          //如果当前商品全部选中，点击后取消商品全选
          this.$store.state.cartList.forEach((element) => {
            element.isChecked = false
          })
        } else {
          this.$store.state.cartList.forEach((element) => {
            element.isChecked = true
          })
        }
      },
    },
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }
  .total-check {
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
  .checkBtn {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .total-price {
    width: 50%;
  }
  .calc {
    width: 25%;
    background-color: #ff5028;
    color: #fff;
  }
</style>