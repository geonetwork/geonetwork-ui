(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[7235],{"./libs/feature/editor/src/lib/components/online-resource-card/online-resource-card.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{OfTypeDownloadDistribution:()=>OfTypeDownloadDistribution,OfTypeLink:()=>OfTypeLink,OfTypeServiceDistribution:()=>OfTypeServiceDistribution,OfTypeServiceEndpoint:()=>OfTypeServiceEndpoint,default:()=>online_resource_card_component_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var online_resource_card_componentngResource=__webpack_require__("./libs/feature/editor/src/lib/components/online-resource-card/online-resource-card.component.css?ngResource"),online_resource_card_componentngResource_default=__webpack_require__.n(online_resource_card_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),src=__webpack_require__("./libs/ui/elements/src/index.ts"),shared_src=__webpack_require__("./libs/util/shared/src/index.ts"),inputs_src=__webpack_require__("./libs/ui/inputs/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_iconoir=__webpack_require__("./node_modules/@ng-icons/iconoir/fesm2022/ng-icons-iconoir.mjs");let OnlineResourceCardComponent=class OnlineResourceCardComponent{constructor(){this.modifyClick=new core.EventEmitter}get title(){switch(this.onlineResource.type){case"link":case"service":case"download":return this.onlineResource.name??this.onlineResource.description??"(unknown)";case"endpoint":return this.onlineResource.description}}get subtitle(){switch(this.onlineResource.type){case"service":return`${this.onlineResource.accessServiceProtocol}`;case"endpoint":return`${this.onlineResource.protocol}`;case"link":case"download":return this.getFormat(this.onlineResource)}}get fileSize(){return"download"!==this.onlineResource.type?"":this.onlineResource.sizeBytes?(0,shared_src.kG)(this.onlineResource.sizeBytes).toLocaleString():""}get identifierInService(){return"service"!==this.onlineResource.type?"":this.onlineResource.identifierInService??""}getFormat(onlineResource){return((0,shared_src.uL)(onlineResource)||"").toUpperCase()}static#_=this.propDecorators={onlineResource:[{type:core.Input}],modifyClick:[{type:core.Output}]}};OnlineResourceCardComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-online-resource-card",standalone:!0,imports:[common.CommonModule,src.Yg,inputs_src.Qp,ngx_translate_core.h,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({iconoirAttachment:ng_icons_iconoir.FXR}),(0,ng_icons_core.PG)({size:"1.5em"})],template:'<div class="gn-ui-card">\n  <div\n    class="bg-gray-100 w-[56px] h-[56px] rounded-[4px] text-primary grid justify-center items-center shrink-0"\n  >\n    <ng-icon name="iconoirAttachment"></ng-icon>\n  </div>\n  <div class="flex flex-col w-full items-start overflow-hidden leading-snug">\n    <div class="text-[16px] font-bold text-main" data-test="card-title">\n      {{ title }}\n    </div>\n    <div\n      class="text-[14px] text-gray-900"\n      *ngIf="subtitle"\n      data-test="card-subtitle"\n    >\n      <span>{{ subtitle }}</span>\n      <span *ngIf="fileSize">\n        •\n        {{\n          \'editor.record.form.field.onlineResource.fileSize\'\n            | translate: { sizeMB: fileSize }\n        }}</span\n      >\n      <span *ngIf="identifierInService"> • {{ identifierInService }}</span>\n    </div>\n    <button\n      class="gn-ui-link text-[14px]"\n      translate\n      (click)="modifyClick.emit(onlineResource)"\n      data-test="card-modify"\n    >\n      editor.record.form.field.onlineResource.modify\n    </button>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[online_resource_card_componentngResource_default()]})],OnlineResourceCardComponent);var fixtures_src=__webpack_require__("./libs/common/fixtures/src/index.ts"),i18n_src=__webpack_require__("./libs/util/i18n/src/index.ts");const online_resource_card_component_stories={title:"Elements/OnlineResourceCardComponent",component:OnlineResourceCardComponent,decorators:[(0,dist.moduleMetadata)({imports:[OnlineResourceCardComponent]}),(0,dist.applicationConfig)({providers:[(0,core.importProvidersFrom)(animations.BrowserAnimationsModule),(0,core.importProvidersFrom)(i18n_src.D7),(0,core.importProvidersFrom)(ngx_translate_core.h.forRoot(i18n_src.sU))]}),(0,dist.componentWrapperDecorator)((story=>`<div class="border border-gray-300 h-[200px] w-[500px] p-[10px]" style="resize: both; overflow: auto; margin: auto;">${story}</div>`))],argTypes:{modifyClick:{action:"modifyClick"}}},OfTypeLink={args:{onlineResource:(0,fixtures_src.j4)().readmeLink()}},OfTypeServiceDistribution={args:{onlineResource:(0,fixtures_src.j4)().geodataWms()}},OfTypeDownloadDistribution={args:{onlineResource:(0,fixtures_src.j4)().dataCsv()}},OfTypeServiceEndpoint={args:{onlineResource:(0,fixtures_src.j4)().wmsEndpoint()}}},"./libs/feature/editor/src/lib/components/online-resource-card/online-resource-card.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);