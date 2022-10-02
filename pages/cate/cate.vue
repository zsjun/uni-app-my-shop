<template>
  <my-search @click="gotoSearch"></my-search>
  <!-- 使用自定义的搜索组件 -->
  <view class="scroll-view-container">
    <!-- 左侧的滚动视图区域 -->
    <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
      <block v-for="(item, i) in cateList" :key="i">
        <!-- <view class="left-scroll-view-item">{{item.cat_name}}</view> -->
        <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
          {{item.cat_name}}
        </view>
      </block>
    </scroll-view>
    <!-- 右侧的滚动视图区域 -->
    <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
      <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
        <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
        <!-- 动态渲染三级分类的列表数据 -->
        <view class="cate-lv3-list">
          <!-- 三级分类 Item 项 -->
          <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
            <image src="../../static/iphone.jpg"></image>
            <text>{{item3.cat_name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
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
  import badgeMix from "../../hooks/badge.js"
  badgeMix()
  // 窗口的可用高度=屏幕高度 - navigationBar高度 - tabBar 高度 
  const wh = ref(0)
  // 分类数据列表 
  const cateList = ref([])
  // 当前选中项的索引， 默认让第一项被选中
  const active = ref(0)
  // 二级分类列表 
  const cateLevel2 = ref([])
  // 滚动条距离顶部的距离
  const scrollTop = ref(0)
  onLoad(() => {
    // 获取当前系统的信息
    const sysInfo = uni.getSystemInfoSync()
    // 为 wh 窗口可用高度动态赋值
    // wh.value = sysInfo.windowHeight
    // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
    wh.value = sysInfo.windowHeight - 50
    getCateList()
  })
  async function getCateList() {
    // 发起请求
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/categories')
    // 判断是否获取失败
    if (res.meta.status !== 200) return uni.$showMsg()
    // 转存数据
    cateList.value.push(...res.message)
    // 为二级分类赋值
    cateLevel2.value.push(...res.message[0].children)
  }
  // 选中项改变的事件处理函数
  function activeChanged(i) {
    active.value = i
    // 为二级分类列表重新赋值
    cateLevel2.value = cateList.value[i].children
    // 让 scrollTop 的值在 0 与 1 之间切换
    scrollTop.value = scrollTop.value === 0 ? 1 : 0
  }
  // 点击三级分类项跳转到商品列表页面
  function gotoGoodsList(item3) {
    uni.navigateTo({
      url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
    })
  }

  function gotoSearch() {
    uni.navigateTo({
      url: '/subpkg/search/search'
    })
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
