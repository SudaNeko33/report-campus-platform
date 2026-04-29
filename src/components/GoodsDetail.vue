<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button @click="$emit('back')" class="flex items-center text-gray-600 hover:text-gray-900 mb-6">
      <ArrowLeft class="h-5 w-5 mr-2" />
      返回列表
    </button>
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img :src="goods.images" :alt="goods.goods_name" class="w-full h-full object-cover" />
        </div>
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <span class="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">{{ getCategoryName(goods.category_id) }}</span>
            <span :class="[
              'px-3 py-1 text-sm rounded-full',
              statusClass
            ]">{{ goods.status }}</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ goods.goods_name }}</h1>
          <p class="text-3xl font-bold text-red-500 mb-6">¥{{ goods.price }}</p>
          <div class="space-y-3 mb-6">
            <p class="text-gray-600">{{ goods.description }}</p>
          </div>
          <div class="border-t border-gray-200 pt-4 mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-500">所在校区</span>
              <span class="text-gray-900">{{ goods.campus }}校区</span>
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-500">发布时间</span>
              <span class="text-gray-900">{{ formatTime(goods.create_time) }}</span>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User class="h-6 w-6 text-primary-600" />
              </div>
              <div class="flex-1">
                <div class="flex items-center">
                  <span class="font-medium text-gray-900">{{ getUserName(goods.user_id) }}</span>
                  <Star class="h-4 w-4 text-yellow-400 ml-2" />
                  <span class="text-sm text-gray-500">{{ getUserScore(goods.user_id) }}</span>
                </div>
                <span class="text-sm text-gray-500">{{ getUserStudentId(goods.user_id) }}</span>
              </div>
            </div>
          </div>
          <div class="flex space-x-4">
            <button 
              v-if="goods.status === '已上架'"
              @click="handleContact"
              class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <MessageCircle class="h-5 w-5" />
              <span>联系卖家</span>
            </button>
            <button 
              v-if="goods.status === '已上架'"
              @click="handleBuy"
              class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <ShoppingCart class="h-5 w-5" />
              <span>我想要</span>
            </button>
            <button 
              v-else
              disabled
              class="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            >
              已{{ goods.status }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowLeft, User, Star, MessageCircle, ShoppingCart } from 'lucide-vue-next'
import { categories, users } from '../data/mockData'

const props = defineProps({
  goods: {
    type: Object,
    required: true
  }
})

defineEmits(['back'])

const statusClass = computed(() => {
  switch (props.goods.status) {
    case '待审核': return 'bg-yellow-100 text-yellow-700'
    case '已上架': return 'bg-green-100 text-green-700'
    case '已下架': return 'bg-gray-100 text-gray-700'
    case '已售出': return 'bg-red-100 text-red-700'
    case '暂存（已联系）': return 'bg-blue-100 text-blue-700'
    default: return 'bg-gray-100 text-gray-700'
  }
})

const getCategoryName = (id) => categories.find(c => c.category_id === id)?.category_name || '未知分类'
const getUserName = (id) => users.find(u => u.user_id === id)?.real_name || '未知用户'
const getUserScore = (id) => users.find(u => u.user_id === id)?.score || 0
const getUserStudentId = (id) => users.find(u => u.user_id === id)?.student_id || ''

const formatTime = (time) => new Date(time).toLocaleString('zh-CN')

const handleContact = () => {
  const user = users.find(u => u.user_id === props.goods.user_id)
  alert(`卖家联系方式：${user?.contact || '未提供'}`)
}

const handleBuy = () => {
  alert('订单已创建，请等待卖家确认！')
}
</script>
