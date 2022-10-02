"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-goods",
  props: {
    goods: {
      type: Object,
      defaul: {
        goods_small_logo: "",
        goods_name: "",
        goods_price: 0
      }
    }
  },
  setup(__props) {
    const props = __props;
    const defaultPic = "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png";
    function tofixed(num) {
      return Number(num).toFixed(2);
    }
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: ((_a = props.goods) == null ? void 0 : _a.goods_small_logo) || defaultPic,
        b: common_vendor.t((_b = props.goods) == null ? void 0 : _b.goods_name),
        c: common_vendor.t(tofixed((_c = props.goods) == null ? void 0 : _c.goods_price))
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-goods/my-goods.vue"]]);
wx.createComponent(Component);
