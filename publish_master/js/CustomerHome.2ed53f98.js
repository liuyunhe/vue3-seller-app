(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CustomerHome"],{"012c":function(e,n,t){"use strict";t.d(n,"a",(function(){return c})),t.d(n,"b",(function(){return o}));t("d3b7");var c="LMLBZ-V4CCP-OJEDJ-LETNS-PT7IS-HDFR6";function o(){var e;try{TMap&&(e=Promise.resolve())}catch(n){e=new Promise((function(e,n){var t=document.createElement("script");t.type="text/javascript",t.src="https://map.qq.com/api/gljs?v=1.exp&libraries=tools&key="+c,t.onerror=function(){return n()},t.onload=function(){return e()},document.head.appendChild(t)}))}return e}},"04fa":function(e,n,t){},"1c26":function(e,n,t){"use strict";t("04fa")},"5d9f":function(e,n,t){"use strict";t("709c")},6995:function(e,n,t){},"709c":function(e,n,t){},7451:function(e,n,t){"use strict";t.r(n);var c=t("7a23"),o=Object(c["S"])("data-v-9f0f5ede");Object(c["C"])("data-v-9f0f5ede");var i={class:"customer-home-conatainer"},a={id:"lbs-container"},l={class:"list-container"},s={key:0,class:"no-message"},r={class:"img"},u={class:"content"},d={class:"name"},h={class:"distance"},p={class:"addr"},b=Object(c["k"])("div",{class:"icon-right"},null,-1),f={class:"shop-detail-container"},m={class:"shop-detail-title"},O={class:"shop-detail-content"},j={class:"shop-detail-content"},v={key:0},g=Object(c["k"])("div",{class:"bind-popup-container"}," 绑定成为零售户专属粉丝后，就只能参与您当前绑定零售户店铺的互动不能在解绑了哦，您确定绑定吗？ ",-1),k=Object(c["k"])("div",{class:"bind-popup-container"}," 恭喜您，成为零售户专属粉丝！赶快去参与专属活动吧！ ",-1);Object(c["A"])();var C=o((function(e,n,t,C,w,y){var S=Object(c["H"])("popup-with-head");return Object(c["z"])(),Object(c["g"])(c["a"],null,[Object(c["k"])("div",i,[Object(c["R"])(Object(c["k"])("div",a,null,512),[[c["O"],!e.showShopList]]),Object(c["R"])(Object(c["k"])("div",{class:"list-btn",onClick:n[1]||(n[1]=function(){return e.handleClickListBtn&&e.handleClickListBtn.apply(e,arguments)})},null,512),[[c["O"],!e.showShopList]]),Object(c["R"])(Object(c["k"])("div",l,[0===e.shopListRef.length?(Object(c["z"])(),Object(c["g"])("div",s," 当前区域未有注册零售户，请等待当地零售户开通注册！ ")):Object(c["h"])("",!0),Object(c["k"])("ul",null,[(Object(c["z"])(!0),Object(c["g"])(c["a"],null,Object(c["F"])(e.shopListRef,(function(n){return Object(c["z"])(),Object(c["g"])("li",{key:n.id,onClick:function(t){return e.handleClickShop(n)}},[Object(c["k"])("div",r,[Object(c["k"])("img",{src:n.shopImg,alt:""},null,8,["src"])]),Object(c["k"])("div",u,[Object(c["k"])("div",d,[Object(c["k"])("p",null,Object(c["L"])(n.ShopName),1),Object(c["k"])("span",h,Object(c["L"])(n.distance),1)]),Object(c["k"])("div",p,Object(c["L"])(n.addr),1)]),b],8,["onClick"])})),128))])],512),[[c["O"],e.showShopList]]),Object(c["R"])(Object(c["k"])("div",{class:"lbs-btn",onClick:n[2]||(n[2]=function(){return e.handleClickListBtn&&e.handleClickListBtn.apply(e,arguments)})},null,512),[[c["O"],e.showShopList]])]),Object(c["k"])(S,{show:e.showNoBind,headImg:"\r\n      https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-popup-head-lbs.png\r\n    ",contentText:"您还没有专属零售户哦！赶快去绑定吧！",confirmBtnText:"选择零售户",needCloseBtn:"",onConfirm:e.handleCloseNoBind,onCancel:e.handleCloseNoBind},null,8,["show","onConfirm","onCancel"]),Object(c["k"])(S,{show:e.showShopDetail,headImgStyle:{width:"80vw",height:"52.26667vw ",borderRadius:"2.66667vw"},headImg:e.shopDetail.shopImg,confirmBtnText:"绑定零售户",needCloseBtn:"",onConfirm:n[4]||(n[4]=function(n){return e.showBindPopup=!0}),onCancel:n[5]||(n[5]=function(n){return e.showShopDetail=!1})},{content:o((function(){return[Object(c["k"])("div",f,[Object(c["k"])("div",m,[Object(c["j"])(Object(c["L"])(e.shopDetail.ShopName)+" ",1),e.bindShop?(Object(c["z"])(),Object(c["g"])(c["a"],{key:0},[e.bindShop.shopId===e.shopDetail.id?(Object(c["z"])(),Object(c["g"])("span",{key:0,class:"btn-unbind",onClick:n[3]||(n[3]=function(){return e.handleClickUnbind&&e.handleClickUnbind.apply(e,arguments)})},"解绑零售户")):Object(c["h"])("",!0)],64)):Object(c["h"])("",!0)]),Object(c["k"])("div",O,"地址："+Object(c["L"])(e.shopDetail.addr),1),Object(c["k"])("div",j," 电话："+Object(c["L"])(e.shopDetail.contactPhone),1)])]})),default:o((function(){return[e.bindShop?(Object(c["z"])(),Object(c["g"])("div",v)):Object(c["h"])("",!0)]})),_:1},8,["show","headImgStyle","headImg"]),Object(c["k"])(S,{show:e.showBindPopup,headImg:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-debind-head.png",needCancelBtn:"",onConfirm:n[6]||(n[6]=function(){e.showBindPopup=!1,e.showShopDetail=!1,e.handleBindShop()}),onCancel:n[7]||(n[7]=function(n){return e.showBindPopup=!1})},{content:o((function(){return[g]})),_:1},8,["show"]),Object(c["k"])(S,{show:e.showBindSuccess,headImg:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-debind-head.png",needCancelBtn:"",onConfirm:n[8]||(n[8]=function(n){return e.showBindSuccess=!1}),onCancel:n[9]||(n[9]=function(n){return e.showBindSuccess=!1})},{content:o((function(){return[k]})),_:1},8,["show"])],64)})),w=(t("159b"),t("d81d"),t("012c")),y=t("c947"),S=t("2241"),B=(t("47e2"),t("d399")),L=(t("433b"),t("5502")),I=t("765e"),T=Object(c["l"])({name:"CustomerHome",components:{PopupWithHead:I["a"]},setup:function(){var e=Object(L["b"])(),n=Object(c["e"])((function(){return e.state.lat})),t=Object(c["e"])((function(){return e.state.lng})),o=Object(c["E"])([]),i=Object(c["E"])(null),a=Object(c["E"])(!1),l=Object(c["E"])(!1),s=Object(c["E"])(!1),r=Object(c["E"])(!1),u=Object(c["E"])(!1),d=Object(c["E"])({id:0,shopImg:"",ShopName:"",contactPhone:"",addr:"",shopLat:0,shopLng:0,distance:0,iconUrl:""});B["a"].loading({message:"加载中...",forbidClick:!0,duration:1e4});var h=!1;setTimeout((function(){h||S["a"].confirm({title:"提示",message:"尊敬的用户，获取您的地理位置信息失败，请重新进入或刷新本页面。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){}))}),11e3);var p,b=function(){a.value=!a.value},f=function(e){d.value.id=e.id,d.value.shopImg=e.shopImg,d.value.ShopName=e.ShopName,d.value.contactPhone=e.contactPhone,d.value.addr=e.addr,d.value.shopLat=e.shopLat,d.value.shopLng=e.shopLng,d.value.distance=e.distance,r.value=!0},m=function(e){return e.forEach((function(e){e.distance>1e3?e.distance=Math.floor(e.distance/1e3*100)/100+"km":e.distance=Math.floor(e.distance)+"m"})),e},O={},j=function(n,t){y["b"].post("/hbSeller/fans/homeInfo",{lat:n,lng:t},!1).then((function(c){if("200"===c.code){var a=c.data,s=a.bindInfo,r=a.shopList;if(s?(i.value=s,e.commit("setBindShopFlag",!0)):(l.value=!0,e.commit("setBindShopFlag",!1)),null!==r&&0!==r.length||!0!==l.value&&S["a"].confirm({title:"提示",message:"当前区域未有注册零售户，请等待当地零售户开通注册。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){})),r&&r.length){o.value=m(r),O={pMarker:new TMap.MarkerStyle({width:20,height:30,anchor:{x:10,y:30}}),bindedStyle:new TMap.MarkerStyle({width:47,height:40,src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-binded.png",anchor:{x:16,y:32}}),cqStyle:new TMap.MarkerStyle({width:47,height:40,src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-cq.png",anchor:{x:16,y:32}}),hqStyle:new TMap.MarkerStyle({width:47,height:40,src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-hq.png",anchor:{x:16,y:32}})};var u=r.map((function(e){var n,t="style".concat(e.id);return O[t]=new TMap.MarkerStyle({width:47,height:40,src:e.iconUrl,anchor:{x:16,y:32}}),{id:e.id,styleId:(null===(n=i.value)||void 0===n?void 0:n.shopId)===e.id?"bindedStyle":t,position:new TMap.LatLng(e.shopLat,e.shopLng),properties:{id:e.id,title:e.ShopName,ShopName:e.ShopName,addr:e.addr,contactPhone:e.contactPhone,distance:e.distance,shopImg:e.shopImg,shopLat:e.shopLat,shopLng:e.shopLng}}}));u.push({id:0,styleId:"pMarker",position:new TMap.LatLng(n,t)}),p.setStyles(O),p.add(u)}}else B["a"].fail(c.msg)})).catch((function(e){console.log(e)}))},v=function(){l.value=!1,0===o.value.length&&S["a"].confirm({title:"提示",message:"当前区域未有注册零售户，请等待当地零售户开通注册。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){}))},g=function(){y["b"].post("/hbSeller/fans/bindShop",{shopId:d.value.id},!1).then((function(e){"200"===e.code?(B["a"].success({message:"绑定成功",onClose:function(){p.remove(o.value.map((function(e){return e.id}))),j(n.value,t.value)}}),u.value=!0):B["a"].fail(e.msg)})).catch((function(e){console.log(e)}))},k=function(){S["a"].confirm({title:"提示",messageAlign:"left",message:"尊敬的用户，解绑零售户，需在公众号留言“解绑零售户”，由客服人员后台操作处理，解绑前需领取未领取的奖品，如已领取请忽略，绑定关系解除后，已产生的相关活动数据会中断，需重新绑定零售户后参与店铺活动。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){}))},C=function(){Object(w["b"])().then((function(){console.log(n.value,t.value),h=!0;var e=new TMap.LatLng(n.value,t.value),c=new TMap.Map(document.getElementById("lbs-container"),{center:e,minZoom:11,maxZoom:13,zoom:13,mapZoomType:TMap.constants.MAP_ZOOM_TYPE.CENTER,draggable:!1,scrollable:!0,doubleClickZoom:!1,showControl:!1,pitchable:!1,rotatable:!1});p=new TMap.MultiMarker({id:"marker-layer",map:c,geometries:[]}),p.on("click",(function(e){console.log(e.geometry),f(e.geometry.properties)})),j(n.value,t.value)}))};return Object(c["P"])((function(){return n.value}),(function(e,c){n.value&&t.value&&null==c&&C()})),Object(c["w"])((function(){if(!n.value||!t.value)return sessionStorage.getItem("CustomerHome")?void 0:(sessionStorage.setItem("CustomerHome","1"),void window.location.reload());C()})),{showShopList:a,showNoBind:l,showBindPopup:s,shopListRef:o,showShopDetail:r,showBindSuccess:u,shopDetail:d,bindShop:i,handleClickListBtn:b,handleClickShop:f,handleBindShop:g,handleClickUnbind:k,handleCloseNoBind:v}}});t("b1e5"),t("5d9f");T.render=C,T.__scopeId="data-v-9f0f5ede";n["default"]=T},"765e":function(e,n,t){"use strict";var c=t("7a23"),o=Object(c["S"])("data-v-718d3164");Object(c["C"])("data-v-718d3164");var i={class:"popup-container"},a={class:"text"},l={class:"btns"},s=Object(c["k"])("img",{src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/Close.png",alt:""},null,-1);Object(c["A"])();var r=o((function(e,n,t,r,u,d){var h=Object(c["H"])("van-popup");return Object(c["z"])(),Object(c["g"])(h,{show:e.showPopup,"onUpdate:show":n[5]||(n[5]=function(n){return e.showPopup=n}),"close-on-click-overlay":!1,style:{"border-radius":"2.6vw","background-color":"unset"}},{default:o((function(){return[Object(c["k"])("img",{class:"popup-icon",src:e.headImg,style:e.headImgStyle,alt:""},null,12,["src"]),Object(c["k"])("div",i,[Object(c["G"])(e.$slots,"content",{},(function(){return[Object(c["k"])("div",a,Object(c["L"])(e.contentText),1)]}),{},!0),Object(c["k"])("div",l,[Object(c["G"])(e.$slots,"default",{},(function(){return[e.needCancelBtn?(Object(c["z"])(),Object(c["g"])(c["a"],{key:0},[Object(c["k"])("div",{class:"light",onClick:n[1]||(n[1]=function(){return e.handleClickCancel&&e.handleClickCancel.apply(e,arguments)})},"取消"),Object(c["k"])("div",{class:"plain",onClick:n[2]||(n[2]=function(){return e.handleClickConfirm&&e.handleClickConfirm.apply(e,arguments)})},"确定")],64)):(Object(c["z"])(),Object(c["g"])("div",{key:1,class:"plain no-cancel",onClick:n[3]||(n[3]=function(){return e.handleClickConfirm&&e.handleClickConfirm.apply(e,arguments)})},Object(c["L"])(e.confirmBtnText),1))]}),{},!0)])]),e.needCloseBtn?(Object(c["z"])(),Object(c["g"])("div",{key:0,class:"btn-close",onClick:n[4]||(n[4]=function(){return e.handleClickCancel&&e.handleClickCancel.apply(e,arguments)})},[s])):Object(c["h"])("",!0)]})),_:3},8,["show"])})),u=Object(c["l"])({name:"PopupWithHead",props:{show:{type:Boolean,requrie:!0,default:!1},headImg:{type:String,requrie:!0,default:""},headImgStyle:{type:Object||null,requrie:!1,default:null},needCancelBtn:{type:Boolean,requrie:!0,default:!1},contentText:{type:String,requrie:!1,default:""},confirmBtnText:{type:String,requrie:!0,default:"确定"},needCloseBtn:{type:Boolean,requrie:!1,default:!1}},setup:function(e,n){var t=Object(c["E"])(e.show);Object(c["P"])((function(){return e.show}),(function(){t.value=e.show}));var o=function(){n.emit("confirm")},i=function(){n.emit("cancel")};return{showPopup:t,handleClickConfirm:o,handleClickCancel:i}}});t("1c26");u.render=r,u.__scopeId="data-v-718d3164";n["a"]=u},b1e5:function(e,n,t){"use strict";t("6995")},d81d:function(e,n,t){"use strict";var c=t("23e7"),o=t("b727").map,i=t("1dde"),a=i("map");c({target:"Array",proto:!0,forced:!a},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=CustomerHome.2ed53f98.js.map