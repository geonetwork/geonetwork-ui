(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[3371],{"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A5:()=>_lib_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_0__.A,Qe:()=>_lib_chart_chart_component__WEBPACK_IMPORTED_MODULE_1__.Q,up:()=>_lib_data_table_data_table_component__WEBPACK_IMPORTED_MODULE_2__.u});var _lib_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),_lib_chart_chart_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),_lib_data_table_data_table_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.component.ts");__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.fixtures.ts"),__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts")},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.t1.register(chart.A6,chart.E8,chart.PP,chart.kc,chart.ZT,chart.No,chart.FN,chart.P$,chart.Bs,chart.Pz,chart.m_,chart.Jy,chart.s$);let ChartComponent=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.t1(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}static{this.propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]}}};ChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{x:()=>RecordPreviewListComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_list_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.scss?ngResource"),record_preview_list_componentngResource_default=__webpack_require__.n(record_preview_list_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewListComponent=class RecordPreviewListComponent extends record_preview_component.v{};RecordPreviewListComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-record-preview-list",template:'<div\n  class="h-40 bg-white transition duration-200 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-primary hover:text-primary"\n>\n  <a\n    [href]="record.landingPage"\n    [target]="linkTarget"\n    [title]="record.abstract"\n  >\n    <div class="h-full flex flex-row items-center shadow-sm">\n      <gn-ui-thumbnail\n        class="w-40 h-full shrink-0 border-r border-gray-200 bg-gray-100"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n\n      <div class="grow h-full px-6 py-4 flex flex-col overflow-hidden">\n        <div class="title-font text-lg font-medium mb-2">\n          <h1 class="truncate">{{ record.title }}</h1>\n        </div>\n        <p class="leading-relaxed clamp-3 text-sm text-gray-700">\n          {{ record.abstract }}\n        </p>\n        <div class="grow"></div>\n        <div class="flex flex-row items-center">\n          <div\n            class="text-gray-500 text-xs truncate capitalize border-r mr-4 pr-4"\n            *ngIf="record.kind === \'dataset\'"\n          >\n            <span translate>{{ record.updateFrequency }}</span>\n          </div>\n          <div\n            class="text-gray-500 text-xs border-gray-300 truncate viewable-downloadable"\n            *ngIf="isViewable || isDownloadable"\n          >\n            <span *ngIf="isViewable" translate>record.action.view</span>\n            <span *ngIf="isViewable && isDownloadable">,&nbsp;</span>\n            <span *ngIf="isDownloadable" translate>record.action.download</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_list_componentngResource_default()]})],RecordPreviewListComponent)},"./libs/ui/search/src/lib/record-preview/record-preview.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{v:()=>RecordPreviewComponent});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/shared/src/index.ts"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");let RecordPreviewComponent=class RecordPreviewComponent{get isViewable(){return this.record.extras?.hasMaps}get isDownloadable(){return this.record.extras?.hasDownloads}get contact(){return this.record.contactsForResource?.[0]||this.record.contacts[0]}get organization(){return this.record.ownerOrganization}constructor(elementRef){this.elementRef=elementRef,this.linkTarget="_blank",this.linkHref=null,this.mdSelect=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter,this.subscription=new rxjs__WEBPACK_IMPORTED_MODULE_2__.yU}ngOnInit(){this.abstract=(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.KE)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.QZ)(this.record?.abstract)),this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.R)(this.elementRef.nativeElement,"click").subscribe((event=>{event.preventDefault(),(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.Y8)(event),this.mdSelect.emit(this.record)})))}ngOnDestroy(){this.subscription.unsubscribe()}static{this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef}]}static{this.propDecorators={record:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkTarget:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],favoriteTemplate:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkHref:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],metadataQualityDisplay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],mdSelect:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Output}]}}};RecordPreviewComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({selector:"gn-ui-record-preview",template:""}),(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef])],RecordPreviewComponent)},"./libs/ui/widgets/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{OR:()=>loading_mask_component.O,r3:()=>popover_component.r,oz:()=>popup_alert_component.o,aD:()=>progress_bar_component.a,n0:()=>spinning_loader_component.n,Gi:()=>UiWidgetsModule});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),ngx_dropzone=__webpack_require__("./node_modules/ngx-dropzone/fesm2020/ngx-dropzone.mjs"),color_scale_component=__webpack_require__("./libs/ui/widgets/src/lib/color-scale/color-scale.component.ts"),ngx_chips=__webpack_require__("./node_modules/ngx-chips/fesm2020/ngx-chips.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),progress_spinner=__webpack_require__("./node_modules/@angular/material/fesm2022/progress-spinner.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let UiWidgetsModule=class UiWidgetsModule{};UiWidgetsModule=(0,tslib_es6.Cg)([(0,core.NgModule)({declarations:[color_scale_component.r],imports:[common.CommonModule,ngx_translate_core.h.forChild(),ngx_dropzone.Fg,fesm2022_forms.YN,fesm2022_forms.X1,ngx_chips.bh,src.ek,progress_spinner.D6],exports:[]})],UiWidgetsModule);var progress_bar_component=__webpack_require__("./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.ts"),popover_component=__webpack_require__("./libs/ui/widgets/src/lib/popover/popover.component.ts"),loading_mask_component=__webpack_require__("./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.ts"),popup_alert_component=__webpack_require__("./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.ts"),spinning_loader_component=__webpack_require__("./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.ts")},"./libs/ui/widgets/src/lib/color-scale/color-scale.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ColorScaleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var color_scale_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/color-scale/color-scale.component.css?ngResource"),color_scale_componentngResource_default=__webpack_require__.n(color_scale_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ColorScaleComponent=class ColorScaleComponent{};ColorScaleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-color-scale",template:'<div class="flex flex-row items-center">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">primary</div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-black"\n    title="primary-black"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-darkest"\n    title="primary-darkest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-darker"\n    title="primary-darker"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary border-2 border-primary-darkest"\n    title="primary"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-lighter"\n    title="primary-lighter"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-lightest"\n    title="primary-lightest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-white"\n    title="primary-white"\n  ></div>\n</div>\n<div class="flex flex-row">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">\n    secondary\n  </div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-black"\n    title="secondary-black"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-darkest"\n    title="secondary-darkest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-darker"\n    title="secondary-darker"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary border-2 border-secondary-darkest"\n    title="secondary"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-lighter"\n    title="secondary-lighter"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-lightest"\n    title="secondary-lightest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-white"\n    title="secondary-white"\n  ></div>\n</div>\n<div class="flex flex-row">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">main</div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-main" title="main"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-900" title="gray-900"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-800" title="gray-800"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-700" title="gray-700"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-600" title="gray-600"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-500" title="gray-500"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-400" title="gray-400"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-300" title="gray-300"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-200" title="gray-200"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-100" title="gray-100"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-50" title="gray-50"></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-background"\n    title="background"\n  ></div>\n  <div class="text-xs text-gray-700 font-bold m-2 w-32">background</div>\n</div>\n',styles:[color_scale_componentngResource_default()]})],ColorScaleComponent)},"./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>LoadingMaskComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var loading_mask_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.css?ngResource"),loading_mask_componentngResource_default=__webpack_require__.n(loading_mask_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),progress_spinner=__webpack_require__("./node_modules/@angular/material/fesm2022/progress-spinner.mjs");let LoadingMaskComponent=class LoadingMaskComponent{static{this.propDecorators={message:[{type:core.Input}]}}};LoadingMaskComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-loading-mask",template:'<div class="h-full flex flex-col justify-center items-center relative backdrop">\n  <div class="absolute background bg-white inset-0"></div>\n  <mat-spinner [diameter]="28" class="relative"></mat-spinner>\n  <span class="text-sm text-gray-700 mt-3 relative">{{ message }}</span>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[progress_spinner.D6],standalone:!0,styles:[loading_mask_componentngResource_default()]})],LoadingMaskComponent)},"./libs/ui/widgets/src/lib/popover/popover.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>PopoverComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var popover_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/popover/popover.component.css?ngResource"),popover_componentngResource_default=__webpack_require__.n(popover_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tippy_esm=__webpack_require__("./node_modules/tippy.js/dist/tippy.esm.js");let PopoverComponent=class PopoverComponent{constructor(viewContainerRef,renderer){this.viewContainerRef=viewContainerRef,this.renderer=renderer}getContent(){if(this.content instanceof core.TemplateRef){this.view&&this.view.destroy(),this.view=this.viewContainerRef.createEmbeddedView(this.content),this.view.detectChanges();const wrapper=this.renderer.createElement("div");return this.view.rootNodes.forEach((node=>{this.renderer.appendChild(wrapper,node)})),wrapper}return this.content}ngAfterViewInit(){this.tippyInstance=(0,tippy_esm.Ay)(this.popoverContent.nativeElement,{content:this.getContent(),allowHTML:!0,theme:this.theme})}ngOnChanges(changes){changes.theme&&(this.theme=changes.theme.currentValue,this.tippyInstance&&this.tippyInstance.setProps({theme:this.theme})),changes.content&&(this.content=changes.content.currentValue,this.tippyInstance&&this.tippyInstance.setContent(this.getContent()))}ngOnDestroy(){this.tippyInstance&&this.tippyInstance.destroy(),this.view&&this.view.destroy()}static{this.ctorParameters=()=>[{type:core.ViewContainerRef},{type:core.Renderer2}]}static{this.propDecorators={popoverContent:[{type:core.ViewChild,args:["popoverContent",{static:!1}]}],content:[{type:core.Input}],theme:[{type:core.Input}]}}};PopoverComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-popover",template:"<span #popoverContent>\n  <ng-content></ng-content>\n</span>\n",standalone:!0,imports:[common.CommonModule],styles:[popover_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ViewContainerRef,core.Renderer2])],PopoverComponent)},"./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>PopupAlertComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var popup_alert_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.css?ngResource"),popup_alert_componentngResource_default=__webpack_require__.n(popup_alert_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_material_icons_outline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-outline.mjs");let PopupAlertComponent=class PopupAlertComponent{constructor(changeDetector){this.changeDetector=changeDetector,this.type="info",this.position="top",this.expanded=!1,this.timeout=null}get showDuration(){const chars=this.content.nativeElement.innerHTML.length;return Math.max(3e3,20*chars)}ngOnInit(){this.expandAndClose()}expand(){this.expanded=!0,this.changeDetector.detectChanges(),clearTimeout(this.timeout)}expandAndClose(){this.expanded=!0,this.changeDetector.detectChanges(),clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.expanded=!1,this.changeDetector.detectChanges()}),this.showDuration)}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef}]}static{this.propDecorators={icon:[{type:core.Input}],type:[{type:core.Input}],position:[{type:core.Input}],content:[{type:core.ViewChild,args:["content"]}]}}};PopupAlertComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-popup-alert",template:"<div class=\"h-full relative container\">\n  <div\n    class=\"pointer-events-auto absolute text-white flex flex-row p-2 rounded message\"\n    role=\"alert\"\n    [ngClass]=\"{\n      'position-bottom': position === 'bottom',\n      'position-top': position === 'top',\n      expanded: this.expanded,\n      'bg-red-500': type === 'danger',\n      'bg-yellow-500': type === 'warning',\n      'bg-blue-500': type === 'info',\n    }\"\n    (mouseenter)=\"expand()\"\n    (mouseleave)=\"expandAndClose()\"\n  >\n    <ng-icon class=\"mr-2 shrink-0 select-none\" [name]=\"icon\"></ng-icon>\n    <div class=\"grow\" #content [ngClass]=\"{ invisible: !expanded }\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({matErrorOutlineOutline:ng_icons_material_icons_outline.Bak})],styles:[popup_alert_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],PopupAlertComponent)},"./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ProgressBarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var progress_bar_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.css?ngResource"),progress_bar_componentngResource_default=__webpack_require__.n(progress_bar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ProgressBarComponent=class ProgressBarComponent{constructor(){this.value=0,this.type="default"}get progress(){return this.value>0?this.value<100?this.value:100:0}get color(){switch(this.type){case"default":return{outerBar:"bg-gray-200",innerBar:"bg-gray-100",text:"text-gray-900"};case"primary":return{outerBar:"bg-primary",innerBar:"bg-primary-lighter",text:"text-white"};case"secondary":return{outerBar:"bg-secondary",innerBar:"bg-secondary-lighter",text:"text-white"}}}static{this.propDecorators={value:[{type:core.Input}],type:[{type:core.Input}]}}};ProgressBarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-progress-bar",template:'<div class="flex h-full {{ color.outerBar }} rounded-t-lg rounded-b-lg">\n  <div\n    [style.width.%]="progress"\n    class="flex {{\n      color.innerBar\n    }} my-1 mx-1 transition-width duration-500 ease-in-out rounded-t-md rounded-b-md shadow-xl"\n  >\n    <div class="flex items-center pl-2 py-1 {{ color.text }} font-bold text-4">\n      {{ progress }}%\n    </div>\n  </div>\n</div>\n',standalone:!0,styles:[progress_bar_componentngResource_default()]})],ProgressBarComponent)},"./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>SpinningLoaderComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var spinning_loader_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.css?ngResource"),spinning_loader_componentngResource_default=__webpack_require__.n(spinning_loader_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SpinningLoaderComponent=class SpinningLoaderComponent{};SpinningLoaderComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-spinning-loader",template:'<span>\n  <svg\n    class="animate-spin h-8 w-8 text-primary"\n    xmlns="http://www.w3.org/2000/svg"\n    fill="none"\n    viewBox="0 0 24 24"\n  >\n    <circle\n      class="opacity-25"\n      cx="12"\n      cy="12"\n      r="10"\n      stroke="currentColor"\n      stroke-width="4"\n    ></circle>\n    <path\n      class="opacity-75"\n      fill="currentColor"\n      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"\n    ></path>\n  </svg>\n</span>\n',standalone:!0,styles:[spinning_loader_componentngResource_default()]})],SpinningLoaderComponent)},"./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_record_preview_list_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.ts"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/shared/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/util/i18n/src/index.ts"),_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/ui/dataviz/src/index.ts"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/common/fixtures/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Search/RecordPreviewListComponent",component:_record_preview_list_component__WEBPACK_IMPORTED_MODULE_1__.x,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_3__.sU),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_2__.ek,_geonetwork_ui_ui_dataviz__WEBPACK_IMPORTED_MODULE_4__.A5]})]},Primary={args:{record:(0,_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_5__._K)()[0],linkTarget:"_blank"}},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    record: datasetRecordsFixture()[0] as CatalogRecord,\n    linkTarget: '_blank'\n  }\n}",...Primary.parameters?.docs?.source}}}},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/color-scale/color-scale.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* this overrides the spinner color with a CSS variable to match the theme */\n::ng-deep .mat-spinner circle {\n  stroke: var(--color-gray-700);\n  opacity: 0.5;\n}\n\n.backdrop {\n  background-color: rgba(255, 255, 255, 0.4);\n}\n\n@supports ((-webkit-backdrop-filter: blur()) or (backdrop-filter: blur())) {\n  .backdrop {\n    background-color: transparent;\n    -webkit-backdrop-filter: blur(4px);\n            backdrop-filter: blur(4px);\n  }\n}\n\n.background {\n  opacity: 0.7;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/popover/popover.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  pointer-events: none;\n}\n.container {\n  filter: drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2));\n}\n.message {\n  transition: clip-path 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.message.expanded {\n  clip-path: circle(100%);\n}\n.position-top {\n  clip-path: circle(19px at 20px 20px);\n  align-items: start;\n  top: 0;\n  left: 0;\n}\n.position-bottom {\n  clip-path: circle(19px at 20px calc(100% - 20px));\n  align-items: end;\n  bottom: 0;\n  left: 0;\n}\n\n/* style links inside message */\n.container ::ng-deep a {\n  text-decoration: underline;\n  font-weight: bold;\n}\n.container ::ng-deep a:hover {\n  opacity: 0.85;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".font-bold {\n  font-weight: var(--progress-bar-font-weight, 'bold');\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".viewable-downloadable :first-child {\n  text-transform: capitalize;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);