(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["InviteFans"],{"50c7":function(e,t,n){"use strict";n("8d86")},"6ef2":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),s=Object(c["S"])("data-v-f96eabbe");Object(c["C"])("data-v-f96eabbe");var i={class:"invite-fans-container"},a={class:"bg"},o=Object(c["k"])("div",{class:"qrcode-bar"},[Object(c["k"])("i",{class:"qrcode-icon"}),Object(c["k"])("div",{class:"text"},"粉丝绑定码"),Object(c["k"])("i",{class:"back"})],-1),l=Object(c["k"])("div",{class:"note"},[Object(c["k"])("div",{class:"title"},[Object(c["k"])("i",{class:"icon"}),Object(c["k"])("div",{class:"text"},"邀约规则")]),Object(c["k"])("p",null," 1、点击分享按钮，将页面分享给您的微信好友，好友完成绑定操作，即可成为您的店铺粉丝； "),Object(c["k"])("p",null," 2、绑定成为粉您的丝后，其可以参与私域平台内的相关活动，也可以了解您的店铺动态； "),Object(c["k"])("p",null," 3、您的粉丝在平台参与相关扫码活动以及其他线上活动，有机会给您带来一定量的奖励，如荷石璧等（具体奖励规则详见后续的活动规则）； "),Object(c["k"])("p",null," 4、一旦绑定您的店铺，暂时无法解绑，请知悉。 ")],-1),r={class:"layer"},b=Object(c["k"])("div",{class:"layer-bg"},null,-1),d=Object(c["k"])("div",{class:"invite-zf"},null,-1);Object(c["A"])();var u=s((function(e,t,n,u,v,O){var j=Object(c["H"])("router-link");return Object(c["z"])(),Object(c["g"])("div",i,[Object(c["k"])("div",a,[Object(c["k"])("div",{class:"invite-btn",onClick:t[1]||(t[1]=function(t){return e.showInvite=!0})},"分享好友绑定粉丝"),Object(c["k"])(j,{to:"/seller/bindFansQrcode"},{default:s((function(){return[o]})),_:1}),l]),Object(c["R"])(Object(c["k"])("div",r,[b,d,Object(c["k"])("div",{class:"invite-gb",onClick:t[2]||(t[2]=function(t){return e.showInvite=!1})})],512),[[c["O"],e.showInvite]])])})),v=(n("ac1f"),n("1276"),n("c947")),O=n("b390"),j=n("d399"),f=(n("433b"),n("5502")),h=/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),k=Object(c["l"])({name:"InviteFans",setup:function(){var e=Object(f["b"])(),t=Object(c["e"])((function(){return e.state.wxUrl})),n=Object(c["E"])(!1),s=function(){v["b"].post("/hbSeller/sellerFans/shopBindCode",{},!1).then((function(n){if("200"===n.code){var c=n.data.shopCode;e.commit("setShopCode",c),sessionStorage.setItem("shopCode",c);var s=h?t.value:location.href.split("#")[0];Object(O["a"])(s,(function(){Object(O["d"])({shareUrl:"/orgmenu/auth?menuCode=sellerFansBind&shopCode=".concat(c,"&bindChannel=2"),shareTitle:"快绑定成我的粉丝吧！",shareDesc:"点击链接完成绑定，即可成为我的粉丝，精彩活动丰厚奖励应有尽有！",shareImg:"https://qoss.qrmkt.cn/hbseller_client/icon-share.png"})}))}else j["a"].fail(n.msg)})).catch((function(e){console.log(e)}))};return Object(c["w"])((function(){if(!sessionStorage.getItem("ShareInviteFans"))return sessionStorage.setItem("ShareInviteFans","1"),void window.location.reload();console.log("wxShare!"),s()})),{showInvite:n}},beforeRouteLeave:function(e,t,n){Object(O["c"])(),n()}});n("50c7");k.render=u,k.__scopeId="data-v-f96eabbe";t["default"]=k},"8d86":function(e,t,n){}}]);
//# sourceMappingURL=InviteFans.b34aef34.js.map