import { Injectable } from '@angular/core'
import { ElasticsearchService, Organisation } from '@geonetwork-ui/util/shared'
import { AggregationsService } from '@geonetwork-ui/feature/search'
import { combineLatest, Observable } from 'rxjs'
import { delay, map, shareReplay } from 'rxjs/operators'
import { GroupService } from '../group/group.service'

const IMAGE_URL = '/geonetwork/images/harvesting/'

interface OrganisationAggsBucket {
  key: string
  doc_count: number
}
@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  organisationsAggs$: Observable<OrganisationAggsBucket[]> =
    this.aggregationsService
      .getFullSearchTermAggregation('OrgForResource')
      .pipe(
        map((response) => response.buckets),
        shareReplay()
      )
  organisations$: Observable<Organisation[]> = this.organisationsAggs$.pipe(
    map((buckets) =>
      buckets.map((bucket) => ({
        name: bucket.key,
        recordCount: bucket.doc_count,
      }))
    )
  )
  organisationsCount$ = this.organisationsAggs$.pipe(
    map((organisations) => organisations.length)
  )

  constructor(
    private esService: ElasticsearchService,
    private groupService: GroupService,
    private aggregationsService: AggregationsService
  ) {}

  getOrganisationsWithGroups(): Observable<Organisation[]> {
    return combineLatest([this.organisations$, this.groupService.groups$]).pipe(
      map(([organisations, groups]) =>
        organisations.map((organisation) => {
          const group = groups.find(
            (group) =>
              (group.label.eng
                ? this.normalizeName(group.label.eng)
                : this.normalizeName(group.name)) ===
              this.normalizeName(organisation.key)
          )
          return {
            name: organisation.key,
            description: group?.description,
            logoUrl: group?.logo ? `${IMAGE_URL}${group.logo}` : undefined,
            recordCount: organisation.doc_count,
          } as Organisation
        })
      )
    )
  }

  normalizeName(name: string): string {
    return name
      .normalize('NFD') // decompose graphemes to remove accents from letters
      .replace(/[\u0300-\u036f]/g, '') // remove accent characters
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // replace all except letters & numbers
  }
}
