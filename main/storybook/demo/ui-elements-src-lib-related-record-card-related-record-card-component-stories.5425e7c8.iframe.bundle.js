(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[7102],{"./libs/ui/elements/src/lib/related-record-card/related-record-card.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{j:()=>RelatedRecordCardComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,related_record_card_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/related-record-card/related-record-card.component.css?ngResource"),related_record_card_componentngResource_default=__webpack_require__.n(related_record_card_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let RelatedRecordCardComponent=((_class=class RelatedRecordCardComponent{}).propDecorators={record:[{type:core.Input}]},_class);RelatedRecordCardComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-related-record-card",template:'<a\n  class="w-72 h-96 overflow-hidden rounded-lg bg-white cursor-pointer block hover:-translate-y-2 duration-[180ms]"\n  [routerLink]="[\'/dataset\', record.uniqueIdentifier]"\n  target="_blank"\n>\n  <div class="h-52 bg-gray-100">\n    <gn-ui-thumbnail\n      class="h-52 w-full object-cover"\n      [thumbnailUrl]="record.overviews?.[0].url.toString()"\n    ></gn-ui-thumbnail>\n  </div>\n  <div class="flex flex-col justify-between h-44 px-5 pt-4 pb-6">\n    <h4\n      class="max-h-24 font-title text-21 text-black text-ellipsis overflow-hidden"\n    >\n      {{ record.title }}\n    </h4>\n    <div>\n      <button\n        mat-raised-button\n        [matTooltip]="\'tooltip.url.open\' | translate"\n        matTooltipPosition="above"\n      >\n        <mat-icon class="material-symbols-outlined align-middle text-secondary"\n          >open_in_new</mat-icon\n        >\n      </button>\n    </div>\n  </div>\n</a>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[related_record_card_componentngResource_default()]})],RelatedRecordCardComponent)},"./libs/ui/elements/src/lib/thumbnail/thumbnail.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>ThumbnailComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var _class,core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const THUMBNAIL_PLACEHOLDER=new core.InjectionToken("thumbnail-placeholder");let ThumbnailComponent=((_class=class ThumbnailComponent{constructor(optionalPlaceholderUrl){this.optionalPlaceholderUrl=optionalPlaceholderUrl,this.fit="cover",this.placeholderUrl=this.optionalPlaceholderUrl||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5gkNDCUFYjA1nwAAA1pJREFUeNrtnW2TmjAURh8CLlTdrmun///3tZ22+zLuYlehH7jsMGogwRiiec4MM44K6D3x3hAwAIQQQgghhJDYSM5cPwNQAMgBpACUg22GTg2gArAD8A9AKY+9CsgALAF8YRsGALwDeAWw9yGgALCKoKWP+WU8iwxjUsudLBj83sZciIiPSwhoWz7pJ5dUZFQXlEXOZ/DNeTBt3JnhBpc9aacGsOn0BuoIUk3b+5trGnEC4B7Ak4sUlInRU+wB/JbgVxG18KrTBc01EmYmcTFJQUVPy/9zTh/4BthLDOqeenB2DdBtZBN58LsSNpcUoEtTJWM/GIvMhQDde9j6h2OhXAjo6/2Q/lgkLgSQC0IBFEABZEKyiaQv5AAv7fSlS+lPVxRwOXTnEtoTPAs04yfRHGMoz8F/HOiaJfKeggLc78dmOHsVS33y9SUXsDuLlsg6FOAw/fhYhwI0pJ7WoQASpoC9p3UoQEPpaR0K0LCB3fB1e6KfAhxRweAKgQ5PsQxJ+CzCJYC/A7+EWt4TzVCE77GgEsBPHA/G7QBswcE4b+noVRZ2QxkCCqAAQgEUQCiAAggFUAChAAogFEABhAJcfT9FAdOxQuB/ML9lAfdo/qWYy2MK8EiO5mrrliUCvdIudAEzWWzQzWuxwjRnAK9WwAzAWhZTCe3l7cryNQrQBL/txZhKGGrlwc36ogIPfvdzfhuQsDDM80EVZXUFwe+mEJ2EOwBfLfYTTFFWVxL8Qwl3nedSye1jjhEyCjAPflfCWiScU1iDKMrqyoJ/KOFxRDf1sCg/xCxgTPC7EnIHn6GYsiirKw2+ayYryorBn7YoKwb/qCgntywg1OBPdqSsGPyTRXnp07gvPgD8AAl6KIICCAVQAAlLwOg5MSNi9NyqJgKqAHpQoZNZxs5KgG7SDN7AZzgWOxcCtprn5/wVfLb+uWXsrASUPXlvHbmETGKQjBVgMitVJTuaaQS2t/GoEMeE3onEor2jlK4RvwN4G1u9T4n6zp6PMTWAXzCYdCq12OCOhdeYZzT3mIErAW1Fr+HmNOAt82KSesYIAJoRzR2aIVumo+Ms8WwT/HOOZlM0Y+Zzxv2zp/gCTzfzPOyGtdfgp7LEcDvbvSxbWXg/HUIIIYQQQogx/wHLoX7NoCMFPwAAAABJRU5ErkJggg==",this.isPlaceholder=!1,this.images=[]}ngOnInit(){this.updateImageList()}ngOnChanges(changes){("thumbnailUrl"in changes||"fit"in changes)&&this.updateImageList()}updateImageList(){if(!this.thumbnailUrl)return void this.setPlaceholder();const urls=Array.isArray(this.thumbnailUrl)?this.thumbnailUrl:[this.thumbnailUrl];this.images=urls.map(((url,index)=>({url,fit:(Array.isArray(this.fit)?this.fit[index]:this.fit)||"cover"}))).filter((img=>!!img.url)),this.images.length?(this.isPlaceholder=!1,this.setNewSrcImage(this.images[0])):this.setPlaceholder()}setNewSrcImage(image){this.imgFit=image.fit,this.imgUrl=image.url}setPlaceholder(){this.isPlaceholder=!0,this.setNewSrcImage({url:this.placeholderUrl,fit:"scale-down"})}useFallback(){this.images.length>1?(this.images.shift(),this.setNewSrcImage(this.images[0])):this.setPlaceholder()}setObjectFit(){const cw=this.containerElement?.nativeElement?.clientWidth,ch=this.containerElement?.nativeElement?.clientHeight;this.imgElement.nativeElement.naturalWidth<cw&&this.imgElement.nativeElement.naturalHeight<ch&&(this.imgFit="scale-down")}}).ctorParameters=()=>[{type:String,decorators:[{type:core.Optional},{type:core.Inject,args:[THUMBNAIL_PLACEHOLDER]}]}],_class.propDecorators={thumbnailUrl:[{type:core.Input}],fit:[{type:core.Input}],imgElement:[{type:core.ViewChild,args:["imageElement"]}],containerElement:[{type:core.ViewChild,args:["containerElement"]}]},_class);ThumbnailComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"gn-ui-thumbnail",template:'<div\n  #containerElement\n  class="h-full w-full relative shrink-0 overflow-hidden flex items-center"\n  [ngClass]="isPlaceholder ? \'bg-gray-100\' : \'bg-white\'"\n  [attr.data-cy-is-placeholder]="isPlaceholder.toString()"\n>\n  <img\n    #imageElement\n    class="relative w-full object-center"\n    [ngClass]="imgFit === \'contain\' ? \'h-4/5\' : \'h-full\'"\n    [ngStyle]="{ objectFit: imgFit }"\n    alt="thumbnail"\n    loading="lazy"\n    (load)="setObjectFit()"\n    [src]="imgUrl | safe: \'url\'"\n    (error)="useFallback()"\n  />\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush}),(0,tslib_es6.w6)("design:paramtypes",[String])],ThumbnailComponent)},"./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{h:()=>mapTo});var _map__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");function mapTo(value){return(0,_map__WEBPACK_IMPORTED_MODULE_0__.U)((function(){return value}))}},"./libs/ui/elements/src/lib/related-record-card/related-record-card.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/util/i18n/src/index.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@ngx-translate/core/fesm2020/ngx-translate-core.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_related_record_card_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/elements/src/lib/related-record-card/related-record-card.component.ts"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_router__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/router/fesm2022/router.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_thumbnail_thumbnail_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/ui/elements/src/lib/thumbnail/thumbnail.component.ts"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./libs/util/shared/src/index.ts"),_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/common/fixtures/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Elements/RelatedRecordCardComponent",component:_related_record_card_component__WEBPACK_IMPORTED_MODULE_2__.j,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({declarations:[_thumbnail_thumbnail_component__WEBPACK_IMPORTED_MODULE_3__.Z],imports:[_angular_router__WEBPACK_IMPORTED_MODULE_6__.Bz,_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.pw,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.aw.forRoot(_geonetwork_ui_util_i18n__WEBPACK_IMPORTED_MODULE_0__.fR),_angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.Ps,_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.AV,_geonetwork_ui_util_shared__WEBPACK_IMPORTED_MODULE_4__.Lt],providers:[{provide:_angular_common__WEBPACK_IMPORTED_MODULE_10__.APP_BASE_HREF,useValue:"/"}]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.BrowserAnimationsModule,_angular_router__WEBPACK_IMPORTED_MODULE_6__.Bz.forRoot([]))]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.componentWrapperDecorator)((story=>`<div style="max-width: 800px">${story}</div>`))]},Primary={args:{record:_geonetwork_ui_common_fixtures__WEBPACK_IMPORTED_MODULE_5__.XQ[0]}}},"./libs/ui/elements/src/lib/related-record-card/related-record-card.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);