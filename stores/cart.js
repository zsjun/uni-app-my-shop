// Pinia Store
import {
  defineStore
} from 'pinia'
export const useCartStore = defineStore("m_cart", {
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || `[]`),
    name: "zsj"
  }),
  getters: {
    // 购物车中所有商品的总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return 
      return state.cart.reduce((allNumber, item) => allNumber += item.goods_count, 0)
    },
    // 购物车中已勾选商品的总数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 已勾选商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item
        .goods_price, 0).toFixed(2)
    }
  },
  actions: {
    addToCart(goods) {
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      const findResult = this.cart.find((x) => x.goods_id === goods.goods_id)
      console.log(8899, this.cart)
      if (!findResult) {
        // 如果购物车中没有这件商品，则直接 push
        this.cart.push(goods)
        console.log(11111, this.cart)
      } else {
        // 如果购物车中有这件商品，则只更新数量即可
        findResult.goods_count++
      }
      this.saveToStorage()
    },
    saveToStorage() {
      uni.setStorageSync('cart', JSON.stringify(this.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(goods) {
      const findResult = this.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.saveToStorage()
      }
    },
    // 更新商品的数量
    updateGoodsCount(goods) {
      const findResult = this.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.saveToStorage()
      }
    },
    // 根据 Id 删除对应的商品
    removeGoodsById(goods_id) {
      this.cart = this.cart.filter(x => x.goods_id !== goods_id)
      this.saveToStorage()
    },
    // 更新购物车中所有商品的勾选状态
    updateAllGoodsState(newState) {
      this.cart.forEach(x => x.goods_state = newState)
      this.saveToStorage()
    },
    // easily reset state using `$reset`
    clearUser() {
      this.$reset()
    }
  }
})
