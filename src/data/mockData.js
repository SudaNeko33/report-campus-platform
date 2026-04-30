export const categories = [
  { category_id: 1, category_name: '电子产品', sort: 1, create_time: '2024-01-01 00:00:00' },
  { category_id: 2, category_name: '书籍教材', sort: 2, create_time: '2024-01-01 00:00:00' },
  { category_id: 3, category_name: '生活用品', sort: 3, create_time: '2024-01-01 00:00:00' },
  { category_id: 4, category_name: '体育用品', sort: 4, create_time: '2024-01-01 00:00:00' },
  { category_id: 5, category_name: '服装鞋包', sort: 5, create_time: '2024-01-01 00:00:00' },
  { category_id: 6, category_name: '其他物品', sort: 6, create_time: '2024-01-01 00:00:00' }
]

export const users = [
  { user_id: 1, username: 'zhangsan', password: 'emhhbmdzYW4xMjM=', real_name: '张三', student_id: '2021001', contact: 'zhangsan@qq.com', role: '学生', status: '正常', create_time: '2024-01-10 10:00:00', score: 4.8 },
  { user_id: 2, username: 'lisi', password: 'bGlzaTEyMw==', real_name: '李四', student_id: '2021002', contact: 'lisi_wechat', role: '学生', status: '正常', create_time: '2024-01-15 14:30:00', score: 4.5 },
  { user_id: 3, username: 'wangwu', password: 'd2FuZ3d1MTIz', real_name: '王五', student_id: '2021003', contact: 'wangwu_qq', role: '学生', status: '正常', create_time: '2024-02-01 09:00:00', score: 5.0 },
  { user_id: 4, username: 'admin', password: 'YWRtaW4xMjM=', real_name: '管理员', student_id: 'admin001', contact: 'admin@edu.cn', role: '管理员', status: '正常', create_time: '2024-01-01 00:00:00', score: 5.0 }
]

