import{_ as e,v as s,b as a,R as n}from"./chunks/framework.02cfc778.js";const g=JSON.parse('{"title":"Deployment","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/deploy.md","filePath":"guide/deploy.md"}'),o={name:"guide/deploy.md"},t=n(`<h1 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;Deployment&quot;">​</a></h1><p>This guide will offer you indications and advices for successfully deploying one or several GeoNetwork-UI applications in your infrastructure.</p><h2 id="basic-principle" tabindex="-1">Basic principle <a class="header-anchor" href="#basic-principle" aria-label="Permalink to &quot;Basic principle&quot;">​</a></h2><p>Applications can be built using the following command:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">app-nam</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># &lt;app-name&gt; is e.g. datahub or datafeeder</span></span></code></pre></div><p>All build artifacts for this application will end up in the <code>dist/&lt;app-name&gt;</code> folder. These artifacts can be deployed in any HTTP server (e.g. Nginx, Apache, Azure Static Website with Blob storage...).</p><p>Simply move the content of <code>dist/&lt;app-name&gt;</code> folder into the appropriate place for your server and adjust your configuration file (if needed).</p><h2 id="web-server" tabindex="-1">Web Server <a class="header-anchor" href="#web-server" aria-label="Permalink to &quot;Web Server&quot;">​</a></h2><p>Geonetwork-UI applications are using <strong>path-based routing strategy</strong>. This means than an application deployed on <code>https://my.host.org/apps/&lt;app-name&gt;</code> can handle routes such as:</p><ul><li><code>/apps/&lt;app-name&gt;/records/all</code></li><li><code>/apps/&lt;app-name&gt;/settings</code></li><li><code>/apps/&lt;app-name&gt;/search?q=road</code></li></ul><p>All these routes should in reality end up pointing to <code>/apps/&lt;app-name&gt;/index.html</code>, the rest of the path being interpreted by Angular.</p><p>This requires the relevant HTTP server to have a specific configuration for this to work (otherwise 404 errors will happen very often).</p><p>The configuration must essentially let the HTTP server know that if a required resource is not available, the request must be redirected to the application <code>index.html</code> file.</p><h3 id="nginx" tabindex="-1">NGINX <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;NGINX&quot;">​</a></h3><p>For Nginx, edit your server configuration to redirect to the application <code>index.html</code> as fallback.</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen [::] 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name www.example.com example.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    root /var/www/example;</span></span>
<span class="line"><span style="color:#A6ACCD;">    index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        try_files $uri$args $uri$args/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="apache" tabindex="-1">Apache <a class="header-anchor" href="#apache" aria-label="Permalink to &quot;Apache&quot;">​</a></h3><p>For Apache, you first need to activate the rewrite module :</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">a2enmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rewrite</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apache2</span></span></code></pre></div><p>Then there are two options available. You can either add the following lines in an <code>.htaccess</code> file alongside the application <code>index.html</code> file, or in a directory rule inside your <code>httpd.conf</code>:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">RewriteEngine</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">On</span></span>
<span class="line"><span style="color:#FFCB6B;">RewriteCond</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">%{DOCUMENT_ROOT}%{REQUEST_URI}</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> [OR]</span></span>
<span class="line"><span style="color:#FFCB6B;">RewriteCond</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">%{DOCUMENT_ROOT}%{REQUEST_URI}</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span></span>
<span class="line"><span style="color:#FFCB6B;">RewriteRule</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">^</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span><span style="color:#A6ACCD;"> [L]</span></span>
<span class="line"><span style="color:#FFCB6B;">RewriteRule</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">^</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{link_to_angular}/index.html</span></span></code></pre></div><p>Replace <code>{link_to_angular}/index.html</code> with your needs.</p><h2 id="authentication" tabindex="-1">Authentication <a class="header-anchor" href="#authentication" aria-label="Permalink to &quot;Authentication&quot;">​</a></h2><p>GeoNetwork-UI applications rely on the GeoNetwork authentication mechanism. This means that if the user is authenticated in GeoNetwork, they will have access to authenticated features in the corresponding GeoNetwork-UI apps.</p><p>There are a few caveats, depending on the deployment scenario:</p><details class="details custom-block"><summary>😌 GeoNetwork and GeoNetwork-UI are deployed on the same host</summary><blockquote><p>e.g. <a href="https://my.host/geonetwork" target="_blank" rel="noreferrer">https://my.host/geonetwork</a> and <a href="https://my.host/datahub" target="_blank" rel="noreferrer">https://my.host/datahub</a></p></blockquote><p>In this scenario, requests from the GeoNetwork-UI app to GeoNetwork are <em>not</em> <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#what_requests_use_cors" target="_blank" rel="noreferrer">cross-origin requests</a>, so CORS rules do not apply.</p><p>GeoNetwork has an XSRF protection by default, which <em>will</em> make authenticated requests fail unless the following is done:</p><ul><li><p>either make sure that the XSRF cookies sent by GeoNetwork have a <code>path</code> value of <code>/</code>; this is typically done like so in GeoNetwork:</p><div class="language-diff"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;"> a/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml</span></span>
<span class="line"><span style="color:#89DDFF;">+++</span><span style="color:#A6ACCD;"> b/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml</span></span>
<span class="line"><span style="color:#89DDFF;">@@</span><span style="color:#A6ACCD;"> -361,6 +361,7 </span><span style="color:#89DDFF;">@@</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;bean class=&quot;org.fao.geonet.security.web.csrf.CookieCsrfTokenRepository&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">         id=&quot;csrfTokenRepository&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">     &lt;property name=&quot;cookieHttpOnly&quot; value=&quot;false&quot;/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">    &lt;property name=&quot;cookiePath&quot; value=&quot;/&quot;/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;/bean&gt;</span></span></code></pre></div><p>Also make sure that the GeoNetwork API URL used by the application is <em>not</em> an absolute URL; a relative URL should be enough in that scenario:</p><div class="language-diff"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;"> a/conf/default.toml</span></span>
<span class="line"><span style="color:#89DDFF;">+++</span><span style="color:#A6ACCD;"> b/conf/default.toml</span></span>
<span class="line"><span style="color:#89DDFF;">@@</span><span style="color:#A6ACCD;"> -5,7 +5,7 </span><span style="color:#89DDFF;">@@</span></span>
<span class="line"><span style="color:#A6ACCD;">[global]</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#F07178;">geonetwork4_api_url = &quot;https://my.host/geonetwork/srv/api&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">geonetwork4_api_url = &quot;/geonetwork/srv/api&quot;</span></span></code></pre></div></li><li><p>or disable the XSRF protection selectively for non-critical endpoints of GeoNetwork, e.g. <a href="https://my.host/geonetwork/srv/api/userSelections" target="_blank" rel="noreferrer">https://my.host/geonetwork/srv/api/userSelections</a> for marking records as favorites; this is typically done like so in GeoNetwork:</p><div class="language-diff"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">---</span><span style="color:#A6ACCD;"> a/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml</span></span>
<span class="line"><span style="color:#89DDFF;">+++</span><span style="color:#A6ACCD;"> b/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml</span></span>
<span class="line"><span style="color:#89DDFF;">@@</span><span style="color:#A6ACCD;"> -374,6 +374,9 </span><span style="color:#89DDFF;">@@</span></span>
<span class="line"><span style="color:#A6ACCD;">         &lt;value&gt;/[a-zA-Z0-9_\\-]+/[a-z]{2,3}/csw!?.*&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">         &lt;value&gt;/[a-zA-Z0-9_\\-]+/api/search/.*&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">         &lt;value&gt;/[a-zA-Z0-9_\\-]+/api/site&lt;/value&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">        &lt;value&gt;/[a-zA-Z0-9_\\-]+/api/userselections.*&lt;/value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       &lt;/set&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">     &lt;/constructor-arg&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;/bean&gt;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Please do this responsibly as this could have security implications!</p></div></li></ul></details><details class="details custom-block"><summary>😓 GeoNetwork and GeoNetwork-UI are <u>not</u> deployed on the same host</summary><blockquote><p>e.g. <a href="https://my.host/geonetwork" target="_blank" rel="noreferrer">https://my.host/geonetwork</a> and <a href="https://another.org/datahub" target="_blank" rel="noreferrer">https://another.org/datahub</a></p></blockquote><p>In this scenario, even if CORS settings are correctly set up on GeoNetwork side, most authenticated request will probably fail because by default they are not sent with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials" target="_blank" rel="noreferrer"><code>withCredentials: true</code></a> option.</p><p>As such, <strong>authenticated requests are not yet supported in GeoNetwork-UI in the case of a cross-origin deployment</strong>; non-authenticated requests (e.g. public search) should still work provided CORS settings were correctly set up on the GeoNetwork side (see <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers" target="_blank" rel="noreferrer">CORS response headers</a>).</p><p>Lastly, even if authenticated requests were cleared regarding CORS rules, it would still be needed to disable the XSRF mechanism for the endpoints that GeoNetwork-UI relies on; XSRF protections works by making the client read the content of an HTTP cookie, and that is forbidden in a cross-origin context</p></details><h2 id="enabling-improved-search-fields" tabindex="-1">Enabling improved search fields <a class="header-anchor" href="#enabling-improved-search-fields" aria-label="Permalink to &quot;Enabling improved search fields&quot;">​</a></h2><p>ElasticSearch offers the possibility to preprocess the records of a catalog, and this can be leveraged to <strong>improve the search experience in GeoNetwork-UI</strong>. This is done by registering so-called <a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.17/ingest.html" target="_blank" rel="noreferrer">ingest pipelines</a>.</p><p>GeoNetwork-UI provides several pipelines, for instance:</p><ul><li>Enable the Metadata Quality Score</li><li>Show better, human-readable data formats</li></ul><p>The two options for registering the pipelines are explained below.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Once pipelines are registered, the GeoNetwork catalog should be fully reindexed again.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><strong>Please note that destroying and recreating the GeoNetwork index <em>will</em> disable the pipelines!</strong> These should simply be registered again afterward.</p></div><h3 id="option-a-executing-a-node-script" tabindex="-1">Option A: Executing a Node script <a class="header-anchor" href="#option-a-executing-a-node-script" aria-label="Permalink to &quot;Option A: Executing a Node script&quot;">​</a></h3><p>This will require having <code>node</code> installed on the device, as well as a direct HTTP access to the ElasticSearch instance (i.e. not just access to the GeoNetwork API).</p><p>First clone the GeoNetwork-UI repository:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git@github.com:geonetwork/geonetwork-ui.git</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">geonetwork-ui</span></span></code></pre></div><p>Then run the following script with the appropriate options:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tools/pipelines/register-es-pipelines.js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">register</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--host=http://localhost:9090</span></span></code></pre></div><p>The <code>--host</code> option is used to point to the ElasticSearch instance. If ElasticSearch is secured, <code>--username</code> and <code>--password</code> can be used to pass HTTP Authentication. Additionally, the <code>--records-index</code> option can be used if the index containing the metadata records is not called <code>gn-records</code>.</p><h3 id="option-b-running-a-docker-image" tabindex="-1">Option B: Running a docker image <a class="header-anchor" href="#option-b-running-a-docker-image" aria-label="Permalink to &quot;Option B: Running a docker image&quot;">​</a></h3><p>A docker image called <code>geonetwork/geonetwork-ui-tools-pipelines</code> can be used to register pipelines automatically on startup.</p><p>To run it:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--env</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ES_HOST=http://localhost:9200</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--network</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">geonetwork/geonetwork-ui-tools-pipelines</span></span></code></pre></div><p>Here the <code>ES_HOST</code> environment variable is used to point to the ElasticSearch instance. Note that this host will be used <em>from inside the docker container</em>, so to access an instance on <code>localhost</code> the <code>--network host</code> option is also required.</p><p>The <code>RECORDS_INDEX</code> environment variable can be used to a different index name if it is not called <code>gn-records</code>.</p>`,47),l=[t];function p(r,i,c,d,h,u){return s(),a("div",null,l)}const C=e(o,[["render",p]]);export{g as __pageData,C as default};