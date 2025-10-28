<template>
  <div class="p-6">
    <!-- Cabeçalho -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p class="text-gray-600">Visão geral do seu negócio</p>
    </div>

    <!-- Cards de Métricas Principais -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total de Vendas -->
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl">💰</span>
          </div>
          <div class="ml-4">
            <h3 class="text-gray-500 text-sm">Total de Vendas</h3>
            <p class="text-2xl font-bold text-gray-800">R$ 2.847,50</p>
            <span class="text-green-500 text-sm">+12% este mês</span>
          </div>
        </div>
      </div>

      <!-- Pedidos Hoje -->
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl">📦</span>
          </div>
          <div class="ml-4">
            <h3 class="text-gray-500 text-sm">Pedidos Hoje</h3>
            <p class="text-2xl font-bold text-gray-800">24</p>
            <span class="text-blue-500 text-sm">+3 vs ontem</span>
          </div>
        </div>
      </div>

      <!-- Clientes Ativos -->
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl">👥</span>
          </div>
          <div class="ml-4">
            <h3 class="text-gray-500 text-sm">Clientes Ativos</h3>
            <p class="text-2xl font-bold text-gray-800">156</p>
            <span class="text-purple-500 text-sm">+8 este mês</span>
          </div>
        </div>
      </div>

      <!-- Taxa de Entrega -->
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <span class="text-2xl">⏱️</span>
          </div>
          <div class="ml-4">
            <h3 class="text-gray-500 text-sm">Tempo Médio</h3>
            <p class="text-2xl font-bold text-gray-800">32 min</p>
            <span class="text-yellow-500 text-sm">-5 min vs mês passado</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráficos e Listas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Pedidos Recentes -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-4 text-gray-800">📋 Pedidos Recentes</h3>
        <div class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p class="font-semibold">Pedido #{{ order.id }}</p>
              <p class="text-sm text-gray-600">{{ order.items }} • {{ order.time }}</p>
            </div>
            <span :class="`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Entregue' ? 'bg-green-100 text-green-800' : order.status === 'Preparando' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`">
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Produtos Mais Vendidos -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-4 text-gray-800">🏆 Mais Vendidos</h3>
        <div class="space-y-3">
          <div v-for="product in topProducts" :key="product.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span class="text-red-600">{{ product.icon }}</span>
              </div>
              <div>
                <p class="font-semibold">{{ product.name }}</p>
                <p class="text-sm text-gray-600">{{ product.sales }} vendas</p>
              </div>
            </div>
            <span class="text-green-600 font-bold">R$ {{ product.revenue }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ações Rápidas -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-bold mb-4 text-gray-800">⚡ Ações Rápidas</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button class="btn btn-outline btn-primary">
          ➕ Novo Produto
        </button>
        <button class="btn btn-outline btn-secondary">
          📊 Ver Relatórios
        </button>
        <button class="btn btn-outline btn-success">
          📦 Gerenciar Pedidos
        </button>
        <button class="btn btn-outline btn-warning">
          👥 Clientes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Dados de exemplo para o dashboard
const recentOrders = [
  { id: '001', items: '2x Hamburgers + Batata', time: '15 min atrás', status: 'Preparando' },
  { id: '002', items: '1x Pizza Grande', time: '25 min atrás', status: 'Entregue' },
  { id: '003', items: '3x Refris + Nuggets', time: '40 min atrás', status: 'Entregue' },
  { id: '004', items: '1x Combo Família', time: '1 hora atrás', status: 'Entregue' },
  { id: '005', items: '2x Hot Dogs', time: '5 min atrás', status: 'Pendente' }
]

const topProducts = [
  { id: 1, name: 'Hamburger Especial', sales: 45, revenue: '1.245,00', icon: '🍔' },
  { id: 2, name: 'Pizza Calabresa', sales: 38, revenue: '1.140,00', icon: '🍕' },
  { id: 3, name: 'Batata Frita', sales: 52, revenue: '520,00', icon: '🍟' },
  { id: 4, name: 'Refrigerante', sales: 67, revenue: '335,00', icon: '🥤' },
  { id: 5, name: 'Sorvete', sales: 28, revenue: '224,00', icon: '🍦' }
]
</script>

<style scoped>
/* Estilos específicos do componente se necessário */
</style>
