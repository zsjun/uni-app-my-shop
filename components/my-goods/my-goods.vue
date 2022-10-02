<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <image :src="props.goods?.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{props.goods?.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{tofixed(props.goods?.goods_price)}}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps({
    // 商品的信息对象
    goods: {
      type: Object,
      defaul: {
        goods_small_logo: "",
        goods_name: "",
        goods_price: 0
      },
    }
  })
  // 默认的空图片
  const defaultPic =
    'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

  // 把数字处理为带两位小数点的数字
  function tofixed(num) {
    return Number(num).toFixed(2)
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
