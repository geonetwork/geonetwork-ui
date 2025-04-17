(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[2310],{"./libs/ui/dataviz/src/lib/data-table/data-table.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>DataTableComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var data_table_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.component.css?ngResource"),data_table_componentngResource_default=__webpack_require__.n(data_table_componentngResource),scrolling=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),sort=__webpack_require__("./node_modules/@angular/material/fesm2022/sort.mjs"),table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");class DataTableDataSource{constructor(){this.dataItems$=new BehaviorSubject.t([])}connect(){return this.dataItems$.asObservable().pipe((0,map.T)((items=>items.map((item=>({id:item.id,...item.properties}))))))}disconnect(){this.dataItems$.complete()}showData(itemsPromise){var _this=this;return(0,asyncToGenerator.A)((function*(){const items=yield itemsPromise;_this.dataItems$.next(items)}))()}clearData(){this.dataItems$.next([])}}var src=__webpack_require__("./libs/util/data-fetcher/src/index.ts"),paginator=__webpack_require__("./node_modules/@angular/material/fesm2022/paginator.mjs"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js");let CustomMatPaginatorIntl=class CustomMatPaginatorIntl extends paginator.xX{constructor(translate){super(),this.translate=translate,this.changes=new Subject.B,this.setLabels(),this.translate.onLangChange.subscribe((()=>{this.setLabels(),this.changes.next()}))}setLabels(){this.itemsPerPageLabel=this.translate.instant("table.paginator.itemsPerPage"),this.nextPageLabel=this.translate.instant("table.paginator.nextPage"),this.previousPageLabel=this.translate.instant("table.paginator.previousPage"),this.firstPageLabel=this.translate.instant("table.paginator.firstPage"),this.lastPageLabel=this.translate.instant("table.paginator.lastPage"),this.getRangeLabel=this.getRangeLabelIntl,this.changes.next()}getRangeLabelIntl(page,pageSize,length){if(0===length||0===pageSize)return this.translate.instant("table.paginator.rangeLabel",{startIndex:0,endIndex:0,length});const startIndex=page*pageSize,endIndex=startIndex<length?Math.min(startIndex+pageSize,length):startIndex+pageSize;return this.translate.instant("table.paginator.rangeLabel",{startIndex:startIndex+1,endIndex,length})}static{this.ctorParameters=()=>[{type:ngx_translate_core.c$}]}};CustomMatPaginatorIntl=(0,tslib_es6.Cg)([(0,core.Injectable)(),(0,tslib_es6.Sn)("design:paramtypes",[ngx_translate_core.c$])],CustomMatPaginatorIntl);var common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),firstValueFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),widgets_src=__webpack_require__("./libs/ui/widgets/src/index.ts"),ngrx_component=__webpack_require__("./node_modules/@ngrx/component/fesm2022/ngrx-component.mjs");let DataTableComponent=class DataTableComponent{set dataset(value){this.properties$.next(null),this.dataset_=value,this.dataset_.load(),this.dataset_.properties.then((properties=>this.properties$.next(properties.map((p=>p.name))))),this.dataset_.info.then((info=>this.count=info.itemsCount))}constructor(eltRef,cdr,translateService){this.eltRef=eltRef,this.cdr=cdr,this.translateService=translateService,this.selected=new core.EventEmitter,this.properties$=new BehaviorSubject.t(null),this.loading$=new BehaviorSubject.t(!1),this.error=null}ngOnInit(){this.dataSource=new DataTableDataSource}ngAfterViewInit(){this.headerHeight=this.eltRef.nativeElement.querySelector("thead").offsetHeight,this.setPagination(),this.cdr.detectChanges()}ngOnChanges(){this.setPagination()}setSort(sort){this.dataset_&&(sort.active?this.dataset_.orderBy([sort.direction||"asc",sort.active]):this.dataset_.orderBy(),this.readData())}setPagination(){this.paginator&&this.dataset_&&(this.dataset_.limit(this.paginator.pageIndex*this.paginator.pageSize,this.paginator.pageSize),this.readData())}readData(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.loading$.next(!0);const propsWithoutGeom=(yield(0,firstValueFrom._)(_this.properties$.pipe((0,filter.p)((p=>!!p))))).filter((p=>!p.toLowerCase().startsWith("geom")));_this.dataset_.select(...propsWithoutGeom);try{yield _this.dataSource.showData(_this.dataset_.read()),_this.error=null}catch(error){_this.handleError(error)}_this.loading$.next(!1)}))()}scrollToItem(itemId){const row=this.eltRef.nativeElement.querySelector(`#${this.getRowEltId(itemId)}`);this.eltRef.nativeElement.scrollTop=row.offsetTop-this.headerHeight}getRowEltId(id){return"table-item-"+id}handleError(error){this.dataSource.clearData(),error instanceof src.fk?(this.error=this.translateService.instant(`dataset.error.${error.type}`,{info:error.info}),console.warn(error.message)):(this.error=this.translateService.instant(error.message),console.warn(error.stack||error))}static{this.ctorParameters=()=>[{type:core.ElementRef},{type:core.ChangeDetectorRef},{type:ngx_translate_core.c$}]}static{this.propDecorators={dataset:[{type:core.Input}],activeId:[{type:core.Input}],selected:[{type:core.Output}],sort:[{type:core.ViewChild,args:[sort.B4]}],paginator:[{type:core.ViewChild,args:[paginator.iy]}]}}};DataTableComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,imports:[table.tP,sort.NQ,paginator.Ou,scrolling.E9,ngx_translate_core.h,common.CommonModule,widgets_src.OR,widgets_src.oz,ngrx_component.Nj],providers:[{provide:paginator.xX,useClass:CustomMatPaginatorIntl}],selector:"gn-ui-data-table",template:'<div class="flex flex-col border border-gray-300 rounded-lg bg-white h-full">\n  <div class="flex-1 overflow-y-hidden overflow-x-auto rounded-lg relative">\n    <table\n      mat-table\n      [dataSource]="dataSource"\n      matSort\n      (matSortChange)="setSort($event)"\n      [matSortDisableClear]="true"\n      *ngrxLet="properties$ as properties"\n    >\n      <ng-container *ngFor="let prop of properties" [matColumnDef]="prop">\n        <th\n          mat-header-cell\n          *matHeaderCellDef\n          mat-sort-header\n          class="text-sm text-black bg-white"\n        >\n          {{ prop }}\n        </th>\n        <td\n          mat-cell\n          *matCellDef="let element"\n          class="whitespace-nowrap pr-1 truncate"\n        >\n          {{ element[prop] }}\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef="properties; sticky: true"></tr>\n      <tr\n        [id]="getRowEltId(row.id)"\n        mat-row\n        *matRowDef="let row; columns: properties"\n        (click)="selected.emit(row)"\n        [class.active]="row.id === activeId"\n      ></tr>\n    </table>\n    <gn-ui-loading-mask\n      *ngIf="loading$ | async"\n      class="sticky inset-0"\n      [message]="\'table.loading.data\' | translate"\n    ></gn-ui-loading-mask>\n    <gn-ui-popup-alert\n      *ngIf="error"\n      type="warning"\n      icon="matErrorOutlineOutline"\n      class="absolute m-2 inset-0 z-[100]"\n    >\n      <span translate>{{ error }}</span>\n    </gn-ui-popup-alert>\n  </div>\n  <div class="flex justify-between items-center overflow-hidden">\n    <div class="text-gray-900 px-4 py-2 text-sm">\n      <span class="count font-extrabold text-primary">{{ count }}</span\n      >&nbsp;<span translate>table.object.count</span>.\n    </div>\n\n    <mat-paginator\n      class="my-[-16px]"\n      (page)="setPagination()"\n      [length]="count"\n      [pageSize]="10"\n      [showFirstLastButtons]="true"\n      [hidePageSize]="true"\n    ></mat-paginator>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[data_table_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[core.ElementRef,core.ChangeDetectorRef,ngx_translate_core.c$])],DataTableComponent)},"./libs/ui/dataviz/src/lib/data-table/data-table.fixtures.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{w:()=>tableItemsFixture});const tableItemsFixture={items:[{type:"Feature",geometry:null,properties:{id:"0001",firstName:"John",lastName:"Lennon"}},{type:"Feature",geometry:null,properties:{id:"0002",firstName:"Ozzy",lastName:"Osbourne"}},{type:"Feature",geometry:null,properties:{id:"0003",firstName:"Claude",lastName:"François"}}],properties:[{name:"id",label:"id",type:"string"},{name:"firstName",label:"Firstname",type:"string"},{name:"lastName",label:"Lastname",type:"string"}]}},"./libs/ui/dataviz/src/lib/figure/figure.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>FigureComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var figure_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource"),figure_componentngResource_default=__webpack_require__.n(figure_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FigureComponent=class FigureComponent{constructor(){this.unit="",this.color="primary"}get textClass(){return"primary"===this.color?"text-primary":"text-secondary"}get bgClass(){return"primary"===this.color?"bg-primary-white":"bg-secondary-white"}static{this.propDecorators={icon:[{type:core.Input}],title:[{type:core.Input}],figure:[{type:core.Input}],unit:[{type:core.Input}],color:[{type:core.Input}]}}};FigureComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-figure",template:'<div\n  class="flex flex-row justify-start items-center overflow-hidden"\n  data-test="figureTitle"\n  [title]="\n    figure.toString() +\n    \' \' +\n    unit +\n    \' \' +\n    (title | translate: { count: figure })\n  "\n>\n  <div\n    data-test="icon-container"\n    class="{{ bgClass }} {{\n      textClass\n    }} text-[1.875em] rounded-full mr-[0.55em] flex justify-center items-center w-[2.2em] h-[2.2em] shrink-0"\n    style="width: 2.2em; height: 2.2em"\n    data-test="icon-container"\n  >\n    <ng-icon class="text-[0.66em]" [name]="icon"> </ng-icon>\n  </div>\n  <div class="shrink overflow-hidden">\n    <div class="figure-block text-[1.5em] text-black">\n      <span class="figure font-medium mr-[0.3em]" data-test="figure">{{\n        figure\n      }}</span>\n      <span class="unit text-[0.665em]">{{ unit }}</span>\n    </div>\n    <div translate class="title truncate" [translateParams]="{ count: figure }">\n      {{ title }}\n    </div>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[figure_componentngResource_default()]})],FigureComponent)},"./libs/ui/dataviz/src/lib/ui-dataviz.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>UiDatavizModule});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts"),_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs"),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),_ng_icons_material_icons_baseline__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-baseline.mjs"),_ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@ng-icons/tabler-icons/fesm2022/ng-icons-tabler-icons.mjs");let UiDatavizModule=class UiDatavizModule{};UiDatavizModule=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.h.forChild(),_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.i6.withIcons({matCorporateFare:_ng_icons_material_icons_baseline__WEBPACK_IMPORTED_MODULE_6__.MB9,tablerFolderOpen:_ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_7__.B7Z})],providers:[(0,_ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.PG)({size:"1.5em"})],declarations:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.Q],exports:[_figure_figure_component__WEBPACK_IMPORTED_MODULE_0__.Q]})],UiDatavizModule)},"./libs/util/data-fetcher/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Vw:()=>BaseFileReader,fk:()=>model_FetchError,S5:()=>SupportedTypes,PJ:()=>getJsonDataItemsProxy,Jp:()=>openDataset});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");class model_FetchError{constructor(type,info,httpStatus=0){this.type=type,this.info=info,this.httpStatus=httpStatus,this.stack=null,this.message=`An error happened in the data fetcher, type: ${type}, info: ${info}`}static http(code,body){return new model_FetchError("http",body?`Error ${code}\n${body}`:`${code}`,code)}static corsOrNetwork(message){return new model_FetchError("network",message,0)}static parsingFailed(info){return new model_FetchError("parse",info,0)}static unsupportedType(mimeType){return new model_FetchError("unsupportedType",mimeType,0)}static unknownType(){return new model_FetchError("unknown","",0)}}const SupportedTypes=["csv","json","geojson","excel","gml","wfs"],AllMimeTypes={csv:["text/csv","application/csv"],json:["application/json"],geojson:["application/geo+json","application/vnd.geo+json"],excel:["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],gml:["application/gml+xml"]};var papaparse_min=__webpack_require__("./node_modules/papaparse/papaparse.min.js"),dist=__webpack_require__("./node_modules/@camptocamp/ogc-client/dist/index.js"),parse=__webpack_require__("./node_modules/date-fns/parse.js"),parseISO=__webpack_require__("./node_modules/date-fns/parseISO.js");function _inferDatasetType(){return(_inferDatasetType=(0,asyncToGenerator.A)((function*(url,typeHint){const fileExtensionMatches=new URL(url,"undefined"!=typeof window?window.location.toString():void 0).pathname.match(/\.(.+)$/),fileExtension=fileExtensionMatches&&fileExtensionMatches.length?fileExtensionMatches[1].toLowerCase():null;if(typeHint)return Promise.resolve(typeHint);const headers=yield function fetchHeaders(url){return(0,dist.cB)(url,"HEAD").catch((error=>{throw model_FetchError.corsOrNetwork(error.message)})).then((response=>{if(!response.ok)throw model_FetchError.http(response.status);return function headers_parseHeaders(httpHeaders){const result={};if(httpHeaders.has("Content-Type")){result.mimeType=httpHeaders.get("Content-Type").split(";")[0];const supported=SupportedTypes.filter((type=>"wfs"!==type)).filter((type=>AllMimeTypes[type].indexOf(result.mimeType)>-1))[0]||null;null!==supported&&(result.supportedType=supported)}if(httpHeaders.has("Content-Length")&&(result.fileSizeBytes=parseInt(httpHeaders.get("Content-Length"))),httpHeaders.has("Last-Modified")){const date=new Date(httpHeaders.get("Last-Modified"));Number.isNaN(date.valueOf())?result.lastUpdateInvalid=!0:result.lastUpdate=date}return result}(response.headers)}))}(url);if("supportedType"in headers)return headers.supportedType;if(SupportedTypes.indexOf(fileExtension)>-1)return fileExtension;throw"mimeType"in headers?model_FetchError.unsupportedType(headers.mimeType):model_FetchError.unknownType()}))).apply(this,arguments)}function fetchDataAsText(url,cacheActive){const fetchFactory=()=>(0,dist.cB)(url).catch((error=>{throw model_FetchError.corsOrNetwork(error.message)})).then(function(){var _ref=(0,asyncToGenerator.A)((function*(response){if(!response.ok)throw model_FetchError.http(response.status,yield response.text());return response.text()}));return function(_x3){return _ref.apply(this,arguments)}}());return cacheActive?(0,dist.E6)(fetchFactory,url,"asText"):fetchFactory()}function tryParseDate(input){if("string"!=typeof input)return null;function tryFormat(value,format){const parsed=(0,parse.qg)(value,format,new Date);return isNaN(parsed.getDate())?null:parsed}return function tryIso(value){const parsed=(0,parseISO.H)(value);return isNaN(parsed.getDate())?null:parsed}(input)||tryFormat(input,"dd/MM/yyyy")||tryFormat(input,"dd.MM.yyyy")||tryFormat(input,"MM/dd/yyyy")||null}function tryParseNumber(input){if(isNaN(input))return null;const parsed=parseFloat(input);return isNaN(parsed)?null:parsed}function jsonToGeojsonFeature(object){const{id,properties}=Object.keys(object).map((property=>property||"unknown")).reduce(((prev,curr)=>curr.toLowerCase().endsWith("id")?{...prev,id:object[curr]}:{...prev,properties:{...prev.properties,[curr]:object[curr]}}),{id:void 0,properties:{}});return{type:"Feature",geometry:null,properties,...void 0!==id&&{id}}}const SAMPLE_SIZE=20;function processItemProperties(items,inferTypes=!1){const foundFields={};for(let i=0,ii=Math.min(SAMPLE_SIZE,items.length);i<ii;i++){const item=items[i],fields=Object.keys(item.properties);for(const field of fields){field in foundFields||(foundFields[field]={label:field,name:field,type:null});const value=item.properties[field],info=foundFields[field];if(void 0===value||""===value||null===value)continue;if(!inferTypes){null===info.type&&"number"==typeof value?info.type="number":"number"===info.type&&"number"!=typeof value&&(info.type="string");continue}const parsedNumber=tryParseNumber(value);if(null===info.type&&null!==parsedNumber){info.type="number";continue}if("number"===info.type&&null===parsedNumber){info.type="string";continue}const parsedDate=tryParseDate(value);null===info.type&&null!==parsedDate?info.type="date":"date"===info.type&&null===parsedDate&&(info.type="string")}}const properties=[],mutators={};for(const field in foundFields){const info=foundFields[field];"number"===info.type?mutators[field]=tryParseNumber:"date"===info.type&&(mutators[field]=tryParseDate),properties.push({...info,type:info.type||"string"})}return inferTypes&&function mutateProperties(items,mutators){const mutatorKeys=Object.keys(mutators);for(let i=0,ii=items.length;i<ii;i++){const item=items[i];for(const mutatorField of mutatorKeys)mutatorField in item.properties&&(item.properties[mutatorField]=mutators[mutatorField](item.properties[mutatorField]))}return items}(items,mutators),{items,properties}}function getJsonDataItemsProxy(items){return new Proxy(items,{get:(target,p)=>"string"==typeof p&&!Number.isNaN(parseInt(p))&&target[p]?.properties?target[p].properties:target[p],set(){throw new Error("This object is read-only")}})}function filterToSql(filter){const operator=filter[0],args=filter.slice(1);function valueToSql(value){return"number"==typeof value?value:`'${value}'`}switch(operator){case"<":case"<=":case">":case">=":case"=":case"!=":case"like":return`[${args[0]}] ${operator.toUpperCase()} ${valueToSql(args[1])}`;case"in":{const values=args.slice(1);return`[${args[0]}] IN (${values.map(valueToSql).join(", ")})`}case"and":case"or":return`(${args.map(filterToSql).join(` ${operator.toUpperCase()} `)})`;case"not":return`NOT (${filterToSql(args[0])})`}throw new Error(`Could not generate SQL query, operator not recognized: ${operator}`)}function aggregationToSql(aggregation){const operation=aggregation[0],field=aggregation[1];switch(operation){case"average":return`AVG([${field}]) as [average(${field})]`;case"sum":case"max":case"min":return`${operation.toUpperCase()}([${field}]) as [${operation}(${field})]`;case"count":return"COUNT(*) as [count()]"}}function generateSqlQuery(selected=null,filter=null,sort=null,startIndex=null,count=null,groupBy=null,aggregations=null){let sqlSelect="SELECT *";let sqlOrderBy="",sqlWhere="",sqlLimit="",sqlGroupBy="";if(null!==selected&&(sqlSelect=`SELECT ${selected.map((name=>`[${name}]`)).join(", ")}`),null!==filter&&(sqlWhere=` WHERE ${filterToSql(filter)}`),sort?.length&&(sqlOrderBy=` ORDER BY ${sort.map((sort=>`[${sort[1]}] ${sort[0].toUpperCase()}`)).join(", ")}`),null!==startIndex&&null!==count&&(sqlLimit=` LIMIT ${count} OFFSET ${startIndex}`),null!==groupBy&&null!==aggregations){sqlSelect=`SELECT ${aggregations.map(aggregationToSql).join(", ")}`;const groupedByDistinct=groupBy.filter((group=>"distinct"===group[0])),sqlGroupByFields=groupedByDistinct.map((group=>`[${group[1]}]`)).join(", "),sqlGroupBySelect=groupedByDistinct.map((group=>`[${group[1]}] as [distinct(${group[1]})]`)).join(", ");sqlGroupByFields&&sqlGroupBySelect&&(sqlGroupBy=` GROUP BY ${sqlGroupByFields}`,sqlSelect+=`, ${sqlGroupBySelect}`)}return sqlSelect+" FROM ?"+sqlGroupBy+sqlOrderBy+sqlWhere+sqlLimit}class BaseReader{constructor(url){this.url=url,this.selected=null,this.groupedBy=null,this.aggregations=null,this.filter=null,this.sort=null,this.startIndex=null,this.count=null}load(){throw new Error("not implemented")}get properties(){throw new Error("not implemented")}get info(){throw new Error("not implemented")}read(){throw new Error("not implemented")}selectAll(){return this.groupedBy=null,this.aggregations=null,this.selected=null,this.filter=null,this.startIndex=null,this.count=null,this}select(...selectedFields){return this.selected=selectedFields,this.aggregations=null,this.groupedBy=null,this}groupBy(...groupBy){return this.groupedBy=groupBy,this.selected=null,this}aggregate(...aggregations){return this.aggregations=aggregations,this}where(filter){return this.filter=filter,this}orderBy(...fieldSorts){return this.sort=fieldSorts,this}limit(startIndex,count){return this.startIndex=startIndex,this.count=count,this}}class BaseCacheReader extends BaseReader{constructor(url,cacheActive=!0){super(url),this.url=url,this.cacheActive=cacheActive}setCacheActive(value){this.cacheActive=value}}class BaseFileReader extends BaseCacheReader{getData(){throw new Error("not implemented")}load(){this.parseResult_=this.getData()}get properties(){return this.parseResult_.then((result=>result.properties))}get info(){return this.parseResult_.then((result=>({itemsCount:result.items.length})))}read(){var _this=this;return(0,asyncToGenerator.A)((function*(){const items=(yield _this.parseResult_).items;if(null==_this.groupedBy&&null==_this.aggregations&&null==_this.selected&&null==_this.sort&&null==_this.filter&&null==_this.startIndex&&null==_this.count)return items;const jsonItems=getJsonDataItemsProxy(items),query=generateSqlQuery(_this.selected,_this.filter,_this.sort,_this.startIndex,_this.count,_this.groupedBy,_this.aggregations);return(yield __webpack_require__.e(2603).then(__webpack_require__.t.bind(__webpack_require__,"./node_modules/alasql/dist/alasql.min.js",23)).then((module=>module.default(query,[jsonItems])))).map(jsonToGeojsonFeature)}))()}}function parseCsv(text){let delimiter;try{const header=text.split("\n")[0];delimiter=papaparse_min.parse(header,{header:!1}).meta.delimiter}catch(e){throw new Error("CSV parsing failed: the delimiter could not be guessed")}const parsed=papaparse_min.parse(text,{header:!0,skipEmptyLines:!0,delimiter});if(parsed.errors.length)throw new Error("CSV parsing failed for the following reasons:\n"+parsed.errors.map((error=>`* ${error.message} at row ${error.row}, column ${error.index}`)).join("\n"));return processItemProperties(parsed.data.map(jsonToGeojsonFeature),!0)}class CsvReader extends BaseFileReader{getData(){return fetchDataAsText(this.url,this.cacheActive).then(parseCsv)}}function parseJson(text){const parsed=JSON.parse(text);if(!Array.isArray(parsed))throw new Error("Could not parse JSON, expected an array at root level");return processItemProperties(parsed.map(jsonToGeojsonFeature))}class JsonReader extends BaseFileReader{getData(){return fetchDataAsText(this.url,this.cacheActive).then(parseJson)}}function parseGeojson(text){const parsed=JSON.parse(text),features="FeatureCollection"===parsed.type?parsed.features:parsed;if(!Array.isArray(features))throw new Error("Could not parse GeoJSON, expected a features collection or an array of features at root level");return processItemProperties(features)}class GeojsonReader extends BaseFileReader{getData(){return fetchDataAsText(this.url,this.cacheActive).then(parseGeojson)}}function parseExcel(buffer){return __webpack_require__.e(1151).then(__webpack_require__.bind(__webpack_require__,"./node_modules/xlsx/xlsx.mjs")).then((({read,utils})=>{const workbook=read(buffer),sheet=workbook.Sheets[workbook.SheetNames[0]];let json=utils.sheet_to_json(sheet);return json.length||(json=[]),processItemProperties(json.map(jsonToGeojsonFeature),!0)}))}class ExcelReader extends BaseFileReader{getData(){return function fetchDataAsArrayBuffer(url,cacheActive){const fetchFactory=()=>(0,dist.cB)(url).catch((error=>{throw model_FetchError.corsOrNetwork(error.message)})).then(function(){var _ref2=(0,asyncToGenerator.A)((function*(response){if(!response.ok)throw model_FetchError.http(response.status,yield response.text());return Array.from(new Uint8Array(yield response.arrayBuffer()))}));return function(_x4){return _ref2.apply(this,arguments)}}());return(cacheActive?(0,dist.E6)(fetchFactory,url,"asArrayBuffer"):fetchFactory()).then((array=>new Uint8Array(array).buffer))}(this.url,this.cacheActive).then(parseExcel)}}var WFS=__webpack_require__("./node_modules/ol/format/WFS.js"),GeoJSON=__webpack_require__("./node_modules/ol/format/GeoJSON.js");function parseGml(text,namespace,version){const splittedNamespace=namespace.split(":"),match=new RegExp(`xmlns:${splittedNamespace[0]}=["']([^'"]*)["']`).exec(text);if(match&&match.length>=2){const wf=new WFS.A({featureNS:match[1],featureType:splittedNamespace[1],version});let features;try{features=wf.readFeatures(text)}catch(e){throw Error("Couldn't parse WFS with GML features")}return processItemProperties((new GeoJSON.A).writeFeaturesObject(features).features,!0)}throw Error("Couldn't retrieve namespace url")}class GmlReader extends BaseFileReader{constructor(url,namespace,version,cacheActive=!0){super(url),this.url=url,this.namespace=namespace,this.version=version,this.cacheActive=cacheActive}getData(){return fetchDataAsText(this.url,this.cacheActive).then((text=>parseGml(text,this.namespace,this.version)))}}class WfsReader extends BaseCacheReader{constructor(url,wfsEndpoint,featureTypeName,cacheActive){super(url,cacheActive),this.endpoint=wfsEndpoint,this.featureTypeName=featureTypeName,this.version=this.endpoint.getVersion()}get properties(){return this.endpoint.getFeatureTypeFull(this.featureTypeName).then((featureType=>Object.keys(featureType.properties).map((prop=>{const originalType=featureType.properties[prop];return{name:prop,label:prop,type:"float"===originalType||"integer"===originalType?"number":originalType}}))))}get info(){return this.endpoint.getFeatureTypeFull(this.featureTypeName).then((result=>({itemsCount:result.objectCount})))}static createReader(wfsUrlEndpoint,featureTypeName){return(0,asyncToGenerator.A)((function*(){const wfsEndpoint=yield new dist.ym(wfsUrlEndpoint).isReady(),featureTypes=wfsEndpoint.getFeatureTypes(),featureType=wfsEndpoint.getFeatureTypeSummary(1!==featureTypes.length||featureTypeName?featureTypeName:featureTypes[0].name);if(!featureType)throw new Error("wfs.featuretype.notfound");if(wfsEndpoint.supportsStartIndex())return new WfsReader(wfsUrlEndpoint,wfsEndpoint,featureType.name);if(wfsEndpoint.supportsJson(featureType.name))return new GeojsonReader(wfsEndpoint.getFeatureUrl(featureType.name,{asJson:!0,outputCrs:"EPSG:4326"}));if(featureType.outputFormats.find((f=>f.toLowerCase().includes("gml")))&&("EPSG:4326"===featureType.defaultCrs||featureType.otherCrs?.includes("EPSG:4326")))return new GmlReader(wfsEndpoint.getFeatureUrl(featureType.name,{outputFormat:featureType.outputFormats.find((f=>f.toLowerCase().includes("gml"))),outputCrs:"EPSG:4326"}),featureType.name,wfsEndpoint.getVersion());throw new Error("wfs.geojsongml.notsupported")}))()}getData(aggregation,groupedBy){var _this=this;return(0,asyncToGenerator.A)((function*(){if(aggregation||groupedBy)return{items:yield _this.getQueryData()};const asJson=_this.endpoint.supportsJson(_this.featureTypeName),attributes=_this.selected??void 0;let url=_this.endpoint.getFeatureUrl(_this.featureTypeName,{...null!==_this.startIndex&&{startIndex:_this.startIndex},...null!==_this.count&&{maxFeatures:_this.count},asJson,outputCrs:"EPSG:4326",attributes});if(Array.isArray(_this.sort)&&_this.sort.length>0){const finalUrl=new URL(url),sorts=_this.sort.map((fieldSort=>`${fieldSort[1]}+${"asc"===fieldSort[0]?"A":"D"}`)).join(",");url=`${url}${finalUrl.search?"&":""}SORTBY=${sorts}`}return fetchDataAsText(url,_this.cacheActive).then((text=>asJson?parseGeojson(text):parseGml(text,_this.featureTypeName,_this.version)))}))()}getQueryData(){var _this2=this;return(0,asyncToGenerator.A)((function*(){const jsonItems=getJsonDataItemsProxy((yield _this2.getData()).items),query=generateSqlQuery(_this2.selected,_this2.filter,_this2.sort,_this2.startIndex,_this2.count,_this2.groupedBy,_this2.aggregations);return(yield __webpack_require__.e(2603).then(__webpack_require__.t.bind(__webpack_require__,"./node_modules/alasql/dist/alasql.min.js",23)).then((module=>module.default(query,[jsonItems])))).map(jsonToGeojsonFeature)}))()}load(){}read(){var _this3=this;return(0,asyncToGenerator.A)((function*(){return(yield _this3.getData(_this3.aggregations,_this3.groupedBy)).items}))()}}function openDataset(_x,_x2,_x3,_x4){return _openDataset.apply(this,arguments)}function _openDataset(){return _openDataset=(0,asyncToGenerator.A)((function*(url,typeHint,options,cacheActive){const fileType=yield function inferDatasetType(_x,_x2){return _inferDatasetType.apply(this,arguments)}(url,typeHint);let reader;try{switch(fileType){case"csv":reader=new CsvReader(url);break;case"json":reader=new JsonReader(url);break;case"geojson":reader=new GeojsonReader(url);break;case"excel":reader=new ExcelReader(url);break;case"gml":reader=new GmlReader(url,options.namespace,options.wfsVersion);break;case"wfs":reader=yield WfsReader.createReader(url,options.wfsFeatureType)}return reader.setCacheActive(cacheActive),reader.load(),reader}catch(e){throw model_FetchError.parsingFailed(e.message)}})),_openDataset.apply(this,arguments)}},"./libs/ui/dataviz/src/lib/data-table/data-table.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"table {\n  width: 100%;\n  background: white;\n}\nth.mat-mdc-header-cell,\ntd.mat-mdc-cell,\ntd.mat-mdc-footer-cell {\n  padding-right: 20px;\n}\ntr.mat-mdc-row,\ntr.mat-mdc-footer-row {\n  height: 36px;\n}\ntr:hover {\n  background: whitesmoke;\n}\ntr.mat-mdc-header-row {\n  height: 48px;\n}\n\n[mat-header-cell] {\n  color: #0000008a;\n  font-size: 12px;\n  font-weight: 500;\n}\ntr {\n  cursor: pointer;\n}\n\n.active .mat-mdc-cell {\n  color: var(--color-primary);\n}\n\n.mat-mdc-paginator {\n  background: none;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/figure/figure.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: inherit;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);