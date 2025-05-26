import { Component } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import { UsersListComponent } from './users-list.component'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'md-editor-my-org-users',
  templateUrl: './my-org-users.component.html',
  styleUrls: ['./my-org-users.component.css'],
  standalone: true,
  imports: [
    TranslateDirective,
    CommonModule,
    UsersListComponent,
    ThumbnailComponent,
  ],
})
export class MyOrgUsersComponent {
  orgData$ = this.myOrgRecordsService.myOrgData$

  constructor(private myOrgRecordsService: MyOrgService) {}
}
