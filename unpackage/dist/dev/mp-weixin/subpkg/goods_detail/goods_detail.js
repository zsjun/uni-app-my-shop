"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
const _sfc_main = {
  __name: "goods_detail",
  setup(__props) {
    const goods_info = common_vendor.reactive({});
    const options = common_vendor.ref([{
      icon: "shop",
      text: "\u5E97\u94FA"
    }, {
      icon: "cart",
      text: "\u8D2D\u7269\u8F66",
      info: 2
    }]);
    const buttonGroup = common_vendor.ref([
      {
        text: "\u52A0\u5165\u8D2D\u7269\u8F66",
        backgroundColor: "#ff0000",
        color: "#fff"
      },
      {
        text: "\u7ACB\u5373\u8D2D\u4E70",
        backgroundColor: "#ffa200",
        color: "#fff"
      }
    ]);
    common_vendor.onLoad((options2) => {
      const goods_id = options2.goods_id;
      getGoodsDetail(goods_id);
    });
    async function getGoodsDetail(goods_id) {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/detail", {
        goods_id
      });
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg("\u83B7\u53D6\u5546\u54C1\u8BE6\u60C5\u5931\u8D25");
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, "jpg");
      Object.assign(goods_info, res.message);
    }
    function preview(i) {
      common_vendor.index.previewImage({
        current: i,
        urls: goods_info.pics.map((x) => x.pics_big)
      });
    }
    function onClick(e) {
      if (e.content.text === "\u8D2D\u7269\u8F66") {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: goods_info.goods_name
      }, goods_info.goods_name ? common_vendor.e({
        b: common_vendor.f(goods_info.pics, (item, i, i0) => {
          return {
            a: item.pics_big,
            b: common_vendor.o(($event) => preview(i)),
            c: i
          };
        }),
        c: common_vendor.t(goods_info.goods_price),
        d: goods_info.goods_name
      }, goods_info.goods_name ? {
        e: common_vendor.t(goods_info.goods_name)
      } : {}, {
        f: common_vendor.p({
          type: "star",
          size: "18",
          color: "gray"
        }),
        g: goods_info.goods_introduce,
        h: common_vendor.o(onClick),
        i: common_vendor.o(_ctx.buttonClick),
        j: common_vendor.p({
          fill: true,
          options: options.value,
          buttonGroup: buttonGroup.value
        })
      }) : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zoushijun/work/my-shop/subpkg/goods_detail/goods_detail.vue"]]);
wx.createPage(MiniProgramPage);
