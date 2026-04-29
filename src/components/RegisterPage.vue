<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
          <UserPlus class="h-8 w-8 text-primary-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">注册新账户</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          已有账户？
          <button @click="$emit('navigate', 'login')" class="font-medium text-primary-600 hover:text-primary-500">
            立即登录
          </button>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="请输入用户名"
            />
          </div>

          <div class="mt-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="请输入密码"
            />
          </div>

          <div class="mt-4">
            <label for="real_name" class="block text-sm font-medium text-gray-700 mb-1">真实姓名</label>
            <input
              id="real_name"
              v-model="formData.real_name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="请输入真实姓名"
            />
          </div>

          <div class="mt-4">
            <label for="student_id" class="block text-sm font-medium text-gray-700 mb-1">学号</label>
            <input
              id="student_id"
              v-model="formData.student_id"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="请输入学号"
            />
          </div>

          <div class="mt-4">
            <label for="contact" class="block text-sm font-medium text-gray-700 mb-1">联系方式（微信/QQ）</label>
            <input
              id="contact"
              v-model="formData.contact"
              type="text"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="请输入微信或QQ账号（选填）"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="text-green-500 text-sm text-center">
          {{ successMessage }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            注册
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserPlus } from 'lucide-vue-next'
import { useUser } from '../composables/useUser'

const emit = defineEmits(['navigate', 'registerSuccess'])

const { register } = useUser()

const formData = ref({
  username: '',
  password: '',
  real_name: '',
  student_id: '',
  contact: ''
})

const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!formData.value.username || !formData.value.password || !formData.value.real_name || !formData.value.student_id) {
    errorMessage.value = '请填写所有必填项'
    return
  }

  if (formData.value.password.length < 6) {
    errorMessage.value = '密码长度至少为6位'
    return
  }

  const result = register(formData.value)

  if (result.success) {
    successMessage.value = '注册成功！正在跳转...'
    setTimeout(() => {
      emit('registerSuccess', result.user)
    }, 1500)
  } else {
    errorMessage.value = result.message
  }
}
</script>
