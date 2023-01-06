import { Injectable } from '@angular/core'
import { GroupApiModel } from '@geonetwork-ui/data-access/gn4'
import { AggregationsService } from '@geonetwork-ui/feature/search'
import { ElasticsearchService, Organisation } from '@geonetwork-ui/util/shared'
import { combineLatest, Observable } from 'rxjs'
import { map, shareReplay, startWith } from 'rxjs/operators'
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
        description: null,
        logoUrl: null,
      }))
    )
  )
  organisationsCount$ = this.organisationsAggs$.pipe(
    map((organisations) => organisations.length)
  )
  hydratedOrganisations$ = combineLatest([
    this.organisations$,
    this.groupService.groups$.pipe(startWith(null)),
  ]).pipe(
    map(([organisations, groups]) => {
      return !groups ? organisations : this.mapWithGroups(organisations, groups)
    })
  )

  constructor(
    private esService: ElasticsearchService,
    private groupService: GroupService,
    private aggregationsService: AggregationsService
  ) {}

  normalizeName(name: string): string {
    return name
      .normalize('NFD') // decompose graphemes to remove accents from letters
      .replace(/[\u0300-\u036f]/g, '') // remove accent characters
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // replace all except letters & numbers
  }

  private mapWithGroups(
    organisations: Organisation[],
    groups: GroupApiModel[]
  ) {
    return organisations.map((organisation) => {
      const group = groups.find(
        (group) =>
          (group.label.eng
            ? this.normalizeName(group.label.eng)
            : this.normalizeName(group.name)) ===
          this.normalizeName(organisation.name)
      )
      return {
        ...organisation,
        description: group?.description || undefined,
        logoUrl: group?.logo ? `${IMAGE_URL}${group.logo}` : undefined,
      } as Organisation
    })
  }
}
