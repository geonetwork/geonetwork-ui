"use strict";(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[514],{"./libs/ui/layout/src/lib/anchor-link/anchor-link.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>AnchorLinkDirective});var _class,tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let AnchorLinkDirective=((_class=class AnchorLinkDirective{get elementClass(){return this.disabled?this.disabledClass:this.enabledClass}constructor(changeDetector){this.changeDetector=changeDetector,this.disabled=!1,this.observer=new MutationObserver((()=>{this.refreshDisabledState()}))}ngOnInit(){this.observer.observe(document.body,{childList:!0,subtree:!0}),this.refreshDisabledState()}ngOnDestroy(){this.observer.disconnect()}refreshDisabledState(){const targetNotPresent=!document.getElementById(this.targetId);targetNotPresent!==this.disabled&&(this.disabled=targetNotPresent,this.changeDetector.detectChanges())}scrollToTarget(){const target=document.getElementById(this.targetId);target&&target.scrollIntoView({behavior:"smooth",block:"start"})}}).ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef}],_class.propDecorators={targetId:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["gnUiAnchorLink"]}],disabledClass:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["gnUiAnchorLinkDisabledClass"]}],enabledClass:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["gnUiAnchorLinkEnabledClass"]}],elementClass:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding,args:["class"]}],scrollToTarget:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,args:["click"]}]},_class);AnchorLinkDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[gnUiAnchorLink]"}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.w6)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef])],AnchorLinkDirective)},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"componentWrapperDecorator")&&__webpack_require__.d(__webpack_exports__,{componentWrapperDecorator:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"moduleMetadata")&&__webpack_require__.d(__webpack_exports__,{moduleMetadata:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata}})},"./libs/ui/layout/src/lib/anchor-link/anchor-link.directive.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_anchor_link_directive__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/layout/src/lib/anchor-link/anchor-link.directive.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Layout/AnchorLinkDirective",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[_anchor_link_directive__WEBPACK_IMPORTED_MODULE_1__.r]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n<div class="p-3 border border-gray-200 relative overflow-y-scroll h-[400px]">\n  <div class='sticky p-3 bg-gray-100 top-0'>\n    ${story}\n  </div>\n  <h3 class='text-xl py-3 font-bold' id='header-1'>First section</h3>\n  <p class='py-2'>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere, elit id pharetra scelerisque, velit nulla sodales lectus, sit amet mollis felis ipsum sed justo.\n    Aliquam volutpat rhoncus tincidunt. Donec pellentesque maximus rutrum. Aenean quis tincidunt massa. Fusce eget turpis lobortis dui rutrum tempor at at sem. In venenatis efficitur ultrices.\n    Aenean iaculis enim ut porta vehicula. Etiam elementum posuere orci vitae rutrum. Aliquam luctus mauris sed urna fermentum sagittis. Vestibulum et elit quam. Donec lacinia eget enim non efficitur.\n    Cras posuere, ante ac dignissim accumsan, eros dui semper nisl, a imperdiet turpis sem sed nulla.\n  </p>\n  <p class='py-2'>\n    Ut nisl magna, imperdiet nec nulla eu, luctus finibus odio. Nulla facilisi. Integer ullamcorper, nunc eu feugiat sodales, dolor nulla dictum orci, et varius justo risus quis augue.\n    Aenean id consequat orci. Vivamus malesuada tortor auctor risus tempor elementum. Sed ut suscipit augue. Nunc blandit tortor quis feugiat sagittis. Nulla ut lorem id ligula pretium sodales.\n    Donec enim nunc, bibendum eu elit in, viverra laoreet tortor. Nam id auctor ligula, nec interdum dui. Mauris vel feugiat quam, vel sodales felis. Integer sit amet posuere mauris.\n    Vivamus egestas dignissim tempus.\n  </p>\n  <p class='py-2'>\n    <img id='my-cat' src='https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg' width='400px'>\n  </p>\n  <h3 class='text-xl py-3 font-bold' id='header-2'>Second section</h3>\n  <p class='py-2'>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere, elit id pharetra scelerisque, velit nulla sodales lectus, sit amet mollis felis ipsum sed justo.\n    Aliquam volutpat rhoncus tincidunt. Donec pellentesque maximus rutrum. Aenean quis tincidunt massa. Fusce eget turpis lobortis dui rutrum tempor at at sem. In venenatis efficitur ultrices.\n    Aenean iaculis enim ut porta vehicula. Etiam elementum posuere orci vitae rutrum. Aliquam luctus mauris sed urna fermentum sagittis. Vestibulum et elit quam. Donec lacinia eget enim non efficitur.\n    Cras posuere, ante ac dignissim accumsan, eros dui semper nisl, a imperdiet turpis sem sed nulla.\n  </p>\n  <p class='py-2'>\n    Ut nisl magna, imperdiet nec nulla eu, luctus finibus odio. Nulla facilisi. Integer ullamcorper, nunc eu feugiat sodales, dolor nulla dictum orci, et varius justo risus quis augue.\n    Aenean id consequat orci. Vivamus malesuada tortor auctor risus tempor elementum. Sed ut suscipit augue. Nunc blandit tortor quis feugiat sagittis. Nulla ut lorem id ligula pretium sodales.\n    Donec enim nunc, bibendum eu elit in, viverra laoreet tortor. Nam id auctor ligula, nec interdum dui. Mauris vel feugiat quam, vel sodales felis. Integer sit amet posuere mauris.\n    Vivamus egestas dignissim tempus.\n  </p>\n</div>`))]},Primary={args:{targetId:"header-1"},argTypes:{targetId:{control:"select",options:["header-1","header-2","my-cat","invalid-selector"]}},render:args=>({props:args,template:`\n    <div class='cursor-pointer'\n         gnUiAnchorLink="${args.targetId}"\n         gnUiAnchorLinkDisabledClass="opacity-50 cursor-default"\n         gnUiAnchorLinkEnabledClass="hover:underline">\n      A link to ${args.targetId}\n    </div>`})}}}]);