(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["SellerMemberInfo"],{"1ef2":function(e,t,l){"use strict";l.r(t);var c=l("7a23"),a=Object(c["S"])("data-v-32316950");Object(c["C"])("data-v-32316950");var s={class:"member-info-container"},n={class:"head"},v={class:"content"},i={class:"seller-head-img"},o={class:"info"},d={class:"name"},b=Object(c["k"])("i",{class:""},null,-1),j={class:"member"},r={class:"lv"},O=Object(c["k"])("span",{class:"title"},null,-1),u={class:"lv-content"},p={class:"lv-num"},f={class:"lv-bar"},h={class:"lv-num"},m={class:"main"},L=Object(c["i"])('<div class="title" data-v-32316950>零售户等级制度</div><div class="content" data-v-32316950><div class="level title" data-v-32316950>等级</div><div class="jf title" data-v-32316950>所需克拉值</div><div class="name title" data-v-32316950>名称</div></div>',2),k={class:"level text"},g={class:"jf text"},S={class:"name text"};Object(c["A"])();var w=a((function(e,t,l,a,w,E){return Object(c["z"])(),Object(c["g"])("div",s,[Object(c["k"])("div",n,[Object(c["k"])("div",v,[Object(c["k"])("div",i,[Object(c["k"])("img",{src:e.headimgurl,alt:""},null,8,["src"])]),Object(c["k"])("div",o,[Object(c["k"])("div",d,[Object(c["j"])(Object(c["L"])(e.shopName),1),b]),Object(c["k"])("div",j,[Object(c["k"])("span",r,"LV"+Object(c["L"])(e.shopLevel)+" "+Object(c["L"])(e.levelName),1),O])])]),Object(c["k"])("div",u,[Object(c["k"])("div",p,"LV"+Object(c["L"])(e.shopLevel),1),Object(c["k"])("div",f,[Object(c["k"])("div",{class:"active",style:{width:"".concat(e.levelBarWidth,"%")}},null,4)]),Object(c["k"])("div",h,"LV"+Object(c["L"])(e.shopLevel+1),1)])]),Object(c["k"])("div",m,[L,(Object(c["z"])(!0),Object(c["g"])(c["a"],null,Object(c["F"])(e.shopLevelList,(function(e){return Object(c["z"])(),Object(c["g"])("div",{class:"content",key:e.id},[Object(c["k"])("div",k,"LV"+Object(c["L"])(e.shopLevel),1),Object(c["k"])("div",g,Object(c["L"])(e.levelScoreMin)+" - "+Object(c["L"])(e.levelScoreMax),1),Object(c["k"])("div",S,Object(c["L"])(e.levelName),1)])})),128))])])})),E=l("c947"),I=l("d399"),N=(l("433b"),Object(c["l"])({name:"SellerMemberInfo",setup:function(){var e=Object(c["E"])(""),t=Object(c["E"])(""),l=Object(c["E"])(0),a=Object(c["E"])(""),s=Object(c["E"])(0),n=Object(c["E"])(0),v=Object(c["E"])([]),i=function(){E["b"].post("/hbSeller/sellerPerson/personInfo",{},!1).then((function(c){if("200"===c.code){e.value=c.data.personInfo.shopName,t.value=c.data.personInfo.headimgurl,l.value=c.data.personInfo.shopLevel,a.value=c.data.levelCode.levelName,s.value=c.data.upgradeScore;var v=c.data.levelCode.levelScoreMax-c.data.levelCode.levelScoreMin+1;n.value=(v-s.value)/v*100}else I["a"].fail(c.msg)})).catch((function(e){console.log(e)}))},o=function(){E["b"].post("/hbSeller/sellerPerson/shopLevelList",{},!1).then((function(e){"200"===e.code?v.value=e.data.levelCodeList:I["a"].fail(e.msg)})).catch((function(e){console.log(e)}))};return Object(c["w"])((function(){i(),o()})),{shopName:e,headimgurl:t,shopLevel:l,levelName:a,upgradeScore:s,levelBarWidth:n,shopLevelList:v}}}));l("2936");N.render=w,N.__scopeId="data-v-32316950";t["default"]=N},2936:function(e,t,l){"use strict";l("9822")},9822:function(e,t,l){}}]);
//# sourceMappingURL=SellerMemberInfo.67d1869c.js.map