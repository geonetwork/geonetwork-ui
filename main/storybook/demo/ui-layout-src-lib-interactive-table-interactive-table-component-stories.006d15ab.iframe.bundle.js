(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[6319],{"./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>InteractiveTableColumnComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var interactive_table_column_componentngResource=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.css?ngResource"),interactive_table_column_componentngResource_default=__webpack_require__.n(interactive_table_column_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let InteractiveTableColumnComponent=class InteractiveTableColumnComponent{constructor(){this.grow=!1,this.sortable=!1,this.activeSort=null,this.sortChange=new core.EventEmitter}handleSortChange(){this.activeSort="asc"===this.activeSort?"desc":"asc",this.sortChange.emit(this.activeSort)}static#_=this.propDecorators={header:[{type:core.ContentChild,args:["header"]}],cell:[{type:core.ContentChild,args:["cell"]}],grow:[{type:core.Input}],sortable:[{type:core.Input}],activeSort:[{type:core.Input}],sortChange:[{type:core.Output}]}};InteractiveTableColumnComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-interactive-table-column",standalone:!0,imports:[common.CommonModule],template:"<span>empty</span>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[interactive_table_column_componentngResource_default()]})],InteractiveTableColumnComponent)},"./libs/ui/layout/src/lib/interactive-table/interactive-table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{f:()=>InteractiveTableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var interactive_table_componentngResource=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table.component.css?ngResource"),interactive_table_componentngResource_default=__webpack_require__.n(interactive_table_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),interactive_table_column_component=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");let InteractiveTableComponent=class InteractiveTableComponent{constructor(){this.items=[],this.itemClick=new core.EventEmitter}get gridStyle(){return{"grid-template-columns":this.columns.map((column=>column.grow?"minmax(0px,1fr)":"minmax(0px,max-content)")).join(" ")}}handleRowClick(item){this.itemClick.emit(item)}static#_=this.propDecorators={columns:[{type:core.ContentChildren,args:[interactive_table_column_component.o]}],items:[{type:core.Input}],itemClick:[{type:core.Output}]}};InteractiveTableComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-interactive-table",template:'<div class="grid w-full" [ngStyle]="gridStyle">\n  <div class="contents w-full">\n    <ng-container *ngFor="let column of columns">\n      <button\n        *ngIf="column.sortable"\n        type="button"\n        class="table-header-cell"\n        (click)="column.sortable && column.handleSortChange()"\n      >\n        <ng-container *ngTemplateOutlet="column.header"></ng-container>\n        <div class="sort-button flex flex-col" *ngIf="column.sortable">\n          <mat-icon\n            class="material-symbols-outlined text-gray-600"\n            [ngClass]="{ \'text-main\': column.activeSort === \'asc\' }"\n            >expand_less</mat-icon\n          >\n          <mat-icon\n            class="material-symbols-outlined text-gray-600"\n            [ngClass]="{ \'text-main\': column.activeSort === \'desc\' }"\n            >expand_more</mat-icon\n          >\n        </div>\n      </button>\n      <div *ngIf="!column.sortable" class="table-header-cell">\n        <ng-container *ngTemplateOutlet="column.header"></ng-container>\n      </div>\n    </ng-container>\n  </div>\n  <div\n    class="contents text-gray-900 cursor-pointer group"\n    *ngFor="let item of items"\n    (click)="handleRowClick(item)"\n    data-cy="table-row"\n  >\n    <div\n      class="relative h-0"\n      [ngStyle]="{ \'grid-column\': \'span \' + this.columns.length }"\n    >\n      \x3c!-- this element is only used in keyboard navigation --\x3e\n      <button\n        type="button"\n        class="absolute inset-x-0 h-[50px] bg-transparent pointer-events-none"\n      ></button>\n    </div>\n    <ng-container *ngFor="let column of columns">\n      <div\n        class="table-row-cell px-3 py-1.5 flex items-center bg-white transition-colors duration-75 truncate group-hover:text-main group-hover:bg-gray-50 border-b border-gray-200"\n      >\n        <ng-container\n          *ngTemplateOutlet="column.cell; context: { $implicit: item }"\n        ></ng-container>\n      </div>\n    </ng-container>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,interactive_table_column_component.o,icon.Ps],styles:[interactive_table_componentngResource_default()]})],InteractiveTableComponent)},"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{aD:()=>chunk_AY7I2SME.aD});var chunk_AY7I2SME=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-AY7I2SME.mjs")},"./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{z:()=>firstValueFrom});var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"),_Subscriber__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscriber.js");function firstValueFrom(source,config){var hasConfig="object"==typeof config;return new Promise((function(resolve,reject){var subscriber=new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Hp({next:function(value){resolve(value),subscriber.unsubscribe()},error:reject,complete:function(){hasConfig?resolve(config.defaultValue):reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.K)}});source.subscribe(subscriber)}))}},"./libs/ui/layout/src/lib/interactive-table/interactive-table.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_interactive_table_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table.component.ts"),_interactive_table_column_interactive_table_column_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.ts"),_angular_common__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_geonetwork_ui_ui_inputs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/inputs/src/index.ts"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={component:_interactive_table_component__WEBPACK_IMPORTED_MODULE_1__.f,title:"Layout/InteractiveTableComponent",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,_interactive_table_component__WEBPACK_IMPORTED_MODULE_1__.f,_interactive_table_column_interactive_table_column_component__WEBPACK_IMPORTED_MODULE_2__.o,_geonetwork_ui_ui_inputs__WEBPACK_IMPORTED_MODULE_3__.uU]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`<div class="border border-gray-300 h-[500px] w-[800px]" style="resize: both; overflow: auto">${story}</div>`))]},Primary={args:{items:[{id:"0001",firstName:"John",lastName:"Lennon",selected:!0},{id:"0002",firstName:"Ozzy",lastName:"Osbourne",selected:!1},{id:"0003",firstName:"Claude",lastName:"François",selected:!1},{id:"0004",firstName:"Bob",lastName:"Dylan",selected:!1}]},render:args=>({props:{...args,itemClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.aD)("item clicked"),sortByName:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.aD)("sort by name"),sortById:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.aD)("sort by id")},template:"\n<gn-ui-interactive-table [items]='items' (itemClick)='itemClick($event)'>\n  <gn-ui-interactive-table-column>\n    <ng-template #header>\n      <gn-ui-checkbox\n        type=\"primary\"\n        class='-m-2 mr-3'\n      >\n      </gn-ui-checkbox>\n    </ng-template>\n    <ng-template #cell let-item>\n      <gn-ui-checkbox\n        class='-m-2'\n        [checked]=\"item.selected\"\n        type=\"default\"\n      >\n      </gn-ui-checkbox>\n    </ng-template>\n  </gn-ui-interactive-table-column>\n  <gn-ui-interactive-table-column [grow]='true' [sortable]='true' (sortChange)='sortByName($event)'>\n    <ng-template #header>full name</ng-template>\n    <ng-template #cell let-item>{{item.firstName}} {{item.lastName}}</ng-template>\n  </gn-ui-interactive-table-column>\n  <gn-ui-interactive-table-column [sortable]='true' (sortChange)='sortById($event)'>\n    <ng-template #header>id</ng-template>\n    <ng-template #cell let-item>{{item.id}}</ng-template>\n  </gn-ui-interactive-table-column>\n</gn-ui-interactive-table>"})}},"./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/layout/src/lib/interactive-table/interactive-table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".sort-button mat-icon {\n  padding: 0;\n  margin: 0;\n  height: 8px;\n  line-height: 8px;\n  font-size: 18px;\n}\n\n.table-header-cell {\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: var(--color-gray-700);\n}\n\nbutton.table-header-cell {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 75ms;\n}\n\nbutton.table-header-cell:hover {\n  background-color: var(--color-gray-50);\n  color: var(--color-main);\n}\n\nbutton.table-header-cell:focus {\n  background-color: var(--color-gray-50);\n  color: var(--color-main);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);