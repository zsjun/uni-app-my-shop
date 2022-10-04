<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>

    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script setup>
  import {
    computed,
    reactive
  } from "vue";
  import {
    useUserStore
  } from "../../stores/user.js"
  import {
    storeToRefs
  } from 'pinia'

  const store = useUserStore()
  const {
    address,
    addstr
  } = storeToRefs(store)
  // 收货地址
  // const address = reactive({})
  // 收货详细地址的计算属性
  // const addstr = computed(() => {
  //   if (!address.provinceName) return ''
  //   // 拼接 省，市，区，详细地址 的字符串并返回给用户
  //   return address.provinceName + address.cityName + address.countyName + address.detailInfo
  // })
  // 选择收货地址
  function chooseAddress() {
    // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
    //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
    uni.chooseAddress({
      success(res) {
        console.log(33, res)
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
        // 3.3 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
        store.updateAddress(res)
      },
      fail(err) {
        console.log(23333, err)
        reAuth()
      }
    })
    // const [err, succ] = await uni.chooseAddress().catch(err => err)

    // 2. 用户成功的选择了收货地址
    // if (err === null && succ.errMsg === 'chooseAddress:ok') {
    //   // 为 data 里面的收货地址对象赋值
    //   // Object.assign(address, succ)
    //   // 3.3 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
    //   store.updateAddress(succ)
    // }
    // // 3. 用户没有授权
    // if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg ===
    //     'chooseAddress:fail authorize no response')) {
    //   reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
    // }
  }
  // 调用此方法，重新发起收货地址的授权
  function reAuth() {
    // 3.1 提示用户对地址进行授权
    uni.showModal({
      content: '检测到您没打开地址权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          uni.openSetting({
            // 3.4.1 授权结束，需要对授权的结果做进一步判断
            success: (settingResult) => {
              console.log(112, settingResult)
              // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
              if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
              // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
              if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
            }
          })
        } else if (res.cancel) {
          uni.$showMsg('您取消了地址授权！')
        }
      },
      fail: function(err) {

      }
    })
  }
</script>

<style lang="scss">
  // 底部边框线的样式
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  // 选择收货地址的盒子
  .address-choose-box {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 渲染收货信息的盒子
  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    // 第一行
    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    // 第二行
    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }
</style>
