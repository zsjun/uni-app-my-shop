"use strict";
var common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("m_user", {
  state: () => ({
    address: JSON.parse(common_vendor.index.getStorageSync("address") || "{}"),
    token: common_vendor.index.getStorageSync("token") || "",
    userinfo: JSON.parse(common_vendor.index.getStorageSync("userinfo") || "{}"),
    redirectInfo: null
  }),
  getters: {
    addstr(state) {
      if (!state.address.provinceName)
        return "";
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
    }
  },
  actions: {
    updateAddress(address) {
      this.address = address;
      this.saveAddressToStorage();
    },
    saveAddressToStorage() {
      common_vendor.index.setStorageSync("address", JSON.stringify(this.address));
    },
    updateUserInfo(userinfo) {
      this.userinfo = userinfo;
      console.log(99999, userinfo);
      this.saveUserInfoToStorage();
    },
    saveUserInfoToStorage() {
      common_vendor.index.setStorageSync("userinfo", JSON.stringify(this.userinfo));
    },
    updateToken(token) {
      this.token = token;
      console.log(123456, token);
      this.saveTokenToStorage();
    },
    saveTokenToStorage() {
      common_vendor.index.setStorageSync("token", this.token);
    },
    updateRedirectInfo(info) {
      this.redirectInfo = info;
      console.log(this.redirectInfo);
    }
  }
});
exports.useUserStore = useUserStore;
