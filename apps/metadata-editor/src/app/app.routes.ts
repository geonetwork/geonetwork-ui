import { Route } from '@angular/router'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { CreatePageComponent } from './create/create-page.component'
import { EditPageComponent } from './edit/edit-page.component'
import { EditRecordResolver } from './edit-record.resolver'
import { AllRecordsComponent } from './records/all-records/all-records-list.component'
import { MyOrgRecordsComponent } from './records/my-org-records/my-org-records.component'
import { MyRecordsComponent } from './records/my-records/my-records.component'
import { MyDraftComponent } from './records/my-draft/my-draft.component'
import { MyLibraryComponent } from './records/my-library/my-library.component'
import { SearchRecordsComponent } from './records/search-records/search-records-list.component'

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
        title: 'All Records',
        component: AllRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-org',
        title: 'My Organisation',
        component: MyOrgRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-records',
        title: 'My Records',
        component: MyRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-draft',
        title: 'My Draft',
        component: MyDraftComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-library',
        title: 'My Library',
        component: MyLibraryComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'search',
        title: 'Search Records',
        component: SearchRecordsComponent,
        pathMatch: 'prefix',
      },
    ],
  },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'create', component: CreatePageComponent },
  {
    path: 'edit/:uuid',
    component: EditPageComponent,
    resolve: { record: EditRecordResolver },
  },
]
