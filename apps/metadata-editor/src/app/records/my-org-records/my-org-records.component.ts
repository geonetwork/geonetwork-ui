import { Component, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { Organization } from '@geonetwork-ui/common/domain/record'
import { Subscription } from 'rxjs'
import { AuthService } from '@geonetwork-ui/api/repository/gn4'

@Component({
  selector: 'md-editor-my-org-records',
  templateUrl: './my-org-records.component.html',
  styleUrls: ['./my-org-records.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyOrgRecordsComponent implements OnDestroy {
  subscriptionAuthService: Subscription
  subscriptionOrgService: Subscription

  constructor(
    public searchFacade: SearchFacade,
    private authService: AuthService,
    private orgService: OrganizationsServiceInterface
  ) {
    this.searchFacade.resetSearch()

    this.subscriptionAuthService = this.authService.user$.subscribe((user) => {
      this.searchByOrganisation({ name: user?.organisation })
    })
  }

  searchByOrganisation(organisation: Organization) {
    this.subscriptionOrgService = this.orgService
      .getFiltersForOrgs([organisation])
      .subscribe((filters) => this.searchFacade.setFilters(filters))
  }

  ngOnDestroy(): void {
    this.subscriptionAuthService.unsubscribe()
    this.subscriptionOrgService.unsubscribe()
  }
}
