(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["SignIn"],{"46e8":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),c=Object(a["S"])("data-v-511460fe");Object(a["C"])("data-v-511460fe");var s={class:"sign-in-containner"},i=Object(a["i"])('<div class="icon" data-v-511460fe><img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/sign-in-icon.png" alt="" data-v-511460fe></div><p class="title" data-v-511460fe>欢迎来到“私域全生态平台”</p><p class="tips" data-v-511460fe>如果您是零售户，这将是您维系粉丝的最佳工具；</p><p class="tips" style="margin-bottom:4rem;" data-v-511460fe> 如果您是消费者，这里有最好玩的专享活动。 </p>',4),r={class:"bar"},o=Object(a["j"])("我是零售户"),l=Object(a["j"])("我是消费者");Object(a["A"])();var u=c((function(e,t,n,u,f,d){var m=Object(a["H"])("van-button");return Object(a["R"])((Object(a["z"])(),Object(a["g"])("div",s,[i,Object(a["k"])("div",r,[Object(a["k"])(m,{square:"",type:"primary",style:{width:"8rem"},onClick:t[1]||(t[1]=function(t){return e.onClickBtn(e.router,"/seller/register")})},{default:c((function(){return[o]})),_:1}),Object(a["k"])(m,{square:"",plain:"",type:"primary",style:{width:"8rem"},onClick:t[2]||(t[2]=function(t){return e.onClickBtn(e.router,"/customer/home")})},{default:c((function(){return[l]})),_:1})])],512)),[[a["O"],e.showPage]])})),f=n("99ba"),d=n("c947"),m=n("2241"),b=(n("47e2"),n("d399")),p=(n("433b"),n("6c02")),g=n("0613"),v=Object(a["l"])({name:"SignIn",setup:function(){var e=Object(p["c"])(),t=Object(a["E"])(!1),n=function(e,t){"/seller/register"===t?m["a"].confirm({title:"提示",message:"尊敬的店主，您还未注册成为平台的入驻零售户，请您联系当地的钻石/荷花销售人员，索要注册链接。",closeOnClickOverlay:!0,confirmButtonText:"知道了"}).then((function(){})).catch((function(){})):Object(f["a"])(e,t)};return Object(a["w"])((function(){d["b"].get("/hbSeller/main/role",{}).then((function(n){if("200"===n.code){n.data.hasMsg?g["a"].commit("setHasMsg",!0):g["a"].commit("setHasMsg",!1);var a=n.data.role;if(1==a){var c=n.data.register||!1;c?e.push("/seller/sellerFans"):e.push("/seller/register")}else if(2==a){var s=n.data.needComplete;g["a"].commit("setNeedComplete",s),s?sessionStorage.setItem("needComplete","1"):sessionStorage.setItem("needComplete","0"),e.push("/customer/home")}else t.value=!0}else b["a"].fail(n.msg)})).catch((function(e){console.log(e)}))})),{router:e,showPage:t,onClickBtn:n}}});n("c230");v.render=u,v.__scopeId="data-v-511460fe";t["default"]=v},"4d2e":function(e,t,n){},"99ba":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=function(e,t){e.push(t)}},c230:function(e,t,n){"use strict";n("4d2e")}}]);
//# sourceMappingURL=SignIn.b65d4c87.js.map