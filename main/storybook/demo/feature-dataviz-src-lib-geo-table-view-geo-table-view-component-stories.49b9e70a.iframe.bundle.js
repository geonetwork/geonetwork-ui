(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[4120],{"./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{i:()=>GeoTableViewComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var geo_table_view_componentngResource=__webpack_require__("./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.css?ngResource"),geo_table_view_componentngResource_default=__webpack_require__.n(geo_table_view_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),Subscription=(__webpack_require__("./libs/ui/dataviz/src/index.ts"),__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"));__webpack_require__("./libs/ui/map/src/index.ts");let GeoTableViewComponent=class GeoTableViewComponent{get features(){return this.data.features}constructor(changeRef){this.changeRef=changeRef,this.data={type:"FeatureCollection",features:[]},this.subscription=new Subscription.yU}ngOnInit(){this.tableData=this.geojsonToTableData(this.data),this.mapContext=this.initMapContext()}onTableSelect(tableEntry){const{id}=tableEntry;this.selectionId=id,this.selection=this.getFeatureFromId(id),this.selection&&this.animateToFeature(this.selection)}onMapFeatureSelect(features){this.selection=features?.length>0&&features[0],this.selection&&(this.selectionId=this.selection.id,this.changeRef.detectChanges(),this.uiTable.scrollToItem(this.selectionId))}geojsonToTableData(geojson){return geojson.features.map((f=>({id:f.id,...f.properties})))}initMapContext(){return{layers:[{type:"xyz",url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"},{type:"geojson",data:this.data}],view:{center:[0,0],zoom:2}}}animateToFeature(feature){this.mapContext={...this.mapContext,view:{geometry:feature.geometry,maxZoom:13}}}getFeatureFromId(id){return this.features.find((feature=>feature.id===id))}ngOnDestroy(){this.subscription.unsubscribe()}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef}];static#_2=this.propDecorators={data:[{type:core.Input}],uiTable:[{type:core.ViewChild,args:["table"]}],mapContainer:[{type:core.ViewChild,args:["mapContainer"]}]}};GeoTableViewComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-geo-table-view",template:'<div class="flex flex-row h-full overflow-auto">\n  <gn-ui-table\n    #table\n    class="w-1/2 overflow-auto"\n    [data]="tableData"\n    [activeId]="selectionId"\n    (selected)="onTableSelect($event)"\n  ></gn-ui-table>\n  <gn-ui-map-container\n    #mapContainer\n    class="w-1/2 h-full"\n    [context]="mapContext"\n    (featuresClick)="onMapFeatureSelect($event)"\n  ></gn-ui-map-container>\n  <gn-ui-feature-detail\n    style="width: 300px"\n    class="p-3 shrink-0 overflow-auto"\n    [feature]="selection"\n  ></gn-ui-feature-detail>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[geo_table_view_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],GeoTableViewComponent)},"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Qe:()=>chart_component.Q,Or:()=>table_component.O,A5:()=>ui_dataviz_module.A,g$:()=>someHabTableItemFixture,ly:()=>tableItemFixture});var ui_dataviz_module=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),chart_component=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),table_component=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.ts");const tableItemFixture=()=>[{name:"name 1",id:"id 1",age:15},{name:"name 2",id:"id 2",age:10},{name:"name 3",id:"id 3",age:55}],someHabTableItemFixture=()=>[{name:"France",id:"1",pop:505e5},{name:"Italy",id:"2",pop:155878789655},{name:"UK",id:"3",pop:31522456},{name:"US",id:"4",pop:3215448888}];__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts")},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.t1.register(chart.A6,chart.E8,chart.PP,chart.kc,chart.ZT,chart.No,chart.FN,chart.P$,chart.Bs,chart.Pz,chart.m_,chart.Jy,chart.s$);let ChartComponent=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.t1(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}static#_=this.propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]}};ChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./libs/ui/dataviz/src/lib/figure/figure.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>FigureComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var figure_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource"),figure_componentngResource_default=__webpack_require__.n(figure_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FigureComponent=class FigureComponent{constructor(){this.unit="",this.color="primary"}get textClass(){return"primary"===this.color?"text-primary":"text-secondary"}get bgClass(){return"primary"===this.color?"bg-primary-white":"bg-secondary-white"}static#_=this.propDecorators={icon:[{type:core.Input}],title:[{type:core.Input}],figure:[{type:core.Input}],unit:[{type:core.Input}],color:[{type:core.Input}]}};FigureComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-figure",template:'<div\n  class="flex flex-row justify-start items-center overflow-hidden"\n  data-test="figureTitle"\n  [title]="\n    figure.toString() +\n    \' \' +\n    unit +\n    \' \' +\n    (title | translate: { count: figure })\n  "\n>\n  <ng-icon\n    class="{{ bgClass }} {{\n      textClass\n    }} text-[1.875em] rounded-full mr-[0.55em] p-[0.6em] w-[2.2em] h-[2.2em] shrink-0"\n    style="width: 2.2em; height: 2.2em"\n    [name]="icon"\n  >\n  </ng-icon>\n  <div class="shrink overflow-hidden">\n    <div class="figure-block text-[1.5em] text-black">\n      <span class="figure font-medium mr-[0.3em]" data-test="figure">{{\n        figure\n      }}</span>\n      <span class="unit text-[0.665em]">{{ unit }}</span>\n    </div>\n    <div translate class="title truncate" [translateParams]="{ count: figure }">\n      {{ title }}\n    </div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[figure_componentngResource_default()]})],FigureComponent)},"./libs/ui/dataviz/src/lib/table/table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>TableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var table_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/table/table.component.css?ngResource"),table_componentngResource_default=__webpack_require__.n(table_componentngResource),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),sort=__webpack_require__("./node_modules/@angular/material/fesm2022/sort.mjs"),table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),ng_table_virtual_scroll=__webpack_require__("./node_modules/ng-table-virtual-scroll/fesm2020/ng-table-virtual-scroll.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs");let TableComponent=class TableComponent{set data(value){this.dataSource=new ng_table_virtual_scroll.ap(value),this.dataSource.sort=this.sort,this.properties=Array.isArray(value)&&value.length?Object.keys(value[0]):[],this.count=value.length}constructor(eltRef){this.eltRef=eltRef,this.selected=new core.EventEmitter}ngAfterViewInit(){this.headerHeight=this.eltRef.nativeElement.querySelector("thead").offsetHeight}scrollToItem(itemId){const row=this.eltRef.nativeElement.querySelector(`#${this.getRowEltId(itemId)}`);this.eltRef.nativeElement.scrollTop=row.offsetTop-this.headerHeight}getRowEltId(id){return"table-item-"+id}static#_=this.ctorParameters=()=>[{type:core.ElementRef}];static#_2=this.propDecorators={data:[{type:core.Input}],activeId:[{type:core.Input}],selected:[{type:core.Output}],sort:[{type:core.ViewChild,args:[sort.B4,{static:!0}]}]}};TableComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,imports:[table.tP,sort.NQ,ng_table_virtual_scroll.VL,scrolling.E9,common.NgForOf,ngx_translate_core.h],selector:"gn-ui-table",template:'<div class="border border-gray-300 rounded-lg overflow-hidden bg-white h-full">\n  <cdk-virtual-scroll-viewport\n    tvsItemSize="48"\n    headerHeight="56"\n    style="height: calc(100% - 37px)"\n  >\n    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>\n      <ng-container *ngFor="let prop of properties" [matColumnDef]="prop">\n        <th\n          mat-header-cell\n          *matHeaderCellDef\n          mat-sort-header\n          class="text-sm text-black bg-white"\n        >\n          {{ prop }}\n        </th>\n        <td\n          mat-cell\n          *matCellDef="let element"\n          class="whitespace-nowrap pr-1 truncate"\n        >\n          {{ element[prop] }}\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef="properties; sticky: true"></tr>\n      <tr\n        [id]="getRowEltId(row.id)"\n        mat-row\n        *matRowDef="let row; columns: properties"\n        (click)="selected.emit(row)"\n        [class.active]="row.id === activeId"\n      ></tr>\n    </table>\n  </cdk-virtual-scroll-viewport>\n  <div class="text-gray-900 border-t border-gray-300 px-4 py-2 text-sm">\n    <span class="count font-extrabold text-primary">{{ count }}</span\n    >&nbsp;<span translate>table.object.count</span>.\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[table_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ElementRef])],TableComponent)},"./libs/ui/dataviz/src/lib/ui-dataviz.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>UiDatavizModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),_ng_icons_material_icons_baseline__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-baseline.mjs"),_ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@ng-icons/tabler-icons/fesm2022/ng-icons-tabler-icons.mjs");let UiDatavizModule=class UiDatavizModule{};UiDatavizModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.h.forChild(),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.i6.withIcons({matCorporateFare:_ng_icons_material_icons_baseline__WEBPACK_IMPORTED_MODULE_6__.MB9,tablerFolderOpen:_ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_7__.B7Z})],providers:[(0,_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.PG)({size:"1.5em"})],declarations:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.Q],exports:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.Q]})],UiDatavizModule)},"./libs/ui/map/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{X4:()=>FeatureDetailComponent,LE:()=>map_container_component.L,Uc:()=>prioritizePageScroll});var map_container_component=__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-container.component.ts"),tslib_es6=(__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-settings.token.ts"),__webpack_require__("./node_modules/tslib/tslib.es6.mjs"));var feature_detail_componentngResource=__webpack_require__("./libs/ui/map/src/lib/components/feature-detail/feature-detail.component.css?ngResource"),feature_detail_componentngResource_default=__webpack_require__.n(feature_detail_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");const geometryKeys=["geometry","the_geom"];let FeatureDetailComponent=class FeatureDetailComponent{get properties(){return this.feature?Object.keys(this.feature.properties).filter((prop=>!geometryKeys.includes(prop))):[]}static#_=this.propDecorators={feature:[{type:core.Input}]}};FeatureDetailComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-feature-detail",template:'<div *ngIf="feature" class="root">\n  <div class="property" *ngFor="let propName of properties">\n    <div>{{ propName }}</div>\n    <div class="font-bold">{{ feature.properties[propName] }}</div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule],styles:[feature_detail_componentngResource_default()]})],FeatureDetailComponent);var defaults=__webpack_require__("./node_modules/ol/interaction/defaults.js"),DragPan=__webpack_require__("./node_modules/ol/interaction/DragPan.js"),MouseWheelZoom=__webpack_require__("./node_modules/ol/interaction/MouseWheelZoom.js"),condition=__webpack_require__("./node_modules/ol/events/condition.js");function prioritizePageScroll(interactions){interactions.clear(),interactions.extend((0,defaults.N)({altShiftDragRotate:!1,pinchRotate:!1,dragPan:!1,mouseWheelZoom:!1}).extend([new DragPan.A({condition:dragPanCondition}),new MouseWheelZoom.A({condition:mouseWheelZoomCondition})]).getArray())}function dragPanCondition(event){const dragPanCondition=2===this.getPointerCount()||(0,condition.A4)(event);return dragPanCondition||this.getMap().dispatchEvent("mapmuted"),dragPanCondition&&(0,condition.TS)(event)&&(0,condition.fs)(event)}function mouseWheelZoomCondition(event){return(0,condition.k5)(event)||"wheel"!==event.type||this.getMap().dispatchEvent("mapmuted"),(0,condition.k5)(event)}},"./libs/ui/map/src/lib/components/map-container/map-container.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{L:()=>MapContainerComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var map_container_componentngResource=__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-container.component.css?ngResource"),map_container_componentngResource_default=__webpack_require__.n(map_container_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),merge=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/merge.js"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),startWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/startWith.js"),delay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/delay.js"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),dist=__webpack_require__("./node_modules/@geospatial-sdk/core/dist/index.js"),openlayers_dist=__webpack_require__("./node_modules/@geospatial-sdk/openlayers/dist/index.js"),map_settings_token=__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-settings.token.ts"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_material_icons_outline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-outline.mjs");const DEFAULT_BASEMAP_LAYER={type:"xyz",url:"https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",attributions:'<span>© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a></span>'},DEFAULT_VIEW={center:[0,15],zoom:2};let MapContainerComponent=class MapContainerComponent{get featuresClick(){return this._featuresClick||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.QS,(({features})=>this._featuresClick.emit(features)))})),this._featuresClick=new core.EventEmitter),this._featuresClick}get featuresHover(){return this._featuresHover||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.UH,(({features})=>this._featuresHover.emit(features)))})),this._featuresHover=new core.EventEmitter),this._featuresHover}get mapClick(){return this._mapClick||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.fD,(({coordinate})=>this._mapClick.emit(coordinate)))})),this._mapClick=new core.EventEmitter),this._mapClick}constructor(doNotUseDefaultBasemap,basemapLayers,mapViewConstraints){this.doNotUseDefaultBasemap=doNotUseDefaultBasemap,this.basemapLayers=basemapLayers,this.mapViewConstraints=mapViewConstraints,this.openlayersMap=new Promise((resolve=>{this.olMapResolver=resolve}))}ngAfterViewInit(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.olMap=yield(0,openlayers_dist.gJ)(_this.processContext(_this.context),_this.container.nativeElement),_this.displayMessage$=(0,merge.h)((0,fromEvent.R)(_this.olMap,"mapmuted").pipe((0,map.T)((()=>!0))),(0,fromEvent.R)(_this.olMap,"movestart").pipe((0,map.T)((()=>!1))),(0,fromEvent.R)(_this.olMap,"singleclick").pipe((0,map.T)((()=>!1)))).pipe((0,switchMap.n)((muted=>muted?(0,timer.O)(2e3).pipe((0,map.T)((()=>!1)),(0,startWith.Z)(!0),(0,delay.c)(400)):(0,of.of)(!1)))),_this.olMapResolver(_this.olMap)}))()}ngOnChanges(changes){var _this2=this;return(0,asyncToGenerator.A)((function*(){if("context"in changes&&!changes.context.isFirstChange()){const diff=(0,dist.mm)(_this2.processContext(changes.context.currentValue),_this2.processContext(changes.context.previousValue));yield(0,openlayers_dist.KP)(_this2.olMap,diff)}}))()}processContext(context){const processed=context?{...context,view:context.view??DEFAULT_VIEW}:{layers:[],view:DEFAULT_VIEW};return this.basemapLayers.length&&(processed.layers=[...this.basemapLayers,...processed.layers]),this.doNotUseDefaultBasemap||(processed.layers=[DEFAULT_BASEMAP_LAYER,...processed.layers]),this.mapViewConstraints.maxZoom&&(processed.view={maxZoom:this.mapViewConstraints.maxZoom,...processed.view}),this.mapViewConstraints.maxExtent&&(processed.view={maxExtent:this.mapViewConstraints.maxExtent,...processed.view}),!processed.view||"zoom"in processed.view||"center"in processed.view||(this.mapViewConstraints.maxExtent?processed.view={extent:this.mapViewConstraints.maxExtent,...processed.view}:processed.view={...DEFAULT_VIEW,...processed.view}),processed}static#_=this.ctorParameters=()=>[{type:Boolean,decorators:[{type:core.Inject,args:[map_settings_token.Mo]}]},{type:Array,decorators:[{type:core.Inject,args:[map_settings_token.p0]}]},{type:void 0,decorators:[{type:core.Inject,args:[map_settings_token.ay]}]}];static#_2=this.propDecorators={context:[{type:core.Input}],featuresClick:[{type:core.Output}],featuresHover:[{type:core.Output}],mapClick:[{type:core.Output}],container:[{type:core.ViewChild,args:["map"]}]}};MapContainerComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-map-container",template:'<div class="h-full w-full" #map></div>\n<div\n  class="absolute inset-0 p-2 rounded z-40 transition-all flex flex-col justify-center items-center text-primary font-sans pointer-events-none"\n  [ngClass]="\n    (displayMessage$ | async) ? \'visible opacity-100\' : \'invisible opacity-0\'\n  "\n>\n  <div\n    class="absolute z-[-1] inset-0 bg-gradient-to-b from-white to-primary-lightest opacity-60"\n  ></div>\n  <ng-icon\n    class="!w-16 !h-16 text-[64px] mb-4"\n    name="matSwipeOutline"\n  ></ng-icon>\n  <p translate>map.navigation.message</p>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,ngx_translate_core.h,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({matSwipeOutline:ng_icons_material_icons_outline.RKP}),(0,ng_icons_core.PG)({size:"1.5em"})],styles:[map_container_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[Boolean,Array,Object])],MapContainerComponent)},"./libs/ui/map/src/lib/components/map-container/map-settings.token.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Mo:()=>DO_NOT_USE_DEFAULT_BASEMAP,ay:()=>MAP_VIEW_CONSTRAINTS,p0:()=>BASEMAP_LAYERS});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const DO_NOT_USE_DEFAULT_BASEMAP=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("doNotUseDefaultBasemap",{factory:()=>!1}),BASEMAP_LAYERS=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("basemapLayers",{factory:()=>[]}),MAP_VIEW_CONSTRAINTS=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("mapViewConstraints",{factory:()=>({})});new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("vectorStyleDefault",{factory:()=>({fill:{color:"rgba(255, 255, 255, 0.2)"},stroke:{color:"#ffcc33",width:2}})})},"./node_modules/rxjs/dist/esm5/internal/operators/delay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>delay});var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),_delayWhen__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js"),_observable_timer__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");function delay(due,scheduler){void 0===scheduler&&(scheduler=_scheduler_async__WEBPACK_IMPORTED_MODULE_0__.E);var duration=(0,_observable_timer__WEBPACK_IMPORTED_MODULE_1__.O)(due,scheduler);return(0,_delayWhen__WEBPACK_IMPORTED_MODULE_2__.o)((function(){return duration}))}},"./node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>delayWhen});var _observable_concat__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/concat.js"),_take__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),_ignoreElements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js"),_mapTo__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),_mergeMap__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),_observable_innerFrom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");function delayWhen(delayDurationSelector,subscriptionDelay){return subscriptionDelay?function(source){return(0,_observable_concat__WEBPACK_IMPORTED_MODULE_0__.x)(subscriptionDelay.pipe((0,_take__WEBPACK_IMPORTED_MODULE_1__.s)(1),(0,_ignoreElements__WEBPACK_IMPORTED_MODULE_2__.w)()),source.pipe(delayWhen(delayDurationSelector)))}:(0,_mergeMap__WEBPACK_IMPORTED_MODULE_3__.Z)((function(value,index){return(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_4__.Tg)(delayDurationSelector(value,index)).pipe((0,_take__WEBPACK_IMPORTED_MODULE_1__.s)(1),(0,_mapTo__WEBPACK_IMPORTED_MODULE_5__.u)(value))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{w:()=>ignoreElements});var _util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_util_noop__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/noop.js");function ignoreElements(){return(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,_util_noop__WEBPACK_IMPORTED_MODULE_2__.l))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>mapTo});var _map__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");function mapTo(value){return(0,_map__WEBPACK_IMPORTED_MODULE_0__.T)((function(){return value}))}},"./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_geo_table_view_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_geonetwork_ui_ui_map__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/map/src/index.ts"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/common/fixtures/src/index.ts"),_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/ui/dataviz/src/index.ts"),_angular_common_http__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/util/i18n/src/index.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Map/GeoTable",component:_geo_table_view_component__WEBPACK_IMPORTED_MODULE_1__.i,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_geonetwork_ui_ui_map__WEBPACK_IMPORTED_MODULE_2__.X4,_geonetwork_ui_ui_map__WEBPACK_IMPORTED_MODULE_2__.LE,_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_4__.Or,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.importProvidersFrom)(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_5__.sU)),(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.q1)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`<div style="height: 400px">${story}</div>`))]},Primary={args:{data:(0,_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_3__.G9)()}}},"./libs/feature/dataviz/src/lib/geo-table-view/geo-table-view.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: inherit;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/table/table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"table {\n  width: 100%;\n  background: white;\n}\nth.mat-mdc-header-cell,\ntd.mat-mdc-cell,\ntd.mat-mdc-footer-cell {\n  padding-right: 20px;\n}\ntr.mat-mdc-row,\ntr.mat-mdc-footer-row {\n  height: 36px;\n}\ntr:hover {\n  background: whitesmoke;\n}\ntr.mat-mdc-header-row {\n  height: 48px;\n}\n\n[mat-header-cell] {\n  color: #0000008a;\n  font-size: 12px;\n  font-weight: 500;\n}\ntr {\n  cursor: pointer;\n}\n\n.active .mat-mdc-cell {\n  color: var(--color-primary);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/map/src/lib/components/feature-detail/feature-detail.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".property {\n  border-bottom: 1px solid #f2f2f2;\n  padding-bottom: 0.625rem;\n  margin-bottom: 0.625rem;\n  font-size: 0.75rem;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/map/src/lib/components/map-container/map-container.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);