import { Component, OnDestroy } from '@angular/core'
import { RecordsListComponent } from '../records/records-list.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { UserApiModel } from '@geonetwork-ui/data-access/gn4'

@Component({
  selector: 'md-editor-my-org-users',
  templateUrl: './my-org-users.component.html',
  styleUrls: ['./my-org-users.component.css'],
  standalone: true,
  imports: [
    RecordsListComponent,
    UiInputsModule,
    TranslateModule,
    CommonModule,
  ],
})
export class MyOrgUsersComponent implements OnDestroy {
  orgData: {
    orgName: string
    logoUrl: string
    recordCount: number
    userCount: number
    userList: UserApiModel[]
  }

  private myOrgDataSubscription

  constructor(
    private myOrgRecordsService: MyOrgService,
    public searchFacade: SearchFacade
  ) {
    this.searchFacade.resetSearch()
    this.myOrgDataSubscription = this.myOrgRecordsService.myOrgData$.subscribe(
      (data) => {
        this.orgData = data
      }
    )
  }

  ngOnDestroy() {
    this.myOrgDataSubscription.unsubscribe()
  }
}
