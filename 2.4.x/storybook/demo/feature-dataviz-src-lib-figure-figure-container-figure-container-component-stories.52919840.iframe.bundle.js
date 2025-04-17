(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[4405],{"./libs/feature/dataviz/src/lib/figure/figure-container/figure-container.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>FigureContainerComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var figure_container_componentngResource=__webpack_require__("./libs/feature/dataviz/src/lib/figure/figure-container/figure-container.component.css?ngResource"),figure_container_componentngResource_default=__webpack_require__.n(figure_container_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./libs/ui/dataviz/src/index.ts");let FigureService=class FigureService{constructor(){this.operations={sum:data=>data.reduce(((sum,value)=>sum+value),0),average:data=>this.operations.sum(data)/data.length}}compute(expression,dataset){try{const computing=expression.split("|")[0],column=expression.split("|")[1],data=dataset.map((row=>row[column]));return this.operations[computing](data)}catch(e){return NaN}}};FigureService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],FigureService);let FigureContainerComponent=class FigureContainerComponent{constructor(service){this.service=service,this.digits=2}ngOnChanges(){const figure=this.service.compute(this.expression,this.dataset).toFixed(this.digits);this.figure=parseFloat(figure).toString()}static{this.ctorParameters=()=>[{type:FigureService}]}static{this.propDecorators={dataset:[{type:core.Input}],expression:[{type:core.Input}],icon:[{type:core.Input}],title:[{type:core.Input}],unit:[{type:core.Input}],digits:[{type:core.Input}]}}};FigureContainerComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-figure-container",template:'<gn-ui-figure\n  [figure]="figure"\n  [icon]="icon"\n  [title]="title"\n  [unit]="unit"\n></gn-ui-figure>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,imports:[src.A5],styles:[figure_container_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[FigureService])],FigureContainerComponent)},"./libs/ui/dataviz/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A5:()=>_lib_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_0__.A,Qe:()=>_lib_chart_chart_component__WEBPACK_IMPORTED_MODULE_1__.Q,up:()=>_lib_data_table_data_table_component__WEBPACK_IMPORTED_MODULE_2__.u});var _lib_ui_dataviz_module__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/ui/dataviz/src/lib/ui-dataviz.module.ts"),_lib_chart_chart_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.ts"),_lib_data_table_data_table_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.component.ts");__webpack_require__("./libs/ui/dataviz/src/lib/data-table/data-table.fixtures.ts"),__webpack_require__("./libs/ui/dataviz/src/lib/figure/figure.component.ts")},"./libs/ui/dataviz/src/lib/chart/chart.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ChartComponent});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var chart_componentngResource=__webpack_require__("./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource"),chart_componentngResource_default=__webpack_require__.n(chart_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),chart=__webpack_require__("./node_modules/chart.js/dist/chart.js");chart.t1.register(chart.A6,chart.E8,chart.PP,chart.kc,chart.ZT,chart.No,chart.FN,chart.P$,chart.Bs,chart.Pz,chart.m_,chart.Jy,chart.s$);let ChartComponent=class ChartComponent{constructor(){this.type="bar",this.dataRaw=[],this.ready=new Promise((resolve=>this.setReady=resolve))}set data(value){this.dataRaw=value}ngAfterViewInit(){this.setReady()}ngOnChanges(){this.refreshChart()}createChart(){return new chart.t1(this.canvasRef.nativeElement,{type:this.getChartType(),data:this.getChartData(),options:this.getOptions()})}getChartData(){const data=this.handlesSecondaryValue()?this.getDataProxy(this.valueProperty,this.secondaryValueProperty):this.getDataProxy(this.valueProperty);return{labels:this.getDataProxy(this.labelProperty),datasets:[{label:this.valueProperty,data}]}}getOptions(){const truncateString=this.truncateString,options={maintainAspectRatio:!1,parsing:{},scales:{x:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}},y:{ticks:{callback:function(value){return truncateString(this.getLabelForValue(Number(value)),30)}}}}};switch(this.type){case"line-interpolated":return{...options,elements:{line:{cubicInterpolationMode:"monotone"}}};case"bar-horizontal":return{...options,indexAxis:"y"};case"pie":return{...options,scales:{},plugins:{legend:{position:"left",align:"start"}}};default:return options}}truncateString(str,truncateLength){return str?str.length<=truncateLength?str:`${str.slice(0,truncateLength)}...`:""}getChartType(){switch(this.type){case"bar":case"bar-horizontal":return"bar";case"line":case"line-interpolated":return"line";case"scatter":case"pie":return this.type}}handlesSecondaryValue(){return this.secondaryValueProperty&&"scatter"===this.type}getDataProxy(property,secondaryProperty){return new Proxy(this.dataRaw,{get:(target,index)=>"string"!=typeof index||Number.isNaN(parseInt(index))||void 0===target[index]?target[index]:secondaryProperty?{y:target[index][property],x:target[index][secondaryProperty]}:target[index][property]})}refreshChart(){var _this=this;return(0,asyncToGenerator.A)((function*(){_this.chart&&(_this.chart.destroy(),_this.chart=null),yield _this.ready,_this.chart=_this.createChart()}))()}static{this.propDecorators={data:[{type:core.Input}],labelProperty:[{type:core.Input}],valueProperty:[{type:core.Input}],secondaryValueProperty:[{type:core.Input}],type:[{type:core.Input}],canvasRef:[{type:core.ViewChild,args:["chartCanvas"]}]}}};ChartComponent=(0,tslib_es6.Cg)([(0,core.Component)({standalone:!0,selector:"gn-ui-chart",template:'<div class="h-full flex justify-center items-center p-1">\n  <canvas #chartCanvas></canvas>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[chart_componentngResource_default()]})],ChartComponent)},"./libs/feature/dataviz/src/lib/figure/figure-container/figure-container.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Average:()=>Average,Sum:()=>Sum,__namedExportsOrder:()=>__namedExportsOrder,default:()=>figure_container_component_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),figure_container_component=__webpack_require__("./libs/feature/dataviz/src/lib/figure/figure-container/figure-container.component.ts"),src=__webpack_require__("./libs/ui/dataviz/src/index.ts"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),i18n_src=__webpack_require__("./libs/util/i18n/src/index.ts"),ngx_translate_core=__webpack_require__("./node_modules/@ngx-translate/core/dist/fesm2022/ngx-translate-core.mjs");const figure_container_component_stories={title:"Dataviz/FigureContainerComponent",component:figure_container_component.D,decorators:[(0,dist.moduleMetadata)({imports:[src.A5]}),(0,dist.applicationConfig)({providers:[(0,core.importProvidersFrom)(animations.BrowserAnimationsModule),(0,core.importProvidersFrom)(ngx_translate_core.h.forRoot(i18n_src.sU))]}),(0,dist.componentWrapperDecorator)((story=>`\n<div class="border border-gray-300 p-4" style="width: 400px">\n  ${story}\n</div>`))]},Sum={args:{title:"Sum of inhabitants",icon:"maps_home_work",unit:"hab.",expression:"sum|pop",dataset:[{name:"France",id:"1",pop:505e5},{name:"Italy",id:"2",pop:155878789655},{name:"UK",id:"3",pop:31522456},{name:"US",id:"4",pop:3215448888}]}},Average={args:{title:"Average age of the population",icon:"group",unit:"years old",expression:"average|age",digits:3,dataset:[{name:"name 1",id:"id 1",age:15},{name:"name 2",id:"id 2",age:10},{name:"name 3",id:"id 3",age:55}]}},__namedExportsOrder=["Sum","Average"];Sum.parameters={...Sum.parameters,docs:{...Sum.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Sum of inhabitants',\n    icon: 'maps_home_work',\n    unit: 'hab.',\n    expression: 'sum|pop',\n    dataset: someHabFigureItemFixture()\n  }\n}",...Sum.parameters?.docs?.source}}},Average.parameters={...Average.parameters,docs:{...Average.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Average age of the population',\n    icon: 'group',\n    unit: 'years old',\n    expression: 'average|age',\n    digits: 3,\n    dataset: someFigureItemFixture()\n  }\n}",...Average.parameters?.docs?.source}}}},"./libs/feature/dataviz/src/lib/figure/figure-container/figure-container.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/ui/dataviz/src/lib/chart/chart.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);