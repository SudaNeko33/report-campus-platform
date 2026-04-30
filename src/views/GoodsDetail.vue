<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button @click="$router.back()" class="flex items-center text-gray-600 hover:text-gray-900 mb-6">
      <ArrowLeft class="h-5 w-5 mr-2" />
      返回列表
    </button>
    <div v-if="goods" class="bg-white rounded-lg shadow-sm overflow-hidden">
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
            <div
              @click="goToSellerProfile"
              class="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 -m-2 transition-colors"
            >
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
              <ExternalLink class="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div class="flex space-x-4">
            <button
              v-if="!isOwner && goods.status === '已上架'"
              @click="showConfirmModal = true"
              class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <ShoppingCart class="h-5 w-5" />
              <span>我想要</span>
            </button>
            <button
              v-if="!isOwner && goods.status !== '已上架'"
              disabled
              class="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            >
              {{ goods.status }}
            </button>
          </div>
          <div v-if="isOwner" class="flex space-x-4 mt-4">
            <button
              @click="openEditModal"
              class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit class="h-5 w-5" />
              <span>编辑商品</span>
            </button>
            <button
              @click="handleRemove"
              class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Trash2 class="h-5 w-5" />
              <span>下架商品</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
      <p class="text-gray-500">商品不存在</p>
    </div>

    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="font-semibold text-gray-900">编辑商品</h2>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
            <X class="h-5 w-5" />
          </button>
        </div>
        <form @submit.prevent="handleEdit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">商品名称</label>
            <input
              v-model="editForm.goods_name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">商品分类</label>
            <select
              v-model="editForm.category_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option v-for="cat in categories" :key="cat.category_id" :value="cat.category_id">
                {{ cat.category_name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">商品描述</label>
            <textarea
              v-model="editForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">价格</label>
            <input
              v-model.number="editForm.price"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">所在校区</label>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="campus in campusOptions"
                :key="campus"
                type="button"
                @click="editForm.campus = campus"
                :class="[
                  'px-3 py-1 text-sm rounded-lg border transition-colors',
                  editForm.campus === campus
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ campus }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">商品图片</label>
            <input
              v-model="editForm.images"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closeEditModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="border-b border-gray-200 px-6 py-4">
          <h2 class="font-semibold text-gray-900">确认购买</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="goods?.images" :alt="goods?.goods_name" class="w-full h-full object-cover" />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ goods?.goods_name }}</p>
              <p class="text-red-500 font-bold text-lg">¥{{ goods?.price }}</p>
            </div>
          </div>
          <p class="text-gray-600 mb-6">确认购买此商品？确认后将与卖家交换联系方式。</p>
          <div class="flex space-x-4">
            <button
              @click="showConfirmModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
            <button
              @click="confirmBuy"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              确认购买
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showContactModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="font-semibold text-gray-900">卖家联系方式</h2>
          <button @click="showContactModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-5 w-5" />
          </button>
        </div>
        <div class="p-6">
          <div class="bg-green-50 rounded-lg p-4 mb-6">
            <p class="text-green-700 font-medium mb-2">订单已创建！</p>
            <p class="text-green-600 text-sm">商品状态已更新为"暂存（已联系）"</p>
          </div>
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <User class="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p class="text-sm text-gray-500">卖家</p>
                <p class="font-medium text-gray-900">{{ maskName(getUserName(goods?.user_id)) }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <MessageCircle class="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p class="text-sm text-gray-500">联系方式</p>
                <p class="font-medium text-gray-900">{{ sellerContact }}</p>
              </div>
            </div>
          </div>
          <button
            @click="showContactModal = false"
            class="w-full mt-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, User, Star, MessageCircle, ShoppingCart, Edit, Trash2, X, ExternalLink } from 'lucide-vue-next'
import { goods as goodsData, categories, users, orders, campusOptions, getUserScore } from '../data/store'
import { useUser } from '../composables/useUser'

const { currentUser } = useUser()
const route = useRoute()

const showEditModal = ref(false)
const showConfirmModal = ref(false)
const showContactModal = ref(false)

const goods = computed(() => {
  const id = parseInt(route.params.id)
  return goodsData.find(g => g.goods_id === id)
})

const isOwner = computed(() => {
  if (!currentUser.value || !goods.value) return false
  return currentUser.value.user_id === goods.value.user_id
})

const editForm = reactive({
  goods_name: '',
  category_id: '',
  description: '',
  price: '',
  campus: '',
  images: ''
})

watch(goods, (newGoods) => {
  if (newGoods) {
    editForm.goods_name = newGoods.goods_name
    editForm.category_id = newGoods.category_id
    editForm.description = newGoods.description
    editForm.price = newGoods.price
    editForm.campus = newGoods.campus || '邯郸'
    editForm.images = newGoods.images
  }
}, { immediate: true })

const statusClass = computed(() => {
  if (!goods.value) return 'bg-gray-100 text-gray-700'
  switch (goods.value.status) {
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

const maskName = (name) => {
  if (!name || name.length <= 1) return name
  return name[0] + '*'.repeat(name.length - 1)
}
const getUserStudentId = (id) => {
  const studentId = users.find(u => u.user_id === id)?.student_id || ''
  if (!studentId || studentId.length <= 2) return studentId
  return studentId.substring(0, 2) + '*'.repeat(studentId.length - 2)
}

const sellerContact = computed(() => {
  if (!goods.value) return ''
  const user = users.find(u => u.user_id === goods.value.user_id)
  return user?.contact || '未提供'
})

const formatTime = (time) => new Date(time).toLocaleString('zh-CN')

const confirmBuy = () => {
  showConfirmModal.value = false
  
  const good = goodsData.find(g => g.goods_id === goods.value.goods_id)
  if (good) {
    good.status = '暂存（已联系）'
    good.update_time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  const newOrder = {
    order_id: orders.length > 0 ? Math.max(...orders.map(o => o.order_id)) + 1 : 1,
    goods_id: goods.value.goods_id,
    buyer_id: currentUser.value.user_id,
    seller_id: goods.value.user_id,
    status: '待交易',
    buyer_confirmed: false,
    seller_confirmed: false,
    create_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
    finish_time: null
  }

  orders.push(newOrder)

  showContactModal.value = true
}

const openEditModal = () => {
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const handleEdit = () => {
  if (!editForm.campus) {
    alert('请选择校区！')
    return
  }

  const good = goodsData.find(g => g.goods_id === goods.value.goods_id)
  if (good) {
    good.goods_name = editForm.goods_name
    good.category_id = editForm.category_id
    good.description = editForm.description
    good.price = editForm.price
    good.campus = editForm.campus
    good.images = editForm.images || good.images
    good.update_time = new Date().toISOString().slice(0, 19).replace('T', ' ')

    alert('商品信息已更新！')
    closeEditModal()
  }
}

const handleRemove = () => {
  if (confirm('确定要下架该商品吗？')) {
    const good = goodsData.find(g => g.goods_id === goods.value.goods_id)
    if (good) {
      good.status = '已下架'
      good.update_time = new Date().toISOString().slice(0, 19).replace('T', ' ')
      alert('商品已下架！')
    }
  }
}

const goToSellerProfile = () => {
  if (goods.value) {
    window.location.href = `/profile/${goods.value.user_id}`
  }
}
</script>
