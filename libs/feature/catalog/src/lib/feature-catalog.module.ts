import { NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import { UiCatalogModule } from '@geonetwork-ui/ui/catalog'
import {
  ApiModule,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { CommonModule } from '@angular/common'
import { SourceLabelComponent } from './source-label/source-label.component'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { OrganisationsComponent } from './organisations/organisations.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import {
  OrganisationsFromMetadataService,
  OrganisationsServiceInterface,
} from './organisations/service'
import {
  ElasticsearchService,
  ORGANIZATIONS_STRATEGY,
  OrganizationsStrategy,
} from '@geonetwork-ui/util/shared'
import { OrganisationsFromGroupsService } from './organisations/service/organisations-from-groups.service'

const organizationsServiceFactory = (
  strategy: OrganizationsStrategy,
  esService: ElasticsearchService,
  searchApiService: SearchApiService,
  groupsApiService: GroupsApiService,
  translateService: TranslateService
) =>
  strategy === 'groups'
    ? new OrganisationsFromGroupsService(
        esService,
        searchApiService,
        groupsApiService,
        translateService
      )
    : new OrganisationsFromMetadataService(
        esService,
        searchApiService,
        groupsApiService
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
      provide: OrganisationsServiceInterface,
      useFactory: organizationsServiceFactory,
      deps: [
        ORGANIZATIONS_STRATEGY,
        ElasticsearchService,
        SearchApiService,
        GroupsApiService,
        TranslateService,
      ],
    },
  ],
})
export class FeatureCatalogModule {}
