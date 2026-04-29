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
      <div 
        class="border-b border-gray-200 px-6 py-4 cursor-pointer flex items-center justify-between"
        @click="collapsePendingGoods = !collapsePendingGoods"
      >
        <h2 class="font-semibold text-gray-900">待审核商品</h2>
        <ChevronDown 
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': !collapsePendingGoods }"
        />
      </div>
      <transition name="collapse">
        <div v-show="!collapsePendingGoods" class="overflow-x-auto">
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
      </transition>
    </div>
    <div class="mt-6 bg-white rounded-lg shadow-sm">
      <div 
        class="border-b border-gray-200 px-6 py-4 cursor-pointer flex items-center justify-between"
        @click="collapseAllGoods = !collapseAllGoods"
      >
        <h2 class="font-semibold text-gray-900">所有商品列表</h2>
        <ChevronDown 
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': !collapseAllGoods }"
        />
      </div>
      <transition name="collapse">
        <div v-show="!collapseAllGoods" class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品信息</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布者</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">校区</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布时间</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="good in goods" :key="good.goods_id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      <img :src="good.images" :alt="good.goods_name" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ good.goods_name }}</p>
                      <p class="text-sm text-gray-500 line-clamp-1">{{ good.description }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{{ getCategoryName(good.category_id) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p class="text-sm text-gray-900">{{ getUserName(good.user_id) }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{{ good.campus }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-lg font-bold text-red-500">¥{{ good.price }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                  'px-3 py-1 text-sm rounded-full',
                  good.status === '已上架' ? 'bg-green-100 text-green-700' :
                  good.status === '待审核' ? 'bg-yellow-100 text-yellow-700' :
                  good.status === '已售出' ? 'bg-blue-100 text-blue-700' :
                  good.status === '暂存（已联系）' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                ]">{{ good.status }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ good.create_time }}</td>
            </tr>
            <tr v-if="goods.length === 0">
              <td colspan="7" class="px-6 py-8 text-center">
                <Package class="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p class="text-gray-500">暂无商品</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </transition>
    </div>

    <div class="mt-6 bg-white rounded-lg shadow-sm">
      <div 
        class="border-b border-gray-200 px-6 py-4 cursor-pointer flex items-center justify-between"
        @click="collapseOrders = !collapseOrders"
      >
        <h2 class="font-semibold text-gray-900">所有订单列表</h2>
        <ChevronDown 
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': !collapseOrders }"
        />
      </div>
      <transition name="collapse">
        <div v-show="!collapseOrders" class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品信息</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">买家</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">卖家</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">下单时间</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">完成时间</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.order_id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{{ order.order_id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden mr-3">
                      <img :src="getGoodsImage(order.goods_id)" :alt="getGoodsName(order.goods_id)" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ getGoodsName(order.goods_id) }}</p>
                      <p class="text-sm text-red-500">¥{{ getGoodsPrice(order.goods_id) }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p class="text-sm text-gray-900">{{ getUserName(order.buyer_id) }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p class="text-sm text-gray-900">{{ getUserName(order.seller_id) }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-lg font-bold text-red-500">¥{{ getGoodsPrice(order.goods_id) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-3 py-1 text-sm rounded-full',
                    order.status === '待交易' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === '已完成' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  ]">{{ order.status }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.create_time }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.finish_time || '-' }}</td>
              </tr>
              <tr v-if="orders.length === 0">
                <td colspan="8" class="px-6 py-8 text-center">
                  <ShoppingCart class="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p class="text-gray-500">暂无订单</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </transition>
    </div>

    <div class="mt-6 bg-white rounded-lg shadow-sm">
      <div 
        class="border-b border-gray-200 px-6 py-4 cursor-pointer flex items-center justify-between"
        @click="collapseUsers = !collapseUsers"
      >
        <h2 class="font-semibold text-gray-900">用户管理</h2>
        <ChevronDown 
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': !collapseUsers }"
        />
      </div>
      <transition name="collapse">
        <div v-show="!collapseUsers">
          <div class="px-6 py-4 flex items-center justify-between bg-gray-50">
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
                    <div class="flex space-x-2">
                      <button 
                        @click="openEditModal(user)"
                        class="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        编辑
                      </button>
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
                    </div>
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
        </transition>
    </div>

    <div 
      v-if="showEditModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeEditModal"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">编辑用户信息</h3>
          <button 
            @click="closeEditModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="px-6 py-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input 
              v-model="editingUser.username"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">真实姓名</label>
            <input 
              v-model="editingUser.real_name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">学号</label>
            <input 
              v-model="editingUser.student_id"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系方式</label>
            <input 
              v-model="editingUser.contact"
              type="text"
              placeholder="微信/QQ账号"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">角色</label>
            <select 
              v-model="editingUser.role"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="学生">学生</option>
              <option value="管理员">管理员</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">评分</label>
            <input 
              v-model.number="editingUser.score"
              type="number"
              min="0"
              max="5"
              step="0.1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

        </div>
        <div class="flex items-center justify-end px-6 py-4 border-t border-gray-200 space-x-3">
          <button 
            @click="closeEditModal"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            @click="saveUser"
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Package, Clock, Users, ShoppingCart, User, Star, Search, ChevronDown } from 'lucide-vue-next'
import { goods, users, categories, orders } from '../data/mockData'

const userSearchKeyword = ref('')
const showEditModal = ref(false)
const collapsePendingGoods = ref(false)
const collapseAllGoods = ref(false)
const collapseOrders = ref(false)
const collapseUsers = ref(false)
const editingUser = reactive({
  user_id: null,
  username: '',
  real_name: '',
  student_id: '',
  contact: '',
  role: '学生',
  score: 5.0,
  status: '正常'
})

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
const getGoodsName = (id) => goods.find(g => g.goods_id === id)?.goods_name || '未知商品'
const getGoodsImage = (id) => goods.find(g => g.goods_id === id)?.images || ''
const getGoodsPrice = (id) => goods.find(g => g.goods_id === id)?.price || 0

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

const openEditModal = (user) => {
  editingUser.user_id = user.user_id
  editingUser.username = user.username
  editingUser.real_name = user.real_name
  editingUser.student_id = user.student_id
  editingUser.contact = user.contact || ''
  editingUser.role = user.role
  editingUser.score = user.score
  editingUser.status = user.status
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveUser = () => {
  const user = users.find(u => u.user_id === editingUser.user_id)
  if (user) {
    user.username = editingUser.username
    user.real_name = editingUser.real_name
    user.student_id = editingUser.student_id
    user.contact = editingUser.contact
    user.role = editingUser.role
    user.score = editingUser.score
    alert(`用户 "${user.username}" (${user.real_name}) 信息已更新！`)
    closeEditModal()
  }
}
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 2000px;
  opacity: 1;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
