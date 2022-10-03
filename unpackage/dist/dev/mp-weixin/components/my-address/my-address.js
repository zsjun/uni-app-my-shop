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
  __name: "my-address",
  setup(__props) {
    const store = stores_user.useUserStore();
    const {
      address,
      addstr
    } = common_vendor.storeToRefs(store);
    async function chooseAddress() {
      common_vendor.index.chooseAddress({
        success(res) {
          store.updateAddress(res);
        },
        fail(err) {
          console.log(err);
          reAuth();
        }
      });
      await common_vendor.index.chooseAddress().catch((err) => err);
    }
    function reAuth() {
      common_vendor.index.showModal({
        content: "\u68C0\u6D4B\u5230\u60A8\u6CA1\u6253\u5F00\u5730\u5740\u6743\u9650\uFF0C\u662F\u5426\u53BB\u8BBE\u7F6E\u6253\u5F00\uFF1F",
        confirmText: "\u786E\u8BA4",
        cancelText: "\u53D6\u6D88",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.openSetting({
              success: (settingResult) => {
                console.log(112, settingResult);
                if (settingResult.authSetting["scope.address"])
                  return common_vendor.index.$showMsg("\u6388\u6743\u6210\u529F\uFF01\u8BF7\u9009\u62E9\u5730\u5740");
                if (!settingResult.authSetting["scope.address"])
                  return common_vendor.index.$showMsg("\u60A8\u53D6\u6D88\u4E86\u5730\u5740\u6388\u6743\uFF01");
              }
            });
          } else if (res.cancel) {
            common_vendor.index.$showMsg("\u60A8\u53D6\u6D88\u4E86\u5730\u5740\u6388\u6743\uFF01");
          }
        },
        fail: function(err) {
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: JSON.stringify(common_vendor.unref(address)) === "{}"
      }, JSON.stringify(common_vendor.unref(address)) === "{}" ? {
        b: common_vendor.o(chooseAddress)
      } : {
        c: common_vendor.t(common_vendor.unref(address).userName),
        d: common_vendor.t(common_vendor.unref(address).telNumber),
        e: common_vendor.p({
          type: "arrowright",
          size: "16"
        }),
        f: common_vendor.t(common_vendor.unref(addstr)),
        g: common_vendor.o(chooseAddress)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-address/my-address.vue"]]);
wx.createComponent(Component);
