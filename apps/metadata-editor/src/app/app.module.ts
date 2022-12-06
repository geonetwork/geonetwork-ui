import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routes'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { CreatePageComponent } from './create/create-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { EditPageComponent } from './edit/edit-page.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent,
    SignInPageComponent,
    EditPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
