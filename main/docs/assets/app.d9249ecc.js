import{a5 as i,u,Q as o,a6 as c,c as l,A as d,H as f,a7 as m,a8 as A,a9 as h,aa as g,ab as y,ac as P,ad as v,ae as w,af as C,ag as _,ah as b,ai as D,Y as R}from"./chunks/framework.02cfc778.js";import{t as r}from"./chunks/theme.15cb60bd.js";const E={extends:r,Layout:()=>i(r.Layout,null,{}),enhanceApp({app:e,router:a,siteData:t}){}};function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(E),L=u({name:"VitePressApp",setup(){const{site:e}=l();return d(()=>{f(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),m(),A(),h(),s.setup&&s.setup(),()=>i(s.Layout)}});async function T(){const e=O(),a=x();a.provide(g,e);const t=y(e.route);return a.provide(P,t),a.component("Content",v),a.component("ClientOnly",w),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:C}),{app:a,router:e,data:t}}function x(){return _(L)}function O(){let e=o,a;return b(t=>{let n=D(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),o&&(e=!1),R(()=>import(n),[])):null},s.NotFound)}o&&T().then(({app:e,router:a,data:t})=>{a.go().then(()=>{c(a.route,t.site),e.mount("#app")})});export{T as createApp};
