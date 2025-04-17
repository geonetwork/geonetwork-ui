import{_ as a,c as s,a3 as t,o as i}from"./chunks/framework.D81kdCmo.js";const k=JSON.parse('{"title":"State management","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"developers/state-management.md","filePath":"developers/state-management.md"}'),n={name:"developers/state-management.md"};function r(h,e,l,o,p,c){return i(),s("div",null,e[0]||(e[0]=[t(`<h1 id="state-management" tabindex="-1">State management <a class="header-anchor" href="#state-management" aria-label="Permalink to &quot;State management&quot;">​</a></h1><p><code>geonetwork-ui</code> relies on a <strong>state</strong> to maintain a single source of truth among the different libraries and applications of the workspace.</p><p>It&#39;s based on <a href="https://ngrx.io/" target="_blank" rel="noreferrer">NgRx</a>, which takes advantage of <a href="https://rxjs.dev/" target="_blank" rel="noreferrer">RxJs</a> to handle state reactivity.</p><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The state is a <strong>tree</strong>, it&#39;s a combination of several feature branches.</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- search</span></span>
<span class="line"><span>- map</span></span>
<span class="line"><span>- mdview</span></span>
<span class="line"><span>- router</span></span></code></pre></div><p>A <strong>feature state</strong> stores different properties related to the feature.</p><p>Each feature state has a <strong>key</strong> (the name of the branch in the tree), and a <strong>type</strong>, containing different properties of the feature state.</p><p>Eg. <code>SearchState</code>:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+ map</span></span>
<span class="line"><span>+ search</span></span>
<span class="line"><span>  - configuration</span></span>
<span class="line"><span>  - parameters</span></span>
<span class="line"><span>    - aggregations</span></span>
<span class="line"><span>    - filters</span></span>
<span class="line"><span>    - pagination</span></span>
<span class="line"><span>  - results</span></span>
<span class="line"><span>  - error</span></span></code></pre></div><h2 id="ngrx-architecture" tabindex="-1">NgRx architecture <a class="header-anchor" href="#ngrx-architecture" aria-label="Permalink to &quot;NgRx architecture&quot;">​</a></h2><p>The state is a tree with one level of branches. For an application to run with a state, it must have a root state declaration. Then, each feature state which is declared in any module loaded by the application plugs its branch to the root state.</p><h3 id="root-state" tabindex="-1">Root state <a class="header-anchor" href="#root-state" aria-label="Permalink to &quot;Root state&quot;">​</a></h3><p>The root state is declared at the application root module level:</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NgModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  imports: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    StoreModule.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    !</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">environment.production </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StoreDevtoolsModule.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">instrument</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    EffectsModule.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p><code>StoreDevtoolsModule.instrument()</code> enables the <a href="https://github.com/reduxjs/redux-devtools" target="_blank" rel="noreferrer">Redux dev tools</a> on development mode.</p><h3 id="feature-state" tabindex="-1">Feature state <a class="header-anchor" href="#feature-state" aria-label="Permalink to &quot;Feature state&quot;">​</a></h3><p>The feature branches can be declared in any module, application or library ones.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NgModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  imports: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    StoreModule.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forFeature</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SEARCH_FEATURE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, reducer, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      initialState,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    EffectsModule.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forFeature</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([SearchEffects])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p><code>SEARCH_FEATURE_KEY</code> contains the name of this feature branch: <code>search</code>.</p><blockquote><p>Notes:</p><ul><li>There can be only one root state for the whole application.</li><li>There must be a root state if some modules declare a feature state.</li></ul></blockquote><h2 id="ngrx-fundamentals" tabindex="-1">NgRx fundamentals <a class="header-anchor" href="#ngrx-fundamentals" aria-label="Permalink to &quot;NgRx fundamentals&quot;">​</a></h2><p>For more information, please refer to the <a href="https://ngrx.io/guide/store" target="_blank" rel="noreferrer">official documentation</a>.</p><h3 id="trigger-a-state-change" tabindex="-1">Trigger a state change <a class="header-anchor" href="#trigger-a-state-change" aria-label="Permalink to &quot;Trigger a state change&quot;">​</a></h3><p>You can update the state only through <strong>Actions</strong>, which are a combination of</p><ul><li>a <code>type</code>, it&#39;s a string with the following pattern <code>&quot;[state_name] action_description&quot;</code> (e.g. <code>[Search] Set filters&#39;</code>)</li><li>a <code>payload</code>, could be any input to change the state (eg: filters)</li></ul><h3 id="listen-to-state-changes" tabindex="-1">Listen to state changes <a class="header-anchor" href="#listen-to-state-changes" aria-label="Permalink to &quot;Listen to state changes&quot;">​</a></h3><p>You can listen to state changes through <strong>Selectors</strong>, which are RxJs <code>Observables</code>. You can create your own selectors to listen to specific changes within the state.</p><h3 id="side-effects" tabindex="-1">Side effects <a class="header-anchor" href="#side-effects" aria-label="Permalink to &quot;Side effects&quot;">​</a></h3><p>To handle state change side effects, for instance for asynchronous actions, you can use <strong>Effects</strong>.</p><p>An effect is a subscription to an Observable (mostly to other actions) which often dispatches other actions. (e.g. <code>Load</code> action can dispatch <code>LoadSuccess</code> or <code>LoadFailure</code> action through effects).</p><h3 id="facades" tabindex="-1">Facades <a class="header-anchor" href="#facades" aria-label="Permalink to &quot;Facades&quot;">​</a></h3><p>A Facade is an Angular service which exposes the state interactions (read/write) to the rest of the application.</p><blockquote><p>The NgRx <code>Store</code> object should not be injected in the rest of the application, the application should only access to the state through the facade.</p></blockquote><h2 id="guidelines" tabindex="-1">Guidelines <a class="header-anchor" href="#guidelines" aria-label="Permalink to &quot;Guidelines&quot;">​</a></h2><h3 id="files" tabindex="-1">Files <a class="header-anchor" href="#files" aria-label="Permalink to &quot;Files&quot;">​</a></h3><p>For an application or a feature, the state should be encapsulated in a <code>state</code> folder which will contain all the files needed to bootstrap a state branch:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+ state</span></span>
<span class="line"><span>  - search.action.ts</span></span>
<span class="line"><span>  - search.effects.ts</span></span>
<span class="line"><span>  - search.facade.ts</span></span>
<span class="line"><span>  - search.reducer.ts</span></span>
<span class="line"><span>  - search.selector.ts</span></span></code></pre></div><p>The state types are defined in the reducer file, along with the initial state object.</p><h3 id="structure" tabindex="-1">Structure <a class="header-anchor" href="#structure" aria-label="Permalink to &quot;Structure&quot;">​</a></h3><ul><li><p>The state should be as <strong>flat</strong> as possible. In order to keep reducers simple, you must avoid having nesting within the state structure.</p><blockquote><p>Instead of having a tree for a nested structure of nodes, just store your nodes in a flat array, and refer them to other node ids.</p></blockquote></li><li><p>Don&#39;t store computed value, avoid duplicate. Those values can be computed on the fly from a <code>selector</code></p></li></ul><h3 id="reducers" tabindex="-1">Reducers <a class="header-anchor" href="#reducers" aria-label="Permalink to &quot;Reducers&quot;">​</a></h3><ul><li>Reducers must be pure functions.</li><li>Reducers must return a new state object (the state is immutable)</li></ul><h2 id="search-state" tabindex="-1">Search state <a class="header-anchor" href="#search-state" aria-label="Permalink to &quot;Search state&quot;">​</a></h2><p>The search state is a core component of <code>geonetwork-ui</code>, as it handles the interaction with GeoNetwork Search API (which forwards the request to Elasticsearch). Many components/applications of <code>geonetwork-ui</code> rely on the search state, which is declared in the <code>FeatureSearchModule</code> module.</p><p>The search state is responsible for storing:</p><ul><li>any search parameters <ul><li>aggregations</li><li>filters</li><li>pagination</li></ul></li><li>search results</li><li>search configuration</li></ul><p>The actions &amp; effects are responsible for triggering a search request to the backend.</p><h3 id="multiple-search-states" tabindex="-1">Multiple search states <a class="header-anchor" href="#multiple-search-states" aria-label="Permalink to &quot;Multiple search states&quot;">​</a></h3><p>As you could have several searches within the application, search state is not a singleton, there is no unique service to handle the search state.</p><p>You have to initiate one state per search you want to have (e.g. feeds, search, etc...)</p><h3 id="search-containers" tabindex="-1">Search containers <a class="header-anchor" href="#search-containers" aria-label="Permalink to &quot;Search containers&quot;">​</a></h3><p>A container is defined by a directive which encapsulate all DOM structure underneath the directive to a specific state behavior. The container uses an abstraction called <code>SearchService</code> which infers search execution.</p><p>The <code>SearchService</code> is an <strong>abstraction</strong> over the <code>SearchFacade</code>.</p><ul><li><code>SearchStateContainerDirective</code> is the classic search container. All search changes will directly call the <code>SearchFacade</code> to set the correct filters &amp; parameters within the search state, to trigger a search request.</li><li><code>SearchRouterContainerDirective</code> adds an indirection via the router state. All search changes, like filter changes, are mapped to the router state, then the router state is synchronized with the search state. <blockquote><p>You can have only one router container in the application.</p></blockquote></li></ul><p><strong>Important</strong>: You can only inject the <code>SearchService</code> and/or the <code>SearchFacade</code> from a child component of the component which declares the container directive in its template.</p><h3 id="create-a-search-state" tabindex="-1">Create a search state <a class="header-anchor" href="#create-a-search-state" aria-label="Permalink to &quot;Create a search state&quot;">​</a></h3><p>To create a search state, the best way is to use a search container directive. You can either use <code>SearchStateContainerDirective</code> or <code>SearchRouterContainerDirective</code>.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;relative&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gnUiSearchStateContainer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;newsfeed&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;...&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><code>SearchStateContainerDirective</code> is used for a classic search state. Adding such a directive in your code automatically</p><ul><li>initializes a search state with the id <code>newsfeed</code>.</li><li>instantiates a new <code>SearchFacade</code> object for the <code>newsfeed</code> state.</li><li>injects the dedicated <code>SearchService</code>, corresponding to the container type.</li><li>encapsulates all DOM tree underneath the directive scope. It means that every component within the container DOM, which inject the <code>SearchService</code> will get the implementation provided by the container directive.</li></ul><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><ul><li>Search init</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.searchFacade</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setConfigRequestFields</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    includes: [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ES_SOURCE_BRIEF</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;createDate&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;changeDate&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setPagination</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setSortBy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;-createDate&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setResultsLayout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;FEED&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><ul><li>Subscribing to search results</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.searchFacade.results$.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">subscribe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">results</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // do my stuff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="router-state" tabindex="-1">Router state <a class="header-anchor" href="#router-state" aria-label="Permalink to &quot;Router state&quot;">​</a></h2><p>Angular routing can be associated to a state manager. It&#39;s the way used to persist search filters in the URL to provide a permalink for search results.</p><p>Please refer to the <a href="./routing.html">Routing</a> section to know more about the search router abilities.</p>`,69)]))}const u=a(n,[["render",r]]);export{k as __pageData,u as default};
