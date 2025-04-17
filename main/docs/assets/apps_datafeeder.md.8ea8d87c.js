import{_ as e,v as a,b as s,R as o}from"./chunks/framework.02cfc778.js";const g=JSON.parse('{"title":"Datafeeder","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"apps/datafeeder.md","filePath":"apps/datafeeder.md"}'),t={name:"apps/datafeeder.md"},n=o(`<h1 id="datafeeder" tabindex="-1">Datafeeder <a class="header-anchor" href="#datafeeder" aria-label="Permalink to &quot;Datafeeder&quot;">​</a></h1><p>&quot;Datafeeder&quot; is a geOrchestra&#39;s backend RESTful service to upload file based datasets and publish them to GeoServer and GeoNetwork in one shot.</p><p>The separate front-end UI service provides the wizard-like user interface to interact with this <a href="https://github.com/georchestra/georchestra/tree/master/datafeeder" target="_blank" rel="noreferrer">backend</a>.</p><p>The front-end part is built with Geonetwork-UI components</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>The easiest way to deploy datafeeder locally is to use the docker composition in <code>support-services/datafeeder</code>.</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">support-services/datafeeder</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span></span></code></pre></div><p>In <code>geonetwork-ui/</code> directory, run :</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">datafeeder:serve</span></span></code></pre></div><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><h3 id="adding-projections-and-encodings" tabindex="-1">Adding projections and encodings <a class="header-anchor" href="#adding-projections-and-encodings" aria-label="Permalink to &quot;Adding projections and encodings&quot;">​</a></h3><p>The datafeeder configuration can be edited by modifying the <code>frontend-config.json</code> file in <code>support-services/datafeeder/datadir/datafeeder/</code> folder.</p>`,12),r=[n];function d(p,l,i,c,h,f){return a(),s("div",null,r)}const C=e(t,[["render",d]]);export{g as __pageData,C as default};
