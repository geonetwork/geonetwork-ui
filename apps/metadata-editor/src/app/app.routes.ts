import { Route } from '@angular/router'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { CreatePageComponent } from './create/create-page.component'
import { EditPageComponent } from './edit/edit-page.component'
import { EditRecordResolver } from './edit-record.resolver'
import { AllRecordsComponent } from './records/all-records-list.component'
import { MyOrgRecordsComponent } from './records/my-org-records.component'
import { MyLibraryComponent } from './records/my-library.component'
import { MyDraftComponent } from './records/my-draft.component'
import { MyRecordsComponent } from './records/my-records.component'

export const appRoutes: Route[] = [
  { path: '', component: DashboardPageComponent, pathMatch: 'prefix' },
  {
    path: 'records',
    component: DashboardPageComponent,
    outlet: 'primary',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'prefix',
      },
      {
        path: 'all',
        title: 'all records',
        component: AllRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-org',
        title: 'my organisation',
        component: MyOrgRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-records',
        title: 'my records',
        component: MyRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-draft',
        title: 'my draft',
        component: MyDraftComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-library',
        title: 'my library',
        component: MyLibraryComponent,
        pathMatch: 'prefix',
      },
    ],
  },
  // {
  //   path: '/records(inner:all)',
  //   title: 'All records',
  //   component: AllRecordsComponent,
  //   outlet: 'inner',
  // },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'create', component: CreatePageComponent },
  {
    path: 'edit/:uuid',
    component: EditPageComponent,
    resolve: { record: EditRecordResolver },
  },
]
