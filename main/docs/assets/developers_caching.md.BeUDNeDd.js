import{_ as a,c as t,a3 as r,o as c}from"./chunks/framework.BU4YErrW.js";const u=JSON.parse('{"title":"Caching","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"developers/caching.md","filePath":"developers/caching.md"}'),s={name:"developers/caching.md"};function o(i,e,n,d,h,l){return c(),t("div",null,e[0]||(e[0]=[r('<h1 id="caching" tabindex="-1">Caching <a class="header-anchor" href="#caching" aria-label="Permalink to &quot;Caching&quot;">​</a></h1><h2 id="cache-based-requests" tabindex="-1">Cache-based requests <a class="header-anchor" href="#cache-based-requests" aria-label="Permalink to &quot;Cache-based requests&quot;">​</a></h2><p>The Datahub leverages OGC-client&#39;s built-in caching mechanism to optimize data fetching for features, CSV, XLS, GeoJSON, GML files, and more.</p><p>By default, OGC-client caches responses for 2 hours. However, for records that are updated frequently, this cache is automatically bypassed.</p><p>A record is considered to have a high update frequency if its <code>updateFrequency</code> property is set to <code>&#39;continual&#39;</code> or if it gets updated <strong>more than once per day</strong>.</p>',5)]))}const f=a(s,[["render",o]]);export{u as __pageData,f as default};
