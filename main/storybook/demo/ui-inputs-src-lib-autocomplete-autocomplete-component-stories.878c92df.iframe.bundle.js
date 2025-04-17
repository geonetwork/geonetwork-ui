(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[5770],{"./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{s:()=>AutocompleteComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var autocomplete_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.css?ngResource"),autocomplete_componentngResource_default=__webpack_require__.n(autocomplete_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),autocomplete=__webpack_require__("./node_modules/@angular/material/fesm2022/autocomplete.mjs"),ReplaySubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),Subscription=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),merge=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/merge.js"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),first=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/first.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),debounceTime=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),catchError=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),finalize=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),src=__webpack_require__("./libs/ui/widgets/src/index.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),button_component=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.ts"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_iconoir=__webpack_require__("./node_modules/@ng-icons/iconoir/fesm2022/ng-icons-iconoir.mjs"),ng_icons_material_icons_baseline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-baseline.mjs");let AutocompleteComponent=class AutocompleteComponent{constructor(cdRef){this.cdRef=cdRef,this.clearOnSelection=!1,this.preventCompleteOnSelection=!1,this.autoFocus=!1,this.minCharacterCount=3,this.allowSubmit=!1,this.itemSelected=new core.EventEmitter,this.inputSubmitted=new core.EventEmitter,this.inputCleared=new core.EventEmitter,this.control=new fesm2022_forms.hs,this.cancelEnter=!0,this.selectionSubject=new ReplaySubject.m(1),this.lastInputValue$=new ReplaySubject.m(1),this.error=null,this.subscription=new Subscription.yU,this.displayWithFn=item=>item.toString(),this.displayWithFnInternal=item=>null==item?null:this.displayWithFn(item)}ngOnChanges(changes){const{value}=changes;if(value){this.displayWithFnInternal(value.previousValue)!==this.displayWithFnInternal(value.currentValue)&&this.updateInputValue(value.currentValue)}}ngOnInit(){const newValue$=(0,merge.h)((0,of.of)(""),this.inputCleared.pipe((0,map.T)((()=>""))),this.control.valueChanges.pipe((0,filter.p)((value=>"string"==typeof value)),(0,distinctUntilChanged.F)(),(0,debounceTime.B)(400))),externalValueChange$=this.control.valueChanges.pipe((0,filter.p)((value=>"object"==typeof value&&value.title)),(0,map.T)((item=>item.title))),suggestionsFromAction=(0,merge.h)(newValue$.pipe((0,filter.p)((value=>value.length>=this.minCharacterCount))),externalValueChange$).pipe((0,tap.M)((()=>{this.searching=!0,this.error=null})),(0,switchMap.n)((value=>this.action(value))),(0,catchError.W)((error=>(this.error=error.message,(0,of.of)([])))),(0,finalize.j)((()=>this.searching=!1)));this.suggestions$=(0,merge.h)(suggestionsFromAction,newValue$.pipe((0,filter.p)((value=>value.length<this.minCharacterCount)),(0,map.T)((()=>[])))),this.subscription.add(this.suggestions$.pipe((0,filter.p)((suggestions=>0===suggestions.length))).subscribe((()=>{this.triggerRef?.closePanel()}))),this.subscription.add(this.control.valueChanges.subscribe((any=>{""!==any&&(this.cancelEnter=!1)}))),this.control.valueChanges.pipe((0,filter.p)((value=>"string"==typeof value))).subscribe(this.lastInputValue$)}ngAfterViewInit(){this.autocomplete.optionSelected.subscribe(this.selectionSubject),this.autoFocus&&(this.inputRef.nativeElement.focus(),this.cdRef.detectChanges())}ngOnDestroy(){this.subscription?.unsubscribe()}updateInputValue(value){value&&this.control.setValue(value),this.inputRef&&(this.inputRef.nativeElement.value=value?.title||"")}clear(){this.inputRef.nativeElement.value="",this.inputCleared.emit(),this.selectionSubject.pipe((0,take.s)(1)).subscribe((selection=>selection&&selection.option.deselect())),this.inputRef.nativeElement.focus()}handleEnter(any){!this.cancelEnter&&this.allowSubmit&&this.inputSubmitted.emit(any)}handleClickSearch(){this.inputSubmitted.emit(this.inputRef.nativeElement.value)}handleSelection(event){this.cancelEnter=!0,this.itemSelected.emit(event.option.value),this.preventCompleteOnSelection?this.lastInputValue$.pipe((0,first.$)()).subscribe((lastInputValue=>{this.inputRef.nativeElement.value=lastInputValue})):this.clearOnSelection&&(this.inputRef.nativeElement.value="")}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef}];static#_2=this.propDecorators={placeholder:[{type:core.Input}],action:[{type:core.Input}],value:[{type:core.Input}],clearOnSelection:[{type:core.Input}],preventCompleteOnSelection:[{type:core.Input}],autoFocus:[{type:core.Input}],minCharacterCount:[{type:core.Input}],allowSubmit:[{type:core.Input}],itemSelected:[{type:core.Output}],inputSubmitted:[{type:core.Output}],inputCleared:[{type:core.Output}],triggerRef:[{type:core.ViewChild,args:[autocomplete.pN]}],autocomplete:[{type:core.ViewChild,args:[autocomplete.$3]}],inputRef:[{type:core.ViewChild,args:["searchInput"]}],displayWithFn:[{type:core.Input}]}};AutocompleteComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-autocomplete",template:'<span class="w-full inline-block relative">\n  <div\n    class="absolute inset-y-[--icon-padding] left-[--icon-padding] w-[--icon-width] pointer-events-none"\n    *ngIf="!allowSubmit"\n  >\n    <ng-icon name="iconoirSearch" class="text-primary search"></ng-icon>\n  </div>\n  <input\n    #searchInput\n    type="text"\n    class="gn-ui-text-input"\n    [ngClass]="{\n      \'px-[--icon-width]\': !allowSubmit\n    }"\n    [placeholder]="placeholder"\n    [formControl]="control"\n    [matAutocomplete]="auto"\n    (keyup.enter)="handleEnter(searchInput.value)"\n  />\n  <gn-ui-button\n    type="light"\n    extraClass="border-0 text-primary-lightest hover:text-primary focus:text-primary absolute inset-y-[--icon-padding] {{\n      allowSubmit\n        ? \'right-[calc(var(--icon-width)+var(--icon-padding))]\'\n        : \'right-[--icon-padding]\'\n    }}"\n    data-test="clear-btn"\n    *ngIf="searchInput.value"\n    aria-label="Clear"\n    (buttonClick)="clear()"\n  >\n    <ng-icon name="matClose"></ng-icon>\n  </gn-ui-button>\n  <gn-ui-button\n    type="light"\n    extraClass="border-0 border-l-[1px] border-gray-300 hover:border-gray-500 text-primary hover:text-primary-darkest focus:text-primary-darkest absolute inset-y-[--icon-padding] right-[--icon-padding]"\n    aria-label="Trigger search"\n    *ngIf="allowSubmit"\n    data-test="autocomplete-submit-btn"\n    (buttonClick)="handleClickSearch()"\n  >\n    <ng-icon name="iconoirSearch"></ng-icon>\n  </gn-ui-button>\n\n  <gn-ui-popup-alert\n    *ngIf="error"\n    class="absolute mt-2 w-full top-[100%] left-0"\n    icon="matErrorOutlineOutline"\n    position="top"\n    type="warning"\n  >\n    <span translate>search.autocomplete.error</span>\n    {{ error }}\n  </gn-ui-popup-alert>\n</span>\n\n<mat-autocomplete\n  #auto="matAutocomplete"\n  (optionSelected)="handleSelection($event)"\n  [displayWith]="displayWithFnInternal"\n>\n  <mat-option\n    *ngFor="let suggestion of suggestions$ | async"\n    [value]="suggestion"\n    class="p-2 suggestion"\n  >\n    {{ displayWithFnInternal(suggestion) }}\n  </mat-option>\n</mat-autocomplete>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[src.oz,autocomplete.jL,common.CommonModule,ngx_translate_core.h,fesm2022_forms.X1,button_component.Q,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({iconoirSearch:ng_icons_iconoir.oub,matClose:ng_icons_material_icons_baseline.ju0}),(0,ng_icons_core.PG)({size:"1.5rem"})],styles:[autocomplete_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],AutocompleteComponent)},"./libs/ui/inputs/src/lib/button/button.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ButtonComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var button_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/button/button.component.css?ngResource"),button_componentngResource_default=__webpack_require__.n(button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts");let ButtonComponent=class ButtonComponent{constructor(){this.btnClass="gn-ui-btn-default",this.disabled=!1,this.extraClass="",this.buttonClick=new core.EventEmitter}set type(value){switch(value){case"primary":this.btnClass="gn-ui-btn-primary";break;case"secondary":this.btnClass="gn-ui-btn-secondary";break;case"outline":this.btnClass="gn-ui-btn-outline";break;case"light":this.btnClass="gn-ui-btn-light";break;case"gray":this.btnClass="gn-ui-btn-gray";break;case"black":this.btnClass="gn-ui-btn-black";break;default:this.btnClass="gn-ui-btn-default"}}get classList(){return`${this.btnClass} ${this.extraClass}`}handleClick(event){this.buttonClick.emit(),event.preventDefault(),(0,src.Y8)(event)}static#_=this.propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}],extraClass:[{type:core.Input}],buttonClick:[{type:core.Output}]}};ButtonComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-button",template:'<button\n  type="button"\n  [class]="classList"\n  [disabled]="disabled"\n  (click)="handleClick($event)"\n>\n  <ng-content></ng-content>\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[button_componentngResource_default()]})],ButtonComponent)},"./libs/ui/widgets/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{OR:()=>loading_mask_component.O,r3:()=>popover_component.r,oz:()=>popup_alert_component.o,aD:()=>progress_bar_component.a,n0:()=>spinning_loader_component.n,Gi:()=>UiWidgetsModule});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),ngx_dropzone=__webpack_require__("./node_modules/ngx-dropzone/fesm2020/ngx-dropzone.mjs"),color_scale_component=__webpack_require__("./libs/ui/widgets/src/lib/color-scale/color-scale.component.ts"),step_bar_component=__webpack_require__("./libs/ui/widgets/src/lib/step-bar/step-bar.component.ts"),ngx_chips=__webpack_require__("./node_modules/ngx-chips/fesm2020/ngx-chips.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),progress_spinner=__webpack_require__("./node_modules/@angular/material/fesm2022/progress-spinner.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let UiWidgetsModule=class UiWidgetsModule{};UiWidgetsModule=(0,tslib_es6.Cg)([(0,core.NgModule)({declarations:[color_scale_component.r,step_bar_component.Z],imports:[common.CommonModule,ngx_translate_core.h.forChild(),ngx_dropzone.Fg,fesm2022_forms.YN,fesm2022_forms.X1,ngx_chips.bh,src.ek,progress_spinner.D6],exports:[step_bar_component.Z]})],UiWidgetsModule);var progress_bar_component=__webpack_require__("./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.ts"),popover_component=__webpack_require__("./libs/ui/widgets/src/lib/popover/popover.component.ts"),loading_mask_component=__webpack_require__("./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.ts"),popup_alert_component=__webpack_require__("./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.ts"),spinning_loader_component=__webpack_require__("./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.ts")},"./libs/ui/widgets/src/lib/color-scale/color-scale.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>ColorScaleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var color_scale_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/color-scale/color-scale.component.css?ngResource"),color_scale_componentngResource_default=__webpack_require__.n(color_scale_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ColorScaleComponent=class ColorScaleComponent{};ColorScaleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-color-scale",template:'<div class="flex flex-row items-center">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">primary</div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-black"\n    title="primary-black"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-darkest"\n    title="primary-darkest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-darker"\n    title="primary-darker"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary border-2 border-primary-darkest"\n    title="primary"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-lighter"\n    title="primary-lighter"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-lightest"\n    title="primary-lightest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-primary-white"\n    title="primary-white"\n  ></div>\n</div>\n<div class="flex flex-row">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">\n    secondary\n  </div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-black"\n    title="secondary-black"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-darkest"\n    title="secondary-darkest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-darker"\n    title="secondary-darker"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary border-2 border-secondary-darkest"\n    title="secondary"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-lighter"\n    title="secondary-lighter"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-lightest"\n    title="secondary-lightest"\n  ></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-secondary-white"\n    title="secondary-white"\n  ></div>\n</div>\n<div class="flex flex-row">\n  <div class="text-xs text-gray-700 font-bold m-2 w-32 text-right">main</div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-main" title="main"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-900" title="gray-900"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-800" title="gray-800"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-700" title="gray-700"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-600" title="gray-600"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-500" title="gray-500"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-400" title="gray-400"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-300" title="gray-300"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-200" title="gray-200"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-100" title="gray-100"></div>\n  <div class="shadow-md rounded w-6 h-6 m-2 bg-gray-50" title="gray-50"></div>\n  <div\n    class="shadow-md rounded w-6 h-6 m-2 bg-background"\n    title="background"\n  ></div>\n  <div class="text-xs text-gray-700 font-bold m-2 w-32">background</div>\n</div>\n',styles:[color_scale_componentngResource_default()]})],ColorScaleComponent)},"./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>LoadingMaskComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var loading_mask_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.css?ngResource"),loading_mask_componentngResource_default=__webpack_require__.n(loading_mask_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),progress_spinner=__webpack_require__("./node_modules/@angular/material/fesm2022/progress-spinner.mjs");let LoadingMaskComponent=class LoadingMaskComponent{static#_=this.propDecorators={message:[{type:core.Input}]}};LoadingMaskComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-loading-mask",template:'<div class="h-full flex flex-col justify-center items-center relative backdrop">\n  <div class="absolute background bg-white inset-0"></div>\n  <mat-spinner [diameter]="28" class="relative"></mat-spinner>\n  <span class="text-sm text-gray-700 mt-3 relative">{{ message }}</span>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[progress_spinner.D6],standalone:!0,styles:[loading_mask_componentngResource_default()]})],LoadingMaskComponent)},"./libs/ui/widgets/src/lib/popover/popover.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>PopoverComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var popover_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/popover/popover.component.css?ngResource"),popover_componentngResource_default=__webpack_require__.n(popover_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tippy_esm=__webpack_require__("./node_modules/tippy.js/dist/tippy.esm.js");let PopoverComponent=class PopoverComponent{constructor(viewContainerRef,renderer){this.viewContainerRef=viewContainerRef,this.renderer=renderer}getContent(){if(this.content instanceof core.TemplateRef){this.view&&this.view.destroy(),this.view=this.viewContainerRef.createEmbeddedView(this.content),this.view.detectChanges();const wrapper=this.renderer.createElement("div");return this.view.rootNodes.forEach((node=>{this.renderer.appendChild(wrapper,node)})),wrapper}return this.content}ngAfterViewInit(){this.tippyInstance=(0,tippy_esm.Ay)(this.popoverContent.nativeElement,{content:this.getContent(),allowHTML:!0,theme:this.theme})}ngOnChanges(changes){changes.theme&&(this.theme=changes.theme.currentValue,this.tippyInstance&&this.tippyInstance.setProps({theme:this.theme})),changes.content&&(this.content=changes.content.currentValue,this.tippyInstance&&this.tippyInstance.setContent(this.getContent()))}ngOnDestroy(){this.tippyInstance&&this.tippyInstance.destroy(),this.view&&this.view.destroy()}static#_=this.ctorParameters=()=>[{type:core.ViewContainerRef},{type:core.Renderer2}];static#_2=this.propDecorators={popoverContent:[{type:core.ViewChild,args:["popoverContent",{static:!1}]}],content:[{type:core.Input}],theme:[{type:core.Input}]}};PopoverComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-popover",template:"<span #popoverContent>\n  <ng-content></ng-content>\n</span>\n",standalone:!0,imports:[common.CommonModule],styles:[popover_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ViewContainerRef,core.Renderer2])],PopoverComponent)},"./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>PopupAlertComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var popup_alert_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.css?ngResource"),popup_alert_componentngResource_default=__webpack_require__.n(popup_alert_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_material_icons_outline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-outline.mjs");let PopupAlertComponent=class PopupAlertComponent{constructor(changeDetector){this.changeDetector=changeDetector,this.type="info",this.position="top",this.expanded=!1,this.timeout=null}get showDuration(){const chars=this.content.nativeElement.innerHTML.length;return Math.max(3e3,20*chars)}ngOnInit(){this.expandAndClose()}expand(){this.expanded=!0,this.changeDetector.detectChanges(),clearTimeout(this.timeout)}expandAndClose(){this.expanded=!0,this.changeDetector.detectChanges(),clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.expanded=!1,this.changeDetector.detectChanges()}),this.showDuration)}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef}];static#_2=this.propDecorators={icon:[{type:core.Input}],type:[{type:core.Input}],position:[{type:core.Input}],content:[{type:core.ViewChild,args:["content"]}]}};PopupAlertComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-popup-alert",template:"<div class=\"h-full relative container\">\n  <div\n    class=\"pointer-events-auto absolute text-white flex flex-row p-2 rounded message\"\n    role=\"alert\"\n    [ngClass]=\"{\n      'position-bottom': position === 'bottom',\n      'position-top': position === 'top',\n      expanded: this.expanded,\n      'bg-red-500': type === 'danger',\n      'bg-yellow-500': type === 'warning',\n      'bg-blue-500': type === 'info'\n    }\"\n    (mouseenter)=\"expand()\"\n    (mouseleave)=\"expandAndClose()\"\n  >\n    <ng-icon class=\"mr-2 shrink-0 select-none\" [name]=\"icon\"></ng-icon>\n    <div class=\"grow\" #content [ngClass]=\"{ invisible: !expanded }\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({matErrorOutlineOutline:ng_icons_material_icons_outline.Bak})],styles:[popup_alert_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],PopupAlertComponent)},"./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ProgressBarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var progress_bar_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.css?ngResource"),progress_bar_componentngResource_default=__webpack_require__.n(progress_bar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ProgressBarComponent=class ProgressBarComponent{constructor(){this.value=0,this.type="default"}get progress(){return this.value>0?this.value<100?this.value:100:0}get color(){switch(this.type){case"default":return{outerBar:"bg-gray-200",innerBar:"bg-gray-100",text:"text-gray-900"};case"primary":return{outerBar:"bg-primary",innerBar:"bg-primary-lighter",text:"text-white"};case"secondary":return{outerBar:"bg-secondary",innerBar:"bg-secondary-lighter",text:"text-white"}}}static#_=this.propDecorators={value:[{type:core.Input}],type:[{type:core.Input}]}};ProgressBarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-progress-bar",template:'<div class="flex h-full {{ color.outerBar }} rounded-t-lg rounded-b-lg">\n  <div\n    [style.width.%]="progress"\n    class="flex {{\n      color.innerBar\n    }} my-1 mx-1 transition-width duration-500 ease-in-out rounded-t-md rounded-b-md shadow-xl"\n  >\n    <div class="flex items-center pl-2 py-1 {{ color.text }} font-bold text-4">\n      {{ progress }}%\n    </div>\n  </div>\n</div>\n',standalone:!0,styles:[progress_bar_componentngResource_default()]})],ProgressBarComponent)},"./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>SpinningLoaderComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var spinning_loader_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.css?ngResource"),spinning_loader_componentngResource_default=__webpack_require__.n(spinning_loader_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SpinningLoaderComponent=class SpinningLoaderComponent{};SpinningLoaderComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-spinning-loader",template:'<span>\n  <svg\n    class="animate-spin h-8 w-8 text-primary"\n    xmlns="http://www.w3.org/2000/svg"\n    fill="none"\n    viewBox="0 0 24 24"\n  >\n    <circle\n      class="opacity-25"\n      cx="12"\n      cy="12"\n      r="10"\n      stroke="currentColor"\n      stroke-width="4"\n    ></circle>\n    <path\n      class="opacity-75"\n      fill="currentColor"\n      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"\n    ></path>\n  </svg>\n</span>\n',standalone:!0,styles:[spinning_loader_componentngResource_default()]})],SpinningLoaderComponent)},"./libs/ui/widgets/src/lib/step-bar/step-bar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>StepBarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var step_bar_componentngResource=__webpack_require__("./libs/ui/widgets/src/lib/step-bar/step-bar.component.css?ngResource"),step_bar_componentngResource_default=__webpack_require__.n(step_bar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let StepBarComponent=class StepBarComponent{constructor(cdr){this.cdr=cdr,this.currentStep=1,this.type="default"}get stepCounter(){return new Array(this.steps)}get color(){switch(this.type){case"default":return{outerBar:"bg-gray-200",innerBar:"bg-gray-100"};case"primary":return{outerBar:"bg-primary",innerBar:"bg-primary-lighter"};case"secondary":return{outerBar:"bg-secondary",innerBar:"bg-secondary-lighter"}}}getCircleColor(index){return index===this.currentStep?"bg-black":index<this.currentStep?"bg-white":this.color.innerBar}getChecked(index){return index+1<this.currentStep}static#_=this.ctorParameters=()=>[{type:core.ChangeDetectorRef}];static#_2=this.propDecorators={steps:[{type:core.Input}],currentStep:[{type:core.Input}],type:[{type:core.Input}]}};StepBarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-step-bar",template:'<div class="relative flex flex-col justify-center">\n  <div class="flex justify-between ml-16 mr-16 z-10 circle-steps">\n    <div\n      *ngFor="let step of stepCounter; let i = index"\n      class="shadow-md rounded-full h-6 w-6 {{ getCircleColor(i + 1) }}"\n    >\n      <span class="icon-check pl-1" *ngIf="getChecked(i)"></span>\n    </div>\n  </div>\n  <div\n    class="absolute rounded-lg right-0 w-full {{ color.outerBar }} h-2 z-0"\n  ></div>\n</div>\n',styles:[step_bar_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ChangeDetectorRef])],StepBarComponent)},"./node_modules/rxjs/dist/esm5/internal/observable/throwError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>throwError});var _Observable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_util_isFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");function throwError(errorOrErrorFactory,scheduler){var errorFactory=(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(errorOrErrorFactory)?errorOrErrorFactory:function(){return errorOrErrorFactory},init=function(subscriber){return subscriber.error(errorFactory())};return new _Observable__WEBPACK_IMPORTED_MODULE_1__.c(scheduler?function(subscriber){return scheduler.schedule(init,0,subscriber)}:init)}},"./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NoMinimumCharacterCount:()=>NoMinimumCharacterCount,NoSubmit:()=>NoSubmit,SubmitAllowed:()=>SubmitAllowed,WithCustomStyle:()=>WithCustomStyle,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.ts"),rxjs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/throwError.js"),rxjs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/i18n/src/index.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/AutocompleteComponent",component:_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.s,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.s,_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.D7,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.sU),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.BrowserAnimationsModule]})]},initialItems=["Hello","world","from","storybook"];function filterResults(value){return initialItems.filter((item=>item.toLowerCase().includes(value?.toLowerCase())))}const SubmitAllowed={args:{placeholder:"Full text search",minCharacterCount:3,actionThrowsError:!1,clearOnSelection:!1,allowSubmit:!0},argTypes:{itemSelected:{action:"itemSelected"},inputSubmitted:{action:"inputSubmitted"},actionThrowsError:{type:"boolean"}},render:args=>({props:{...args,action:value=>args.actionThrowsError?(0,rxjs__WEBPACK_IMPORTED_MODULE_5__.$)((()=>new Error("Something went terribly wrong!"))):(0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(filterResults(value))}})},NoSubmit={args:{placeholder:"This will only show suggestions, there is no submit button",minCharacterCount:3,actionThrowsError:!1,clearOnSelection:!1,allowSubmit:!1},argTypes:{itemSelected:{action:"itemSelected"},inputSubmitted:{action:"inputSubmitted"},actionThrowsError:{type:"boolean"}},render:args=>({props:{...args,action:value=>args.actionThrowsError?(0,rxjs__WEBPACK_IMPORTED_MODULE_5__.$)((()=>new Error("Something went terribly wrong!"))):(0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(filterResults(value))}})},WithCustomStyle={...NoSubmit,render:args=>({props:args,styles:[":host { --gn-ui-text-input-rounded: 10px; --gn-ui-text-input-padding: 20px; --gn-ui-text-input-font-size: 18px }"]})},NoMinimumCharacterCount={args:{placeholder:"Click to show suggestions! selecting one should clear this field",minCharacterCount:0,clearOnSelection:!0},argTypes:{itemSelected:{action:"itemSelected"},inputSubmitted:{action:"inputSubmitted"}},render:args=>({props:{...args,action:value=>(0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(filterResults(value))}})}},"./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"span {\n  --icon-padding: var(--gn-ui-text-input-border-size, 2px);\n  --icon-width: calc(var(--gn-ui-text-input-padding, 0.6em) * 2 + 1.25em);\n}\n/* this is because we don't want to change the popup alert font size */\nspan > *:not(gn-ui-popup-alert) {\n  font-size: var(--gn-ui-text-input-font-size, 1em);\n}\n\ninput:placeholder-shown {\n  text-overflow: ellipsis;\n}\ngn-ui-button {\n  --gn-ui-button-rounded: 0;\n  --gn-ui-button-width: var(--icon-width);\n  --gn-ui-button-padding: 0;\n  font-size: 1em;\n}\nng-icon.search {\n  margin-top: 0.6rem;\n  margin-left: 0.6rem;\n}\ngn-ui-button:last-of-type {\n  --gn-ui-button-rounded: 0 var(--gn-ui-text-input-rounded, 0.25em)\n    var(--gn-ui-text-input-rounded, 0.25em) 0;\n}\n\n.mat-mdc-option.suggestion.mat-mdc-option-active {\n  background-color: var(--color-primary-lightest);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/inputs/src/lib/button/button.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/color-scale/color-scale.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/loading-mask/loading-mask.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"/* this overrides the spinner color with a CSS variable to match the theme */\n::ng-deep .mat-spinner circle {\n  stroke: var(--color-gray-700);\n  opacity: 0.5;\n}\n\n.backdrop {\n  background-color: rgba(255, 255, 255, 0.4);\n}\n\n@supports ((-webkit-backdrop-filter: blur()) or (backdrop-filter: blur())) {\n  .backdrop {\n    background-color: transparent;\n    -webkit-backdrop-filter: blur(4px);\n            backdrop-filter: blur(4px);\n  }\n}\n\n.background {\n  opacity: 0.7;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/popover/popover.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/popup-alert/popup-alert.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  pointer-events: none;\n}\n.container {\n  filter: drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.2));\n}\n.message {\n  transition: clip-path 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.message.expanded {\n  clip-path: circle(100%);\n}\n.position-top {\n  clip-path: circle(19px at 20px 20px);\n  align-items: start;\n  top: 0;\n  left: 0;\n}\n.position-bottom {\n  clip-path: circle(19px at 20px calc(100% - 20px));\n  align-items: end;\n  bottom: 0;\n  left: 0;\n}\n\n/* style links inside message */\n.container ::ng-deep a {\n  text-decoration: underline;\n  font-weight: bold;\n}\n.container ::ng-deep a:hover {\n  opacity: 0.85;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/progress-bar/progress-bar.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".font-bold {\n  font-weight: var(--progress-bar-font-weight, 'bold');\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/spinning-loader/spinning-loader.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/widgets/src/lib/step-bar/step-bar.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".icon-check {\n  color: var(--color-primary);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);