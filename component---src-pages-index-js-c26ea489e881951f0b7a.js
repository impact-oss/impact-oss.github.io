(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{RXBc:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),i=n.n(a),r=n("Wbzz"),c=n("Bl7J"),l=n("vrFN");t.default=function(){var e=Object(a.useState)({}),t=e[0],n=e[1];return Object(a.useEffect)((function(){fetch("/impact-data/data-files.json").then((function(e){return e.json()})).then((function(e){return n(e)}))}),[]),i.a.createElement(c.a,null,i.a.createElement(l.a,{title:"Home"}),i.a.createElement("div",null,Object.keys(t).map((function(e){return i.a.createElement("div",{key:e,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"left"}},e,i.a.createElement("div",{style:{marginLeft:"2rem"}},">",Object.keys(t[e]).map((function(n){return i.a.createElement(r.Link,{key:n,to:"/region/?region="+e+"&subregion="+n+"&filename="+t[e][n].filename+"&population="+t[e][n].population+"&employed_percent="+t[e][n].employed_percent},n)}))))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-c26ea489e881951f0b7a.js.map