import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { EditorRouterService } from '../../router.service'
import { take } from 'rxjs'

@Component({
  selector: 'md-editor-my-org-records',
  templateUrl: './my-org-records.component.html',
  styleUrls: ['./my-org-records.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyOrgRecordsComponent {
  orgData$ = this.myOrgRecordsService.myOrgData$
  userCount: number
  orgName: string
  logoUrl: string

  constructor(
    private myOrgRecordsService: MyOrgService,
    public searchFacade: SearchFacade,
    public orgService: OrganizationsServiceInterface,
    public router: EditorRouterService
  ) {
    this.searchFacade.resetSearch()
    this.orgData$.pipe(take(1)).subscribe((data) => {
      this.userCount = data.userCount
      this.orgName = data.orgName
      this.logoUrl = data.logoUrl
      this.searchByOrganisation({ name: data.orgName })
    })
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
    url.searchParams.append('publisher', this.orgName)
    return url.toString()
  }
}
