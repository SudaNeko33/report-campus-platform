import { reactive, watch } from 'vue'
import { categories as initialCategories, users as initialUsers, goods as initialGoods, orders as initialOrders, comments as initialComments, campusOptions, goodsStatusOptions, orderStatusOptions } from './mockData.js'

const STORAGE_KEYS = {
  USERS: 'campus_trade_users',
  GOODS: 'campus_trade_goods',
  ORDERS: 'campus_trade_orders',
  COMMENTS: 'campus_trade_comments'
}

function loadFromStorage(key, initialValue) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e)
  }
  return [...initialValue]
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e)
  }
}

export const categories = reactive([...initialCategories])

export const users = reactive(loadFromStorage(STORAGE_KEYS.USERS, initialUsers))
watch(users, (newVal) => saveToStorage(STORAGE_KEYS.USERS, newVal), { deep: true })

export const goods = reactive(loadFromStorage(STORAGE_KEYS.GOODS, initialGoods))
watch(goods, (newVal) => saveToStorage(STORAGE_KEYS.GOODS, newVal), { deep: true })

export const orders = reactive(loadFromStorage(STORAGE_KEYS.ORDERS, initialOrders))
watch(orders, (newVal) => saveToStorage(STORAGE_KEYS.ORDERS, newVal), { deep: true })

export const comments = reactive(loadFromStorage(STORAGE_KEYS.COMMENTS, initialComments))
watch(comments, (newVal) => saveToStorage(STORAGE_KEYS.COMMENTS, newVal), { deep: true })

export { campusOptions, goodsStatusOptions, orderStatusOptions }

export function resetData() {
  localStorage.removeItem(STORAGE_KEYS.USERS)
  localStorage.removeItem(STORAGE_KEYS.GOODS)
  localStorage.removeItem(STORAGE_KEYS.ORDERS)
  localStorage.removeItem(STORAGE_KEYS.COMMENTS)
  
  while (users.length > 0) users.pop()
  initialUsers.forEach(u => users.push({ ...u }))
  
  while (goods.length > 0) goods.pop()
  initialGoods.forEach(g => goods.push({ ...g }))
  
  while (orders.length > 0) orders.pop()
  initialOrders.forEach(o => orders.push({ ...o }))
  
  while (comments.length > 0) comments.pop()
  initialComments.forEach(c => comments.push({ ...c }))
  
  console.log('Data reset to initial state')
}
