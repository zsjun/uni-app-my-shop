"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_cart = require("../../stores/cart.js");
var stores_user = require("../../stores/user.js");
var hooks_badge = require("../../hooks/badge.js");
if (!Array) {
  const _easycom_my_address2 = common_vendor.resolveComponent("my-address");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_my_settle2 = common_vendor.resolveComponent("my-settle");
  (_easycom_my_address2 + _easycom_uni_icons2 + _easycom_my_goods2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_my_settle2)();
}
const _easycom_my_address = () => "../../components/my-address/my-address.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_my_settle = () => "../../components/my-settle/my-settle.js";
if (!Math) {
  (_easycom_my_address + _easycom_uni_icons + _easycom_my_goods + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_my_settle)();
}
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const store = stores_cart.useCartStore();
    stores_user.useUserStore();
    const {
      cart,
      total
    } = common_vendor.storeToRefs(store);
    hooks_badge.badgeMix();
    const options = common_vendor.ref([{
      text: "\u786E\u8BA4",
      style: {
        backgroundColor: "#c00000"
      }
    }]);
    function swipeActionClickHandler(goods) {
      store.removeGoodsById(goods.goods_id);
    }
    function radioChangeHandler(valObj) {
      store.updateGoodsState(valObj);
    }
    function numberChangeHandler(valObj) {
      store.updateGoodsCount(valObj);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(cart).length !== 0
      }, common_vendor.unref(cart).length !== 0 ? {
        b: common_vendor.p({
          type: "shop",
          size: "18"
        }),
        c: common_vendor.f(common_vendor.unref(cart), (goods, i, i0) => {
          return {
            a: "77980d86-4-" + i0 + "," + ("77980d86-3-" + i0),
            b: common_vendor.p({
              goods,
              ["show-radio"]: true,
              ["show-num"]: true
            }),
            c: common_vendor.o(($event) => swipeActionClickHandler(goods)),
            d: "77980d86-3-" + i0 + ",77980d86-2",
            e: i
          };
        }),
        d: common_vendor.o(radioChangeHandler),
        e: common_vendor.o(numberChangeHandler),
        f: common_vendor.p({
          ["right-options"]: options.value
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
