import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { ResultsLayoutConfigModel } from '@geonetwork-ui/ui/search'
import { RouterFacade } from './state'
import { RouterModule, Routes } from '@angular/router'
import {
  DefaultRouterStateSerializer,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import { RouterEffects } from './state/router.effects'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import {
  MetadataRouteComponent,
  ROUTER_STATE_KEY,
  SearchRouteComponent,
} from './constants'

const ROUTES: Routes = [
  {
    path: 'search',
    component: SearchRouteComponent,
  },
  {
    path: 'metadata/:metadataUuid',
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
