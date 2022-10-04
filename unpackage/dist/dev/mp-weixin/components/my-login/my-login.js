"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_user = require("../../stores/user.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-login",
  setup(__props) {
    const store = stores_user.useUserStore();
    function getUserInfo(e) {
      common_vendor.index.getUserProfile({
        desc: "\u4F60\u7684\u6388\u6743\u4FE1\u606F",
        success: (res) => {
          store.updateUserInfo(res.userInfo);
          getToken(res);
        },
        fail: (res) => {
          return common_vendor.index.$showMsg("\u60A8\u53D6\u6D88\u4E86\u767B\u5F55\u6388\u6743");
        }
      });
    }
    async function getToken(info) {
      const res = {};
      common_vendor.index.login({
        provider: "weixin",
        onlyAuthorize: true,
        success: async function(loginRes) {
          res.code = loginRes.code;
          const query = {
            code: res.code,
            encryptedData: info.encryptedData,
            iv: info.iv,
            rawData: info.rawData,
            signature: info.signature
          };
          let loginResult = {
            message: {
              token: "zsjzsjzsj"
            }
          };
          try {
            const {
              data
            } = await common_vendor.index.$http.post("/api/public/v1/users/wxlogin", query);
          } catch (err) {
            console.log(1111, err);
          }
          store.updateToken(loginResult.message.token);
          navigateBack();
        },
        fail: function(err) {
          return common_vendor.index.$showError("uni.login \u767B\u5F55\u5931\u8D25\uFF01");
        }
      });
    }
    function navigateBack() {
      if (store.redirectInfo && store.redirectInfo.openType === "switchTab") {
        common_vendor.index.switchTab({
          url: store.redirectInfo.from,
          complete: () => {
            store.updateRedirectInfo(null);
          }
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "contact-filled",
          size: "100",
          color: "#AFAFAF"
        }),
        b: common_vendor.o(getUserInfo)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
