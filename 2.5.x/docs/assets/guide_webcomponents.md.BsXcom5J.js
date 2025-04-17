import{_ as i,c as e,a3 as a,o as t}from"./chunks/framework.mu9OS4T4.js";const c=JSON.parse('{"title":"Web components","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/webcomponents.md","filePath":"guide/webcomponents.md"}'),n={name:"guide/webcomponents.md"};function l(p,s,h,o,r,k){return t(),e("div",null,s[0]||(s[0]=[a(`<h1 id="web-components" tabindex="-1">Web components <a class="header-anchor" href="#web-components" aria-label="Permalink to &quot;Web components&quot;">​</a></h1><p>Visit the online <a href="https://geonetwork.github.io/geonetwork-ui/main/demo/webcomponents/" target="_blank" rel="noreferrer">demo page</a>. This directory contains <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank" rel="noreferrer">Web Components</a> relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.</p><p>Web Components are published through an Angular application <code>webcomponents</code> hosted in <a href="https://github.com/geonetwork/geonetwork-ui/tree/main/apps/webcomponents/src" target="_blank" rel="noreferrer"><code>apps/webcomponents/src</code></a> folder. It&#39;s a common Angular application, the only difference is that all Angular components are registered as Web Components in the application module.</p><p>All Web Components are prefixed with <code>gn-</code>.</p><h2 id="use" tabindex="-1">Use <a class="header-anchor" href="#use" aria-label="Permalink to &quot;Use&quot;">​</a></h2><p>Web Components are made to be easily included in any context. To do so, you have to:</p><ul><li>import the Web Component script exported by Angular (available via jsdelivr)</li><li>include your Web Component in the HTML content.</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v2.0.0/gn-wc.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gn-results-list</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> api-url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://dev.geo2france.fr/geonetwork/srv/api&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> catalog-url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://dev.geo2france.fr/datahub/dataset/{uuid}&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;10&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> layout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ROW&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> show-more</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;button&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gn-results-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="publication-and-versioning" tabindex="-1">Publication and Versioning <a class="header-anchor" href="#publication-and-versioning" aria-label="Permalink to &quot;Publication and Versioning&quot;">​</a></h2><p>The Web Component script is automatically built upon merges on main and for releases. These builds are made available via a jsdelivr CDN, which points at <code>wc-dist</code> branches in the github repository. There is a <code>wc-dist</code> branch for every release tag &gt; <code>v2.0.0</code> as well as <code>wc-dist-main</code>.</p><p>You can choose the version of the Web Component script you wish to use by indicating the corresponding value in the script&#39;s URL e.g. <code>wc-dist-v2.0.0</code>.</p><h2 id="build" tabindex="-1">Build <a class="header-anchor" href="#build" aria-label="Permalink to &quot;Build&quot;">​</a></h2><p>All Angular custom elements are served by the same application <code>webcomponents</code>.</p><p>Therefore, there is only one build and one javascript file for all web components called <code>gn-wc.js</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm run build:demo</span></span></code></pre></div><p>You&#39;ll find the built files in <code>dist/demo/webcomponents</code> folder</p><h2 id="run" tabindex="-1">Run <a class="header-anchor" href="#run" aria-label="Permalink to &quot;Run&quot;">​</a></h2><p>To test your Web Component in a real production context</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span></span></code></pre></div><p><strong>Important:</strong> The components are built in <code>production</code> mode.</p><p>You can go to <a href="http://localhost:8001/" target="_blank" rel="noreferrer">http://localhost:8001/</a> to visit GeoNetwork-UI Web Components demo pages.</p><p>You&#39;ll be able to test your Web Components on <code>http://localhost:8001/webcomponents/{name_of_sample_file}</code></p><p>e.g: <a href="http://localhost:8001/webcomponents/gn-results-list.sample.html" target="_blank" rel="noreferrer">http://localhost:8001/webcomponents/gn-results-list.sample.html</a></p><h2 id="create-a-new-web-component" tabindex="-1">Create a new Web Component <a class="header-anchor" href="#create-a-new-web-component" aria-label="Permalink to &quot;Create a new Web Component&quot;">​</a></h2><p>The architecture is designed so that you can export an Angular component to a custom element (e.g. Web Component), that is encapsulated with its style in a shadow DOM element, and can be embedded in any website.</p><p>To export content as a Web Component you have to:</p><ul><li>create a new folder in <a href="https://github.com/geonetwork/geonetwork-ui/tree/main/apps/webcomponents/src/app/components" target="_blank" rel="noreferrer"><code>/apps/webcomponents/src/app/components</code></a>, the folder name must start with <code>gn-</code></li><li>create a new component in this folder, with same name, that will be exported, this component must have the following properties in the metadata decorator:</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  changeDetection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: ChangeDetectionStrategy.OnPush,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  encapsulation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: ViewEncapsulation.ShadowDom</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>add your component in the application module <a href="https://github.com/geonetwork/geonetwork-ui/blob/main/apps/webcomponents/src/app/webcomponents.module.ts" target="_blank" rel="noreferrer"><code>webcomponents.module.ts</code></a> <code>declarations</code> list.</li><li>register your component as a custom element in the <code>CUSTOM_ELEMENTS</code> array in application module <a href="https://github.com/geonetwork/geonetwork-ui/blob/main/apps/webcomponents/src/app/webcomponents.module.ts" target="_blank" rel="noreferrer"><code>webcomponents.module.ts</code></a>, the custom element identifier (i.e Web Component tag name) <em>must</em> be the same as the component folder name</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> CUSTOM_ELEMENTS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [GnFacetsComponent, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;gn-facets&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [GnResultsListComponent, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;gn-results-list&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [GnAggregatedRecordsComponent, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;gn-aggregated-records&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>Add stories for storybook to run it (angular and element stories)</li><li>Add a sample HTML file to show how to use it in a third party web page <code>\${webcomponent_name}.sample.html</code> e.g. gn-results-list.sample.html</li></ul><h2 id="update-web-component-inputs" tabindex="-1">Update Web Component inputs <a class="header-anchor" href="#update-web-component-inputs" aria-label="Permalink to &quot;Update Web Component inputs&quot;">​</a></h2><p>You can handle angular custom elements input changes exactly as it&#39;s done for Angular component: within the <code>onChanges</code> implementation.</p><p>Update Web Component input values from the source page:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;changeSizeBtn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Change size&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gn-results-list</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> api-url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://dev.geo2france.fr/geonetwork/srv/api&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gn-results-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> wc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementsByTagName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;gn-results-list&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> btn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;changeSizeBtn&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  btn.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (wc.size </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>In your angular component, listen to these changes</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  private </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setSearch_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dispatch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SetSearch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ filters: { any: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.filter }, size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.size })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ngOnChanges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(changes: SimpleChanges): </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ngOnChanges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(changes)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setSearch_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre></div><p>This process must follow some rules:</p><ul><li>Don&#39;t call api request before the Web Component has initialized <code>API_BASE_PATH</code></li><li><code>ngOnChanges</code> is called the first time before <code>ngOnInit</code>, so put your init code in <code>ngOnchanges</code> instead.</li><li>Be sure to trigger the change detection when it is expected, because the Web Component execution (even though it&#39;s in an angular custom element) is outside an Angular zone, meaning the change detection is not triggered.</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    private changeDetector: ChangeDetectorRef</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ngOnInit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(): </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ngOnInit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // Be sure to update the source page when the state is updated</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.store.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pipe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(getSearchResultsLoading)).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">subscribe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">v</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.changeDetector.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">detectChanges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre></div><h2 id="html-embedder" tabindex="-1">HTML embedder <a class="header-anchor" href="#html-embedder" aria-label="Permalink to &quot;HTML embedder&quot;">​</a></h2><p>The file <a href="https://github.com/geonetwork/geonetwork-ui/blob/main/tools/webcomponent/wc-embedder.html" target="_blank" rel="noreferrer"><code>wc-embedder.html</code></a> can be used to wrap a geonetwork-ui Web Component into a full HTML page, for example to be used in an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe" target="_blank" rel="noreferrer">iframe</a>.</p><p>To use it, specify the name and attributes of the Web Component to be created when accessing the page:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wc-embedder.html?e=gn-dataset-view-table&amp;a=api-url=https://dev.geo2france.fr/geonetwork/srv/api&amp;a=primary-color=%230f4395&amp;a=secondary-color=%238bc832&amp;a=main-color=%23555&amp;a=background-color=%23fdfbff</span></span></code></pre></div><blockquote><p>Note the <code>#</code> being encoded to <code>%23</code></p></blockquote><p>The following query parameters are supported:</p><ul><li><code>e</code> (single): element name, such as <code>gn-results-list</code></li><li><code>a</code> (multiple): attributes, specified in the following format: <code>a=attribute-name=attribute-value</code></li></ul><p>The created element will be sized to take the full width and height of the page, thus allowing precise sizing when used in an iframe.</p><p>The Web Components used are the latest ones distributed on the <a href="https://github.com/geonetwork/geonetwork-ui/blob/wc-dist" target="_blank" rel="noreferrer"><code>wc-dist</code> branch</a>.</p><p>The HTML Embedder is available in all docker images on the following path:</p><p><a href="http://localhost:8080/APP_NAME/wc-embedder.html" target="_blank" rel="noreferrer">http://localhost:8080/APP_NAME/wc-embedder.html</a></p>`,51)]))}const g=i(n,[["render",l]]);export{c as __pageData,g as default};
