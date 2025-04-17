import{_ as i,c as a,a3 as e,o as t}from"./chunks/framework.BU4YErrW.js";const c=JSON.parse('{"title":"Creating a Custom application based on GeoNetwork-UI","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/custom-app.md","filePath":"guide/custom-app.md"}'),n={name:"guide/custom-app.md"};function l(p,s,h,o,r,k){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="creating-a-custom-application-based-on-geonetwork-ui" tabindex="-1">Creating a Custom application based on GeoNetwork-UI <a class="header-anchor" href="#creating-a-custom-application-based-on-geonetwork-ui" aria-label="Permalink to &quot;Creating a Custom application based on GeoNetwork-UI&quot;">​</a></h1><p>An important principle when looking to use GeoNetwork-UI is: <strong>do not fork it!</strong></p><p>Forking is tempting because it allows customizing things right away and easily, but it has many drawbacks: difficulties for keeping the forked repository in sync, fewer contributions being brought upstream, breaking changes and compatibility issues.</p><p>If you want to create your own application using GeoNetwork-UI functionalities, you should <strong>create a Custom Application</strong> as described in this guide.</p><h3 id="creating-a-custom-application" tabindex="-1">Creating a Custom Application <a class="header-anchor" href="#creating-a-custom-application" aria-label="Permalink to &quot;Creating a Custom Application&quot;">​</a></h3><p>In order to discourage forking, GeoNetwork-UI is made to be publishable as an <a href="https://www.npmjs.com/package/geonetwork-ui" target="_blank" rel="noreferrer">NPM package</a>. This means that <strong>a Custom Application should be a separate project in a separate repository</strong>, and that it should simply list GeoNetwork-UI as a regular dependency. No forking, no git submodules, just NPM.</p><p>This also means that whenever new functionalities from GeoNetwork-UI are needed the version of the dependency can be bumped accordingly.</p><h2 id="what-does-the-npm-package-for-geonetwork-ui-contain" tabindex="-1">What does the NPM package for GeoNetwork-UI contain? <a class="header-anchor" href="#what-does-the-npm-package-for-geonetwork-ui-contain" aria-label="Permalink to &quot;What does the NPM package for GeoNetwork-UI contain?&quot;">​</a></h2><p>The <a href="https://www.npmjs.com/package/geonetwork-ui" target="_blank" rel="noreferrer"><code>geonetwork-ui</code> NPM package</a> contains:</p><ul><li>all the libraries in the <code>libs</code> folder</li><li>all translations</li><li>various configuration files (explained later)</li></ul><p>The package <em>does not</em> contain:</p><ul><li>applications (Datahub, etc.)</li><li>unit and E2E tests</li><li>docker composition</li><li>documentation</li><li>anything related to <a href="https://nx.dev/" target="_blank" rel="noreferrer">NX</a></li></ul><h2 id="what-is-the-npm-package-compatible-with" tabindex="-1">What is the NPM package compatible with? <a class="header-anchor" href="#what-is-the-npm-package-compatible-with" aria-label="Permalink to &quot;What is the NPM package compatible with?&quot;">​</a></h2><p>The NPM package is compiled as a single Angular Library with the so-called <a href="https://angular.io/guide/angular-compiler-options#compilationmode" target="_blank" rel="noreferrer">partial-Ivy mode</a>, which means that it is theoretically compatible with a wide range of Angular versions.</p><p>The <a href="https://github.com/geonetwork/geonetwork-ui/tree/main/package/package.json" target="_blank" rel="noreferrer">package.json</a> file of the NPM package lists Angular libraries as peer dependencies, along with a range of versions that indicate what can be expected in terms of compatibility with Angular.</p><p>Please note that <strong>the GeoNetwork-UI package only requires a basic Angular application to run!</strong></p><h2 id="how-to-set-up-a-custom-application" tabindex="-1">How to set up a Custom Application <a class="header-anchor" href="#how-to-set-up-a-custom-application" aria-label="Permalink to &quot;How to set up a Custom Application&quot;">​</a></h2><p>Setting up a Custom Application requires precisely following several steps.</p><h3 id="step-1-create-an-application-with-angular" tabindex="-1">Step 1: Create an application with Angular <a class="header-anchor" href="#step-1-create-an-application-with-angular" aria-label="Permalink to &quot;Step 1: Create an application with Angular&quot;">​</a></h3><p>This can be done in several ways, see for instance <a href="https://angular.io/guide/setup-local" target="_blank" rel="noreferrer">Angular Setup Guide</a>.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>GeoNetwork-UI as an NPM package is <strong>not compatible with Server-Side Rendering!</strong> use the <code>--ssr false</code> flag</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If using Angular 17+, make sure to create a <strong>non-standalone app</strong> using the <code>--no-standalone</code> flag</p></div><h3 id="step-2-adjust-the-typescript-configuration" tabindex="-1">Step 2: Adjust the Typescript configuration <a class="header-anchor" href="#step-2-adjust-the-typescript-configuration" aria-label="Permalink to &quot;Step 2: Adjust the Typescript configuration&quot;">​</a></h3><p>Add the following settings to the <code>tsconfig.json</code> file at the root of your project:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;strict&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;noImplicitOverride&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;noPropertyAccessFromIndexSignature&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;lib&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // ...</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;dom.iterable&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skipDefaultLibCheck&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skipLibCheck&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;emitDecoratorMetadata&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;allowJs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;allowSyntheticDefaultImports&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;resolveJsonModule&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;angularCompilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;strictTemplates&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>This is necessary mostly because GeoNetwork-UI will not compile under Typescript strict mode.</p><h3 id="step-3-adjust-the-angular-configuration" tabindex="-1">Step 3: Adjust the Angular configuration <a class="header-anchor" href="#step-3-adjust-the-angular-configuration" aria-label="Permalink to &quot;Step 3: Adjust the Angular configuration&quot;">​</a></h3><p>Some dependencies of GeoNetwork-UI will trigger a warning by the Angular compiler. To suppress these warnings, add the following settings to the <code>angular.json</code> file at the root of your project:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;architect&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // ...</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;configurations&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;production&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // ..</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;development&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // ..</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;preserveSymlinks&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;allowedCommonJsDependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;duration-relativetimeformat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;papaparse&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;xlsx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;chroma-js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;@rgrove/parse-xml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;@messageformat/core&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;rbush&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;pbf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;alasql&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // add dependencies here if other warnings show up and you want to hide them</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;defaultConfiguration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;production&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre></div><p>The <code>preserveSymlinks</code> setting is also important if you&#39;re working in dev mode and use a symbolic link to point to a dev build of GeoNetwork-UI.</p><h3 id="step-4-install-tailwind" tabindex="-1">Step 4: Install Tailwind <a class="header-anchor" href="#step-4-install-tailwind" aria-label="Permalink to &quot;Step 4: Install Tailwind&quot;">​</a></h3><p><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a> is used for styling across the whole of GeoNetwork-UI, and is a mandatory dependency.</p><p>To install and initialize it:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tailwindcss</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postcss</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> autoprefixer</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tailwindcss</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span></code></pre></div><p>Note that this is taken from the Tailwind CSS setup guide.</p><p>Then, adjust the <code>tailwind.config.js</code> file like so:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> baseConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;geonetwork-ui/tailwind.base.config.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {import(&#39;tailwindcss&#39;).Config}</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">baseConfig,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  content: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./node_modules/geonetwork-ui/**/*.mjs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/**/*.{html,ts}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Here we are inheriting from the GeoNetwork-UI base Tailwind config, which provides many essential things like theme colors etc.</p><h3 id="step-5-install-other-mandatory-dependencies" tabindex="-1">Step 5: Install other mandatory dependencies <a class="header-anchor" href="#step-5-install-other-mandatory-dependencies" aria-label="Permalink to &quot;Step 5: Install other mandatory dependencies&quot;">​</a></h3><p><a href="https://material.angular.io/" target="_blank" rel="noreferrer">Angular Material</a> and <a href="https://github.com/ngx-translate/core" target="_blank" rel="noreferrer">ngx-translate</a> are other dependencies essential for many GeoNetwork-UI components. To install them:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --save</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @angular/material</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @angular/material-moment-adapter</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @angular/cdk</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngrx/component</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngrx/effects</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngrx/router-store</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngrx/store</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngrx/store-devtools</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngrx/operators</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngx-translate/core</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  @ngx-translate/http-loader</span></span></code></pre></div><h3 id="step-6-install-the-geonetwork-ui-package" tabindex="-1">Step 6: Install the <code>geonetwork-ui</code> package <a class="header-anchor" href="#step-6-install-the-geonetwork-ui-package" aria-label="Permalink to &quot;Step 6: Install the \`geonetwork-ui\` package&quot;">​</a></h3><p>Run:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --save</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> geonetwork-ui</span></span></code></pre></div><h3 id="step-7-include-the-required-fonts" tabindex="-1">Step 7: Include the required fonts <a class="header-anchor" href="#step-7-include-the-required-fonts" aria-label="Permalink to &quot;Step 7: Include the required fonts&quot;">​</a></h3><p>The root <code>index.html</code> file of your application should include the Material Symbols font for icons. Add these lines to itS <code>&lt;head&gt;</code> section:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- ... --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;preconnect&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://fonts.googleapis.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;preconnect&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://fonts.gstatic.com&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> crossorigin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="step-8-include-the-geonetwork-ui-stylesheet" tabindex="-1">Step 8: Include the GeoNetwork-UI stylesheet <a class="header-anchor" href="#step-8-include-the-geonetwork-ui-stylesheet" aria-label="Permalink to &quot;Step 8: Include the GeoNetwork-UI stylesheet&quot;">​</a></h3><p>GeoNetwork-UI comes with its own stylesheet, which you should include at the top of your application <code>style.css</code> file like so:</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;geonetwork-ui/style.css&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h3 id="step-9-initialize-the-color-theme" tabindex="-1">Step 9: Initialize the color theme <a class="header-anchor" href="#step-9-initialize-the-color-theme" aria-label="Permalink to &quot;Step 9: Initialize the color theme&quot;">​</a></h3><p>GeoNetwork-UI lets users define their own theme based on primary and secondary colors for instance. By default, no theme is specified so UI components might not render properly. To define a theme, call the following function on the application module constructor:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AppModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // change colors as you see fit!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ThemeService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">applyCssVariables</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#e73f51&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#c2e9dc&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#212029&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#fdfbff&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="that-s-it-🎉" tabindex="-1">That&#39;s it! 🎉 <a class="header-anchor" href="#that-s-it-🎉" aria-label="Permalink to &quot;That&#39;s it! 🎉&quot;">​</a></h3><p>Congratulations, you should be able to use components and services from GeoNetwork-UI now. Try adding <code>&lt;gn-ui-button&gt;</code> to your HTML template, and your IDE should offer you to import the required dependencies in your application module.</p><p>In case things do not work out properly, please be so kind as to <a href="https://github.com/geonetwork/geonetwork-ui/issues/new" target="_blank" rel="noreferrer">open an issue on GitHub</a> so the project team can work on improving this workflow. Thank you!</p><p>As an illustration, a working Custom Application can be found in this repository: <a href="https://github.com/jahow/geonetwork-ui-custom-app" target="_blank" rel="noreferrer">https://github.com/jahow/geonetwork-ui-custom-app</a> Note that this is not guaranteed to be maintained in the long run.</p><h2 id="using-the-npm-package-in-development-mode" tabindex="-1">Using the NPM package in development mode <a class="header-anchor" href="#using-the-npm-package-in-development-mode" aria-label="Permalink to &quot;Using the NPM package in development mode&quot;">​</a></h2><p>When developing in parallel on GeoNetwork-UI and a Custom Application, the following guidelines should be followed:</p><ul><li>A tool such as <a href="https://github.com/wclr/yalc" target="_blank" rel="noreferrer">yalc</a> is recommended to make a link between the Custom Application and GeoNetwork-UI <ul><li><a href="https://docs.npmjs.com/cli/v9/commands/npm-link" target="_blank" rel="noreferrer"><code>npm link</code></a> or <code>npm install &lt;path/to/package/dist&gt;</code> can also be used, but it will require including the <a href="https://docs.npmjs.com/cli/v8/commands/npm-install#install-links" target="_blank" rel="noreferrer"><code>--install-links</code> flag for <code>npm install</code></a>, otherwise <em>transitive dependencies will not be installed!</em></li></ul></li><li>Having live reload on changes made in a dependency (such as GeoNetwork-UI) is really hard to achieve with Angular; usually, changes in GeoNetwork-UI will only be reflected after a browser refresh</li><li>To make sure that changes in GeoNetwork-UI are correctly reflected, it might be necessary to disable the Angular cache in <code>.angular</code> altogether; see <a href="https://angular.io/cli/cache" target="_blank" rel="noreferrer">https://angular.io/cli/cache</a> for how to do this</li></ul>`,60)]))}const g=i(n,[["render",l]]);export{c as __pageData,g as default};
