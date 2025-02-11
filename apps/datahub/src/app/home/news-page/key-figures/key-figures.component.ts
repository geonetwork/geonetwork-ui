import { ChangeDetectionStrategy, Component } from '@angular/core'
import { catchError, startWith } from 'rxjs/operators'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'
import { ROUTER_ROUTE_ORGANIZATIONS } from '../../../router/constants'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { of } from 'rxjs'

marker('catalog.figures.datasets')
marker('catalog.figures.organizations')

@Component({
  selector: 'datahub-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFiguresComponent {
  recordsCount$ = this.catalogRecords.recordsCount$.pipe(
    startWith('-'),
    catchError(() => of('-'))
  )
  orgsCount$
  ROUTE_SEARCH = `/${ROUTER_ROUTE_SEARCH}`
  ROUTE_ORGANISATIONS = `/${ROUTER_ROUTE_ORGANIZATIONS}`

  constructor(
    private catalogRecords: RecordsService,
    private catalogOrgs: OrganizationsServiceInterface
  ) {
    const organisations = this.catalogOrgs.getOrganisations()
    this.orgsCount$ = this.catalogOrgs.organisationsCount$.pipe(startWith('-'))
  }
}
