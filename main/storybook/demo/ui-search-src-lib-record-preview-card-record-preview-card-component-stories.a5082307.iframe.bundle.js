(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[5111],{"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Qe:()=>chart_component.Q,Or:()=>table_component.O,A5:()=>ui_dataviz_module.A,g$:()=>someHabTableItemFixture,ly:()=>tableItemFixture});var ui_dataviz_module=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),chart_component=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),table_component=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.ts");const tableItemFixture=()=>[{name:"name 1",id:"id 1",age:15},{name:"name 2",id:"id 2",age:10},{name:"name 3",id:"id 3",age:55}],someHabTableItemFixture=()=>[{name:"France",id:"1",pop:505e5},{name:"Italy",id:"2",pop:155878789655},{name:"UK",id:"3",pop:31522456},{name:"US",id:"4",pop:3215448888}];__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts")},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.t1.register(chart.A6,chart.E8,chart.PP,chart.kc,chart.ZT,chart.No,chart.FN,chart.P$,chart.Bs,chart.Pz,chart.m_,chart.Jy,chart.s$);let ChartComponent=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.t1(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}static{this.propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]}}};ChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./libs/ui/dataviz/src/lib/figure/figure.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>FigureComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var figure_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource"),figure_componentngResource_default=__webpack_require__.n(figure_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FigureComponent=class FigureComponent{constructor(){this.unit="",this.color="primary"}get textClass(){return"primary"===this.color?"text-primary":"text-secondary"}get bgClass(){return"primary"===this.color?"bg-primary-white":"bg-secondary-white"}static{this.propDecorators={icon:[{type:core.Input}],title:[{type:core.Input}],figure:[{type:core.Input}],unit:[{type:core.Input}],color:[{type:core.Input}]}}};FigureComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-figure",template:'<div\n  class="flex flex-row justify-start items-center overflow-hidden"\n  data-test="figureTitle"\n  [title]="\n    figure.toString() +\n    \' \' +\n    unit +\n    \' \' +\n    (title | translate: { count: figure })\n  "\n>\n  <ng-icon\n    class="{{ bgClass }} {{\n      textClass\n    }} text-[1.875em] rounded-full mr-[0.55em] p-[0.6em] w-[2.2em] h-[2.2em] shrink-0"\n    style="width: 2.2em; height: 2.2em"\n    [name]="icon"\n  >\n  </ng-icon>\n  <div class="shrink overflow-hidden">\n    <div class="figure-block text-[1.5em] text-black">\n      <span class="figure font-medium mr-[0.3em]" data-test="figure">{{\n        figure\n      }}</span>\n      <span class="unit text-[0.665em]">{{ unit }}</span>\n    </div>\n    <div translate class="title truncate" [translateParams]="{ count: figure }">\n      {{ title }}\n    </div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[figure_componentngResource_default()]})],FigureComponent)},"./libs/ui/dataviz/src/lib/table/table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>TableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var table_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.css?ngResource"),table_componentngResource_default=__webpack_require__.n(table_componentngResource),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),sort=__webpack_require__("./node_modules/@angular/material/fesm2022/sort.mjs"),table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),ng_table_virtual_scroll=__webpack_require__("./node_modules/ng-table-virtual-scroll/fesm2020/ng-table-virtual-scroll.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs");let TableComponent=class TableComponent{set data(value){this.dataSource=new ng_table_virtual_scroll.ap(value),this.dataSource.sort=this.sort,this.properties=Array.isArray(value)&&value.length?Object.keys(value[0]):[],this.count=value.length}constructor(eltRef){this.eltRef=eltRef,this.selected=new core.EventEmitter}ngAfterViewInit(){this.headerHeight=this.eltRef.nativeElement.querySelector("thead").offsetHeight}scrollToItem(itemId){const row=this.eltRef.nativeElement.querySelector(`#${this.getRowEltId(itemId)}`);this.eltRef.nativeElement.scrollTop=row.offsetTop-this.headerHeight}getRowEltId(id){return"table-item-"+id}static{this.ctorParameters=()=>[{type:core.ElementRef}]}static{this.propDecorators={data:[{type:core.Input}],activeId:[{type:core.Input}],selected:[{type:core.Output}],sort:[{type:core.ViewChild,args:[sort.B4,{static:!0}]}]}}};TableComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,imports:[table.tP,sort.NQ,ng_table_virtual_scroll.VL,scrolling.E9,common.NgForOf,ngx_translate_core.h],selector:"gn-ui-table",template:'<div class="border border-gray-300 rounded-lg overflow-hidden bg-white h-full">\n  <cdk-virtual-scroll-viewport\n    tvsItemSize="48"\n    headerHeight="56"\n    style="height: calc(100% - 37px)"\n  >\n    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>\n      <ng-container *ngFor="let prop of properties" [matColumnDef]="prop">\n        <th\n          mat-header-cell\n          *matHeaderCellDef\n          mat-sort-header\n          class="text-sm text-black bg-white"\n        >\n          {{ prop }}\n        </th>\n        <td\n          mat-cell\n          *matCellDef="let element"\n          class="whitespace-nowrap pr-1 truncate"\n        >\n          {{ element[prop] }}\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef="properties; sticky: true"></tr>\n      <tr\n        [id]="getRowEltId(row.id)"\n        mat-row\n        *matRowDef="let row; columns: properties"\n        (click)="selected.emit(row)"\n        [class.active]="row.id === activeId"\n      ></tr>\n    </table>\n  </cdk-virtual-scroll-viewport>\n  <div class="text-gray-900 border-t border-gray-300 px-4 py-2 text-sm">\n    <span class="count font-extrabold text-primary">{{ count }}</span\n    >&nbsp;<span translate>table.object.count</span>.\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[table_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ElementRef])],TableComponent)},"./libs/ui/dataviz/src/lib/ui-dataviz.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>UiDatavizModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),_ng_icons_material_icons_baseline__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-baseline.mjs"),_ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@ng-icons/tabler-icons/fesm2022/ng-icons-tabler-icons.mjs");let UiDatavizModule=class UiDatavizModule{};UiDatavizModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.h.forChild(),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.i6.withIcons({matCorporateFare:_ng_icons_material_icons_baseline__WEBPACK_IMPORTED_MODULE_6__.MB9,tablerFolderOpen:_ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_7__.B7Z})],providers:[(0,_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.PG)({size:"1.5em"})],declarations:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.Q],exports:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.Q]})],UiDatavizModule)},"./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>RecordPreviewCardComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_card_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.scss?ngResource"),record_preview_card_componentngResource_default=__webpack_require__.n(record_preview_card_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewCardComponent=class RecordPreviewCardComponent extends record_preview_component.v{};RecordPreviewCardComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-record-preview-card",template:'<div\n  class="h-full border bg-white rounded-sm overflow-hidden transition duration-200 transform hover:scale-105 hover:bg-gray-50 border-gray-300 hover:border-primary hover:text-primary"\n>\n  <a\n    [href]="record.landingPage"\n    [title]="record.abstract"\n    [target]="linkTarget"\n  >\n    <div class="flex flex-col min-h-full">\n      <gn-ui-thumbnail\n        class="lg:h-48 md:h-36 border-b border-gray-200 bg-gray-100"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n\n      <div class="grow p-4">\n        <h1 class="title-font text-lg font-medium mb-3 clamp-2">\n          {{ record.title }}\n        </h1>\n        <p class="leading-relaxed text-sm text-gray-700 clamp-3">\n          {{ record.abstract }}\n        </p>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_card_componentngResource_default()]})],RecordPreviewCardComponent)},"./libs/ui/search/src/lib/record-preview/record-preview.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{v:()=>RecordPreviewComponent});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/shared/src/index.ts"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");let RecordPreviewComponent=class RecordPreviewComponent{get isViewable(){return this.record.extras?.hasMaps}get isDownloadable(){return this.record.extras?.hasDownloads}get contact(){return this.record.contactsForResource?.[0]||this.record.contacts[0]}get organization(){return this.record.ownerOrganization}constructor(elementRef){this.elementRef=elementRef,this.linkTarget="_blank",this.linkHref=null,this.mdSelect=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter,this.subscription=new rxjs__WEBPACK_IMPORTED_MODULE_2__.yU}ngOnInit(){this.abstract=(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.KE)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.QZ)(this.record?.abstract)),this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.R)(this.elementRef.nativeElement,"click").subscribe((event=>{event.preventDefault(),(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.Y8)(event),this.mdSelect.emit(this.record)})))}ngOnDestroy(){this.subscription.unsubscribe()}static{this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef}]}static{this.propDecorators={record:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkTarget:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],favoriteTemplate:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkHref:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],metadataQualityDisplay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],mdSelect:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Output}]}}};RecordPreviewComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({selector:"gn-ui-record-preview",template:""}),(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef])],RecordPreviewComponent)},"./node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>delayWhen});var _observable_concat__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/concat.js"),_take__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),_ignoreElements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js"),_mapTo__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),_mergeMap__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),_observable_innerFrom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");function delayWhen(delayDurationSelector,subscriptionDelay){return subscriptionDelay?function(source){return(0,_observable_concat__WEBPACK_IMPORTED_MODULE_0__.x)(subscriptionDelay.pipe((0,_take__WEBPACK_IMPORTED_MODULE_1__.s)(1),(0,_ignoreElements__WEBPACK_IMPORTED_MODULE_2__.w)()),source.pipe(delayWhen(delayDurationSelector)))}:(0,_mergeMap__WEBPACK_IMPORTED_MODULE_3__.Z)((function(value,index){return(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_4__.Tg)(delayDurationSelector(value,index)).pipe((0,_take__WEBPACK_IMPORTED_MODULE_1__.s)(1),(0,_mapTo__WEBPACK_IMPORTED_MODULE_5__.u)(value))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{w:()=>ignoreElements});var _util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_util_noop__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/noop.js");function ignoreElements(){return(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,_util_noop__WEBPACK_IMPORTED_MODULE_2__.l))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>mapTo});var _map__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");function mapTo(value){return(0,_map__WEBPACK_IMPORTED_MODULE_0__.T)((function(){return value}))}},"./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_record_preview_card_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/dataviz/src/index.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/util/shared/src/index.ts"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/common/fixtures/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Search/RecordPreviewCardComponent",component:_record_preview_card_component__WEBPACK_IMPORTED_MODULE_1__.D,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_2__.A5,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__.ek]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.q1,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__.BrowserAnimationsModule)]})]},Primary={args:{record:(0,_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_4__._K)()[0],linkTarget:"_blank"}},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    record: datasetRecordsFixture()[0] as CatalogRecord,\n    linkTarget: '_blank'\n  }\n}",...Primary.parameters?.docs?.source}}}},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: inherit;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/table/table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"table {\n  width: 100%;\n  background: white;\n}\nth.mat-mdc-header-cell,\ntd.mat-mdc-cell,\ntd.mat-mdc-footer-cell {\n  padding-right: 20px;\n}\ntr.mat-mdc-row,\ntr.mat-mdc-footer-row {\n  height: 36px;\n}\ntr:hover {\n  background: whitesmoke;\n}\ntr.mat-mdc-header-row {\n  height: 48px;\n}\n\n[mat-header-cell] {\n  color: #0000008a;\n  font-size: 12px;\n  font-weight: 500;\n}\ntr {\n  cursor: pointer;\n}\n\n.active .mat-mdc-cell {\n  color: var(--color-primary);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);