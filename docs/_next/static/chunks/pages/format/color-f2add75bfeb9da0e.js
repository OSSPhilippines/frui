(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8975],{54974:function(e,s,t){"use strict";var l=this&&this.__rest||function(e,s){var t={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>s.indexOf(l)&&(t[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,l=Object.getOwnPropertySymbols(e);r<l.length;r++)0>s.indexOf(l[r])&&Object.prototype.propertyIsEnumerable.call(e,l[r])&&(t[l[r]]=e[l[r]]);return t},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0}),s.Tgroup=s.Trow=s.Tcol=s.Tfoot=s.Thead=s.Table=void 0;let a=t(24246),o=r(t(27378)),n=({width:e})=>(0,a.jsx)("hr",{style:{borderWidth:0,margin:0,width:e}});class i extends o.default.Component{table(){return"TableCol"}render(){let e=this.props,{stickyBottom:s,stickyLeft:t,stickyRight:r,stickyTop:o,noWrap:i,rowSpan:c,colSpan:p,wrap1:u,wrap2:d,wrap3:h,wrap4:f,wrap5:x,className:b,children:m}=e,j=l(e,["stickyBottom","stickyLeft","stickyRight","stickyTop","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),y=["frui-tbl-col"];(s||t||r||o)&&(y.push("frui-tbl-sticky"),s&&y.push("frui-tbl-sticky-b","frui-tbl-z1"),t&&y.push("frui-tbl-sticky-l","frui-tbl-z2"),r&&y.push("frui-tbl-sticky-r","frui-tbl-z2"),o&&y.push("frui-tbl-sticky-t","frui-tbl-z1")),i&&y.push("frui-tbl-nowrap");let N={};c&&(N.rowSpan=c||0),p&&(N.colSpan=p||0);let v=null;return u?v=(0,a.jsx)(n,{width:"100px"}):d?v=(0,a.jsx)(n,{width:"200px"}):h?v=(0,a.jsx)(n,{width:"300px"}):f?v=(0,a.jsx)(n,{width:"400px"}):x&&(v=(0,a.jsx)(n,{width:"500px"})),b&&y.push(b),(0,a.jsxs)("td",Object.assign({valign:"top"},j,{className:y.join(" ")},N,{children:[m,v]}))}}s.Tcol=i;class c extends o.default.Component{table(){return"TableFoot"}render(){let e=this.props,{stickyBottom:s,stickyLeft:t,stickyRight:r,noWrap:o,rowSpan:n,colSpan:i,className:c,children:p}=e,u=l(e,["stickyBottom","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","className","children"]),d=["frui-tbl-foot"];(s||t||r)&&(d.push("frui-tbl-sticky"),s&&d.push("frui-tbl-sticky-b","frui-tbl-z1"),t&&d.push("frui-tbl-sticky-l","frui-tbl-z2"),r&&d.push("frui-tbl-sticky-r","frui-tbl-z2"),o&&d.push("frui-tbl-nowrap"));let h={};return n&&(h.rowSpan=n||0),i&&(h.colSpan=i||0),c&&d.push(c),(0,a.jsx)("th",Object.assign({},u,{className:d.join(" ")},h,{children:p}))}}s.Tfoot=c;class p extends o.default.Component{table(){return"TableGroup"}render(){return this.props.children}}s.Tgroup=p;class u extends o.default.Component{table(){return"TableRow"}render(){let e=this.props,{noWrap:s,rowSpan:t,colSpan:r,className:o,children:n}=e,i=l(e,["noWrap","rowSpan","colSpan","className","children"]),c=["frui-tbl-row"];s&&c.push("frui-tbl-nowrap");let p={};return t&&(p.rowSpan=t||0),r&&(p.colSpan=r||0),o&&c.push(o),(0,a.jsx)("tr",Object.assign({},i,{className:c.join(" ")},p,{children:n}))}}s.Trow=u;class d extends o.default.Component{table(){return"TableHead"}render(){let e=this.props,{stickyTop:s,stickyLeft:t,stickyRight:r,noWrap:o,rowSpan:i,colSpan:c,wrap1:p,wrap2:u,wrap3:d,wrap4:h,wrap5:f,className:x,children:b}=e,m=l(e,["stickyTop","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),j=["frui-tbl-head"];(t||r||s)&&(j.push("tbl-sticky"),s&&(j.push("tbl-sticky-t"),t&&r?j.push("tbl-z4"):t||r?j.push("tbl-z3"):j.push("tbl-z1")),t&&j.push("tbl-sticky-l","tbl-z1"),r&&j.push("tbl-sticky-r","tbl-z1")),o&&j.push("frui-tbl-nowrap");let y={};i&&(y.rowSpan=i||0),c&&(y.colSpan=c||0);let N=null;return p?N=(0,a.jsx)(n,{width:"100px"}):u?N=(0,a.jsx)(n,{width:"200px"}):d?N=(0,a.jsx)(n,{width:"300px"}):h?N=(0,a.jsx)(n,{width:"400px"}):f&&(N=(0,a.jsx)(n,{width:"500px"})),x&&j.push(x),(0,a.jsxs)("th",Object.assign({},m,{className:j.join(" ")},y,{children:[b,N]}))}}s.Thead=d;let h=function(e){var s,t;let l=[];if(Array.isArray(e))for(let r of e)r&&(Array.isArray(r)?l.push.apply(l,h(r)):"object"==typeof r&&r.props&&"thead"in r.props?l.push(r):"function"==typeof(null===(t=null===(s=null==r?void 0:r.type)||void 0===s?void 0:s.prototype)||void 0===t?void 0:t.table)&&"TableHead"===r.type.prototype.table()&&l.push(r));return l},f=function(e){var s,t;let l=[];if(Array.isArray(e))for(let r of e)Array.isArray(r)?l.push.apply(l,f(r)):"object"==typeof r&&r.props&&"tfoot"in r.props?l.push(r):"function"==typeof(null===(t=null===(s=null==r?void 0:r.type)||void 0===s?void 0:s.prototype)||void 0===t?void 0:t.table)&&"TableFoot"===r.type.prototype.table()&&l.push(r);return l},x=function(e){var s,t,l,r;let a=[];if(Array.isArray(e))for(let o of e)if(Array.isArray(o))a.push.apply(a,x(o));else if("object"==typeof o&&o.props&&"tbody"in o.props)a.push(o);else if("function"==typeof(null===(t=null===(s=null==o?void 0:o.type)||void 0===s?void 0:s.prototype)||void 0===t?void 0:t.table)&&"TableGroup"===o.type.prototype.table()){let e=o.props.children||[];Array.isArray(e)&&e.length>0&&a.push(...e)}else"function"==typeof(null===(r=null===(l=null==o?void 0:o.type)||void 0===l?void 0:l.prototype)||void 0===r?void 0:r.table)&&"TableRow"===o.type.prototype.table()&&a.push(o);return a};function b(e){let s=e.children||[];Array.isArray(s)||(s=[s]);let t=h(s),l=x(s),r=f(s),o=["frui-tbl-overflow"];return e.className&&o.push(e.className),(0,a.jsx)("div",Object.assign({className:o.join(" "),style:e.style},{children:(0,a.jsxs)("table",Object.assign({className:"frui-tbl"},{children:[t&&(0,a.jsx)("thead",{children:(0,a.jsx)("tr",{children:t})}),l&&(0,a.jsx)("tbody",{children:l}),r&&(0,a.jsx)("tfoot",{children:(0,a.jsx)("tr",{children:r})})]}))}))}s.default=b,s.Table=b},57952:function(e,s,t){"use strict";let l=t(24246);s.Z=function(e){let{value:s,box:t=!0,text:r=!0,sm:a,md:o,lg:n,className:i,style:c={}}=e,p=a?"8px":o?"12px":n?"16px":"12px",u={backgroundColor:s,height:p,width:p};if(t&&r){let e=["frui-format-color"];return i&&e.push(i),(0,l.jsxs)("span",Object.assign({className:e.join(" "),style:c},{children:[(0,l.jsx)("span",{className:"frui-format-color-box",style:u}),(0,l.jsx)("span",Object.assign({className:"frui-format-color-text"},{children:s}))]}))}if(t){let e=["frui-format-color-box"];return i&&e.push(i),(0,l.jsx)("span",{className:e.join(" "),style:Object.assign(Object.assign({},c),u)})}let d=["frui-format-color-text"];return i&&d.push(i),(0,l.jsx)("span",Object.assign({className:d.join(" "),style:c},{children:s}))}},66971:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/format/color",function(){return t(67313)}])},36493:function(e,s,t){"use strict";t.d(s,{C:function(){return c},Z:function(){return i}});var l=t(24246),r=t(22879),a=t(74631),o=t(48717),n=t(14707);function i(e){let{value:s,quote:t,l:r,r:a,children:o}=e;return(0,l.jsxs)(l.Fragment,{children:[r?(0,l.jsx)("span",{children:"\xa0"}):"",(0,l.jsxs)("code",{className:"text-sm text-t2 bg-b1 font-semibold inline-block p-0.5",children:[t?"`":"",s||o,t?"`":""]}),a?(0,l.jsx)("span",{children:"\xa0"}):""]})}function c(e){let{className:s,copy:t=!0,children:i,language:c}=e,{_:p}=(0,r.useLanguage)();return(0,l.jsxs)("div",{className:"flex text-sm bg-black ".concat(s||""),children:[(0,l.jsx)(a.Z,{className:"flex-grow !p-4 !bg-transparent",language:c,style:o._4,children:i}),t&&(0,l.jsxs)("div",{className:"text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap",onClick:()=>{navigator.clipboard.writeText(i.toString()),(0,n.ZP)("success",p("Copied to clipboard"))},children:[(0,l.jsx)("i",{className:"fas fa-copy"})," ",p("Copy")]})]})}},18604:function(e,s,t){"use strict";var l=t(24246);t(27378);var r=t(79894),a=t.n(r);let o=e=>{let{href:s,label:t,icon:r,last:o}=e,n=s?(0,l.jsx)(a(),{href:s,className:"inline-flex items-center text-t2",children:t}):(0,l.jsx)("span",{className:"inline-flex items-center font-semibold text-t1",children:t});return(0,l.jsxs)(l.Fragment,{children:[r&&(0,l.jsx)("i",{className:"fas fa-fw fa-".concat(r," inline-block mr-1 text-t1")}),n,!o&&(0,l.jsx)("i",{className:"fas fa-fw fa-chevron-right mx-1 text-t1"})]})},n=e=>{var s;let{trail:t}=e;if(0===t.length)return null;let r=t[t.length-1],o=r.href||(null===(s=t[t.length-2])||void 0===s?void 0:s.href);return o?(0,l.jsxs)(a(),{className:"flex md:hidden items-center cursor-pointer whitespace-nowrap overflow-x-hidden",href:o,children:[(0,l.jsx)("i",{className:"mr-1 fas fa-fw fa-chevron-left text-xl text-t2"}),!!r.icon&&(0,l.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(r.icon," text-sm")}),(0,l.jsx)("span",{className:"font-bold",children:r.label})]}):(0,l.jsxs)("div",{className:"flex md:hidden items-center whitespace-nowrap overflow-x-hidden",children:[!!r.icon&&(0,l.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(r.icon," text-sm")}),(0,l.jsx)("span",{className:"font-bold",children:r.label})]})};s.Z=e=>{let{crumbs:s,className:t}=e,r=[...s].filter(e=>!!e.label),a=["hidden md:flex items-center whitespace-nowrap overflow-x-auto"];return t&&a.push(t),(0,l.jsxs)("nav",{children:[(0,l.jsx)("div",{className:a.join(" "),children:r.map((e,s)=>(0,l.jsx)(o,{href:e.href,label:e.label,icon:e.icon,last:s===r.length-1},s))}),(0,l.jsx)(n,{trail:r})]})}},63527:function(e,s,t){"use strict";t.d(s,{Z:function(){return i}});var l=t(24246),r=t(22879),a=t(79531),o=t(54974),n=t.n(o);function i(e){let{props:s}=e,{_:t}=(0,r.useLanguage)(),i=(0,a.Z)("bg-b2","bg-b1");return(0,l.jsxs)(n(),{children:[(0,l.jsx)(o.Thead,{className:"text-left bg-b3",children:t("Name")}),(0,l.jsx)(o.Thead,{className:"text-left bg-b3",children:t("Type")}),(0,l.jsx)(o.Thead,{className:"text-center bg-b3",children:t("Required")}),(0,l.jsx)(o.Thead,{className:"text-left bg-b3",children:t("Notes")}),s.map((e,s)=>(0,l.jsxs)(o.Trow,{children:[(0,l.jsx)(o.Tcol,{className:"".concat(i(s)),children:e[0]}),(0,l.jsx)(o.Tcol,{className:"".concat(i(s)),children:e[1]}),(0,l.jsx)(o.Tcol,{className:"".concat(i(s)," text-center"),children:e[2]}),(0,l.jsx)(o.Tcol,{className:"".concat(i(s)),children:e[3]})]},s))]})}},79531:function(e,s,t){"use strict";function l(e,s){let t=e;return l=>"number"==typeof l?l%2==0?e:s:(l&&(t=t===e?s:e),t)}t.d(s,{Z:function(){return l}})},67313:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return d}});var l=t(24246),r=t(22879),a=t(79894),o=t.n(a),n=t(57952),i=t(1343),c=t(18604),p=t(63527),u=t(36493);function d(){let{_:e}=(0,r.useLanguage)(),s=[[e("box"),e("boolean"),e("No"),e("Show color box")],[e("className"),e("string"),e("No"),e("Standard HTML class names")],[e("lg"),e("boolean"),e("No"),e("Show large color box")],[e("md"),e("boolean"),e("No"),e("Show medium size color box")],[e("sm"),e("boolean"),e("No"),e("Show small color box")],[e("style"),e("CSS Object"),e("No"),e("Standard CSS object")],[e("text"),e("boolean"),e("No"),e("Show color text")],[e("value"),e("string"),e("Yes"),e("Default value")]];return(0,l.jsx)(i.sF,{children:(0,l.jsxs)("main",{className:"flex flex-col h-full w-full",children:[(0,l.jsx)("div",{className:"p-3 bg-b2",children:(0,l.jsx)(c.Z,{crumbs:[{icon:"text-height",label:"Formats",href:"/format"},{label:"Color"}]})}),(0,l.jsxs)("div",{className:"flex-grow relative h-full",children:[(0,l.jsxs)("aside",{className:"hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm",children:[(0,l.jsx)("h4",{className:"p-3 border-b border-b1 bg-b1 uppercase font-semibold",children:(0,l.jsx)(o(),{href:"#top",children:e("Color")})}),(0,l.jsxs)("ul",{className:"list-disc py-3 pr-3 pl-6",children:[(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(o(),{href:"#props",children:e("Props")})}),(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(o(),{href:"#basic",children:e("Basics")})}),(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(o(),{href:"#customize",children:e("Customize")})})]})]}),(0,l.jsxs)("div",{className:"absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto",children:[(0,l.jsx)("h1",{id:"top",className:"flex items-center uppercase font-bold text-xl",children:e("Color")}),(0,l.jsx)(u.C,{language:"typescript",className:"mt-2",children:"import Color from 'frui/formats/Color';"}),(0,l.jsx)("h2",{id:"props",className:"uppercase font-bold text-lg mt-8",children:e("Props")}),(0,l.jsx)(p.Z,{props:s}),(0,l.jsx)("h2",{id:"basic",className:"uppercase font-bold text-lg mt-8",children:e("Basics")}),(0,l.jsxs)("div",{className:"curved overflow-hidden",children:[(0,l.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,l.jsx)(n.Z,{value:"salmon"})}),(0,l.jsx)(u.C,{language:"typescript",children:'<Color value="salmon" />'})]}),(0,l.jsx)("h2",{id:"customize",className:"uppercase font-bold text-lg mt-8",children:e("Customize")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["You can apply different sizes to the",(0,l.jsx)(u.Z,{l:!0,value:"Color"})," format."]})}),(0,l.jsx)("h3",{className:"font-semibold text-md mt-8",children:e("Box")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["Use ",(0,l.jsx)(u.Z,{value:"box"})," prop to hide the color box."]})}),(0,l.jsxs)("div",{className:"curved overflow-hidden",children:[(0,l.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,l.jsx)(n.Z,{box:!1,value:"salmon"})}),(0,l.jsx)(u.C,{language:"typescript",children:'<Color box={false} value="salmon" />'})]}),(0,l.jsx)("h3",{className:"font-semibold text-md mt-8",children:e("Sizes")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["Use ",(0,l.jsx)(u.Z,{value:"sm"}),", ",(0,l.jsx)(u.Z,{value:"md"}),", or ",(0,l.jsx)(u.Z,{value:"lg",r:!0}),"props to change the size of the color box."]})}),(0,l.jsxs)("div",{className:"curved overflow-hidden",children:[(0,l.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,l.jsx)(n.Z,{lg:!0,value:"salmon"})}),(0,l.jsx)(u.C,{language:"typescript",children:'<Color lg value="salmon" />'})]}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["You can also add your own custom class to",(0,l.jsx)(u.Z,{l:!0,value:"Color"})," format or use any combination of",(0,l.jsx)(u.Z,{l:!0,value:"frui-format-color"}),", and",(0,l.jsx)(u.Z,{l:!0,value:"frui-format-color-box"})," CSS classes."]})}),(0,l.jsxs)("div",{className:"flex items-center border-t border-b2 mt-8 pt-4",children:[(0,l.jsxs)(o(),{className:"text-t2",href:"/format",children:[(0,l.jsx)("i",{className:"fas fa-arrow-left mr-2"}),e("Formats")]}),(0,l.jsx)("div",{className:"flex-grow"}),(0,l.jsxs)(o(),{className:"text-t2",href:"/format/country",children:[e("Country"),(0,l.jsx)("i",{className:"fas fa-arrow-right ml-2"})]})]})]})]})]})})}}},function(e){e.O(0,[9461,2888,9774,179],function(){return e(e.s=66971)}),_N_E=e.O()}]);