<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 mb-6 text-white">
      <div class="flex items-center space-x-6">
        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <User class="h-12 w-12 text-primary-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold">{{ currentUser.real_name }}</h1>
          <p class="text-primary-100 mt-1">{{ currentUser.username }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <div class="flex items-center">
              <Star class="h-5 w-5 text-yellow-400" />
              <span class="ml-1">{{ currentUser.score }}</span>
            </div>
            <span>{{ currentUser.student_id }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ myGoods.length }}</p>
            <p class="text-sm text-gray-500">发布商品</p>
          </div>
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Package class="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ myOrders.length }}</p>
            <p class="text-sm text-gray-500">订单数量</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <ShoppingCart class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ myComments.length }}</p>
            <p class="text-sm text-gray-500">评价数量</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <MessageSquare class="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 bg-white rounded-lg shadow-sm">
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="font-semibold text-gray-900">我发布的商品</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="good in myGoods" 
            :key="good.goods_id"
            class="flex space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div class="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="good.images" :alt="good.goods_name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium text-gray-900 truncate">{{ good.goods_name }}</h3>
              <p class="text-lg font-bold text-red-500">¥{{ good.price }}</p>
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                getStatusClass(good.status)
              ]">{{ good.status }}</span>
            </div>
          </div>
        </div>
        <div v-if="myGoods.length === 0" class="text-center py-8">
          <Package class="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-500">暂无发布商品</p>
        </div>
      </div>
    </div>
    <div class="mt-6 bg-white rounded-lg shadow-sm">
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="font-semibold text-gray-900">我的评价</h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div 
            v-for="comment in myComments" 
            :key="comment.comment_id"
            class="p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User class="h-5 w-5 text-primary-600" />
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-900">{{ getUserName(comment.to_uid) }}</span>
                  <div class="flex">
                    <Star 
                      v-for="i in 5" 
                      :key="i"
                      class="h-4 w-4"
                      :class="i <= comment.score ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                    />
                  </div>
                </div>
                <p class="text-gray-600 mt-1">{{ comment.content }}</p>
                <p class="text-sm text-gray-400 mt-1">{{ formatTime(comment.create_time) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="myComments.length === 0" class="text-center py-8">
          <MessageSquare class="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-500">暂无评价</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { User, Star, Package, ShoppingCart, MessageSquare } from 'lucide-vue-next'
import { users, goods, orders, comments } from '../data/mockData'

const currentUser = users[0]

const myGoods = computed(() => goods.filter(g => g.user_id === currentUser.user_id))
const myOrders = computed(() => orders.filter(o => o.buyer_id === currentUser.user_id || o.seller_id === currentUser.user_id))
const myComments = computed(() => comments.filter(c => c.from_uid === currentUser.user_id))

const getUserName = (id) => users.find(u => u.user_id === id)?.real_name || '未知用户'

const getStatusClass = (status) => {
  switch (status) {
    case '待审核': return 'bg-yellow-100 text-yellow-700'
    case '已上架': return 'bg-green-100 text-green-700'
    case '已下架': return 'bg-gray-100 text-gray-700'
    case '已售出': return 'bg-red-100 text-red-700'
    case '暂存（已联系）': return 'bg-blue-100 text-blue-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const formatTime = (time) => new Date(time).toLocaleString('zh-CN')
</script>
