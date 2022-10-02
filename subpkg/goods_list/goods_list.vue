<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    reactive,
    ref
  } from "vue"
  import {
    onLoad,
    onReachBottom,
    onPullDownRefresh
  } from '@dcloudio/uni-app'
  const queryObj = reactive({
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  })
  const goodsList = ref([])
  const total = ref(0)
  let isLoading = false

  onLoad((options) => {
    queryObj.query = options.query || ''
    queryObj.cid = options.cid || ''
    getGoodsList()
  })

  onReachBottom(() => {
    if (queryObj.pagenum * queryObj.pagesize >= total) return uni.$showMsg('数据加载完毕!')
    if (isLoading) return
    // 让页码值自增+1
    queryObj.pagenum++
    getGoodsList()
  })

  onPullDownRefresh(() => {
    // 重置关键数据
    queryObj.pagenum = 1
    total.value = 0
    isLoading = false
    goodsList.value = []
    // 重新发起数据请求
    getGoodsList(() => uni.stopPullDownRefresh())
  })
  // 获取商品列表数据的方法
  async function getGoodsList(cb) {
    // 打开节流阀
    isLoading = true
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/goods/search', queryObj)
    // 关闭节流阀
    isLoading = false
    cb && cb()
    if (res.meta.status !== 200) return uni.$showMsg()
    goodsList.value.push(...res.message.goods)
    console.log(goodsList.value.length)
    total.value = res.message.total
  }

  function gotoDetail(goods) {
    uni.navigateTo({
      url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
    })
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
