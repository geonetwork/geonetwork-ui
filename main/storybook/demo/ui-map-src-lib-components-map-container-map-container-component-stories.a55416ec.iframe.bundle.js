(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[4622],{"./libs/ui/map/src/lib/components/map-container/map-container.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{L:()=>MapContainerComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var map_container_componentngResource=__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-container.component.css?ngResource"),map_container_componentngResource_default=__webpack_require__.n(map_container_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),merge=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/merge.js"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),startWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/startWith.js"),delay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/delay.js"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),dist=__webpack_require__("./node_modules/@geospatial-sdk/core/dist/index.js"),openlayers_dist=__webpack_require__("./node_modules/@geospatial-sdk/openlayers/dist/index.js"),map_settings_token=__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-settings.token.ts"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_material_icons_outline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-outline.mjs");const DEFAULT_BASEMAP_LAYER={type:"xyz",url:"https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",attributions:'<span>© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a></span>'},DEFAULT_VIEW={center:[0,15],zoom:2};let MapContainerComponent=class MapContainerComponent{get featuresClick(){return this._featuresClick||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.QS,(({features})=>this._featuresClick.emit(features)))})),this._featuresClick=new core.EventEmitter),this._featuresClick}get featuresHover(){return this._featuresHover||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.UH,(({features})=>this._featuresHover.emit(features)))})),this._featuresHover=new core.EventEmitter),this._featuresHover}get mapClick(){return this._mapClick||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.fD,(({coordinate})=>this._mapClick.emit(coordinate)))})),this._mapClick=new core.EventEmitter),this._mapClick}get sourceLoadError(){return this._sourceLoadError||(this.openlayersMap.then((olMap=>{(0,openlayers_dist.KT)(olMap,dist.C$,(error=>this._sourceLoadError.emit(error)))})),this._sourceLoadError=new core.EventEmitter),this._sourceLoadError}constructor(doNotUseDefaultBasemap,basemapLayers,mapViewConstraints){this.doNotUseDefaultBasemap=doNotUseDefaultBasemap,this.basemapLayers=basemapLayers,this.mapViewConstraints=mapViewConstraints,this.openlayersMap=new Promise((resolve=>{this.olMapResolver=resolve}))}ngAfterViewInit(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.olMap=yield(0,openlayers_dist.gJ)(_this.processContext(_this.context),_this.container.nativeElement),_this.displayMessage$=(0,merge.h)((0,fromEvent.R)(_this.olMap,"mapmuted").pipe((0,map.T)((()=>!0))),(0,fromEvent.R)(_this.olMap,"movestart").pipe((0,map.T)((()=>!1))),(0,fromEvent.R)(_this.olMap,"singleclick").pipe((0,map.T)((()=>!1)))).pipe((0,switchMap.n)((muted=>muted?(0,timer.O)(2e3).pipe((0,map.T)((()=>!1)),(0,startWith.Z)(!0),(0,delay.c)(400)):(0,of.of)(!1)))),_this.olMapResolver(_this.olMap)}))()}ngOnChanges(changes){var _this2=this;return(0,asyncToGenerator.A)((function*(){if("context"in changes&&!changes.context.isFirstChange()){const diff=(0,dist.mm)(_this2.processContext(changes.context.currentValue),_this2.processContext(changes.context.previousValue));yield(0,openlayers_dist.KP)(_this2.olMap,diff)}}))()}processContext(context){const processed=context?{...context,view:context.view??DEFAULT_VIEW}:{layers:[],view:DEFAULT_VIEW};return this.basemapLayers.length&&(processed.layers=[...this.basemapLayers,...processed.layers]),this.doNotUseDefaultBasemap||(processed.layers=[DEFAULT_BASEMAP_LAYER,...processed.layers]),this.mapViewConstraints.maxZoom&&(processed.view={maxZoom:this.mapViewConstraints.maxZoom,...processed.view}),this.mapViewConstraints.maxExtent&&(processed.view={maxExtent:this.mapViewConstraints.maxExtent,...processed.view}),!processed.view||"zoom"in processed.view||"center"in processed.view||(this.mapViewConstraints.maxExtent?processed.view={extent:this.mapViewConstraints.maxExtent,...processed.view}:processed.view={...DEFAULT_VIEW,...processed.view}),processed}static{this.ctorParameters=()=>[{type:Boolean,decorators:[{type:core.Inject,args:[map_settings_token.Mo]}]},{type:Array,decorators:[{type:core.Inject,args:[map_settings_token.p0]}]},{type:void 0,decorators:[{type:core.Inject,args:[map_settings_token.ay]}]}]}static{this.propDecorators={context:[{type:core.Input}],featuresClick:[{type:core.Output}],featuresHover:[{type:core.Output}],mapClick:[{type:core.Output}],sourceLoadError:[{type:core.Output}],container:[{type:core.ViewChild,args:["map"]}]}}};MapContainerComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-map-container",template:'<div class="h-full w-full" #map></div>\n<div\n  class="absolute inset-0 p-2 rounded z-40 transition-all flex flex-col justify-center items-center text-primary font-sans pointer-events-none"\n  [ngClass]="\n    (displayMessage$ | async) ? \'visible opacity-100\' : \'invisible opacity-0\'\n  "\n>\n  <div\n    class="absolute z-[-1] inset-0 bg-gradient-to-b from-white to-primary-lightest opacity-60"\n  ></div>\n  <ng-icon\n    class="!w-16 !h-16 text-[64px] mb-4"\n    name="matSwipeOutline"\n  ></ng-icon>\n  <p translate>map.navigation.message</p>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,ngx_translate_core.h,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({matSwipeOutline:ng_icons_material_icons_outline.RKP}),(0,ng_icons_core.PG)({size:"1.5em"})],styles:[map_container_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[Boolean,Array,Object])],MapContainerComponent)},"./libs/ui/map/src/lib/components/map-container/map-settings.token.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Mo:()=>DO_NOT_USE_DEFAULT_BASEMAP,ay:()=>MAP_VIEW_CONSTRAINTS,p0:()=>BASEMAP_LAYERS});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const DO_NOT_USE_DEFAULT_BASEMAP=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("doNotUseDefaultBasemap",{factory:()=>!1}),BASEMAP_LAYERS=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("basemapLayers",{factory:()=>[]}),MAP_VIEW_CONSTRAINTS=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("mapViewConstraints",{factory:()=>({})});new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("vectorStyleDefault",{factory:()=>({fill:{color:"rgba(255, 255, 255, 0.2)"},stroke:{color:"#ffcc33",width:2}})})},"./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>fromEvent});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_Observable__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js"),_util_isFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isFunction.js"),_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"),nodeEventEmitterMethods=["addListener","removeListener"],eventTargetMethods=["addEventListener","removeEventListener"],jqueryMethods=["on","off"];function fromEvent(target,eventName,options,resultSelector){if((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(options)&&(resultSelector=options,options=void 0),resultSelector)return fromEvent(target,eventName,options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.I)(resultSelector));var _a=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.zs)(function isEventTarget(target){return(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(target.addEventListener)&&(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(target.removeEventListener)}(target)?eventTargetMethods.map((function(methodName){return function(handler){return target[methodName](eventName,handler,options)}})):function isNodeStyleEventEmitter(target){return(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(target.addListener)&&(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(target.removeListener)}(target)?nodeEventEmitterMethods.map(toCommonHandlerRegistry(target,eventName)):function isJQueryStyleEventEmitter(target){return(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(target.on)&&(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.T)(target.off)}(target)?jqueryMethods.map(toCommonHandlerRegistry(target,eventName)):[],2),add=_a[0],remove=_a[1];if(!add&&(0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.X)(target))return(0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.Z)((function(subTarget){return fromEvent(subTarget,eventName,options)}))((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.Tg)(target));if(!add)throw new TypeError("Invalid event target");return new _Observable__WEBPACK_IMPORTED_MODULE_6__.c((function(subscriber){var handler=function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return subscriber.next(1<args.length?args:args[0])};return add(handler),function(){return remove(handler)}}))}function toCommonHandlerRegistry(target,eventName){return function(methodName){return function(handler){return target[methodName](eventName,handler)}}}},"./node_modules/rxjs/dist/esm5/internal/observable/merge.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{h:()=>merge});var _operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js"),_innerFrom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_empty__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/empty.js"),_util_args__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/args.js"),_from__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/from.js");function merge(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];var scheduler=(0,_util_args__WEBPACK_IMPORTED_MODULE_0__.lI)(args),concurrent=(0,_util_args__WEBPACK_IMPORTED_MODULE_0__.R0)(args,1/0),sources=args;return sources.length?1===sources.length?(0,_innerFrom__WEBPACK_IMPORTED_MODULE_2__.Tg)(sources[0]):(0,_operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__.U)(concurrent)((0,_from__WEBPACK_IMPORTED_MODULE_4__.H)(sources,scheduler)):_empty__WEBPACK_IMPORTED_MODULE_1__.w}},"./node_modules/rxjs/dist/esm5/internal/observable/timer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>timer});var _Observable__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_scheduler_async__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js"),_util_isDate__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isDate.js");function timer(dueTime,intervalOrScheduler,scheduler){void 0===dueTime&&(dueTime=0),void 0===scheduler&&(scheduler=_scheduler_async__WEBPACK_IMPORTED_MODULE_0__.b);var intervalDuration=-1;return null!=intervalOrScheduler&&((0,_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__.m)(intervalOrScheduler)?scheduler=intervalOrScheduler:intervalDuration=intervalOrScheduler),new _Observable__WEBPACK_IMPORTED_MODULE_2__.c((function(subscriber){var due=(0,_util_isDate__WEBPACK_IMPORTED_MODULE_3__.v)(dueTime)?+dueTime-scheduler.now():dueTime;due<0&&(due=0);var n=0;return scheduler.schedule((function(){subscriber.closed||(subscriber.next(n++),0<=intervalDuration?this.schedule(void 0,intervalDuration):subscriber.complete())}),due)}))}},"./node_modules/rxjs/dist/esm5/internal/operators/delay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>delay});var scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),concat=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/concat.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),ignoreElements=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js"),mapTo=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),mergeMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),innerFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");function delayWhen(delayDurationSelector,subscriptionDelay){return subscriptionDelay?function(source){return(0,concat.x)(subscriptionDelay.pipe((0,take.s)(1),(0,ignoreElements.w)()),source.pipe(delayWhen(delayDurationSelector)))}:(0,mergeMap.Z)((function(value,index){return(0,innerFrom.Tg)(delayDurationSelector(value,index)).pipe((0,take.s)(1),(0,mapTo.u)(value))}))}var timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");function delay(due,scheduler){void 0===scheduler&&(scheduler=scheduler_async.E);var duration=(0,timer.O)(due,scheduler);return delayWhen((function(){return duration}))}},"./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{w:()=>ignoreElements});var _util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_util_noop__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/noop.js");function ignoreElements(){return(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,_util_noop__WEBPACK_IMPORTED_MODULE_2__.l))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>mapTo});var _map__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");function mapTo(value){return(0,_map__WEBPACK_IMPORTED_MODULE_0__.T)((function(){return value}))}},"./node_modules/rxjs/dist/esm5/internal/operators/startWith.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>startWith});var _observable_concat__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/concat.js"),_util_args__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/args.js"),_util_lift__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js");function startWith(){for(var values=[],_i=0;_i<arguments.length;_i++)values[_i]=arguments[_i];var scheduler=(0,_util_args__WEBPACK_IMPORTED_MODULE_0__.lI)(values);return(0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.N)((function(source,subscriber){(scheduler?(0,_observable_concat__WEBPACK_IMPORTED_MODULE_2__.x)(values,source,scheduler):(0,_observable_concat__WEBPACK_IMPORTED_MODULE_2__.x)(values,source)).subscribe(subscriber)}))}},"./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>AsyncAction});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),Action=function(_super){function Action(scheduler,work){return _super.call(this)||this}return(0,tslib_es6.C6)(Action,_super),Action.prototype.schedule=function(state,delay){return void 0===delay&&(delay=0),this},Action}(__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js").yU),intervalProvider={setInterval:function(handler,timeout){for(var args=[],_i=2;_i<arguments.length;_i++)args[_i-2]=arguments[_i];var delegate=intervalProvider.delegate;return(null==delegate?void 0:delegate.setInterval)?delegate.setInterval.apply(delegate,(0,tslib_es6.fX)([handler,timeout],(0,tslib_es6.zs)(args))):setInterval.apply(void 0,(0,tslib_es6.fX)([handler,timeout],(0,tslib_es6.zs)(args)))},clearInterval:function(handle){var delegate=intervalProvider.delegate;return((null==delegate?void 0:delegate.clearInterval)||clearInterval)(handle)},delegate:void 0},arrRemove=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"),AsyncAction=function(_super){function AsyncAction(scheduler,work){var _this=_super.call(this,scheduler,work)||this;return _this.scheduler=scheduler,_this.work=work,_this.pending=!1,_this}return(0,tslib_es6.C6)(AsyncAction,_super),AsyncAction.prototype.schedule=function(state,delay){var _a;if(void 0===delay&&(delay=0),this.closed)return this;this.state=state;var id=this.id,scheduler=this.scheduler;return null!=id&&(this.id=this.recycleAsyncId(scheduler,id,delay)),this.pending=!0,this.delay=delay,this.id=null!==(_a=this.id)&&void 0!==_a?_a:this.requestAsyncId(scheduler,this.id,delay),this},AsyncAction.prototype.requestAsyncId=function(scheduler,_id,delay){return void 0===delay&&(delay=0),intervalProvider.setInterval(scheduler.flush.bind(scheduler,this),delay)},AsyncAction.prototype.recycleAsyncId=function(_scheduler,id,delay){if(void 0===delay&&(delay=0),null!=delay&&this.delay===delay&&!1===this.pending)return id;null!=id&&intervalProvider.clearInterval(id)},AsyncAction.prototype.execute=function(state,delay){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var error=this._execute(state,delay);if(error)return error;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},AsyncAction.prototype._execute=function(state,_delay){var errorValue,errored=!1;try{this.work(state)}catch(e){errored=!0,errorValue=e||new Error("Scheduled action threw falsy error")}if(errored)return this.unsubscribe(),errorValue},AsyncAction.prototype.unsubscribe=function(){if(!this.closed){var id=this.id,scheduler=this.scheduler,actions=scheduler.actions;this.work=this.state=this.scheduler=null,this.pending=!1,(0,arrRemove.o)(actions,this),null!=id&&(this.id=this.recycleAsyncId(scheduler,id,null)),this.delay=null,_super.prototype.unsubscribe.call(this)}},AsyncAction}(Action)},"./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{q:()=>AsyncScheduler});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),dateTimestampProvider=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js"),Scheduler=function(){function Scheduler(schedulerActionCtor,now){void 0===now&&(now=Scheduler.now),this.schedulerActionCtor=schedulerActionCtor,this.now=now}return Scheduler.prototype.schedule=function(work,delay,state){return void 0===delay&&(delay=0),new this.schedulerActionCtor(this,work).schedule(state,delay)},Scheduler.now=dateTimestampProvider.U.now,Scheduler}(),AsyncScheduler=function(_super){function AsyncScheduler(SchedulerAction,now){void 0===now&&(now=Scheduler.now);var _this=_super.call(this,SchedulerAction,now)||this;return _this.actions=[],_this._active=!1,_this}return(0,tslib_es6.C6)(AsyncScheduler,_super),AsyncScheduler.prototype.flush=function(action){var actions=this.actions;if(this._active)actions.push(action);else{var error;this._active=!0;do{if(error=action.execute(action.state,action.delay))break}while(action=actions.shift());if(this._active=!1,error){for(;action=actions.shift();)action.unsubscribe();throw error}}},AsyncScheduler}(Scheduler)},"./node_modules/rxjs/dist/esm5/internal/scheduler/async.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{E:()=>asyncScheduler,b:()=>async});var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js"),asyncScheduler=new(__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js").q)(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.R),async=asyncScheduler},"./node_modules/rxjs/dist/esm5/internal/util/isDate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function isValidDate(value){return value instanceof Date&&!isNaN(value)}__webpack_require__.d(__webpack_exports__,{v:()=>isValidDate})},"./libs/ui/map/src/lib/components/map-container/map-container.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_map_container_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/map/src/lib/components/map-container/map-container.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/common/fixtures/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Map/Map Container",component:_map_container_component__WEBPACK_IMPORTED_MODULE_1__.L,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.importProvidersFrom)(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.h.forRoot())]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n          <div class="border border-gray-300" style="width: 500px; height: 300px; resize: both; overflow: auto">\n             ${story}\n          </div>`))],argTypes:{featuresClicked:{action:"featuresClicked"},featuresHover:{action:"featuresHover"},mapClick:{action:"mapClick"}}},Primary={args:{context:(0,_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_2__.Vr)()}},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    context: mapCtxFixture()\n  }\n}",...Primary.parameters?.docs?.source}}}},"./libs/ui/map/src/lib/components/map-container/map-container.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);