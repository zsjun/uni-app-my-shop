<template>
  <view class="my-search-container" :style="{'background-color': props.prbgcolor}">
    <view class="my-search-box" :style="{'border-radius': props.radius + 'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad,
  } from '@dcloudio/uni-app'
  import {
    reactive,
    ref
  } from "vue"
  const wh = ref(0)
  const props = defineProps({
    bgcolor: {
      type: String,
      default: '#C00000'
    },
    // 圆角尺寸
    radius: {
      type: Number,
      // 单位是 px
      default: 18
    }
  })
  const $emit = defineEmits(["click"])
  onLoad(() => {
    const sysInfo = uni.getSystemInfoSync()
    // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
    wh.value = sysInfo.windowHeight - 50
  })
  // 点击了模拟的 input 输入框
  function searchBoxHandler() {
    // 触发外界通过 @click 绑定的 click 事件处理函数
    $emit('click')
  }
</script>

<style lang="scss">
  .my-search-container {
    // 移除背景颜色，改由 props 属性控制
    // background-color: #C00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    // 移除圆角尺寸，改由 props 属性控制
    // border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
