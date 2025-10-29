<template>
  <div class="min-h-screen bg-base-200 p-6">
    <!-- Cabeçalho -->
    <div class="flex flex-col items-center mb-8">
      <h1 class="text-3xl font-bold text-primary mb-2">
        🍔 Pedidos - Sabor Aqui
      </h1>
      <p class="text-gray-500">Gerenciamento de pedidos de clientes</p>
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
        }"
      >
        <span>{{ notificacao.mensagem }}</span>
      </div>
    </div>

    <!-- Lista de pedidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="card bg-base-100 shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title text-lg font-semibold">
            Pedido #{{ pedido.id }}
          </h2>

          <p><strong>Cliente:</strong> {{ pedido.cliente }}</p>
          <p><strong>Endereço:</strong> {{ pedido.endereco }}</p>
          <p><strong>Itens:</strong></p>
          <ul class="list-disc ml-5">
            <li v-for="item in pedido.itens" :key="item.nome">
              {{ item.nome }} — R$ {{ item.preco.toFixed(2) }}
            </li>
          </ul>

          <p class="mt-2">
            <strong>Total:</strong> R$ {{ totalPedido(pedido) }}
          </p>

          <div class="card-actions justify-end mt-4">
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
        </div>
      </div>
    </div>

    <!-- Mensagem se não houver pedidos -->
    <div v-if="pedidos.length === 0" class="text-center mt-12 text-gray-500">
      Nenhum pedido pendente 😋
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Lista de pedidos com endereço do cliente
const pedidos = ref([
  {
    id: 1,
    cliente: "Maria Oliveira",
    endereco: "Rua das Flores, 123 - Centro, Recife/PE",
    itens: [
      { nome: "X-Burger", preco: 18.5 },
      { nome: "Batata Média", preco: 9.0 },
    ],
  },
  {
    id: 2,
    cliente: "João Silva",
    endereco: "Av. Paulista, 890 - Bela Vista, São Paulo/SP",
    itens: [
      { nome: "Pizza Calabresa", preco: 32.0 },
      { nome: "Coca-Cola 1L", preco: 8.0 },
    ],
  },
]);

// Notificações tipo card
const notificacoes = ref([]);

function mostrarNotificacao(mensagem, tipo = "sucesso") {
  notificacoes.value.push({ mensagem, tipo });
  setTimeout(() => {
    notificacoes.value.shift();
  }, 3000);
}

// Calcula o total do pedido
function totalPedido(pedido) {
  return pedido.itens
    .reduce((soma, item) => soma + item.preco, 0)
    .toFixed(2);
}

// Ações de pedido
function finalizarPedido(id) {
  pedidos.value = pedidos.value.filter((p) => p.id !== id);
  mostrarNotificacao('Pedido #${id} finalizado com sucesso!', "sucesso");
}

function cancelarPedido(id) {
  pedidos.value = pedidos.value.filter((p) => p.id !== id);
  mostrarNotificacao('Pedido #${id} foi cancelado.', "erro");
}
</script>
