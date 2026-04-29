<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
          <ShoppingBag class="h-8 w-8 text-primary-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">登录账户</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          还没有账户？
          <button @click="$emit('navigate', 'register')" class="font-medium text-primary-600 hover:text-primary-500">
           立即注册
          </button>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="用户名"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="密码"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBag } from 'lucide-vue-next'
import { useUser } from '../composables/useUser'

const emit = defineEmits(['navigate', 'loginSuccess'])

const { login } = useUser()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''

  if (!username.value || !password.value) {
    errorMessage.value = '请填写用户名和密码'
    return
  }

  const result = login(username.value, password.value)

  if (result.success) {
    emit('loginSuccess', result.user)
  } else {
    errorMessage.value = result.message
  }
}
</script>
