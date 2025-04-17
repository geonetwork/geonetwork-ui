"use strict";(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[5277],{"./node_modules/ol/Disposable.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class Disposable{constructor(){this.disposed=!1}dispose(){this.disposed||(this.disposed=!0,this.disposeInternal())}disposeInternal(){}}},"./node_modules/ol/Feature.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _Object_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/Object.js"),_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ol/events/EventType.js"),_asserts_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/ol/asserts.js"),_events_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ol/events.js");class Feature extends _Object_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(geometryOrProperties){if(super(),this.on,this.once,this.un,this.id_=void 0,this.geometryName_="geometry",this.style_=null,this.styleFunction_=void 0,this.geometryChangeKey_=null,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),geometryOrProperties)if("function"==typeof geometryOrProperties.getSimplifiedGeometry){const geometry=geometryOrProperties;this.setGeometry(geometry)}else{const properties=geometryOrProperties;this.setProperties(properties)}}clone(){const clone=new Feature(this.hasProperties()?this.getProperties():null);clone.setGeometryName(this.getGeometryName());const geometry=this.getGeometry();geometry&&clone.setGeometry(geometry.clone());const style=this.getStyle();return style&&clone.setStyle(style),clone}getGeometry(){return this.get(this.geometryName_)}getId(){return this.id_}getGeometryName(){return this.geometryName_}getStyle(){return this.style_}getStyleFunction(){return this.styleFunction_}handleGeometryChange_(){this.changed()}handleGeometryChanged_(){this.geometryChangeKey_&&((0,_events_js__WEBPACK_IMPORTED_MODULE_1__.bN)(this.geometryChangeKey_),this.geometryChangeKey_=null);const geometry=this.getGeometry();geometry&&(this.geometryChangeKey_=(0,_events_js__WEBPACK_IMPORTED_MODULE_1__.oL)(geometry,_events_EventType_js__WEBPACK_IMPORTED_MODULE_2__.Z.CHANGE,this.handleGeometryChange_,this)),this.changed()}setGeometry(geometry){this.set(this.geometryName_,geometry)}setStyle(style){this.style_=style,this.styleFunction_=style?function createStyleFunction(obj){if("function"==typeof obj)return obj;let styles;if(Array.isArray(obj))styles=obj;else{(0,_asserts_js__WEBPACK_IMPORTED_MODULE_3__.h)("function"==typeof obj.getZIndex,"Expected an `ol/style/Style` or an array of `ol/style/Style.js`");styles=[obj]}return function(){return styles}}(style):void 0,this.changed()}setId(id){this.id_=id,this.changed()}setGeometryName(name){this.removeChangeListener(this.geometryName_,this.handleGeometryChanged_),this.geometryName_=name,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),this.handleGeometryChanged_()}}const __WEBPACK_DEFAULT_EXPORT__=Feature},"./node_modules/ol/Object.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/events/Event.js"),_ObjectEventType_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/ol/ObjectEventType.js"),_Observable_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ol/Observable.js"),_util_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ol/util.js"),_obj_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/ol/obj.js");class ObjectEvent extends _events_Event_js__WEBPACK_IMPORTED_MODULE_0__.ZP{constructor(type,key,oldValue){super(type),this.key=key,this.oldValue=oldValue}}class BaseObject extends _Observable_js__WEBPACK_IMPORTED_MODULE_1__.Z{constructor(values){super(),this.on,this.once,this.un,(0,_util_js__WEBPACK_IMPORTED_MODULE_2__.sq)(this),this.values_=null,void 0!==values&&this.setProperties(values)}get(key){let value;return this.values_&&this.values_.hasOwnProperty(key)&&(value=this.values_[key]),value}getKeys(){return this.values_&&Object.keys(this.values_)||[]}getProperties(){return this.values_&&Object.assign({},this.values_)||{}}getPropertiesInternal(){return this.values_}hasProperties(){return!!this.values_}notify(key,oldValue){let eventType;eventType=`change:${key}`,this.hasListener(eventType)&&this.dispatchEvent(new ObjectEvent(eventType,key,oldValue)),eventType=_ObjectEventType_js__WEBPACK_IMPORTED_MODULE_3__.Z.PROPERTYCHANGE,this.hasListener(eventType)&&this.dispatchEvent(new ObjectEvent(eventType,key,oldValue))}addChangeListener(key,listener){this.addEventListener(`change:${key}`,listener)}removeChangeListener(key,listener){this.removeEventListener(`change:${key}`,listener)}set(key,value,silent){const values=this.values_||(this.values_={});if(silent)values[key]=value;else{const oldValue=values[key];values[key]=value,oldValue!==value&&this.notify(key,oldValue)}}setProperties(values,silent){for(const key in values)this.set(key,values[key],silent)}applyProperties(source){source.values_&&Object.assign(this.values_||(this.values_={}),source.values_)}unset(key,silent){if(this.values_&&key in this.values_){const oldValue=this.values_[key];delete this.values_[key],(0,_obj_js__WEBPACK_IMPORTED_MODULE_4__.x)(this.values_)&&(this.values_=null),silent||this.notify(key,oldValue)}}}const __WEBPACK_DEFAULT_EXPORT__=BaseObject},"./node_modules/ol/ObjectEventType.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={PROPERTYCHANGE:"propertychange"}},"./node_modules/ol/Observable.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _events_Target_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/events/Target.js"),_events_EventType_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ol/events/EventType.js"),_events_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ol/events.js");class Observable extends _events_Target_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(){super(),this.on=this.onInternal,this.once=this.onceInternal,this.un=this.unInternal,this.revision_=0}changed(){++this.revision_,this.dispatchEvent(_events_EventType_js__WEBPACK_IMPORTED_MODULE_1__.Z.CHANGE)}getRevision(){return this.revision_}onInternal(type,listener){if(Array.isArray(type)){const len=type.length,keys=new Array(len);for(let i=0;i<len;++i)keys[i]=(0,_events_js__WEBPACK_IMPORTED_MODULE_2__.oL)(this,type[i],listener);return keys}return(0,_events_js__WEBPACK_IMPORTED_MODULE_2__.oL)(this,type,listener)}onceInternal(type,listener){let key;if(Array.isArray(type)){const len=type.length;key=new Array(len);for(let i=0;i<len;++i)key[i]=(0,_events_js__WEBPACK_IMPORTED_MODULE_2__.Vx)(this,type[i],listener)}else key=(0,_events_js__WEBPACK_IMPORTED_MODULE_2__.Vx)(this,type,listener);return listener.ol_key=key,key}unInternal(type,listener){const key=listener.ol_key;if(key)!function unByKey(key){if(Array.isArray(key))for(let i=0,ii=key.length;i<ii;++i)(0,_events_js__WEBPACK_IMPORTED_MODULE_2__.bN)(key[i]);else(0,_events_js__WEBPACK_IMPORTED_MODULE_2__.bN)(key)}(key);else if(Array.isArray(type))for(let i=0,ii=type.length;i<ii;++i)this.removeEventListener(type[i],listener);else this.removeEventListener(type,listener)}}Observable.prototype.on,Observable.prototype.once,Observable.prototype.un;const __WEBPACK_DEFAULT_EXPORT__=Observable},"./node_modules/ol/events.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Vx:()=>listenOnce,bN:()=>unlistenByKey,oL:()=>listen});var _obj_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/obj.js");function listen(target,type,listener,thisArg,once){if(thisArg&&thisArg!==target&&(listener=listener.bind(thisArg)),once){const originalListener=listener;listener=function(){target.removeEventListener(type,listener),originalListener.apply(this,arguments)}}const eventsKey={target,type,listener};return target.addEventListener(type,listener),eventsKey}function listenOnce(target,type,listener,thisArg){return listen(target,type,listener,thisArg,!0)}function unlistenByKey(key){key&&key.target&&(key.target.removeEventListener(key.type,key.listener),(0,_obj_js__WEBPACK_IMPORTED_MODULE_0__.Z)(key))}},"./node_modules/ol/events/Event.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=class BaseEvent{constructor(type){this.propagationStopped,this.defaultPrevented,this.type=type,this.target=null}preventDefault(){this.defaultPrevented=!0}stopPropagation(){this.propagationStopped=!0}}},"./node_modules/ol/events/EventType.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={CHANGE:"change",ERROR:"error",BLUR:"blur",CLEAR:"clear",CONTEXTMENU:"contextmenu",CLICK:"click",DBLCLICK:"dblclick",DRAGENTER:"dragenter",DRAGOVER:"dragover",DROP:"drop",FOCUS:"focus",KEYDOWN:"keydown",KEYPRESS:"keypress",LOAD:"load",RESIZE:"resize",TOUCHMOVE:"touchmove",WHEEL:"wheel"}},"./node_modules/ol/events/Target.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _Disposable_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/Disposable.js"),_Event_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ol/events/Event.js"),_functions_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ol/functions.js"),_obj_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/ol/obj.js");class Target extends _Disposable_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(target){super(),this.eventTarget_=target,this.pendingRemovals_=null,this.dispatching_=null,this.listeners_=null}addEventListener(type,listener){if(!type||!listener)return;const listeners=this.listeners_||(this.listeners_={}),listenersForType=listeners[type]||(listeners[type]=[]);listenersForType.includes(listener)||listenersForType.push(listener)}dispatchEvent(event){const isString="string"==typeof event,type=isString?event:event.type,listeners=this.listeners_&&this.listeners_[type];if(!listeners)return;const evt=isString?new _Event_js__WEBPACK_IMPORTED_MODULE_1__.ZP(event):event;evt.target||(evt.target=this.eventTarget_||this);const dispatching=this.dispatching_||(this.dispatching_={}),pendingRemovals=this.pendingRemovals_||(this.pendingRemovals_={});let propagate;type in dispatching||(dispatching[type]=0,pendingRemovals[type]=0),++dispatching[type];for(let i=0,ii=listeners.length;i<ii;++i)if(propagate="handleEvent"in listeners[i]?listeners[i].handleEvent(evt):listeners[i].call(this,evt),!1===propagate||evt.propagationStopped){propagate=!1;break}if(0==--dispatching[type]){let pr=pendingRemovals[type];for(delete pendingRemovals[type];pr--;)this.removeEventListener(type,_functions_js__WEBPACK_IMPORTED_MODULE_2__.Zn);delete dispatching[type]}return propagate}disposeInternal(){this.listeners_&&(0,_obj_js__WEBPACK_IMPORTED_MODULE_3__.Z)(this.listeners_)}getListeners(type){return this.listeners_&&this.listeners_[type]||void 0}hasListener(type){return!!this.listeners_&&(type?type in this.listeners_:Object.keys(this.listeners_).length>0)}removeEventListener(type,listener){if(!this.listeners_)return;const listeners=this.listeners_[type];if(!listeners)return;const index=listeners.indexOf(listener);-1!==index&&(this.pendingRemovals_&&type in this.pendingRemovals_?(listeners[index]=_functions_js__WEBPACK_IMPORTED_MODULE_2__.Zn,++this.pendingRemovals_[type]):(listeners.splice(index,1),0===listeners.length&&delete this.listeners_[type]))}}const __WEBPACK_DEFAULT_EXPORT__=Target},"./node_modules/ol/functions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Dv:()=>FALSE,Vi:()=>toPromise,Zn:()=>VOID,qe:()=>memoizeOne,uX:()=>TRUE});var _array_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/array.js");function TRUE(){return!0}function FALSE(){return!1}function VOID(){}function memoizeOne(fn){let lastResult,lastArgs,lastThis,called=!1;return function(){const nextArgs=Array.prototype.slice.call(arguments);return called&&this===lastThis&&(0,_array_js__WEBPACK_IMPORTED_MODULE_0__.fS)(nextArgs,lastArgs)||(called=!0,lastThis=this,lastArgs=nextArgs,lastResult=fn.apply(this,arguments)),lastResult}}function toPromise(getter){return function promiseGetter(){let value;try{value=getter()}catch(err){return Promise.reject(err)}return value instanceof Promise?value:Promise.resolve(value)}()}},"./node_modules/ol/geom/Geometry.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _Object_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ol/Object.js"),_util_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/ol/util.js"),_transform_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ol/transform.js"),_extent_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/ol/extent.js"),_proj_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/proj.js"),_functions_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/ol/functions.js"),_flat_transform_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/ol/geom/flat/transform.js");const tmpTransform=(0,_transform_js__WEBPACK_IMPORTED_MODULE_1__.Ue)();class Geometry extends _Object_js__WEBPACK_IMPORTED_MODULE_2__.Z{constructor(){super(),this.extent_=(0,_extent_js__WEBPACK_IMPORTED_MODULE_3__.lJ)(),this.extentRevision_=-1,this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=0,this.simplifyTransformedInternal=(0,_functions_js__WEBPACK_IMPORTED_MODULE_4__.qe)(((revision,squaredTolerance,transform)=>{if(!transform)return this.getSimplifiedGeometry(squaredTolerance);const clone=this.clone();return clone.applyTransform(transform),clone.getSimplifiedGeometry(squaredTolerance)}))}simplifyTransformed(squaredTolerance,transform){return this.simplifyTransformedInternal(this.getRevision(),squaredTolerance,transform)}clone(){return(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}closestPointXY(x,y,closestPoint,minSquaredDistance){return(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}containsXY(x,y){const coord=this.getClosestPoint([x,y]);return coord[0]===x&&coord[1]===y}getClosestPoint(point,closestPoint){return closestPoint=closestPoint||[NaN,NaN],this.closestPointXY(point[0],point[1],closestPoint,1/0),closestPoint}intersectsCoordinate(coordinate){return this.containsXY(coordinate[0],coordinate[1])}computeExtent(extent){return(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}getExtent(extent){if(this.extentRevision_!=this.getRevision()){const extent=this.computeExtent(this.extent_);(isNaN(extent[0])||isNaN(extent[1]))&&(0,_extent_js__WEBPACK_IMPORTED_MODULE_3__.YN)(extent),this.extentRevision_=this.getRevision()}return(0,_extent_js__WEBPACK_IMPORTED_MODULE_3__.EO)(this.extent_,extent)}rotate(angle,anchor){(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}scale(sx,sy,anchor){(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}simplify(tolerance){return this.getSimplifiedGeometry(tolerance*tolerance)}getSimplifiedGeometry(squaredTolerance){return(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}getType(){return(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}applyTransform(transformFn){(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}intersectsExtent(extent){return(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}translate(deltaX,deltaY){(0,_util_js__WEBPACK_IMPORTED_MODULE_5__.O3)()}transform(source,destination){const sourceProj=(0,_proj_js__WEBPACK_IMPORTED_MODULE_0__.U2)(source),transformFn="tile-pixels"==sourceProj.getUnits()?function(inCoordinates,outCoordinates,stride){const pixelExtent=sourceProj.getExtent(),projectedExtent=sourceProj.getWorldExtent(),scale=(0,_extent_js__WEBPACK_IMPORTED_MODULE_3__.Cr)(projectedExtent)/(0,_extent_js__WEBPACK_IMPORTED_MODULE_3__.Cr)(pixelExtent);return(0,_transform_js__WEBPACK_IMPORTED_MODULE_1__.qC)(tmpTransform,projectedExtent[0],projectedExtent[3],scale,-scale,0,0,0),(0,_flat_transform_js__WEBPACK_IMPORTED_MODULE_6__.vT)(inCoordinates,0,inCoordinates.length,stride,tmpTransform,outCoordinates),(0,_proj_js__WEBPACK_IMPORTED_MODULE_0__.Ck)(sourceProj,destination)(inCoordinates,outCoordinates,stride)}:(0,_proj_js__WEBPACK_IMPORTED_MODULE_0__.Ck)(sourceProj,destination);return this.applyTransform(transformFn),this}}const __WEBPACK_DEFAULT_EXPORT__=Geometry},"./node_modules/ol/geom/flat/transform.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function transform2D(flatCoordinates,offset,end,stride,transform,dest){dest=dest||[];let i=0;for(let j=offset;j<end;j+=stride){const x=flatCoordinates[j],y=flatCoordinates[j+1];dest[i++]=transform[0]*x+transform[2]*y+transform[4],dest[i++]=transform[1]*x+transform[3]*y+transform[5]}return dest&&dest.length!=i&&(dest.length=i),dest}function rotate(flatCoordinates,offset,end,stride,angle,anchor,dest){dest=dest||[];const cos=Math.cos(angle),sin=Math.sin(angle),anchorX=anchor[0],anchorY=anchor[1];let i=0;for(let j=offset;j<end;j+=stride){const deltaX=flatCoordinates[j]-anchorX,deltaY=flatCoordinates[j+1]-anchorY;dest[i++]=anchorX+deltaX*cos-deltaY*sin,dest[i++]=anchorY+deltaX*sin+deltaY*cos;for(let k=j+2;k<j+stride;++k)dest[i++]=flatCoordinates[k]}return dest&&dest.length!=i&&(dest.length=i),dest}function scale(flatCoordinates,offset,end,stride,sx,sy,anchor,dest){dest=dest||[];const anchorX=anchor[0],anchorY=anchor[1];let i=0;for(let j=offset;j<end;j+=stride){const deltaX=flatCoordinates[j]-anchorX,deltaY=flatCoordinates[j+1]-anchorY;dest[i++]=anchorX+sx*deltaX,dest[i++]=anchorY+sy*deltaY;for(let k=j+2;k<j+stride;++k)dest[i++]=flatCoordinates[k]}return dest&&dest.length!=i&&(dest.length=i),dest}function translate(flatCoordinates,offset,end,stride,deltaX,deltaY,dest){dest=dest||[];let i=0;for(let j=offset;j<end;j+=stride){dest[i++]=flatCoordinates[j]+deltaX,dest[i++]=flatCoordinates[j+1]+deltaY;for(let k=j+2;k<j+stride;++k)dest[i++]=flatCoordinates[k]}return dest&&dest.length!=i&&(dest.length=i),dest}__webpack_require__.d(__webpack_exports__,{Iu:()=>translate,U1:()=>rotate,bA:()=>scale,vT:()=>transform2D})},"./node_modules/ol/has.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G$:()=>WEBKIT,Id:()=>WORKER_OFFSCREEN_CANVAS,MP:()=>DEVICE_PIXEL_RATIO,Tp:()=>IMAGE_DECODE,V:()=>FIREFOX,bM:()=>PASSIVE_EVENT_LISTENERS,et:()=>CREATE_IMAGE_BITMAP,tK:()=>MAC});const ua="undefined"!=typeof navigator&&void 0!==navigator.userAgent?navigator.userAgent.toLowerCase():"",FIREFOX=ua.includes("firefox"),WEBKIT=(ua.includes("safari")&&!ua.includes("chrom")&&(ua.includes("version/15.4")||/cpu (os|iphone os) 15_4 like mac os x/.test(ua)),ua.includes("webkit")&&!ua.includes("edge")),MAC=ua.includes("macintosh"),DEVICE_PIXEL_RATIO="undefined"!=typeof devicePixelRatio?devicePixelRatio:1,WORKER_OFFSCREEN_CANVAS="undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof OffscreenCanvas&&self instanceof WorkerGlobalScope,IMAGE_DECODE="undefined"!=typeof Image&&Image.prototype.decode,CREATE_IMAGE_BITMAP="function"==typeof createImageBitmap,PASSIVE_EVENT_LISTENERS=function(){let passive=!1;try{const options=Object.defineProperty({},"passive",{get:function(){passive=!0}});window.addEventListener("_",null,options),window.removeEventListener("_",null,options)}catch(error){}return passive}()},"./node_modules/ol/obj.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function clear(object){for(const property in object)delete object[property]}function isEmpty(object){let property;for(property in object)return!1;return!property}__webpack_require__.d(__webpack_exports__,{Z:()=>clear,x:()=>isEmpty})},"./node_modules/ol/transform.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BB:()=>toString,Ue:()=>create,lk:()=>setFromArray,n3:()=>makeScale,nb:()=>makeInverse,nn:()=>apply,qC:()=>compose});var _has_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/ol/has.js"),_asserts_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/ol/asserts.js");new Array(6);function create(){return[1,0,0,1,0,0]}function set(transform,a,b,c,d,e,f){return transform[0]=a,transform[1]=b,transform[2]=c,transform[3]=d,transform[4]=e,transform[5]=f,transform}function setFromArray(transform1,transform2){return transform1[0]=transform2[0],transform1[1]=transform2[1],transform1[2]=transform2[2],transform1[3]=transform2[3],transform1[4]=transform2[4],transform1[5]=transform2[5],transform1}function apply(transform,coordinate){const x=coordinate[0],y=coordinate[1];return coordinate[0]=transform[0]*x+transform[2]*y+transform[4],coordinate[1]=transform[1]*x+transform[3]*y+transform[5],coordinate}function makeScale(target,x,y){return set(target,x,0,0,y,0,0)}function compose(transform,dx1,dy1,sx,sy,angle,dx2,dy2){const sin=Math.sin(angle),cos=Math.cos(angle);return transform[0]=sx*cos,transform[1]=sy*sin,transform[2]=-sx*sin,transform[3]=sy*cos,transform[4]=dx2*sx*cos-dy2*sx*sin+dx1,transform[5]=dx2*sy*sin+dy2*sy*cos+dy1,transform}function makeInverse(target,source){const det=function determinant(mat){return mat[0]*mat[3]-mat[1]*mat[2]}(source);(0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__.h)(0!==det,"Transformation matrix cannot be inverted");const a=source[0],b=source[1],c=source[2],d=source[3],e=source[4],f=source[5];return target[0]=d/det,target[1]=-b/det,target[2]=-c/det,target[3]=a/det,target[4]=(c*f-d*e)/det,target[5]=-(a*f-b*e)/det,target}let transformStringDiv;function toString(mat){const transformString="matrix("+mat.join(", ")+")";if(_has_js__WEBPACK_IMPORTED_MODULE_1__.Id)return transformString;const node=transformStringDiv||(transformStringDiv=document.createElement("div"));return node.style.transform=transformString,node.style.transform}},"./node_modules/ol/util.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function abstract(){throw new Error("Unimplemented abstract method.")}__webpack_require__.d(__webpack_exports__,{O3:()=>abstract,sq:()=>getUid});let uidCounter_=0;function getUid(obj){return obj.ol_uid||(obj.ol_uid=String(++uidCounter_))}}}]);