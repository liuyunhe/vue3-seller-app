(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Feedback"],{"1baa":function(e,t,n){"use strict";n("5cad")},"5cad":function(e,t,n){},e570:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),a=Object(o["S"])("data-v-5049c1d4");Object(o["C"])("data-v-5049c1d4");var c={class:"feedback-container"},l=Object(o["k"])("div",{class:"mg10"},null,-1),u=Object(o["k"])("div",{class:"mg10"},null,-1),d=Object(o["k"])("div",{class:"tips"},"我们会仔细阅读您的反馈，并尽早给您回复，非常感谢。",-1),i={style:{margin:"16px"}},r=Object(o["j"])(" 提交 ");Object(o["A"])();var b=a((function(e,t,n,b,s,f){var p=Object(o["H"])("van-field"),m=Object(o["H"])("van-cell-group"),j=Object(o["H"])("van-button"),O=Object(o["H"])("van-form");return Object(o["z"])(),Object(o["g"])("div",c,[Object(o["k"])(O,{onSubmit:e.onSubmit},{default:a((function(){return[Object(o["k"])(m,{inset:""},{default:a((function(){return[Object(o["k"])(p,{modelValue:e.feedContent,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.feedContent=t}),name:"feedContent",rows:"3",autosize:"",label:"","label-width":"0",type:"textarea",maxlength:"50",placeholder:"请简要描述您的问题或意见","show-word-limit":"",rules:[{required:!0,message:"请输入内容"}]},null,8,["modelValue"])]})),_:1}),l,Object(o["k"])(m,{inset:""},{default:a((function(){return[Object(o["k"])(p,{modelValue:e.phoneNo,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.phoneNo=t}),name:"phoneNo",rows:"1",autosize:"",label:"联系方式：","label-width":"5.5em",type:"input",maxlength:"11",placeholder:"请输入手机号码"},null,8,["modelValue"])]})),_:1}),u,d,Object(o["k"])("div",i,[Object(o["k"])(j,{round:"",block:"",type:"primary","native-type":"submit"},{default:a((function(){return[r]})),_:1})])]})),_:1},8,["onSubmit"])])})),s=n("c947"),f=n("d399"),p=(n("433b"),Object(o["l"])({name:"Feedback",props:{feedFrom:{type:String,requried:!0}},setup:function(e){var t=Object(o["E"])(""),n=Object(o["E"])(""),a=/^1[3456789]\d{9}$/,c=!1,l=function(t){if(!c)if(!t.phoneNo||a.test(t.phoneNo)){c=!0;var n=Object.assign(t,{feedFrom:e.feedFrom});s["b"].post("/hbSeller/feedback/add",n,!1).then((function(e){"200"===e.code?(f["a"].success("提交成功！"),setTimeout((function(){window.history.go(-1)}),3e3)):f["a"].fail(e.msg)})).catch((function(e){console.log(e)}))}else f["a"].fail("手机号格式错误！")};return{feedContent:t,phoneNo:n,phonePattern:a,onSubmit:l}}}));n("1baa");p.render=b,p.__scopeId="data-v-5049c1d4";t["default"]=p}}]);
//# sourceMappingURL=Feedback.0a2305f0.js.map