(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2253],{54974:function(e,t,r){"use strict";var s=this&&this.__rest||function(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&0>t.indexOf(s)&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,s=Object.getOwnPropertySymbols(e);l<s.length;l++)0>t.indexOf(s[l])&&Object.prototype.propertyIsEnumerable.call(e,s[l])&&(r[s[l]]=e[s[l]]);return r},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Tgroup=t.Trow=t.Tcol=t.Tfoot=t.Thead=t.Table=void 0;let a=r(24246),i=l(r(27378)),n=({width:e})=>(0,a.jsx)("hr",{style:{borderWidth:0,margin:0,width:e}});class o extends i.default.Component{table(){return"TableCol"}render(){let e=this.props,{stickyBottom:t,stickyLeft:r,stickyRight:l,stickyTop:i,noWrap:o,rowSpan:c,colSpan:p,wrap1:u,wrap2:d,wrap3:f,wrap4:h,wrap5:b,className:m,children:x}=e,j=s(e,["stickyBottom","stickyLeft","stickyRight","stickyTop","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),y=["frui-tbl-col"];(t||r||l||i)&&(y.push("frui-tbl-sticky"),t&&y.push("frui-tbl-sticky-b","frui-tbl-z1"),r&&y.push("frui-tbl-sticky-l","frui-tbl-z2"),l&&y.push("frui-tbl-sticky-r","frui-tbl-z2"),i&&y.push("frui-tbl-sticky-t","frui-tbl-z1")),o&&y.push("frui-tbl-nowrap");let N={};c&&(N.rowSpan=c||0),p&&(N.colSpan=p||0);let w=null;return u?w=(0,a.jsx)(n,{width:"100px"}):d?w=(0,a.jsx)(n,{width:"200px"}):f?w=(0,a.jsx)(n,{width:"300px"}):h?w=(0,a.jsx)(n,{width:"400px"}):b&&(w=(0,a.jsx)(n,{width:"500px"})),m&&y.push(m),(0,a.jsxs)("td",Object.assign({valign:"top"},j,{className:y.join(" ")},N,{children:[x,w]}))}}t.Tcol=o;class c extends i.default.Component{table(){return"TableFoot"}render(){let e=this.props,{stickyBottom:t,stickyLeft:r,stickyRight:l,noWrap:i,rowSpan:n,colSpan:o,className:c,children:p}=e,u=s(e,["stickyBottom","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","className","children"]),d=["frui-tbl-foot"];(t||r||l)&&(d.push("frui-tbl-sticky"),t&&d.push("frui-tbl-sticky-b","frui-tbl-z1"),r&&d.push("frui-tbl-sticky-l","frui-tbl-z2"),l&&d.push("frui-tbl-sticky-r","frui-tbl-z2"),i&&d.push("frui-tbl-nowrap"));let f={};return n&&(f.rowSpan=n||0),o&&(f.colSpan=o||0),c&&d.push(c),(0,a.jsx)("th",Object.assign({},u,{className:d.join(" ")},f,{children:p}))}}t.Tfoot=c;class p extends i.default.Component{table(){return"TableGroup"}render(){return this.props.children}}t.Tgroup=p;class u extends i.default.Component{table(){return"TableRow"}render(){let e=this.props,{noWrap:t,rowSpan:r,colSpan:l,className:i,children:n}=e,o=s(e,["noWrap","rowSpan","colSpan","className","children"]),c=["frui-tbl-row"];t&&c.push("frui-tbl-nowrap");let p={};return r&&(p.rowSpan=r||0),l&&(p.colSpan=l||0),i&&c.push(i),(0,a.jsx)("tr",Object.assign({},o,{className:c.join(" ")},p,{children:n}))}}t.Trow=u;class d extends i.default.Component{table(){return"TableHead"}render(){let e=this.props,{stickyTop:t,stickyLeft:r,stickyRight:l,noWrap:i,rowSpan:o,colSpan:c,wrap1:p,wrap2:u,wrap3:d,wrap4:f,wrap5:h,className:b,children:m}=e,x=s(e,["stickyTop","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),j=["frui-tbl-head"];(r||l||t)&&(j.push("frui-tbl-sticky"),t&&(j.push("frui-tbl-sticky-t"),r&&l?j.push("frui-tbl-z4"):r||l?j.push("frui-tbl-z3"):j.push("frui-tbl-z1")),r&&j.push("frui-tbl-sticky-l","frui-tbl-z1"),l&&j.push("frui-tbl-sticky-r","frui-tbl-z1")),i&&j.push("frui-tbl-nowrap");let y={};o&&(y.rowSpan=o||0),c&&(y.colSpan=c||0);let N=null;return p?N=(0,a.jsx)(n,{width:"100px"}):u?N=(0,a.jsx)(n,{width:"200px"}):d?N=(0,a.jsx)(n,{width:"300px"}):f?N=(0,a.jsx)(n,{width:"400px"}):h&&(N=(0,a.jsx)(n,{width:"500px"})),b&&j.push(b),(0,a.jsxs)("th",Object.assign({},x,{className:j.join(" ")},y,{children:[m,N]}))}}t.Thead=d;let f=function(e){var t,r;let s=[];if(Array.isArray(e))for(let l of e)l&&(Array.isArray(l)?s.push.apply(s,f(l)):"object"==typeof l&&l.props&&"thead"in l.props?s.push(l):"function"==typeof(null===(r=null===(t=null==l?void 0:l.type)||void 0===t?void 0:t.prototype)||void 0===r?void 0:r.table)&&"TableHead"===l.type.prototype.table()&&s.push(l));return s},h=function(e){var t,r;let s=[];if(Array.isArray(e))for(let l of e)Array.isArray(l)?s.push.apply(s,h(l)):"object"==typeof l&&l.props&&"tfoot"in l.props?s.push(l):"function"==typeof(null===(r=null===(t=null==l?void 0:l.type)||void 0===t?void 0:t.prototype)||void 0===r?void 0:r.table)&&"TableFoot"===l.type.prototype.table()&&s.push(l);return s},b=function(e){var t,r,s,l;let a=[];if(Array.isArray(e))for(let i of e)if(Array.isArray(i))a.push.apply(a,b(i));else if("object"==typeof i&&i.props&&"tbody"in i.props)a.push(i);else if("function"==typeof(null===(r=null===(t=null==i?void 0:i.type)||void 0===t?void 0:t.prototype)||void 0===r?void 0:r.table)&&"TableGroup"===i.type.prototype.table()){let e=i.props.children||[];Array.isArray(e)&&e.length>0&&a.push(...e)}else"function"==typeof(null===(l=null===(s=null==i?void 0:i.type)||void 0===s?void 0:s.prototype)||void 0===l?void 0:l.table)&&"TableRow"===i.type.prototype.table()&&a.push(i);return a};function m(e){let t=e.children||[];Array.isArray(t)||(t=[t]);let r=f(t),s=b(t),l=h(t),i=["frui-tbl-overflow"];return e.className&&i.push(e.className),(0,a.jsx)("div",Object.assign({className:i.join(" "),style:e.style},{children:(0,a.jsxs)("table",Object.assign({className:"frui-tbl"},{children:[r&&(0,a.jsx)("thead",{children:(0,a.jsx)("tr",{children:r})}),s&&(0,a.jsx)("tbody",{children:s}),l&&(0,a.jsx)("tfoot",{children:(0,a.jsx)("tr",{children:l})})]}))}))}t.default=m,t.Table=m},63391:function(e,t,r){"use strict";let s=r(24246),l=(e,t,r,s,l=!1)=>{let a=Math.abs(e),i=Math.floor(a),n=a-i,o=Math.max(0,s||String(n).split(".")[1].length),c=o?r+n.toFixed(o).slice(2):"",p=i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,t);return l?p+c:(e<0?"-":"")+p+c};t.Z=function(e){let{value:t,separator:r="",decimal:a=".",decimals:i,absolute:n}=e,o=l(Number(t)||0,r,a,i,n);return(0,s.jsx)(s.Fragment,{children:o})}},13349:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/format/number",function(){return r(33176)}])},36493:function(e,t,r){"use strict";r.d(t,{C:function(){return c},Z:function(){return o}});var s=r(24246),l=r(22879),a=r(74631),i=r(48717),n=r(14707);function o(e){let{value:t,quote:r,l,r:a,children:i}=e;return(0,s.jsxs)(s.Fragment,{children:[l?(0,s.jsx)("span",{children:"\xa0"}):"",(0,s.jsxs)("code",{className:"text-sm text-t2 bg-b1 font-semibold inline-block p-0.5",children:[r?"`":"",t||i,r?"`":""]}),a?(0,s.jsx)("span",{children:"\xa0"}):""]})}function c(e){let{className:t,copy:r=!0,children:o,language:c}=e,{_:p}=(0,l.useLanguage)();return(0,s.jsxs)("div",{className:"flex text-sm bg-black ".concat(t||""),children:[(0,s.jsx)(a.Z,{className:"flex-grow !p-4 !bg-transparent",language:c,style:i._4,children:o}),r&&(0,s.jsxs)("div",{className:"text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap",onClick:()=>{navigator.clipboard.writeText(o.toString()),(0,n.ZP)("success",p("Copied to clipboard"))},children:[(0,s.jsx)("i",{className:"fas fa-copy"})," ",p("Copy")]})]})}},18604:function(e,t,r){"use strict";var s=r(24246);r(27378);var l=r(79894),a=r.n(l);let i=e=>{let{href:t,label:r,icon:l,last:i}=e,n=t?(0,s.jsx)(a(),{href:t,className:"inline-flex items-center text-t2",children:r}):(0,s.jsx)("span",{className:"inline-flex items-center font-semibold text-t1",children:r});return(0,s.jsxs)(s.Fragment,{children:[l&&(0,s.jsx)("i",{className:"fas fa-fw fa-".concat(l," inline-block mr-1 text-t1")}),n,!i&&(0,s.jsx)("i",{className:"fas fa-fw fa-chevron-right mx-1 text-t1"})]})},n=e=>{var t;let{trail:r}=e;if(0===r.length)return null;let l=r[r.length-1],i=l.href||(null===(t=r[r.length-2])||void 0===t?void 0:t.href);return i?(0,s.jsxs)(a(),{className:"flex md:hidden items-center cursor-pointer whitespace-nowrap overflow-x-hidden",href:i,children:[(0,s.jsx)("i",{className:"mr-1 fas fa-fw fa-chevron-left text-xl text-t2"}),!!l.icon&&(0,s.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(l.icon," text-sm")}),(0,s.jsx)("span",{className:"font-bold",children:l.label})]}):(0,s.jsxs)("div",{className:"flex md:hidden items-center whitespace-nowrap overflow-x-hidden",children:[!!l.icon&&(0,s.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(l.icon," text-sm")}),(0,s.jsx)("span",{className:"font-bold",children:l.label})]})};t.Z=e=>{let{crumbs:t,className:r}=e,l=[...t].filter(e=>!!e.label),a=["hidden md:flex items-center whitespace-nowrap overflow-x-auto"];return r&&a.push(r),(0,s.jsxs)("nav",{children:[(0,s.jsx)("div",{className:a.join(" "),children:l.map((e,t)=>(0,s.jsx)(i,{href:e.href,label:e.label,icon:e.icon,last:t===l.length-1},t))}),(0,s.jsx)(n,{trail:l})]})}},63527:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var s=r(24246),l=r(22879),a=r(79531),i=r(54974),n=r.n(i);function o(e){let{props:t}=e,{_:r}=(0,l.useLanguage)(),o=(0,a.Z)("bg-b2","bg-b1");return(0,s.jsxs)(n(),{children:[(0,s.jsx)(i.Thead,{className:"text-left bg-b3",children:r("Name")}),(0,s.jsx)(i.Thead,{className:"text-left bg-b3",children:r("Type")}),(0,s.jsx)(i.Thead,{className:"text-center bg-b3",children:r("Required")}),(0,s.jsx)(i.Thead,{className:"text-left bg-b3",children:r("Notes")}),t.map((e,t)=>(0,s.jsxs)(i.Trow,{children:[(0,s.jsx)(i.Tcol,{className:"".concat(o(t)),children:e[0]}),(0,s.jsx)(i.Tcol,{className:"".concat(o(t)),children:e[1]}),(0,s.jsx)(i.Tcol,{className:"".concat(o(t)," text-center"),children:e[2]}),(0,s.jsx)(i.Tcol,{className:"".concat(o(t)),children:e[3]})]},t))]})}},79531:function(e,t,r){"use strict";function s(e,t){let r=e;return s=>"number"==typeof s?s%2==0?e:t:(s&&(r=r===e?t:e),r)}r.d(t,{Z:function(){return s}})},33176:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var s=r(24246),l=r(22879),a=r(79894),i=r.n(a),n=r(63391),o=r(78968),c=r(18604),p=r(63527),u=r(36493);function d(){let{_:e}=(0,l.useLanguage)(),t=[[e("absolute"),e("string"),e("No"),e("Remove negative sign")],[e("decimal"),e("string"),e("No"),e("Character for decimal")],[e("decimals"),e("number"),e("No"),e("Number of decimals to show")],[e("separator"),e("boolean"),e("No"),e("Character of comma separator")],[e("style"),e("CSS Object"),e("No"),e("Standard CSS object")],[e("value"),e("string|number"),e("Yes"),e("Default value")]];return(0,s.jsx)(o.sF,{uri:"/format/number",title:"Number Format",description:"Number formats in FRUI, are ReactJS components that convert values to numerical displays.",children:(0,s.jsxs)("main",{className:"flex flex-col h-full w-full",children:[(0,s.jsx)("div",{className:"p-3 bg-b2",children:(0,s.jsx)(c.Z,{crumbs:[{icon:"text-height",label:"Formats",href:"/format"},{label:"Number"}]})}),(0,s.jsxs)("div",{className:"flex-grow relative h-full",children:[(0,s.jsxs)("aside",{className:"hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm",children:[(0,s.jsx)("h4",{className:"p-3 border-b border-b1 bg-b1 uppercase font-semibold",children:(0,s.jsx)(i(),{href:"#top",children:e("Number")})}),(0,s.jsxs)("ul",{className:"list-disc py-3 pr-3 pl-6",children:[(0,s.jsx)("li",{className:"pl-3 pb-1",children:(0,s.jsx)(i(),{href:"#props",children:e("Props")})}),(0,s.jsx)("li",{className:"pl-3 pb-1",children:(0,s.jsx)(i(),{href:"#basic",children:e("Basics")})})]})]}),(0,s.jsxs)("div",{className:"absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto",children:[(0,s.jsx)("h1",{id:"top",className:"flex items-center uppercase font-bold text-xl",children:e("Number")}),(0,s.jsx)(u.C,{language:"typescript",className:"mt-2",children:"import Number from 'frui/formats/Number';"}),(0,s.jsx)("h2",{id:"props",className:"uppercase font-bold text-lg mt-8",children:e("Props")}),(0,s.jsx)(p.Z,{props:t}),(0,s.jsx)("h2",{id:"basic",className:"uppercase font-bold text-lg mt-8",children:e("Basics")}),(0,s.jsxs)("div",{className:"curved overflow-hidden",children:[(0,s.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,s.jsx)(n.Z,{value:"12345.67",separator:",",decimal:".",decimals:2})}),(0,s.jsx)(u.C,{language:"typescript",children:'<Number value="12345.67" separator="," decimal="." decimals={2} />'})]}),(0,s.jsxs)("div",{className:"flex items-center border-t border-b2 mt-8 pt-4",children:[(0,s.jsxs)(i(),{className:"text-t2",href:"/format/metadata",children:[(0,s.jsx)("i",{className:"fas fa-arrow-left mr-2"}),e("Metadata")]}),(0,s.jsx)("div",{className:"flex-grow"}),(0,s.jsxs)(i(),{className:"text-t2",href:"/format/overflow",children:[e("Overflow"),(0,s.jsx)("i",{className:"fas fa-arrow-right ml-2"})]})]})]})]})]})})}}},function(e){e.O(0,[9461,2888,9774,179],function(){return e(e.s=13349)}),_N_E=e.O()}]);