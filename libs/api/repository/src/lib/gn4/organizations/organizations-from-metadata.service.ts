import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import {
  FieldFilterByValues,
  FieldFilters,
} from '@geonetwork-ui/common/domain/model/search'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { ElasticsearchService } from '../elasticsearch'
import {
  getAsArray,
  getAsUrl,
  mapOrganization,
  MetadataObject,
  selectFallback,
  selectField,
  selectTranslatedField,
  SourceWithUnknownProps,
} from '@geonetwork-ui/api/metadata-converter'
import { combineLatest, Observable, of, switchMap, takeLast } from 'rxjs'
import {
  filter,
  map,
  shareReplay,
  startWith,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import { getLocalizedIndexKey } from '@geonetwork-ui/util/i18n'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { coerce, satisfies, valid } from 'semver'
import { TranslateService } from '@ngx-translate/core'

const IMAGE_URL = '/geonetwork/images/harvesting/'

type ESBucket = {
  key: string
  doc_count: number
}
interface OrganizationAggsBucket extends ESBucket {
  mail: {
    buckets: ESBucket[]
  }
  logoUrl: {
    buckets: ESBucket[]
  }
}
interface IncompleteOrganization {
  name: string
  emails: string[]
  recordCount: number
}

@Injectable()
export class OrganizationsFromMetadataService
  implements OrganizationsServiceInterface
{
  private groups$: Observable<GroupApiModel[]> = of(true).pipe(
    switchMap(() => this.groupsApiService.getGroups()),
    shareReplay()
  )
  private organisationsAggs$: Observable<OrganizationAggsBucket[]> =
    this.platformService.getApiVersion().pipe(
      switchMap((version) =>
        this.searchApiService.search(
          'bucket',
          null,
          JSON.stringify(this.getAggregationSearchRequest(version))
        )
      ),
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
  private organisationsWithoutGroups$: Observable<IncompleteOrganization[]> =
    this.organisationsAggs$.pipe(
      map((buckets) =>
        buckets.map((bucket) => {
          const logoUrl = bucket.logoUrl.buckets?.[0]?.key
          return {
            name: bucket.key,
            emails: bucket.mail.buckets
              .map((bucket) => bucket.key)
              .filter((mail) => !!mail),
            recordCount: bucket.doc_count,
            ...(logoUrl && { logoUrl: getAsUrl(logoUrl) }),
          }
        })
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
    private groupsApiService: GroupsApiService,
    private platformService: PlatformServiceInterface,
    private translateService: TranslateService
  ) {}

  private get langIndex() {
    return getLocalizedIndexKey(this.translateService.currentLang)
  }

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

  private getAggregationSearchRequest(gnVersion: string) {
    const semVersion = valid(coerce(gnVersion))
    return this.esService.getSearchRequestBody({
      contact: {
        nested: {
          path: 'contactForResource',
        },
        aggs: {
          org: {
            terms: {
              field:
                semVersion === '4.2.2'
                  ? 'contactForResource.organisation'
                  : 'contactForResource.organisationObject.default.keyword',
              exclude: '',
              size: 5000,
              order: { _key: 'asc' },
            },
            aggs: {
              mail: {
                terms: {
                  size: 50,
                  exclude: '',
                  field: satisfies(semVersion, '4.2.2 - 4.2.4')
                    ? 'contactForResource.email.keyword'
                    : 'contactForResource.email',
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
          field:
            semVersion === '4.2.2'
              ? 'OrgForResource'
              : 'OrgForResourceObject.default',
          order: {
            _key: 'asc',
          },
        },
      },
    })
  }

  private mapWithGroups(
    organisations: IncompleteOrganization[],
    groups: GroupApiModel[]
  ): Organization[] {
    return organisations.map((organisation) => {
      const group =
        groups.find((group) =>
          this.equalsNormalizedStrings(
            group.label['eng'] ? group.label['eng'] : group.name,
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
      const { emails, ...fullOrg } = organisation
      if (!group) return fullOrg
      return {
        ...fullOrg,
        email: emails[0],
        ...(group.description && { description: group.description }),
        ...(group.logo && { logoUrl: getAsUrl(`${IMAGE_URL}${group.logo}`) }),
        ...(group.website && { website: getAsUrl(group.website) }),
        ...(group.email && { email: group.email }),
      } as Organization
    })
  }

  getFiltersForOrgs(organisations: Organization[]): Observable<FieldFilters> {
    return this.platformService.getApiVersion().pipe(
      map((gnVersion) => {
        const fieldName = gnVersion.startsWith('4.2.2')
          ? 'OrgForResource'
          : 'OrgForResourceObject.default'
        return {
          [fieldName]: organisations.reduce(
            (prev, curr) => ({ ...prev, [curr.name]: true }),
            {}
          ),
        }
      })
    )
  }

  getOrgsFromFilters(filters: FieldFilters): Observable<Organization[]> {
    return this.platformService.getApiVersion().pipe(
      switchMap((gnVersion) => {
        const fieldName = gnVersion.startsWith('4.2.2')
          ? 'OrgForResource'
          : 'OrgForResourceObject.default'

        if (!(fieldName in filters)) return of([])

        return this.organisations$.pipe(
          map((orgs: IncompleteOrganization[]) => {
            const orgNames = Object.keys(
              filters[fieldName] as FieldFilterByValues
            )
            return orgNames.map((name) =>
              orgs.find(
                (org: Organization | IncompleteOrganization) =>
                  org.name === name
              )
            )
          })
        )
      })
    )
  }

  addOrganizationToRecordFromSource(
    source: MetadataObject,
    record: CatalogRecord
  ): Observable<CatalogRecord> {
    const contacts: SourceWithUnknownProps[] = getAsArray(
      selectFallback(
        selectTranslatedField(source, 'contactObject', this.langIndex),
        selectField(source, 'contact')
      )
    )
    const resourceContacts: SourceWithUnknownProps[] = getAsArray(
      selectFallback(
        selectTranslatedField(
          source,
          'contactForResourceObject',
          this.langIndex
        ),
        selectField(source, 'contactForResource')
      )
    )
    const allContactOrgs = resourceContacts
      .concat(contacts)
      .map((contact) => mapOrganization(contact, this.langIndex))

    if (!allContactOrgs.length) return of(record)

    const ownerOrganization = allContactOrgs[0]

    // read the owner group as well to have a fallback logo
    const groupId = selectField(source, 'groupOwner')
    const group$ = this.groups$.pipe(
      map((groups) =>
        groups.find((group) => {
          return group.id === Number(groupId)
        })
      )
    )

    return this.organisations$.pipe(
      takeLast(1),
      withLatestFrom(group$),
      map(([organisations, group]: [Organization[], GroupApiModel]) => {
        const recordOrganisation = organisations.filter(
          (org) => org.name === ownerOrganization.name
        )[0]
        const logoUrl = group?.logo && getAsUrl(`${IMAGE_URL}${group.logo}`)
        return {
          ...record,
          ownerOrganization: {
            logoUrl,
            ...ownerOrganization,
            ...recordOrganisation,
          },
        }
      })
    )
  }
}
