import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../views/DashboardLayout.vue'
import FoodsLayout from '../views/FoodsLayout.vue'
import PedidoLayout from '@/views/PedidoLayout.vue'

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
  },
    {
    path: '/pedido',
    name: 'PedidoLayout',
    component: PedidoLayout
  }

  // Adicione mais rotas conforme necessário
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
