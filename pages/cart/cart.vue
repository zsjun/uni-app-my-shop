<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>

    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 循环渲染购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swipeItemClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"
            @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <!-- 使用自定义的结算组件 -->
    <my-settle></my-settle>
  </view>

  <!-- 空白购物车的区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script setup>
  import {
    reactive,
    ref,
    watch
  } from "vue"
  import {
    onLoad,
    onReachBottom,
    onPullDownRefresh
  } from '@dcloudio/uni-app'
  import {
    storeToRefs
  } from 'pinia'

  import {
    useCartStore
  } from '../../stores/cart'
  import {
    useUserStore
  } from "../../stores/user.js"
  import badgeMix from "../../hooks/badge.js"

  const store = useCartStore()
  const useStore = useUserStore()
  const {
    cart,
    total
  } = storeToRefs(store)
  // const {
  //   token
  // } = storeToRefs(useStore)
  badgeMix()


  const options = ref([{
    text: '删除', // 显示的文本内容
    style: {
      backgroundColor: '#C00000' // 按钮的背景颜色
    }
  }])
  // 点击了滑动操作按钮
  function swipeActionClickHandler(goods) {
    console.log(goods)
    store.removeGoodsById(goods.goods_id)
  }
  // 商品的勾选状态发生了变化
  function radioChangeHandler(valObj) {
    console.log(valObj) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
    store.updateGoodsState(val)
  }
  // 商品的数量发生了变化
  function numberChangeHandler(valObj) {
    store.updateGoodsCount(valObj)
    console.log(e)
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
