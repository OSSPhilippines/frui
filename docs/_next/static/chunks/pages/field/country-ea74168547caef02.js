(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7503],{54974:function(e,t,s){"use strict";var l=this&&this.__rest||function(e,t){var s={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>t.indexOf(l)&&(s[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,l=Object.getOwnPropertySymbols(e);r<l.length;r++)0>t.indexOf(l[r])&&Object.prototype.propertyIsEnumerable.call(e,l[r])&&(s[l[r]]=e[l[r]]);return s},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Tgroup=t.Trow=t.Tcol=t.Tfoot=t.Thead=t.Table=void 0;let n=s(24246),a=r(s(27378)),o=({width:e})=>(0,n.jsx)("hr",{style:{borderWidth:0,margin:0,width:e}});class i extends a.default.Component{table(){return"TableCol"}render(){let e=this.props,{stickyBottom:t,stickyLeft:s,stickyRight:r,stickyTop:a,noWrap:i,rowSpan:c,colSpan:d,wrap1:u,wrap2:p,wrap3:f,wrap4:h,wrap5:x,className:b,children:m}=e,j=l(e,["stickyBottom","stickyLeft","stickyRight","stickyTop","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),y=["frui-tbl-col"];(t||s||r||a)&&(y.push("frui-tbl-sticky"),t&&y.push("frui-tbl-sticky-b","frui-tbl-z1"),s&&y.push("frui-tbl-sticky-l","frui-tbl-z2"),r&&y.push("frui-tbl-sticky-r","frui-tbl-z2"),a&&y.push("frui-tbl-sticky-t","frui-tbl-z1")),i&&y.push("frui-tbl-nowrap");let g={};c&&(g.rowSpan=c||0),d&&(g.colSpan=d||0);let v=null;return u?v=(0,n.jsx)(o,{width:"100px"}):p?v=(0,n.jsx)(o,{width:"200px"}):f?v=(0,n.jsx)(o,{width:"300px"}):h?v=(0,n.jsx)(o,{width:"400px"}):x&&(v=(0,n.jsx)(o,{width:"500px"})),b&&y.push(b),(0,n.jsxs)("td",Object.assign({valign:"top"},j,{className:y.join(" ")},g,{children:[m,v]}))}}t.Tcol=i;class c extends a.default.Component{table(){return"TableFoot"}render(){let e=this.props,{stickyBottom:t,stickyLeft:s,stickyRight:r,noWrap:a,rowSpan:o,colSpan:i,className:c,children:d}=e,u=l(e,["stickyBottom","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","className","children"]),p=["frui-tbl-foot"];(t||s||r)&&(p.push("frui-tbl-sticky"),t&&p.push("frui-tbl-sticky-b","frui-tbl-z1"),s&&p.push("frui-tbl-sticky-l","frui-tbl-z2"),r&&p.push("frui-tbl-sticky-r","frui-tbl-z2"),a&&p.push("frui-tbl-nowrap"));let f={};return o&&(f.rowSpan=o||0),i&&(f.colSpan=i||0),c&&p.push(c),(0,n.jsx)("th",Object.assign({},u,{className:p.join(" ")},f,{children:d}))}}t.Tfoot=c;class d extends a.default.Component{table(){return"TableGroup"}render(){return this.props.children}}t.Tgroup=d;class u extends a.default.Component{table(){return"TableRow"}render(){let e=this.props,{noWrap:t,rowSpan:s,colSpan:r,className:a,children:o}=e,i=l(e,["noWrap","rowSpan","colSpan","className","children"]),c=["frui-tbl-row"];t&&c.push("frui-tbl-nowrap");let d={};return s&&(d.rowSpan=s||0),r&&(d.colSpan=r||0),a&&c.push(a),(0,n.jsx)("tr",Object.assign({},i,{className:c.join(" ")},d,{children:o}))}}t.Trow=u;class p extends a.default.Component{table(){return"TableHead"}render(){let e=this.props,{stickyTop:t,stickyLeft:s,stickyRight:r,noWrap:a,rowSpan:i,colSpan:c,wrap1:d,wrap2:u,wrap3:p,wrap4:f,wrap5:h,className:x,children:b}=e,m=l(e,["stickyTop","stickyLeft","stickyRight","noWrap","rowSpan","colSpan","wrap1","wrap2","wrap3","wrap4","wrap5","className","children"]),j=["frui-tbl-head"];(s||r||t)&&(j.push("frui-tbl-sticky"),t&&(j.push("frui-tbl-sticky-t"),s&&r?j.push("frui-tbl-z4"):s||r?j.push("frui-tbl-z3"):j.push("frui-tbl-z1")),s&&j.push("frui-tbl-sticky-l","frui-tbl-z1"),r&&j.push("frui-tbl-sticky-r","frui-tbl-z1")),a&&j.push("frui-tbl-nowrap");let y={};i&&(y.rowSpan=i||0),c&&(y.colSpan=c||0);let g=null;return d?g=(0,n.jsx)(o,{width:"100px"}):u?g=(0,n.jsx)(o,{width:"200px"}):p?g=(0,n.jsx)(o,{width:"300px"}):f?g=(0,n.jsx)(o,{width:"400px"}):h&&(g=(0,n.jsx)(o,{width:"500px"})),x&&j.push(x),(0,n.jsxs)("th",Object.assign({},m,{className:j.join(" ")},y,{children:[b,g]}))}}t.Thead=p;let f=function(e){var t,s;let l=[];if(Array.isArray(e))for(let r of e)r&&(Array.isArray(r)?l.push.apply(l,f(r)):"object"==typeof r&&r.props&&"thead"in r.props?l.push(r):"function"==typeof(null===(s=null===(t=null==r?void 0:r.type)||void 0===t?void 0:t.prototype)||void 0===s?void 0:s.table)&&"TableHead"===r.type.prototype.table()&&l.push(r));return l},h=function(e){var t,s;let l=[];if(Array.isArray(e))for(let r of e)Array.isArray(r)?l.push.apply(l,h(r)):"object"==typeof r&&r.props&&"tfoot"in r.props?l.push(r):"function"==typeof(null===(s=null===(t=null==r?void 0:r.type)||void 0===t?void 0:t.prototype)||void 0===s?void 0:s.table)&&"TableFoot"===r.type.prototype.table()&&l.push(r);return l},x=function(e){var t,s,l,r;let n=[];if(Array.isArray(e))for(let a of e)if(Array.isArray(a))n.push.apply(n,x(a));else if("object"==typeof a&&a.props&&"tbody"in a.props)n.push(a);else if("function"==typeof(null===(s=null===(t=null==a?void 0:a.type)||void 0===t?void 0:t.prototype)||void 0===s?void 0:s.table)&&"TableGroup"===a.type.prototype.table()){let e=a.props.children||[];Array.isArray(e)&&e.length>0&&n.push(...e)}else"function"==typeof(null===(r=null===(l=null==a?void 0:a.type)||void 0===l?void 0:l.prototype)||void 0===r?void 0:r.table)&&"TableRow"===a.type.prototype.table()&&n.push(a);return n};function b(e){let t=e.children||[];Array.isArray(t)||(t=[t]);let s=f(t),l=x(t),r=h(t),a=["frui-tbl-overflow"];return e.className&&a.push(e.className),(0,n.jsx)("div",Object.assign({className:a.join(" "),style:e.style},{children:(0,n.jsxs)("table",Object.assign({className:"frui-tbl"},{children:[s&&(0,n.jsx)("thead",{children:(0,n.jsx)("tr",{children:s})}),l&&(0,n.jsx)("tbody",{children:l}),r&&(0,n.jsx)("tfoot",{children:(0,n.jsx)("tr",{children:r})})]}))}))}t.default=b,t.Table=b},34496:function(e,t,s){"use strict";var l=this&&this.__rest||function(e,t){var s={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>t.indexOf(l)&&(s[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,l=Object.getOwnPropertySymbols(e);r<l.length;r++)0>t.indexOf(l[r])&&Object.prototype.propertyIsEnumerable.call(e,l[r])&&(s[l[r]]=e[l[r]]);return s},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useCountry=void 0;let n=s(24246),a=r(s(84194)),o=r(s(61866));function i(e){let{value:t,defaultValue:s,map:l}=e,r=o.default.filter(e=>"fiat"===e.currencyType).map(l);return{selected:"string"==typeof t?r.filter(e=>{var s;return(null===(s=e.value)||void 0===s?void 0:s.countryCode)===t})[0]:void 0,selectedDefault:"string"==typeof s?r.filter(e=>{var t;return(null===(t=e.value)||void 0===t?void 0:t.countryCode)===s})[0]:void 0,options:r}}t.useCountry=i,t.default=function(e){let{value:t,defaultValue:s,placeholder:r="Choose a Country"}=e,o=l(e,["value","defaultValue","placeholder"]),{selected:c,selectedDefault:d,options:u}=i({value:t,defaultValue:s,map:e=>({label:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("img",{alt:`${e.countryName} Flag`,src:`https://flagcdn.com/w40/${e.countryCode.toLowerCase()}.png`,loading:"lazy"}),(0,n.jsx)("span",Object.assign({className:"frui-field-select-label"},{children:e.countryName}))]}),value:e,keyword:t=>e.countryCode.toLowerCase().indexOf(t)>=0||e.countryName.toLowerCase().indexOf(t)>=0||e.currencyCode.toLowerCase().indexOf(t)>=0})});return(0,n.jsx)(a.default,Object.assign({},o,{placeholder:r,value:c,defaultValue:d,options:u,searchable:!0}))}},42378:function(e,t,s){"use strict";var l=this&&this.__rest||function(e,t){var s={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>t.indexOf(l)&&(s[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,l=Object.getOwnPropertySymbols(e);r<l.length;r++)0>t.indexOf(l[r])&&Object.prototype.propertyIsEnumerable.call(e,l[r])&&(s[l[r]]=e[l[r]]);return s};Object.defineProperty(t,"__esModule",{value:!0}),t.useInput=void 0;let r=s(24246);function n({onChange:e,onUpdate:t}){return{handlers:{change:s=>{e&&e(s),t&&t(s.target.value)}}}}t.useInput=n,t.default=function(e){let{error:t,className:s,onChange:a,onUpdate:o,passRef:i}=e,c=l(e,["error","className","onChange","onUpdate","passRef"]),{handlers:d}=n({onChange:a,onUpdate:o}),u=["frui-field-input"];return t&&u.push("frui-tx-error","frui-bd-error"),s&&u.push(s),(0,r.jsx)("input",Object.assign({},c,{className:u.join(" "),ref:i,onChange:d.change}))}},84194:function(e,t,s){"use strict";var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SelectDropdown=t.useSelect=void 0;let r=s(24246),n=s(27378),a=l(s(42378));function o(e){let{options:t,value:s,defaultValue:l,onDropdown:r,onSelected:a,onUpdate:o}=e,i=void 0!==l?l:void 0!==s?s:void 0,c=t.find(e=>e.value===i),[d,u]=(0,n.useState)(""),[p,f]=(0,n.useState)(c),[h,x]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{s&&f(t.find(e=>e.value===s))},[s]),{selected:p,showing:h,handlers:{toggle(){x(!h),r&&r(!h)},search(e){setTimeout(()=>{u(e.target.value)})},match(e){let t=(d||"").toLowerCase();return"string"==typeof e.keyword?e.keyword.toLowerCase().indexOf(t)>=0:"function"==typeof e.keyword?e.keyword(t):void 0!==e.value&&null!==e.value?e.value.toString().toLowerCase().indexOf(t)>=0:"string"!=typeof e.label||e.label.toLowerCase().indexOf(t)>=0},select(e){x(!1),f(e),r&&r(!1),a&&a(e),o&&o(e.value)}}}}function i(e){let{options:t,show:s,searchable:l,select:n,search:o,match:i}=e;return(0,r.jsxs)("div",Object.assign({className:"frui-field-select-dropdown",style:s?void 0:{display:"none"}},{children:[l&&(0,r.jsxs)("div",Object.assign({className:"frui-field-select-search"},{children:[(0,r.jsx)(a.default,{className:"frui-field-select-search-control",onKeyUp:o}),(0,r.jsx)("span",Object.assign({className:"frui-field-select-search-icon"},{children:"\uD83D\uDD0E"}))]})),(0,r.jsx)("div",Object.assign({className:"frui-field-select-options"},{children:t.filter(i).map((e,t)=>(0,r.jsx)("div",Object.assign({onClick:t=>n(e),className:"frui-field-select-option"},{children:e.label}),t))}))]}))}t.useSelect=o,t.SelectDropdown=i,t.default=function(e){let{options:t,searchable:s,value:l,defaultValue:n,placeholder:a="Choose an Option",error:c,className:d,style:u,onDropdown:p,onSelected:f,onUpdate:h}=e,x="object"!=typeof t||Array.isArray(t)?t:Object.keys(t).map(e=>({value:e,label:t[e]})),{selected:b,showing:m,handlers:j}=o({options:x,value:l,defaultValue:n,onDropdown:p,onSelected:f,onUpdate:h}),y=["frui-field-select"];d&&y.push(d);let g=["frui-field-select-placeholder"];return c&&g.push("frui-tx-error","frui-bd-error"),(0,r.jsxs)("div",Object.assign({className:y.join(" "),style:u},{children:[(0,r.jsx)("div",Object.assign({className:"frui-field-select-control",onClick:j.toggle},{children:(null==b?void 0:b.label)||(0,r.jsx)("span",Object.assign({className:g.join(" ")},{children:a}))})),(0,r.jsx)(i,{options:x,show:m,error:c,searchable:s,select:j.select,search:j.search,match:j.match})]}))}},50352:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/field/country",function(){return s(37387)}])},36493:function(e,t,s){"use strict";s.d(t,{C:function(){return c},Z:function(){return i}});var l=s(24246),r=s(22879),n=s(74631),a=s(48717),o=s(14707);function i(e){let{value:t,quote:s,l:r,r:n,children:a}=e;return(0,l.jsxs)(l.Fragment,{children:[r?(0,l.jsx)("span",{children:"\xa0"}):"",(0,l.jsxs)("code",{className:"text-sm text-t2 bg-b1 font-semibold inline-block p-0.5",children:[s?"`":"",t||a,s?"`":""]}),n?(0,l.jsx)("span",{children:"\xa0"}):""]})}function c(e){let{className:t,copy:s=!0,children:i,language:c}=e,{_:d}=(0,r.useLanguage)();return(0,l.jsxs)("div",{className:"flex text-sm bg-black ".concat(t||""),children:[(0,l.jsx)(n.Z,{className:"flex-grow !p-4 !bg-transparent",language:c,style:a._4,children:i}),s&&(0,l.jsxs)("div",{className:"text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap",onClick:()=>{navigator.clipboard.writeText(i.toString()),(0,o.ZP)("success",d("Copied to clipboard"))},children:[(0,l.jsx)("i",{className:"fas fa-copy"})," ",d("Copy")]})]})}},18604:function(e,t,s){"use strict";var l=s(24246);s(27378);var r=s(79894),n=s.n(r);let a=e=>{let{href:t,label:s,icon:r,last:a}=e,o=t?(0,l.jsx)(n(),{href:t,className:"inline-flex items-center text-t2",children:s}):(0,l.jsx)("span",{className:"inline-flex items-center font-semibold text-t1",children:s});return(0,l.jsxs)(l.Fragment,{children:[r&&(0,l.jsx)("i",{className:"fas fa-fw fa-".concat(r," inline-block mr-1 text-t1")}),o,!a&&(0,l.jsx)("i",{className:"fas fa-fw fa-chevron-right mx-1 text-t1"})]})},o=e=>{var t;let{trail:s}=e;if(0===s.length)return null;let r=s[s.length-1],a=r.href||(null===(t=s[s.length-2])||void 0===t?void 0:t.href);return a?(0,l.jsxs)(n(),{className:"flex md:hidden items-center cursor-pointer whitespace-nowrap overflow-x-hidden",href:a,children:[(0,l.jsx)("i",{className:"mr-1 fas fa-fw fa-chevron-left text-xl text-t2"}),!!r.icon&&(0,l.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(r.icon," text-sm")}),(0,l.jsx)("span",{className:"font-bold",children:r.label})]}):(0,l.jsxs)("div",{className:"flex md:hidden items-center whitespace-nowrap overflow-x-hidden",children:[!!r.icon&&(0,l.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(r.icon," text-sm")}),(0,l.jsx)("span",{className:"font-bold",children:r.label})]})};t.Z=e=>{let{crumbs:t,className:s}=e,r=[...t].filter(e=>!!e.label),n=["hidden md:flex items-center whitespace-nowrap overflow-x-auto"];return s&&n.push(s),(0,l.jsxs)("nav",{children:[(0,l.jsx)("div",{className:n.join(" "),children:r.map((e,t)=>(0,l.jsx)(a,{href:e.href,label:e.label,icon:e.icon,last:t===r.length-1},t))}),(0,l.jsx)(o,{trail:r})]})}},63527:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});var l=s(24246),r=s(22879),n=s(79531),a=s(54974),o=s.n(a);function i(e){let{props:t}=e,{_:s}=(0,r.useLanguage)(),i=(0,n.Z)("bg-b2","bg-b1");return(0,l.jsxs)(o(),{children:[(0,l.jsx)(a.Thead,{className:"text-left bg-b3",children:s("Name")}),(0,l.jsx)(a.Thead,{className:"text-left bg-b3",children:s("Type")}),(0,l.jsx)(a.Thead,{className:"text-center bg-b3",children:s("Required")}),(0,l.jsx)(a.Thead,{className:"text-left bg-b3",children:s("Notes")}),t.map((e,t)=>(0,l.jsxs)(a.Trow,{children:[(0,l.jsx)(a.Tcol,{className:"".concat(i(t)),children:e[0]}),(0,l.jsx)(a.Tcol,{className:"".concat(i(t)),children:e[1]}),(0,l.jsx)(a.Tcol,{className:"".concat(i(t)," text-center"),children:e[2]}),(0,l.jsx)(a.Tcol,{className:"".concat(i(t)),children:e[3]})]},t))]})}},79531:function(e,t,s){"use strict";function l(e,t){let s=e;return l=>"number"==typeof l?l%2==0?e:t:(l&&(s=s===e?t:e),s)}s.d(t,{Z:function(){return l}})},37387:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return b}});var l=s(24246),r=s(22879),n=s(79894),a=s.n(n),o=s(34496),i=s.n(o),c=s(54974),d=s.n(c),u=s(78968),p=s(18604),f=s(63527),h=s(36493);let x="\n<Country \n  className=\"w-full z-20 text-black\" \n  onDropdown={open => console.log('dropdown', open)}\n  onSelected={option => console.log('selected', option)}\n  onUpdate={value => alert(JSON.stringify(value))}\n/>".trim();function b(){let{_:e}=(0,r.useLanguage)(),t=[[e("className"),e("string"),e("No"),e("Standard HTML class names")],[e("defaultValue"),e("string"),e("No"),e("Alias to value")],[e("error"),e("string|boolean"),e("No"),e("Any error message")],[e("name"),e("string"),e("No"),e("Used for react server components.")],[e("onDropdown"),e("Function"),e("No"),e("Event handler when dropdown opens/closes")],[e("onSelected"),e("Function"),e("No"),e("Event handler when an option has been selected")],[e("onUpdate"),e("Function"),e("No"),e("Update event handler")],[e("options"),e("string[]"),e("No"),e("List of select options.")],[e("placeholder"),e("string"),e("No"),e("Display text when no value set")],[e("searchable"),e("boolean"),e("No"),e("Add a search field")],[e("style"),e("CSS Object"),e("No"),e("Standard CSS object")],[e("value"),e("string"),e("No"),e("Selected value from the options")]];return(0,l.jsx)(u.sF,{uri:"/field/country",title:"Country Field",description:"Country fields in FRUI, allow users select from a list of countries around the world.",children:(0,l.jsxs)("main",{className:"flex flex-col h-full w-full",children:[(0,l.jsx)("div",{className:"p-3 bg-b2",children:(0,l.jsx)(p.Z,{crumbs:[{icon:"rectangle-list",label:"Fields",href:"/field"},{label:"Country"}]})}),(0,l.jsxs)("div",{className:"flex-grow relative h-full",children:[(0,l.jsxs)("aside",{className:"hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm",children:[(0,l.jsx)("h4",{className:"p-3 border-b border-b1 bg-b1 uppercase font-semibold",children:(0,l.jsx)(a(),{href:"#top",children:e("Country")})}),(0,l.jsxs)("ul",{className:"list-disc py-3 pr-3 pl-6",children:[(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(a(),{href:"#props",children:e("Props")})}),(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(a(),{href:"#basic",children:e("Basics")})}),(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(a(),{href:"#events",children:e("Events")})}),(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(a(),{href:"#errors",children:e("Errors")})}),(0,l.jsx)("li",{className:"pl-3 pb-1",children:(0,l.jsx)(a(),{href:"#styles",children:e("Custom Styles")})})]})]}),(0,l.jsxs)("div",{className:"absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto",children:[(0,l.jsx)("h1",{id:"top",className:"flex items-center uppercase font-bold text-xl",children:e("Country")}),(0,l.jsx)(h.C,{language:"typescript",className:"mt-2",children:"import Country from 'frui/fields/Country';"}),(0,l.jsx)("h2",{id:"props",className:"uppercase font-bold text-lg mt-8",children:e("Props")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["The following props are accepted by ",(0,l.jsx)(h.Z,{value:"Country"}),"."]})}),(0,l.jsx)(f.Z,{props:t}),(0,l.jsx)("h2",{id:"basic",className:"uppercase font-bold text-lg mt-8",children:e("Basics")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["The following is a basic example of an",(0,l.jsx)(h.Z,{l:!0,value:"Country"})," field."]})}),(0,l.jsxs)("div",{className:"curved",children:[(0,l.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,l.jsx)(i(),{className:"w-full z-30 text-black",placeholder:"Select Country",searchable:!0,value:"US"})}),(0,l.jsx)(h.C,{language:"typescript",children:'<Country className="w-full z-30 text-black" placeholder="Select Country" searchable />'})]}),(0,l.jsx)("h2",{id:"events",className:"uppercase font-bold text-lg mt-8",children:e("Events")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["The following example makes use of all the possible events for ",(0,l.jsx)(h.Z,{value:"Country"}),"."]})}),(0,l.jsxs)("div",{className:"curved",children:[(0,l.jsx)("div",{className:"relative flex items-center justify-center p-3 bg-b1",children:(0,l.jsx)(i(),{className:"w-full z-20 text-black",onDropdown:e=>console.log("dropdown",e),onSelected:e=>console.log("selected",e),onUpdate:e=>alert(JSON.stringify(e))})}),(0,l.jsx)(h.C,{language:"typescript",children:x})]}),(0,l.jsx)("h3",{className:"font-semibold text-md mt-8",children:e("On Dropdown")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["The ",(0,l.jsx)(h.Z,{value:"onDropdown"})," event is triggered when the dropdown opens or closes. The following arguments are passed to the event handler:"]})}),(0,l.jsxs)(d(),{children:[(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Name")}),(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Type")}),(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Sample")}),(0,l.jsxs)(c.Trow,{children:[(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:e("open")}),(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:e("boolean")}),(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:(0,l.jsx)(h.Z,{value:"true"})})]})]}),(0,l.jsx)("h3",{className:"font-semibold text-md mt-8",children:e("On Selected")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["The ",(0,l.jsx)(h.Z,{value:"onSelected"})," event is triggered when an option has been selected. The following arguments are passed to the event handler:"]})}),(0,l.jsxs)(d(),{children:[(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Name")}),(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Type")}),(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Sample")}),(0,l.jsxs)(c.Trow,{children:[(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:e("option")}),(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:e("SelectOption")}),(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:(0,l.jsx)(h.C,{language:"json",copy:!1,children:"{\n  label: 'United States',\n  value: {\n    countryCode: 'US',\n    countryName: 'United States',\n    currencyType: 'fiat',\n    currencyCode: 'USD',\n    currencyName: 'US Dollar',\n    currencyPlural: 'US Dollars',\n    currencySymbol: '$',\n    language: 'en'\n  }\n}"})})]})]}),(0,l.jsx)("h3",{className:"font-semibold text-md mt-8",children:e("On Update")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["The ",(0,l.jsx)(h.Z,{value:"onUpdate"})," event is triggered when the value has been updated. The following arguments are passed to the event handler:"]})}),(0,l.jsxs)(d(),{children:[(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Name")}),(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Type")}),(0,l.jsx)(c.Thead,{className:"bg-b3 text-left",children:e("Sample")}),(0,l.jsxs)(c.Trow,{children:[(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:e("value")}),(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:e("CountryData")}),(0,l.jsx)(c.Tcol,{className:"bg-b1 text-left",children:(0,l.jsx)(h.C,{language:"json",copy:!1,children:"{\n  countryCode: 'US',\n  countryName: 'United States',\n  currencyType: 'fiat',\n  currencyCode: 'USD',\n  currencyName: 'US Dollar',\n  currencyPlural: 'US Dollars',\n  currencySymbol: '$',\n  language: 'en'\n}"})})]})]}),(0,l.jsx)("h2",{id:"errors",className:"uppercase font-bold text-lg mt-8",children:e("Errors")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["You can pass the ",(0,l.jsx)(h.Z,{value:"error"})," prop to highlight the Country field red."]})}),(0,l.jsxs)("div",{className:"curved",children:[(0,l.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,l.jsx)(i(),{className:"w-full z-10 text-black",error:!0,value:"US"})}),(0,l.jsx)(h.C,{language:"typescript",children:'<Country className="w-full z-10 text-black" error={string|true} value="US" />'})]}),(0,l.jsx)("h2",{id:"styles",className:"uppercase font-bold text-lg mt-8",children:e("Custom Styles")}),(0,l.jsx)("p",{className:"py-4",children:(0,l.jsxs)(r.Translate,{children:["You can add your own custom class to selects or use any of the respective",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-control"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-placeholder"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-dropdown"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-search"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-search-control"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-search-icon"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-options"}),",",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-option"}),", and",(0,l.jsx)(h.Z,{l:!0,value:"frui-field-select-label"})," CSS classes."]})}),(0,l.jsxs)("div",{className:"flex items-center border-t border-b2 mt-8 pt-4",children:[(0,l.jsxs)(a(),{className:"text-t2",href:"/field/checkbox",children:[(0,l.jsx)("i",{className:"fas fa-arrow-left mr-2"}),e("Checkbox")]}),(0,l.jsx)("div",{className:"flex-grow"}),(0,l.jsxs)(a(),{className:"text-t2",href:"/field/currency",children:[e("Currency"),(0,l.jsx)("i",{className:"fas fa-arrow-right ml-2"})]})]})]})]})]})})}}},function(e){e.O(0,[9461,1866,2888,9774,179],function(){return e(e.s=50352)}),_N_E=e.O()}]);