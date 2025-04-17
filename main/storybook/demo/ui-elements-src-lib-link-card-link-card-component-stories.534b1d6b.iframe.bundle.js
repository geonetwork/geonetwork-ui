(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[4294],{"./libs/ui/elements/src/lib/link-card/link-card.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>LinkCardComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,link_card_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/link-card/link-card.component.css?ngResource"),link_card_componentngResource_default=__webpack_require__.n(link_card_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let LinkCardComponent=((_class=class LinkCardComponent{}).propDecorators={link:[{type:core.Input}]},_class);LinkCardComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-link-card",template:'<a\n  [href]="link.url"\n  target="_blank"\n  class="flex flex-col justify-between group h-40 grow py-5 px-5 bg-white rounded border-gray-300 filter card-shadow overflow-hidden lg:w-80"\n>\n  <div class="max-h-24 overflow-hidden text-ellipsis">\n    <p\n      class="font-title font-medium text-21 text-black break-words pb-1 line-clamp-2"\n    >\n      {{ link.name }}\n    </p>\n    <p class="font-medium text-sm break-words">\n      {{ link.description }}\n    </p>\n  </div>\n  <div>\n    <mat-icon\n      class="align-middle text-gray-200 group-hover:text-secondary transition-colors"\n      >open_in_new</mat-icon\n    >\n  </div>\n</a>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[link_card_componentngResource_default()]})],LinkCardComponent)},"./libs/ui/elements/src/lib/link-card/link-card.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_link_card_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/elements/src/lib/link-card/link-card.component.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/util/shared/src/index.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Elements/LinkCardComponent",component:_link_card_component__WEBPACK_IMPORTED_MODULE_2__.O,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({declarations:[_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.Hw],imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.fR)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__.BrowserAnimationsModule)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.componentWrapperDecorator)((story=>`<div style="max-width: 800px">${story}</div>`))]},Primary={args:{link:{protocol:"WWW:LINK",type:_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__.cB.OTHER,name:"Consulter sur Géoclip",description:"Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.",url:"https//example.com/someurlpath"}}}},"./libs/ui/elements/src/lib/link-card/link-card.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);