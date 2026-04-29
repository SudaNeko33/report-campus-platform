import { ref, computed } from 'vue'
import { users } from '../data/mockData'

const currentUser = ref(null)

export function useUser() {
  const encryptPassword = (password) => {
    return btoa(password)
  }

  const decryptPassword = (encryptedPassword) => {
    try {
      return atob(encryptedPassword)
    } catch {
      return null
    }
  }

  const login = (username, password) => {
    const user = users.find(u => u.username === username)
    if (!user) {
      return { success: false, message: '用户名不存在' }
    }

    const decryptedPassword = decryptPassword(user.password)
    if (decryptedPassword !== password) {
      return { success: false, message: '密码错误' }
    }

    if (user.status !== '正常') {
      return { success: false, message: '账号已被禁用' }
    }

    currentUser.value = user
    localStorage.setItem('currentUser', JSON.stringify(user))
    return { success: true, message: '登录成功', user }
  }

  const register = (userData) => {
    const existingUser = users.find(
      u => u.username === userData.username || u.student_id === userData.student_id
    )

    if (existingUser) {
      if (existingUser.username === userData.username) {
        return { success: false, message: '用户名已存在' }
      }
      if (existingUser.student_id === userData.student_id) {
        return { success: false, message: '学号已被注册' }
      }
    }

    const newUser = {
      user_id: users.length > 0 ? Math.max(...users.map(u => u.user_id)) + 1 : 1,
      username: userData.username,
      password: encryptPassword(userData.password),
      real_name: userData.real_name,
      student_id: userData.student_id,
      contact: userData.contact || '',
      role: '学生',
      status: '正常',
      create_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
      score: 5.0
    }

    users.push(newUser)
    currentUser.value = newUser
    localStorage.setItem('currentUser', JSON.stringify(newUser))

    return { success: true, message: '注册成功', user: newUser }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
      return true
    }
    return false
  }

  const isLoggedIn = computed(() => !!currentUser.value)

  return {
    currentUser,
    isLoggedIn,
    login,
    register,
    logout,
    checkAuth
  }
}
