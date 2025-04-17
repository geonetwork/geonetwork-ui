(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[9148],{"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{xH:()=>chart_component.x,Vf:()=>TABLE_ITEM_FIXTURE,k4:()=>TABLE_ITEM_FIXTURE_HAB,ac:()=>table_component.a,CP:()=>ui_dataviz_module.C});var ui_dataviz_module=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),chart_component=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),table_component=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.ts");const TABLE_ITEM_FIXTURE=[{name:"name 1",id:"id 1",age:15},{name:"name 2",id:"id 2",age:10},{name:"name 3",id:"id 3",age:55}],TABLE_ITEM_FIXTURE_HAB=[{name:"France",id:"1",pop:505e5},{name:"Italy",id:"2",pop:155878789655},{name:"UK",id:"3",pop:31522456},{name:"US",id:"4",pop:3215448888}]},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{x:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.kL.register(chart.vn,chart.ZL,chart.uw,chart.f$,chart.ST,chart.jn,chart.od,chart.tt,chart.qi,chart.ho,chart.u,chart.wL,chart.De);let ChartComponent=((_class=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.kL(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.Z)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}}).propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]},_class);ChartComponent=(0,tslib_es6.gn)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./libs/ui/dataviz/src/lib/figure/figure.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>FigureComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,figure_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource"),figure_componentngResource_default=__webpack_require__.n(figure_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FigureComponent=((_class=class FigureComponent{constructor(){this.color="primary"}get hoverTitle(){return`${this.figure.toString()} ${this.unit||""}\n${this.title}`}get textClass(){return"primary"===this.color?"text-primary":"text-secondary"}get bgClass(){return"primary"===this.color?"bg-primary-white":"bg-secondary-white"}}).propDecorators={icon:[{type:core.Input}],title:[{type:core.Input}],figure:[{type:core.Input}],unit:[{type:core.Input}],color:[{type:core.Input}]},_class);FigureComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-figure",template:'<div\n  class="flex flex-row justify-start items-center overflow-hidden"\n  [title]="hoverTitle"\n>\n  <mat-icon\n    class="material-symbols-outlined {{ bgClass }} {{\n      textClass\n    }} text-[1.875em] rounded-full mr-[0.55em] p-[0.6em] w-[2.2em] h-[2.2em] shrink-0"\n    style="width: 2.2em; height: 2.2em"\n  >\n    {{ icon }}\n  </mat-icon>\n  <div class="shrink overflow-hidden">\n    <div class="figure-block text-[1.5em] text-black">\n      <span class="figure font-medium mr-[0.3em]">{{ figure }}</span>\n      <span class="unit text-[0.665em]">{{ unit }}</span>\n    </div>\n    <div class="title truncate">{{ title }}</div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[figure_componentngResource_default()]})],FigureComponent)},"./libs/ui/dataviz/src/lib/table/table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>TableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,table_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.css?ngResource"),table_componentngResource_default=__webpack_require__.n(table_componentngResource),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),sort=__webpack_require__("./node_modules/@angular/material/fesm2022/sort.mjs"),table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),ng_table_virtual_scroll=__webpack_require__("./node_modules/ng-table-virtual-scroll/fesm2020/ng-table-virtual-scroll.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs");let TableComponent=((_class=class TableComponent{set data(value){this.dataSource=new ng_table_virtual_scroll.kL(value),this.dataSource.sort=this.sort,this.properties=Array.isArray(value)&&value.length?Object.keys(value[0]):[],this.count=value.length}constructor(eltRef){this.eltRef=eltRef,this.selected=new core.EventEmitter}ngAfterViewInit(){this.headerHeight=this.eltRef.nativeElement.querySelector("thead").offsetHeight}scrollToItem(itemId){const row=this.eltRef.nativeElement.querySelector(`#${this.getRowEltId(itemId)}`);this.eltRef.nativeElement.scrollTop=row.offsetTop-this.headerHeight}getRowEltId(id){return"table-item-"+id}}).ctorParameters=()=>[{type:core.ElementRef}],_class.propDecorators={data:[{type:core.Input}],activeId:[{type:core.Input}],selected:[{type:core.Output}],sort:[{type:core.ViewChild,args:[sort.YE,{static:!0}]}]},_class);TableComponent=(0,tslib_es6.gn)([(0,core.Component)({standalone:!0,imports:[table.p0,sort.JX,ng_table_virtual_scroll.oJ,scrolling.Cl,common.NgForOf,ngx_translate_core.aw],selector:"gn-ui-table",template:'<div class="border border-gray-300 rounded-lg overflow-hidden bg-white h-full">\n  <cdk-virtual-scroll-viewport\n    tvsItemSize="48"\n    headerHeight="56"\n    style="height: calc(100% - 37px)"\n  >\n    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>\n      <ng-container *ngFor="let prop of properties" [matColumnDef]="prop">\n        <th\n          mat-header-cell\n          *matHeaderCellDef\n          mat-sort-header\n          class="text-sm text-black bg-white"\n        >\n          {{ prop }}\n        </th>\n        <td\n          mat-cell\n          *matCellDef="let element"\n          class="whitespace-nowrap pr-1 truncate"\n        >\n          {{ element[prop] }}\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef="properties; sticky: true"></tr>\n      <tr\n        [id]="getRowEltId(row.id)"\n        mat-row\n        *matRowDef="let row; columns: properties"\n        (click)="selected.emit(row)"\n        [class.active]="row.id === activeId"\n      ></tr>\n    </table>\n  </cdk-virtual-scroll-viewport>\n  <div class="text-gray-900 border-t border-gray-300 px-4 py-2 text-sm">\n    <span class="count font-extrabold text-primary">{{ count }}</span\n    >&nbsp;<span translate>table.object.count</span>.\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[table_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ElementRef])],TableComponent)},"./libs/ui/dataviz/src/lib/ui-dataviz.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{C:()=>UiDatavizModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");let UiDatavizModule=class UiDatavizModule{};UiDatavizModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.Ps],declarations:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.D],exports:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.D]})],UiDatavizModule)},"./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>RecordPreviewTitleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_title_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.scss?ngResource"),record_preview_title_componentngResource_default=__webpack_require__.n(record_preview_title_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewTitleComponent=class RecordPreviewTitleComponent extends record_preview_component.W{};RecordPreviewTitleComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-title",template:'\x3c!-- Record list item: List Small --\x3e\n<div\n  class="h-10 w-full border-b border-gray-200 transition duration-200 rounded-sm hover:text-primary"\n>\n  <a\n    [href]="record.landingPage"\n    [target]="linkTarget"\n    [title]="record.abstract"\n  >\n    <div class="h-full flex flex-row items-center">\n      <gn-ui-thumbnail\n        class="w-10 h-full shrink-0 border-r border-gray-200 bg-gray-100"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n\n      <div class="grow px-3 py-1 flex flex-col overflow-hidden">\n        <h1 class="title-font text-sm font-bold truncate md:text-clip">\n          {{ record.title }}\n        </h1>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_title_componentngResource_default()]})],RecordPreviewTitleComponent)},"./libs/ui/search/src/lib/record-preview/record-preview.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{W:()=>RecordPreviewComponent});var _class,tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/shared/src/index.ts"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");let RecordPreviewComponent=((_class=class RecordPreviewComponent{get isViewable(){return this.record.extras?.hasMaps}get isDownloadable(){return this.record.extras?.hasDownloads}get contact(){return this.record.contactsForResource?.[0]||this.record.contacts[0]}get organization(){return this.record.ownerOrganization}get hasMetadataQualityWidget(){return!0===this.metadataQualityDisplay?.widget}constructor(elementRef){this.elementRef=elementRef,this.linkTarget="_blank",this.linkHref=null,this.mdSelect=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter,this.subscription=new rxjs__WEBPACK_IMPORTED_MODULE_2__.w0}ngOnInit(){this.abstract=(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.sd)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.Vt)(this.record?.abstract)),this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.R)(this.elementRef.nativeElement,"click").subscribe((event=>{event.preventDefault(),(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.Yr)(event),this.mdSelect.emit(this.record)})))}ngOnDestroy(){this.subscription.unsubscribe()}}).ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef}],_class.propDecorators={record:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkTarget:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],favoriteTemplate:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkHref:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],metadataQualityDisplay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],mdSelect:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Output}]},_class);RecordPreviewComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({selector:"gn-ui-record-preview",template:""}),(0,tslib__WEBPACK_IMPORTED_MODULE_4__.w6)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef])],RecordPreviewComponent)},"./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{z:()=>firstValueFrom});var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"),_Subscriber__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscriber.js");function firstValueFrom(source,config){var hasConfig="object"==typeof config;return new Promise((function(resolve,reject){var subscriber=new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Hp({next:function(value){resolve(value),subscriber.unsubscribe()},error:reject,complete:function(){hasConfig?resolve(config.defaultValue):reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.K)}});source.subscribe(subscriber)}))}},"./node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{p:()=>throttleTime});var scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),lift=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),OperatorSubscriber=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),innerFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");var timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");function throttleTime(duration,scheduler,config){void 0===scheduler&&(scheduler=scheduler_async.z);var duration$=(0,timer.H)(duration,scheduler);return function throttle(durationSelector,config){return(0,lift.e)((function(source,subscriber){var _a=null!=config?config:{},_b=_a.leading,leading=void 0===_b||_b,_c=_a.trailing,trailing=void 0!==_c&&_c,hasValue=!1,sendValue=null,throttled=null,isComplete=!1,endThrottling=function(){null==throttled||throttled.unsubscribe(),throttled=null,trailing&&(send(),isComplete&&subscriber.complete())},cleanupThrottling=function(){throttled=null,isComplete&&subscriber.complete()},startThrottle=function(value){return throttled=(0,innerFrom.Xf)(durationSelector(value)).subscribe((0,OperatorSubscriber.x)(subscriber,endThrottling,cleanupThrottling))},send=function(){if(hasValue){hasValue=!1;var value=sendValue;sendValue=null,subscriber.next(value),!isComplete&&startThrottle(value)}};source.subscribe((0,OperatorSubscriber.x)(subscriber,(function(value){hasValue=!0,sendValue=value,(!throttled||throttled.closed)&&(leading?send():startThrottle(value))}),(function(){isComplete=!0,(!(trailing&&hasValue&&throttled)||throttled.closed)&&subscriber.complete()})))}))}((function(){return duration$}),config)}},"./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_record_preview_title_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.ts"),_geonetwork_ui_ui_elements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/elements/src/index.ts"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/util/shared/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/util/i18n/src/index.ts"),_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/ui/dataviz/src/index.ts"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./libs/common/fixtures/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Search/RecordPreviewTitleComponent",component:_record_preview_title_component__WEBPACK_IMPORTED_MODULE_1__._,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[_geonetwork_ui_ui_elements__WEBPACK_IMPORTED_MODULE_2__.Zl],imports:[_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_4__.fR),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__.Lt,_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_5__.CP]})]},Primary={args:{record:_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_6__.XQ[0],linkTarget:"_blank"}}},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: inherit;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/table/table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"table {\n  width: 100%;\n  background: white;\n}\nth.mat-mdc-header-cell,\ntd.mat-mdc-cell,\ntd.mat-mdc-footer-cell {\n  padding-right: 20px;\n}\ntr.mat-mdc-row,\ntr.mat-mdc-footer-row {\n  height: 36px;\n}\ntr:hover {\n  background: whitesmoke;\n}\ntr.mat-mdc-header-row {\n  height: 48px;\n}\n\n[mat-header-cell] {\n  color: #0000008a;\n  font-size: 12px;\n  font-weight: 500;\n}\ntr {\n  cursor: pointer;\n}\n\n.active .mat-mdc-cell {\n  color: var(--color-primary);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);