<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">管理后台</h1>
      <span class="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">管理员</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ goods.length }}</p>
            <p class="text-sm text-gray-500">商品总数</p>
          </div>
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Package class="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ pendingGoods }}</p>
            <p class="text-sm text-gray-500">待审核</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock class="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
            <p class="text-sm text-gray-500">用户总数</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Users class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ orders.length }}</p>
            <p class="text-sm text-gray-500">订单总数</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <ShoppingCart class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm">
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="font-semibold text-gray-900">待审核商品</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品信息</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布者</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">校区</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="good in goods.filter(g => g.status === '待审核')" :key="good.goods_id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-4">
                    <img :src="good.images" :alt="good.goods_name" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ good.goods_name }}</p>
                    <p class="text-sm text-gray-500">{{ getCategoryName(good.category_id) }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-900">{{ getUserName(good.user_id) }}</p>
                <p class="text-sm text-gray-500">{{ getUserStudentId(good.user_id) }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{{ good.campus }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-lg font-bold text-red-500">¥{{ good.price }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button 
                    @click="handleApprove(good.goods_id)"
                    class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    审核通过
                  </button>
                  <button 
                    @click="handleReject(good.goods_id)"
                    class="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    拒绝
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="pendingGoods === 0">
              <td colspan="5" class="px-6 py-8 text-center">
                <Package class="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p class="text-gray-500">暂无待审核商品</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-6 bg-white rounded-lg shadow-sm">
      <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 class="font-semibold text-gray-900">用户管理</h2>
        <div class="relative">
          <input 
            v-model="userSearchKeyword"
            type="text" 
            placeholder="搜索用户名/姓名/学号..."
            class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户信息</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学号</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">联系方式</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">评分</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.user_id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.user_id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="font-medium text-gray-900">{{ user.username }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <User class="h-5 w-5 text-primary-600" />
                  </div>
                  <p class="font-medium text-gray-900">{{ user.real_name }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.student_id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.contact || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-3 py-1 text-sm rounded-full',
                  user.role === '管理员' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                ]">{{ user.role }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Star class="h-4 w-4 text-yellow-400" />
                  <span class="ml-1 text-gray-900">{{ user.score }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-3 py-1 text-sm rounded-full',
                  user.status === '正常' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]">{{ user.status }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.create_time }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button 
                  @click="toggleUserStatus(user.user_id, user.status)"
                  :class="[
                    'px-4 py-2 text-sm rounded-lg transition-colors',
                    user.status === '正常' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  ]"
                >
                  {{ user.status === '正常' ? '封禁' : '解封' }}
                </button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="10" class="px-6 py-8 text-center">
                <Users class="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p class="text-gray-500">未找到匹配的用户</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Package, Clock, Users, ShoppingCart, User, Star, Search } from 'lucide-vue-next'
import { goods, users, categories, orders } from '../data/mockData'

const userSearchKeyword = ref('')

const pendingGoods = computed(() => goods.filter(g => g.status === '待审核').length)

const filteredUsers = computed(() => {
  if (!userSearchKeyword.value) return users
  const keyword = userSearchKeyword.value.toLowerCase()
  return users.filter(user => 
    user.username.toLowerCase().includes(keyword) ||
    user.real_name.toLowerCase().includes(keyword) ||
    user.student_id.toLowerCase().includes(keyword)
  )
})

const getCategoryName = (id) => categories.find(c => c.category_id === id)?.category_name || '未知分类'
const getUserName = (id) => users.find(u => u.user_id === id)?.real_name || '未知用户'
const getUserStudentId = (id) => users.find(u => u.user_id === id)?.student_id || ''

const handleApprove = (id) => {
  const good = goods.find(g => g.goods_id === id)
  if (good) {
    good.status = '已上架'
    alert(`商品 "${good.goods_name}" 审核通过！`)
  }
}

const handleReject = (id) => {
  const good = goods.find(g => g.goods_id === id)
  if (good) {
    good.status = '已下架'
    alert(`商品 "${good.goods_name}" 已拒绝！`)
  }
}

const toggleUserStatus = (id, status) => {
  const user = users.find(u => u.user_id === id)
  if (user) {
    const newStatus = status === '正常' ? '封禁' : '正常'
    user.status = newStatus
    alert(`用户 "${user.username}" (${user.real_name}) 已${newStatus}！`)
  }
}
</script>
