"use strict";
var hooks_badge = require("../../hooks/badge.js");
var common_vendor = require("../../common/vendor.js");
require("../../stores/cart.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    hooks_badge.badgeMix();
    return (_ctx, _cache) => {
      return {};
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
