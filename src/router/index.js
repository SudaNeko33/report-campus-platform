import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PublishPage from '../views/PublishPage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import AdminPage from '../views/AdminPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import { useUser } from '../composables/useUser'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/publish',
    name: 'publish',
    component: PublishPage
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { requiresAdmin: true }
  },
  {
    path: '/profile/:userId?',
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: GoodsDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { currentUser } = useUser()
  
  if (to.meta.requiresAuth && !currentUser.value) {
    next('/login')
    return
  }
  
  if (to.meta.requiresAdmin) {
    if (!currentUser.value) {
      next('/login')
      return
    }
    if (currentUser.value.role !== '管理员') {
      alert('没有权限访问管理后台！')
      next('/')
      return
    }
  }
  
  next()
})

export default router