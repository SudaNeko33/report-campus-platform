<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <div class="flex items-center cursor-pointer" @click="$emit('navigate', 'home')">
            <ShoppingBag class="h-8 w-8 text-primary-600" />
            <span class="text-xl font-bold text-gray-900 ml-2">校园二手</span>
          </div>
          <nav class="hidden md:flex space-x-6">
            <button 
              v-for="item in navItems" 
              :key="item.key"
              @click="$emit('navigate', item.key)"
              :class="[
                'text-sm font-medium transition-colors',
                currentPage === item.key ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              {{ item.label }}
            </button>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchKeyword"
              placeholder="搜索商品..."
              class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              @keyup.enter="handleSearch"
            />
            <Search class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div v-if="currentUser" class="relative group">
            <button 
              @click="$emit('navigate', 'profile')"
              class="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              <User class="h-5 w-5" />
              <span class="text-sm font-medium">{{ currentUser.real_name }}</span>
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
              <button 
                @click="$emit('navigate', 'profile')"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                个人中心
              </button>
              <button 
                @click="$emit('logout')"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                退出登录
              </button>
            </div>
          </div>
          <button 
            v-else
            @click="$emit('navigate', 'login')"
            class="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            <User class="h-5 w-5" />
            <span class="text-sm font-medium">登录</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBag, Search, User } from 'lucide-vue-next'

defineProps({
  currentPage: {
    type: String,
    default: 'home'
  },
  currentUser: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['navigate', 'search', 'logout'])

const searchKeyword = ref('')

const navItems = [
  { key: 'home', label: '首页' },
  { key: 'publish', label: '发布商品' },
  { key: 'orders', label: '我的订单' },
  { key: 'admin', label: '管理后台' }
]

const handleSearch = () => {
  emit('search', searchKeyword.value)
}
</script>
