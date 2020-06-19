import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import CategoryList from '../views/CategoryList.vue'
import Product from '../views/Product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/categorylist/:id',
    name: 'categorylist',
    component: CategoryList,
    props: true
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true
  },
  {
    path: '/buycart',
    name: 'buycart',
    component: () => import('../views/buyCart.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
