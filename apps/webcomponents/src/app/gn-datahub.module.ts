import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import {
  DefaultRouterModule,
  SearchRouterContainerDirective,
} from '@geonetwork-ui/feature/router'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
/* eslint-disable @nx/enforce-module-boundaries */
import { AppComponent } from '../../../datahub/src/app/app.component'
import { SearchPageComponent } from '../../../datahub/src/app/home/search/search-page/search-page.component'
import { OrganizationPageComponent } from '../../../datahub/src/app/organization/organization-page/organization-page.component'
import { RecordPageComponent } from '../../../datahub/src/app/record/record-page/record-page.component'
import { environment } from '../../../datahub/src/environments/environment'

export const metaReducers: MetaReducer[] = !environment.production ? [] : []

// https://github.com/nrwl/nx/issues/191
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'disabled',
      enableTracing: true,
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    !environment.production
      ? StoreDevtoolsModule.instrument({ connectInZone: true })
      : [],
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: RecordPageComponent,
      serviceRouteComponent: RecordPageComponent,
      reuseRouteComponent: RecordPageComponent,
      organizationRouteComponent: OrganizationPageComponent,
    }),
    SearchRouterContainerDirective,
  ],
  exports: [AppComponent],
})
export class GnDatahubModule {}
