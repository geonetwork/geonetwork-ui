import { ModuleWithProviders, NgModule, inject } from '@angular/core'
import { RouteReuseStrategy } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import {
  FullRouterStateSerializer,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { ROUTER_STATE_KEY } from './constants.js'
import { RouterService } from './router.service.js'
import { SearchRouteReuseStrategy } from './SearchRouteReuseStrategy.js'
import { RouterFacade } from './state/router.facade.js'
import { RouterEffects } from './state/router.effects.js'
import { ROUTER_CONFIG, RouterConfigModel } from './router.config.js'

@NgModule({
  imports: [
    StoreModule.forFeature(ROUTER_STATE_KEY, routerReducer),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_STATE_KEY,
      serializer: FullRouterStateSerializer,
    }),
    EffectsModule.forFeature([RouterEffects]),
  ],
  providers: [
    RouterFacade,
    {
      provide: RouteReuseStrategy,
      useClass: SearchRouteReuseStrategy,
    },
  ],
})
export class DefaultRouterModule {
  private routerService = inject(RouterService)

  constructor() {
    this.routerService.initRoutes()
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
