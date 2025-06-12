import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { OrganisationsComponent } from '@geonetwork-ui/feature/catalog'

@Component({
  selector: 'datahub-organisations-page',
  templateUrl: './organisations-page.component.html',
  styleUrls: ['./organisations-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [OrganisationsComponent],
})
export class OrganisationsPageComponent {
  constructor(private routerFacade: RouterFacade) {}

  onOrganizationSelection(organisation: Organization) {
    this.routerFacade.goToOrganization(organisation.name)
  }
}
