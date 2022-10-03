<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- 登录按钮 -->
    <!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
    <!-- 为登录的 button 按钮绑定 open-type="getUserInfo" 属性，表示点击按钮时，希望获取用户的基本信息： -->
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
    <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script setup>
  import {
    storeToRefs
  } from 'pinia'

  import {
    useUserStore
  } from '../../stores/user'

  const store = useUserStore()
  const {
    redirectInfo
  } = storeToRefs(store)
  // 获取微信用户的基本信息
  function getUserInfo(e) {
    uni.getUserProfile({
      desc: '你的授权信息',
      success: (res) => {
        // 将信息存到 vuex 中
        // 3. 将用户的基本信息存储到 vuex 中
        store.updateUserInfo(res.userInfo)
        // 获取登录成功后的 Token 字符串
        getToken(res)
      },
      fail: (res) => {
        return uni.$showMsg('您取消了登录授权')
      }
    })
    // 判断是否获取用户信息成功
    // if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
    // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
    // 3. 将用户的基本信息存储到 vuex 中
    // store.updateUserInfo(e.detail.userInfo)
    // // 获取登录成功后的 Token 字符串
    // getToken(e.detail)
  }
  // 调用登录接口，换取永久的 token
  async function getToken(info) {
    // 调用微信登录接口
    const res = {}
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: async function(loginRes) {
        res.code = loginRes.code
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }

        // 换取 token
        // 这里模拟一个token
        let loginResult = {
          message: {
            token: "zsjzsjzsj"
          }
        }
        try {
          // 这里接口错误，无法获取到token
          const {
            data
          } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        } catch (err) {
          console.log(1111, err)
        }
        // uni.$showMsg('登录成功')
        // 2. 更新 vuex 中的 token
        store.updateToken(loginResult.message.token)
        // 判断 vuex 中的 redirectInfo 是否为 null
        // 如果不为 null，则登录成功之后，需要重新导航到对应的页面
        navigateBack()
      },
      fail: function(err) {
        return uni.$showError('uni.login 登录失败！')
      }
    })
    //  const [err, res] = await uni.login().catch(err => err)
    // // 判断是否 uni.login() 调用失败
    // if (err || res.errMsg !== 'login:ok')

  }
  // 返回登录之前的页面
  function navigateBack() {
    // redirectInfo 不为 null，并且导航方式为 switchTab
    if (redirectInfo && redirectInfo.openType === 'switchTab') {
      // 调用小程序提供的 uni.switchTab() API 进行页面的导航
      uni.switchTab({
        // 要导航到的页面地址
        url: redirectInfo.from,
        // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
        complete: () => {
          store.updateRedirectInfo(null)
        }
      })
    }
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
