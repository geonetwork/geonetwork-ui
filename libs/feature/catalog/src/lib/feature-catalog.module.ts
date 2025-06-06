import { InjectionToken, NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import {
  CatalogTitleComponent,
  OrganisationsFilterComponent,
} from '@geonetwork-ui/ui/catalog'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { CommonModule } from '@angular/common'
import { SourceLabelComponent } from './source-label/source-label.component'
import { TranslateService } from '@ngx-translate/core'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  ElasticsearchService,
  ORGANIZATIONS_STRATEGY,
  OrganizationsFromGroupsService,
  OrganizationsFromMetadataService,
  OrganizationsStrategy,
} from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

// expects the replacement key ${name}
export const ORGANIZATION_URL_TOKEN = new InjectionToken<string>(
  'organization-url-token'
)

const organizationsServiceFactory = (
  strategy: OrganizationsStrategy,
  esService: ElasticsearchService,
  searchApiService: SearchApiService,
  groupsApiService: GroupsApiService,
  translateService: TranslateService,
  platformService: PlatformServiceInterface
) =>
  strategy === 'groups'
    ? new OrganizationsFromGroupsService(
        esService,
        searchApiService,
        groupsApiService,
        translateService
      )
    : new OrganizationsFromMetadataService(
        esService,
        searchApiService,
        groupsApiService,
        platformService,
        translateService
      )

@NgModule({
  declarations: [SiteTitleComponent, SourceLabelComponent],
  imports: [CommonModule, OrganisationsFilterComponent, CatalogTitleComponent],
  exports: [SiteTitleComponent, SourceLabelComponent],
  providers: [
    {
      provide: OrganizationsServiceInterface,
      useFactory: organizationsServiceFactory,
      deps: [
        ORGANIZATIONS_STRATEGY,
        ElasticsearchService,
        SearchApiService,
        GroupsApiService,
        TranslateService,
        PlatformServiceInterface,
      ],
    },
  ],
})
export class FeatureCatalogModule {}
