<template>
  <!-- 使用自定义的搜索组件 -->
  <view class="search-box">
    <my-search @click="gotoSearch"></my-search>
  </view>
  <view class="swiper">
    <!-- 轮播图区域 -->
    <swiper autoplay="true" interval="3000">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
  <!-- 分类导航区域 -->
  <view class="nav-list">
    <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
      <image :src="item.image_src" class="nav-img"></image>
    </view>
  </view>
  <!-- 楼层区域 -->
  <view class="floor-list" v-for="(item, i) in floorList" :key="i">
    <!-- 楼层 item 项 -->
    <view class="floor-item">
      <!-- 楼层标题 -->
      <image :src="item.floor_title.image_src" class="floor-title"></image>
    </view>
    <!-- 楼层图片区域 -->
    <view class="floor-img-box">
      <!-- 左侧大图片的盒子 -->
      <navigator class="left-img-box" :url="item.product_list[0].url">
        <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
          mode="widthFix"></image>
      </navigator>
      <!-- 右侧 4 个小图片的盒子 -->
      <view class="right-img-box">
        <navigator class="right-img-item" v-for="(item2, index) in item.product_list" :key="index" :url="item2.url">
          <template v-if="index !== 0">
            <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
          </template>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad,
    onShow
  } from '@dcloudio/uni-app'
  import {
    reactive,
    ref
  } from "vue"
  import badgeMix from "../../hooks/badge.js"
  badgeMix()

  // 1. 轮播图的数据列表，默认为空数组
  const swiperList = ref([])
  const navList = ref([])
  // 1. 楼层的数据列表
  const floorList = ref([])

  onShow((options) => {
    getSwiperList()
    getNavList()
    getFloorList()
  })
  // 3. 获取轮播图数据的方法
  async function getSwiperList() {
    // 3.1 发起请求
    try {
      const res = await uni.$http.get('/api/public/v1/home/swiperdata')
      if (res.data.meta.status !== 200) {
        return uni.$showMsg()
      }
      // 3.3 请求成功，为 data 中的数据赋值
      swiperList.value.push(...res.data.message)
    } catch (err) {
      throw (err)
    }
  }
  // 3. 在 methods 中定义获取数据的方法
  async function getNavList() {
    const res = await uni.$http.get('/api/public/v1/home/catitems')
    if (res.data.meta.status !== 200) return uni.$showMsg("获取分类失败")
    navList.value.push(...res.data.message)
  }
  // nav-item 项被点击时候的事件处理函数
  function navClickHandler(item) {
    // 判断点击的是哪个 nav
    if (item.name === '分类') {
      uni.switchTab({
        url: '/pages/cate/cate'
      })
    }
  }
  // 3. 定义获取楼层列表数据的方法
  async function getFloorList() {
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/home/floordata')
    if (res.meta.status !== 200) return uni.$showMsg()
    // 通过双层 forEach 循环，处理 URL 地址
    res.message.forEach(floor => {
      floor.product_list.forEach(prod => {
        prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
      })
    })
    floorList.value.push(...res.message)
  }

  function gotoSearch() {
    uni.navigateTo({
      url: '/subpkg/search/search'
    })
  }
</script>

<style lang="scss">
  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }

  .swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>
