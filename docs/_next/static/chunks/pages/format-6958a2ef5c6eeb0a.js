(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1790],{57952:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n(e){let{value:s,box:t=!0,text:r=!0,sm:n,md:a,lg:i,className:c,style:o={}}=e,d=n?"8px":a?"12px":i?"16px":"12px",u={backgroundColor:s,height:d,width:d};if(t&&r){let e=["frui-format-color"];return c&&e.push(c),(0,l.jsxs)("span",Object.assign({className:e.join(" "),style:o},{children:[(0,l.jsx)("span",{className:"frui-format-color-box",style:u}),(0,l.jsx)("span",Object.assign({className:"frui-format-color-text"},{children:s}))]}))}if(t){let e=["frui-format-color-box"];return c&&e.push(c),(0,l.jsx)("span",{className:e.join(" "),style:Object.assign(Object.assign({},o),u)})}let m=["frui-format-color-text"];return c&&m.push(c),(0,l.jsx)("span",Object.assign({className:m.join(" "),style:o},{children:s}))}s.Z=n},23547:function(e,s,t){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246),n=r(t(61866));function a(e){let{value:s,flag:t=!0,text:r=!0,sm:a,md:i,lg:c,className:o,style:d={}}=e,u={width:a?"20px":i?"40px":c?"60px":"40px"},m=n.default.find(e=>e.countryCode===s);if(!m){let e=["frui-format-country-text"];return o&&e.push(o),(0,l.jsx)("span",Object.assign({className:e.join(" "),style:d},{children:s}))}if(t&&r){let e=["frui-format-country"];return o&&e.push(o),(0,l.jsxs)("span",Object.assign({className:e.join(" "),style:d},{children:[(0,l.jsx)("img",{className:"frui-format-country-flag",style:u,alt:`${m.countryName} Flag`,src:`https://flagcdn.com/w80/${m.countryCode.toLowerCase()}.png`,loading:"lazy"}),(0,l.jsx)("span",Object.assign({className:"frui-format-country-text"},{children:m.countryName}))]}))}if(t){let e=["frui-format-country-flag"];return o&&e.push(o),(0,l.jsx)("img",{className:e.join(" "),style:Object.assign(Object.assign({},d),u),alt:`${m.countryName} Flag`,src:`https://flagcdn.com/w40/${m.countryCode.toLowerCase()}.png`,loading:"lazy"})}let f=["frui-format-country-text"];return o&&f.push(o),(0,l.jsx)("span",Object.assign({className:f.join(" "),style:d},{children:m.countryName}))}s.default=a},46857:function(e,s,t){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246),n=r(t(61866));function a(e){let{value:s,flag:t=!0,text:r=!0,sm:a,md:i,lg:c,className:o,style:d={}}=e,u={width:a?"20px":i?"40px":c?"60px":"40px"},m=n.default.find(e=>"USD"!==s.toUpperCase()&&e.currencyCode===s||"USD"===s.toUpperCase()&&"US"===e.countryCode);if(!m){let e=["frui-format-country-text"];return o&&e.push(o),(0,l.jsx)("span",Object.assign({className:e.join(" "),style:d},{children:s}))}if(t&&r){let e=["frui-format-country"];return o&&e.push(o),(0,l.jsxs)("span",Object.assign({className:e.join(" "),style:d},{children:[(0,l.jsx)("img",{className:"frui-format-country-flag",style:u,alt:`${m.countryName} Flag`,src:`https://flagcdn.com/w80/${m.countryCode.toLowerCase()}.png`,loading:"lazy"}),(0,l.jsx)("span",Object.assign({className:"frui-format-country-text"},{children:m.currencyName}))]}))}if(t){let e=["frui-format-country-flag"];return o&&e.push(o),(0,l.jsx)("img",{className:e.join(" "),style:Object.assign(Object.assign({},d),u),alt:`${m.countryName} Flag`,src:`https://flagcdn.com/w40/${m.countryCode.toLowerCase()}.png`,loading:"lazy"})}let f=["frui-format-country-text"];return o&&f.push(o),(0,l.jsx)("span",Object.assign({className:f.join(" "),style:d},{children:m.currencyName}))}s.default=a},34278:function(e,s,t){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246),n=r(t(61320));function a(e){let{value:s,locale:t="en",format:r="MMMM Do YYYY, h:mm:ss a"}=e,a=new Date(s);return"ago"===r?(0,l.jsx)(l.Fragment,{children:(0,n.default)(a,r).locale(t).fromNow()}):"a"===r?(0,l.jsx)(l.Fragment,{children:(0,n.default)(a,r).locale("short").fromNow()}):(0,l.jsx)(l.Fragment,{children:(0,n.default)(a).locale(t).format(r)})}n.default.locale("short",{parentLocale:"en",relativeTime:{future:"-%s",past:"%s",s:"now",ss:"now",m:"1m",mm:"%dm",h:"1h",hh:"%dh",d:"1d",dd:"%dd",w:"1w",ww:"%dw",M:"1M",MM:"%dM",y:"1y",yy:"%dy"}}),s.default=a},70752:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});let n=t(24246),a=l(t(23757));function i(e){var{value:s}=e,t=r(e,["value"]);return(0,n.jsx)(a.default,Object.assign({},t,{value:`mailto:${s}`,label:s}))}s.default=i},96508:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __webpack_unused_export__;__webpack_unused_export__={value:!0};let jsx_runtime_1=__webpack_require__(24246);function Formula(props){let{value,data={},formula}=props,calculations=formula.replace(/\{this\}/,String(Number(value)||0));for(let key in data)calculations=calculations.replace(RegExp(`\\{${key}\\}`),String(Number(data[key])||0));calculations=calculations.replace(/\{[^\}]*\}/,"0");let solution=0;try{solution=eval(`(${calculations})`)}catch(e){}return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:solution})}exports.Z=Formula},224:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n({value:e}){return(0,l.jsx)("div",{dangerouslySetInnerHTML:{__html:e}})}s.Z=n},38178:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246);function n(e){var{value:s}=e,t=r(e,["value"]);return(0,l.jsx)("img",Object.assign({},t,{src:s}))}s.default=n},43374:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246);function n(e){let{value:s,className:t}=e,n=r(e,["value","className"]),a=["frui-format-imagelist"];return t&&a.push(t),(0,l.jsx)("div",Object.assign({className:a.join(" ")},{children:s.map((e,s)=>(0,l.jsx)("img",Object.assign({},n,{src:e}),s))}))}s.default=n},28338:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246);function n(e){var{value:s}=e,t=r(e,["value"]);return(0,l.jsx)("pre",Object.assign({},t,{children:JSON.stringify(s,null,2)}))}s.default=n},23757:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t};Object.defineProperty(s,"__esModule",{value:!0});let l=t(24246);function n(e){var{value:s,label:t}=e,n=r(e,["value","label"]);return(0,l.jsx)("a",Object.assign({href:s},n,{children:t||s}))}s.default=n},5896:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n(e){let{value:s,ordered:t,className:r,style:n={}}=e,a=["frui-format-list"];return(r&&a.push(r),t)?(0,l.jsx)("ol",Object.assign({className:a.join(" "),style:n},{children:s.map((e,s)=>(0,l.jsx)("li",{children:e},s))})):(0,l.jsx)("ul",Object.assign({className:a.join(" "),style:n},{children:s.map((e,s)=>(0,l.jsx)("li",{children:e},s))}))}s.Z=n},62270:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n({className:e,style:s,value:t}){return(0,l.jsx)("table",{children:(0,l.jsx)("tbody",{children:Object.entries(t).map(([t,r])=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",Object.assign({className:e,style:s},{children:t})),(0,l.jsx)("td",Object.assign({className:e,style:s},{children:r}))]},t))})})}s.Z=n},63391:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246),n=(e,s,t,r,l=!1)=>{let n=Math.abs(e),a=Math.floor(n),i=n-a,c=Math.max(0,r||String(i).split(".")[1].length),o=c?t+i.toFixed(c).slice(2):"",d=a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,s);return l?d+o:(e<0?"-":"")+d+o};function a(e){let{value:s,separator:t="",decimal:r=".",decimals:a,absolute:i}=e,c=n(Number(s)||0,t,r,a,i);return(0,l.jsx)(l.Fragment,{children:c})}s.Z=a},44539:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n(e){let{value:s,length:t,words:r,hellip:n}=e,a="string"==typeof t?Number(t)||void 0:t;if(r){let e=s.split(" ");return a&&e.length>a?(0,l.jsxs)(l.Fragment,{children:[e.slice(0,a).join(" "),n&&(0,l.jsx)(l.Fragment,{children:"…"})]}):(0,l.jsx)(l.Fragment,{children:s})}return a&&s.length>a?(0,l.jsxs)(l.Fragment,{children:[s.slice(0,a),n&&(0,l.jsx)(l.Fragment,{children:"…"})]}):(0,l.jsx)(l.Fragment,{children:s})}s.Z=n},36166:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});let n=t(24246),a=l(t(23757));function i(e){var{value:s}=e,t=r(e,["value"]);return(0,n.jsx)(a.default,Object.assign({},t,{value:`tel:${s}`,label:s}))}s.default=i},112:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n(e){let{value:s,max:t,remainder:r,round:n}=e,a="round"===n?Math.round(Number(s)):"ceil"===n?Math.ceil(Number(s)):"floor"===n?Math.floor(Number(s)):Math.round(Number(s)),i=[];for(let e=0;e<(t||a);e++)e<a?i.push((0,l.jsx)("span",{children:"★"},e)):r&&i.push((0,l.jsx)("span",{children:"☆"},e));return(0,l.jsx)(l.Fragment,{children:i})}s.Z=n},48009:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n(e){let{value:s,className:t,style:r,separator:n=" "}=e;return"line"===n?(0,l.jsx)("div",Object.assign({className:t,style:r},{children:s.map((e,s)=>(0,l.jsx)("div",{children:e},s))})):(0,l.jsx)("span",Object.assign({className:t,style:r},{children:s.join(n)}))}s.Z=n},91428:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246),n=t(54974);function a(e){let{style:s={},className:t,value:r,stripes:a}=e;if(!r||!r.length)return null;let i={head:Object.assign(Object.assign({},s),{textAlign:"left",backgroundColor:a?a[0]:void 0}),rows:[Object.assign(Object.assign({},s),{backgroundColor:a?a[1]:void 0}),Object.assign(Object.assign({},s),{backgroundColor:a?a[2]:void 0})]};return(0,l.jsxs)(n.Table,{children:[Object.keys(r[0]).map(e=>(0,l.jsx)(n.Thead,Object.assign({className:t,style:i.head},{children:e}),e)),r.map((e,s)=>(0,l.jsx)(n.Trow,{children:Object.values(e).map((e,r)=>(0,l.jsx)(n.Tcol,Object.assign({className:t,style:i.rows[s%2]},{children:e}),`${s}-${r}`))},s))]})}s.Z=a},18382:function(e,s,t){"use strict";var r=this&&this.__rest||function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>s.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>s.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(t[r[l]]=e[r[l]]);return t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});let n=t(24246),a=l(t(23485));function i(e){let{className:s,style:t,value:l}=e,i=r(e,["className","style","value"]);return(0,n.jsx)("span",Object.assign({className:"frui-format-taglist"},{children:l.map((e,r)=>(0,n.jsx)(a.default,Object.assign({className:s,style:t},i,{children:e}),r))}))}s.default=i},37426:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n({value:e,format:s}){let t={};return"uppercase"===s?t.textTransform="uppercase":"lowercase"===s?t.textTransform="lowercase":"capitalize"===s&&(t.textTransform="capitalize"),(0,l.jsx)("span",Object.assign({style:t},{children:e}))}s.Z=n},73365:function(e,s,t){"use strict";var r;r={value:!0};let l=t(24246);function n(e){let{value:s,yes:t="Yes",no:r="No"}=e;return(0,l.jsx)(l.Fragment,{children:s?t:r})}s.Z=n},8530:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/format",function(){return t(51108)}])},51108:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return Y}});var r=t(24246),l=t(22879),n=t(86677),a=t(18604),i=t(78968),c=t(57952),o=t(23547),d=t.n(o),u=t(46857),m=t.n(u),f=t(34278),x=t.n(f),b=t(70752),h=t.n(b),p=t(96508),j=t(224),v=t(38178),y=t.n(v),N=t(43374),g=t.n(N),w=t(28338),O=t.n(w),_=t(23757),k=t.n(_),C=t(5896),M=t(26284),P=t.n(M),S=t(62270),F=t(63391),Z=t(44539),T=t(36166),E=t.n(T),$=t(112),D=t(48009),I=t(91428),L=t(18382),R=t.n(L),U=t(37426),z=t(73365);function Y(){let{_:e}=(0,l.useLanguage)(),s=(0,n.useRouter)(),t=[{icon:"text-height",label:"Formats"}];return(0,r.jsx)(i.sF,{uri:"/format",title:"Formats",description:"Formats in FRUI, are ReactJS components designed to map with database data types and integrate easily with ORMs.",children:(0,r.jsxs)("main",{className:"flex flex-col h-full w-full",children:[(0,r.jsx)("div",{className:"p-3 bg-b2",children:(0,r.jsx)(a.Z,{crumbs:t})}),(0,r.jsxs)("div",{className:"flex-grow pt-3 pb-5 overflow-auto",children:[(0,r.jsx)("h1",{className:"px-3 flex items-center uppercase font-bold text-xl",children:e("Formats")}),(0,r.jsx)("p",{className:"px-3 pt-3",children:"Thanks to our sponsors, contributors, and users. The following formats have been unlocked and are free to use."}),(0,r.jsxs)("div",{className:"flex flex-wrap mt-4",children:[(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/color"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(c.Z,{lg:!0,value:"salmon"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Color")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/country"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(d(),{value:"US"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Country")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/currency"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(m(),{value:"USD"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Currency")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/date"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(x(),{value:"2024-02-03"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Date")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/email"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(h(),{className:"text-t2",value:"john@doe.com"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Email")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/formula"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:["x + y + z = ",(0,r.jsx)(p.Z,{value:"29",formula:"{x} + {this} + {y}",data:{x:4,y:5}})]}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Formula")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/html"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(j.Z,{value:'<h1><strong style="color: green">Hello</strong> World</h1>'})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("HTML")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/image"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(y(),{value:"https://images.wsj.net/im-580612/8SR",width:"100"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Image")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/imagelist"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(g(),{className:"flex",value:["https://images.wsj.net/im-580612/8SR","https://images.wsj.net/im-580612/8SR"],width:"50"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Imagelist")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/json"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(O(),{value:{foo:"foo",bar:"bar"}})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("JSON")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/json"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(k(),{className:"text-t2",value:"https://images.wsj.net/im-580612/8SR"})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Link")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/list"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(C.Z,{value:["electronics","laptops"]})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("List")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/markdown"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(P(),{value:"# Hello **World**"})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Markdown")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/metadata"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(S.Z,{className:"p-2 border-t border-b0",value:{id:"12345",upc:"67890"}})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Metadata")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/number"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(F.Z,{value:"12345.67",separator:",",decimal:".",decimals:2})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Number")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/overflow"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left",children:(0,r.jsx)(Z.Z,{value:"Lorem Ipsum",length:8,hellip:!0})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Overflow")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/phone"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(E(),{className:"text-t2",value:"+1 (410) 555-2424"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Phone")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/rating"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-t-warning",children:(0,r.jsx)($.Z,{value:"3.5",max:5,remainder:!0,round:"floor"})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Rating")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/separated"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(D.Z,{value:["Foo","bar"],separator:" - "})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Separated")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/table"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)("div",{className:"text-left text-black w-full",children:(0,r.jsx)(I.Z,{value:[{id:1,name:"John Doe"}],stripes:["#CCCCCC","#EFEFEF","#FCFCFC"]})})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Table")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/taglist"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(R(),{className:"rounded-full bg-orange-600 mr-1",value:["electronics","laptop"]})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Taglist")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/text"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(U.Z,{format:"capitalize",value:"i am a title"})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Text")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",onClick:()=>s.push("/format/yesno"),children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:(0,r.jsx)(z.Z,{value:!0})}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Yesno")})]})})]}),(0,r.jsxs)("h2",{className:"px-3 flex items-center uppercase font-bold text-xl mt-4",children:[(0,r.jsx)("i",{className:"fas fa-lock mr-2"}),e("Locked")]}),(0,r.jsx)("p",{className:"px-3 pt-3",children:"The following formats have are locked until enough there are enough users and demand for such formats."}),(0,r.jsxs)("div",{className:"flex flex-wrap mt-4",children:[(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:"Unlocks at 1,500 downloads"}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("Code")})]})}),(0,r.jsx)("div",{className:"block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer",children:(0,r.jsxs)("div",{className:"m-2 border border-b2 rounded overflow-hidden",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-[130px] w-full bg-b1 px-3",children:"Unlocks at 2,500 downloads"}),(0,r.jsx)("h2",{className:"my-2 font-semibold text-center uppercase",children:e("JSON")})]})})]})]})]})})}},86677:function(e,s,t){e.exports=t(51648)}},function(e){var s=function(s){return e(e.s=s)};e.O(0,[5259,1866,6062,2888,9774,179],function(){return s(8530)}),_N_E=e.O()}]);