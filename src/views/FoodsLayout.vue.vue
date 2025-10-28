<template>
  <div class="p-6">
    <!-- Cabeçalho -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">🍕 Cardápio</h1>
      <p class="text-gray-600">Explore nossos deliciosos produtos</p>
    </div>

    <!-- Barra de Pesquisa e Filtros -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            class="input input-bordered w-full"
            v-model="searchTerm"
          >
        </div>
        <select class="select select-bordered" v-model="selectedCategory">
          <option value="">Todas as Categorias</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <select class="select select-bordered" v-model="selectedVendor">
          <option value="">Todos os Vendedores</option>
          <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
            {{ vendor.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Categorias -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">📁 Categorias</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="`cursor-pointer p-4 rounded-lg text-center transition-all ${selectedCategory === category.id ? 'bg-red-600 text-white' : 'bg-white text-gray-800 shadow-md hover:shadow-lg'}`"
          @click="toggleCategory(category.id)"
        >
          <div class="text-2xl mb-2">{{ category.icon }}</div>
          <p class="font-semibold">{{ category.name }}</p>
          <p class="text-sm opacity-75">{{ category.count }} itens</p>
        </div>
      </div>
    </div>

    <!-- Vendedores em Destaque -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">👨‍🍳 Nossos Vendedores</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="vendor in vendors"
          :key="vendor.id"
          :class="`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${selectedVendor === vendor.id ? 'ring-2 ring-red-500' : 'hover:shadow-lg'}`"
          @click="toggleVendor(vendor.id)"
        >
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <span class="text-white font-bold">{{ vendor.initials }}</span>
            </div>
            <div>
              <h3 class="font-bold text-lg">{{ vendor.name }}</h3>
              <p class="text-sm text-gray-600">{{ vendor.specialty }}</p>
            </div>
          </div>
          <div class="mt-3 flex justify-between text-sm">
            <span class="flex items-center">
              ⭐ {{ vendor.rating }}
            </span>
            <span class="text-green-600">
              {{ vendor.deliveryTime }}
            </span>
          </div>
          <div class="mt-2">
            <span class="badge badge-outline">{{ vendor.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Produtos -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800">🍽️ Produtos</h2>
        <span class="text-gray-600">{{ filteredProducts.length }} produtos encontrados</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
        >
          <!-- Imagem do Produto -->
          <div class="h-40 bg-gray-200 relative">
            <div class="absolute inset-0 flex items-center justify-center text-4xl">
              {{ product.icon }}
            </div>
            <div class="absolute top-2 right-2">
              <span :class="`badge ${product.vendor === 'Chef João' ? 'badge-primary' : product.vendor === 'Pizza Master' ? 'badge-secondary' : product.vendor === 'Doces Maria' ? 'badge-accent' : 'badge-warning'}`">
                {{ product.vendor }}
              </span>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <h3 class="font-bold text-lg mb-1">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>

            <div class="flex items-center justify-between mb-3">
              <span class="text-red-600 font-bold text-lg">R$ {{ product.price }}</span>
              <div class="flex items-center">
                <span class="text-yellow-500">⭐</span>
                <span class="text-sm ml-1">{{ product.rating }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">{{ product.preparationTime }}</span>
              <button class="btn btn-primary btn-sm">
                <span class="mr-1">+</span>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estado
const searchTerm = ref('')
const selectedCategory = ref('')
const selectedVendor = ref('')


// Dados
const categories = ref([
  { id: 'burgers', name: 'Hambúrgueres', icon: '🍔', count: 12 },
  { id: 'pizzas', name: 'Pizzas', icon: '🍕', count: 8 },
  { id: 'drinks', name: 'Bebidas', icon: '🥤', count: 15 },
  { id: 'desserts', name: 'Sobremesas', icon: '🍰', count: 6 },
  { id: 'snacks', name: 'Lanches', icon: '🌭', count: 10 },
  { id: 'combos', name: 'Combos', icon: '📦', count: 5 }
])

const vendors = ref([
  { id: 'chef-joao', name: 'Chef João', initials: 'CJ', specialty: 'Carnes Premium', rating: 4.8, deliveryTime: '25-35 min', category: 'Churrasco' },
  { id: 'pizza-master', name: 'Pizza Master', initials: 'PM', specialty: 'Pizzas Artesanais', rating: 4.9, deliveryTime: '30-40 min', category: 'Pizzaria' },
  { id: 'doces-maria', name: 'Doces Maria', initials: 'DM', specialty: 'Sobremesas', rating: 4.7, deliveryTime: '15-25 min', category: 'Confeitaria' },
  { id: 'lanches-rapidos', name: 'Lanches Rápidos', initials: 'LR', specialty: 'Lanches', rating: 4.5, deliveryTime: '20-30 min', category: 'Fast Food' }
])

const products = ref([
  { id: 1, name: 'Hambúrguer Artesanal', description: 'Carne 180g, queijo, alface, tomate', price: '24,90', rating: 4.8, preparationTime: '15-20 min', category: 'burgers', vendor: 'Chef João', icon: '🍔' },
  { id: 2, name: 'Pizza Calabresa', description: 'Molho, calabresa, cebola, azeitonas', price: '49,90', rating: 4.9, preparationTime: '25-35 min', category: 'pizzas', vendor: 'Pizza Master', icon: '🍕' },
  { id: 3, name: 'Coca-Cola 2L', description: 'Refrigerante gelado', price: '12,00', rating: 4.5, preparationTime: '5-10 min', category: 'drinks', vendor: 'Lanches Rápidos', icon: '🥤' },
  { id: 4, name: 'Brownie com Sorvete', description: 'Brownie quente com sorvete de creme', price: '18,90', rating: 4.7, preparationTime: '10-15 min', category: 'desserts', vendor: 'Doces Maria', icon: '🍫' },
  { id: 5, name: 'Hot Dog Especial', description: '2 salsichas, purê, batata palha', price: '16,90', rating: 4.6, preparationTime: '12-18 min', category: 'snacks', vendor: 'Lanches Rápidos', icon: '🌭' },
  { id: 6, name: 'Combo Família', description: '2 pizzas + 2 refrigerantes', price: '89,90', rating: 4.8, preparationTime: '30-40 min', category: 'combos', vendor: 'Pizza Master', icon: '📦' },
  { id: 7, name: 'Costela no Bafo', description: 'Costela suína temperada', price: '42,90', rating: 4.9, preparationTime: '35-45 min', category: 'burgers', vendor: 'Chef João', icon: '🥩' },
  { id: 8, name: 'Torta de Limão', description: 'Torta gelada com limão siciliano', price: '14,90', rating: 4.8, preparationTime: '5-10 min', category: 'desserts', vendor: 'Doces Maria', icon: '🍰' }
])

// Computed
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    const matchesVendor = !selectedVendor.value ||
                         vendors.value.find(v => v.id === selectedVendor.value)?.name === product.vendor

    return matchesSearch && matchesCategory && matchesVendor
  })
})


// Métodos
const toggleCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? '' : categoryId
}

const toggleVendor = (vendorId) => {
  selectedVendor.value = selectedVendor.value === vendorId ? '' : vendorId
}
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
