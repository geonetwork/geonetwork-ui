import { ChangeDetectionStrategy, Component } from '@angular/core'
import { startWith } from 'rxjs/operators'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'
import { ROUTER_ROUTE_ORGANISATIONS } from '../../../router/constants'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

@Component({
  selector: 'datahub-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFiguresComponent {
  recordsCount$ = this.catalogRecords.recordsCount$.pipe(startWith('-'))
  orgsCount$ = this.catalogOrgs.organisationsCount$.pipe(startWith('-'))
  ROUTE_SEARCH = `/${ROUTER_ROUTE_SEARCH}`
  ROUTE_ORGANISATIONS = `/${ROUTER_ROUTE_ORGANISATIONS}`

  constructor(
    private catalogRecords: RecordsService,
    private catalogOrgs: OrganizationsServiceInterface
  ) {}
}
