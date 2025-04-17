(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[1404],{"./libs/ui/elements/src/lib/api-card/api-card.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ApiCardComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var api_card_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/api-card/api-card.component.css?ngResource"),api_card_componentngResource_default=__webpack_require__.n(api_card_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),src=__webpack_require__("./libs/ui/inputs/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),tooltip=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_iconoir=__webpack_require__("./node_modules/@ng-icons/iconoir/fesm2022/ng-icons-iconoir.mjs");let ApiCardComponent=class ApiCardComponent{constructor(){this.sizeClassMap={L:"gn-ui-card-l py-2 px-5 flex-row",M:"gn-ui-card-m py-2 px-5 flex-row",S:"gn-ui-card-s p-4 flex-col",XS:"gn-ui-card-xs py-2 px-5 flex-row"},this.cardClass="",this.currentlyActive=!1,this.openRecordApiForm=new core.EventEmitter}set size(value){this._size=value,this.cardClass=this.sizeClassMap[value]}get size(){return this._size}get generatedText(){return"wfs"===this.link.accessServiceProtocol?"datahub.search.filter.generatedByWfs":"datahub.search.filter.generatedByAPI"}ngOnInit(){this.displayApiFormButton="ogcFeatures"===this.link.accessServiceProtocol||"wfs"===this.link.accessServiceProtocol||"GPFDL"===this.link.accessServiceProtocol}ngOnChanges(changes){this.currentlyActive=changes.currentLink.currentValue===this.link}openRecordApiFormPanel(){this.displayApiFormButton&&(this.currentlyActive=!this.currentlyActive,this.openRecordApiForm.emit(this.currentlyActive?this.link:void 0))}static{this.propDecorators={link:[{type:core.Input}],currentLink:[{type:core.Input}],size:[{type:core.Input}],openRecordApiForm:[{type:core.Output}]}}};ApiCardComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-api-card",template:'<div\n  class="group flex justify-between rounded filter overflow-hidden"\n  [ngClass]="cardClass"\n>\n  <ng-container *ngIf="size !== \'S\'">\n    <div>\n      <ng-container *ngTemplateOutlet="content"></ng-container>\n    </div>\n    <div class="flex items-center">\n      <ng-container *ngTemplateOutlet="buttons"></ng-container>\n    </div>\n  </ng-container>\n  <ng-container *ngIf="size === \'S\'">\n    <ng-container *ngTemplateOutlet="content"></ng-container>\n  </ng-container>\n</div>\n\n<ng-template #buttons>\n  <div class="flex flex-row gap-2">\n    <gn-ui-copy-text-button\n      [text]="link.url"\n      [tooltipText]="\'tooltip.url.copy\' | translate"\n      [displayText]="false"\n      class="border border-gray-300 rounded-lg pt-1 px-2 h-[34px]"\n    ></gn-ui-copy-text-button>\n    <button\n      *ngIf="displayApiFormButton"\n      type="button"\n      class="gn-ui-card-icon"\n      [ngClass]="{\n        \'py-2 px-4 rounded-r-md bg-gray-400 hover:bg-gray-600 focus:bg-gray-800 text-white\':\n          displayText,\n      }"\n      [matTooltip]="\n        !currentlyActive\n          ? (\'record.metadata.api.form.openForm\' | translate)\n          : (\'record.metadata.api.form.closeForm\' | translate)\n      "\n      matTooltipPosition="above"\n      (click)="openRecordApiFormPanel()"\n    >\n      <ng-icon\n        class="pointer-events-none align-middle card-icon"\n        name="iconoirSettings"\n        [ngClass]="{\n          \'text-secondary opacity-100\': currentlyActive,\n        }"\n      ></ng-icon>\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #content>\n  <div>\n    <div class="gn-ui-card-title">\n      {{ link.description || link.name }}\n    </div>\n    <div class="gn-ui-card-detail">\n      {{ link.name }}\n    </div>\n  </div>\n  <div class="flex flex-row justify-between">\n    <div class="flex flex-row gap-2.5 items-center pt-1">\n      <span\n        *ngIf="link.accessServiceProtocol !== \'GPFDL\'"\n        class="bg-primary-opacity-50 uppercase inline-flex items-center justify-center px-2 py-1 text-13 font-medium leading-none text-white rounded text-primary-lightest group-hover:bg-primary transition-colors"\n        [ngClass]="{\n          \'!bg-primary\': currentlyActive,\n        }"\n        >{{ link.accessServiceProtocol }}</span\n      >\n      <span\n        *ngIf="link.accessServiceProtocol === \'GPFDL\'"\n        class="bg-primary-opacity-50 uppercase inline-flex items-center justify-center px-2 py-1 text-13 font-medium leading-none text-white rounded text-primary-lightest group-hover:bg-primary transition-colors"\n        [ngClass]="{\n          \'!bg-primary\': currentlyActive,\n        }"\n        translate\n      >\n        record.metadata.api.gpfdl</span\n      >\n    </div>\n    <div *ngIf="size === \'S\'">\n      <ng-container *ngTemplateOutlet="buttons"></ng-container>\n    </div>\n  </div>\n</ng-template>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,src.Ug,ngx_translate_core.h,tooltip.uc,ng_icons_core.$e],viewProviders:[(0,ng_icons_core.EB)({iconoirSettings:ng_icons_iconoir.tpc})],styles:[api_card_componentngResource_default()]})],ApiCardComponent)},"./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>firstValueFrom});var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"),_Subscriber__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscriber.js");function firstValueFrom(source,config){var hasConfig="object"==typeof config;return new Promise((function(resolve,reject){var subscriber=new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Ms({next:function(value){resolve(value),subscriber.unsubscribe()},error:reject,complete:function(){hasConfig?resolve(config.defaultValue):reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.G)}});source.subscribe(subscriber)}))}},"./libs/ui/elements/src/lib/api-card/api-card.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SizeL:()=>SizeL,SizeM:()=>SizeM,SizeS:()=>SizeS,SizeXS:()=>SizeXS,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_api_card_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/elements/src/lib/api-card/api-card.component.ts"),_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),_ng_icons_iconoir__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ng-icons/iconoir/fesm2022/ng-icons-iconoir.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Elements/ApiCardComponent",component:_api_card_component__WEBPACK_IMPORTED_MODULE_2__.a,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.D7,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.sU),_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__.uc]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.applicationConfig)({providers:[(0,_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.EB)({iconoirSettings:_ng_icons_iconoir__WEBPACK_IMPORTED_MODULE_6__.tpc})]})]},SizeXS={args:{link:{type:"service",accessServiceProtocol:"wfs",description:"Scot en cours d'élaboration ou de révision",name:"A file that contains all roads",url:new URL("https://roads.com/wfs")}},render:args=>({props:args,template:'\n    <div class=\'border border-black inline-block rounded\'>\n      <gn-ui-api-card [link]="link" size="XS" [currentLink]="link" [title]="link.description"></gn-ui-api-card>\n    </div>'})},SizeS={args:{link:{type:"service",accessServiceProtocol:"wfs",description:"Scot en cours d'élaboration ou de révision",name:"A file that contains all roads",url:new URL("https://roads.com/wfs")}},render:args=>({props:args,template:'\n    <div class=\'border border-black inline-block rounded\'>\n    <gn-ui-api-card [link]="link" size="S" [currentLink]="link" [title]="link.description"></gn-ui-api-card>\n  </div>'})},SizeM={args:{link:{type:"service",accessServiceProtocol:"wfs",description:"Scot en cours d'élaboration ou de révision",name:"A file that contains all roads",url:new URL("https://roads.com/wfs")}},render:args=>({props:args,template:'\n    <div class=\'border border-black inline-block rounded\'>\n      <gn-ui-api-card [link]="link" size="M" [currentLink]="link" [title]="link.description"></gn-ui-api-card>\n    </div>'})},SizeL={args:{link:{type:"service",accessServiceProtocol:"wfs",description:"Scot en cours d'élaboration ou de révision",name:"A file that contains all roads",url:new URL("https://roads.com/wfs")}},render:args=>({props:args,template:'\n    \n    <div class=\'border border-black inline-block rounded\'>\n      <gn-ui-api-card [link]="link" size="L" [currentLink]="link" [title]="link.description"></gn-ui-api-card>\n    </div>'})},__namedExportsOrder=["SizeXS","SizeS","SizeM","SizeL"];SizeXS.parameters={...SizeXS.parameters,docs:{...SizeXS.parameters?.docs,source:{originalSource:"{\n  args: {\n    link: {\n      type: 'service',\n      accessServiceProtocol: 'wfs',\n      description: \"Scot en cours d'élaboration ou de révision\",\n      name: 'A file that contains all roads',\n      url: new URL('https://roads.com/wfs')\n    }\n  },\n  render: args => ({\n    props: args,\n    template: `\n    <div class='border border-black inline-block rounded'>\n      <gn-ui-api-card [link]=\"link\" size=\"XS\" [currentLink]=\"link\" [title]=\"link.description\"></gn-ui-api-card>\n    </div>`\n  })\n}",...SizeXS.parameters?.docs?.source}}},SizeS.parameters={...SizeS.parameters,docs:{...SizeS.parameters?.docs,source:{originalSource:"{\n  args: {\n    link: {\n      type: 'service',\n      accessServiceProtocol: 'wfs',\n      description: \"Scot en cours d'élaboration ou de révision\",\n      name: 'A file that contains all roads',\n      url: new URL('https://roads.com/wfs')\n    }\n  },\n  render: args => ({\n    props: args,\n    template: `\n    <div class='border border-black inline-block rounded'>\n    <gn-ui-api-card [link]=\"link\" size=\"S\" [currentLink]=\"link\" [title]=\"link.description\"></gn-ui-api-card>\n  </div>`\n  })\n}",...SizeS.parameters?.docs?.source}}},SizeM.parameters={...SizeM.parameters,docs:{...SizeM.parameters?.docs,source:{originalSource:"{\n  args: {\n    link: {\n      type: 'service',\n      accessServiceProtocol: 'wfs',\n      description: \"Scot en cours d'élaboration ou de révision\",\n      name: 'A file that contains all roads',\n      url: new URL('https://roads.com/wfs')\n    }\n  },\n  render: args => ({\n    props: args,\n    template: `\n    <div class='border border-black inline-block rounded'>\n      <gn-ui-api-card [link]=\"link\" size=\"M\" [currentLink]=\"link\" [title]=\"link.description\"></gn-ui-api-card>\n    </div>`\n  })\n}",...SizeM.parameters?.docs?.source}}},SizeL.parameters={...SizeL.parameters,docs:{...SizeL.parameters?.docs,source:{originalSource:"{\n  args: {\n    link: {\n      type: 'service',\n      accessServiceProtocol: 'wfs',\n      description: \"Scot en cours d'élaboration ou de révision\",\n      name: 'A file that contains all roads',\n      url: new URL('https://roads.com/wfs')\n    }\n  },\n  render: args => ({\n    props: args,\n    template: `\n    \n    <div class='border border-black inline-block rounded'>\n      <gn-ui-api-card [link]=\"link\" size=\"L\" [currentLink]=\"link\" [title]=\"link.description\"></gn-ui-api-card>\n    </div>`\n  })\n}",...SizeL.parameters?.docs?.source}}}},"./libs/ui/elements/src/lib/api-card/api-card.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);