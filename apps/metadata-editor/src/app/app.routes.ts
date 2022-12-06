import { Route } from '@angular/router'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { CreatePageComponent } from './create/create-page.component'
import { EditPageComponent } from './edit/edit-page.component'

export const appRoutes: Route[] = [
  { path: '', component: DashboardPageComponent },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'create', component: CreatePageComponent },
  { path: 'edit', component: EditPageComponent },
]
