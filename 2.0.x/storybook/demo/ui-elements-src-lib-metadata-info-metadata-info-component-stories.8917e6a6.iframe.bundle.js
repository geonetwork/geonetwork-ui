(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[6417],{"./libs/ui/elements/src/lib/content-ghost/content-ghost.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>ContentGhostComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,content_ghost_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/content-ghost/content-ghost.component.css?ngResource"),content_ghost_componentngResource_default=__webpack_require__.n(content_ghost_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ContentGhostComponent=((_class=class ContentGhostComponent{constructor(){this.ghostClass=""}}).propDecorators={showContent:[{type:core.Input}],ghostClass:[{type:core.Input}]},_class);ContentGhostComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-content-ghost",template:'<div\n  *ngIf="!showContent"\n  class="ghost bg-gray-100 rounded-lg relative overflow-hidden {{ ghostClass }}"\n></div>\n<ng-content *ngIf="showContent"></ng-content>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[content_ghost_componentngResource_default()]})],ContentGhostComponent)},"./libs/ui/elements/src/lib/metadata-info/metadata-info.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{d:()=>MetadataInfoComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,metadata_info_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/metadata-info/metadata-info.component.css?ngResource"),metadata_info_componentngResource_default=__webpack_require__.n(metadata_info_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let MetadataInfoComponent=((_class=class MetadataInfoComponent{constructor(){this.keyword=new core.EventEmitter}get hasUsage(){return!0===this.metadata.extras?.isOpenData||this.metadata.useLimitations?.length||this.metadata.accessConstraints?.length}get usages(){let array=[];return this.metadata.useLimitations?.length&&(array=array.concat(this.metadata.useLimitations)),this.metadata.accessConstraints?.length&&(array=array.concat(this.metadata.accessConstraints.map((c=>c.text)))),array}fieldReady(propName){return!this.incomplete||propName in this.metadata}onKeywordClick(keyword){this.keyword.emit(keyword)}}).propDecorators={metadata:[{type:core.Input}],incomplete:[{type:core.Input}],keyword:[{type:core.Output}]},_class);MetadataInfoComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-metadata-info",template:'<p\n  class="text-[28px] text-title text-center mb-6 font-title sm:text-left"\n  translate\n>\n  record.metadata.about\n</p>\n<div class="mb-6 md-description sm:mb-4 sm:pr-16">\n  <gn-ui-content-ghost ghostClass="h-32" [showContent]="fieldReady(\'abstract\')">\n    <p\n      class="whitespace-pre-line break-words"\n      [innerHTML]="metadata.abstract | safe: \'html\'"\n      *ngIf="metadata.abstract"\n    ></p>\n  </gn-ui-content-ghost>\n</div>\n\n<ng-container *ngIf="metadata.keywords?.length">\n  <p class="mb-3 font-medium text-primary text-sm" translate>\n    record.metadata.keywords\n  </p>\n  <div class="mb-9 sm:mb-16">\n    <gn-ui-badge\n      class="inline-block mr-2 mb-2 lowercase"\n      (click)="onKeywordClick(keyword)"\n      [clickable]="true"\n      *ngFor="let keyword of metadata.keywords"\n      >{{ keyword }}</gn-ui-badge\n    >\n  </div>\n</ng-container>\n\n<gn-ui-expandable-panel\n  *ngIf="metadata.lineage"\n  [title]="\'record.metadata.origin\' | translate"\n>\n  <p class="mb-5 pt-4 whitespace-pre-line break-words" gnUiLinkify>\n    {{ metadata.lineage }}\n  </p>\n  <div\n    class="py-4 px-6 rounded bg-gray-100 grid grid-cols-2 gap-y-[10px] gap-x-[20px] text-gray-700 info-grid"\n  >\n    <div *ngIf="metadata.recordUpdated">\n      <p class="text-sm" translate>record.metadata.updatedOn</p>\n      <p class="text-primary font-medium mt-[4px]">\n        {{ metadata.recordUpdated && metadata.recordUpdated.toLocaleString() }}\n      </p>\n    </div>\n    <div *ngIf="metadata.updateFrequency">\n      <p class="text-sm" translate>record.metadata.updateFrequency</p>\n      <p class="text-primary font-medium mt-[4px]" translate>\n        domain.record.updateFrequency.{{ metadata.updateFrequency }}\n      </p>\n    </div>\n    <div *ngIf="metadata.status">\n      <p class="text-sm" translate>record.metadata.updateStatus</p>\n      <p class="text-primary font-medium mt-[4px]" translate>\n        domain.record.status.{{ metadata.status }}\n      </p>\n    </div>\n  </div>\n</gn-ui-expandable-panel>\n<gn-ui-expandable-panel [title]="\'record.metadata.usage\' | translate">\n  <div class="py-4 px-6 rounded bg-gray-100 text-gray-700 flex flex-wrap gap-2">\n    <gn-ui-badge *ngIf="metadata.extras?.isOpenData">\n      <span translate>record.metadata.isOpenData</span>\n    </gn-ui-badge>\n    <span\n      class="text-primary font-medium"\n      *ngFor="let usage of usages"\n      gnUiLinkify\n    >\n      {{ usage }}\n    </span>\n    <span class="text-primary font-medium noUsage" *ngIf="!hasUsage">\n      {{ \'record.metadata.noUsage\' | translate }}\n    </span>\n  </div>\n</gn-ui-expandable-panel>\n<gn-ui-expandable-panel\n  *ngIf="metadata.landingPage"\n  [title]="\'record.metadata.details\' | translate"\n>\n  <div class="py-5 px-5 rounded bg-gray-100 text-gray-700">\n    <p class="text-sm" translate>record.metadata.sheet</p>\n    <p class="text-primary font-medium mt-1" translate>\n      <a [href]="metadata.landingPage" target="_blank">\n        <mat-icon\n          class="material-symbols-outlined inline-block align-bottom pt-1.5 text-xs text-black !w-[20px]"\n          >open_in_new</mat-icon\n        >\n        <span class="break-all">{{ metadata.landingPage }}</span>\n      </a>\n    </p>\n  </div>\n</gn-ui-expandable-panel>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[metadata_info_componentngResource_default()]})],MetadataInfoComponent)},"./libs/ui/elements/src/lib/metadata-info/metadata-info.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_metadata_info_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/elements/src/lib/metadata-info/metadata-info.component.ts"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/util/shared/src/index.ts"),_content_ghost_content_ghost_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/ui/elements/src/lib/content-ghost/content-ghost.component.ts"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/common/fixtures/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Elements/MetadataInfoComponent",component:_metadata_info_component__WEBPACK_IMPORTED_MODULE_2__.d,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({declarations:[_content_ghost_content_ghost_component__WEBPACK_IMPORTED_MODULE_4__.B],imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.fR),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_3__.Lt]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.applicationConfig)({providers:[]})]},Primary={args:{metadata:_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_5__.XQ[0],incomplete:!1}}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./libs/ui/elements/src/lib/content-ghost/content-ghost.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".ghost {\n  min-height: 2rem;\n  min-width: 2rem;\n  overflow: hidden;\n}\n.ghost:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 50%;\n  background-image: linear-gradient(\n    to left,\n    rgba(251, 251, 251, 0.05),\n    rgba(251, 251, 251, 0.3),\n    rgba(251, 251, 251, 0.6),\n    rgba(251, 251, 251, 0.3),\n    rgba(251, 251, 251, 0.05)\n  );\n  animation: loading 1s infinite;\n}\n@keyframes loading {\n  0% {\n    left: -50%;\n  }\n  100% {\n    left: 100%;\n  }\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/elements/src/lib/metadata-info/metadata-info.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* Use a standard link style for description, since it can contain html */\n.md-description ::ng-deep a {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n  text-decoration-line: underline;\n}\n.md-description ::ng-deep a:hover {\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity));\n}\n\n.info-grid > :nth-last-child(n + 3) {\n  padding-bottom: 10px;\n  border-bottom-width: 1px;\n  border-color: var(--color-gray-300);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);