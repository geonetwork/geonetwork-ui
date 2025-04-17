(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[8792],{"./libs/ui/inputs/src/lib/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,button_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.css?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts");let ButtonComponent=((_class=class ButtonComponent{constructor(){this.disabled=!1,this.extraClass="",this.buttonClick=new core.EventEmitter}set type(value){switch(value){case"primary":this.btnClass="btn-primary";break;case"secondary":this.btnClass="btn-secondary";break;case"outline":this.btnClass="btn-outline";break;case"light":this.btnClass="btn-light";break;default:this.btnClass="btn-default"}}get classList(){return`${this.btnClass} ${this.extraClass}`}handleClick(event){this.buttonClick.emit(),event.preventDefault(),(0,src.Yr)(event)}}).propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}],extraClass:[{type:core.Input}],buttonClick:[{type:core.Output}]},_class);ButtonComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-button",template:'<button\n  type="button"\n  class="flex flex-row items-center text-[1em] leading-none p-[1em] rounded-[0.25em] transition-all duration-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"\n  [class]="classList"\n  [disabled]="disabled"\n  (click)="handleClick($event)"\n>\n  <ng-content></ng-content>\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[button_componentngResource_default()]})],ButtonComponent)},"./libs/ui/inputs/src/lib/dropdown-multiselect/dropdown-multiselect.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>DropdownMultiselectComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,dropdown_multiselect_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/dropdown-multiselect/dropdown-multiselect.component.css?ngResource"),dropdown_multiselect_componentngResource_default=__webpack_require__.n(dropdown_multiselect_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),overlay=__webpack_require__("./node_modules/@angular/cdk/fesm2022/overlay.mjs"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),src=__webpack_require__("./libs/util/shared/src/index.ts");let DropdownMultiselectComponent=((_class=class DropdownMultiselectComponent{get hasSelectedChoices(){return this.selected.length>0}get selectedChoices(){return this.choices.filter((choice=>this.selected.indexOf(choice.value)>-1))}get filteredChoicesByText(){if(!this.searchInputValue)return this.choices;const filter=(0,src.B9)(this.searchInputValue);return this.choices.filter((choice=>filter(choice.label)))}get focusedIndex(){return this.checkboxes.reduce(((prev,curr,curIndex)=>curr.nativeElement===document.activeElement?curIndex:prev),-1)}constructor(scrollStrategies){this.scrollStrategies=scrollStrategies,this.selected=[],this.allowSearch=!0,this.searchInputValue="",this.selectValues=new core.EventEmitter,this.overlayPositions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top",offsetY:8},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",offsetY:-8}],this.scrollStrategy=this.scrollStrategies.reposition(),this.overlayOpen=!1,this.overlayWidth="auto",this.overlayMaxHeight="none",this.id=`dropdown-multiselect-${Math.floor(1e4*Math.random())}`}setFocus(){setTimeout((()=>{this.searchFieldInput.nativeElement.focus()}),0)}openOverlay(){return this.overlayWidth=this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect().width+"px",this.overlayMaxHeight=this.maxRows?29*this.maxRows+60+"px":"none",this.overlayOpen=!0,this.setFocus(),Promise.all([this.overlay.attach.pipe((0,take.q)(1)).toPromise(),this.checkboxes.changes.pipe((0,take.q)(1)).toPromise()])}closeOverlay(){this.overlayOpen=!1}handleTriggerKeydown(event){var _this=this;return(0,asyncToGenerator.Z)((function*(){const keyCode=event.code,isOpenKey="ArrowDown"===keyCode||"ArrowUp"===keyCode||"ArrowLeft"===keyCode||"ArrowRight"===keyCode||"Enter"===keyCode||"Space"===keyCode,isCloseKey="Escape"===keyCode||isOpenKey;!_this.overlayOpen&&isOpenKey?(event.preventDefault(),yield _this.openOverlay(),"ArrowLeft"===keyCode||"ArrowUp"===keyCode?_this.focusLastItem():_this.focusFirstItem()):_this.overlayOpen&&isCloseKey&&(event.preventDefault(),_this.closeOverlay())}))()}handleOverlayKeydown(event){if(!this.overlayOpen)return;const keyCode=event.code;"ArrowDown"===keyCode||"ArrowRight"===keyCode?(event.preventDefault(),"checkbox"!==document.activeElement.type?this.focusFirstItem():this.shiftItemFocus(1)):"ArrowLeft"===keyCode||"ArrowUp"===keyCode?(event.preventDefault(),this.shiftItemFocus(-1)):"Escape"===keyCode&&this.closeOverlay()}focusFirstItem(){this.checkboxes.get(0).nativeElement.focus()}focusLastItem(){this.checkboxes.get(this.checkboxes.length-1).nativeElement.focus()}shiftItemFocus(shift){const index=this.focusedIndex;if(-1===index)return;const max=this.checkboxes.length,newIndex=((index+shift)%max+max)%max;this.checkboxes.get(newIndex).nativeElement.focus()}isSelected(choice){return this.selected.indexOf(choice.value)>-1}select(choice,selected){this.selected=selected?[...this.selected.filter((v=>v!==choice.value)),choice.value]:this.selected.filter((v=>v!==choice.value)),this.selectValues.emit(this.selected)}toggle(choice){this.select(choice,!this.isSelected(choice))}clearSelection(event){this.selectValues.emit([]),(0,src.Yr)(event)}clearSearchInputValue(event){this.searchInputValue="",(0,src.Yr)(event),this.setFocus()}}).ctorParameters=()=>[{type:overlay.uw}],_class.propDecorators={title:[{type:core.Input}],choices:[{type:core.Input}],selected:[{type:core.Input}],allowSearch:[{type:core.Input}],maxRows:[{type:core.Input}],searchInputValue:[{type:core.Input}],selectValues:[{type:core.Output}],overlayOrigin:[{type:core.ViewChild,args:["overlayOrigin"]}],overlay:[{type:core.ViewChild,args:[overlay.pI]}],overlayContainer:[{type:core.ViewChild,args:["overlayContainer",{read:core.ElementRef}]}],searchFieldInput:[{type:core.ViewChild,args:["searchFieldInput"]}],checkboxes:[{type:core.ViewChildren,args:["checkBox",{read:core.ElementRef}]}]},_class);DropdownMultiselectComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-dropdown-multiselect",template:'<gn-ui-button\n  type="outline"\n  extraClass="w-full !p-[8px] !pl-[16px]"\n  [title]="title"\n  [attr.aria-owns]="id"\n  (buttonClick)="openOverlay()"\n  (keydown)="handleTriggerKeydown($event)"\n  cdkOverlayOrigin\n  #overlayOrigin="cdkOverlayOrigin"\n>\n  <div class="grow flex items-center mr-2 gap-2 overflow-hidden">\n    <div class="text-left font-medium truncate py-1">\n      {{ title }}\n    </div>\n    <div\n      *ngIf="hasSelectedChoices"\n      class="shrink-0 rounded-full text-primary bg-primary-opacity-25 text-white font-bold text-[12px] w-5 h-5 flex items-center justify-center mr-1 selected-count"\n    >\n      {{ selected.length }}\n    </div>\n  </div>\n  <button class="h-6 w-6" data-cy="clearSelection">\n    <mat-icon\n      class="material-symbols-outlined shrink-0 opacity-40 mr-1.5 hover:opacity-80 transition-colors clear-btn"\n      *ngIf="hasSelectedChoices && !overlayOpen"\n      (click)="clearSelection($event)"\n    >\n      close\n    </mat-icon>\n  </button>\n  <mat-icon class="material-symbols-outlined shrink-0 opacity-40">\n    <ng-container *ngIf="overlayOpen">expand_less</ng-container>\n    <ng-container *ngIf="!overlayOpen">expand_more</ng-container>\n  </mat-icon>\n</gn-ui-button>\n\n<ng-template\n  cdkConnectedOverlay\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"\n  [cdkConnectedOverlayOrigin]="overlayOrigin"\n  [cdkConnectedOverlayOpen]="overlayOpen"\n  [cdkConnectedOverlayPositions]="overlayPositions"\n  [cdkConnectedOverlayScrollStrategy]="scrollStrategy"\n  [cdkConnectedOverlayFlexibleDimensions]="true"\n  (overlayOutsideClick)="closeOverlay()"\n  (detach)="closeOverlay()"\n>\n  <div\n    class="bg-white border border-gray-300 rounded shadow-lg py-2 w-full overflow-x-hidden overflow-y-auto overlay-container"\n    [style.max-height]="overlayMaxHeight"\n    [style.width]="overlayWidth"\n    role="listbox"\n    tabindex="-1"\n    [attr.id]="id"\n    [attr.aria-multiselectable]="true"\n    [attr.aria-label]="title"\n    (keydown)="handleOverlayKeydown($event)"\n    #overlayContainer\n  >\n    <div\n      class="border border-gray-300 rounded mb-2 mx-2 min-h-[44px] flex flex-row flex-wrap p-2 focus-within:rounded focus-within:border-2 focus-within:border-primary"\n    >\n      <button\n        type="button"\n        *ngFor="let selected of selectedChoices"\n        [title]="selected.label"\n        class="max-w-full bg-main text-white rounded pr-[7px] flex gap-1 items-center opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity mb-1"\n        (click)="select(selected, false)"\n      >\n        <div class="text-sm truncate leading-[26px] px-2">\n          {{ selected.label }}\n        </div>\n        <div\n          class="flex items-center justify-center rounded-full bg-white text-main h-[13px] w-[13px] pt-px -mt-px shrink-0"\n        >\n          <mat-icon\n            class="material-symbols-outlined !h-[12px] !w-[12px] text-[12px]"\n          >\n            close</mat-icon\n          >\n        </div>\n      </button>\n\n      <div *ngIf="allowSearch" class="w-[50%] relative grow shrink">\n        <input\n          #searchFieldInput\n          class="w-full px-2 truncate text-[14px] h-full overlaySearchInput focus:outline-none"\n          [(ngModel)]="searchInputValue"\n          [placeholder]="\'multiselect.filter.placeholder\' | translate"\n        />\n        <button\n          *ngIf="!!searchInputValue"\n          class="absolute top-1/2 -translate-y-1/2 right-0 px-[7px] leading-tight clear-search-input mr-2"\n          (click)="clearSearchInputValue($event)"\n        >\n          <mat-icon\n            class="material-symbols-outlined !h-[10px] !w-[12px] text-[12px]"\n          >\n            close\n          </mat-icon>\n        </button>\n      </div>\n    </div>\n\n    <label\n      *ngFor="let choice of filteredChoicesByText"\n      [title]="choice.label"\n      class="flex px-5 py-1 w-full text-gray-900 cursor-pointer hover:text-primary-darkest hover:bg-gray-50 focus-within:text-primary-darkest focus-within:bg-gray-50 transition-colors"\n    >\n      <input\n        class="w-[18px] h-[18px] align-text-top shrink-0"\n        type="checkbox"\n        #checkBox\n        [checked]="isSelected(choice)"\n        (change)="select(choice, $event.target.checked)"\n      />\n      <span class="ml-[8px] text-[14px] truncate">\n        {{ choice.label }}\n      </span>\n    </label>\n  </div>\n</ng-template>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[dropdown_multiselect_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[overlay.uw])],DropdownMultiselectComponent)},"./libs/ui/inputs/src/lib/dropdown-multiselect/dropdown-multiselect.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_dropdown_multiselect_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/dropdown-multiselect/dropdown-multiselect.component.ts"),_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/overlay.mjs"),_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/material/fesm2022/checkbox.mjs"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_button_button_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/DropdownMultiselectComponent",component:_dropdown_multiselect_component__WEBPACK_IMPORTED_MODULE_1__.c,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.Hw,_button_button_component__WEBPACK_IMPORTED_MODULE_2__.r],imports:[_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.U8,_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.p9,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.aw.forRoot()]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto">\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  </p>\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  </p>\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  </p>\n  ${story}\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  </p>\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  </p>\n  <p>\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n</p>\n</div>`))]},Primary={args:{title:"my title",choices:[{label:"My Choice 1",value:"choice1"},{label:"My Choice 2 (very, very, very, very, very, very long text coming up)",value:"choice2"},{label:"My Choice 3 (very long text coming up)",value:{name:"choice3"}},{label:"My Numerical choice",value:1234},{label:"My boolean choice",value:!1}],selected:["choice1"],allowSearch:!0,maxRows:4},argTypes:{selectValues:{action:"selectValues"}}}},"./libs/ui/inputs/src/lib/button/button.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* makes sure icons will not make the buttons grow vertically */\n:host ::ng-deep mat-icon.mat-icon {\n  margin-top: -0.325em;\n  margin-bottom: -0.325em;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/inputs/src/lib/dropdown-multiselect/dropdown-multiselect.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);