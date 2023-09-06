import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouteReuseStrategy } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import {
  FullRouterStateSerializer,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { ROUTER_STATE_KEY } from './constants'
import { SearchRouterContainerDirective } from './container/search-router.container.directive'
import { RouterService } from './router.service'
import { SearchRouteReuseStrategy } from './SearchRouteReuseStrategy'
import { RouterFacade } from './state/router.facade'
import { RouterEffects } from './state/router.effects'
import { ROUTER_CONFIG, RouterConfigModel } from './router.config'

@NgModule({
  declarations: [SearchRouterContainerDirective],
  exports: [SearchRouterContainerDirective],
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
  constructor(private routerService: RouterService) {
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
