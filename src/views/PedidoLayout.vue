<template>
  <div class="min-h-screen bg-base-200 p-6">
    <!-- Cabeçalho -->
    <div class="flex flex-col items-center mb-8">
      <h1 class="text-3xl font-bold text-primary mb-2">
        🍔 Pedidos - Sabor Aqui
      </h1>
      <p class="text-gray-500">Gerenciamento de pedidos de clientes</p>

      <!-- Status de carregamento -->
      <div v-if="loading" class="text-blue-500 mt-2">
        🔄 Carregando pedidos...
      </div>
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

    <!-- Filtros de status -->
    <div class="flex justify-center mb-6">
      <div class="tabs tabs-boxed">
        <button
          class="tab"
          :class="{ 'tab-active': filtroStatus === 'todos' }"
          @click="filtroStatus = 'todos'"
        >
          Todos
        </button>
        <button
          class="tab"
          :class="{ 'tab-active': filtroStatus === 'pendente' }"
          @click="filtroStatus = 'pendente'"
        >
          Pendentes
        </button>
        <button
          class="tab"
          :class="{ 'tab-active': filtroStatus === 'finalizado' }"
          @click="filtroStatus = 'finalizado'"
        >
          Finalizados
        </button>
        <button
          class="tab"
          :class="{ 'tab-active': filtroStatus === 'cancelado' }"
          @click="filtroStatus = 'cancelado'"
        >
          Cancelados
        </button>
      </div>
    </div>

    <!-- Lista de pedidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="pedido in pedidosFiltrados"
        :key="pedido.id"
        class="card bg-base-100 shadow-xl border-l-4"
        :class="{
          'border-orange-500': pedido.status === 'pendente',
          'border-green-500': pedido.status === 'finalizado',
          'border-red-500': pedido.status === 'cancelado'
        }"
      >
        <div class="card-body">
          <div class="flex justify-between items-start mb-2">
            <h2 class="card-title text-lg font-semibold">
              Pedido #{{ pedido.id }}
            </h2>
            <span class="badge" :class="{
              'badge-warning': pedido.status === 'pendente',
              'badge-success': pedido.status === 'finalizado',
              'badge-error': pedido.status === 'cancelado'
            }">
              {{ pedido.status === 'pendente' ? '⏳ Pendente' :
                 pedido.status === 'finalizado' ? '✅ Finalizado' : '❌ Cancelado' }}
            </span>
          </div>

          <p><strong>👤 Cliente:</strong> {{ pedido.cliente }}</p>
          <p><strong>📍 Endereço:</strong> {{ pedido.endereco }}</p>
          <p><strong>📦 Itens:</strong></p>
          <ul class="list-disc ml-5">
            <li v-for="item in pedido.itens" :key="item.nome">
              {{ item.nome }} — R$ {{ item.preco.toFixed(2) }}
            </li>
          </ul>

          <p class="mt-2 font-bold text-lg">
            💰 Total: R$ {{ totalPedido(pedido) }}
          </p>

          <div class="text-sm text-gray-500 mt-1">
            📅 {{ formatarData(pedido.timestamp) }}
          </div>

          <div class="card-actions justify-end mt-4" v-if="pedido.status === 'pendente'">
            <button
              class="btn btn-success btn-sm"
              @click="finalizarPedido(pedido.id)"
            >
              ✅ Finalizar
            </button>
            <button
              class="btn btn-error btn-sm"
              @click="cancelarPedido(pedido.id)"
            >
              ❌ Cancelar
            </button>
          </div>

          <div v-else class="text-center mt-4 p-2 rounded" :class="{
            'bg-green-100 text-green-800': pedido.status === 'finalizado',
            'bg-red-100 text-red-800': pedido.status === 'cancelado'
          }">
            {{ pedido.status === 'finalizado' ? 'Pedido finalizado' : 'Pedido cancelado' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mensagem se não houver pedidos -->
    <div v-if="pedidosFiltrados.length === 0 && !loading" class="text-center mt-12 text-gray-500">
      <div class="text-6xl mb-4">😋</div>
      <p class="text-xl">Nenhum pedido {{ filtroStatus !== 'todos' ? filtroStatus : '' }} encontrado</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { dbService } from '../data/database.js'

// Estado
const pedidos = ref([])
const loading = ref(true)
const filtroStatus = ref('todos')
const notificacoes = ref([])

// Computed
const pedidosFiltrados = computed(() => {
  if (filtroStatus.value === 'todos') {
    return pedidos.value
  }
  return pedidos.value.filter(pedido => pedido.status === filtroStatus.value)
})

// Métodos
function mostrarNotificacao(mensagem, tipo = "sucesso") {
  notificacoes.value.push({ mensagem, tipo })
  setTimeout(() => {
    notificacoes.value.shift()
  }, 3000)
}

function totalPedido(pedido) {
  return pedido.itens
    .reduce((soma, item) => soma + item.preco, 0)
    .toFixed(2)
}

function formatarData(dataString) {
  const data = new Date(dataString)
  return data.toLocaleString('pt-BR')
}

async function finalizarPedido(id) {
  try {
    await dbService.updatePedidoStatus(id, 'finalizado')
    // Atualizar a lista local
    const pedidoIndex = pedidos.value.findIndex(p => p.id === id)
    if (pedidoIndex !== -1) {
      pedidos.value[pedidoIndex].status = 'finalizado'
    }
    mostrarNotificacao(`Pedido #${id} finalizado com sucesso!`, "sucesso")
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error)
    mostrarNotificacao('Erro ao finalizar pedido', "erro")
  }
}

async function cancelarPedido(id) {
  try {
    await dbService.updatePedidoStatus(id, 'cancelado')
    // Atualizar a lista local
    const pedidoIndex = pedidos.value.findIndex(p => p.id === id)
    if (pedidoIndex !== -1) {
      pedidos.value[pedidoIndex].status = 'cancelado'
    }
    mostrarNotificacao(`Pedido #${id} foi cancelado.`, "erro")
  } catch (error) {
    console.error('Erro ao cancelar pedido:', error)
    mostrarNotificacao('Erro ao cancelar pedido', "erro")
  }
}

async function carregarPedidos() {
  try {
    loading.value = true
    await dbService.init()
    pedidos.value = await dbService.getPedidos()
    console.log('✅ Pedidos carregados:', pedidos.value)
  } catch (error) {
    console.error('❌ Erro ao carregar pedidos:', error)
    mostrarNotificacao('Erro ao carregar pedidos', "erro")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarPedidos()
})
</script>
