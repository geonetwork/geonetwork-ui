import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Organisation } from '@geonetwork-ui/util/shared'
import { SearchService } from '@geonetwork-ui/feature/search'
import { OrganisationsServiceInterface } from '@geonetwork-ui/feature/catalog'

@Component({
  selector: 'datahub-organisations-page',
  templateUrl: './organisations-page.component.html',
  styleUrls: ['./organisations-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsPageComponent {
  constructor(
    private searchService: SearchService,
    private orgsService: OrganisationsServiceInterface
  ) {}

  searchByOrganisation(organisation: Organisation) {
    this.searchService.setFilters(
      this.orgsService.getFiltersForOrg(organisation)
    )
  }
}
