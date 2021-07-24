export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //判断新传进来的payload商品是否已经加入过购物车，（点击购物车只能加一次）
      oldProduct = null;
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)//判断有没有当前的payload的iid

      if (oldProduct) {//如果原来已经有了，就找到里面的count加一
        // oldProduct.count++;
        context.commit('addCounter', oldProduct)
        resolve('当前数量+1')
      } else {//添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('成功添加商品')
      }
    })


  }
}