(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[4642],{"./libs/ui/inputs/src/lib/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,button_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.css?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts");let ButtonComponent=((_class=class ButtonComponent{constructor(){this.type="default",this.disabled=!1,this.extraClass="",this.buttonClick=new core.EventEmitter}get classList(){return`${this.color} ${this.textColor} ${this.borderColor} ${this.extraClass}`}get color(){switch(this.type){case"default":return"bg-gray-700 hover:bg-gray-800 hover:bg-gray-800 active:bg-gray-900";case"primary":return"bg-primary hover:bg-primary-darker focus:bg-primary-darker active:bg-primary-darkest";case"secondary":return"bg-secondary hover:bg-secondary-darker focus:bg-secondary-darker active:bg-secondary-darkest";case"outline":return"bg-white";case"light":return"bg-white hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-100"}}get textColor(){switch(this.type){case"default":case"secondary":case"primary":return"text-white";case"outline":return"text-main hover:text-primary-darker focus:text-primary-darker active:text-primary-black";case"light":return"text-main"}}get borderColor(){switch(this.type){case"default":return"border border-gray-700 focus:ring-4 focus:ring-gray-200";case"secondary":return"border border-secondary focus:ring-4 focus:ring-secondary-lightest";case"primary":return"border border-primary focus:ring-4 focus:ring-primary-lightest";case"outline":return"border border-gray-300 hover:border-primary-lighter focus:border-primary-lighter focus:ring-4 focus:ring-primary-lightest active:border-primary-darker";case"light":return"border border-white focus:ring-4 focus:ring-gray-300"}}handleClick(event){this.buttonClick.emit(),event.preventDefault(),(0,src.Yr)(event)}}).propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}],extraClass:[{type:core.Input}],buttonClick:[{type:core.Output}]},_class);ButtonComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-button",template:'<button\n  type="button"\n  class="flex flex-row items-center text-[1em] leading-none p-[1em] rounded-[0.25em] transition-all duration-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"\n  [class]="classList"\n  [disabled]="disabled"\n  (click)="handleClick($event)"\n>\n  <ng-content></ng-content>\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[button_componentngResource_default()]})],ButtonComponent)},"./libs/ui/inputs/src/lib/button/button.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_button_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/i18n/src/index.ts"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/ButtonComponent",component:_button_component__WEBPACK_IMPORTED_MODULE_1__.r,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.fR),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.Ps]})]},Primary={args:{type:"default",disabled:!1,extraClass:"",content:"My button"},argTypes:{type:{control:"radio",options:["primary","secondary","default","outline","light"]}},render:args=>({props:args,template:'<div class=\'flex flex-row gap-5\'>\n  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">\n    {{ content }}\n  </gn-ui-button>\n  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">\n    with an icon&nbsp;<mat-icon class="material-symbols-outlined">downloading</mat-icon>\n  </gn-ui-button>\n  <gn-ui-button class="text-[1.5em]" [type]="type" [disabled]="disabled" [extraClass]="extraClass">\n    <mat-icon class=\'material-symbols-outlined\'>globe_asia</mat-icon>&nbsp;bigger\n  </gn-ui-button>\n  <gn-ui-button class="text-[0.7em]" [type]="type" [disabled]="disabled" [extraClass]="extraClass">\n    <mat-icon class=\'material-symbols-outlined\'>pest_control</mat-icon>&nbsp;smaller\n  </gn-ui-button>\n  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass + \' !px-[3em] !py-[0.5em]\'">\n    different&nbsp;<mat-icon class="material-symbols-outlined">waves</mat-icon>&nbsp;shape\n  </gn-ui-button>\n</div>'})}},"./libs/ui/inputs/src/lib/button/button.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* makes sure icons will not make the buttons grow vertically */\n:host /deep/ mat-icon.mat-icon {\n  margin-top: -0.325em;\n  margin-bottom: -0.325em;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);