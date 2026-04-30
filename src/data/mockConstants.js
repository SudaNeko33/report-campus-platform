import { comments } from './mockComments.js'

export const categories = [
  { category_id: 1, category_name: '电子产品', sort: 1, create_time: '2024-01-01 00:00:00' },
  { category_id: 2, category_name: '书籍教材', sort: 2, create_time: '2024-01-01 00:00:00' },
  { category_id: 3, category_name: '生活用品', sort: 3, create_time: '2024-01-01 00:00:00' },
  { category_id: 4, category_name: '体育用品', sort: 4, create_time: '2024-01-01 00:00:00' },
  { category_id: 5, category_name: '服装鞋包', sort: 5, create_time: '2024-01-01 00:00:00' },
  { category_id: 6, category_name: '其他物品', sort: 6, create_time: '2024-01-01 00:00:00' }
]

export const campusOptions = ['邯郸', '江湾', '张江', '枫林']

export const goodsStatusOptions = ['待审核', '已上架', '已下架', '已售出', '暂存（已联系）']

export const orderStatusOptions = ['待交易', '已完成', '已取消']

export const getUserScore = (userId) => {
  const userComments = comments.filter(c => c.to_uid === userId)
  if (userComments.length === 0) return 0
  const totalScore = userComments.reduce((sum, c) => sum + c.score, 0)
  return (totalScore / userComments.length).toFixed(1)
}