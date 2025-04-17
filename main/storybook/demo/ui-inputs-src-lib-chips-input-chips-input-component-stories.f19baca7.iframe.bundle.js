(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[7248],{"./libs/ui/inputs/src/lib/chips-input/chips-input.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{f:()=>ChipsInputComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chips_input_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/chips-input/chips-input.component.css?ngResource"),chips_input_componentngResource_default=__webpack_require__.n(chips_input_componentngResource),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/i18n/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),Subscription=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js");let ChipsInputComponent=class ChipsInputComponent{onChange(event){this.rawChange.next(event)}constructor(http,translate){this.http=http,this.translate=translate,this.required=!1,this.loadOnce=!1,this.autocompleteItems=[],this.invalid=!1,this.items=[],this.requestAutocompleteItems=text=>{if(this.url){if(this.loadOnce&&this.loadedItems)return this.loadedItems;const url=this.url(text),lang=src.Ek[this.translate.currentLang.slice(0,2)];return this.http.get(url.replace("${lang}",lang)).pipe((0,map.T)((item=>item.map((i=>i.values[lang])))))}return(0,of.of)(this.autocompleteItems||[])},this.rawChange=new Subject.B,this.itemsChange=this.rawChange.pipe((0,distinctUntilChanged.F)()),this.subscription=new Subscription.yU}ngOnInit(){this.loadOnce&&(this.loadedItems=this.requestAutocompleteItems("*").pipe((0,shareReplay.t)(1))),this.items=this.selectedItems,this.subscription=this.rawChange.pipe((0,tap.M)((v=>this.invalid=0===v.length))).subscribe(),this.rawChange.next(this.items)}ngOnDestroy(){this.subscription.unsubscribe()}static{this.ctorParameters=()=>[{type:http.Qq},{type:ngx_translate_core.c$}]}static{this.propDecorators={url:[{type:core.Input}],placeholder:[{type:core.Input}],selectedItems:[{type:core.Input}],required:[{type:core.Input}],loadOnce:[{type:core.Input}],autocompleteItems:[{type:core.Input}],itemsChange:[{type:core.Output}]}}};ChipsInputComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-chips-input",template:'<tag-input\n  [ngModel]="items"\n  (ngModelChange)="onChange($event)"\n  onlyFromAutocomplete="true"\n  [placeholder]="placeholder"\n  [secondaryPlaceholder]="placeholder"\n  [ripple]="false"\n  [animationDuration]="{ enter: \'0ms\', leave: \'0ms\' }"\n  [onTextChangeDebounce]="100"\n  class="border-2 border-primary h-full rounded-lg p-2 bg-white text-sm focus:border-primary"\n  [ngClass]="{ invalid: invalid }"\n>\n  <tag-input-dropdown\n    [autocompleteObservable]="requestAutocompleteItems"\n    [minimumTextLength]="0"\n    [keepOpen]="false"\n    [showDropdownIfEmpty]="true"\n  >\n    <ng-template let-item="item" let-index="index">\n      {{ item.display }}\n    </ng-template>\n  </tag-input-dropdown>\n</tag-input>\n',styles:[chips_input_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[http.Qq,ngx_translate_core.c$])],ChipsInputComponent)},"./node_modules/@storybook/angular/dist/client/argsToTemplate.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js");exports.argsToTemplate=function argsToTemplate(args,options={}){const includeSet=options.include?new Set(options.include):null,excludeSet=options.exclude?new Set(options.exclude):null;return Object.entries(args).filter((([key])=>void 0!==args[key])).filter((([key])=>includeSet?includeSet.has(key):!excludeSet||!excludeSet.has(key))).map((([key,value])=>"function"==typeof value?`(${key})="${(0,ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}($event)"`:`[${key}]="${(0,ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}"`)).join(" ")}},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.argsToTemplate=exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/portable-stories.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}});var argsToTemplate_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/argsToTemplate.js");Object.defineProperty(exports,"argsToTemplate",{enumerable:!0,get:function(){return argsToTemplate_1.argsToTemplate}})},"./node_modules/@storybook/angular/dist/client/portable-stories.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result};Object.defineProperty(exports,"__esModule",{value:!0}),exports.setProjectAnnotations=void 0;const preview_api_1=__webpack_require__("storybook/internal/preview-api"),INTERNAL_DEFAULT_PROJECT_ANNOTATIONS=__importStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"));exports.setProjectAnnotations=function setProjectAnnotations(projectAnnotations){return(0,preview_api_1.setDefaultProjectAnnotations)(INTERNAL_DEFAULT_PROJECT_ANNOTATIONS),(0,preview_api_1.setProjectAnnotations)(projectAnnotations)}},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"componentWrapperDecorator")&&__webpack_require__.d(__webpack_exports__,{componentWrapperDecorator:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"moduleMetadata")&&__webpack_require__.d(__webpack_exports__,{moduleMetadata:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata}})},"./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>debounceTime});var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),_util_lift__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");function debounceTime(dueTime,scheduler){return void 0===scheduler&&(scheduler=_scheduler_async__WEBPACK_IMPORTED_MODULE_0__.E),(0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.N)((function(source,subscriber){var activeTask=null,lastValue=null,lastTime=null,emit=function(){if(activeTask){activeTask.unsubscribe(),activeTask=null;var value=lastValue;lastValue=null,subscriber.next(value)}};function emitWhenIdle(){var targetTime=lastTime+dueTime,now=scheduler.now();if(now<targetTime)return activeTask=this.schedule(void 0,targetTime-now),void subscriber.add(activeTask);emit()}source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__._)(subscriber,(function(value){lastValue=value,lastTime=scheduler.now(),activeTask||(activeTask=scheduler.schedule(emitWhenIdle,dueTime),subscriber.add(activeTask))}),(function(){emit(),subscriber.complete()}),void 0,(function(){lastValue=activeTask=null})))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{F:()=>distinctUntilChanged});var _util_identity__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/identity.js"),_util_lift__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");function distinctUntilChanged(comparator,keySelector){return void 0===keySelector&&(keySelector=_util_identity__WEBPACK_IMPORTED_MODULE_0__.D),comparator=null!=comparator?comparator:defaultCompare,(0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.N)((function(source,subscriber){var previousKey,first=!0;source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__._)(subscriber,(function(value){var currentKey=keySelector(value);!first&&comparator(previousKey,currentKey)||(first=!1,previousKey=currentKey,subscriber.next(value))})))}))}function defaultCompare(a,b){return a===b}},"./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>AsyncAction});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),Action=function(_super){function Action(scheduler,work){return _super.call(this)||this}return(0,tslib_es6.C6)(Action,_super),Action.prototype.schedule=function(state,delay){return void 0===delay&&(delay=0),this},Action}(__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js").yU),intervalProvider={setInterval:function(handler,timeout){for(var args=[],_i=2;_i<arguments.length;_i++)args[_i-2]=arguments[_i];var delegate=intervalProvider.delegate;return(null==delegate?void 0:delegate.setInterval)?delegate.setInterval.apply(delegate,(0,tslib_es6.fX)([handler,timeout],(0,tslib_es6.zs)(args))):setInterval.apply(void 0,(0,tslib_es6.fX)([handler,timeout],(0,tslib_es6.zs)(args)))},clearInterval:function(handle){var delegate=intervalProvider.delegate;return((null==delegate?void 0:delegate.clearInterval)||clearInterval)(handle)},delegate:void 0},arrRemove=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"),AsyncAction=function(_super){function AsyncAction(scheduler,work){var _this=_super.call(this,scheduler,work)||this;return _this.scheduler=scheduler,_this.work=work,_this.pending=!1,_this}return(0,tslib_es6.C6)(AsyncAction,_super),AsyncAction.prototype.schedule=function(state,delay){var _a;if(void 0===delay&&(delay=0),this.closed)return this;this.state=state;var id=this.id,scheduler=this.scheduler;return null!=id&&(this.id=this.recycleAsyncId(scheduler,id,delay)),this.pending=!0,this.delay=delay,this.id=null!==(_a=this.id)&&void 0!==_a?_a:this.requestAsyncId(scheduler,this.id,delay),this},AsyncAction.prototype.requestAsyncId=function(scheduler,_id,delay){return void 0===delay&&(delay=0),intervalProvider.setInterval(scheduler.flush.bind(scheduler,this),delay)},AsyncAction.prototype.recycleAsyncId=function(_scheduler,id,delay){if(void 0===delay&&(delay=0),null!=delay&&this.delay===delay&&!1===this.pending)return id;null!=id&&intervalProvider.clearInterval(id)},AsyncAction.prototype.execute=function(state,delay){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var error=this._execute(state,delay);if(error)return error;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},AsyncAction.prototype._execute=function(state,_delay){var errorValue,errored=!1;try{this.work(state)}catch(e){errored=!0,errorValue=e||new Error("Scheduled action threw falsy error")}if(errored)return this.unsubscribe(),errorValue},AsyncAction.prototype.unsubscribe=function(){if(!this.closed){var id=this.id,scheduler=this.scheduler,actions=scheduler.actions;this.work=this.state=this.scheduler=null,this.pending=!1,(0,arrRemove.o)(actions,this),null!=id&&(this.id=this.recycleAsyncId(scheduler,id,null)),this.delay=null,_super.prototype.unsubscribe.call(this)}},AsyncAction}(Action)},"./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{q:()=>AsyncScheduler});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),dateTimestampProvider=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js"),Scheduler=function(){function Scheduler(schedulerActionCtor,now){void 0===now&&(now=Scheduler.now),this.schedulerActionCtor=schedulerActionCtor,this.now=now}return Scheduler.prototype.schedule=function(work,delay,state){return void 0===delay&&(delay=0),new this.schedulerActionCtor(this,work).schedule(state,delay)},Scheduler.now=dateTimestampProvider.U.now,Scheduler}(),AsyncScheduler=function(_super){function AsyncScheduler(SchedulerAction,now){void 0===now&&(now=Scheduler.now);var _this=_super.call(this,SchedulerAction,now)||this;return _this.actions=[],_this._active=!1,_this}return(0,tslib_es6.C6)(AsyncScheduler,_super),AsyncScheduler.prototype.flush=function(action){var actions=this.actions;if(this._active)actions.push(action);else{var error;this._active=!0;do{if(error=action.execute(action.state,action.delay))break}while(action=actions.shift());if(this._active=!1,error){for(;action=actions.shift();)action.unsubscribe();throw error}}},AsyncScheduler}(Scheduler)},"./node_modules/rxjs/dist/esm5/internal/scheduler/async.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{E:()=>asyncScheduler,b:()=>async});var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js"),asyncScheduler=new(__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js").q)(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.R),async=asyncScheduler},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./libs/ui/inputs/src/lib/chips-input/chips-input.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_chips_input_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/chips-input/chips-input.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_angular_forms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),ngx_chips__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/ngx-chips/fesm2020/ngx-chips.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/util/i18n/src/index.ts"),_angular_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/ChipsInputComponent",component:_chips_input_component__WEBPACK_IMPORTED_MODULE_1__.f,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[ngx_chips__WEBPACK_IMPORTED_MODULE_3__.A3,ngx_chips__WEBPACK_IMPORTED_MODULE_3__.eX,ngx_chips__WEBPACK_IMPORTED_MODULE_3__._Z],imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_4__.YN,_angular_forms__WEBPACK_IMPORTED_MODULE_4__.X1,_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.D7,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_2__.sU)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__.BrowserAnimationsModule,_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,ngx_chips__WEBPACK_IMPORTED_MODULE_3__.bh)]})]},Primary={args:{selectedItems:[{display:"item1",value:"item1"}],autocompleteItems:[{display:"item1",value:"item1"},{display:"item2",value:"item2"}],placeholder:"Select tag here!",url:()=>"url"},argTypes:{itemsChange:{action:"itemsChange"}}},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    selectedItems: [{\n      display: 'item1',\n      value: 'item1'\n    }],\n    autocompleteItems: [{\n      display: 'item1',\n      value: 'item1'\n    }, {\n      display: 'item2',\n      value: 'item2'\n    }],\n    placeholder: 'Select tag here!',\n    url: () => 'url'\n  },\n  argTypes: {\n    itemsChange: {\n      action: 'itemsChange'\n    }\n  }\n}",...Primary.parameters?.docs?.source}}}},"./libs/ui/inputs/src/lib/chips-input/chips-input.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"tag-input::ng-deep .ng2-tag-input {\n  border-bottom: none;\n}\ntag-input::ng-deep .ng2-tag-input.ng2-tag-input--focused {\n  border-bottom: none;\n}\n\ntag-input::ng-deep tag {\n  border-radius: 5px;\n  background: var(--color-primary-lightest);\n  font-family: inherit;\n\n  align-content: center;\n\n  font-style: italic;\n}\n\ntag-input::ng-deep\n  tag::ng-deep:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover,\ntag-input::ng-deep\n  tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover {\n  background: var(--color-primary) !important;\n}\n\ntag-input::ng-deep .tag__text {\n  padding-right: 7px;\n}\n\ntag-input::ng-deep div,\ntag-input::ng-deep form {\n  height: 100%;\n}\n\ntag-input.invalid {\n  border-color: var(--color-secondary);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);