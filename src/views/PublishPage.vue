<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">发布商品</h1>
    <div class="bg-white rounded-lg shadow-sm p-6">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">商品名称</label>
          <input 
            v-model="form.goods_name"
            type="text" 
            placeholder="请输入商品名称"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">商品分类</label>
          <select 
            v-model="form.category_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">请选择分类</option>
            <option v-for="cat in categories" :key="cat.category_id" :value="cat.category_id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">商品描述</label>
          <textarea 
            v-model="form.description"
            rows="4"
            placeholder="请输入商品描述"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          ></textarea>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">价格</label>
          <div class="flex items-center">
            <span class="text-gray-500 mr-2">¥</span>
            <input 
              v-model.number="form.price"
              type="number" 
              min="0"
              step="0.01"
              placeholder="请输入价格"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">所在校区</label>
          <div class="grid grid-cols-4 gap-3">
            <button 
              v-for="campus in campusOptions" 
              :key="campus"
              type="button"
              @click="form.campus = campus"
              :class="[
                'px-4 py-2 rounded-lg border transition-colors',
                form.campus === campus 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              ]"
            >
              {{ campus }}
            </button>
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">商品图片</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImagePlus class="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500 mb-2">点击或拖拽上传图片</p>
            <p class="text-sm text-gray-400">支持 JPG、PNG 格式，最大 5MB</p>
            <input 
              type="text" 
              v-model="form.images"
              placeholder="请输入图片URL（演示用）"
              class="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div class="flex space-x-4">
          <button 
            type="button"
            @click="$router.push('/')"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            type="submit"
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            发布商品
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ImagePlus } from 'lucide-vue-next'
import { categories, campusOptions, goods } from '../data/store'
import { useUser } from '../composables/useUser'

defineEmits(['back'])

const { currentUser } = useUser()

const form = reactive({
  goods_name: '',
  category_id: '',
  description: '',
  price: '',
  campus: '邯郸',
  images: ''
})

const handleSubmit = () => {
  if (!currentUser.value) {
    alert('请先登录！')
    return
  }
  
  if (!form.images) {
    form.images = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=secondhand%20goods%20product%20photo&image_size=square'
  }
  
  const newGoods = {
    goods_id: goods.length > 0 ? Math.max(...goods.map(g => g.goods_id)) + 1 : 1,
    user_id: currentUser.value.user_id,
    category_id: form.category_id,
    goods_name: form.goods_name,
    description: form.description,
    price: form.price,
    images: form.images,
    campus: form.campus,
    status: '待审核',
    create_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
    update_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  
  goods.push(newGoods)
  
  alert('商品发布成功！等待审核')
  
  form.goods_name = ''
  form.category_id = ''
  form.description = ''
  form.price = ''
  form.campus = '邯郸'
  form.images = ''
}
</script>
