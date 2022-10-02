"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-search",
  props: {
    bgcolor: {
      type: String,
      default: "#C00000"
    },
    radius: {
      type: Number,
      default: 18
    }
  },
  emits: ["click"],
  setup(__props, { emit: $emit }) {
    const props = __props;
    const wh = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const sysInfo = common_vendor.index.getSystemInfoSync();
      wh.value = sysInfo.windowHeight - 50;
    });
    function searchBoxHandler() {
      $emit("click");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "17"
        }),
        b: props.radius + "px",
        c: common_vendor.o(searchBoxHandler),
        d: props.prbgcolor
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
