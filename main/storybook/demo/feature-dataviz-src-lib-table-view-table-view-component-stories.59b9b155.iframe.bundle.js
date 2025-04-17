(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[3080],{"./libs/feature/dataviz/src/lib/service/data.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>DataService});var _home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@biesbjerg/ngx-translate-extract-marker/fesm5/biesbjerg-ngx-translate-extract-marker.js"),_camptocamp_ogc_client__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@camptocamp/ogc-client/dist/index.js"),_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/util/data-fetcher/src/index.ts"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/shared/src/index.ts"),rxjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/from.js"),rxjs__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/throwError.js"),rxjs_operators__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),rxjs_operators__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),rxjs_operators__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),rxjs_operators__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js");(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("wfs.unreachable.cors"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("wfs.unreachable.http"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("wfs.unreachable.unknown"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("wfs.featuretype.notfound"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("wfs.geojsongml.notsupported"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("ogc.unreachable.unknown"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("dataset.error.network"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("dataset.error.http"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("dataset.error.parse"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("dataset.error.unsupportedType"),(0,_biesbjerg_ngx_translate_extract_marker__WEBPACK_IMPORTED_MODULE_3__.x)("dataset.error.unknown");let DataService=class DataService{constructor(proxy){this.proxy=proxy}getWfsEndpoint(wfsUrl){return(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.H)(new _camptocamp_ogc_client__WEBPACK_IMPORTED_MODULE_0__.ym(this.proxy.getProxiedUrl(wfsUrl)).isReady()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.W)((error=>{if(error instanceof Error)throw new Error("wfs.unreachable.unknown");if("network"===error.type)throw new Error("wfs.unreachable.cors");if("http"===error.type)throw new Error("wfs.unreachable.http");if("parse"===error.type)throw new Error("wfs.unreachable.parse");throw"unsupportedType"===error.type?new Error("wfs.unreachable.unsupportedType"):new Error("wfs.unreachable.unknown")})))}getDownloadUrlsFromWfs(wfsUrl,featureTypeName){return this.getWfsEndpoint(wfsUrl).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.T)((endpoint=>{const featureTypes=endpoint.getFeatureTypes(),featureType=endpoint.getFeatureTypeSummary(1!==featureTypes.length||featureTypeName?featureTypeName:featureTypes[0].name);if(!featureType)throw new Error("wfs.featuretype.notfound");return{all:featureType.outputFormats.reduce(((prev,curr)=>({...prev,[curr]:endpoint.getFeatureUrl(featureType.name,{outputFormat:curr})})),{}),geojson:endpoint.supportsJson(featureType.name)?endpoint.getFeatureUrl(featureType.name,{asJson:!0,outputCrs:"EPSG:4326"}):null,gml:featureType.outputFormats.find((f=>f.toLowerCase().includes("gml")))&&("EPSG:4326"===featureType.defaultCrs||featureType.otherCrs?.includes("EPSG:4326"))?{featureUrl:endpoint.getFeatureUrl(featureType.name,{outputFormat:featureType.outputFormats.find((f=>f.toLowerCase().includes("gml"))),outputCrs:"EPSG:4326"}),namespace:featureType.name,wfsVersion:endpoint.getVersion()}:null}})))}getWfsFeatureCount(wfsUrl,featureTypeName){return this.getWfsEndpoint(wfsUrl).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.n)((endpoint=>(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.H)(endpoint.getFeatureTypeFull(featureTypeName)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.T)((featureType=>{if(!featureType)throw new Error("wfs.featuretype.notfound");return featureType.objectCount}))))))}getDownloadUrlFromEsriRest(apiUrl,format){return this.proxy.getProxiedUrl(`${apiUrl}/query?f=${format}&where=1=1&outFields=*`)}getDownloadLinksFromWfs(wfsLink){return this.getDownloadUrlsFromWfs(wfsLink.url.toString(),wfsLink.name).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.T)((urls=>urls.all)),(0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.T)((urls=>Object.keys(urls).map((format=>({...wfsLink,name:wfsLink.name,type:"download",url:new URL(urls[format]),mimeType:(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.pY)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.i8)(format))}))))))}getDownloadLinksFromOgcApiFeatures(ogcApiLink){var _this=this;return(0,_home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__.A)((function*(){const collectionInfo=yield _this.getDownloadUrlsFromOgcApi(ogcApiLink.url.href);return Object.keys(collectionInfo.bulkDownloadLinks).map((downloadLink=>({...ogcApiLink,name:collectionInfo.id,type:"download",url:new URL(collectionInfo.bulkDownloadLinks[downloadLink]),mimeType:(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.pY)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.i8)(downloadLink))})))}))()}getDownloadUrlsFromOgcApi(url){return(0,_home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__.A)((function*(){const endpoint=new _camptocamp_ogc_client__WEBPACK_IMPORTED_MODULE_0__.TL(url);return yield endpoint.allCollections.then((collections=>endpoint.getCollectionInfo(collections[0].name))).catch((error=>{throw new Error("ogc.unreachable.unknown")}))}))()}getItemsFromOgcApi(url){return(0,_home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__.A)((function*(){const endpoint=new _camptocamp_ogc_client__WEBPACK_IMPORTED_MODULE_0__.TL(url);return yield endpoint.featureCollections.then((collections=>collections.length?endpoint.getCollectionItem(collections[0],"1"):null)).catch((error=>{throw new Error("ogc.unreachable.unknown")}))}))()}getDownloadLinksFromEsriRest(esriRestLink){return["json","geojson"].map((format=>({...esriRestLink,url:new URL(this.getDownloadUrlFromEsriRest(esriRestLink.url.toString(),format)),mimeType:(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.pY)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.i8)(format))})))}readAsGeoJson(link){return this.getDataset(link).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.n)((dataset=>dataset.selectAll().read())),(0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.T)((features=>({type:"FeatureCollection",features}))))}getDataset(link){if("service"===link.type&&"wfs"===link.accessServiceProtocol){const wfsUrlEndpoint=this.proxy.getProxiedUrl(link.url.toString());return(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.H)((0,_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_1__.Jp)(wfsUrlEndpoint,"wfs",{wfsFeatureType:link.name}))}if("download"===link.type){const linkProxifiedUrl=this.proxy.getProxiedUrl(link.url.toString()),format=(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.uL)(link),supportedType=_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_1__.S5.indexOf(format)>-1?format:void 0;return(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.H)((0,_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_1__.Jp)(linkProxifiedUrl,supportedType)).pipe()}if("service"===link.type&&"esriRest"===link.accessServiceProtocol){const url=this.getDownloadUrlFromEsriRest(link.url.toString(),"geojson");return(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.H)((0,_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_1__.Jp)(url,"geojson")).pipe()}return"service"===link.type&&"ogcFeatures"===link.accessServiceProtocol?(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.H)(this.getDownloadUrlsFromOgcApi(link.url.href)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.n)((collectionInfo=>{const geojsonUrl=collectionInfo.jsonDownloadLink;return(0,_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_1__.Jp)(geojsonUrl,"geojson")})),(0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.M)((url=>{if(null===url)throw new Error("wfs.geojsongml.notsupported")}))):(0,rxjs__WEBPACK_IMPORTED_MODULE_10__.$)((()=>"protocol not supported"))}static{this.ctorParameters=()=>[{type:_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.Uk}]}};DataService=(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injectable)({providedIn:"root"}),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Sn)("design:paramtypes",[_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.Uk])],DataService)},"./libs/feature/dataviz/src/lib/table-view/table-view.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{N:()=>TableViewComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var table_view_componentngResource=__webpack_require__("./libs/feature/dataviz/src/lib/table-view/table-view.component.css?ngResource"),table_view_componentngResource_default=__webpack_require__.n(table_view_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),catchError=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),finalize=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),startWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/startWith.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js"),src=__webpack_require__("./libs/util/data-fetcher/src/index.ts"),data_service=__webpack_require__("./libs/feature/dataviz/src/lib/service/data.service.ts"),dataviz_src=__webpack_require__("./libs/ui/dataviz/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),widgets_src=__webpack_require__("./libs/ui/widgets/src/index.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let TableViewComponent=class TableViewComponent{set link(value){this.currentLink$.next(value)}constructor(dataService,translateService){this.dataService=dataService,this.translateService=translateService,this.currentLink$=new BehaviorSubject.t(null),this.loading=!1,this.error=null,this.tableData$=this.currentLink$.pipe((0,switchMap.n)((link=>(this.error=null,link?(this.loading=!0,this.getDatasetReader(link).pipe((0,catchError.W)((error=>(this.handleError(error),(0,of.of)(void 0)))),(0,finalize.j)((()=>{this.loading=!1})))):(0,of.of)(void 0)))),(0,startWith.Z)(void 0),(0,shareReplay.t)(1))}getDatasetReader(link){return this.dataService.getDataset(link)}onTableSelect(event){console.log(event)}handleError(error){error instanceof src.fk?(this.error=this.translateService.instant(`dataset.error.${error.type}`,{info:error.info}),console.warn(error.message)):error instanceof Error?(this.error=this.translateService.instant(error.message),console.warn(error.stack||error)):(this.error=this.translateService.instant(error),console.warn(error)),this.loading=!1}static{this.ctorParameters=()=>[{type:data_service.u},{type:ngx_translate_core.c$}]}static{this.propDecorators={link:[{type:core.Input}]}}};TableViewComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-table-view",template:'<div class="w-full h-full flex flex-col">\n  <div class="relative h-full">\n    <gn-ui-data-table\n      *ngIf="tableData$ | async as dataset"\n      class="overflow-auto grow"\n      [dataset]="dataset"\n      (selected)="onTableSelect($event)"\n    ></gn-ui-data-table>\n    <gn-ui-loading-mask\n      *ngIf="loading"\n      class="absolute inset-0"\n      [message]="\'table.loading.data\' | translate"\n    ></gn-ui-loading-mask>\n    <gn-ui-popup-alert\n      *ngIf="error"\n      type="warning"\n      icon="matErrorOutlineOutline"\n      class="absolute m-2 inset-0"\n    >\n      <span translate>{{ error }}</span>\n    </gn-ui-popup-alert>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[common.CommonModule,dataviz_src.up,widgets_src.OR,widgets_src.oz,ngx_translate_core.h],standalone:!0,styles:[table_view_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[data_service.u,ngx_translate_core.c$])],TableViewComponent)},"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A5:()=>_lib_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_0__.A,Qe:()=>_lib_chart_chart_component__WEBPACK_IMPORTED_MODULE_1__.Q,up:()=>_lib_data_table_data_table_component__WEBPACK_IMPORTED_MODULE_2__.u});var _lib_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),_lib_chart_chart_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),_lib_data_table_data_table_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.component.ts");__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.fixtures.ts"),__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts")},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.t1.register(chart.A6,chart.E8,chart.PP,chart.kc,chart.ZT,chart.No,chart.FN,chart.P$,chart.Bs,chart.Pz,chart.m_,chart.Jy,chart.s$);let ChartComponent=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.t1(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}static{this.propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]}}};ChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./node_modules/rxjs/dist/esm5/internal/observable/throwError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>throwError});var _Observable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_util_isFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");function throwError(errorOrErrorFactory,scheduler){var errorFactory=(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(errorOrErrorFactory)?errorOrErrorFactory:function(){return errorOrErrorFactory},init=function(subscriber){return subscriber.error(errorFactory())};return new _Observable__WEBPACK_IMPORTED_MODULE_1__.c(scheduler?function(subscriber){return scheduler.schedule(init,0,subscriber)}:init)}},"./node_modules/rxjs/dist/esm5/internal/operators/catchError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{W:()=>catchError});var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js");function catchError(selector){return(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){var handledResult,innerSub=null,syncUnsub=!1;innerSub=source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,void 0,void 0,(function(err){handledResult=(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.Tg)(selector(err,catchError(selector)(source))),innerSub?(innerSub.unsubscribe(),innerSub=null,handledResult.subscribe(subscriber)):syncUnsub=!0}))),syncUnsub&&(innerSub.unsubscribe(),innerSub=null,handledResult.subscribe(subscriber))}))}},"./libs/feature/dataviz/src/lib/table-view/table-view.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_table_view_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/feature/dataviz/src/lib/table-view/table-view.component.ts"),_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/dataviz/src/index.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Smart/Dataviz/TableView",component:_table_view_component__WEBPACK_IMPORTED_MODULE_2__.N,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({imports:[_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_3__.up,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.sU)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.importProvidersFrom)(_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_3__.A5),(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule),(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.q1)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.componentWrapperDecorator)((story=>`<div class="border border-gray-300 h-[500px] w-[800px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`))]},LINKS={wfs:{description:"US states",name:"topp:states",url:new URL("https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetCapabilities"),type:"service",accessServiceProtocol:"wfs"},csv:{description:"France departments",url:new URL("https://www.data.gouv.fr/fr/datasets/r/70cef74f-70b1-495a-8500-c089229c0254"),type:"download"}},Primary={args:{link:"wfs"},argTypes:{link:{control:"radio",options:Object.keys(LINKS)}},render:args=>({props:{...args,link:LINKS[args.link]}})},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    link: 'wfs'\n  },\n  argTypes: {\n    link: {\n      control: 'radio',\n      options: Object.keys(LINKS)\n    }\n  },\n  render: args => ({\n    props: {\n      ...args,\n      link: LINKS[args.link]\n    }\n  })\n}",...Primary.parameters?.docs?.source}}}},"./libs/feature/dataviz/src/lib/table-view/table-view.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);