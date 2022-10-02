<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="props.showRadio" @click="radioClickHandler"></radio>
      <image :src="props.goods?.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{props.goods?.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{tofixed(props.goods?.goods_price)}}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="props.goods.goods_count" @change="numChangeHandler" v-if="props.showNum">
        </uni-number-box>
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
    },
    // 是否展示图片左侧的 radio
    showRadio: {
      type: Boolean,
      // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
      default: false,
    },
    // 是否展示价格右侧的 NumberBox 组件
    showNum: {
      type: Boolean,
      default: false,
    },
  })
  const $emits = defineEmits(["radio-change", "num-change"])
  // 默认的空图片
  const defaultPic =
    'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

  // 把数字处理为带两位小数点的数字
  function tofixed(num) {
    return Number(num).toFixed(2)
  }
  // radio 组件的点击事件处理函数
  function radioClickHandler() {
    // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
    // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
    $emits('radio-change', {
      // 商品的 Id
      goods_id: props.goods.goods_id,
      // 商品最新的勾选状态
      goods_state: !props.goods.goods_state
    })
  }
  // NumberBox 组件的 change 事件处理函数
  function numChangeHandler(val) {
    // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
    $emit('num-change', {
      // 商品的 Id
      goods_id: props.goods.goods_id,
      // 商品的最新数量
      goods_count: +val
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
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
