import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Organisation } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { OrganisationsService } from './organisations.service'

@Component({
  selector: 'gn-ui-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsComponent {
  constructor(private organisationsService: OrganisationsService) {}

  organisations$: Observable<Organisation[]> =
    this.organisationsService.getOrganisations()
}
