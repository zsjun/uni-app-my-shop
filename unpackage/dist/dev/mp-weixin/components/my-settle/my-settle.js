"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_cart = require("../../stores/cart.js");
var stores_user = require("../../stores/user.js");
const _sfc_main = {
  __name: "my-settle",
  setup(__props) {
    const useStore = stores_user.useUserStore();
    const store = stores_cart.useCartStore();
    common_vendor.storeToRefs(useStore);
    const seconds = common_vendor.ref(3);
    let timeId = null;
    const isFullCheck = common_vendor.computed$1(() => {
      return store.total === store.checkedCount;
    });
    function changeAllState() {
      store.updateAllGoodsState(!isFullCheck);
    }
    function settlement() {
      if (!store.checkedCount)
        return common_vendor.index.$showMsg("\u8BF7\u9009\u62E9\u8981\u7ED3\u7B97\u7684\u5546\u54C1\uFF01");
      if (!useStore.token)
        return delayNavigate();
      payOrder();
    }
    function showTips(n) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u8BF7\u767B\u5F55\u540E\u518D\u7ED3\u7B97\uFF01" + n + " \u79D2\u540E\u81EA\u52A8\u8DF3\u8F6C\u5230\u767B\u5F55\u9875",
        mask: true,
        duration: 1500
      });
    }
    function delayNavigate() {
      seconds.value = 3;
      showTips(seconds.value);
      timeId = setInterval(() => {
        seconds.value--;
        if (seconds.value <= 0) {
          clearInterval(timeId);
          common_vendor.index.switchTab({
            url: "/pages/my/my",
            success: () => {
              useStore.updateRedirectInfo({
                openType: "switchTab",
                from: "/pages/cart/cart"
              });
            }
          });
          return;
        }
        showTips(seconds.value);
      }, 1e3);
    }
    async function payOrder() {
      const orderInfo = {
        order_price: 0.01,
        consignee_addr: store.addstr,
        goods: store.cart.filter((x) => x.goods_state).map((x) => ({
          goods_id: x.goods_id,
          goods_number: x.goods_count,
          goods_price: x.goods_price
        }))
      };
      const {
        data: res
      } = await common_vendor.index.$http.post("/api/public/v1/my/orders/create", orderInfo);
      let orderNumber = "1122222222222";
      if (res && res.message) {
        orderNumber = res.message.order_number;
      }
      let payInfo = {};
      try {
        const {
          data: res2
        } = await common_vendor.index.$http.post("/api/public/v1/my/orders/req_unifiedorder", {
          order_number: orderNumber
        });
        if (res2 && res2.message) {
          payInfo = res2.message.pay;
        }
      } catch (err) {
        console.log(123, err);
      }
      await common_vendor.index.$http.post("/api/public/v1/my/orders/chkOrder", {
        order_number: orderNumber || "22222222"
      });
      common_vendor.index.showToast({
        title: "\u652F\u4ED8\u5B8C\u6210\uFF01",
        icon: "success"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(isFullCheck),
        b: common_vendor.o(changeAllState),
        c: common_vendor.t(common_vendor.unref(store).checkedGoodsAmount),
        d: common_vendor.t(common_vendor.unref(store).checkedCount),
        e: common_vendor.o(settlement)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
