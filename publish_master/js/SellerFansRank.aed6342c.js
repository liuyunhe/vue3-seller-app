(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["SellerFansRank"],{"14cc":function(e,t,a){},"20b9":function(e,t,a){"use strict";a("663d")},"663d":function(e,t,a){},"6b25":function(e,t,a){},"6c2f":function(e,t,a){"use strict";a("14cc")},"6c7d":function(e,t,a){"use strict";var n=a("7a23"),c=Object(n["S"])("data-v-b4d1c714");Object(n["C"])("data-v-b4d1c714");var s={class:"wrapper"},o={class:"content"};Object(n["A"])();var i=c((function(e,t,a,i,l,r){var u=Object(n["H"])("van-overlay");return Object(n["z"])(),Object(n["g"])(u,{show:e.show,"lock-scroll":!1},{default:c((function(){return[Object(n["k"])("div",s,[Object(n["k"])("div",o,[Object(n["G"])(e.$slots,"default",{},void 0,!0)]),Object(n["k"])("div",{class:"close",onClick:t[1]||(t[1]=function(){return e.handleClickClose&&e.handleClickClose.apply(e,arguments)})})])]})),_:3},8,["show"])})),l=Object(n["l"])({name:"ActTipsPopup",props:{show:{type:Boolean,default:!1}},setup:function(e,t){var a=function(){t.emit("close")};return{handleClickClose:a}}});a("6c2f");l.render=i,l.__scopeId="data-v-b4d1c714";t["a"]=l},"7c2b":function(e,t,a){"use strict";var n=a("7a23"),c=Object(n["S"])("data-v-398be061");Object(n["C"])("data-v-398be061");var s={class:"wrapper"},o={class:"content"};Object(n["A"])();var i=c((function(e,t,a,i,l,r){var u=Object(n["H"])("van-overlay");return Object(n["z"])(),Object(n["g"])(u,{show:e.show},{default:c((function(){return[Object(n["k"])("div",s,[Object(n["k"])("div",o,[Object(n["G"])(e.$slots,"default",{},void 0,!0)]),Object(n["k"])("div",{class:"close",onClick:t[1]||(t[1]=function(){return e.handleClickClose&&e.handleClickClose.apply(e,arguments)})})])]})),_:3},8,["show"])})),l=Object(n["l"])({props:{show:{type:Boolean,default:!1}},setup:function(e,t){var a=function(){t.emit("close")};return{handleClickClose:a}}});a("20b9");l.render=i,l.__scopeId="data-v-398be061";t["a"]=l},"92ef":function(e,t,a){"use strict";a.r(t);var n=a("7a23"),c=Object(n["S"])("data-v-0bbb1d12");Object(n["C"])("data-v-0bbb1d12");var s={class:"fans-rank-container"},o={class:"tips-content"},i={class:"award-warp"},l=Object(n["k"])("div",{class:"title"},null,-1),r={class:"name"},u={class:"no-award-warp"},d=Object(n["k"])("div",{class:"name"},"未中奖",-1),b={class:"bg"},f={class:"join-etime"},j={class:"rank-data"},O={class:"item left"},p={class:"title"},v={class:"data"},k={class:"item right"},h=Object(n["k"])("div",{class:"title"},"本期绑定粉丝数",-1),w={class:"data"},m={class:"rank-list"},C={key:0,class:"icon first"},g={key:1,class:"icon second"},N={key:2,class:"icon third"},y={key:3,class:"index"},A={class:"shop-name"},L={class:"fans"},T={key:0,class:"no-list"};Object(n["A"])();var P=c((function(e,t,a,P,E,I){var S=Object(n["H"])("act-tips-popup"),_=Object(n["H"])("award-popup");return Object(n["z"])(),Object(n["g"])("div",s,[Object(n["k"])(S,{show:e.showTips,onClose:e.handleColseTips},{default:c((function(){return[Object(n["k"])("div",o,[Object(n["k"])("div",{class:"text",innerHTML:e.actTips},null,8,["innerHTML"])])]})),_:1},8,["show","onClose"]),Object(n["k"])(_,{show:e.showAwardPopup,onClose:e.handleCloseAwardPopup},{default:c((function(){return[Object(n["k"])("div",i,[l,Object(n["k"])("img",{class:"pic",src:e.drawData&&e.drawData.awdPic,alt:""},null,8,["src"]),Object(n["k"])("div",r,Object(n["L"])(e.drawData&&e.drawData.awdName),1),Object(n["k"])("div",{class:"btn",onClick:t[1]||(t[1]=function(t){return e.handleReceive(e.drawData,(function(){e.showAwardPopup=!1}))})})])]})),_:1},8,["show","onClose"]),Object(n["k"])(_,{show:e.showNoAwardPopup,onClose:e.handleCloseNoAwardPopup},{default:c((function(){return[Object(n["k"])("div",u,[d,Object(n["k"])("div",{class:"btn",onClick:t[2]||(t[2]=function(){return e.handleCloseNoAwardPopup&&e.handleCloseNoAwardPopup.apply(e,arguments)})})])]})),_:1},8,["show","onClose"]),Object(n["k"])("div",b,[Object(n["k"])("div",{class:"btn-tips",onClick:t[3]||(t[3]=function(t){return e.showTips=!0})}),Object(n["k"])("div",{class:"btn-gift",onClick:t[4]||(t[4]=function(){return e.handleClickGiftsBtn&&e.handleClickGiftsBtn.apply(e,arguments)})}),Object(n["k"])("div",f,"参与截止时间："+Object(n["L"])(e.joinEtime),1),Object(n["k"])("div",j,[Object(n["k"])("div",O,[Object(n["k"])("div",p,Object(n["L"])(e.statisTime?"截止".concat(e.statisTime.substr(5),"排名"):"—"),1),Object(n["k"])("div",v,Object(n["L"])(0==e.rankNum?"暂无":"第".concat(e.rankNum,"名")),1)]),Object(n["k"])("div",k,[h,Object(n["k"])("div",w,Object(n["L"])(0==e.newFansNum?"暂无":"".concat(e.newFansNum,"个")),1)])]),Object(n["k"])("div",m,[Object(n["k"])("ul",null,[(Object(n["z"])(!0),Object(n["g"])(n["a"],null,Object(n["F"])(e.rankList,(function(e){return Object(n["z"])(),Object(n["g"])("li",{key:e.id},[1==e.rankNum?(Object(n["z"])(),Object(n["g"])("div",C)):Object(n["h"])("",!0),2==e.rankNum?(Object(n["z"])(),Object(n["g"])("div",g)):Object(n["h"])("",!0),3==e.rankNum?(Object(n["z"])(),Object(n["g"])("div",N)):Object(n["h"])("",!0),e.rankNum>3?(Object(n["z"])(),Object(n["g"])("div",y,Object(n["L"])(e.rankNum),1)):Object(n["h"])("",!0),Object(n["k"])("div",A,Object(n["L"])(e.shopName),1),Object(n["k"])("div",L,Object(n["L"])(e.newFansNum),1)])})),128)),e.showNoList?(Object(n["z"])(),Object(n["g"])("div",T,"当前无排名数据")):Object(n["h"])("",!0)])])])])})),E=a("c947"),I=a("2241"),S=(a("47e2"),a("d399")),_=(a("433b"),a("6c7d")),z=a("7c2b"),D=a("be35"),F=a("99ba"),R=a("6c02"),x=Object(n["l"])({name:"FansRank",props:{actCode:{type:String,default:""}},components:{ActTipsPopup:_["a"],AwardPopup:z["a"]},setup:function(e){var t=Object(n["E"])(0),a=Object(n["E"])(0),c=Object(n["E"])(""),s=Object(n["E"])([]),o=Object(n["E"])(!1),i=Object(n["E"])(!1),l=Object(n["E"])(null),r=Object(n["E"])(!1),u=Object(n["E"])(!1),d=Object(n["E"])(null),b=Object(n["E"])(""),f=Object(R["c"])(),j=function(){Object(F["a"])(f,"/common/myGifts")},O=function(){E["b"].post("/hbSeller/seller/fansRankAct/rankAwdInfo",{actCode:e.actCode},!1).then((function(e){if("200"===e.code){var t=e.data.awdInfo,a=t.joinEnd,n=t.resultFlag,c=t.userAward;if(!a)return;switch(n){case 1:I["a"].alert({title:"提示",message:"参与时间已结束，请耐心等待统计排名"}).then((function(){}));break;case 2:I["a"].alert({title:"提示",message:"抱歉，未开排名奖励内，请下次再接再厉！"}).then((function(){}));break;case 3:I["a"].alert({title:"提示",message:"恭喜在排名内，开奖中，请耐心等待"}).then((function(){}));break;case 4:null!=c&&(l.value=c,r.value=!0);break;case 5:I["a"].alert({title:"提示",message:"活动奖品已领取\n请进入<我的礼品>中查看～"}).then((function(){}));break;case 6:I["a"].alert({title:"提示",message:"很遗憾，奖品一直未领取，已过期~"}).then((function(){}));break;default:break}}else I["a"].alert({title:"提示",message:e.msg}).then((function(){}))}))},p=function(){E["b"].post("/hbSeller/seller/fansRankAct/rankInfo",{actCode:e.actCode},!1).then((function(e){"200"===e.code?(d.value=e.data.joinEtime||null,c.value=e.data.statisTime||"",e.data.rankInfo&&(t.value=e.data.rankInfo.rankNum||0,a.value=e.data.rankInfo.newFansNum||0),e.data.joinEnd?e.data.rankList?(s.value=JSON.parse(e.data.rankList),O()):(o.value=!0,I["a"].alert({title:"提示",message:"参与时间已截止，排名正在统计中..."}).then((function(){}))):e.data.rankList?s.value=JSON.parse(e.data.rankList):(o.value=!0,I["a"].alert({title:"提示",message:"拉新排行榜活动火热进行中，赶紧邀请您的好友成为您的粉丝吧！相关数据会在每天0点更新后显示，请持续关注哦！"}).then((function(){}))),0!=s.value.length&&null!=s.value||(o.value=!0)):S["a"].fail(e.msg)}))},v=function(){i.value=!1},k=function(){r.value=!1,Object(S["a"])("活动奖品，请进入<我的礼品>中查看～")},h=function(){u.value=!1};return Object(D["b"])(e.actCode).then((function(e){b.value=e})),Object(n["w"])((function(){p()})),{actTips:b,showTips:i,showAwardPopup:r,showNoAwardPopup:u,rankNum:t,rankList:s,showNoList:o,newFansNum:a,statisTime:c,drawData:l,joinEtime:d,handleColseTips:v,handleCloseAwardPopup:k,handleCloseNoAwardPopup:h,handleReceive:D["c"],handleClickGiftsBtn:j}}});a("dcc6"),a("c883");x.render=P,x.__scopeId="data-v-0bbb1d12";t["default"]=x},"99ba":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(e,t){e.push(t)}},be35:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return r}));a("d3b7");var n=a("c947"),c=a("2241"),s=(a("47e2"),a("d399")),o=(a("433b"),function(e){return new Promise((function(t){n["b"].post("/hbSeller/act/hbsDraw",e,!1).then((function(e){"200"===e.code?t(e.data):c["a"].alert({title:"提示",message:e.msg}).then((function(){}))}))}))}),i=function(e,t){1==e.awdType?window.location.href="/yx/views/general/order-preview.html":n["b"].post("/syx/awd/rcv/virtual",{uaId:e.uaId},!1).then((function(e){if("701"!==e.code)if("700"!==e.code){var a={200:"领取成功",4001:'每日最多可领取"10"个红包，您已达到领取上限，次日0点之后可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。',4002:"您还未进行微信实名认证，请先进行微信实名认证再领取红包！<br />奖品可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。",4003:"系统异常，请稍后重试<br />领取失败可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。"},n="";switch(e.code){case"200":n=a[e.code],s["a"].success({message:n,onClose:function(){t(e.code)}});break;case"4001":n=a[e.code],c["a"].alert({title:"提示",message:n}).then((function(){t()}));break;case"4002":n=a[e.code],c["a"].alert({title:"提示",message:n}).then((function(){t()}));break;case"4003":n=a[e.code],c["a"].alert({title:"提示",message:n}).then((function(){t()}));break;default:n=e.msg,c["a"].alert({title:"提示",message:n}).then((function(){t()}));break}}else c["a"].alert({title:"提示",message:"领取此奖励需要您绑定手机号，点击“立即绑定”按钮前往公众号-个人中心-会员权益中绑定，绑定后您重新进入私域平台-我的礼品中进行领取即可"}).then((function(){window.location.href="/scoremall/html/member.html"})).catch((function(){t()}))}))},l=function(e,t){if(null!=e){if(0!==e.awdStatus)return 1===e.awdStatus||0===e.awdStatus?2==e.awdType&&e.awdJumpurl?void(window.location.href=e.awdJumpurl):void(window.location.href="/yx/views/general/gift-detail.html?uaId="+e.uaId):void 0;1!=e.awdType?i(e,t):window.location.href="/yx/views/general/order-preview.html?uaId=".concat(e.uaId,"&hbSeller=1")}},r=function(e){return new Promise((function(t){n["b"].post("/hbSeller/act/ruleDesc",{actCode:e},!1).then((function(e){"200"===e.code?t(e.data.actRuleDesc||""):c["a"].alert({title:"提示",message:e.msg}).then((function(){}))}))}))}},c014:function(e,t,a){},c883:function(e,t,a){"use strict";a("c014")},dcc6:function(e,t,a){"use strict";a("6b25")}}]);
//# sourceMappingURL=SellerFansRank.aed6342c.js.map