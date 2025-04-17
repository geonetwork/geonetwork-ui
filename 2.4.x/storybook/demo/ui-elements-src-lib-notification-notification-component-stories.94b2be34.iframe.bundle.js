(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[3244],{"./libs/ui/elements/src/lib/notification/notification.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{z:()=>NotificationComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var notification_componentngResource=__webpack_require__("./libs/ui/elements/src/lib/notification/notification.component.css?ngResource"),notification_componentngResource_default=__webpack_require__.n(notification_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),src=__webpack_require__("./libs/ui/inputs/src/index.ts"),ng_icons_core=__webpack_require__("./node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs"),ng_icons_material_icons_baseline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-baseline.mjs"),ng_icons_material_icons_outline=__webpack_require__("./node_modules/@ng-icons/material-icons/fesm2022/ng-icons-material-icons-outline.mjs");let NotificationComponent=class NotificationComponent{constructor(){this.type="info",this.notificationClose=new core.EventEmitter}handleClose(event){event?.preventDefault(),this.notificationClose.emit()}getIconName(type){switch(type){case"success":return"matCheckCircleOutline";case"info":return"matInfoOutline";case"warning":return"matWarningAmberOutline";case"error":return"matErrorOutlineOutline";default:return""}}static{this.propDecorators={type:[{type:core.Input}],title:[{type:core.Input}],text:[{type:core.Input}],closeMessage:[{type:core.Input}],notificationClose:[{type:core.Output}]}}};NotificationComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"gn-ui-notification",standalone:!0,imports:[common.CommonModule,src.Qp,ng_icons_core.Uq],providers:[(0,ng_icons_core.EB)({matCheckCircleOutline:ng_icons_material_icons_baseline.X85,matErrorOutlineOutline:ng_icons_material_icons_outline.Bak,matWarningAmberOutline:ng_icons_material_icons_outline.im7,matInfoOutline:ng_icons_material_icons_outline.FaO,matCloseOutline:ng_icons_material_icons_outline.XkI})],template:'<div\n  class="p-[16px] flex flex-row gap-[16px] items-start border border-gray-200 shadow-md rounded bg-background"\n>\n  <div\n    role="alert"\n    class="rounded-full text-white p-[6px] w-[32px] h-[32px] flex shrink-0"\n    [ngClass]="{\n      \'bg-red-500\': type === \'error\',\n      \'bg-yellow-500\': type === \'warning\',\n      \'bg-green-500\': type === \'success\',\n      \'bg-blue-500\': type === \'info\',\n    }"\n  >\n    <ng-icon\n      class="!w-[20px] !h-[16px] text-[24px]"\n      [name]="getIconName(type)"\n    ></ng-icon>\n  </div>\n  <div\n    class="flex flex-col items-start gap-[4px] pt-[3px] grow shrink overflow-hidden"\n  >\n    <div class="font-bold text-[16px] text-gray-900">\n      {{ title }}\n    </div>\n    <div class="text-[14px] text-gray-800 whitespace-pre-wrap">{{ text }}</div>\n    <a\n      href\n      *ngIf="closeMessage"\n      class="text-[14px] gn-ui-link"\n      (click)="handleClose($event)"\n    >\n      {{ closeMessage }}\n    </a>\n  </div>\n  <gn-ui-button\n    type="light"\n    class="shrink-0"\n    (buttonClick)="handleClose()"\n    [style.--gn-ui-button-padding]="0"\n    [style.--gn-ui-button-width]="\'21px\'"\n    [style.--gn-ui-button-height]="\'21px\'"\n  >\n    <ng-icon\n      class="text-[22px] !w-[21px] !h-[21px]"\n      name="matCloseOutline"\n    ></ng-icon>\n  </gn-ui-button>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[notification_componentngResource_default()]})],NotificationComponent)},"./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>firstValueFrom});var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"),_Subscriber__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscriber.js");function firstValueFrom(source,config){var hasConfig="object"==typeof config;return new Promise((function(resolve,reject){var subscriber=new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Ms({next:function(value){resolve(value),subscriber.unsubscribe()},error:reject,complete:function(){hasConfig?resolve(config.defaultValue):reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.G)}});source.subscribe(subscriber)}))}},"./libs/ui/elements/src/lib/notification/notification.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Elements/NotificationComponent",component:__webpack_require__("./libs/ui/elements/src/lib/notification/notification.component.ts").z,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`\n<div class="border border-gray-300 p-2" style="width: 600px; resize: horizontal; overflow: auto">\n  ${story}\n</div>`))],argTypes:{notificationClose:{action:"notificationClose"},type:{control:!1}}},Primary={args:{title:"",text:"This is a message relevant for the current context! Close me once you're done reading it.",closeMessage:"Understood"},render:args=>({props:args,template:"<div class='flex flex-col gap-5'>\n  <gn-ui-notification type='success'\n      [title]=\"title || 'Good news, everyone!'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n  <gn-ui-notification type='warning'\n      [title]=\"title || 'Uh oh!'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n  <gn-ui-notification type='error'\n      [title]=\"title || 'Can\\'t connect'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n  <gn-ui-notification type='info'\n      [title]=\"title || 'Hey, did you know...'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n</div>"})},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: '',\n    text: \"This is a message relevant for the current context! Close me once you're done reading it.\",\n    closeMessage: 'Understood'\n  },\n  render: args => ({\n    props: args,\n    template: `<div class='flex flex-col gap-5'>\n  <gn-ui-notification type='success'\n      [title]=\"title || 'Good news, everyone!'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n  <gn-ui-notification type='warning'\n      [title]=\"title || 'Uh oh!'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n  <gn-ui-notification type='error'\n      [title]=\"title || 'Can\\\\'t connect'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n  <gn-ui-notification type='info'\n      [title]=\"title || 'Hey, did you know...'\"\n      [text]='text'\n      [closeMessage]='closeMessage'\n      (notificationClose)='notificationClose($event)'></gn-ui-notification>\n</div>`\n  })\n}",...Primary.parameters?.docs?.source}}}},"./libs/ui/elements/src/lib/notification/notification.component.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);