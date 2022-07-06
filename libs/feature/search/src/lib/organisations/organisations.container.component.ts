import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Organisation } from '@geonetwork-ui/util/shared'
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
  organisations$: Observable<Organisation[]>

  ngOnInit(): void {
    this.searchfacade.setConfigAggregations({
      org: {
        terms: {
          size: 1000,
          field: 'Org',
          order: {
            _key: 'asc',
          },
          exclude: '',
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
                recordCount: organisation.doc_count,
              } as Organisation)
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
