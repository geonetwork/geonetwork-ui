import{_ as e,c as i,o as s,a5 as a}from"./chunks/framework.Cz2oDBlC.js";const g=JSON.parse('{"title":"Configuration of a GeoNetwork-UI application","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/configure.md","filePath":"guide/configure.md"}'),t={name:"guide/configure.md"},n=a(`<h1 id="configuration-of-a-geonetwork-ui-application" tabindex="-1">Configuration of a GeoNetwork-UI application <a class="header-anchor" href="#configuration-of-a-geonetwork-ui-application" aria-label="Permalink to &quot;Configuration of a GeoNetwork-UI application&quot;">​</a></h1><p>Each application can rely on its own system for configuration. This page lists the main ones.</p><h2 id="toml-file" tabindex="-1">TOML file <a class="header-anchor" href="#toml-file" aria-label="Permalink to &quot;TOML file&quot;">​</a></h2><h3 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h3><p>Most applications such as the <a href="./../apps/datahub.html">Datahub</a> rely on a file called <code>default.toml</code> which is part of its available assets. <strong>This file is loaded and read before anything else is done</strong>, e.g. bootstrapping the application.</p><p>This file uses the <a href="https://toml.io/en/" target="_blank" rel="noreferrer">TOML format</a>, which is an easy-to-read format composed of sections, each of them containing key-value pairs. Comments are also present in the default file to help customizing it.</p><p>Some additional notes:</p><ul><li>Languages in the configuration are specified using <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank" rel="noreferrer">two-letters ISO 639-1 codes</a> unless noted otherwise</li><li>Tokens in URL templates are specified using the <code>\${token_name}</code> syntax</li></ul><h3 id="sections" tabindex="-1">Sections <a class="header-anchor" href="#sections" aria-label="Permalink to &quot;Sections&quot;">​</a></h3><h4 id="global" tabindex="-1"><code>[global]</code> <a class="header-anchor" href="#global" aria-label="Permalink to &quot;\`[global]\`&quot;">​</a></h4><ul><li><p><code>geonetwork4_api_url</code></p><p>This URL (relative or absolute) must point to the API endpoint of a GeoNetwork 4.x instance, such as &quot;/geonetwork/srv/api&quot;.</p></li><li><p><code>proxy_path</code> (optional)</p><p>This should point to a proxy to avoid CORS errors on some requests (data preview, OGC capabilities etc.). The actual URL will be appended after this path, e.g. : <a href="https://my.proxy/?url=http%3A%2F%2Fencoded.url%2Fservice" target="_blank" rel="noreferrer">https://my.proxy/?url=http%3A%2F%2Fencoded.url%2Fservice</a>.</p><p>This is an optional parameter: leave empty to disable proxy usage. See <a href="./run.html#proxy">this section of the run guide</a> for more information.</p></li><li><p><code>languages</code> (optional)</p><p>This optional parameter defines the languages that will be provided in the UI language switcher. Available languages are listed <a href="https://github.com/geonetwork/geonetwork-ui/blob/1533e02e24258814ef19f21e991a45e01fd06f36/libs/util/i18n/src/lib/i18n.constants.ts#L25" target="_blank" rel="noreferrer">in this file</a>.</p><p>Languages should be provided as an array, for instance:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">languages = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;en&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;fr&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;de&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p>More information about the translation can be found in the <a href="./../reference/i18n.html">relevant documentation</a></p></li><li><p><code>metadata_language</code> (optional)</p><p>This optional parameter lets you specify which language to use when searching in the catalog connected to GeoNetwork-UI. This might improve the search experience by showing results relevant to your users&#39; language.</p><p>Use <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank" rel="noreferrer">ISO three-letter codes</a> to indicate the language used in the search (e.g. &quot;fre&quot; or &quot;ger&quot;). Alternatively, setting to &quot;current&quot; will use the current language of the User Interface.</p><p>If not indicated, the search will be done across all localized values for each record, potentially showing more results that expected or unrelated results.</p></li><li><p><code>login_url</code> (optional)</p><p>This optional URL should point to the login page that allows authentication to the GeoNetwork-UI backend (e.g. GeoNetwork).</p><p>If not indicated, a default GeoNetwork login link is used.</p><p>The following three placeholders can be part of this URL:</p><ul><li><p><code>\${current_url}</code>: indicates where the current location should be injected in the constructed login URL</p></li><li><p><code>\${lang2}</code>, <code>\${lang3}</code>: indicates if and where the current language should be part of the login URL in 2- or 3-letters ISO format</p></li></ul><p>Example for a platform relying on CAS:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">login_url = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/cas/login?service=\${current_url}&quot;</span></span></code></pre></div></li><li><p><code>web_component_embedder_url</code> (optional)</p><p>This optional URL should point to the static html page <a href="https://github.com/geonetwork/geonetwork-ui/blob/1533e02e24258814ef19f21e991a45e01fd06f36/tools/webcomponent/wc-embedder.html" target="_blank" rel="noreferrer"><code>wc-embedder.html</code></a> which allows displaying any GeoNetwork-UI web component (e.g. chart or table) via a permalink.</p><p>URLs can be indicated from the root of the same server starting with a &quot;/&quot; or as an external URL. Be conscious of potential CORS issues when using an external URL.</p><p>The default location in the dockerized Datahub app is for example &quot;/datahub/wc-embedder.html&quot;.</p><p>If the URL is not indicated, no permalinks will show up in the UI.</p></li><li><p><code>contact_email</code> (optional)</p><p>Enables displaying a &quot;contact block&quot; wherever relevant in applications.</p></li><li><p><code>datahub_url</code> (optional)</p><p>(WIP)</p></li></ul><h4 id="theme" tabindex="-1"><code>[theme]</code> <a class="header-anchor" href="#theme" aria-label="Permalink to &quot;\`[theme]\`&quot;">​</a></h4><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>All parameters in this section are expressed using CSS formats; references:</p><ul><li>for color: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/color</a></li><li>for font families: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-family" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/font-family</a></li><li>for background: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS/background</a></li></ul></div><ul><li><p><code>primary_color</code>, <code>secondary_color</code>, <code>main_color</code> and <code>background_color</code></p><p>These colors constitute the building blocks of the visual theme of an application. Color scales will be derived from them automatically to offer relevant contrasts and engaging visuals.</p><p>Note that <code>main_color</code> is the all-purpose text color, usually very close to black. <code>background_color</code> is the general page background, usually very cloe to white.</p></li><li><p><code>header_background</code> and <code>header_foreground_color</code> (optional)</p><p>These optional parameters indicate which background should be used for the main header and the text color used on top of the background. The color should be chosen to contrast well with the background (defaults to white).</p></li><li><p><code>thumbnail_placeholder</code> (optional)</p><p>This optional parameter allows overriding the fallback image that should be used for thumbnails in case the metadata record has no thumbnail image URL or it fails to load.</p></li><li><p><code>main_font</code> and <code>title_font</code> (optional)</p><p>These optional parameters allow changing fonts used in the app.</p></li><li><p><code>fonts_stylesheet_url</code> (optional)</p><p>If using custom fonts, specify a URL pointing to a stylesheet defining these fonts. Default fonts are available locally in the application assets. Fonts can also be loaded from third-party services, for instance:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fonts_stylesheet_url = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&amp;family=Permanent+Marker&amp;display=swap&quot;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">Potential GDPR implications</p><p>Using fonts coming from third-party services (e.g. Google Fonts) might require asking for explicit user consent as the user&#39;s IP address might be shared with said service</p></div></li></ul><ul><li><p><code>favicon</code> (optional)</p><p>Use this setting to set a custom URL for the favicon; by default, &quot;/favicon.ico&quot; will be used.</p></li></ul><h4 id="search" tabindex="-1"><code>[search]</code> <a class="header-anchor" href="#search" aria-label="Permalink to &quot;\`[search]\`&quot;">​</a></h4><ul><li><code>filter_geometry_url</code> or <code>filter_geometry_data</code> (optional)</li></ul><p>Specify a GeoJSON object to be used as filter: all records contained inside the geometry will be <strong>boosted on top</strong>, all records which do not intersect with the geometry will be <strong>shown with lower priority</strong>.</p><p>The GeoJSON geometry can be specified either as URL or inline data.</p><p>Note: if the GeoJSON object contains multiple features, only the geometry of the first one will be kept!</p><ul><li><code>advanced_filters</code> (optional)</li></ul><p>The advanced search filters available to the user can be customized with this setting. For a list of supported search fields, see <a href="./../reference/search-fields.html">this documentation page</a>. Any unknown field will be ignored.</p><p>The filters should be provided as an array, for instance:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">advanced_filters = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;organization&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;inspireKeyword&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;keyword&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;topic&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><ul><li><p><code>[[search_preset]]</code> (multiple, optional)</p><p>Search presets are shown in a prominent way to the user and can be used to showcase certain records in the catalog or offer shortcuts to frequent search criteria.</p><p>Every search preset is composed of:</p><ul><li>a name for the preset, which can be a translation key (mandatory)</li><li>a sort criteria: either <code>createDate</code>, <code>userSavedCount</code> or <code>_score</code> (prepend with <code>-</code> for descending sort) (optional)</li><li>a set of filters, each of them being a key-value pair where the key is a <a href="./../reference/search-fields.html">known search field</a> and the value is an array of strings (optional)</li><li>additionally, <code>filters.q</code> can be used to specify a full text search query</li></ul><p>Multiple search presets can be defined like so:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">search_preset</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;filterByName&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.q = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;full text search&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.organization = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Org 1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Org 2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.format = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;format 1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;format 2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.documentStandard = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;iso19115-3.2018&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.inspireKeyword = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;keyword 1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;keyword 2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.topic = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;boundaries&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.publicationYear = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2023&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2022&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.isSpatial = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;yes&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.license = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;unknown&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sort = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;createDate&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">search_preset</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;otherFilter&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">filters.q = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;full text search&#39;</span></span></code></pre></div></li></ul><h4 id="metadata-quality" tabindex="-1"><code>[metadata-quality]</code> <a class="header-anchor" href="#metadata-quality" aria-label="Permalink to &quot;\`[metadata-quality]\`&quot;">​</a></h4><p>This section contains settings related to the Metadata Quality system.</p><div class="info custom-block"><p class="custom-block-title">How to enable the Metadata Quality system</p><p>To show Metadata Quality scores on records and allow sorting, enabling the setting below is not enough. An ElasticSearch pipeline also has to be registered; please refer to <a href="./../guide/deploy.html#enabling-improved-search-fields">this section</a> for more information.</p></div><ul><li><p><code>enabled</code> (optional)</p><p>By default, the widget is not activated; to enable it, just set this parameter to &quot;true&quot;.</p></li></ul><h4 id="map" tabindex="-1"><code>[map]</code> <a class="header-anchor" href="#map" aria-label="Permalink to &quot;\`[map]\`&quot;">​</a></h4><p>The map section lets you customize how maps appear and behave across GeoNetwork-UI applications.</p><ul><li><p><code>max_zoom</code> (optional)</p><p>Will limit the possibility to zoom in past a certain zoom level.</p></li><li><p><code>max_extent</code> (optional)</p><p>Will limit the possibility to pan or zoom outside of an extent. Expressed as an array of <em>minX</em>, <em>minY</em>, <em>maxX</em> and <em>maxY</em> numerical components in the map view projection (EPSG:3857 by default), e.g.:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">max_extent = [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-418263.418776</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5251529.591305</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">961272.067714</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6706890.609855</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div></li><li><p><code>do_not_tile_wms</code> (optional)</p><p>Will not use tiling when requesting WMS services. Defaults to <code>false</code> (WMS are tiled). Not using tiles for WMS might incur performance loss since the client will not benefit from an eventual tile cache anymore. On the other hand, visual quality might improve in case a map tile server does not handle neighbouring tiles correctly, e.g. symbols or text being cropped at tile boundaries. This can be set true to prevent visual conflicts on tile borders, if the WMS server does not add a gutter, for example. gn-ui does not add a gutter on the client side, in order to allow server-side caching.</p></li><li><p><code>do_not_use_default_basemap</code> (optional)</p><p>If set to <code>true</code>, the default basemap will not be added to the map. Defaults to <code>false</code> (base map is shown). Use <code>[[map_layer]]</code> sections to define your own custom layers (see below)</p></li><li><p><code>[[map_layer]]</code> (multiple, optional)</p><p>One or several layers (as background or overlay) can be added to the map with the following properties:</p><ul><li><code>type</code> (mandatory): Indicates the layer type. Possible values are &quot;xyz&quot;, &quot;wms&quot;, &quot;wfs&quot;, &quot;geojson&quot;.</li><li><code>url</code> (mandatory for &quot;xyz&quot;, &quot;wms&quot; and &quot;wfs&quot; types): Layer endpoint URL.</li><li><code>name</code> (mandatory for &quot;wms&quot; and &quot;wfs&quot; types): indicates the layer name or feature type.</li><li><code>data</code> (for &quot;geojson&quot; type only): inline GeoJSON data as string.</li><li><code>styleUrl</code> (mandatory for &quot;maplibre-style&quot; type only): Maplibre style URL.</li><li><code>accessToken</code> (optional for &quot;maplibre-style&quot; type only): credential to access the basemap styles service</li></ul><p>Layer order in the config is the same as in the map, the foreground layer being the last defined one.</p><p>Each layer is defined in its own <code>[[map_layer]]</code> section. For instance:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map_layer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xyz&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">url = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map_layer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wfs&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">url = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://www.geo2france.fr/geoserver/cr_hdf/ows&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;masque_hdf_ign_carto_latin1&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map_layer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;geojson&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;type&quot;: &quot;FeatureCollection&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;features&quot;: [{&quot;type&quot;: &quot;Feature&quot;, &quot;geometry&quot;: {&quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [125.6, 10.1]}}]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map_layer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;maplibre-style&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">styleUrl = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">accessToken = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;token_if_needed&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # optional</span></span></code></pre></div></li><li><p><code>external_viewer_url_template</code> (optional)</p><p>URL template allowing opening map layers in an external viewer; if set, applications such as the Datahub will offer a button next to the map viewer tp open the currently-viewed layers in an external viewer.</p><p>The template must include the following placeholders, which allow applications to inject the correct values when generating the final URL:</p><ul><li><code>\${service_url}</code>: URL of the data file or web service providing the layer</li><li><code>\${service_type}</code>: Type of layer; currently supported types are WMS, WFS, GEOJSON</li><li><code>\${layer_name}</code>: Name of the layer</li></ul><p>Example for an integration with MapStore viewer:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">external_viewer_url_template = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://my.sdi.org/mapstore/#/?actions=[{&quot;type&quot;:&quot;CATALOG:ADD_LAYERS_FROM_CATALOGS&quot;,&quot;layers&quot;:[&quot;\${layer_name}&quot;],&quot;sources&quot;:[{&quot;url&quot;:&quot;\${service_url}&quot;,&quot;type&quot;:&quot;\${service_type}&quot;}]}]&#39;</span></span></code></pre></div></li><li><p><code>external_viewer_open_new_tab</code> (optional)</p><p>If set to &quot;true&quot;, the external viewer will open in a new tab when adding layers to it; if set to &quot;false&quot; (default), the external viewer will open in the same tab. Requires <code>external_viewer_url_template</code> to have any effect.</p></li></ul><h4 id="translations-xy" tabindex="-1"><code>[translations.xy]</code> <a class="header-anchor" href="#translations-xy" aria-label="Permalink to &quot;\`[translations.xy]\`&quot;">​</a></h4><p>To override translations in a specific language, use a &quot;translations.xy&quot; section where &quot;xy&quot; is a two-letter language code.</p><p>Example:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">translations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">en</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">results.sortBy.dateStamp = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Last time someone changed something&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">translations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">results.sortBy.dateStamp = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Dernière fois que quelqu&#39;un a modifié quelque chose&quot;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">Using HTML in translations</p><p>Translation keys ending with &quot;.html&quot; <em>can</em> contain HTML markup, including inline CSS:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">translations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">en</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">catalog.welcome.html = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Welcome to &lt;span class=&quot;text-primary&quot;&gt;Organization&lt;/span&gt;&#39;s&lt;br&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">wonderful &lt;span style=&quot;font-size: 1.2em;&quot;&gt;data catalogue&lt;/span&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span></code></pre></div></div><h3 id="backwards-compatibility" tabindex="-1">Backwards compatibility <a class="header-anchor" href="#backwards-compatibility" aria-label="Permalink to &quot;Backwards compatibility&quot;">​</a></h3><p>A <code>default.toml</code> file authored for a previous release of GeoNetwork-UI <em>should</em> always work when using a more recent version. There are two caveats:</p><ul><li>if upgrading to a higher major version (e.g. from 1.2.0 to 2.0.0), some breaking changes might occur; these changes and how to migrate the file will be documented in the release notes</li><li>if some settings of the file become obsolete, a warning will be printed in the browser console when loading the app; this <em>should not</em> break functionalities, but fixing those warnings by the administrator is recommended</li></ul><p>As for translation keys, these are subject to change outside of major version bumps, so any overridden translation key in the configuration file might become obsolete between versions. Please refer to the release notes to get a list of obsolete translation keys and their replacements.</p>`,41),o=[n];function l(r,p,h,d,c,k){return s(),i("div",null,o)}const E=e(t,[["render",l]]);export{g as __pageData,E as default};
