(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[1584],{"./node_modules/basiclightbox/dist/basicLightbox.min.js":module=>{module.exports=function e(n,t,o){function r(c,u){if(!t[c]){if(!n[c]){if(i)return i(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[c]={exports:{}};n[c][0].call(l.exports,(function(e){return r(n[c][1][e]||e)}),l,l.exports,e,n,t,o)}return t[c].exports}for(var i=void 0,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.visible=void 0;var o=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},r=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.visible=i,t.create=function(e,n){var t=function(e,n){var t=o('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=t.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var c=r(i,"IMG"),u=r(i,"VIDEO"),s=r(i,"IFRAME");return!0===c&&t.classList.add("basicLightbox--img"),!0===u&&t.classList.add("basicLightbox--video"),!0===s&&t.classList.add("basicLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==1;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),c=function(e){return!1!==n.onClose(u)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),n()}),410),!0}(t,(function(){if("function"==typeof e)return e(u)}))};!0===n.closable&&t.addEventListener("click",(function(e){e.target===t&&c()}));var u={element:function(){return t},visible:function(){return i(t)},show:function(e){return!1!==n.onShow(u)&&function(e,n){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),n()}))}),10),!0}(t,(function(){if("function"==typeof e)return e(u)}))},close:c};return u}},{}]},{},[1])(1)},"./node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{p:()=>throttleTime});var scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),lift=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),OperatorSubscriber=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),innerFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");var timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");function throttleTime(duration,scheduler,config){void 0===scheduler&&(scheduler=scheduler_async.z);var duration$=(0,timer.H)(duration,scheduler);return function throttle(durationSelector,config){return(0,lift.e)((function(source,subscriber){var _a=null!=config?config:{},_b=_a.leading,leading=void 0===_b||_b,_c=_a.trailing,trailing=void 0!==_c&&_c,hasValue=!1,sendValue=null,throttled=null,isComplete=!1,endThrottling=function(){null==throttled||throttled.unsubscribe(),throttled=null,trailing&&(send(),isComplete&&subscriber.complete())},cleanupThrottling=function(){throttled=null,isComplete&&subscriber.complete()},startThrottle=function(value){return throttled=(0,innerFrom.Xf)(durationSelector(value)).subscribe((0,OperatorSubscriber.x)(subscriber,endThrottling,cleanupThrottling))},send=function(){if(hasValue){hasValue=!1;var value=sendValue;sendValue=null,subscriber.next(value),!isComplete&&startThrottle(value)}};source.subscribe((0,OperatorSubscriber.x)(subscriber,(function(value){hasValue=!0,sendValue=value,(!throttled||throttled.closed)&&(leading?send():startThrottle(value))}),(function(){isComplete=!0,(!(trailing&&hasValue&&throttled)||throttled.closed)&&subscriber.complete()})))}))}((function(){return duration$}),config)}},"./libs/feature/editor/src/lib/components/contact-card/contact-card.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>contact_card_component_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var contact_card_componentngResource=__webpack_require__("./libs/feature/editor/src/lib/components/contact-card/contact-card.component.css?ngResource"),contact_card_componentngResource_default=__webpack_require__.n(contact_card_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),src=__webpack_require__("./libs/ui/inputs/src/index.ts"),elements_src=__webpack_require__("./libs/ui/elements/src/index.ts");let ContactCardComponent=class ContactCardComponent{constructor(){this.removable=!0,this.contactRemoved=new core.EventEmitter}removeContact(contact){this.contactRemoved.emit(contact)}static#_=this.propDecorators={contact:[{type:core.Input}],removable:[{type:core.Input}],contactRemoved:[{type:core.Output}]}};ContactCardComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-contact-card",template:'<div class="flex flex-row gap-4 items-center">\n  <div class="flex flex-row border border-gray-200 rounded-xl p-4 gap-4 w-full">\n    <gn-ui-thumbnail\n      class="w-[56px] h-[56px] rounded-[4px]"\n      [thumbnailUrl]="contact.organization.logoUrl?.href"\n      [fit]="\'contain\'"\n    ></gn-ui-thumbnail>\n    <div class="flex flex-col w-full">\n      <div class="flex flex-row justify-between">\n        <span class="flex flex-wrap font-bold w-full"\n          >{{ contact.firstName }} {{ contact.lastName }}</span\n        >\n      </div>\n      <div>{{ contact.email }}</div>\n    </div>\n  </div>\n  <gn-ui-button\n    *ngIf="removable"\n    data-test="removeContactButton"\n    type="light"\n    extraClass="w-[20px] h-[20px] flex items-center justify-center"\n    (buttonClick)="removeContact(contact)"\n    ><span class="material-symbols-outlined"> close </span>\n  </gn-ui-button>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,icon.Ps,src.r0,elements_src.Zl],styles:[contact_card_componentngResource_default()]})],ContactCardComponent);var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs");const contact_card_component_stories={title:"Elements/ContactCardComponent",component:ContactCardComponent,decorators:[(0,dist.moduleMetadata)({imports:[common.CommonModule,icon.Ps,src.r0,ContactCardComponent]}),(0,dist.applicationConfig)({providers:[(0,core.importProvidersFrom)(animations.BrowserAnimationsModule)]}),(0,dist.componentWrapperDecorator)((story=>`<div style="max-width: 400px; margin: auto;">${story}</div>`))]},Primary={args:{contact:{firstName:"John",lastName:"Doe",organization:{name:"Example Organization"},email:"john.doe@example.com",role:"Developer",address:"123 Main St",phone:"123-456-7890",position:"Senior Developer"}}}},"./libs/feature/editor/src/lib/components/contact-card/contact-card.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);