(()=>{"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdD=function(){throw new Error("define cannot be used indirect")},__webpack_require__.amdO={},deferred=[],__webpack_require__.O=(result,chunkIds,fn,priority)=>{if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){for(var[chunkIds,fn,priority]=deferred[i],fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((key=>__webpack_require__.O[key](chunkIds[j])))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?obj=>Object.getPrototypeOf(obj):obj=>obj.__proto__,__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((key=>def[key]=()=>value[key]));return def.default=()=>value,__webpack_require__.d(ns,def),ns},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=chunkId=>Promise.all(Object.keys(__webpack_require__.f).reduce(((promises,key)=>(__webpack_require__.f[key](chunkId,promises),promises)),[])),__webpack_require__.u=chunkId=>(({362:"ui-search-src-lib-facets-facet-list-facet-list-component-stories",387:"ui-search-src-lib-record-preview-feed-record-preview-feed-component-stories",396:"ui-inputs-src-lib-badge-badge-component-stories",496:"ui-elements-src-lib-internal-link-card-internal-link-card-component-stories",578:"ui-inputs-src-lib-text-input-text-input-component-stories",770:"ui-dataviz-src-lib-figure-figure-component-stories",791:"feature-editor-src-lib-components-constraint-card-constraint-card-component-stories",817:"ui-layout-src-lib-interactive-table-interactive-table-component-stories",858:"ui-catalog-src-lib-organisation-preview-organisation-preview-component-stories",931:"ui-search-src-lib-record-preview-title-record-preview-title-component-stories",1052:"ui-elements-src-lib-content-ghost-content-ghost-component-stories",1346:"ui-inputs-src-lib-links-stories",1404:"ui-elements-src-lib-api-card-api-card-component-stories",1446:"ui-inputs-src-lib-editable-label-editable-label-directive-stories",1683:"ui-search-src-lib-record-metric-record-metric-component-stories",1713:"ui-layout-src-lib-form-field-wrapper-form-field-wrapper-component-stories",1870:"ui-inputs-src-lib-button-button-component-stories",2044:"ui-elements-src-lib-metadata-quality-metadata-quality-component-stories",2285:"ui-layout-src-lib-pagination-dots-pagination-dots-component-stories",2512:"ui-elements-src-lib-thumbnail-thumbnail-component-stories",2524:"ui-search-src-lib-facets-facet-block-facet-block-component-stories",2856:"ui-inputs-src-lib-url-input-url-input-component-stories",2940:"ui-widgets-src-lib-spinning-loader-spinning-loader-component-stories",3080:"feature-dataviz-src-lib-table-view-table-view-component-stories",3144:"ui-widgets-src-lib-popover-popover-component-stories",3172:"webcomponents-src-app-components-gn-results-list-angular-stories",3244:"ui-elements-src-lib-notification-notification-component-stories",3371:"ui-search-src-lib-record-preview-list-record-preview-list-component-stories",3400:"ui-inputs-src-lib-date-range-picker-date-range-picker-component-stories",3452:"ui-elements-src-lib-markdown-editor-markdown-editor-component-stories",3495:"ui-search-src-lib-results-list-results-list-component-stories",3503:"ui-layout-src-lib-pagination-pagination-component-stories",3936:"ui-elements-src-lib-download-item-download-item-component-stories",4060:"ui-widgets-src-lib-color-scale-color-scale-component-stories",4096:"ui-inputs-src-lib-file-input-file-input-component-stories",4120:"feature-dataviz-src-lib-geo-table-view-geo-table-view-component-stories",4353:"ui-layout-src-lib-max-lines-max-lines-component-stories",4405:"feature-dataviz-src-lib-figure-figure-container-figure-container-component-stories",4425:"ui-layout-src-lib-expandable-panel-button-expandable-panel-button-component-stories",4532:"ui-dataviz-src-lib-chart-chart-component-stories",4622:"ui-map-src-lib-components-map-container-map-container-component-stories",4941:"webcomponents-src-app-components-gn-aggregated-records-angular-stories",4960:"ui-elements-src-lib-confirmation-dialog-confirmation-dialog-component-stories",4978:"webcomponents-src-app-components-gn-aggregated-records-elements-stories",5111:"ui-search-src-lib-record-preview-card-record-preview-card-component-stories",5316:"ui-elements-src-lib-application-banner-application-banner-component-stories",5353:"ui-layout-src-lib-sortable-list-sortable-list-component-stories",5380:"webcomponents-src-app-components-gn-facets-elements-stories",5620:"ui-elements-src-lib-error-error-component-stories",5683:"feature-editor-src-lib-components-contact-card-contact-card-component-stories",5770:"ui-inputs-src-lib-autocomplete-autocomplete-component-stories",5871:"ui-layout-src-lib-anchor-link-anchor-link-directive-stories",5878:"ui-inputs-src-lib-star-toggle-star-toggle-stories",5928:"ui-inputs-src-lib-check-toggle-check-toggle-component-stories",5967:"webcomponents-src-app-components-gn-facets-angular-stories",6047:"ui-layout-src-lib-block-list-block-list-component-stories",6048:"ui-elements-src-lib-metadata-info-metadata-info-component-stories",6076:"ui-inputs-src-lib-dropdown-multiselect-dropdown-multiselect-component-stories",6116:"ui-elements-src-lib-image-input-image-input-component-stories",6212:"feature-dataviz-src-lib-chart-view-chart-view-component-stories",6394:"ui-inputs-src-lib-switch-toggle-switch-toggle-stories",6398:"ui-inputs-src-lib-drag-and-drop-file-input-drag-and-drop-file-input-component-stories",6446:"ui-catalog-src-lib-catalog-title-catalog-title-component-stories",6571:"feature-editor-src-lib-components-import-record-import-record-component-stories",6576:"ui-inputs-src-lib-text-area-text-area-component-stories",6755:"ui-layout-src-lib-modal-dialog-modal-dialog-component-stories",6848:"ui-widgets-src-lib-progress-bar-progress-bar-component-stories",7060:"ui-elements-src-lib-metadata-info-linkify-directive-stories",7074:"ui-elements-src-lib-user-preview-user-preview-component-stories",7124:"ui-dataviz-src-lib-data-table-data-table-component-stories",7129:"webcomponents-src-app-components-gn-results-list-elements-stories",7235:"feature-editor-src-lib-components-online-resource-card-online-resource-card-component-stories",7344:"ui-inputs-src-lib-dropdown-selector-dropdown-selector-component-stories",7351:"ui-search-src-lib-results-hits-number-results-hits-number-component-stories",7847:"ui-layout-src-lib-carousel-carousel-component-stories",7988:"ui-catalog-src-lib-organisations-filter-organisations-filter-component-stories",8176:"ui-elements-src-lib-related-record-card-related-record-card-component-stories",8189:"ui-layout-src-lib-expandable-panel-expandable-panel-component-stories",8464:"ui-elements-src-lib-markdown-parser-markdown-parser-component-stories",8757:"ui-layout-src-lib-sticky-header-sticky-header-component-stories",8972:"ui-inputs-src-lib-checkbox-checkbox-component-stories",9089:"ui-layout-src-lib-previous-next-buttons-previous-next-buttons-component-stories",9116:"ui-elements-src-lib-user-feedback-item-user-feedback-item-component-stories",9174:"ui-inputs-src-lib-viewport-intersector-viewport-intersector-stories",9227:"ui-layout-src-lib-pagination-buttons-pagination-buttons-component-stories",9240:"ui-widgets-src-lib-loading-mask-loading-mask-component-stories",9304:"ui-inputs-src-lib-date-picker-date-picker-component-stories",9452:"ui-elements-src-lib-link-card-link-card-component-stories",9519:"ui-search-src-lib-record-preview-text-record-preview-text-component-stories",9800:"ui-widgets-src-lib-popup-alert-popup-alert-component-stories"}[chunkId]||chunkId)+"."+{9:"e6e9dfcd",21:"6e52b94b",103:"49a019ca",141:"187e0e5a",287:"4f9eb0aa",321:"ce7d75c4",362:"6a545530",387:"a8c0ca9f",396:"6c23c9e2",496:"cd4db4d2",539:"d561b0f1",578:"3e6dea8d",770:"07b84b16",791:"691572b0",817:"36d520a8",858:"467fe310",931:"4c739a5d",953:"cf4ac708",988:"0679e96b",1052:"46efd24d",1075:"502d88be",1151:"20aed8bf",1346:"82d55d79",1404:"2d75483e",1446:"841a6a62",1683:"2d717974",1702:"bcb7dadd",1713:"91d69f8a",1738:"144ece27",1813:"a70a9cbe",1870:"7e9e96e1",1966:"8c0053ac",2044:"7d0b1546",2285:"51b4187e",2345:"bbb965cd",2456:"3d174368",2512:"b7e8c374",2524:"a202a9c6",2603:"86553054",2768:"f5e81d07",2856:"34c9362d",2940:"c342ac90",3080:"b73e990a",3104:"1a479ef2",3144:"e9169b61",3172:"b205adae",3198:"b3a678c3",3244:"94b2be34",3249:"df156c34",3371:"683b4963",3400:"1b9ec71e",3433:"83d08d7f",3452:"eee222ec",3478:"240460b2",3495:"cb6d3c68",3503:"e451a09c",3695:"4e82ee66",3936:"9a6ff39c",3979:"6f71fe6a",4060:"cbfd9b9d",4096:"ef0ee002",4120:"95506956",4353:"2e84e509",4405:"f88249f6",4423:"e3082010",4425:"1bdff304",4532:"a146460f",4614:"f4385a28",4622:"a55416ec",4941:"85229891",4960:"28c2f525",4978:"1251b67b",5030:"f7f0565a",5111:"3f5d8347",5246:"cbd14667",5316:"b4290b24",5353:"00aaf8f6",5380:"0d2de423",5417:"f69d9cf4",5581:"a0c71282",5620:"2696f5da",5624:"0bb9751d",5683:"260751bd",5686:"4d4e785b",5770:"61cbc758",5871:"53449614",5878:"9bc3dd44",5928:"84f5dd58",5952:"b4df65c9",5967:"d6f943d2",6047:"86cdfae5",6048:"c2821dff",6076:"c070d52a",6116:"08e3e045",6212:"422bd3de",6326:"bbdeb16e",6394:"11ffbb55",6398:"9e625a36",6446:"ab73ed71",6571:"ace53176",6576:"dbfe2e20",6755:"4c293d28",6848:"a2953da3",6872:"af2e7b49",6873:"2efe5ef4",7060:"ca46eb75",7074:"5b4dca08",7076:"8db54307",7124:"9fd97f5a",7129:"067095d2",7235:"0ef18772",7344:"b9bc4eff",7351:"43ef4fbd",7374:"173d2c92",7656:"fbfdc30c",7727:"2e1ed55b",7789:"065ee4e9",7847:"082bccab",7904:"68ebb92d",7919:"62e08821",7952:"663f0309",7988:"927ea02a",8176:"16008163",8189:"8bb326f9",8464:"f4a0d479",8757:"94b546c7",8901:"3945e1cf",8939:"461c80e9",8972:"38ccd62a",8980:"35d12817",9089:"43b34838",9107:"63ec3ec3",9116:"eae71d9b",9174:"7e3c790a",9194:"f9945415",9227:"a5db121b",9240:"ecfdb5c5",9304:"a2c254d5",9365:"f4cd1d53",9421:"99eb687c",9452:"a011f28c",9519:"34656778",9565:"b0d796ee",9637:"958e6a07",9800:"8e95140d"}[chunkId]+".iframe.bundle.js"),__webpack_require__.miniCssF=chunkId=>{},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.hmd=module=>((module=Object.create(module)).children||(module.children=[]),Object.defineProperty(module,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+module.id)}}),module),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),inProgress={},__webpack_require__.l=(url,done,key,chunkId)=>{if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="geonetwork-ui:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","geonetwork-ui:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=(prev,event)=>{script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((fn=>fn(event))),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=module=>(module.paths=[],module.children||(module.children=[]),module),__webpack_require__.p="",(()=>{var installedChunks={5354:0};__webpack_require__.f.j=(chunkId,promises)=>{var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(5354!=chunkId){var promise=new Promise(((resolve,reject)=>installedChunkData=installedChunks[chunkId]=[resolve,reject]));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(event=>{if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=chunkId=>0===installedChunks[chunkId];var webpackJsonpCallback=(parentChunkLoadingFunction,data)=>{var moduleId,chunkId,[chunkIds,moreModules,runtime]=data,i=0;if(chunkIds.some((id=>0!==installedChunks[id]))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))})(),__webpack_require__.nc=void 0})();