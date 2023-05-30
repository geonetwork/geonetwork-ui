import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import {
  ElasticsearchService,
  getAsArray,
  getFirstValue,
  mapContact,
  MetadataRecord,
  Organisation,
  SearchFilters,
  selectField,
  SourceWithUnknownProps,
} from '@geonetwork-ui/util/shared'
import { combineLatest, Observable, of } from 'rxjs'
import { filter, map, shareReplay, startWith } from 'rxjs/operators'
import { OrganisationsServiceInterface } from './organisations.service.interface'

const IMAGE_URL = '/geonetwork/images/harvesting/'

type ESBucket = {
  key: string
  doc_count: number
}
interface OrganisationAggsBucket extends ESBucket {
  mail: {
    buckets: ESBucket[]
  }
}
@Injectable()
export class OrganisationsFromMetadataService
  implements OrganisationsServiceInterface
{
  private groups$: Observable<GroupApiModel[]> = this.groupsApiService
    .getGroups()
    .pipe(shareReplay())
  private organisationsAggs$: Observable<OrganisationAggsBucket[]> =
    this.searchApiService
      .search('bucket', JSON.stringify(this.getAggregationSearchRequest()))
      .pipe(
        filter((response) => !!response.aggregations.contact.org),
        map((response) => response.aggregations.contact.org.buckets),
        shareReplay()
      )
  private organisationsWithoutGroups$: Observable<Organisation[]> =
    this.organisationsAggs$.pipe(
      map((buckets) =>
        buckets.map((bucket) => ({
          name: bucket.key,
          emails: bucket.mail.buckets
            .map((bucket) => bucket.key)
            .filter((mail) => !!mail),
          recordCount: bucket.doc_count,
          description: null,
          logoUrl: null,
        }))
      )
    )
  organisationsCount$ = this.organisationsAggs$.pipe(
    map((organisations) => organisations.length)
  )
  organisations$ = combineLatest([
    this.organisationsWithoutGroups$,
    this.groups$.pipe(startWith(null)),
  ]).pipe(
    map(([organisations, groups]) => {
      return !groups ? organisations : this.mapWithGroups(organisations, groups)
    })
  )

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService,
    private groupsApiService: GroupsApiService
  ) {}

  equalsNormalizedStrings(
    str1: string,
    str2: string,
    replaceSpecialChars = true
  ): boolean {
    if (!str1 || !str2) return false
    return (
      this.normalizeString(str1, replaceSpecialChars) ===
      this.normalizeString(str2, replaceSpecialChars)
    )
  }

  normalizeString(str: string, replaceSpecialChars = true): string {
    function normalize(str: string) {
      return str
        .normalize('NFD') // decompose graphemes to remove accents from letters
        .replace(/[\u0300-\u036f]/g, '') // remove accent characters
        .toLowerCase()
    }
    if (replaceSpecialChars) {
      return normalize(str).replace(/[^a-z0-9]/g, '') // replace all except letters & numbers
    } else {
      return normalize(str)
    }
  }

  private getAggregationSearchRequest() {
    return this.esService.getSearchRequestBody({
      contact: {
        nested: {
          path: 'contactForResource',
        },
        aggs: {
          org: {
            terms: {
              field: 'contactForResource.organisation',
              exclude: '',
              size: 5000,
              order: { _key: 'asc' },
            },
            aggs: {
              mail: {
                terms: {
                  size: 50,
                  exclude: '',
                  field: 'contactForResource.email.keyword',
                },
              },
            },
          },
        },
      },
    })
  }

  private mapWithGroups(
    organisations: Organisation[],
    groups: GroupApiModel[]
  ) {
    return organisations.map((organisation) => {
      const group =
        groups.find((group) =>
          this.equalsNormalizedStrings(
            group.label.eng ? group.label.eng : group.name,
            organisation.name
          )
        ) ??
        groups
          .filter((group) => !!group.email)
          .find((group) =>
            organisation.emails
              .map((mail) => this.normalizeString(mail, false))
              .includes(this.normalizeString(group.email, false))
          )
      if (!group) return organisation
      return {
        ...organisation,
        ...(group.email && { email: group.email }),
        ...(group.description && { description: group.description }),
        ...(group.logo && { logoUrl: `${IMAGE_URL}${group.logo}` }),
      } as Organisation
    })
  }

  getFiltersForOrgs(organisations: Organisation[]): Observable<SearchFilters> {
    return of({
      OrgForResource: organisations.reduce(
        (prev, curr) => ({ ...prev, [curr.name]: true }),
        {}
      ),
    })
  }

  getOrgsFromFilters(filters: SearchFilters): Observable<Organisation[]> {
    return this.organisations$.pipe(
      map((orgs) => {
        const orgNames =
          'OrgForResource' in filters ? Object.keys(filters.OrgForResource) : []
        return orgNames.map((name) => orgs.find((org) => org.name === name))
      })
    )
  }

  addOrganisationToRecordFromSource(
    source: SourceWithUnknownProps,
    record: MetadataRecord
  ): Observable<MetadataRecord> {
    return of({
      ...record,
      resourceContacts: [
        ...getAsArray(selectField(source, 'contactForResource')).map(
          (contact) => mapContact(contact, source)
        ),
      ],
      contact: mapContact(
        getFirstValue(selectField(source, 'contact')),
        source
      ),
    })
  }
}
