<template>
  <div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">我的订单</h1>
      <div class="flex space-x-4 mb-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            activeTab === tab.key 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          {{ tab.label }}
          <span v-if="getTabCount(tab.key) > 0" class="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
            {{ getTabCount(tab.key) }}
          </span>
        </button>
      </div>
      <div class="space-y-4">
        <div 
          v-for="order in filteredOrders" 
          :key="order.order_id"
          class="bg-white rounded-lg shadow-sm p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-500">订单编号：{{ order.order_id }}</span>
            <span :class="[
              'text-sm font-medium',
              getStatusClass(order.status)
            ]">{{ order.status }}</span>
          </div>
          <div class="flex space-x-4">
            <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="getGoods(order.goods_id)?.images" :alt="getGoods(order.goods_id)?.goods_name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium text-gray-900 mb-2">{{ getGoods(order.goods_id)?.goods_name }}</h3>
              <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span>卖家：{{ getUserName(order.seller_id) }}</span>
                <span>买家：{{ getUserName(order.buyer_id) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-red-500">¥{{ getGoods(order.goods_id)?.price }}</span>
                <div class="flex space-x-2">
                  <button 
                    v-if="order.status === '待交易'"
                    @click="handleComplete(order.order_id)"
                    class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    确认完成
                  </button>
                  <button 
                    v-if="order.status === '待交易'"
                    @click="handleCancel(order.order_id)"
                    class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消订单
                  </button>
                  <button 
                    v-if="order.status === '已完成' && !hasCommented(order.order_id)"
                    @click="handleComment(order.order_id)"
                    class="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    去评价
                  </button>
                  <span 
                    v-if="order.status === '已完成' && hasCommented(order.order_id)"
                    class="px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg"
                  >
                    已评价
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>创建时间：{{ formatTime(order.create_time) }}</span>
            <span v-if="order.finish_time">完成时间：{{ formatTime(order.finish_time) }}</span>
          </div>
        </div>
        <div v-if="filteredOrders.length === 0" class="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">暂无{{ tabs.find(t => t.key === activeTab)?.label }}订单</p>
        </div>
      </div>
    </div>

    <div v-if="showCommentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="font-semibold text-gray-900">评价</h2>
          <button @click="closeCommentModal" class="text-gray-400 hover:text-gray-600">
            <X class="h-5 w-5" />
          </button>
        </div>
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
              <img :src="getGoods(commentForm.goods_id)?.images" :alt="getGoods(commentForm.goods_id)?.goods_name" class="w-full h-full object-cover" />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ getGoods(commentForm.goods_id)?.goods_name }}</p>
              <p class="text-sm text-gray-500">评价对象：{{ getUserName(commentForm.target_id) }}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">评分</label>
            <div class="flex space-x-2">
              <button 
                v-for="star in 5" 
                :key="star"
                @click="setRating(star)"
                class="text-3xl transition-colors hover:scale-110"
                :class="star <= commentForm.score ? 'text-yellow-400' : 'text-gray-300'"
              >
                ★
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              {{ ratingText }}
            </p>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">评价内容</label>
            <textarea 
              v-model="commentForm.content"
              rows="4"
              placeholder="请输入您的评价..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            ></textarea>
          </div>
          
          <div class="flex space-x-4">
            <button 
              @click="closeCommentModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button 
              @click="submitComment"
              class="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              提交评价
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Package, X } from 'lucide-vue-next'
import { orders, goods, users, comments } from '../data/store'

const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  }
})

const activeTab = ref('all')
const showCommentModal = ref(false)

const commentForm = reactive({
  order_id: null,
  goods_id: null,
  target_id: null,
  score: 5,
  content: ''
})

const ratingText = computed(() => {
  switch (commentForm.score) {
    case 1: return '很差'
    case 2: return '较差'
    case 3: return '一般'
    case 4: return '满意'
    case 5: return '非常满意'
    default: return ''
  }
})

const tabs = [
  { key: 'all', label: '全部订单' },
  { key: 'pending', label: '待交易' },
  { key: 'completed', label: '已完成' },
  { key: 'cancelled', label: '已取消' }
]

