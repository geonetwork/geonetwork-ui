import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { ElasticsearchService } from '../elasticsearch/index.js'
import { OrganizationsStrategy } from './organization-strategy.token'
import { OrganizationsFromGroupsService } from './organizations-from-groups.service'
import { OrganizationsFromMetadataService } from './organizations-from-metadata.service'

export const organizationsServiceFactory = (
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
