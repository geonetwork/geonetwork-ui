(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[6315],{"./libs/ui/search/src/lib/results-hits-search-kind/results-hits-search-kind.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>ResultsHitsSearchKindComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ResultsHitsSearchKindComponent=class ResultsHitsSearchKindComponent{constructor(){this.selected=[],this.choices=[],this.selectionChanged=new core.EventEmitter,this.availableChoices=[]}ngOnChanges(changes){changes.choices&&changes.choices.currentValue&&(this.availableChoices=this.buildFilterChoices(this.choices))}buildFilterChoices(availableValues){return[{label:"all",value:"all"},...availableValues]}onSelectedValues(values){const selectedValues=values.includes("all")?[]:values;this.selectionChanged.emit(selectedValues)}isSelectedChoice(choiceValue){return this.selected.includes(choiceValue)}isAllChoice(choiceValue){return 0===this.selected.length&&"all"===choiceValue}static{this.propDecorators={selected:[{type:core.Input}],choices:[{type:core.Input}],selectionChanged:[{type:core.Output}]}}};ResultsHitsSearchKindComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-results-hits-search-kind",template:'<gn-ui-inline-filter\n  [choices]="availableChoices"\n  [selected]="selected"\n  (selectValues)="onSelectedValues($event)"\n>\n  <ng-template let-choice>\n    <gn-ui-kind-badge\n      [kind]="choice.value"\n      [contentTemplate]="customTemplate"\n      class="gn-ui-btn-outline rounded-md py-2 px-2 border-gray-400 cursor-pointer focus-within:text-primary-darkest focus-within:bg-gray-50 transition-colors bg-transparent hover:text-primary-darker focus:text-primary-darker active:text-primary-black"\n      [ngClass]="{\n        \'!bg-primary-lightest hover:bg-primary-lightest\':\n          isSelectedChoice(choice.value) || isAllChoice(choice.value),\n      }"\n    >\n      <ng-template #customTemplate>\n        {{ \'search.filters.recordKind.\' + choice.value | translate\n        }}<span class="ml-1" *ngIf="isSelectedChoice(choice.value)"\n          >({{ choice.count }})</span\n        >\n      </ng-template>\n    </gn-ui-kind-badge>\n  </ng-template>\n</gn-ui-inline-filter>\n'})],ResultsHitsSearchKindComponent)},"./node_modules/basiclightbox/dist/basicLightbox.min.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function e(n,t,o){function r(c,u){if(!t[c]){if(!n[c]){if(!u&&__webpack_require__("./node_modules/basiclightbox/dist sync recursive"))return require(c,!0);if(i)return i(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[c]={exports:{}};n[c][0].call(l.exports,(function(e){return r(n[c][1][e]||e)}),l,l.exports,e,n,t,o)}return t[c].exports}for(var i=void 0,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.visible=void 0;var o=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},r=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.visible=i,t.create=function(e,n){var t=function(e,n){var t=o('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=t.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var c=r(i,"IMG"),u=r(i,"VIDEO"),s=r(i,"IFRAME");return!0===c&&t.classList.add("basicLightbox--img"),!0===u&&t.classList.add("basicLightbox--video"),!0===s&&t.classList.add("basicLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==1;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),c=function(e){return!1!==n.onClose(u)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),n()}),410),!0}(t,(function(){if("function"==typeof e)return e(u)}))};!0===n.closable&&t.addEventListener("click",(function(e){e.target===t&&c()}));var u={element:function(){return t},visible:function(){return i(t)},show:function(e){return!1!==n.onShow(u)&&function(e,n){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),n()}))}),10),!0}(t,(function(){if("function"==typeof e)return e(u)}))},close:c};return u}},{}]},{},[1])(1)},"./libs/ui/search/src/lib/results-hits-search-kind/results-hits-search-kind.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/util/i18n/src/index.ts"),_results_hits_search_kind_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/search/src/lib/results-hits-search-kind/results-hits-search-kind.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_geonetwork_ui_ui_inputs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/inputs/src/index.ts"),_geonetwork_ui_ui_elements__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/ui/elements/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Search/ResultsHitsSearchKindComponent",component:_results_hits_search_kind_component__WEBPACK_IMPORTED_MODULE_2__._,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_1__.D7,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.h.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_1__.sU),_geonetwork_ui_ui_inputs__WEBPACK_IMPORTED_MODULE_3__.cc,_geonetwork_ui_ui_elements__WEBPACK_IMPORTED_MODULE_4__.c]})]},Primary={args:{choices:[{value:"dataset",label:""},{value:"service",label:""},{value:"reuse",label:""}],selected:[]}},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    choices: [{\n      value: 'dataset',\n      label: ''\n    }, {\n      value: 'service',\n      label: ''\n    }, {\n      value: 'reuse',\n      label: ''\n    }],\n    selected: []\n  }\n}",...Primary.parameters?.docs?.source}}}}}]);