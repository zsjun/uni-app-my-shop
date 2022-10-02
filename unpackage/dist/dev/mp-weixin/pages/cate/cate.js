"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "cate",
  setup(__props) {
    const wh = common_vendor.ref(0);
    const cateList = common_vendor.ref([]);
    const active = common_vendor.ref(0);
    const cateLevel2 = common_vendor.ref([]);
    const scrollTop = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const sysInfo = common_vendor.index.getSystemInfoSync();
      wh.value = sysInfo.windowHeight - 50;
      getCateList();
    });
    async function getCateList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/categories");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      cateList.value.push(...res.message);
      cateLevel2.value.push(...res.message[0].children);
    }
    function activeChanged(i) {
      active.value = i;
      cateLevel2.value = cateList.value[i].children;
      scrollTop.value = scrollTop.value === 0 ? 1 : 0;
    }
    function gotoGoodsList(item3) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item3.cat_id
      });
    }
    function gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gotoSearch),
        b: common_vendor.f(cateList.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.cat_name),
            b: common_vendor.n(i === active.value ? "active" : ""),
            c: common_vendor.o(($event) => activeChanged(i)),
            d: i
          };
        }),
        c: wh.value + "px",
        d: common_vendor.f(cateLevel2.value, (item2, i2, i0) => {
          return {
            a: common_vendor.t(item2.cat_name),
            b: common_vendor.f(item2.children, (item3, i3, i1) => {
              return {
                a: common_vendor.t(item3.cat_name),
                b: i3,
                c: common_vendor.o(($event) => gotoGoodsList(item3), i3)
              };
            }),
            c: i2
          };
        }),
        e: wh.value + "px",
        f: scrollTop.value
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
