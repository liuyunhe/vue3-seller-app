(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Transform"],{1212:function(e,t,n){"use strict";n.r(t);var o=n("7a23");function r(e,t,n,r,s,i){return Object(o["z"])(),Object(o["g"])("div")}n("a9e3"),n("ac1f"),n("1276"),n("99af");var s=n("c947"),i=n("b390"),a=n("6c02"),c=n("5502"),b=Object(o["l"])({name:"Transform",props:{token:{type:String,required:!0},target:{type:String,required:!0},shopCode:{type:String},bindChannel:{type:Number}},setup:function(e){var t=Object(c["b"])(),n=Object(a["c"])(),r=Object(o["e"])((function(){return t.state.wxUrl}));return Object(o["w"])((function(){if(sessionStorage.getItem("wxUrl")&&t.commit("setWxUrl",sessionStorage.getItem("wxUrl")),e.shopCode&&(t.commit("setShopCode",e.shopCode),sessionStorage.setItem("shopCode",e.shopCode)),e.bindChannel&&(t.commit("setBindChannel",e.bindChannel),sessionStorage.setItem("bindChannel",e.bindChannel+"")),e.token&&(t.commit("setToken",e.token),sessionStorage.setItem("token",e.token),s["a"].defaults.headers.token=e.token),e.target){var o=/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?r.value:location.href.split("#")[0];Object(i["a"])(o,(function(){Object(i["b"])(),Object(i["c"])()})),n.push(e.target)}})),{}},beforeRouteEnter:function(e,t,n){sessionStorage.setItem("wxUrl","".concat(location.origin,"/HbsClient").concat(e.fullPath)),n()}});b.render=r;t["default"]=b}}]);
//# sourceMappingURL=Transform.7e4915bc.js.map