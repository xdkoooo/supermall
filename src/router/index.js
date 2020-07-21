import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const Home = () => import('views/home/Home.vue');
const Category = () => import('views/category/Category.vue');
const Cart = () => import('views/cart/Cart.vue');
const Profile = () => import('views/profile/Profile.vue');
const Detail = () => import('views/detail/Detail.vue');

const routes = [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/category',
      component: Category,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/cart',
      component: Cart,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
  ]
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router