export const goods = [
  { goods_id: 1, user_id: 1, category_id: 1, goods_name: 'iPhone 14 Pro 256G', description: '使用一年，电池健康度92%，无磕碰，配件齐全', price: 5800, images: '/src/assets/iphone.webp', status: '已上架', create_time: '2024-03-01 10:00:00', update_time: '2024-03-01 10:00:00', campus: '邯郸' },
  { goods_id: 2, user_id: 1, category_id: 2, goods_name: '高等数学（第七版）上下册', description: '同济大学高等数学，无笔记，品相良好', price: 45, images: '/src/assets/mathbook.webp', status: '已上架', create_time: '2024-03-05 15:30:00', update_time: '2024-03-05 15:30:00', campus: '邯郸' },
  { goods_id: 3, user_id: 2, category_id: 3, goods_name: '宜家书桌', description: '白色简约书桌，尺寸120x60cm，可拆卸', price: 180, images: '/src/assets/desk.webp', status: '已上架', create_time: '2024-03-10 09:00:00', update_time: '2024-03-10 09:00:00', campus: '江湾' },
  { goods_id: 4, user_id: 2, category_id: 4, goods_name: '羽毛球拍套装', description: '尤尼克斯羽毛球拍，含球和拍套', price: 260, images: '/src/assets/badminton.webp', status: '已上架', create_time: '2024-03-12 11:00:00', update_time: '2024-03-12 11:00:00', campus: '张江' },
  { goods_id: 5, user_id: 3, category_id: 5, goods_name: 'Nike Air Force 1', description: '白色42码，穿过几次，几乎全新', price: 550, images: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20Nike%20Air%20Force%201%20sneakers&image_size=square', status: '已售出', create_time: '2024-02-28 14:00:00', update_time: '2024-03-08 16:00:00', campus: '枫林' },
  { goods_id: 6, user_id: 3, category_id: 1, goods_name: 'MacBook Air M2', description: '13.6英寸，8GB+256GB，带原装充电器', price: 7200, images: '/src/assets/macbook.jpg', status: '已上架', create_time: '2024-03-15 10:00:00', update_time: '2024-03-15 10:00:00', campus: '邯郸' },
  { goods_id: 7, user_id: 1, category_id: 3, goods_name: '小米台灯Pro', description: '护眼台灯，多种色温调节', price: 120, images: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=xiaomi%20desk%20lamp%20modern%20LED%20light&image_size=square', status: '暂存（已联系）', create_time: '2024-03-06 16:00:00', update_time: '2024-03-14 10:00:00', campus: '江湾' },
  { goods_id: 8, user_id: 2, category_id: 2, goods_name: '线性代数及其应用', description: '英文原版，适合双语教学使用', price: 85, images: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=linear%20algebra%20textbook%20english&image_size=square', status: '待审核', create_time: '2024-03-16 09:00:00', update_time: '2024-03-16 09:00:00', campus: '张江' },
  { goods_id: 9, user_id: 1, category_id: 2, goods_name: '剑桥雅思真题17', description: '全新未拆封，含听力音频二维码', price: 68, images: '/src/assets/englishbook.webp', status: '已上架', create_time: '2024-03-17 14:00:00', update_time: '2024-03-17 14:00:00', campus: '邯郸' },
  { goods_id: 10, user_id: 2, category_id: 3, goods_name: '海尔洗衣机', description: '8公斤全自动，使用两年，功能正常', price: 650, images: '/src/assets/washingmachine.jpg', status: '已上架', create_time: '2024-03-18 10:00:00', update_time: '2024-03-18 10:00:00', campus: '江湾' },
  { goods_id: 11, user_id: 3, category_id: 3, goods_name: '实木书桌', description: '橡木材质，带抽屉，尺寸140x70cm', price: 450, images: '/src/assets/desk.webp', status: '已上架', create_time: '2024-03-19 16:00:00', update_time: '2024-03-19 16:00:00', campus: '张江' },
  { goods_id: 12, user_id: 1, category_id: 1, goods_name: 'iPhone 15 Pro Max', description: '512GB原色钛金属，保修期内，几乎全新', price: 9800, images: '/src/assets/iphone.webp', status: '已上架', create_time: '2024-03-20 09:00:00', update_time: '2024-03-20 09:00:00', campus: '枫林' },
  { goods_id: 13, user_id: 2, category_id: 5, goods_name: '北面双肩背包', description: '大容量户外背包，防水面料，适合旅行', price: 380, images: '/src/assets/backpack.jpg', status: '已上架', create_time: '2024-03-21 11:00:00', update_time: '2024-03-21 11:00:00', campus: '邯郸' },
  { goods_id: 14, user_id: 3, category_id: 3, goods_name: '膳魔师保温杯', description: '500ml容量，不锈钢内胆，保温12小时', price: 150, images: '/src/assets/baowenbei.webp', status: '待审核', create_time: '2024-03-22 14:00:00', update_time: '2024-03-22 14:00:00', campus: '江湾' }
]

export const orders = [
  { order_id: 1, goods_id: 5, buyer_id: 2, seller_id: 3, status: '已完成', create_time: '2024-03-05 10:00:00', finish_time: '2024-03-08 16:00:00' },
  { order_id: 2, goods_id: 7, buyer_id: 3, seller_id: 1, status: '待交易', create_time: '2024-03-14 10:00:00', finish_time: null },
  { order_id: 3, goods_id: 1, buyer_id: 2, seller_id: 1, status: '已取消', create_time: '2024-03-02 15:00:00', finish_time: '2024-03-03 09:00:00' }
]

export const comments = [
  { comment_id: 1, order_id: 1, goods_id: 5, from_uid: 2, to_uid: 3, content: '鞋子成色很好，卖家很靠谱！', score: 5, create_time: '2024-03-08 17:00:00' },
  { comment_id: 2, order_id: 1, goods_id: 5, from_uid: 3, to_uid: 2, content: '买家很爽快，交易顺利', score: 5, create_time: '2024-03-08 17:30:00' },
  { comment_id: 3, order_id: 3, goods_id: 1, from_uid: 1, to_uid: 2, content: '买家临时改变主意', score: 3, create_time: '2024-03-03 10:00:00' }
]

export const campusOptions = ['邯郸', '江湾', '张江', '枫林']

export const goodsStatusOptions = ['待审核', '已上架', '已下架', '已售出', '暂存（已联系）']

export const orderStatusOptions = ['待交易', '已完成', '已取消']
