import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import {
  DefaultRouterStateSerializer,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import {
  MetadataRouteComponent,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_SEARCH,
  ROUTER_STATE_KEY,
  SearchRouteComponent,
} from './constants'
import { RouterFacade } from './state'
import { RouterEffects } from './state/router.effects'

const ROUTES: Routes = [
  {
    path: ROUTER_ROUTE_SEARCH,
    component: SearchRouteComponent,
  },
  {
    path: `${ROUTER_ROUTE_DATASET}/:metadataUuid`,
    component: MetadataRouteComponent,
  },
]

export interface RouterConfigModel {
  searchStateId: string
}
export const ROUTER_CONFIG = new InjectionToken<RouterConfigModel>(
  'router.config'
)

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
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
  static forRoot(
    config: RouterConfigModel
  ): ModuleWithProviders<DefaultRouterModule> {
    return {
      ngModule: DefaultRouterModule,
      providers: [{ provide: ROUTER_CONFIG, useValue: config }],
    }
  }
}
