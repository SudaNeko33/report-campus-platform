<template>
  <div class="min-h-screen bg-gray-50">
    <Header 
      :currentPage="currentPage" 
      @navigate="handleNavigate"
      @search="handleSearch"
    />
    <main>
      <HomePage 
        v-if="currentPage === 'home'" 
        @viewGoods="viewGoods"
      />
      <GoodsDetail 
        v-else-if="currentPage === 'detail'" 
        :goods="selectedGoods"
        @back="currentPage = 'home'"
      />
      <PublishPage 
        v-else-if="currentPage === 'publish'" 
        @back="currentPage = 'home'"
      />
      <OrdersPage 
        v-else-if="currentPage === 'orders'" 
      />
      <ProfilePage 
        v-else-if="currentPage === 'profile'" 
      />
      <AdminPage 
        v-else-if="currentPage === 'admin'" 
      />
    </main>
    <footer class="bg-white border-t border-gray-200 mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center space-x-2 mb-4 md:mb-0">
            <ShoppingBag class="h-6 w-6 text-primary-600" />
            <span class="font-semibold text-gray-900">校园二手交易平台</span>
          </div>
          <p class="text-sm text-gray-500">© 2024 校园二手交易平台 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBag } from 'lucide-vue-next'
import Header from './components/Header.vue'
import HomePage from './components/HomePage.vue'
import GoodsDetail from './components/GoodsDetail.vue'
import PublishPage from './components/PublishPage.vue'
import OrdersPage from './components/OrdersPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import AdminPage from './components/AdminPage.vue'

const currentPage = ref('home')
const selectedGoods = ref(null)

const handleNavigate = (page) => {
  currentPage.value = page
}

const handleSearch = (keyword) => {
  currentPage.value = 'home'
  alert(`搜索：${keyword}`)
}

const viewGoods = (goods) => {
  selectedGoods.value = goods
  currentPage.value = 'detail'
}
</script>
