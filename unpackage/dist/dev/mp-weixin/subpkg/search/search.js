"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_tag2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_tag)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    let timeId = null;
    const searchVal = common_vendor.ref("");
    const searchResults = common_vendor.ref([]);
    const historyList = common_vendor.ref(["a", "app", "apple"]);
    common_vendor.onLoad(() => {
      const historyListRes = common_vendor.index.getStorageSync("kw");
      if (historyListRes && historyListRes.length > 0) {
        historyList.value.push(...JSON.parse(historyListRes));
      }
    });
    const histories = common_vendor.computed$1(() => [...historyList.value].reverse());
    console.log(11, histories);
    function input(e) {
      if (timeId) {
        clearTimeout(timeId);
      }
      timeId = setTimeout(() => {
        searchVal.value = e;
        getSearchList();
      }, 500);
      console.log(333, e);
    }
    async function getSearchList() {
      if (searchVal.value.length === 0) {
        searchResults.value = [];
      }
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/qsearch", {
        query: searchVal.value
      });
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      searchResults.value.push(...res.message);
      saveSearchHistory();
    }
    function gotoDetail(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
      });
    }
    function saveSearchHistory() {
      const set = new Set(historyList.value);
      set.delete(searchVal.value);
      set.add(searchVal.value);
      historyList.value.push(...Array.from(set));
      common_vendor.index.setStorageSync("kw", JSON.stringify(historyList.value));
    }
    function clean() {
      historyList.value = [];
      common_vendor.index.setStorageSync("kw", "[]");
    }
    function gotoGoodsList(kw) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?query=" + kw
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(input),
        b: common_vendor.p({
          radius: 100,
          cancelButton: "none",
          placeholder: "\u641C\u7D22"
        }),
        c: searchResults.value.length !== 0
      }, searchResults.value.length !== 0 ? {
        d: common_vendor.f(searchResults.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.goods_name),
            b: "79195e8c-1-" + i0,
            c: i,
            d: common_vendor.o(($event) => gotoDetail(item), i)
          };
        }),
        e: common_vendor.p({
          type: "arrowright",
          size: "16"
        })
      } : {
        f: common_vendor.o(clean),
        g: common_vendor.p({
          type: "trash",
          size: "17"
        }),
        h: common_vendor.f(common_vendor.unref(histories), (item, i, i0) => {
          return {
            a: i,
            b: common_vendor.o(($event) => gotoGoodsList(item), i),
            c: "79195e8c-3-" + i0,
            d: common_vendor.p({
              text: item
            })
          };
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/subpkg/search/search.vue"]]);
wx.createPage(MiniProgramPage);
