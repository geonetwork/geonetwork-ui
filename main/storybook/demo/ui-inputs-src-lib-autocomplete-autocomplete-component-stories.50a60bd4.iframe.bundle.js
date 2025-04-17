(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[2498],{"./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Y:()=>AutocompleteComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,autocomplete_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.css?ngResource"),autocomplete_componentngResource_default=__webpack_require__.n(autocomplete_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),autocomplete=__webpack_require__("./node_modules/@angular/material/fesm2022/autocomplete.mjs"),Subscription=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),ReplaySubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),merge=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/merge.js"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),debounceTime=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),catchError=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),finalize=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),first=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/first.js");let AutocompleteComponent=((_class=class AutocompleteComponent{constructor(){this.clearOnSelection=!1,this.itemSelected=new core.EventEmitter,this.inputSubmitted=new core.EventEmitter,this.control=new fesm2022_forms.p4,this.subscription=new Subscription.w0,this.cancelEnter=!0,this.selectionSubject=new ReplaySubject.t(1),this.lastInputValue$=new ReplaySubject.t(1),this.error=null,this.displayWithFn=item=>item}ngOnChanges(changes){const{value}=changes;if(value){this.displayWithFn(value.previousValue)!==this.displayWithFn(value.currentValue)&&this.updateInputValue(value.currentValue)}}ngOnInit(){this.suggestions$=(0,merge.T)(this.control.valueChanges.pipe((0,filter.h)((value=>"string"==typeof value)),(0,filter.h)((value=>value.length>2)),(0,debounceTime.b)(400),(0,distinctUntilChanged.x)(),(0,tap.b)((()=>this.searching=!0))),this.control.valueChanges.pipe((0,filter.h)((value=>"object"==typeof value&&value.title)),(0,map.U)((item=>item.title)))).pipe((0,switchMap.w)((value=>value?this.action(value):(0,of.of)([]))),(0,catchError.K)((error=>(this.error=error.message,(0,of.of)([])))),(0,finalize.x)((()=>this.searching=!1))),this.subscription=this.control.valueChanges.subscribe((any=>{""!==any&&(this.cancelEnter=!1)})),this.control.valueChanges.pipe((0,filter.h)((value=>"string"==typeof value))).subscribe(this.lastInputValue$)}ngAfterViewInit(){this.autocomplete.optionSelected.subscribe(this.selectionSubject)}ngOnDestroy(){this.subscription.unsubscribe()}updateInputValue(value){value&&this.control.setValue(value),this.inputRef&&(this.inputRef.nativeElement.value=value?.title||"")}clear(){this.inputRef.nativeElement.value="",this.inputSubmitted.emit(""),this.selectionSubject.pipe((0,take.q)(1)).subscribe((selection=>selection&&selection.option.deselect())),this.inputRef.nativeElement.focus(),this.triggerRef.closePanel()}handleEnter(any){this.cancelEnter||(this.inputSubmitted.emit(any),this.triggerRef.closePanel())}handleClickSearch(){this.inputSubmitted.emit(this.inputRef.nativeElement.value),this.triggerRef.closePanel()}handleSelection(event){this.cancelEnter=!0,this.itemSelected.emit(event.option.value),this.clearOnSelection&&this.lastInputValue$.pipe((0,first.P)()).subscribe((any=>{this.inputRef.nativeElement.value=any}))}}).propDecorators={placeholder:[{type:core.Input}],action:[{type:core.Input}],value:[{type:core.Input}],clearOnSelection:[{type:core.Input}],itemSelected:[{type:core.Output}],inputSubmitted:[{type:core.Output}],triggerRef:[{type:core.ViewChild,args:[autocomplete.ZL]}],autocomplete:[{type:core.ViewChild,args:[autocomplete.XC]}],inputRef:[{type:core.ViewChild,args:["searchInput"]}],displayWithFn:[{type:core.Input}]},_class);AutocompleteComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-autocomplete",template:'<div class="relative">\n  <input\n    #searchInput\n    type="text"\n    class="appearance-none focus:outline-white focus:outline-2 focus:outline-dotted focus:outline-offset-2 leading-tight rounded w-full text-black shadow-xl focus:shadow-[0_0_24px_0_rgba(21,40,184,0.09)]"\n    [placeholder]="placeholder"\n    [formControl]="control"\n    [matAutocomplete]="auto"\n    (keyup.enter)="handleEnter($event.target.value)"\n  />\n  <button\n    type="button"\n    class="text-primary-lightest hover:text-primary hover:bg-gray-50 absolute transition-all duration-100 clear-btn inset-y-0"\n    *ngIf="searchInput.value"\n    aria-label="Clear"\n    (click)="clear()"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <button\n    type="button"\n    class="text-primary bg-white hover:text-primary-darkest hover:bg-gray-100 border-gray-300 hover:border-gray-500 absolute transition-all duration-100 search-btn rounded-r inset-y-0 right-0"\n    aria-label="Trigger search"\n    (click)="handleClickSearch()"\n  >\n    <mat-icon>search</mat-icon>\n  </button>\n  <gn-ui-popup-alert\n    *ngIf="error"\n    class="absolute mt-2 w-full top-[100%] left-0"\n    icon="error_outline"\n    position="top"\n    type="warning"\n  >\n    <span translate>search.autocomplete.error</span>\n    {{ error }}\n  </gn-ui-popup-alert>\n</div>\n<mat-autocomplete\n  #auto="matAutocomplete"\n  (optionSelected)="handleSelection($event)"\n  [displayWith]="displayWithFn"\n>\n  <mat-option\n    *ngFor="let suggestion of suggestions$ | async"\n    [value]="suggestion"\n    class="p-2 suggestion"\n  >\n    {{ displayWithFn(suggestion) }}\n  </mat-option>\n</mat-autocomplete>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[autocomplete_componentngResource_default()]})],AutocompleteComponent)},"./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.ts"),rxjs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/throwError.js"),rxjs__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/autocomplete.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/i18n/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/AutocompleteComponent",component:_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.Y,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.fR),_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_4__.Bb,_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.Ps,_angular_forms__WEBPACK_IMPORTED_MODULE_6__.UX]})]},Primary={args:{placeholder:"Full text search",actionResult:["Hello","world"],actionThrowsError:!1},argTypes:{itemSelected:{action:"itemSelected"},inputSubmitted:{action:"inputSubmitted"},actionThrowsError:{type:"boolean"}},render:args=>({props:{...args,action:()=>args.actionThrowsError?(0,rxjs__WEBPACK_IMPORTED_MODULE_7__._)(new Error("Something went terribly wrong!")):(0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(args.actionResult)}})}},"./libs/ui/inputs/src/lib/autocomplete/autocomplete.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".clear-btn {\n  width: 3.5em;\n  height: 100%;\n  right: 3.5em;\n}\n.search-btn {\n  width: 3.5em;\n  height: 100%;\n  border-left-width: 0.1em;\n}\nmat-icon {\n  width: 100%;\n  height: 100%;\n  padding: 0.65em;\n  font-size: 1.5em;\n}\ninput {\n  height: 3.5em;\n  padding: 1.05em;\n}\n.mat-mdc-option.suggestion.mat-mdc-option-active {\n  background-color: var(--color-primary-lightest);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);