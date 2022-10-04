"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_badge = require("../../hooks/badge.js");
require("../../stores/cart.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    hooks_badge.badgeMix();
    const swiperList = common_vendor.ref([]);
    const navList = common_vendor.ref([]);
    const floorList = common_vendor.ref([]);
    common_vendor.onShow((options) => {
      getSwiperList();
      getNavList();
      getFloorList();
    });
    async function getSwiperList() {
      try {
        const res = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
        if (res.data.meta.status !== 200) {
          return common_vendor.index.$showMsg();
        }
        swiperList.value.push(...res.data.message);
      } catch (err) {
        throw err;
      }
    }
    async function getNavList() {
      const res = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.data.meta.status !== 200)
        return common_vendor.index.$showMsg("\u83B7\u53D6\u5206\u7C7B\u5931\u8D25");
      navList.value.push(...res.data.message);
    }
    function navClickHandler(item) {
      if (item.name === "\u5206\u7C7B") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    }
    async function getFloorList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      floorList.value.push(...res.message);
    }
    function gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gotoSearch),
        b: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image_src,
            b: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
            c: index
          };
        }),
        c: common_vendor.f(navList.value, (item, i, i0) => {
          return {
            a: item.image_src,
            b: i,
            c: common_vendor.o(($event) => navClickHandler(item), i)
          };
        }),
        d: common_vendor.f(floorList.value, (item, i, i0) => {
          return {
            a: item.floor_title.image_src,
            b: item.product_list[0].image_src,
            c: item.product_list[0].image_width + "rpx",
            d: item.product_list[0].url,
            e: common_vendor.f(item.product_list, (item2, index, i1) => {
              return common_vendor.e({
                a: index !== 0
              }, index !== 0 ? {
                b: item2.image_src,
                c: item2.image_width + "rpx"
              } : {}, {
                d: index,
                e: item2.url
              });
            }),
            f: i
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
