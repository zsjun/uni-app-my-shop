<template>
  <view class="my-container">

    <!-- 用户未登录时，显示登录组件 -->
    <my-login v-if="!token"></my-login>

    <!-- 用户登录后，显示用户信息组件 -->
    <my-userinfo v-else></my-userinfo>

  </view>
</template>

<script setup>
  import {
    storeToRefs
  } from 'pinia'

  import {
    useUserStore
  } from '../../stores/user'
  import badgeMix from "../../hooks/badge.js"

  const store = useUserStore()
  const {
    token
  } = storeToRefs(store)
  badgeMix()
  console.log(999, token)
</script>

<style lang="scss">
  page,
  .my-container {
    height: 100%;
  }
</style>
