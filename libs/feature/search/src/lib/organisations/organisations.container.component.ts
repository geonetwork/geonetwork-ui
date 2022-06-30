import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CatalogOrganisation } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-organisations-container',
  templateUrl: './organisations.container.component.html',
  styleUrls: ['./organisations.container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsContainerComponent implements OnInit {
  constructor(private searchfacade: SearchFacade) {}
  organisations$: Observable<CatalogOrganisation[]>

  ngOnInit(): void {
    this.searchfacade.setConfigAggregations({
      org: {
        terms: {
          size: 1000,
          field: 'Org',
          order: {
            _key: 'asc',
          },
        },
      },
    })
    this.searchfacade.requestMoreResults()
    this.organisations$ = this.searchfacade.resultsAggregations$.pipe(
      filter((aggs) => aggs.org),
      map((aggs) =>
        aggs.org.buckets
          .map(
            (organisation) =>
              ({
                name: organisation.key,
                description: null,
                logoUrl: null,
              } as CatalogOrganisation)
          )
          //filter duplicates
          .filter(
            (org, i, orgs) =>
              orgs.findIndex(
                (firstOrg) =>
                  firstOrg.name.toLowerCase() === org.name.toLowerCase()
              ) === i
          )
      )
    )
  }
}
