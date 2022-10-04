"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  _easycom_uni_number_box2();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  _easycom_uni_number_box();
}
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
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  emits: ["radio-change", "num-change"],
  setup(__props, { emit: $emits }) {
    const props = __props;
    const defaultPic = "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png";
    function tofixed(num) {
      return Number(num).toFixed(2);
    }
    function radioClickHandler() {
      $emits("radio-change", {
        goods_id: props.goods.goods_id,
        goods_state: !props.goods.goods_state
      });
    }
    function numChangeHandler(val) {
      $emits("num-change", {
        goods_id: props.goods.goods_id,
        goods_count: +val
      });
    }
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: props.showRadio
      }, props.showRadio ? {
        b: __props.goods.goods_state,
        c: common_vendor.o(radioClickHandler)
      } : {}, {
        d: ((_a = props.goods) == null ? void 0 : _a.goods_small_logo) || defaultPic,
        e: common_vendor.t((_b = props.goods) == null ? void 0 : _b.goods_name),
        f: common_vendor.t(tofixed((_c = props.goods) == null ? void 0 : _c.goods_price)),
        g: props.showNum
      }, props.showNum ? {
        h: common_vendor.o(numChangeHandler),
        i: common_vendor.p({
          min: 1,
          value: props.goods.goods_count
        })
      } : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-goods/my-goods.vue"]]);
wx.createComponent(Component);
