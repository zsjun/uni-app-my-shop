"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_cart = require("../../stores/cart.js");
var hooks_badge = require("../../hooks/badge.js");
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const store = stores_cart.useCartStore();
    common_vendor.storeToRefs(store);
    hooks_badge.badgeMix();
    return (_ctx, _cache) => {
      return {};
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
