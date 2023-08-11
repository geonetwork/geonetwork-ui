import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import {
  ElasticsearchService,
  getAsArray,
  getAsUrl,
  getFirstValue,
  hydrateContactsWithRecordLogo,
  mapContact,
  MetadataContact,
  MetadataRecord,
  Organisation,
  SearchFilters,
  selectField,
  SourceWithUnknownProps,
} from '@geonetwork-ui/util/shared'

import { combineLatest, Observable, of, takeLast } from 'rxjs'
import { filter, map, shareReplay, startWith, tap } from 'rxjs/operators'
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
  logoUrl: {
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
        tap((response) =>
          response.aggregations.contact.org.buckets.forEach(
            (r) =>
              (r.doc_count =
                response.aggregations.orgForResource.buckets.find(
                  (org) => org.key === r.key
                )?.doc_count || r.doc_count)
          )
        ),
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
          logoUrl: bucket.logoUrl.buckets[0]?.key,
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
    }),
    shareReplay()
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
              logoUrl: {
                terms: {
                  size: 1,
                  exclude: '',
                  field: 'contactForResource.logo.keyword',
                },
              },
            },
          },
        },
      },
      orgForResource: {
        terms: {
          size: 5000,
          exclude: '',
          field: 'OrgForResource',
          order: {
            _key: 'asc',
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

  private hydrateFirstResourceContactWithOrganisation(
    firstResourceContact: MetadataContact,
    contactOrganisation: Organisation
  ): MetadataContact {
    const logoUrl =
      firstResourceContact.logoUrl ||
      (contactOrganisation.logoUrl
        ? getAsUrl(`${contactOrganisation.logoUrl}`)
        : null)

    const organisation = contactOrganisation.name
    const name = firstResourceContact.name || contactOrganisation.name
    const email = firstResourceContact.email || contactOrganisation.email
    const { website, address, phone } = firstResourceContact

    return {
      name,
      organisation,
      email,
      logoUrl,
      website,
      address,
      phone,
    }
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
    if (!('OrgForResource' in filters)) return of([])
    return this.organisations$.pipe(
      map((orgs) => {
        const orgNames = Object.keys(filters.OrgForResource)
        return orgNames.map((name) => orgs.find((org) => org.name === name))
      })
    )
  }

  addOrganisationToRecordFromSource(
    source: SourceWithUnknownProps,
    record: MetadataRecord
  ): Observable<MetadataRecord> {
    const resourceContacts = getAsArray(
      selectField(source, 'contactForResource')
    ).map((contact) => mapContact(contact))
    const contact = mapContact(getFirstValue(selectField(source, 'contact')))
    const metadataRecord: MetadataRecord = {
      ...record,
      resourceContacts,
      contact,
    }
    const [firstResourceContact, ...otherResourceContacts] = resourceContacts

    return this.organisations$.pipe(
      takeLast(1),
      map((organisations) => {
        const recordOrganisation = organisations.filter(
          (org) => org.name === firstResourceContact?.organisation
        )[0]

        return hydrateContactsWithRecordLogo(
          {
            ...metadataRecord,
            ...(recordOrganisation && {
              resourceContacts: [
                this.hydrateFirstResourceContactWithOrganisation(
                  firstResourceContact,
                  recordOrganisation
                ),
                ...otherResourceContacts,
              ],
            }),
          },
          source
        )
      })
    )
  }
}
