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
  __name: "my-userinfo",
  setup(__props) {
    const store = stores_user.useUserStore();
    async function logout() {
      const [err, succ] = await common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u8BA4\u9000\u51FA\u767B\u5F55\u5417\uFF1F"
      }).catch((err2) => err2);
      if (succ && succ.confirm) {
        store.updateUserInfo({});
        store.updateToken("");
        store.updateAddress({});
      }
    }
    return (_ctx, _cache) => {
      return {
        a: _ctx.userinfo.avatarUrl,
        b: common_vendor.t(_ctx.userinfo.nickName),
        c: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        d: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        e: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        f: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        g: common_vendor.o(logout)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);
