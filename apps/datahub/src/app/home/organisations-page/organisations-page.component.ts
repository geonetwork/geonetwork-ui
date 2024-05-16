import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'

@Component({
  selector: 'datahub-organisations-page',
  templateUrl: './organisations-page.component.html',
  styleUrls: ['./organisations-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsPageComponent {
  constructor(
    // private searchService: SearchService,
    // private orgsService: OrganizationsServiceInterface,
    private searchRouter: RouterFacade
  ) {}

  // searchByOrganisation(organisation: Organization) {
  //   this.orgsService
  //     .getFiltersForOrgs([organisation])
  //     .subscribe((filters) => this.searchService.setFilters(filters))
  // }

  onOrganizationSelection(organisation: Organization) {
    this.searchRouter.goToOrganization(organisation.name)
  }
}
