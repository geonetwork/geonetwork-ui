(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[6067],{"./libs/ui/elements/src/lib/search-results-error/search-results-error.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{N:()=>ErrorType,g:()=>SearchResultsErrorComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,ErrorType,search_results_error_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/search-results-error/search-results-error.component.css?ngResource"),search_results_error_componentngResource_default=__webpack_require__.n(search_results_error_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(ErrorType){ErrorType[ErrorType.COULD_NOT_REACH_API=0]="COULD_NOT_REACH_API",ErrorType[ErrorType.RECEIVED_ERROR=1]="RECEIVED_ERROR",ErrorType[ErrorType.RECORD_NOT_FOUND=2]="RECORD_NOT_FOUND"}(ErrorType||(ErrorType={}));let SearchResultsErrorComponent=((_class=class SearchResultsErrorComponent{constructor(){this.types=ErrorType}}).propDecorators={type:[{type:core.Input}],error:[{type:core.Input}],recordId:[{type:core.Input}]},_class);SearchResultsErrorComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-search-results-error",template:'<div\n  class="p-[1.7em] bg-red-50 text-red-800 text-[1.5em] text-center rounded-lg"\n>\n  <div *ngIf="type === types.COULD_NOT_REACH_API">\n    <div class="relative opacity-40">\n      <mat-icon class="material-symbols-outlined face">face</mat-icon>\n      <mat-icon class="material-symbols-outlined question-mark1"\n        >question_mark</mat-icon\n      >\n      <mat-icon class="material-symbols-outlined question-mark2"\n        >question_mark</mat-icon\n      >\n    </div>\n    <div translate>search.error.couldNotReachApi</div>\n  </div>\n  <div *ngIf="type === types.RECEIVED_ERROR">\n    <div class="relative opacity-40">\n      <mat-icon class="material-symbols-outlined face">mood_bad</mat-icon>\n    </div>\n    <div translate>search.error.receivedError</div>\n    <div *ngIf="error">{{ error }}</div>\n  </div>\n  <div *ngIf="type === types.RECORD_NOT_FOUND">\n    <div class="relative opacity-40">\n      <mat-icon class="material-symbols-outlined computer">computer</mat-icon>\n      <mat-icon class="material-symbols-outlined computer-question-mark"\n        >question_mark</mat-icon\n      >\n    </div>\n    <div translate [translateParams]="{ id: recordId }">\n      search.error.recordNotFound\n    </div>\n    <div *ngIf="error">{{ error }}</div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[search_results_error_componentngResource_default()]})],SearchResultsErrorComponent)},"./libs/ui/elements/src/lib/search-results-error/search-results-error.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _search_results_error_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/elements/src/lib/search-results-error/search-results-error.component.ts"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Elements/SearchResultsErrorComponent",component:_search_results_error_component__WEBPACK_IMPORTED_MODULE_0__.g,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({declarations:[_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.Hw],imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.fR)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.componentWrapperDecorator)((story=>`<div style="max-width: 800px">${story}</div>`))]},Primary={args:{type:_search_results_error_component__WEBPACK_IMPORTED_MODULE_0__.N.RECEIVED_ERROR,error:"something wrong happened",recordId:"thisIsAnID"},argTypes:{type:{control:"radio",options:[_search_results_error_component__WEBPACK_IMPORTED_MODULE_0__.N.RECEIVED_ERROR,_search_results_error_component__WEBPACK_IMPORTED_MODULE_0__.N.COULD_NOT_REACH_API,_search_results_error_component__WEBPACK_IMPORTED_MODULE_0__.N.RECORD_NOT_FOUND]}}}},"./libs/ui/elements/src/lib/search-results-error/search-results-error.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"mat-icon {\n  width: auto;\n  height: auto;\n}\nmat-icon.face {\n  font-size: 3em;\n}\nmat-icon.question-mark1 {\n  position: absolute;\n  bottom: 1.1em;\n  left: calc(50% + 0.7em);\n  font-size: 1.7em;\n}\nmat-icon.question-mark2 {\n  position: absolute;\n  bottom: 1.6em;\n  left: calc(50% + 1.6em);\n  font-size: 1.4em;\n}\n\n.computer {\n  font-size: 3em;\n}\n\n.computer-question-mark {\n  position: absolute;\n  top: 0.6em;\n  left: calc(50% - 0.5em);\n  font-size: 1.2em;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);