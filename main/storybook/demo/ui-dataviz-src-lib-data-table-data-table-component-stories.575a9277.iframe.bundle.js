(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[7124],{"./libs/ui/widgets/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{OR:()=>loading_mask_component.O,r3:()=>popover_component.r,oz:()=>popup_alert_component.o,aD:()=>progress_bar_component.a,n0:()=>spinning_loader_component.n,Gi:()=>UiWidgetsModule});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),ngx_dropzone=__webpack_require__("./node_modules/ngx-dropzone/fesm2020/ngx-dropzone.mjs"),color_scale_component=__webpack_require__("./libs/ui/widgets/src/lib/color-scale/color-scale.component.ts"),ngx_chips=__webpack_require__("./node_modules/ngx-chips/fesm2020/ngx-chips.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),progress_spinner=__webpack_require__("./node_modules/@angular/material/fesm2022/progress-spinner.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let UiWidgetsModule=class UiWidgetsModule{};UiWidgetsModule=(0,tslib_es6.Cg)([(0,core.NgModule)({declarations:[color_scale_component.r],imports:[common.CommonModule,ngx_translate_core.h.forChild(),ngx_dropzone.Fg,fesm2022_forms.YN,fesm2022_forms.X1,ngx_chips.bh,src.ek,progress_spinner.D6],exports:[]})],UiWidgetsModule);var progress_bar_component=__webpack_require__("./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.ts"),popover_component=__webpack_require__("./libs/ui/widgets/src/lib/popover/popover.component.ts"),loading_mask_component=__webpack_require__("./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.ts"),popup_alert_component=__webpack_require__("./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.ts"),spinning_loader_component=__webpack_require__("./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.ts")},"./libs/ui/widgets/src/lib/color-scale/color-scale.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ColorScaleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var color_scale_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/color-scale/color-scale.component.css?ngResource"),color_scale_componentngResource_default=__webpack_require__.n(color_scale_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ColorScaleComponent=class ColorScaleComponent{};ColorScaleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-color-scale",template:'<div class="flex flex-row items-center">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">primary</div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-black"\n    title="primary-black"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-darkest"\n    title="primary-darkest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-darker"\n    title="primary-darker"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary border-2 border-primary-darkest"\n    title="primary"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-lighter"\n    title="primary-lighter"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-lightest"\n    title="primary-lightest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-white"\n    title="primary-white"\n  ></div>\n</div>\n<div class="flex flex-row">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">\n    secondary\n  </div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-black"\n    title="secondary-black"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-darkest"\n    title="secondary-darkest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-darker"\n    title="secondary-darker"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary border-2 border-secondary-darkest"\n    title="secondary"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-lighter"\n    title="secondary-lighter"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-lightest"\n    title="secondary-lightest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-white"\n    title="secondary-white"\n  ></div>\n</div>\n<div class="flex flex-row">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">main</div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-main" title="main"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-900" title="gray-900"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-800" title="gray-800"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-700" title="gray-700"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-600" title="gray-600"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-500" title="gray-500"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-400" title="gray-400"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-300" title="gray-300"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-200" title="gray-200"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-100" title="gray-100"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-50" title="gray-50"></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-background"\n    title="background"\n  ></div>\n  <div class="text-xs text-gray-700 font-bold m-2 w-32">background</div>\n</div>\n',styles:[color_scale_componentngResource_default()]})],ColorScaleComponent)},"./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>LoadingMaskComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var loading_mask_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.css?ngResource"),loading_mask_componentngResource_default=__webpack_require__.n(loading_mask_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),progress_spinner=__webpack_require__("./node_modules/@angular/material/fesm2022/progress-spinner.mjs");let LoadingMaskComponent=class LoadingMaskComponent{static{this.propDecorators={message:[{type:core.Input}]}}};LoadingMaskComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-loading-mask",template:'<div class="h-full flex flex-col justify-center items-center relative backdrop">\n  <div class="absolute background bg-white inset-0"></div>\n  <mat-spinner [diameter]="28" class="relative"></mat-spinner>\n  <span class="text-sm text-gray-700 mt-3 relative">{{ message }}</span>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[progress_spinner.D6],standalone:!0,styles:[loading_mask_componentngResource_default()]})],LoadingMaskComponent)},"./libs/ui/widgets/src/lib/popover/popover.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>PopoverComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var popover_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/popover/popover.component.css?ngResource"),popover_componentngResource_default=__webpack_require__.n(popover_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tippy_esm=__webpack_require__("./node_modules/tippy.js/dist/tippy.esm.js");let PopoverComponent=class PopoverComponent{constructor(viewContainerRef,renderer){this.viewContainerRef=viewContainerRef,this.renderer=renderer}getContent(){if(this.content instanceof core.TemplateRef){this.view&&this.view.destroy(),this.view=this.viewContainerRef.createEmbeddedView(this.content),this.view.detectChanges();const wrapper=this.renderer.createElement("div");return this.view.rootNodes.forEach((node=>{this.renderer.appendChild(wrapper,node)})),wrapper}return this.content}ngAfterViewInit(){this.tippyInstance=(0,tippy_esm.Ay)(this.popoverContent.nativeElement,{content:this.getContent(),allowHTML:!0,theme:this.theme})}ngOnChanges(changes){changes.theme&&(this.theme=changes.theme.currentValue,this.tippyInstance&&this.tippyInstance.setProps({theme:this.theme})),changes.content&&(this.content=changes.content.currentValue,this.tippyInstance&&this.tippyInstance.setContent(this.getContent()))}ngOnDestroy(){this.tippyInstance&&this.tippyInstance.destroy(),this.view&&this.view.destroy()}static{this.ctorParameters=()=>[{type:core.ViewContainerRef},{type:core.Renderer2}]}static{this.propDecorators={popoverContent:[{type:core.ViewChild,args:["popoverContent",{static:!1}]}],content:[{type:core.Input}],theme:[{type:core.Input}]}}};PopoverComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-popover",template:"<span #popoverContent>\n  <ng-content></ng-content>\n</span>\n",standalone:!0,imports:[common.CommonModule],styles:[popover_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ViewContainerRef,core.Renderer2])],PopoverComponent)},"./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>PopupAlertComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var popup_alert_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.css?ngResource"),popup_alert_componentngResource_default=__webpack_require__.n(popup_alert_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_material_icons_outline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-outline.mjs");let PopupAlertComponent=class PopupAlertComponent{constructor(changeDetector){this.changeDetector=changeDetector,this.type="info",this.position="top",this.expanded=!1,this.timeout=null}get showDuration(){const chars=this.content.nativeElement.innerHTML.length;return Math.max(3e3,20*chars)}ngOnInit(){this.expandAndClose()}expand(){this.expanded=!0,this.changeDetector.detectChanges(),clearTimeout(this.timeout)}expandAndClose(){this.expanded=!0,this.changeDetector.detectChanges(),clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.expanded=!1,this.changeDetector.detectChanges()}),this.showDuration)}static{this.ctorParameters=()=>[{type:core.ChangeDetectorRef}]}static{this.propDecorators={icon:[{type:core.Input}],type:[{type:core.Input}],position:[{type:core.Input}],content:[{type:core.ViewChild,args:["content"]}]}}};PopupAlertComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-popup-alert",template:"<div class=\"h-full relative container\">\n  <div\n    class=\"pointer-events-auto absolute text-white flex flex-row p-2 rounded message\"\n    role=\"alert\"\n    [ngClass]=\"{\n      'position-bottom': position === 'bottom',\n      'position-top': position === 'top',\n      expanded: this.expanded,\n      'bg-red-500': type === 'danger',\n      'bg-yellow-500': type === 'warning',\n      'bg-blue-500': type === 'info',\n    }\"\n    (mouseenter)=\"expand()\"\n    (mouseleave)=\"expandAndClose()\"\n  >\n    <ng-icon class=\"mr-2 shrink-0 select-none\" [name]=\"icon\"></ng-icon>\n    <div class=\"grow\" #content [ngClass]=\"{ invisible: !expanded }\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({matErrorOutlineOutline:ng_icons_material_icons_outline.Bak})],styles:[popup_alert_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],PopupAlertComponent)},"./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ProgressBarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var progress_bar_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.css?ngResource"),progress_bar_componentngResource_default=__webpack_require__.n(progress_bar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ProgressBarComponent=class ProgressBarComponent{constructor(){this.value=0,this.type="default"}get progress(){return this.value>0?this.value<100?this.value:100:0}get color(){switch(this.type){case"default":return{outerBar:"bg-gray-200",innerBar:"bg-gray-100",text:"text-gray-900"};case"primary":return{outerBar:"bg-primary",innerBar:"bg-primary-lighter",text:"text-white"};case"secondary":return{outerBar:"bg-secondary",innerBar:"bg-secondary-lighter",text:"text-white"}}}static{this.propDecorators={value:[{type:core.Input}],type:[{type:core.Input}]}}};ProgressBarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-progress-bar",template:'<div class="flex h-full {{ color.outerBar }} rounded-t-lg rounded-b-lg">\n  <div\n    [style.width.%]="progress"\n    class="flex {{\n      color.innerBar\n    }} my-1 mx-1 transition-width duration-500 ease-in-out rounded-t-md rounded-b-md shadow-xl"\n  >\n    <div class="flex items-center pl-2 py-1 {{ color.text }} font-bold text-4">\n      {{ progress }}%\n    </div>\n  </div>\n</div>\n',standalone:!0,styles:[progress_bar_componentngResource_default()]})],ProgressBarComponent)},"./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>SpinningLoaderComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var spinning_loader_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.css?ngResource"),spinning_loader_componentngResource_default=__webpack_require__.n(spinning_loader_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SpinningLoaderComponent=class SpinningLoaderComponent{};SpinningLoaderComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-spinning-loader",template:'<span>\n  <svg\n    class="animate-spin h-8 w-8 text-primary"\n    xmlns="http://www.w3.org/2000/svg"\n    fill="none"\n    viewBox="0 0 24 24"\n  >\n    <circle\n      class="opacity-25"\n      cx="12"\n      cy="12"\n      r="10"\n      stroke="currentColor"\n      stroke-width="4"\n    ></circle>\n    <path\n      class="opacity-75"\n      fill="currentColor"\n      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"\n    ></path>\n  </svg>\n</span>\n',standalone:!0,styles:[spinning_loader_componentngResource_default()]})],SpinningLoaderComponent)},"./libs/ui/dataviz/src/lib/data-table/data-table.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MockBaseReader:()=>MockBaseReader,Primary:()=>Primary,WithGeojson:()=>WithGeojson,WithWfs:()=>WithWfs,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_angular_common_http__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/util/i18n/src/index.ts"),_data_table_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.component.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_data_table_fixtures__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.fixtures.ts"),_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/util/data-fetcher/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Dataviz/DataTableComponent",component:_data_table_component__WEBPACK_IMPORTED_MODULE_2__.u,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_3__.A),(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__.BrowserAnimationsModule),(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.q1),(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_1__.D7),(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_1__.sU))]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`<div class="border border-gray-300 h-[500px] w-[800px] p-[10px] overflow-auto resize">${story}</div>`))]};class MockBaseReader extends _geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_5__.Vw{getData(){return Promise.resolve(_data_table_fixtures__WEBPACK_IMPORTED_MODULE_4__.w)}}const Primary={args:{dataset:new MockBaseReader("")}},WithGeojson={loaders:[(0,_home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__.A)((function*(){return{dataset:yield(0,_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_5__.Jp)("https://france-geojson.gregoiredavid.fr/repo/departements.geojson","geojson")}}))],render:(args,{loaded})=>({props:loaded})},WithWfs={loaders:[(0,_home_runner_work_geonetwork_ui_geonetwork_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__.A)((function*(){return{dataset:yield(0,_geonetwork_ui_data_fetcher__WEBPACK_IMPORTED_MODULE_5__.Jp)("https://www.geo2france.fr/geoserver/cr_hdf/ows","wfs",{wfsFeatureType:"accidento_hdf_L93"})}}))],render:(args,{loaded})=>({props:loaded})},__namedExportsOrder=["MockBaseReader","Primary","WithGeojson","WithWfs"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    dataset: reader\n  }\n}",...Primary.parameters?.docs?.source}}},WithGeojson.parameters={...WithGeojson.parameters,docs:{...WithGeojson.parameters?.docs,source:{originalSource:"{\n  loaders: [async () => ({\n    dataset: await openDataset('https://france-geojson.gregoiredavid.fr/repo/departements.geojson', 'geojson')\n  })],\n  render(args, {\n    loaded\n  }) {\n    return {\n      props: loaded\n    };\n  }\n}",...WithGeojson.parameters?.docs?.source}}},WithWfs.parameters={...WithWfs.parameters,docs:{...WithWfs.parameters?.docs,source:{originalSource:"{\n  loaders: [async () => ({\n    dataset: await openDataset('https://www.geo2france.fr/geoserver/cr_hdf/ows', 'wfs', {\n      wfsFeatureType: 'accidento_hdf_L93'\n    })\n  })],\n  render(args, {\n    loaded\n  }) {\n    return {\n      props: loaded\n    };\n  }\n}",...WithWfs.parameters?.docs?.source}}}},"./libs/ui/widgets/src/lib/color-scale/color-scale.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* this overrides the spinner color with a CSS variable to match the theme */\n::ng-deep .mat-spinner circle {\n  stroke: var(--color-gray-700);\n  opacity: 0.5;\n}\n\n.backdrop {\n  background-color: rgba(255, 255, 255, 0.4);\n}\n\n@supports ((-webkit-backdrop-filter: blur()) or (backdrop-filter: blur())) {\n  .backdrop {\n    background-color: transparent;\n    -webkit-backdrop-filter: blur(4px);\n            backdrop-filter: blur(4px);\n  }\n}\n\n.background {\n  opacity: 0.7;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/popover/popover.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  pointer-events: none;\n}\n.container {\n  filter: drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2));\n}\n.message {\n  transition: clip-path 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.message.expanded {\n  clip-path: circle(100%);\n}\n.position-top {\n  clip-path: circle(19px at 20px 20px);\n  align-items: start;\n  top: 0;\n  left: 0;\n}\n.position-bottom {\n  clip-path: circle(19px at 20px calc(100% - 20px));\n  align-items: end;\n  bottom: 0;\n  left: 0;\n}\n\n/* style links inside message */\n.container ::ng-deep a {\n  text-decoration: underline;\n  font-weight: bold;\n}\n.container ::ng-deep a:hover {\n  opacity: 0.85;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".font-bold {\n  font-weight: var(--progress-bar-font-weight, 'bold');\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);