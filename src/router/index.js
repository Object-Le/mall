import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/home')
const Category = () => import('../views/category/category')
const Cart = () => import('../views/cart/cart')
const My = () => import('../views/my/my')
const Detail = () => import('../views/detail/detail')


Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/my',
    name: 'my',
    component: My
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail
  },

]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
