"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_cart = require("../../stores/cart.js");
const _sfc_main = {
  __name: "my-settle",
  setup(__props) {
    const store = stores_cart.useCartStore();
    const {
      checkedCount,
      total
    } = common_vendor.storeToRefs(store);
    const isFullCheck = common_vendor.computed$1(() => {
      return total === checkedCount;
    });
    function changeAllState() {
      store.updateAllGoodsState(!isFullCheck);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(isFullCheck),
        b: common_vendor.o(changeAllState),
        c: common_vendor.t(_ctx.checkedGoodsAmount),
        d: common_vendor.t(common_vendor.unref(checkedCount))
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
