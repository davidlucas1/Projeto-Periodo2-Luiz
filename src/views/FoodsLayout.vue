<template>
  <div class="p-6">
    <!-- Cabeçalho -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">🍕 Cardápio</h1>
      <p class="text-gray-600">Explore nossos deliciosos produtos</p>
    </div>

    <!-- Notificações -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="(notificacao, index) in notificacoes"
        :key="index"
        class="alert shadow-lg w-80"
        :class="{
          'alert-success': notificacao.tipo === 'sucesso',
          'alert-error': notificacao.tipo === 'erro',
          'alert-info': notificacao.tipo === 'info',
        }"
      >
        <span>{{ notificacao.mensagem }}</span>
      </div>
    </div>

    <!-- Status -->
    <div v-if="loading" class="bg-blue-100 p-4 rounded-lg mb-4">
      🔄 Carregando cardápio...
    </div>

    <!-- Barra de Pesquisa e Filtros -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input type="text" placeholder="🔍 Buscar produtos..." class="input input-bordered w-full"
            v-model="searchTerm">
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
        <div v-for="category in categories" :key="category.id"
          :class="[
            'cursor-pointer p-4 rounded-lg text-center transition-all',
            selectedCategory === category.id ? 'bg-red-600 text-white' : 'bg-white text-gray-800 shadow-md hover:shadow-lg'
          ]"
          @click="toggleCategory(category.id)">
          <div class="text-2xl mb-2">{{ category.icon }}</div>
          <p class="font-semibold">{{ category.name }}</p>
          <p class="text-sm opacity-75">{{ category.count }} itens</p>
        </div>
      </div>
    </div>

    <!-- Vendedores -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">👨‍🍳 Nossos Vendedores</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="vendor in vendors" :key="vendor.id"
          :class="[
            'bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all',
            selectedVendor === vendor.id ? 'ring-2 ring-red-500' : 'hover:shadow-lg'
          ]"
          @click="toggleVendor(vendor.id)">
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
        <h2 class="text-2xl font-bold text-gray-800">🍽 Produtos</h2>
        <span class="text-gray-600">{{ filteredProducts.length }} produtos encontrados</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
          <div class="h-40 bg-gray-200 relative">
            <div class="absolute inset-0 flex items-center justify-center text-4xl">
              {{ product.icon }}
            </div>
            <div class="absolute top-2 right-2">
              <span
                :class="[
                  'badge',
                  product.vendor === 'Chef João' ? 'badge-primary' :
                  product.vendor === 'Pizza Master' ? 'badge-secondary' :
                  product.vendor === 'Doces Maria' ? 'badge-accent' : 'badge-warning'
                ]">
                {{ product.vendor }}
              </span>
            </div>
          </div>

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
              <button class="btn btn-primary btn-sm" @click="adicionarAoCarrinho(product)">
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
import { ref, computed, onMounted } from 'vue'
import { dbService } from '../data/database.js'

// Estado
const searchTerm = ref('')
const selectedCategory = ref('')
const selectedVendor = ref('')
const categories = ref([])
const vendors = ref([])
const products = ref([])
const loading = ref(true)
const notificacoes = ref([])

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
const mostrarNotificacao = (mensagem, tipo = "sucesso") => {
  notificacoes.value.push({ mensagem, tipo })
  setTimeout(() => {
    notificacoes.value.shift()
  }, 3000)
}

const toggleCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? '' : categoryId
}

const toggleVendor = (vendorId) => {
  selectedVendor.value = selectedVendor.value === vendorId ? '' : vendorId
}

const adicionarAoCarrinho = async (produto) => {
  try {
    const novoPedido = {
      cliente: "Cliente",
      endereco: "Endereço de entrega",
      itens: [
        {
          nome: produto.name,
          preco: parseFloat(produto.price.replace(',', '.'))
        }
      ]
    }

    await dbService.addPedido(novoPedido)
    console.log('✅ Produto adicionado ao pedido:', produto.name)

    mostrarNotificacao(`✅ ${produto.name} adicionado aos pedidos!`, "sucesso")

  } catch (error) {
    console.error('❌ Erro ao adicionar pedido:', error)
    mostrarNotificacao('❌ Erro ao adicionar pedido', "erro")
  }
}

onMounted(async () => {
  try {
    loading.value = true

    // Inicializar banco e carregar dados
    await dbService.init()
    await dbService.initSampleData()

    // Buscar dados
    categories.value = await dbService.getCategorias()
    vendors.value = await dbService.getVendedores()
    products.value = await dbService.getProdutos()

    console.log('✅ Dados carregados:', {
      categorias: categories.value.length,
      vendedores: vendors.value.length,
      produtos: products.value.length
    })

  } catch (err) {
    console.error('❌ Erro:', err)
    mostrarNotificacao('❌ Erro ao carregar dados', "erro")
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
