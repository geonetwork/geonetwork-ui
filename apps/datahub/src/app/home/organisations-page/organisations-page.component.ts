import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Organization } from '@geonetwork-ui/common/domain/model/record/index.js'
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
  private routerFacade = inject(RouterFacade)

  onOrganizationSelection(organisation: Organization) {
    this.routerFacade.goToOrganization(organisation.name)
  }
}
