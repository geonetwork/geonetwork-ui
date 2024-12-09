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
import { LangService, UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
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
  platformService: PlatformServiceInterface,
  langService: LangService
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
        langService
      )

@NgModule({
  declarations: [SiteTitleComponent, SourceLabelComponent],
  imports: [
    UiLayoutModule,
    CommonModule,
    UtilI18nModule,
    TranslateModule.forChild(),
    UiElementsModule,
    OrganisationsFilterComponent,
    CatalogTitleComponent,
  ],
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
        LangService,
      ],
    },
  ],
})
export class FeatureCatalogModule {}
