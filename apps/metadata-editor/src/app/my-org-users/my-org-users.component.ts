import { Component } from '@angular/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import { UsersListComponent } from './users-list.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { tap } from 'rxjs'

@Component({
  selector: 'md-editor-my-org-users',
  templateUrl: './my-org-users.component.html',
  styleUrls: ['./my-org-users.component.css'],
  standalone: true,
  imports: [
    UiInputsModule,
    TranslateModule,
    CommonModule,
    UsersListComponent,
    UiElementsModule,
  ],
})
export class MyOrgUsersComponent {
  orgData$ = this.myOrgRecordsService.myOrgData$

  constructor(private myOrgRecordsService: MyOrgService) {}
}
