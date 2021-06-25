import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Map from "../views/Map";
import Messages from "../views/Messages";
import Register from "../views/Register";
import Devices from "../views/Devices";
import utils from "../Common/utils";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/devices',
    name: 'Devices',
    component:Devices
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    if(utils.isLoggedIn())
      next('')
    else
      next();
  } else {
    if (!utils.isLoggedIn()) {
      alert("请先登录")
      next('/login');
    } else {
      next();
    }
  }
});

export default router
