import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../views/DashboardLayout.vue.vue'
import FoodsLayout from '../views/FoodsLayout.vue.vue'

const routes = [
  {
    path: '/',
    name: 'DashboardLayout',
    component: DashboardLayout
  },
  {
    path: '/cardapio',
    name: 'FoodsLayout',
    component: FoodsLayout
  }
  // Adicione mais rotas conforme necessário
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
