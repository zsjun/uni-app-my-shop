<template>
  <view>
    Cart
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
  import badgeMix from "../../hooks/badge.js"

  const store = useCartStore()
  const {
    cart,
    name,
    total
  } = storeToRefs(store)
  badgeMix()
</script>

<style lang="scss">

</style>
