(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CustomerHome"],{"012c":function(e,n,t){"use strict";t.d(n,"a",(function(){return o})),t.d(n,"b",(function(){return c}));t("d3b7");var o="LMLBZ-V4CCP-OJEDJ-LETNS-PT7IS-HDFR6";function c(){var e;try{TMap&&(e=Promise.resolve())}catch(n){e=new Promise((function(e,n){var t=document.createElement("script");t.type="text/javascript",t.src="https://map.qq.com/api/gljs?v=1.exp&libraries=tools&key="+o,t.onerror=function(){return n()},t.onload=function(){return e()},document.head.appendChild(t)}))}return e}},"04fa":function(e,n,t){},"1c26":function(e,n,t){"use strict";t("04fa")},"4fbf":function(e,n,t){},"53e0":function(e,n,t){"use strict";t("4fbf")},6011:function(e,n,t){"use strict";t("c2b2")},7451:function(e,n,t){"use strict";t.r(n);var o=t("7a23"),c=Object(o["S"])("data-v-1685bee9");Object(o["C"])("data-v-1685bee9");var a={class:"customer-home-conatainer"},i={id:"lbs-container"},l={class:"list-container"},s={key:0,class:"no-message"},r={class:"img"},u={class:"content"},d={class:"name"},h={class:"distance"},p={class:"addr"},b=Object(o["k"])("div",{class:"icon-right"},null,-1),m={class:"shop-detail-container"},f={class:"shop-detail-title"},O={class:"shop-detail-content"},v={class:"shop-detail-content"},j={key:0},g=Object(o["k"])("div",{class:"bind-popup-container"}," 绑定成为零售户专属粉丝后，就只能参与您当前绑定零售户店铺的互动不能在解绑了哦，您确定绑定吗？ ",-1),k=Object(o["k"])("div",{class:"bind-popup-container"}," 恭喜您，成为零售户专属粉丝！赶快去参与专属活动吧！ ",-1);Object(o["A"])();var C=c((function(e,n,t,C,y,w){var S=Object(o["H"])("popup-with-head");return Object(o["z"])(),Object(o["g"])(o["a"],null,[Object(o["k"])("div",a,[Object(o["R"])(Object(o["k"])("div",i,null,512),[[o["O"],!e.showShopList]]),Object(o["R"])(Object(o["k"])("div",{class:"list-btn",onClick:n[1]||(n[1]=function(){return e.handleClickListBtn&&e.handleClickListBtn.apply(e,arguments)})},null,512),[[o["O"],!e.showShopList]]),Object(o["R"])(Object(o["k"])("div",l,[0===e.shopListRef.length?(Object(o["z"])(),Object(o["g"])("div",s," 当前区域未有注册零售户，请等待当地零售户开通注册！ ")):Object(o["h"])("",!0),Object(o["k"])("ul",null,[(Object(o["z"])(!0),Object(o["g"])(o["a"],null,Object(o["F"])(e.shopListRef,(function(n){return Object(o["z"])(),Object(o["g"])("li",{key:n.id,onClick:function(t){return e.handleClickShop(n)}},[Object(o["k"])("div",r,[Object(o["k"])("img",{src:n.shopImg,alt:""},null,8,["src"])]),Object(o["k"])("div",u,[Object(o["k"])("div",d,[Object(o["k"])("p",null,Object(o["L"])(n.ShopName),1),Object(o["k"])("span",h,Object(o["L"])(n.distance),1)]),Object(o["k"])("div",p,Object(o["L"])(n.addr),1)]),b],8,["onClick"])})),128))])],512),[[o["O"],e.showShopList]]),Object(o["R"])(Object(o["k"])("div",{class:"lbs-btn",onClick:n[2]||(n[2]=function(){return e.handleClickListBtn&&e.handleClickListBtn.apply(e,arguments)})},null,512),[[o["O"],e.showShopList]])]),Object(o["k"])(S,{show:e.showNoBind,headImg:"\r\n      https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-popup-head-lbs.png\r\n    ",contentText:"您还没有专属零售户哦！赶快去绑定吧！",confirmBtnText:"选择零售户",needCloseBtn:"",onConfirm:e.handleCloseNoBind,onCancel:e.handleCloseNoBind},null,8,["show","onConfirm","onCancel"]),Object(o["k"])(S,{show:e.showShopDetail,headImgStyle:{width:"80vw",height:"52.26667vw ",borderRadius:"2.66667vw"},headImg:e.shopDetail.shopImg,confirmBtnText:"绑定零售户",needCloseBtn:"",onConfirm:n[4]||(n[4]=function(n){return e.showBindPopup=!0}),onCancel:n[5]||(n[5]=function(n){return e.showShopDetail=!1})},{content:c((function(){return[Object(o["k"])("div",m,[Object(o["k"])("div",f,[Object(o["j"])(Object(o["L"])(e.shopDetail.ShopName)+" ",1),e.bindShop?(Object(o["z"])(),Object(o["g"])(o["a"],{key:0},[e.bindShop.shopId===e.shopDetail.id?(Object(o["z"])(),Object(o["g"])("span",{key:0,class:"btn-unbind",onClick:n[3]||(n[3]=function(){return e.handleClickUnbind&&e.handleClickUnbind.apply(e,arguments)})},"解绑零售户")):Object(o["h"])("",!0)],64)):Object(o["h"])("",!0)]),Object(o["k"])("div",O,"地址："+Object(o["L"])(e.shopDetail.addr),1),Object(o["k"])("div",v," 电话："+Object(o["L"])(e.shopDetail.contactPhone),1)])]})),default:c((function(){return[e.bindShop?(Object(o["z"])(),Object(o["g"])("div",j)):Object(o["h"])("",!0)]})),_:1},8,["show","headImgStyle","headImg"]),Object(o["k"])(S,{show:e.showBindPopup,headImg:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-debind-head.png",needCancelBtn:"",onConfirm:n[6]||(n[6]=function(){e.showBindPopup=!1,e.showShopDetail=!1,e.handleBindShop()}),onCancel:n[7]||(n[7]=function(n){return e.showBindPopup=!1})},{content:c((function(){return[g]})),_:1},8,["show"]),Object(o["k"])(S,{show:e.showBindSuccess,headImg:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-debind-head.png",needCancelBtn:"",onConfirm:e.handleCloseBindSuccess,onCancel:e.handleCloseBindSuccess},{content:c((function(){return[k]})),_:1},8,["show","onConfirm","onCancel"])],64)})),y=(t("159b"),t("d81d"),t("012c")),w=t("c947"),S=t("2241"),B=(t("47e2"),t("d399")),L=(t("433b"),t("5502")),I=t("765e"),M=t("6c02"),T=Object(o["l"])({name:"CustomerHome",components:{PopupWithHead:I["a"]},setup:function(){var e=Object(L["b"])(),n=Object(M["c"])(),t=Object(o["e"])((function(){return e.state.lat})),c=Object(o["e"])((function(){return e.state.lng})),a=Object(o["e"])((function(){return e.state.needComplete})),i=Object(o["E"])([]),l=Object(o["E"])(null),s=Object(o["E"])(!1),r=Object(o["E"])(!1),u=Object(o["E"])(!1),d=Object(o["E"])(!1),h=Object(o["E"])(!1),p=Object(o["E"])({id:0,shopImg:"",ShopName:"",contactPhone:"",addr:"",shopLat:0,shopLng:0,distance:0,iconUrl:""});B["a"].loading({message:"加载中...",forbidClick:!0,duration:1e4});var b=!1;setTimeout((function(){b||S["a"].confirm({title:"提示",message:"尊敬的用户，获取您的地理位置信息失败，请重新进入或刷新本页面。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){}))}),11e3);var m,f=function(){s.value=!s.value},O=function(e){p.value.id=e.id,p.value.shopImg=e.shopImg,p.value.ShopName=e.ShopName,p.value.contactPhone=e.contactPhone,p.value.addr=e.addr,p.value.shopLat=e.shopLat,p.value.shopLng=e.shopLng,p.value.distance=e.distance,d.value=!0},v=function(e){return e.forEach((function(e){e.distance>1e3?e.distance=Math.floor(e.distance/1e3*100)/100+"km":e.distance=Math.floor(e.distance)+"m"})),e},j=function(){h.value=!1,!0===a.value&&S["a"].alert({title:"提示",message:"赶快前往本平台个人中心完善您的性别、电话、生日等信息吧，未完善信息无法参与本平台的相关活动哦~",messageAlign:"left",closeOnClickOverlay:!1}).then((function(){n.push("/customer/userInfo")}))},g={},k=function(n,t){w["b"].post("/hbSeller/fans/homeInfo",{lat:n,lng:t},!1).then((function(o){if("200"===o.code){var c=o.data,s=c.bindInfo,u=c.shopList;if(s?(l.value=s,e.commit("setBindShopFlag",!0)):(r.value=!0,e.commit("setBindShopFlag",!1)),null===u||0===u.length?!0!==r.value&&S["a"].confirm({title:"提示",message:"当前区域未有注册零售户，请等待当地零售户开通注册。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){a.value&&j()})).catch((function(){a.value&&j()})):(console.log(a.value,!r.value),!a.value||r.value||h.value||j()),u&&u.length){i.value=v(u),g={pMarker:new TMap.MarkerStyle({width:20,height:30,anchor:{x:10,y:30}}),bindedStyle:new TMap.MarkerStyle({width:47,height:40,src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-binded.png",anchor:{x:16,y:32}}),cqStyle:new TMap.MarkerStyle({width:47,height:40,src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-cq.png",anchor:{x:16,y:32}}),hqStyle:new TMap.MarkerStyle({width:47,height:40,src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-hq.png",anchor:{x:16,y:32}})};var d=u.map((function(e){var n,t="style".concat(e.id);return g[t]=new TMap.MarkerStyle({width:47,height:40,src:e.iconUrl,anchor:{x:16,y:32}}),{id:e.id,styleId:(null===(n=l.value)||void 0===n?void 0:n.shopId)===e.id?"bindedStyle":t,position:new TMap.LatLng(e.shopLat,e.shopLng),properties:{id:e.id,title:e.ShopName,ShopName:e.ShopName,addr:e.addr,contactPhone:e.contactPhone,distance:e.distance,shopImg:e.shopImg,shopLat:e.shopLat,shopLng:e.shopLng}}}));d.push({id:0,styleId:"pMarker",position:new TMap.LatLng(n,t)}),m.setStyles(g),m.add(d)}else{g={pMarker:new TMap.MarkerStyle({width:20,height:30,anchor:{x:10,y:30}})};var p=[];p.push({id:0,styleId:"pMarker",position:new TMap.LatLng(n,t)}),m.setStyles(g),m.add(p)}}else B["a"].fail(o.msg)})).catch((function(e){console.log(e)}))},C=function(){r.value=!1,0===i.value.length&&S["a"].confirm({title:"提示",message:"当前区域未有注册零售户，请等待当地零售户开通注册。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){}))},I=function(){w["b"].post("/hbSeller/fans/bindShop",{shopId:p.value.id},!1).then((function(n){if("200"===n.code){B["a"].success({message:"绑定成功",onClose:function(){m.remove(i.value.map((function(e){return e.id}))),k(t.value,c.value)}});var o=n.data.needComplete;e.commit("setNeedComplete",n.data.needComplete),o?sessionStorage.setItem("needComplete","1"):sessionStorage.setItem("needComplete","0"),h.value=!0}else B["a"].fail(n.msg)})).catch((function(e){console.log(e)}))},T=function(){S["a"].confirm({title:"提示",messageAlign:"left",message:"尊敬的用户，解绑零售户，需在公众号留言“解绑零售户”，由客服人员后台操作处理，解绑前需领取未领取的奖品，如已领取请忽略，绑定关系解除后，已产生的相关活动数据会中断，需重新绑定零售户后参与店铺活动。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){}))},P=function(){Object(y["b"])().then((function(){console.log(t.value,c.value),b=!0;var e=new TMap.LatLng(t.value,c.value),n=new TMap.Map(document.getElementById("lbs-container"),{center:e,minZoom:11,maxZoom:13,zoom:13,mapZoomType:TMap.constants.MAP_ZOOM_TYPE.CENTER,draggable:!1,scrollable:!0,doubleClickZoom:!1,showControl:!1,pitchable:!1,rotatable:!1});m=new TMap.MultiMarker({id:"marker-layer",map:n,geometries:[]}),m.on("click",(function(e){console.log(e.geometry),O(e.geometry.properties)})),k(t.value,c.value)}))};return Object(o["P"])((function(){return t.value}),(function(e,n){t.value&&c.value&&null==n&&P()})),Object(o["w"])((function(){if(!t.value||!c.value)return sessionStorage.getItem("CustomerHome")?void 0:(sessionStorage.setItem("CustomerHome","1"),void window.location.reload());P()})),{showShopList:s,showNoBind:r,showBindPopup:u,shopListRef:i,showShopDetail:d,showBindSuccess:h,shopDetail:p,bindShop:l,handleClickListBtn:f,handleClickShop:O,handleBindShop:I,handleClickUnbind:T,handleCloseNoBind:C,handleCloseBindSuccess:j}}});t("53e0"),t("6011");T.render=C,T.__scopeId="data-v-1685bee9";n["default"]=T},"765e":function(e,n,t){"use strict";var o=t("7a23"),c=Object(o["S"])("data-v-718d3164");Object(o["C"])("data-v-718d3164");var a={class:"popup-container"},i={class:"text"},l={class:"btns"},s=Object(o["k"])("img",{src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/Close.png",alt:""},null,-1);Object(o["A"])();var r=c((function(e,n,t,r,u,d){var h=Object(o["H"])("van-popup");return Object(o["z"])(),Object(o["g"])(h,{show:e.showPopup,"onUpdate:show":n[5]||(n[5]=function(n){return e.showPopup=n}),"close-on-click-overlay":!1,style:{"border-radius":"2.6vw","background-color":"unset"}},{default:c((function(){return[Object(o["k"])("img",{class:"popup-icon",src:e.headImg,style:e.headImgStyle,alt:""},null,12,["src"]),Object(o["k"])("div",a,[Object(o["G"])(e.$slots,"content",{},(function(){return[Object(o["k"])("div",i,Object(o["L"])(e.contentText),1)]}),{},!0),Object(o["k"])("div",l,[Object(o["G"])(e.$slots,"default",{},(function(){return[e.needCancelBtn?(Object(o["z"])(),Object(o["g"])(o["a"],{key:0},[Object(o["k"])("div",{class:"light",onClick:n[1]||(n[1]=function(){return e.handleClickCancel&&e.handleClickCancel.apply(e,arguments)})},"取消"),Object(o["k"])("div",{class:"plain",onClick:n[2]||(n[2]=function(){return e.handleClickConfirm&&e.handleClickConfirm.apply(e,arguments)})},"确定")],64)):(Object(o["z"])(),Object(o["g"])("div",{key:1,class:"plain no-cancel",onClick:n[3]||(n[3]=function(){return e.handleClickConfirm&&e.handleClickConfirm.apply(e,arguments)})},Object(o["L"])(e.confirmBtnText),1))]}),{},!0)])]),e.needCloseBtn?(Object(o["z"])(),Object(o["g"])("div",{key:0,class:"btn-close",onClick:n[4]||(n[4]=function(){return e.handleClickCancel&&e.handleClickCancel.apply(e,arguments)})},[s])):Object(o["h"])("",!0)]})),_:3},8,["show"])})),u=Object(o["l"])({name:"PopupWithHead",props:{show:{type:Boolean,requrie:!0,default:!1},headImg:{type:String,requrie:!0,default:""},headImgStyle:{type:Object||null,requrie:!1,default:null},needCancelBtn:{type:Boolean,requrie:!0,default:!1},contentText:{type:String,requrie:!1,default:""},confirmBtnText:{type:String,requrie:!0,default:"确定"},needCloseBtn:{type:Boolean,requrie:!1,default:!1}},setup:function(e,n){var t=Object(o["E"])(e.show);Object(o["P"])((function(){return e.show}),(function(){t.value=e.show}));var c=function(){n.emit("confirm")},a=function(){n.emit("cancel")};return{showPopup:t,handleClickConfirm:c,handleClickCancel:a}}});t("1c26");u.render=r,u.__scopeId="data-v-718d3164";n["a"]=u},c2b2:function(e,n,t){},d81d:function(e,n,t){"use strict";var o=t("23e7"),c=t("b727").map,a=t("1dde"),i=a("map");o({target:"Array",proto:!0,forced:!i},{map:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=CustomerHome.49cc9a21.js.map