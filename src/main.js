import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
