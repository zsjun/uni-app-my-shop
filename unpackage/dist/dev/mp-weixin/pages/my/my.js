"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_user = require("../../stores/user.js");
var hooks_badge = require("../../hooks/badge.js");
require("../../stores/cart.js");
if (!Array) {
  const _easycom_my_login2 = common_vendor.resolveComponent("my-login");
  const _easycom_my_userinfo2 = common_vendor.resolveComponent("my-userinfo");
  (_easycom_my_login2 + _easycom_my_userinfo2)();
}
const _easycom_my_login = () => "../../components/my-login/my-login.js";
const _easycom_my_userinfo = () => "../../components/my-userinfo/my-userinfo.js";
if (!Math) {
  (_easycom_my_login + _easycom_my_userinfo)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const store = stores_user.useUserStore();
    const {
      token
    } = common_vendor.storeToRefs(store);
    hooks_badge.badgeMix();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(token)
      }, !common_vendor.unref(token) ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
