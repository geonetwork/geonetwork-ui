import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogOrganisation } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-organisations-list',
  templateUrl: './organisations-list.component.html',
  styleUrls: ['./organisations-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsListComponent {
  @Input() organisations: CatalogOrganisation[]
}
