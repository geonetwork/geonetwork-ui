import { InjectionToken, NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import { UiCatalogModule } from '@geonetwork-ui/ui/catalog'
import {
  ApiModule,
  GroupsApiService,
  SearchApiService,
  SiteApiService,
} from '@geonetwork-ui/data-access/gn4'
import { CommonModule } from '@angular/common'
import { SourceLabelComponent } from './source-label/source-label.component'
import { LangService, UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { OrganisationsComponent } from './organisations/organisations.component'
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
} from '@geonetwork-ui/api/repository/gn4'

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
  siteApiService: SiteApiService,
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
        siteApiService,
        langService
      )

@NgModule({
  declarations: [
    SiteTitleComponent,
    SourceLabelComponent,
    OrganisationsComponent,
  ],
  imports: [
    UiCatalogModule,
    UiLayoutModule,
    ApiModule,
    CommonModule,
    UtilI18nModule,
    TranslateModule.forChild(),
    UiElementsModule,
  ],
  exports: [SiteTitleComponent, SourceLabelComponent, OrganisationsComponent],
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
        SiteApiService,
        LangService,
      ],
    },
  ],
})
export class FeatureCatalogModule {}
