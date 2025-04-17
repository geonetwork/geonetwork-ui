(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[8115],{"./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>RecordPreviewCardComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_card_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.scss?ngResource"),record_preview_card_componentngResource_default=__webpack_require__.n(record_preview_card_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewCardComponent=class RecordPreviewCardComponent extends record_preview_component.W{};RecordPreviewCardComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-card",template:'<div\n  class="h-full border bg-white rounded-sm overflow-hidden transition duration-200 transform hover:scale-105 hover:bg-gray-50 border-gray-300 hover:border-primary hover:text-primary"\n>\n  <a\n    [href]="record.landingPage"\n    [title]="record.abstract"\n    [target]="linkTarget"\n  >\n    <div class="flex flex-col min-h-full">\n      <gn-ui-thumbnail\n        class="lg:h-48 md:h-36 border-b border-gray-200 bg-gray-100"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n\n      <div class="grow p-4">\n        <h1 class="title-font text-lg font-medium mb-3 clamp-2">\n          {{ record.title }}\n        </h1>\n        <p class="leading-relaxed text-sm text-gray-700 clamp-3">\n          {{ record.abstract }}\n        </p>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_card_componentngResource_default()]})],RecordPreviewCardComponent)},"./libs/ui/search/src/lib/record-preview-feed/record-preview-feed.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>RecordPreviewFeedComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,record_preview_feed_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-feed/record-preview-feed.component.css?ngResource"),record_preview_feed_componentngResource_default=__webpack_require__.n(record_preview_feed_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),duration_relativetimeformat=__webpack_require__("./node_modules/duration-relativetimeformat/index.js"),duration_relativetimeformat_default=__webpack_require__.n(duration_relativetimeformat);let RecordPreviewFeedComponent=((_class=class RecordPreviewFeedComponent extends record_preview_component.W{constructor(elementRef,translate){super(elementRef),this.elementRef=elementRef,this.translate=translate,this.timeFormat=new(duration_relativetimeformat_default())(this.translate.currentLang,{})}get hasOrganization(){return!!this.record.ownerOrganization}get hasLogo(){return!!this.record.ownerOrganization?.logoUrl}get hasOnlyPerson(){return!1}get time(){return this.timeFormat.format(this.record.recordCreated,Date.now())}}).ctorParameters=()=>[{type:core.ElementRef},{type:ngx_translate_core.sK}],_class);RecordPreviewFeedComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-feed",template:'<div\n  class="mx-[18px] pl-[18px] pb-[18px] border-solid border-l-2 border-gray-100"\n>\n  <a\n    class="record-container block rounded-lg bg-white border border-white card-shadow"\n    [attr.href]="linkHref"\n    [target]="linkTarget"\n  >\n    <div\n      class="record-header py-4 px-4 border-b border-gray-300 flex flex-row items-center relative transition duration-200"\n    >\n      <div\n        class="absolute w-3 h-3 bg-secondary rounded-full"\n        style="right: calc(100% + 14px)"\n      ></div>\n      <div\n        class="record-header-image border border-gray-300 bg-white rounded-full w-16 h-16 object-contain mr-4 overflow-hidden transition duration-200 shrink-0"\n      >\n        <mat-icon\n          *ngIf="!hasLogo"\n          class="material-symbols-outlined text-gray-200"\n          style="width: 42px; height: 42px; font-size: 42px; margin: 10px"\n          >{{ hasOnlyPerson ? \'face\' : \'home_work\' }}</mat-icon\n        >\n        <gn-ui-thumbnail\n          *ngIf="hasLogo"\n          [thumbnailUrl]="record.ownerOrganization?.logoUrl?.toString()"\n        ></gn-ui-thumbnail>\n      </div>\n      <div class="flex flex-col overflow-hidden items-start">\n        <span\n          *ngIf="hasOrganization"\n          class="font-bold transition duration-200 text-primary truncate max-w-full"\n        >\n          {{ record.ownerOrganization.name }}\n        </span>\n        <span\n          *ngIf="hasOnlyPerson"\n          class="font-bold transition duration-200 text-primary truncate max-w-full"\n        >\n          {{ contact.firstName }} {{ contact.lastName }}\n        </span>\n        <p class="text-gray-900">\n          <span translate [translateParams]="{ time }"\n            >record.was.created.time</span\n          >\n        </p>\n      </div>\n    </div>\n    <div class="pt-5 pb-5 px-10 relative">\n      <div class="absolute top-[0.85em] right-[0.85em]">\n        <ng-container\n          [ngTemplateOutlet]="favoriteTemplate"\n          [ngTemplateOutletContext]="{ $implicit: record }"\n        ></ng-container>\n      </div>\n      <h1\n        class="font-title text-[21px] font-medium mb-3 pr-8"\n        data-cy="recordTitle"\n      >\n        {{ record.title }}\n      </h1>\n      <p class="text-gray-900 line-clamp-3">{{ abstract }}</p>\n      <gn-ui-thumbnail\n        *ngIf="record.overviews?.[0]"\n        class="block mt-3 w-full h-[136px] border border-gray-100 rounded-lg overflow-hidden"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n      <div class="flex flex-row mt-3" *ngIf="isDownloadable || isViewable">\n        <mat-icon\n          *ngIf="isDownloadable"\n          class="material-symbols-outlined text-primary opacity-45 mr-3"\n          >cloud_download\n        </mat-icon>\n        <mat-icon\n          *ngIf="isViewable"\n          class="material-symbols-outlined text-primary opacity-45 mr-3"\n          >map\n        </mat-icon>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_feed_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ElementRef,ngx_translate_core.sK])],RecordPreviewFeedComponent)},"./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{J:()=>RecordPreviewListComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_list_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.scss?ngResource"),record_preview_list_componentngResource_default=__webpack_require__.n(record_preview_list_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewListComponent=class RecordPreviewListComponent extends record_preview_component.W{};RecordPreviewListComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-list",template:'<div\n  class="h-40 bg-white transition duration-200 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-primary hover:text-primary"\n>\n  <a\n    [href]="record.landingPage"\n    [target]="linkTarget"\n    [title]="record.abstract"\n  >\n    <div class="h-full flex flex-row items-center shadow-sm">\n      <gn-ui-thumbnail\n        class="w-40 h-full shrink-0 border-r border-gray-200 bg-gray-100"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n\n      <div class="grow h-full px-6 py-4 flex flex-col overflow-hidden">\n        <div class="title-font text-lg font-medium mb-2">\n          <h1 class="truncate">{{ record.title }}</h1>\n        </div>\n        <p class="leading-relaxed clamp-3 text-sm text-gray-700">\n          {{ record.abstract }}\n        </p>\n        <div class="grow"></div>\n        <div class="flex flex-row items-center">\n          <div\n            class="text-gray-500 text-xs truncate capitalize border-r mr-4 pr-4"\n            *ngIf="record.kind === \'dataset\'"\n          >\n            <span translate>{{ record.updateFrequency }}</span>\n          </div>\n          <div\n            class="text-gray-500 text-xs border-gray-300 truncate viewable-downloadable"\n            *ngIf="isViewable || isDownloadable"\n          >\n            <span *ngIf="isViewable" translate>record.action.view</span>\n            <span *ngIf="isViewable && isDownloadable">,&nbsp;</span>\n            <span *ngIf="isDownloadable" translate>record.action.download</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_list_componentngResource_default()]})],RecordPreviewListComponent)},"./libs/ui/search/src/lib/record-preview-row/record-preview-row.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{E:()=>RecordPreviewRowComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,record_preview_row_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-row/record-preview-row.component.css?ngResource"),record_preview_row_componentngResource_default=__webpack_require__.n(record_preview_row_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewRowComponent=((_class=class RecordPreviewRowComponent extends record_preview_component.W{constructor(elementRef){super(elementRef),this.elementRef=elementRef}}).ctorParameters=()=>[{type:core.ElementRef}],_class);RecordPreviewRowComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-row",template:'<a\n  class="group container-lg mx-auto flex cursor-pointer flex-wrap sm:flex-nowrap"\n  [title]="record.title"\n  [attr.href]="linkHref"\n>\n  <div class="shrink-0 w-full sm:w-52">\n    <div\n      class="overflow-hidden bg-gray-100 rounded-lg w-full border border-gray-300 h-36"\n    >\n      <gn-ui-thumbnail\n        class="relative h-full w-full object-cover object-left-top"\n        [thumbnailUrl]="[record.overviews?.[0]?.url?.toString(), organization?.logoUrl?.toString()]"\n        [fit]="[\'cover\', \'contain\']"\n      ></gn-ui-thumbnail>\n    </div>\n  </div>\n  <div\n    class="content grid grow relative sm:pl-6 sm:pr-12"\n    style="grid-template-columns: auto 70px"\n  >\n    <div class="mb-3 mt-5 sm:mt-2">\n      <div\n        class="font-title text-21 text-title line-clamp-2 col-start-1 col-span-2 sm:line-clamp-1 group-hover:text-primary"\n        data-cy="recordTitle"\n      >\n        {{ record.title }}\n      </div>\n    </div>\n    <div\n      class="abstract mt-4 mb-5 h-36 line-clamp-6 col-start-1 col-span-2 row-start-3 sm:mb-2 sm:h-[4.5rem] sm:line-clamp-3 sm:row-start-2 sm:mt-0"\n      data-cy="recordAbstract"\n    >\n      {{ abstract }}\n    </div>\n    <div\n      class="text-primary opacity-45 uppercase col-start-1 col-span-2 row-start-2 sm:truncate sm:row-start-3 sm:col-span-1"\n      data-cy="recordOrg"\n    >\n      {{ organization?.name }}\n    </div>\n    <div\n      class="icons flex flex-row col-start-1 row-start-4 sm:col-start-2 sm:row-start-3 sm:absolute sm:right-[0.4em]"\n    >\n      <mat-icon\n        *ngIf="isDownloadable"\n        class="material-symbols-outlined text-primary opacity-45 mx-1"\n        >cloud_download</mat-icon\n      >\n      <mat-icon\n        *ngIf="isViewable"\n        class="material-symbols-outlined text-primary opacity-45 mx-1"\n        >map</mat-icon\n      >\n    </div>\n    <div\n      class="text-right col-start-2 row-start-4 sm:absolute sm:col-start-2 sm:row-start-1 sm:top-[-1.125em] sm:right-[0.4em]"\n      data-cy="recordFav"\n    >\n      <ng-container\n        [ngTemplateOutlet]="favoriteTemplate"\n        [ngTemplateOutletContext]="{ $implicit: record }"\n      ></ng-container>\n    </div>\n  </div>\n</a>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_row_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ElementRef])],RecordPreviewRowComponent)},"./libs/ui/search/src/lib/record-preview-text/record-preview-text.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{j:()=>RecordPreviewTextComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_text_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-text/record-preview-text.component.scss?ngResource"),record_preview_text_componentngResource_default=__webpack_require__.n(record_preview_text_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewTextComponent=class RecordPreviewTextComponent extends record_preview_component.W{};RecordPreviewTextComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-text",template:'\x3c!-- Record list item: List Small --\x3e\n<div class="mb-4">\n  <div\n    class="flex sm:flex-row flex-col p-5 items-center sm:justify-start justify-center text-center sm:text-left bg-white border-gray-200 border rounded-sm transition duration-200 hover:bg-gray-50 hover:border-primary hover:text-primary"\n  >\n    <div class="grow">\n      <h1 class="title-font text-lg font-medium mb-3">\n        {{ record.title }}\n      </h1>\n      <p\n        class="leading-relaxed mb-3 text-gray-700 text-sm whitespace-pre-line clamp-3"\n      >\n        {{ record.abstract }}\n      </p>\n\n      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">\n        <a\n          class="inline-flex items-center md:mb-2 lg:mb-0 hover:underline"\n          [href]="record.landingPage"\n        >\n          <span translate>record.more.details</span>\n          <svg\n            class="h-5 w-5"\n            xmlns="http://www.w3.org/2000/svg"\n            fill="none"\n            viewBox="0 0 24 24"\n            stroke="currentColor"\n          >\n            <path\n              stroke-linecap="round"\n              stroke-linejoin="round"\n              stroke-width="2"\n              d="M9 5l7 7-7 7"\n            />\n          </svg>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_text_componentngResource_default()]})],RecordPreviewTextComponent)},"./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>RecordPreviewTitleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var record_preview_title_componentngResource=__webpack_require__("./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.scss?ngResource"),record_preview_title_componentngResource_default=__webpack_require__.n(record_preview_title_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),record_preview_component=__webpack_require__("./libs/ui/search/src/lib/record-preview/record-preview.component.ts");let RecordPreviewTitleComponent=class RecordPreviewTitleComponent extends record_preview_component.W{};RecordPreviewTitleComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-record-preview-title",template:'\x3c!-- Record list item: List Small --\x3e\n<div\n  class="h-10 w-full border-b border-gray-200 transition duration-200 rounded-sm hover:text-primary"\n>\n  <a\n    [href]="record.landingPage"\n    [target]="linkTarget"\n    [title]="record.abstract"\n  >\n    <div class="h-full flex flex-row items-center">\n      <gn-ui-thumbnail\n        class="w-10 h-full shrink-0 border-r border-gray-200 bg-gray-100"\n        [thumbnailUrl]="record.overviews?.[0]?.url.toString()"\n      ></gn-ui-thumbnail>\n\n      <div class="grow px-3 py-1 flex flex-col overflow-hidden">\n        <h1 class="title-font text-sm font-bold truncate md:text-clip">\n          {{ record.title }}\n        </h1>\n      </div>\n    </div>\n  </a>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[record_preview_title_componentngResource_default()]})],RecordPreviewTitleComponent)},"./libs/ui/search/src/lib/record-preview/record-preview.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{W:()=>RecordPreviewComponent});var _class,tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/shared/src/index.ts"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");let RecordPreviewComponent=((_class=class RecordPreviewComponent{get isViewable(){return this.record.extras?.hasMaps}get isDownloadable(){return this.record.extras?.hasDownloads}get contact(){return this.record.contactsForResource?.[0]||this.record.contacts[0]}get organization(){return this.record.ownerOrganization}constructor(elementRef){this.elementRef=elementRef,this.linkTarget="_blank",this.linkHref=null,this.mdSelect=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter,this.subscription=new rxjs__WEBPACK_IMPORTED_MODULE_2__.w0}ngOnInit(){this.abstract=(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.sd)((0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.Vt)(this.record?.abstract)),this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.R)(this.elementRef.nativeElement,"click").subscribe((event=>{event.preventDefault(),(0,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_0__.Yr)(event),this.mdSelect.emit(this.record)})))}ngOnDestroy(){this.subscription.unsubscribe()}}).ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef}],_class.propDecorators={record:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkTarget:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],favoriteTemplate:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],linkHref:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Input}],mdSelect:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_1__.Output}]},_class);RecordPreviewComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({selector:"gn-ui-record-preview",template:""}),(0,tslib__WEBPACK_IMPORTED_MODULE_4__.w6)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef])],RecordPreviewComponent)},"./libs/ui/search/src/lib/results-list-item/results-list-item.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>ResultsListItemComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,results_list_item_componentngResource=__webpack_require__("./libs/ui/search/src/lib/results-list-item/results-list-item.component.css?ngResource"),results_list_item_componentngResource_default=__webpack_require__.n(results_list_item_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");__webpack_require__("./libs/ui/search/src/lib/results-list/results-layout.config.ts");let ResultsListItemComponent=((_class=class ResultsListItemComponent{constructor(componentFactoryResolver){this.componentFactoryResolver=componentFactoryResolver,this.mdSelect=new core.EventEmitter,this.initialized=!1}ngAfterViewInit(){this.initialized=!0,this.loadComponent()}ngOnChanges(){this.initialized&&this.loadComponent()}loadComponent(){const resolver=this.componentFactoryResolver.resolveComponentFactory(this.layoutConfig.component);this.cardRef.clear();const componentFactory=this.cardRef.createComponent(resolver);componentFactory.instance.record=this.record,componentFactory.instance.favoriteTemplate=this.favoriteTemplate,componentFactory.instance.mdSelect.subscribe((record=>this.mdSelect.emit(record))),componentFactory.instance.linkHref=this.linkHref,componentFactory.changeDetectorRef.detectChanges()}}).ctorParameters=()=>[{type:core.ComponentFactoryResolver}],_class.propDecorators={layoutConfig:[{type:core.Input}],record:[{type:core.Input}],favoriteTemplate:[{type:core.Input}],linkHref:[{type:core.Input}],mdSelect:[{type:core.Output}],cardRef:[{type:core.ViewChild,args:["card",{read:core.ViewContainerRef}]}]},_class);ResultsListItemComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-results-list-item",template:"<ng-template #card></ng-template>\n",changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[results_list_item_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[core.ComponentFactoryResolver])],ResultsListItemComponent)},"./libs/ui/search/src/lib/results-list/results-layout.config.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Ne:()=>ResultsLayoutConfigItem,cE:()=>DEFAULT_RESULTS_LAYOUT_CONFIG,z6:()=>RESULTS_LAYOUT_CONFIG});var _angular_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_record_preview_card_record_preview_card_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.ts"),_record_preview_feed_record_preview_feed_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/search/src/lib/record-preview-feed/record-preview-feed.component.ts"),_record_preview_list_record_preview_list_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.ts"),_record_preview_row_record_preview_row_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/search/src/lib/record-preview-row/record-preview-row.component.ts"),_record_preview_text_record_preview_text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/ui/search/src/lib/record-preview-text/record-preview-text.component.ts"),_record_preview_title_record_preview_title_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.ts");class ResultsLayoutConfigItem{constructor(component,itemClass="pb-4",itemStyle="",containerClass="gap-4 p-4"){this.component=component,this.itemClass=itemClass,this.itemStyle=itemStyle,this.containerClass=containerClass}}const RESULTS_LAYOUT_CONFIG=new _angular_core__WEBPACK_IMPORTED_MODULE_6__.InjectionToken("results-layout.config"),DEFAULT_RESULTS_LAYOUT_CONFIG={CARD:new ResultsLayoutConfigItem(_record_preview_card_record_preview_card_component__WEBPACK_IMPORTED_MODULE_0__.D,"","height: 24em;","grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"),ROW:new ResultsLayoutConfigItem(_record_preview_row_record_preview_row_component__WEBPACK_IMPORTED_MODULE_3__.E,"pt-4 pb-5 sm:py-7","","grid grid-cols-1 divide-y divide-gray-300"),FEED:new ResultsLayoutConfigItem(_record_preview_feed_record_preview_feed_component__WEBPACK_IMPORTED_MODULE_1__.B,"p-0",void 0,"gap-0 p-0"),LIST:new ResultsLayoutConfigItem(_record_preview_list_record_preview_list_component__WEBPACK_IMPORTED_MODULE_2__.J),TEXT:new ResultsLayoutConfigItem(_record_preview_text_record_preview_text_component__WEBPACK_IMPORTED_MODULE_4__.j),TITLE:new ResultsLayoutConfigItem(_record_preview_title_record_preview_title_component__WEBPACK_IMPORTED_MODULE_5__._)}},"./libs/ui/search/src/lib/results-list/results-list.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{I:()=>ResultsListComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,results_list_componentngResource=__webpack_require__("./libs/ui/search/src/lib/results-list/results-list.component.css?ngResource"),results_list_componentngResource_default=__webpack_require__.n(results_list_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),results_layout_config=__webpack_require__("./libs/ui/search/src/lib/results-list/results-layout.config.ts");let ResultsListComponent=((_class=class ResultsListComponent{constructor(){this.layoutConfig=results_layout_config.cE.CARD,this.mdSelect=new core.EventEmitter}}).propDecorators={records:[{type:core.Input}],layoutConfig:[{type:core.Input}],favoriteTemplate:[{type:core.Input}],recordUrlGetter:[{type:core.Input}],mdSelect:[{type:core.Output}]},_class);ResultsListComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-results-list",template:'<ng-container>\n  <div [ngClass]="layoutConfig.containerClass">\n    <div\n      [ngClass]="layoutConfig.itemClass"\n      [style]="layoutConfig.itemStyle"\n      *ngFor="let record of records"\n    >\n      <gn-ui-results-list-item\n        [record]="record"\n        [layoutConfig]="layoutConfig"\n        (mdSelect)="mdSelect.emit($event)"\n        [favoriteTemplate]="favoriteTemplate"\n        [linkHref]="recordUrlGetter(record)"\n      ></gn-ui-results-list-item>\n    </div>\n  </div>\n</ng-container>\n\n\x3c!--\n<ng-template #block>\n  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">\n    <gn-ui-record-preview-card\n      *ngFor="let record of records"\n      [record]="record"\n      (mdSelect)="mdSelect.emit($event)"\n      linkTarget="_blank"\n      style="height: 24em"\n    ></gn-ui-record-preview-card>\n  </div>\n</ng-template>\n--\x3e\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[results_list_componentngResource_default()]})],ResultsListComponent)},"./libs/ui/search/src/lib/record-preview-feed/record-preview-feed.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".record-container:hover .record-header,\n.record-container:hover .record-header-image {\n  border-color: var(--color-primary-lightest);\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-row/record-preview-row.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/results-list-item/results-list-item.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/results-list/results-list.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-card/record-preview-card.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-list/record-preview-list.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".viewable-downloadable :first-child {\n  text-transform: capitalize;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-text/record-preview-text.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/search/src/lib/record-preview-title/record-preview-title.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);