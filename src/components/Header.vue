<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex items-center">
            <ShoppingBag class="h-8 w-8 text-primary-600" />
            <span class="text-xl font-bold text-gray-900 ml-2">校园二手</span>
          </router-link>
          <nav class="hidden md:flex space-x-6">
            <router-link 
              v-for="item in navItems" 
              :key="item.key"
              :to="item.path"
              :class="[
                'text-sm font-medium transition-colors',
                isActive(item.path) ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              {{ item.label }}
            </router-link>
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
          <div v-if="currentUser" class="relative" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <button 
              @click="showDropdown = !showDropdown"
              class="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              <User class="h-5 w-5" />
              <span class="text-sm font-medium">{{ currentUser.real_name }}</span>
            </button>
            <div 
              v-show="showDropdown"
              class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            >
              <router-link 
                to="/profile" 
                @click="showDropdown = false"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                个人中心
              </router-link>
              <button 
                @click="$emit('logout'); showDropdown = false"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                退出登录
              </button>
            </div>
          </div>
          <router-link 
            v-else
            to="/login"
            class="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            <User class="h-5 w-5" />
            <span class="text-sm font-medium">登录</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingBag, Search, User } from 'lucide-vue-next'

const router = useRouter()

const props = defineProps({
  currentUser: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['search', 'logout'])

const searchKeyword = ref('')
const showDropdown = ref(false)
let leaveTimer = null

const baseNavItems = [
  { key: 'home', label: '首页', path: '/' },
  { key: 'publish', label: '发布商品', path: '/publish' },
  { key: 'orders', label: '我的订单', path: '/orders' }
]

const navItems = computed(() => {
  const items = [...baseNavItems]
  if (props.currentUser && props.currentUser.role === '管理员') {
    items.push({ key: 'admin', label: '管理后台', path: '/admin' })
  }
  return items
})

const currentPath = computed(() => router.currentRoute.value.path)

const isActive = (path) => {
  return currentPath.value === path
}

const handleSearch = () => {
  emit('search', searchKeyword.value)
}

const handleMouseEnter = () => {
  if (leaveTimer) {
    clearTimeout(leaveTimer)
    leaveTimer = null
  }
  showDropdown.value = true
}

const handleMouseLeave = () => {
  leaveTimer = setTimeout(() => {
    showDropdown.value = false
  }, 200)
}
</script>