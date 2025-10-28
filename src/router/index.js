import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../views/DashboardLayout.vue.vue'
import FoodsLayout from '../views/FoodsLayout.vue.vue'

const routes = [
  {
    path: '/',
    name: 'FoodsLayout',
    component: FoodsLayout
  },
  {
    path: '/dashboard',
    name: 'DashboardLayout',
    component: DashboardLayout
  }
  // Adicione mais rotas conforme necessário
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
