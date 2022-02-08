import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import {
  DefaultRouterStateSerializer,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { ROUTER_STATE_KEY } from './constants'
import { RouterInitService } from './router-init.service'
import { RouterFacade } from './state'
import { RouterEffects } from './state/router.effects'

export interface RouterConfigModel {
  searchStateId: string
  searchRouteComponent: Type<any>
  recordRouteComponent: Type<any>
}
export const ROUTER_CONFIG = new InjectionToken<RouterConfigModel>(
  'router.config'
)

@NgModule({
  imports: [
    StoreModule.forFeature(ROUTER_STATE_KEY, routerReducer),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_STATE_KEY,
      serializer: DefaultRouterStateSerializer,
    }),
    EffectsModule.forFeature([RouterEffects]),
  ],
  providers: [RouterFacade],
})
export class DefaultRouterModule {
  constructor(private routerInit: RouterInitService) {
    this.routerInit.initRoutes()
  }

  static forRoot(
    config: RouterConfigModel
  ): ModuleWithProviders<DefaultRouterModule> {
    return {
      ngModule: DefaultRouterModule,
      providers: [{ provide: ROUTER_CONFIG, useValue: config }],
    }
  }
}
