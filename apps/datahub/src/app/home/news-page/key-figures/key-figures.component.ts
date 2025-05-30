import { ChangeDetectionStrategy, Component } from '@angular/core'
import { catchError, startWith } from 'rxjs/operators'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'
import { ROUTER_ROUTE_ORGANIZATIONS } from '../../../router/constants'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { of } from 'rxjs'
import { FigureComponent } from '@geonetwork-ui/ui/dataviz'
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matCorporateFare } from '@ng-icons/material-icons/baseline'
import { tablerFolderOpen } from '@ng-icons/tabler-icons'

marker('catalog.figures.datasets')
marker('catalog.figures.organizations')

@Component({
  selector: 'datahub-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FigureComponent, RouterLink],
  providers: [
    provideIcons({
      matCorporateFare,
      tablerFolderOpen,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class KeyFiguresComponent {
  recordsCount$ = this.catalogRecords.recordsCount$.pipe(
    startWith('-'),
    catchError(() => of('-'))
  )
  orgsCount$ = this.catalogOrgs.organisationsCount$.pipe(startWith('-'))
  ROUTE_SEARCH = `/${ROUTER_ROUTE_SEARCH}`
  ROUTE_ORGANISATIONS = `/${ROUTER_ROUTE_ORGANIZATIONS}`

  constructor(
    private catalogRecords: RecordsService,
    private catalogOrgs: OrganizationsServiceInterface
  ) {}
}
