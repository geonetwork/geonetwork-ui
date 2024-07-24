import { Route } from '@angular/router'
import { DashboardPageComponent } from './dashboard/dashboard-page.component'
import { SignInPageComponent } from './sign-in/sign-in-page.component'
import { EditPageComponent } from './edit/edit-page.component'
import { EditRecordResolver } from './edit-record.resolver'
import { MyRecordsComponent } from './records/my-records/my-records.component'
import { MyDraftComponent } from './records/my-draft/my-draft.component'
import { MyLibraryComponent } from './records/my-library/my-library.component'
import { SearchRecordsComponent } from './records/search-records/search-records-list.component'
import { MyOrgUsersComponent } from './my-org-users/my-org-users.component'
import { MyOrgRecordsComponent } from './records/my-org-records/my-org-records.component'
import { NewRecordResolver } from './new-record.resolver'
import { DuplicateRecordResolver } from './duplicate-record.resolver'

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'catalog/search', pathMatch: 'prefix' },
  {
    path: 'catalog',
    component: DashboardPageComponent,
    outlet: 'primary',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'prefix',
      },
      {
        path: 'discussion',
        component: SearchRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'calendar',
        component: SearchRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'contacts',
        component: SearchRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'thesaurus',
        component: SearchRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'search',
        title: 'Search Records',
        component: SearchRecordsComponent,
        pathMatch: 'prefix',
      },
      {
        path: 'my-org',
        title: 'My Organisation',
        component: MyOrgRecordsComponent,
      },
    ],
  },
  {
    path: 'my-space',
    component: DashboardPageComponent,
    outlet: 'primary',
    title: 'My space',
    children: [
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
        path: 'templates',
        title: 'Templates',
        component: MyLibraryComponent,
        pathMatch: 'prefix',
      },
    ],
  },
  {
    path: 'users',
    component: DashboardPageComponent,
    outlet: 'primary',
    title: 'Users',
    children: [
      {
        path: 'my-org',
        component: MyOrgUsersComponent,
        pathMatch: 'prefix',
      },
    ],
  },
  { path: 'sign-in', component: SignInPageComponent },
  {
    path: 'create',
    component: EditPageComponent,
    resolve: { record: NewRecordResolver },
  },
  {
    path: 'duplicate/:uuid',
    component: EditPageComponent,
    resolve: { record: DuplicateRecordResolver },
  },
  {
    path: 'edit/:uuid',
    component: EditPageComponent,
    resolve: { record: EditRecordResolver },
  },
]
