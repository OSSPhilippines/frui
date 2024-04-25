(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4854],{41323:function(e,s,t){"use strict";let n=t(24246);s.Z=e=>{let{show:s,color:t,label:a,style:l={},className:r}=e;l.borderColor=t||"#666666";let c={};!1===s&&(c.display="none");let o=["frui-loader"];return r&&o.push(r),(0,n.jsxs)("div",Object.assign({style:c},{children:[(0,n.jsx)("span",{className:o.join(" "),style:l}),a]}))}},38536:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/component/loader",function(){return t(3525)}])},36493:function(e,s,t){"use strict";t.d(s,{C:function(){return i},Z:function(){return o}});var n=t(24246),a=t(22879),l=t(74631),r=t(48717),c=t(14707);function o(e){let{value:s,quote:t,l:a,r:l,children:r}=e;return(0,n.jsxs)(n.Fragment,{children:[a?(0,n.jsx)("span",{children:"\xa0"}):"",(0,n.jsxs)("code",{className:"text-sm text-t2 bg-b1 font-semibold inline-block p-0.5",children:[t?"`":"",s||r,t?"`":""]}),l?(0,n.jsx)("span",{children:"\xa0"}):""]})}function i(e){let{className:s,copy:t=!0,children:o,language:i}=e,{_:d}=(0,a.useLanguage)();return(0,n.jsxs)("div",{className:"flex text-sm bg-black ".concat(s||""),children:[(0,n.jsx)(l.Z,{className:"flex-grow !p-4 !bg-transparent",language:i,style:r._4,children:o}),t&&(0,n.jsxs)("div",{className:"text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap",onClick:()=>{navigator.clipboard.writeText(o.toString()),(0,c.ZP)("success",d("Copied to clipboard"))},children:[(0,n.jsx)("i",{className:"fas fa-copy"})," ",d("Copy")]})]})}},18604:function(e,s,t){"use strict";var n=t(24246);t(27378);var a=t(79894),l=t.n(a);let r=e=>{let{href:s,label:t,icon:a,last:r}=e,c=s?(0,n.jsx)(l(),{href:s,className:"inline-flex items-center text-t2",children:t}):(0,n.jsx)("span",{className:"inline-flex items-center font-semibold text-t1",children:t});return(0,n.jsxs)(n.Fragment,{children:[a&&(0,n.jsx)("i",{className:"fas fa-fw fa-".concat(a," inline-block mr-1 text-t1")}),c,!r&&(0,n.jsx)("i",{className:"fas fa-fw fa-chevron-right mx-1 text-t1"})]})},c=e=>{var s;let{trail:t}=e;if(0===t.length)return null;let a=t[t.length-1],r=a.href||(null===(s=t[t.length-2])||void 0===s?void 0:s.href);return r?(0,n.jsxs)(l(),{className:"flex md:hidden items-center cursor-pointer whitespace-nowrap overflow-x-hidden",href:r,children:[(0,n.jsx)("i",{className:"mr-1 fas fa-fw fa-chevron-left text-xl text-t2"}),!!a.icon&&(0,n.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(a.icon," text-sm")}),(0,n.jsx)("span",{className:"font-bold",children:a.label})]}):(0,n.jsxs)("div",{className:"flex md:hidden items-center whitespace-nowrap overflow-x-hidden",children:[!!a.icon&&(0,n.jsx)("i",{className:"mr-0.5 fas fa-fw fa-".concat(a.icon," text-sm")}),(0,n.jsx)("span",{className:"font-bold",children:a.label})]})};s.Z=e=>{let{crumbs:s,className:t}=e,a=[...s].filter(e=>!!e.label),l=["hidden md:flex items-center whitespace-nowrap overflow-x-auto"];return t&&l.push(t),(0,n.jsxs)("nav",{children:[(0,n.jsx)("div",{className:l.join(" "),children:a.map((e,s)=>(0,n.jsx)(r,{href:e.href,label:e.label,icon:e.icon,last:s===a.length-1},s))}),(0,n.jsx)(c,{trail:a})]})}},3525:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return x}});var n=t(24246),a=t(22879),l=t(79894),r=t.n(l),c=t(18604),o=t(78968),i=t(41323),d=t(36493);function x(){let{_:e}=(0,a.useLanguage)();return(0,n.jsx)(o.sF,{uri:"/component/loader",title:"Loader Component",description:"Loaders in FRUI, are ReactJS components that let users know that is app is processing something and they just need to wait.",children:(0,n.jsxs)("main",{className:"flex flex-col h-full w-full",children:[(0,n.jsx)("div",{className:"p-3 bg-b2",children:(0,n.jsx)(c.Z,{crumbs:[{icon:"icons",label:"Components",href:"/component"},{label:"Loader"}]})}),(0,n.jsxs)("div",{className:"flex-grow px-3 pt-3 pb-5 overflow-auto",children:[(0,n.jsx)("h1",{className:"flex items-center uppercase font-bold text-xl",children:e("Loader")}),(0,n.jsx)("p",{className:"py-4",children:(0,n.jsxs)(a.Translate,{children:["By default, loaders wont show until ",(0,n.jsx)(d.Z,{value:"show"})," is set to ",(0,n.jsx)(d.Z,{value:"true"}),"."]})}),(0,n.jsxs)("div",{className:"curved overflow-hidden",children:[(0,n.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,n.jsx)(i.Z,{show:!0})}),(0,n.jsx)(d.C,{language:"typescript",children:"<Loader show={true} />"})]}),(0,n.jsx)("h2",{className:"uppercase font-bold text-lg mt-8",children:e("Custom Color")}),(0,n.jsx)("p",{className:"py-4",children:(0,n.jsx)(a.Translate,{children:"Loaders can have custom CSS compatible colors which includes hex and color names."})}),(0,n.jsxs)("div",{className:"curved overflow-hidden",children:[(0,n.jsx)("div",{className:"flex items-center justify-center p-3 bg-b1",children:(0,n.jsx)(i.Z,{show:!0,color:"salmon"})}),(0,n.jsx)(d.C,{language:"typescript",children:'<Loader show={true} color="salmon" />'})]}),(0,n.jsx)("h2",{className:"uppercase font-bold text-lg mt-8",children:e("Custom Styles")}),(0,n.jsx)("p",{className:"py-4",children:(0,n.jsxs)(a.Translate,{children:["You can add your own custom class to the loader component or use the ",(0,n.jsx)(d.Z,{value:"frui-loader"})," CSS class."]})}),(0,n.jsxs)("div",{className:"flex items-center border-t border-b2 mt-8 pt-4",children:[(0,n.jsxs)(r(),{className:"text-t2",href:"/component/button",children:[(0,n.jsx)("i",{className:"fas fa-arrow-left mr-2"}),e("Buttons")]}),(0,n.jsx)("div",{className:"flex-grow"}),(0,n.jsxs)(r(),{className:"text-t2",href:"/component/modal",children:[e("Modals"),(0,n.jsx)("i",{className:"fas fa-arrow-right ml-2"})]})]})]})]})})}}},function(e){e.O(0,[9461,2888,9774,179],function(){return e(e.s=38536)}),_N_E=e.O()}]);