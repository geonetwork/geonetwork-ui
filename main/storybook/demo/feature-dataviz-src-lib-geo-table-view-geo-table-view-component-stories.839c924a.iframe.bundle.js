(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[6736],{"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{xH:()=>chart_component.x,Vf:()=>TABLE_ITEM_FIXTURE,k4:()=>TABLE_ITEM_FIXTURE_HAB,ac:()=>table_component.a,CP:()=>ui_dataviz_module.C});var ui_dataviz_module=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),chart_component=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),table_component=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.ts");const TABLE_ITEM_FIXTURE=[{name:"name 1",id:"id 1",age:15},{name:"name 2",id:"id 2",age:10},{name:"name 3",id:"id 3",age:55}],TABLE_ITEM_FIXTURE_HAB=[{name:"France",id:"1",pop:505e5},{name:"Italy",id:"2",pop:155878789655},{name:"UK",id:"3",pop:31522456},{name:"US",id:"4",pop:3215448888}];__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts")},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{x:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.kL.register(chart.vn,chart.ZL,chart.uw,chart.f$,chart.ST,chart.jn,chart.od,chart.tt,chart.qi,chart.ho,chart.u,chart.wL,chart.De);let ChartComponent=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.kL(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.Z)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}static#_=this.propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]}};ChartComponent=(0,tslib_es6.gn)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./libs/ui/dataviz/src/lib/figure/figure.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>FigureComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var figure_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource"),figure_componentngResource_default=__webpack_require__.n(figure_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FigureComponent=class FigureComponent{constructor(){this.color="primary"}get hoverTitle(){return`${this.figure.toString()} ${this.unit||""}\n${this.title}`}get textClass(){return"primary"===this.color?"text-primary":"text-secondary"}get bgClass(){return"primary"===this.color?"bg-primary-white":"bg-secondary-white"}static#_=this.propDecorators={icon:[{type:core.Input}],title:[{type:core.Input}],figure:[{type:core.Input}],unit:[{type:core.Input}],color:[{type:core.Input}]}};FigureComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-figure",template:'<div\n  translate\n  class="flex flex-row justify-start items-center overflow-hidden"\n  [title]="hoverTitle"\n>\n  <mat-icon\n    class="material-symbols-outlined {{ bgClass }} {{\n      textClass\n    }} text-[1.875em] rounded-full mr-[0.55em] p-[0.6em] w-[2.2em] h-[2.2em] shrink-0"\n    style="width: 2.2em; height: 2.2em"\n  >\n    {{ icon }}\n  </mat-icon>\n  <div class="shrink overflow-hidden">\n    <div class="figure-block text-[1.5em] text-black">\n      <span class="figure font-medium mr-[0.3em]">{{ figure }}</span>\n      <span class="unit text-[0.665em]">{{ unit }}</span>\n    </div>\n    <div translate class="title truncate" [translateParams]="{ count: figure }">\n      {{ title }}\n    </div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[figure_componentngResource_default()]})],FigureComponent)},"./libs/ui/dataviz/src/lib/table/table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>TableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var table_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.css?ngResource"),table_componentngResource_default=__webpack_require__.n(table_componentngResource),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),sort=__webpack_require__("./node_modules/@angular/material/fesm2022/sort.mjs"),table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),ng_table_virtual_scroll=__webpack_require__("./node_modules/ng-table-virtual-scroll/fesm2020/ng-table-virtual-scroll.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs");let TableComponent=class TableComponent{set data(value){this.dataSource=new ng_table_virtual_scroll.kL(value),this.dataSource.sort=this.sort,this.properties=Array.isArray(value)&&value.length?Object.keys(value[0]):[],this.count=value.length}constructor(eltRef){this.eltRef=eltRef,this.selected=new core.EventEmitter}ngAfterViewInit(){this.headerHeight=this.eltRef.nativeElement.querySelector("thead").offsetHeight}scrollToItem(itemId){const row=this.eltRef.nativeElement.querySelector(`#${this.getRowEltId(itemId)}`);this.eltRef.nativeElement.scrollTop=row.offsetTop-this.headerHeight}getRowEltId(id){return"table-item-"+id}static#_=this.ctorParameters=()=>[{type:core.ElementRef}];static#_2=this.propDecorators={data:[{type:core.Input}],activeId:[{type:core.Input}],selected:[{type:core.Output}],sort:[{type:core.ViewChild,args:[sort.YE,{static:!0}]}]}};TableComponent=(0,tslib_es6.gn)([(0,core.Component)({standalone:!0,imports:[table.p0,sort.JX,ng_table_virtual_scroll.oJ,scrolling.Cl,common.NgForOf,ngx_translate_core.aw],selector:"gn-ui-table",template:'<div class="border border-gray-300 rounded-lg overflow-hidden bg-white h-full">\n  <cdk-virtual-scroll-viewport\n    tvsItemSize="48"\n    headerHeight="56"\n    style="height: calc(100% - 37px)"\n  >\n    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>\n      <ng-container *ngFor="let prop of properties" [matColumnDef]="prop">\n        <th\n          mat-header-cell\n          *matHeaderCellDef\n          mat-sort-header\n          class="text-sm text-black bg-white"\n        >\n          {{ prop }}\n        </th>\n        <td\n          mat-cell\n          *matCellDef="let element"\n          class="whitespace-nowrap pr-1 truncate"\n        >\n          {{ element[prop] }}\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef="properties; sticky: true"></tr>\n      <tr\n        [id]="getRowEltId(row.id)"\n        mat-row\n        *matRowDef="let row; columns: properties"\n        (click)="selected.emit(row)"\n        [class.active]="row.id === activeId"\n      ></tr>\n    </table>\n  </cdk-virtual-scroll-viewport>\n  <div class="text-gray-900 border-t border-gray-300 px-4 py-2 text-sm">\n    <span class="count font-extrabold text-primary">{{ count }}</span\n    >&nbsp;<span translate>table.object.count</span>.\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[table_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ElementRef])],TableComponent)},"./libs/ui/dataviz/src/lib/ui-dataviz.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{C:()=>UiDatavizModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs");let UiDatavizModule=class UiDatavizModule{};UiDatavizModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.Ps,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.aw.forChild()],declarations:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.D],exports:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.D]})],UiDatavizModule)},"./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_geonetwork_ui_feature_map__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/feature/map/src/index.ts"),_geonetwork_ui_ui_layout__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/layout/src/index.ts"),_geonetwork_ui_ui_map__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/map/src/index.ts"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_geo_table_view_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Map/GeoTable",component:_geo_table_view_component__WEBPACK_IMPORTED_MODULE_5__.b,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_4__.moduleMetadata)({imports:[_geonetwork_ui_ui_map__WEBPACK_IMPORTED_MODULE_2__.cS,_geonetwork_ui_ui_layout__WEBPACK_IMPORTED_MODULE_1__.Pz,_geonetwork_ui_feature_map__WEBPACK_IMPORTED_MODULE_0__.YC,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_3__.fR)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_4__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__.BrowserAnimationsModule,_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.JF)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_4__.componentWrapperDecorator)((story=>`<div style="height: 400px">${story}</div>`))]}},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: inherit;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/table/table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"table {\n  width: 100%;\n  background: white;\n}\nth.mat-mdc-header-cell,\ntd.mat-mdc-cell,\ntd.mat-mdc-footer-cell {\n  padding-right: 20px;\n}\ntr.mat-mdc-row,\ntr.mat-mdc-footer-row {\n  height: 36px;\n}\ntr:hover {\n  background: whitesmoke;\n}\ntr.mat-mdc-header-row {\n  height: 48px;\n}\n\n[mat-header-cell] {\n  color: #0000008a;\n  font-size: 12px;\n  font-weight: 500;\n}\ntr {\n  cursor: pointer;\n}\n\n.active .mat-mdc-cell {\n  color: var(--color-primary);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);