import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { AppCommonModule } from './app.common.module'

import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { CreatePageComponent } from './create/create-page.component'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { SearchHeaderComponent } from './dashboard/search-header/search-header.component'
import { SidebarComponent } from './dashboard/sidebar/sidebar.component'
import { EditPageComponent } from './edit/edit-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    SignInPageComponent,
    EditPageComponent,
    SidebarComponent,
    SearchHeaderComponent,
  ],
  imports: [
    BrowserModule,
    FeatureSearchModule,
    UiElementsModule,
    UiSearchModule,
    AppCommonModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiInputsModule,
    FeatureEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
