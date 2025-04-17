(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[817],{"./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>InteractiveTableColumnComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var interactive_table_column_componentngResource=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.css?ngResource"),interactive_table_column_componentngResource_default=__webpack_require__.n(interactive_table_column_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let InteractiveTableColumnComponent=class InteractiveTableColumnComponent{constructor(){this.grow=!1,this.sortable=!1,this.activeSort=null,this.sortChange=new core.EventEmitter}handleSortChange(){this.activeSort="asc"===this.activeSort?"desc":"asc",this.sortChange.emit(this.activeSort)}static{this.propDecorators={header:[{type:core.ContentChild,args:["header"]}],cell:[{type:core.ContentChild,args:["cell"]}],grow:[{type:core.Input}],width:[{type:core.Input}],sortable:[{type:core.Input}],activeSort:[{type:core.Input}],sortChange:[{type:core.Output}]}}};InteractiveTableColumnComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-interactive-table-column",standalone:!0,imports:[common.CommonModule],template:"<span>empty</span>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[interactive_table_column_componentngResource_default()]})],InteractiveTableColumnComponent)},"./libs/ui/layout/src/lib/interactive-table/interactive-table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{w:()=>InteractiveTableComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var interactive_table_componentngResource=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table.component.css?ngResource"),interactive_table_componentngResource_default=__webpack_require__.n(interactive_table_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),interactive_table_column_component=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_iconoir=__webpack_require__("./node_modules/@ng-icons/iconoir/fesm2022/ng-icons-iconoir.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),biesbjerg_ngx_translate_extract_marker=__webpack_require__("./node_modules/@biesbjerg/ngx-translate-extract-marker/fesm5/biesbjerg-ngx-translate-extract-marker.js");(0,biesbjerg_ngx_translate_extract_marker.x)("editor.record.lock.reason"),(0,biesbjerg_ngx_translate_extract_marker.x)("editor.record.lock.format");let InteractiveTableComponent=class InteractiveTableComponent{constructor(){this.items=[],this.isDraftPage=!1,this.itemClick=new core.EventEmitter}get gridStyle(){return{"grid-template-columns":this.columns.map((column=>column.width?column.width:column.grow?"minmax(0px,1fr)":"minmax(0px,max-content)")).join(" ")}}getItemTitle(item){return item.extras?.edit||this.isDraftPage||"dataset"!==item.kind?"dataset"!==item.kind?"editor.record.lock.format":"":"editor.record.lock.reason"}handleRowClick(item){this.itemClick.emit(item)}static{this.propDecorators={columns:[{type:core.ContentChildren,args:[interactive_table_column_component.O]}],items:[{type:core.Input}],isDraftPage:[{type:core.Input}],itemClick:[{type:core.Output}]}}};InteractiveTableComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-interactive-table",template:'<div class="grid w-full" [ngStyle]="gridStyle">\n  <div class="contents w-full">\n    <ng-container *ngFor="let column of columns">\n      <button\n        *ngIf="column.sortable"\n        type="button"\n        class="table-header-cell gap-1"\n        (click)="column.sortable && column.handleSortChange()"\n      >\n        <ng-container *ngTemplateOutlet="column.header"></ng-container>\n        <div class="sort-button flex flex-col" *ngIf="column.sortable">\n          <ng-icon\n            class="text-gray-600 -mb-2"\n            [ngClass]="{ \'text-main\': column.activeSort === \'asc\' }"\n            name="iconoirNavArrowUp"\n          ></ng-icon>\n          <ng-icon\n            class="text-gray-600"\n            [ngClass]="{ \'text-main\': column.activeSort === \'desc\' }"\n            name="iconoirNavArrowDown"\n          ></ng-icon>\n        </div>\n      </button>\n      <div *ngIf="!column.sortable" class="table-header-cell">\n        <ng-container *ngTemplateOutlet="column.header"></ng-container>\n      </div>\n    </ng-container>\n  </div>\n  <div\n    class="contents text-gray-900 cursor-pointer group"\n    *ngFor="let item of items"\n    (click)="handleRowClick(item)"\n    data-cy="table-row"\n    [title]="getItemTitle(item) | translate"\n  >\n    <div\n      class="relative h-0"\n      [ngStyle]="{ \'grid-column\': \'span \' + this.columns.length }"\n    >\n      \x3c!-- this element is only used in keyboard navigation --\x3e\n      <button\n        type="button"\n        class="absolute inset-x-0 h-[50px] bg-transparent pointer-events-none"\n      ></button>\n    </div>\n    <ng-container *ngFor="let column of columns">\n      <div\n        class="table-row-cell px-3 py-1.5 flex items-center bg-white transition-colors duration-75 truncate border-b border-gray-200"\n        [ngClass]="{\n          \'text-purple-light cursor-default\':\n            (!item.extras?.edit && !isDraftPage) || item.kind !== \'dataset\',\n          \'group-hover:text-main group-hover:bg-gray-50\':\n            (item.extras?.edit || isDraftPage) && item.kind === \'dataset\',\n        }"\n      >\n        <ng-container\n          *ngTemplateOutlet="column.cell; context: { $implicit: item }"\n        ></ng-container>\n      </div>\n    </ng-container>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[common.CommonModule,ng_icons_core.Uq,ngx_translate_core.h],providers:[(0,ng_icons_core.EB)({iconoirNavArrowDown:ng_icons_iconoir.INx,iconoirNavArrowUp:ng_icons_iconoir.D7O})],styles:[interactive_table_componentngResource_default()]})],InteractiveTableComponent)},"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{XI:()=>action});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>firstValueFrom});var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"),_Subscriber__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscriber.js");function firstValueFrom(source,config){var hasConfig="object"==typeof config;return new Promise((function(resolve,reject){var subscriber=new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Ms({next:function(value){resolve(value),subscriber.unsubscribe()},error:reject,complete:function(){hasConfig?resolve(config.defaultValue):reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.G)}});source.subscribe(subscriber)}))}},"./libs/ui/layout/src/lib/interactive-table/interactive-table.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_interactive_table_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table.component.ts"),_interactive_table_column_interactive_table_column_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.ts"),_angular_common__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_geonetwork_ui_ui_inputs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/inputs/src/index.ts"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={component:_interactive_table_component__WEBPACK_IMPORTED_MODULE_1__.w,title:"Layout/InteractiveTableComponent",decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,_interactive_table_component__WEBPACK_IMPORTED_MODULE_1__.w,_interactive_table_column_interactive_table_column_component__WEBPACK_IMPORTED_MODULE_2__.O,_geonetwork_ui_ui_inputs__WEBPACK_IMPORTED_MODULE_3__.cc]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`<div class="border border-gray-300 h-[500px] w-[800px]" style="resize: both; overflow: auto">${story}</div>`))]},Primary={args:{items:[{id:"0001",firstName:"John",lastName:"Lennon",selected:!0},{id:"0002",firstName:"Ozzy",lastName:"Osbourne",selected:!1},{id:"0003",firstName:"Claude",lastName:"François",selected:!1},{id:"0004",firstName:"Bob",lastName:"Dylan",selected:!1}]},render:args=>({props:{...args,itemClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.XI)("item clicked"),sortByName:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.XI)("sort by name"),sortById:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.XI)("sort by id")},template:"\n<gn-ui-interactive-table [items]='items' (itemClick)='itemClick($event)'>\n  <gn-ui-interactive-table-column>\n    <ng-template #header>\n      <gn-ui-checkbox\n        type=\"primary\"\n        class='-m-2 mr-3'\n      >\n      </gn-ui-checkbox>\n    </ng-template>\n    <ng-template #cell let-item>\n      <gn-ui-checkbox\n        class='-m-2'\n        [checked]=\"item.selected\"\n        type=\"default\"\n      >\n      </gn-ui-checkbox>\n    </ng-template>\n  </gn-ui-interactive-table-column>\n  <gn-ui-interactive-table-column [grow]='true' [sortable]='true' (sortChange)='sortByName($event)'>\n    <ng-template #header>full name</ng-template>\n    <ng-template #cell let-item>{{item.firstName}} {{item.lastName}}</ng-template>\n  </gn-ui-interactive-table-column>\n  <gn-ui-interactive-table-column [sortable]='true' (sortChange)='sortById($event)'>\n    <ng-template #header>id</ng-template>\n    <ng-template #cell let-item>{{item.id}}</ng-template>\n  </gn-ui-interactive-table-column>\n</gn-ui-interactive-table>"})},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    items: [{\n      id: '0001',\n      firstName: 'John',\n      lastName: 'Lennon',\n      selected: true\n    }, {\n      id: '0002',\n      firstName: 'Ozzy',\n      lastName: 'Osbourne',\n      selected: false\n    }, {\n      id: '0003',\n      firstName: 'Claude',\n      lastName: 'François',\n      selected: false\n    }, {\n      id: '0004',\n      firstName: 'Bob',\n      lastName: 'Dylan',\n      selected: false\n    }]\n  },\n  render: args => ({\n    props: {\n      ...args,\n      itemClick: action('item clicked'),\n      sortByName: action('sort by name'),\n      sortById: action('sort by id')\n    },\n    template: `\n<gn-ui-interactive-table [items]='items' (itemClick)='itemClick($event)'>\n  <gn-ui-interactive-table-column>\n    <ng-template #header>\n      <gn-ui-checkbox\n        type=\"primary\"\n        class='-m-2 mr-3'\n      >\n      </gn-ui-checkbox>\n    </ng-template>\n    <ng-template #cell let-item>\n      <gn-ui-checkbox\n        class='-m-2'\n        [checked]=\"item.selected\"\n        type=\"default\"\n      >\n      </gn-ui-checkbox>\n    </ng-template>\n  </gn-ui-interactive-table-column>\n  <gn-ui-interactive-table-column [grow]='true' [sortable]='true' (sortChange)='sortByName($event)'>\n    <ng-template #header>full name</ng-template>\n    <ng-template #cell let-item>{{item.firstName}} {{item.lastName}}</ng-template>\n  </gn-ui-interactive-table-column>\n  <gn-ui-interactive-table-column [sortable]='true' (sortChange)='sortById($event)'>\n    <ng-template #header>id</ng-template>\n    <ng-template #cell let-item>{{item.id}}</ng-template>\n  </gn-ui-interactive-table-column>\n</gn-ui-interactive-table>`\n  })\n}",...Primary.parameters?.docs?.source}}}},"./libs/ui/layout/src/lib/interactive-table/interactive-table-column/interactive-table-column.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/layout/src/lib/interactive-table/interactive-table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".table-header-cell {\n\n    display: flex;\n\n    align-items: center;\n\n    overflow: hidden;\n\n    text-overflow: ellipsis;\n\n    white-space: nowrap;\n\n    --tw-bg-opacity: 1;\n\n    background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n\n    padding-left: 0.75rem;\n\n    padding-right: 0.75rem;\n\n    padding-top: 0.75rem;\n\n    padding-bottom: 0.75rem;\n\n    color: var(--color-gray-700)\n}\n\nbutton.table-header-cell {\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n\n    transition-duration: 75ms\n}\n\nbutton.table-header-cell:hover {\n\n    background-color: var(--color-gray-50);\n\n    color: var(--color-main)\n}\n\nbutton.table-header-cell:focus {\n\n    background-color: var(--color-gray-50);\n\n    color: var(--color-main)\n}\n\nng-icon {\n\n    height: 1rem;\n\n    width: 1rem\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);