import { Component, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { Organization } from '@geonetwork-ui/common/domain/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { UserApiModel } from '@geonetwork-ui/data-access/gn4'
import { EditorRouterService } from '../../router.service'

@Component({
  selector: 'md-editor-my-org-records',
  templateUrl: './my-org-records.component.html',
  styleUrls: ['./my-org-records.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyOrgRecordsComponent implements OnDestroy {
  orgData: {
    orgName: string
    logoUrl: string
    recordCount: number
    userCount: number
    userList: UserApiModel[]
  }

  public myOrgDataSubscription

  constructor(
    private myOrgRecordsService: MyOrgService,
    public searchFacade: SearchFacade,
    public orgService: OrganizationsServiceInterface,
    public router: EditorRouterService
  ) {
    this.searchFacade.resetSearch()
    this.myOrgDataSubscription = this.myOrgRecordsService.myOrgData$.subscribe(
      (data) => {
        this.orgData = data
        this.searchByOrganisation({ name: data.orgName })
      }
    )
  }

  searchByOrganisation(organisation: Organization) {
    this.orgService
      .getFiltersForOrgs([organisation])
      .subscribe((filters) => this.searchFacade.setFilters(filters))
  }

  getDatahubUrl(): string {
    const url = new URL(
      this.router.getDatahubSearchRoute(),
      window.location.toString()
    )

    url.searchParams.append('publisher', this.orgData?.orgName)
    return url.toString()
  }

  ngOnDestroy() {
    this.myOrgDataSubscription.unsubscribe()
  }
}
