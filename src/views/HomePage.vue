<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-3">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">商品分类</h3>
          <div class="space-y-2">
            <button
              v-for="cat in categories"
              :key="cat.category_id"
              @click="filterCategory = filterCategory === cat.category_id ? null : cat.category_id"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                filterCategory === cat.category_id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              {{ cat.category_name }}
            </button>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 mt-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">校区筛选</h3>
          <div class="space-y-2">
            <button
              v-for="campus in campusOptions"
              :key="campus"
              @click="filterCampus = filterCampus === campus ? null : campus"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                filterCampus === campus
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              {{ campus }}校区
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-9">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 mb-6">
          <h1 class="text-3xl font-bold text-white mb-2">校园二手交易平台</h1>
          <p class="text-primary-100">让闲置物品焕发新生，共建绿色校园</p>
        </div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">全部商品</h2>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="create_time">最新发布</option>
            <option value="price_asc">价格从低到高</option>
            <option value="price_desc">价格从高到低</option>
          </select>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="good in filteredGoods"
            :key="good.goods_id"
            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(`/detail/${good.goods_id}`)"
          >
            <div class="aspect-square bg-gray-100">
              <img :src="good.images" :alt="good.goods_name" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-900 mb-2 truncate">{{ good.goods_name }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ getCategoryName(good.category_id) }}</p>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-red-500">¥{{ good.price }}</span>
                <span class="text-xs text-gray-400">{{ getCampus(good.campus) }}</span>
              </div>
              <div class="flex items-center mt-3">
                <User class="h-4 w-4 text-gray-400 mr-1" />
                <span class="text-xs text-gray-500">{{ getUserName(good.user_id) }}</span>
                <Star class="h-4 w-4 text-yellow-400 ml-auto" />
                <span class="text-xs text-gray-500 ml-1">{{ getUserScore(good.user_id) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="filteredGoods.length === 0" class="text-center py-12">
          <Package class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">暂无符合条件的商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { User, Star, Package } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { goods, categories, users, campusOptions, getUserScore } from '../data/store'

const route = useRoute()

const filterCategory = ref(null)
const filterCampus = ref(null)
const sortBy = ref('create_time')
const searchKeyword = ref('')

onMounted(() => {
  if (route.query.keyword) {
    searchKeyword.value = route.query.keyword
  }
})

watch(() => route.query.keyword, (newKeyword) => {
  if (newKeyword) {
    searchKeyword.value = newKeyword
  }
})

const filteredGoods = computed(() => {
  let result = goods.filter(g => g.status === '已上架')

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(g =>
      g.goods_name.toLowerCase().includes(keyword) ||
      g.description.toLowerCase().includes(keyword)
    )
  }

  if (filterCategory.value) {
    result = result.filter(g => g.category_id === filterCategory.value)
  }

  if (filterCampus.value) {
    result = result.filter(g => g.campus === filterCampus.value)
  }

  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    default:
      result.sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
  }

  return result
})

const getCategoryName = (id) => categories.find(c => c.category_id === id)?.category_name || '未知分类'
const getUserName = (id) => users.find(u => u.user_id === id)?.real_name || '未知用户'
const getCampus = (campus) => campus + '校区'
</script>
