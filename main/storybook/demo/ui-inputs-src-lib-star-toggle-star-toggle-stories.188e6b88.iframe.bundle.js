(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[5878],{"./libs/ui/inputs/src/lib/star-toggle/star-toggle.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{y:()=>StarToggleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var star_toggle_componentngResource=__webpack_require__("./libs/ui/inputs/src/lib/star-toggle/star-toggle.component.css?ngResource"),star_toggle_componentngResource_default=__webpack_require__.n(star_toggle_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/util/shared/src/index.ts");let StarToggleComponent=class StarToggleComponent{constructor(){this.disabled=!1,this.newValue=new core.EventEmitter}toggle(event){if(!this.disabled){if(this.toggled=!this.toggled,this.toggled){const anim=this.overlay.nativeElement.getAnimations()[0];anim.cancel(),anim.play()}this.newValue.emit(this.toggled)}(0,src.Y8)(event),event.preventDefault()}static#_=this.propDecorators={toggled:[{type:core.Input}],disabled:[{type:core.Input}],newValue:[{type:core.Output}],overlay:[{type:core.ViewChild,args:["starOverlay"]}]}};StarToggleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-star-toggle",template:'<div class="inline-block relative align-middle" style="line-height: 0.7em">\n  <button\n    type="button"\n    class="-m-[8px] p-[8px]"\n    (click)="toggle($event)"\n    [ngClass]="{\n      enabled: toggled,\n      \'disabled opacity-45\': !toggled,\n      \'transition hover:scale-125 will-change-transform\': !disabled,\n      \'cursor-default\': disabled\n    }"\n  >\n    <mat-icon\n      class="material-symbols-outlined"\n      [ngClass]="{ \'star-filled\': toggled }"\n      >star</mat-icon\n    >\n  </button>\n  <svg\n    #starOverlay\n    class="star-toggle-overlay"\n    width="40px"\n    height="40px"\n    viewBox="-15 -15 30 30"\n  >\n    <g>\n      <path d="M 0,13.229167 V 0" />\n      <path d="M -12.484186,4.0880377 0,0" />\n      <path d="M -7.6784102,-10.70262 0,0" />\n      <path d="M 7.8734079,-10.70262 0,0" />\n      <path d="M 12.679184,4.0880376 0,0" />\n    </g>\n  </svg>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[star_toggle_componentngResource_default()]})],StarToggleComponent)},"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{XI:()=>chunk_AY7I2SME.XI});var chunk_AY7I2SME=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-AY7I2SME.mjs")},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"componentWrapperDecorator")&&__webpack_require__.d(__webpack_exports__,{componentWrapperDecorator:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"moduleMetadata")&&__webpack_require__.d(__webpack_exports__,{moduleMetadata:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata}})},"./node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{p:()=>forkJoin});var _Observable__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_util_argsArgArrayOrObject__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js"),_innerFrom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_util_args__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/args.js"),_operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"),_util_createObject__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/createObject.js");function forkJoin(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];var resultSelector=(0,_util_args__WEBPACK_IMPORTED_MODULE_0__.ms)(args),_a=(0,_util_argsArgArrayOrObject__WEBPACK_IMPORTED_MODULE_1__.D)(args),sources=_a.args,keys=_a.keys,result=new _Observable__WEBPACK_IMPORTED_MODULE_2__.c((function(subscriber){var length=sources.length;if(length)for(var values=new Array(length),remainingCompletions=length,remainingEmissions=length,_loop_1=function(sourceIndex){var hasValue=!1;(0,_innerFrom__WEBPACK_IMPORTED_MODULE_3__.Tg)(sources[sourceIndex]).subscribe((0,_operators_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_4__._)(subscriber,(function(value){hasValue||(hasValue=!0,remainingEmissions--),values[sourceIndex]=value}),(function(){return remainingCompletions--}),void 0,(function(){remainingCompletions&&hasValue||(remainingEmissions||subscriber.next(keys?(0,_util_createObject__WEBPACK_IMPORTED_MODULE_5__.e)(keys,values):values),subscriber.complete())})))},sourceIndex=0;sourceIndex<length;sourceIndex++)_loop_1(sourceIndex);else subscriber.complete()}));return resultSelector?result.pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_6__.I)(resultSelector)):result}},"./libs/ui/inputs/src/lib/star-toggle/star-toggle.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_star_toggle_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/inputs/src/lib/star-toggle/star-toggle.component.ts"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/StarToggle",component:_star_toggle_component__WEBPACK_IMPORTED_MODULE_1__.y,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.An],imports:[]})]},Primary={args:{toggled:!1,disabled:!1},render:args=>({props:{...args,newValue:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.XI)("newValue")}})}},"./libs/ui/inputs/src/lib/star-toggle/star-toggle.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"button.enabled {\n  color: var(--star-toggle-enabled-color, var(--color-secondary));\n}\nbutton.disabled {\n  color: var(--star-toggle-disabled-color, var(--color-primary));\n}\n\nmat-icon {\n  width: 1em;\n  height: 1em;\n  font-size: 1.5em;\n  margin-top: -0.1em;\n  font-variation-settings: 'opsz' 40;\n  stroke: var(--color-primary-darker);\n}\n\n.star-filled {\n  font-variation-settings: 'FILL' 1;\n}\n\n.star-toggle-overlay {\n  stroke: var(--color-secondary);\n  stroke-width: 3.5px;\n  stroke-linecap: round;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 2.5em;\n  height: 2.5em;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n  stroke-dasharray: 5 20;\n  stroke-dashoffset: -15;\n  animation: overlay-dash 0.8s cubic-bezier(0.16, 0.66, 0.44, 0.96) forwards;\n  animation-play-state: paused;\n}\n\n@keyframes overlay-dash {\n  to {\n    stroke-dashoffset: 7;\n  }\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);