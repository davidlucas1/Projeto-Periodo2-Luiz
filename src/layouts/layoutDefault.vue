<template>
  <!-- Layout principal -->
  <div class="flex min-h-screen bg-base-100">
    <!-- Sidebar (Menu Lateral) -->
    <div class="w-64 bg-yellow-500 text-yellow-900 shadow-lg">
      <!-- Espaço para Logo -->
      <div class="flex flex-col items-center justify-center p-6 border-b border-yellow-600 bg-white">
        <div class="w-40 h-40 bg-red-600 flex items-center justify-center mb-3">
          <span class="text-white text-2xl font-bold">F</span>
        </div>
        <h2 class="text-2xl font-bold text-red-600">Comida Aqui</h2>
        <p class="text-sm text-gray-600 mt-1">Sabor que delivery</p>
      </div>

      <!-- Menu Navigation -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link to="/cardapio" class="flex items-center p-3 rounded-lg hover:bg-yellow-400 transition-colors">
              <span class="mr-3">🍕</span>
              Cardápio
            </router-link>
          </li>
          <li>
            <a class="flex items-center p-3 rounded-lg hover:bg-yellow-400 transition-colors">
              <span class="mr-3">📦</span>
              Pedidos
            </a>
          </li>
          <li>
            <router-link to="/" class="flex items-center p-3 rounded-lg hover:bg-yellow-400 transition-colors">
              <span class="mr-3">📊</span>
              Dashboard
            </router-link>
          </li>
          <li>
            <a class="flex items-center p-3 rounded-lg hover:bg-yellow-400 transition-colors">
              <span class="mr-3">👥</span>
              Clientes
            </a>
          </li>
          <li>
            <a class="flex items-center p-3 rounded-lg hover:bg-yellow-400 transition-colors">
              <span class="mr-3">📈</span>
              Relatórios
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Conteúdo Principal -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar Superior -->
      <div class="navbar bg-red-600 text-white shadow-lg">
        <div class="flex-1">
          <a class="mx-4 text-xl font-bold">Painel de Controle</a>
        </div>
        <div class="flex-none gap-4">
          <!-- Botão de Notificações -->
          <button class="btn btn-ghost btn-circle text-white hover:bg-red-700">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.161 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <span class="badge badge-xs badge-warning indicator-item"></span>
            </div>
          </button>

          <!-- Perfil do Usuário -->
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar text-white hover:bg-red-700">
              <div class="w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                <span class="font-bold">A</span>
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base-content">
              <li><a>Perfil</a></li>
              <li><a>Configurações</a></li>
              <li><a class="text-red-600 font-bold">Sair</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Área de Conteúdo (Rotas) -->
      <main class="flex-1 overflow-y-auto p-6 bg-base-200">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
/* CSS normal - sem Sass! */
</style>
