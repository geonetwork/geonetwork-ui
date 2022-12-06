import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { AppCommonModule } from './app.common.module'

import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { CreatePageComponent } from './create/create-page.component'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { SearchComponent } from './dashboard/search/search.component'
import { SidebarComponent } from './dashboard/sidebar/sidebar.component'
import { EditPageComponent } from './edit/edit-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    SignInPageComponent,
    EditPageComponent,
    SidebarComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FeatureSearchModule,
    AppCommonModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
