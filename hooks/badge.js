import {
  watch,
  watchEffect
} from "vue"
import {
  onShow,
} from '@dcloudio/uni-app'
import {
  storeToRefs
} from 'pinia'

import {
  useCartStore
} from '../stores/cart'
export default function() {
  const store = useCartStore()
  const {
    total
  } = storeToRefs(store)
  onShow(() => {
    // 在页面刚展示的时候，设置数字徽标
    setBadge()
  })
  watch(total, () => {
    // 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽章赋值
    setBadge()
  })
  // watchEffect(() => {
  //   // 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽章赋值
  //   console.log(99999999, store.total, total)
  //   setBadge()
  // })

  function setBadge() {
    // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
    uni.setTabBarBadge({
      index: 2, // 索引
      text: store.total + '' // 注意：text 的值必须是字符串，不能是数字
    })
  }
  return setBadge
}
