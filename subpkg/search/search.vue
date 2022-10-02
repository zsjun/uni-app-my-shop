<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="搜索"></uni-search-bar>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from "vue"
  import {
    onLoad,
    onShow
  } from '@dcloudio/uni-app'

  let timeId = null
  const searchVal = ref("")
  // 搜索结果列表
  const searchResults = ref([])
  // 搜索历史的数组
  const historyList = ref(['a', 'app', 'apple'])
  onLoad(() => {
    const historyListRes = uni.getStorageSync('kw');
    if (historyListRes && historyListRes.length > 0) {
      historyList.value.push(...JSON.parse(historyListRes))
    }
  })
  const histories = computed(() => [...historyList.value].reverse())
  console.log(11, histories)

  function input(e) {
    if (timeId) {
      clearTimeout(timeId)
    }
    // 重新启动一个延时器，并把 timerId 赋值给 this.timer
    timeId = setTimeout(() => {
      // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
      searchVal.value = e
      // 根据关键词，查询搜索建议列表
      getSearchList()
    }, 500)

    // e.value 是最新的搜索内容
    console.log(333, e)
  }
  // 根据搜索关键词，搜索商品建议列表
  async function getSearchList() {
    // 判断关键词是否为空
    if (searchVal.value.length === 0) {
      searchResults.value = []
    }
    // 发起请求，获取搜索建议列表
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/goods/qsearch', {
      query: searchVal.value
    })
    if (res.meta.status !== 200) return uni.$showMsg()
    searchResults.value.push(...res.message)
    saveSearchHistory()
  }

  function gotoDetail(item) {
    uni.navigateTo({
      url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
    })
  }

  function saveSearchHistory() {
    const set = new Set(historyList.value)
    set.delete(searchVal.value)
    set.add(searchVal.value)

    historyList.value.push(...Array.from(set))

    // 对搜索历史数据，进行持久化的存储
    uni.setStorageSync('kw', JSON.stringify(historyList.value))
  }

  function clean() {
    historyList.value = []
    uni.setStorageSync('kw', '[]')
  }

  function gotoGoodsList(kw) {
    uni.navigateTo({
      url: '/subpkg/goods_list/goods_list?query=' + kw
    })
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: rgb(192, 0, 0);
    ;
  }


  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
