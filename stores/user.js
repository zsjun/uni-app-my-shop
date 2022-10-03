// Pinia Store
import {
  defineStore
} from 'pinia'

export const useUserStore = defineStore("m_user", {
  // 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    // 用户的信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的 Object 对象
    redirectInfo: null
  }),
  getters: {
    // 收货地址
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
        .detailInfo
    }
  },
  // 方法
  actions: {
    // 更新收货地址
    updateAddress(address) {
      this.address = address
      this.saveAddressToStorage()
    },
    // 持久化存储 address
    saveAddressToStorage() {
      uni.setStorageSync('address', JSON.stringify(this.address))
    },
    updateUserInfo(userinfo) {
      this.userinfo = userinfo
      console.log(99999, userinfo)
      this.saveUserInfoToStorage()
    },
    saveUserInfoToStorage() {
      uni.setStorageSync('userinfo', JSON.stringify(this.userinfo))
    },
    updateToken(token) {
      this.token = token
      console.log(123456, token)
      this.saveTokenToStorage()
    },
    saveTokenToStorage() {
      uni.setStorageSync('token', this.token)
    },
    updateRedirectInfo(info) {
      this.redirectInfo = info
      console.log(this.redirectInfo)
    }
  }
})
