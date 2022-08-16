import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { startWith } from 'rxjs/operators'
import {
  OrganisationsService,
  RecordsService,
} from '@geonetwork-ui/feature/catalog'

@Component({
  selector: 'datahub-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFiguresComponent {
  recordsCount$ = this.catalogRecords.recordsCount$.pipe(startWith('-'))
  orgsCount$ = this.catalogOrgs.countOrganisations().pipe(startWith('-'))

  constructor(
    private catalogRecords: RecordsService,
    private catalogOrgs: OrganisationsService
  ) {}
}
