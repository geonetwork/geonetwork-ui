import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { OrganisationsService } from '../organisations/organisations.service'

@Component({
  selector: 'gn-ui-key-figures',
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFiguresComponent {
  constructor(
    private organisationsService: OrganisationsService,
    private searchFacade: SearchFacade
  ) {}

  // FIXME: take resultHits from state present in news tab
  datasetsCountLabel$: Observable<string> = this.searchFacade.resultsHits$.pipe(
    map((datasets) => datasets.value)
  )

  organisationsCountLabel$: Observable<string> = this.organisationsService
    .countOrganisations()
    .pipe(map((organisations) => organisations.toString()))
}
