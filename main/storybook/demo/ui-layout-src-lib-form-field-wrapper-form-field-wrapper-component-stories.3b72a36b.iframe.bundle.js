(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[5394],{"./libs/ui/layout/src/lib/form-field-wrapper/form-field-wrapper.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{l:()=>FormFieldWrapperComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var form_field_wrapper_componentngResource=__webpack_require__("./libs/ui/layout/src/lib/form-field-wrapper/form-field-wrapper.component.css?ngResource"),form_field_wrapper_componentngResource_default=__webpack_require__.n(form_field_wrapper_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),tooltip=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let FormFieldWrapperComponent=class FormFieldWrapperComponent{static#_=this.propDecorators={label:[{type:core.Input}],hint:[{type:core.Input}]}};FormFieldWrapperComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-form-field-wrapper",template:'<div class="h-full flex flex-col" *ngIf="label; else onlyContent">\n  <div class="flex-none w-full flex flex-row items-center">\n    <span class="flex-none font-bold">{{ label }}</span>\n    <div class="flex-1 flex justify-end items-center">\n      <ng-content select="[form-field-interaction]"></ng-content>\n      <span\n        *ngIf="hint"\n        class="material-symbols-outlined m-2 gn-ui-icon-small"\n        [matTooltip]="hint"\n        matTooltipPosition="above"\n      >\n        help\n      </span>\n    </div>\n  </div>\n  <div class="flex-1 mt-2">\n    <ng-container *ngTemplateOutlet="onlyContent"> </ng-container>\n  </div>\n</div>\n\n<ng-template #onlyContent>\n  <ng-content></ng-content>\n</ng-template>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[icon.Ps,tooltip.AV,common.CommonModule],styles:[form_field_wrapper_componentngResource_default()]})],FormFieldWrapperComponent)},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"componentWrapperDecorator")&&__webpack_require__.d(__webpack_exports__,{componentWrapperDecorator:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"moduleMetadata")&&__webpack_require__.d(__webpack_exports__,{moduleMetadata:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata}})},"./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>ReplaySubject});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_Subject__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),_scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js"),ReplaySubject=function(_super){function ReplaySubject(_bufferSize,_windowTime,_timestampProvider){void 0===_bufferSize&&(_bufferSize=1/0),void 0===_windowTime&&(_windowTime=1/0),void 0===_timestampProvider&&(_timestampProvider=_scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__.l);var _this=_super.call(this)||this;return _this._bufferSize=_bufferSize,_this._windowTime=_windowTime,_this._timestampProvider=_timestampProvider,_this._buffer=[],_this._infiniteTimeWindow=!0,_this._infiniteTimeWindow=_windowTime===1/0,_this._bufferSize=Math.max(1,_bufferSize),_this._windowTime=Math.max(1,_windowTime),_this}return(0,tslib__WEBPACK_IMPORTED_MODULE_0__.ZT)(ReplaySubject,_super),ReplaySubject.prototype.next=function(value){var _a=this,isStopped=_a.isStopped,_buffer=_a._buffer,_infiniteTimeWindow=_a._infiniteTimeWindow,_timestampProvider=_a._timestampProvider,_windowTime=_a._windowTime;isStopped||(_buffer.push(value),!_infiniteTimeWindow&&_buffer.push(_timestampProvider.now()+_windowTime)),this._trimBuffer(),_super.prototype.next.call(this,value)},ReplaySubject.prototype._subscribe=function(subscriber){this._throwIfClosed(),this._trimBuffer();for(var subscription=this._innerSubscribe(subscriber),_infiniteTimeWindow=this._infiniteTimeWindow,copy=this._buffer.slice(),i=0;i<copy.length&&!subscriber.closed;i+=_infiniteTimeWindow?1:2)subscriber.next(copy[i]);return this._checkFinalizedStatuses(subscriber),subscription},ReplaySubject.prototype._trimBuffer=function(){var _bufferSize=this._bufferSize,_timestampProvider=this._timestampProvider,_buffer=this._buffer,_infiniteTimeWindow=this._infiniteTimeWindow,adjustedBufferSize=(_infiniteTimeWindow?1:2)*_bufferSize;if(_bufferSize<1/0&&adjustedBufferSize<_buffer.length&&_buffer.splice(0,_buffer.length-adjustedBufferSize),!_infiniteTimeWindow){for(var now=_timestampProvider.now(),last=0,i=1;i<_buffer.length&&_buffer[i]<=now;i+=2)last=i;last&&_buffer.splice(0,last+1)}},ReplaySubject}(_Subject__WEBPACK_IMPORTED_MODULE_2__.x)},"./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{d:()=>shareReplay});var _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),_share__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/share.js");function shareReplay(configOrBufferSize,windowTime,scheduler){var _a,_b,_c,bufferSize,refCount=!1;return configOrBufferSize&&"object"==typeof configOrBufferSize?(_a=configOrBufferSize.bufferSize,bufferSize=void 0===_a?1/0:_a,_b=configOrBufferSize.windowTime,windowTime=void 0===_b?1/0:_b,refCount=void 0!==(_c=configOrBufferSize.refCount)&&_c,scheduler=configOrBufferSize.scheduler):bufferSize=null!=configOrBufferSize?configOrBufferSize:1/0,(0,_share__WEBPACK_IMPORTED_MODULE_0__.B)({connector:function(){return new _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__.t(bufferSize,windowTime,scheduler)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:refCount})}},"./node_modules/rxjs/dist/esm5/internal/util/isObservable.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{b:()=>isObservable});var _Observable__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_isFunction__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");function isObservable(obj){return!!obj&&(obj instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.y||(0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.m)(obj.lift)&&(0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.m)(obj.subscribe))}},"./libs/ui/layout/src/lib/form-field-wrapper/form-field-wrapper.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_form_field_wrapper_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/layout/src/lib/form-field-wrapper/form-field-wrapper.component.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Layout/FormFieldWrapperComponent",component:_form_field_wrapper_component__WEBPACK_IMPORTED_MODULE_1__.l,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_form_field_wrapper_component__WEBPACK_IMPORTED_MODULE_1__.l]})]},Primary={args:{label:"Some label",hint:"Some hint"},render:args=>({props:args,template:'\n    <gn-ui-form-field-wrapper\n      [label]="label"\n      [hint]="hint"\n    >\n      <button form-field-interaction>Some button</button>\n      <div>Some content</div>\n    </gn-ui-form-field-wrapper>'})}},"./libs/ui/layout/src/lib/form-field-wrapper/form-field-wrapper.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);