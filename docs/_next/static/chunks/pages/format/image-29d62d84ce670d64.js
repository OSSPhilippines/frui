(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9745],{54974:function(e,t,s){"use strict";var r=this&&this.__rest||function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(s[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>t.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(s[r[l]]=e[r[l]]);return s},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Tgroup=t.Trow=t.Tcol=t.Tfoot=t.Thead=t.Table=void 0;let a=s(24246),i=l(s(27378)),n=({width:e})=>(0,a.jsx)("hr",{style:{borderWidth:0,margin:0,width:e}});class o extends i.default.Component{table(){return"TableCol"}render(){let e=this.props,{stickyBottom:t,stickyLeft:s,stickyRight:l,stickyTop:i,noWrap:o,rowSpan:c,colSpan:p,wrap1:u,wrap2:f,wrap3:d,wrap4:h,wrap5:b,className:x,children:m}=e,j=r(e,["stickyBottom","stickyLeft","stickyRight","stickyTop","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),y=["frui-tbl-col"];(t||s||l||i)&&(y.push("frui-tbl-sticky"),t&&y.push("frui-tbl-sticky-b","frui-tbl-z1"),s&&y.push("frui-tbl-sticky-l","frui-tbl-z2"),l&&y.push("frui-tbl-sticky-r","frui-tbl-z2"),i&&y.push("frui-tbl-sticky-t","frui-tbl-z1")),o&&y.push("frui-tbl-nowrap");let g={};c&&(g.rowSpan=c||0),p&&(g.colSpan=p||0);let w=null;return u?w=(0,a.jsx)(n,{width:"100px"}):f?w=(0,a.jsx)(n,{width:"200px"}):d?w=(0,a.jsx)(n,{width:"300px"}):h?w=(0,a.jsx)(n,{width:"400px"}):b&&(w=(0,a.jsx)(n,{width:"500px"})),x&&y.push(x),(0,a.jsxs)("td",Object.assign({valign:"top"},j,{className:y.join(" ")},g,{children:[m,w]}))}}t.Tcol=o;class c extends i.default.Component{table(){return"TableFoot"}render(){let e=this.props,{stickyBottom:t,stickyLeft:s,stickyRight:l,noWrap:i,rowSpan:n,colSpan:o,className:c,children:p}=e,u=r(e,["stickyBottom","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","className","children"]),f=["frui-tbl-foot"];(t||s||l)&&(f.push("frui-tbl-sticky"),t&&f.push("frui-tbl-sticky-b","frui-tbl-z1"),s&&f.push("frui-tbl-sticky-l","frui-tbl-z2"),l&&f.push("frui-tbl-sticky-r","frui-tbl-z2"),i&&f.push("frui-tbl-nowrap"));let d={};return n&&(d.rowSpan=n||0),o&&(d.colSpan=o||0),c&&f.push(c),(0,a.jsx)("th",Object.assign({},u,{className:f.join(" ")},d,{children:p}))}}t.Tfoot=c;class p extends i.default.Component{table(){return"TableGroup"}render(){return this.props.children}}t.Tgroup=p;class u extends i.default.Component{table(){return"TableRow"}render(){let e=this.props,{noWrap:t,rowSpan:s,colSpan:l,className:i,children:n}=e,o=r(e,["noWrap","rowSpan","colSpan","className","children"]),c=["frui-tbl-row"];t&&c.push("frui-tbl-nowrap");let p={};return s&&(p.rowSpan=s||0),l&&(p.colSpan=l||0),i&&c.push(i),(0,a.jsx)("tr",Object.assign({},o,{className:c.join(" ")},p,{children:n}))}}t.Trow=u;class f extends i.default.Component{table(){return"TableHead"}render(){let e=this.props,{stickyTop:t,stickyLeft:s,stickyRight:l,noWrap:i,rowSpan:o,colSpan:c,wrap1:p,wrap2:u,wrap3:f,wrap4:d,wrap5:h,className:b,children:x}=e,m=r(e,["stickyTop","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),j=["frui-tbl-head"];(s||l||t)&&(j.push("frui-tbl-sticky"),t&&(j.push("frui-tbl-sticky-t"),s&&l?j.push("frui-tbl-z4"):s||l?j.push("frui-tbl-z3"):j.push("frui-tbl-z1")),s&&j.push("frui-tbl-sticky-l","frui-tbl-z1"),l&&j.push("frui-tbl-sticky-r","frui-tbl-z1")),i&&j.push("frui-tbl-nowrap");let y={};o&&(y.rowSpan=o||0),c&&(y.colSpan=c||0);let g=null;return p?g=(0,a.jsx)(n,{width:"100px"}):u?g=(0,a.jsx)(n,{width:"200px"}):f?g=(0,a.jsx)(n,{width:"300px"}):d?g=(0,a.jsx)(n,{width:"400px"}):h&&(g=(0,a.jsx)(n,{width:"500px"})),b&&j.push(b),(0,a.jsxs)("th",Object.assign({},m,{className:j.join(" ")},y,{children:[x,g]}))}}t.Thead=f;let d=function(e){var t,s;let r=[];if(Array.isArray(e))for(let l of e)l&&(Array.isArray(l)?r.push.apply(r,d(l)):"object"==typeof l&&l.props&&"thead"in l.props?r.push(l):"function"==typeof(null===(s=null===(t=null==l?void 0:l.type)||void 0===t?void 0:t.prototype)||void 0===s?void 0:s.table)&&"TableHead"===l.type.prototype.table()&&r.push(l));return r},h=function(e){var t,s;let r=[];if(Array.isArray(e))for(let l of e)Array.isArray(l)?r.push.apply(r,h(l)):"object"==typeof l&&l.props&&"tfoot"in l.props?r.push(l):"function"==typeof(null===(s=null===(t=null==l?void 0:l.type)||void 0===t?void 0:t.prototype)||void 0===s?void 0:s.table)&&"TableFoot"===l.type.prototype.table()&&r.push(l);return r},b=function(e){var t,s,r,l;let a=[];if(Array.isArray(e))for(let i of e)if(Array.isArray(i))a.push.apply(a,b(i));else if("object"==typeof i&&i.props&&"tbody"in i.props)a.push(i);else if("function"==typeof(null===(s=null===(t=null==i?void 0:i.type)||void 0===t?void 0:t.prototype)||void 0===s?void 0:s.table)&&"TableGroup"===i.type.prototype.table()){let e=i.props.children||[];Array.isArray(e)&&e.length>0&&a.push(...e)}else"function"==typeof(null===(l=null===(r=null==i?void 0:i.type)||void 0===r?void 0:r.prototype)||void 0===l?void 0:l.table)&&"TableRow"===i.type.prototype.table()&&a.push(i);return a};function x(e){let t=e.children||[];Array.isArray(t)||(t=[t]);let s=d(t),r=b(t),l=h(t),i=["frui-tbl-overflow"];return e.className&&i.push(e.className),(0,a.jsx)("div",Object.assign({className:i.join(" "),style:e.style},{children:(0,a.jsxs)("table",Object.assign({className:"frui-tbl"},{children:[s&&(0,a.jsx)("thead",{children:(0,a.jsx)("tr",{children:s})}),r&&(0,a.jsx)("tbody",{children:r}),l&&(0,a.jsx)("tfoot",{children:(0,a.jsx)("tr",{children:l})})]}))}))}t.default=x,t.Table=x},38178:function(e,t,s){"use strict";var r=this&&this.__rest||function(e,t){var s={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(s[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>t.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(s[r[l]]=e[r[l]]);return s};Object.defineProperty(t,"__esModule",{value:!0});let l=s(24246);t.default=function(e){var{value:t}=e,s=r(e,["value"]);return(0,l.jsx)("img",Object.assign({},s,{src:t}))}},76837:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/format/image",function(){return s(4192)}])},36493:function(e,t,s){"use strict";s.d(t,{C:function(){return c},Z:function(){return o}});var r=s(24246),l=s(22879),a=s(74631),i=s(48717),n=s(14707);function o(e){let{value:t,quote:s,l,r:a,children:i}=e;return(0,r.jsxs)(r.Fragment,{children:[l?(0,r.jsx)("span",{children:"\xa0"}):"",(0,r.jsxs)("code",{className:"text-sm text-t2 bg-b1 font-semibold inline-block p-0.5",children:[s?"`":"",t||i,s?"`":""]}),a?(0,r.jsx)("span",{children:"\xa0"}):""]})}function c(e){let{className:t,copy:s=!0,children:o,language:c}=e,{_:p}=(0,l.useLanguage)();return(0,r.jsxs)("div",{className:"flex text-sm bg-black ".concat(t||""),children:[(0,r.jsx)(a.Z,{className:"flex-grow !p-4 !bg-transparent",language:c,style:i._4,children:o}),s&&(0,r.jsxs)("div",{className:"text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap",onClick:()=>{navigator.clipboard.writeText(o.toString()),(0,n.ZP)("success",p("Copied to clipboard"))},children:[(0,r.jsx)("i",{className:"fas fa-copy"})," ",p("Copy")]})]})}},18604:function(e,t,s){"use strict";var r=s(24246);s(27378);var l=s(79894),a=s.n(l);let i=e=>{let{href:t,label:s,icon:l,last:i}=e,n=t?(0,r.jsx)(a(),{href:t,className:"inline-flex items-center text-t2",children:s}):(0,r.jsx)("span",{className:"inline-flex items-center font-semibold text-t1",children:s});return(0,r.jsxs)(r.Fragment,{children:[l&&(0,r.jsx)("i",{className:"fas fa-fw fa-".concat(l," inline-block mr-1 text-t1")}),n,!i&&(0,r.jsx)("i",{className:"fas fa-fw fa-chevron-right mx-1 text-t1"})]})},n=e=>{var t;let{trail:s}=e;if(0===s.length)return null;let l=s[s.length-1],i=l.href||(null===(t=s[s.length-2])||void 0===t?void 0:t.href);return i?(0,r.jsxs)(a(),{className:"flex md:hidden items-center cursor-pointer whitespace-nowrap overflow-x-hidden",href:i,children:[(0,r.jsx)("i",{className:"mr-1 fas fa-fw fa-chevron-left text-xl text-t2"}),!!l.icon&&(0,r.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(l.icon," text-sm")}),(0,r.jsx)("span",{className:"font-bold",children:l.label})]}):(0,r.jsxs)("div",{className:"flex md:hidden items-center whitespace-nowrap overflow-x-hidden",children:[!!l.icon&&(0,r.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(l.icon," text-sm")}),(0,r.jsx)("span",{className:"font-bold",children:l.label})]})};t.Z=e=>{let{crumbs:t,className:s}=e,l=[...t].filter(e=>!!e.label),a=["hidden md:flex items-center whitespace-nowrap overflow-x-auto"];return s&&a.push(s),(0,r.jsxs)("nav",{children:[(0,r.jsx)("div",{className:a.join(" "),children:l.map((e,t)=>(0,r.jsx)(i,{href:e.href,label:e.label,icon:e.icon,last:t===l.length-1},t))}),(0,r.jsx)(n,{trail:l})]})}},63527:function(e,t,s){"use strict";s.d(t,{Z:function(){return o}});var r=s(24246),l=s(22879),a=s(79531),i=s(54974),n=s.n(i);function o(e){let{props:t}=e,{_:s}=(0,l.useLanguage)(),o=(0,a.Z)("bg-b2","bg-b1");return(0,r.jsxs)(n(),{children:[(0,r.jsx)(i.Thead,{className:"text-left bg-b3",children:s("Name")}),(0,r.jsx)(i.Thead,{className:"text-left bg-b3",children:s("Type")}),(0,r.jsx)(i.Thead,{className:"text-center bg-b3",children:s("Required")}),(0,r.jsx)(i.Thead,{className:"text-left bg-b3",children:s("Notes")}),t.map((e,t)=>(0,r.jsxs)(i.Trow,{children:[(0,r.jsx)(i.Tcol,{className:"".concat(o(t)),children:e[0]}),(0,r.jsx)(i.Tcol,{className:"".concat(o(t)),children:e[1]}),(0,r.jsx)(i.Tcol,{className:"".concat(o(t)," text-center"),children:e[2]}),(0,r.jsx)(i.Tcol,{className:"".concat(o(t)),children:e[3]})]},t))]})}},79531:function(e,t,s){"use strict";function r(e,t){let s=e;return r=>"number"==typeof r?r%2==0?e:t:(r&&(s=s===e?t:e),s)}s.d(t,{Z:function(){return r}})},4192:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var r=s(24246),l=s(22879),a=s(79894),i=s.n(a),n=s(38178),o=s.n(n),c=s(78968),p=s(18604),u=s(63527),f=s(36493);function d(){let{_:e}=(0,l.useLanguage)(),t=[[e("alt"),e("string"),e("No"),e("Alt text for image")],[e("className"),e("string"),e("No"),e("Standard HTML class names")],[e("height"),e("string|number"),e("No"),e("Height of image")],[e("style"),e("CSS Object"),e("No"),e("Standard CSS object")],[e("value"),e("string"),e("Yes"),e("Default value")],[e("width"),e("string|number"),e("No"),e("Width of image")]];return(0,r.jsx)(c.sF,{uri:"/format/image",title:"Image Format",description:"Image formats in FRUI, are ReactJS components that convert values to viewable images.",children:(0,r.jsxs)("main",{className:"flex flex-col h-full w-full",children:[(0,r.jsx)("div",{className:"p-3 bg-b2",children:(0,r.jsx)(p.Z,{crumbs:[{icon:"text-height",label:"Formats",href:"/format"},{label:"Image"}]})}),(0,r.jsxs)("div",{className:"flex-grow relative h-full",children:[(0,r.jsxs)("aside",{className:"hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm",children:[(0,r.jsx)("h4",{className:"p-3 border-b border-b1 bg-b1 uppercase font-semibold",children:(0,r.jsx)(i(),{href:"#top",children:e("Image")})}),(0,r.jsxs)("ul",{className:"list-disc py-3 pr-3 pl-6",children:[(0,r.jsx)("li",{className:"pl-3 pb-1",children:(0,r.jsx)(i(),{href:"#props",children:e("Props")})}),(0,r.jsx)("li",{className:"pl-3 pb-1",children:(0,r.jsx)(i(),{href:"#basic",children:e("Basics")})})]})]}),(0,r.jsxs)("div",{className:"absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto",children:[(0,r.jsx)("h1",{id:"top",className:"flex items-center uppercase font-bold text-xl",children:e("Image")}),(0,r.jsx)(f.C,{language:"typescript",className:"mt-2",children:"import Image from 'frui/formats/Image';"}),(0,r.jsx)("h2",{id:"props",className:"uppercase font-bold text-lg mt-8",children:e("Props")}),(0,r.jsx)(u.Z,{props:t}),(0,r.jsx)("h2",{id:"basic",className:"uppercase font-bold text-lg mt-8",children:e("Basics")}),(0,r.jsxs)("div",{className:"curved overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,r.jsx)(o(),{value:"https://images.wsj.net/im-580612/8SR",width:"100"})}),(0,r.jsx)(f.C,{language:"typescript",children:'<Image value="https://images.wsj.net/im-580612/8SR" width="100" />'})]}),(0,r.jsxs)("div",{className:"flex items-center border-t border-b2 mt-8 pt-4",children:[(0,r.jsxs)(i(),{className:"text-t2",href:"/format/html",children:[(0,r.jsx)("i",{className:"fas fa-arrow-left mr-2"}),e("HTML")]}),(0,r.jsx)("div",{className:"flex-grow"}),(0,r.jsxs)(i(),{className:"text-t2",href:"/format/imagelist",children:[e("Imagelist"),(0,r.jsx)("i",{className:"fas fa-arrow-right ml-2"})]})]})]})]})]})})}}},function(e){e.O(0,[9461,2888,9774,179],function(){return e(e.s=76837)}),_N_E=e.O()}]);