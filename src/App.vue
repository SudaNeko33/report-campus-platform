<template>
  <div class="min-h-screen bg-gray-50">
    <Header 
      v-if="!isAuthPage"
      :currentUser="currentUser"
      @search="handleSearch"
      @logout="handleLogout"
    />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" :currentUser="currentUser" />
        </transition>
      </router-view>
    </main>
    <footer v-if="!isAuthPage" class="bg-white border-t border-gray-200 mt-8">
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
import { computed, onMounted } from 'vue'
import { ShoppingBag } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import { useUser } from './composables/useUser'

const router = useRouter()
const { checkAuth, currentUser, logout } = useUser()

const isAuthPage = computed(() => {
  return ['login', 'register'].includes(router.currentRoute.value.name)
})

onMounted(() => {
  checkAuth()
})

const handleSearch = (keyword) => {
  router.push('/')
  alert(`搜索：${keyword}`)
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>