const userOrders = computed(() => {
  if (!props.currentUser) return []
  const userId = props.currentUser.user_id
  return orders.filter(o => o.buyer_id === userId || o.seller_id === userId)
})

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return userOrders.value
  if (activeTab.value === 'pending') return userOrders.value.filter(o => o.status === '待交易')
  if (activeTab.value === 'completed') return userOrders.value.filter(o => o.status === '已完成' || o.status === '已评价')
  if (activeTab.value === 'cancelled') return userOrders.value.filter(o => o.status === '已取消')
  return userOrders.value
})

const getTabCount = (key) => {
  if (key === 'all') return userOrders.value.length
  if (key === 'pending') return userOrders.value.filter(o => o.status === '待交易').length
  if (key === 'completed') return userOrders.value.filter(o => o.status === '已完成' || o.status === '已评价').length
  if (key === 'cancelled') return userOrders.value.filter(o => o.status === '已取消').length
  return 0
}

const getGoods = (id) => goods.find(g => g.goods_id === id)
const getUserName = (id) => users.find(u => u.user_id === id)?.real_name || '未知用户'

const getStatusClass = (status) => {
  switch (status) {
    case '待交易': return 'text-yellow-600'
    case '已完成': return 'text-green-600'
    case '已评价': return 'text-blue-600'
    case '已取消': return 'text-gray-500'
    default: return 'text-gray-500'
  }
}

const formatTime = (time) => new Date(time).toLocaleString('zh-CN')

const hasCommented = (orderId) => {
  const userId = props.currentUser.user_id
  return comments.some(c => c.order_id === orderId && c.from_uid === userId)
}

const handleComplete = (id) => {
  const order = orders.find(o => o.order_id === id)
  if (order) {
    order.status = '已完成'
    order.finish_time = new Date().toISOString().slice(0, 19).replace('T', ' ')
    
    const good = goods.find(g => g.goods_id === order.goods_id)
    if (good) {
      good.status = '已售出'
    }
  }
}

const handleCancel = (id) => {
  const order = orders.find(o => o.order_id === id)
  if (order) {
    order.status = '已取消'
    order.finish_time = new Date().toISOString().slice(0, 19).replace('T', ' ')
    
    const good = goods.find(g => g.goods_id === order.goods_id)
    if (good) {
      good.status = '已上架'
    }
    
    alert(`订单 ${id} 已取消！`)
  }
}

const handleComment = (id) => {
  const order = orders.find(o => o.order_id === id)
  if (order) {
    commentForm.order_id = order.order_id
    commentForm.goods_id = order.goods_id
    
    const userId = props.currentUser.user_id
    commentForm.target_id = userId === order.buyer_id ? order.seller_id : order.buyer_id
    
    commentForm.score = 5
    commentForm.content = ''
    showCommentModal.value = true
  }
}

const closeCommentModal = () => {
  showCommentModal.value = false
}

const setRating = (star) => {
  commentForm.score = star
}

const submitComment = () => {
  if (commentForm.score === 0) {
    alert('请选择评分！')
    return
  }
  if (!commentForm.content.trim()) {
    alert('请输入评价内容！')
    return
  }
  
  const currentUserId = props.currentUser.user_id
  
  const newComment = {
    comment_id: comments.length > 0 ? Math.max(...comments.map(c => c.comment_id)) + 1 : 1,
    order_id: commentForm.order_id,
    goods_id: commentForm.goods_id,
    from_uid: currentUserId,
    to_uid: commentForm.target_id,
    content: commentForm.content.trim(),
    score: commentForm.score,
    create_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  
  comments.push(newComment)
  
  const seller = users.find(u => u.user_id === commentForm.target_id)
  if (seller) {
    const sellerComments = comments.filter(c => c.to_uid === commentForm.target_id)
    const totalScore = sellerComments.reduce((sum, c) => sum + c.score, 0)
    seller.score = sellerComments.length > 0 ? (totalScore / sellerComments.length).toFixed(1) : 0
  }
  
  closeCommentModal()
}
</script>
