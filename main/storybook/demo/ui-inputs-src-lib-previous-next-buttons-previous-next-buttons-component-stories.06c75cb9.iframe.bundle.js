(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[3842],{"./libs/ui/inputs/src/lib/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var button_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.css?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts");let ButtonComponent=class ButtonComponent{constructor(){this.btnClass="gn-ui-btn-default",this.disabled=!1,this.extraClass="",this.buttonClick=new core.EventEmitter}set type(value){switch(value){case"primary":this.btnClass="gn-ui-btn-primary";break;case"secondary":this.btnClass="gn-ui-btn-secondary";break;case"outline":this.btnClass="gn-ui-btn-outline";break;case"light":this.btnClass="gn-ui-btn-light";break;default:this.btnClass="gn-ui-btn-default"}}get classList(){return`${this.btnClass} ${this.extraClass}`}handleClick(event){this.buttonClick.emit(),event.preventDefault(),(0,src.Yr)(event)}static#_=this.propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}],extraClass:[{type:core.Input}],buttonClick:[{type:core.Output}]}};ButtonComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-button",template:'<button\n  type="button"\n  [class]="classList"\n  [disabled]="disabled"\n  (click)="handleClick($event)"\n>\n  <ng-content></ng-content>\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[button_componentngResource_default()]})],ButtonComponent)},"./libs/ui/inputs/src/lib/previous-next-buttons/previous-next-buttons.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{E:()=>PreviousNextButtonsComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var previous_next_buttons_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/previous-next-buttons/previous-next-buttons.component.css?ngResource"),previous_next_buttons_componentngResource_default=__webpack_require__.n(previous_next_buttons_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),button_component=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.ts"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");let PreviousNextButtonsComponent=class PreviousNextButtonsComponent{constructor(){this.directionButtonClicked=new core.EventEmitter}previousButtonClicked(){this.directionButtonClicked.next("previous")}nextButtonClicked(){this.directionButtonClicked.next("next")}static#_=this.propDecorators={isFirst:[{type:core.Input}],isLast:[{type:core.Input}],directionButtonClicked:[{type:core.Output}]}};PreviousNextButtonsComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-previous-next-buttons",template:'<div class="flex flex-row gap-x-4 items-center">\n  <gn-ui-button\n    data-test="previousButton"\n    [type]="isFirst ? \'default\' : \'outline\'"\n    [disabled]="isFirst"\n    (buttonClick)="previousButtonClicked()"\n  >\n    <mat-icon\n      class="material-symbols-outlined text-[14px] text-center pt-[5px]"\n    >\n      arrow_back\n    </mat-icon>\n  </gn-ui-button>\n  <gn-ui-button\n    data-test="nextButton"\n    [type]="isLast ? \'default\' : \'outline\'"\n    [disabled]="isLast"\n    (buttonClick)="nextButtonClicked()"\n  >\n    <mat-icon\n      class="material-symbols-outlined text-[14px] text-center pt-[5px]"\n    >\n      arrow_forward\n    </mat-icon>\n  </gn-ui-button>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[button_component.r,icon.Ps],styles:[previous_next_buttons_componentngResource_default()]})],PreviousNextButtonsComponent)},"./libs/ui/inputs/src/lib/previous-next-buttons/previous-next-buttons.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_previous_next_buttons_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/previous-next-buttons/previous-next-buttons.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/i18n/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/PreviousNextButtonsComponent",component:_previous_next_buttons_component__WEBPACK_IMPORTED_MODULE_1__.E,parameters:{backgrounds:{default:"dark"}},decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.fR),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.Ps]})]},Primary={args:{isFirst:!0,isLast:!1},render:args=>({props:args,template:'<gn-ui-previous-next-buttons [isFirst]="true" [isLast]="false"></gn-ui-previous-next-buttons>'})}},"./libs/ui/inputs/src/lib/button/button.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/inputs/src/lib/previous-next-buttons/previous-next-buttons.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  --gn-ui-button-rounded: 100%;\n  --gn-ui-button-width: 8px;\n  --gn-ui-button-height: 8px;\n  --gn-ui-button-padding: 12px;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);