"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  _easycom_my_goods2();
}
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
if (!Math) {
  _easycom_my_goods();
}
const _sfc_main = {
  __name: "goods_list",
  setup(__props) {
    const queryObj = common_vendor.reactive({
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    });
    const goodsList = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    let isLoading = false;
    common_vendor.onLoad((options) => {
      queryObj.query = options.query || "";
      queryObj.cid = options.cid || "";
      getGoodsList();
    });
    common_vendor.onReachBottom(() => {
      if (queryObj.pagenum * queryObj.pagesize >= total)
        return common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u5B8C\u6BD5!");
      if (isLoading)
        return;
      queryObj.pagenum++;
      getGoodsList();
    });
    common_vendor.onPullDownRefresh(() => {
      queryObj.pagenum = 1;
      total.value = 0;
      isLoading = false;
      goodsList.value = [];
      getGoodsList(() => common_vendor.index.stopPullDownRefresh());
    });
    async function getGoodsList(cb) {
      isLoading = true;
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/search", queryObj);
      isLoading = false;
      cb && cb();
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      goodsList.value.push(...res.message.goods);
      console.log(goodsList.value.length);
      total.value = res.message.total;
    }
    function gotoDetail(goods) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods.goods_id
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(goodsList.value, (goods, i, i0) => {
          return {
            a: "288d54da-0-" + i0,
            b: common_vendor.p({
              goods
            }),
            c: i,
            d: common_vendor.o(($event) => gotoDetail(goods), i)
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/subpkg/goods_list/goods_list.vue"]]);
wx.createPage(MiniProgramPage);
