import { Provider } from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  DISABLE_AUTH,
  Gn4PlatformService,
} from './platform/gn4-platform.service'
import { Gn4PlatformMapper } from './platform/gn4-platform.mapper'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Gn4Repository } from './gn4-repository'
import { AvatarServiceInterface, GravatarService } from './auth'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  ORGANIZATIONS_STRATEGY,
  organizationsServiceFactory,
} from './organizations'
import { ElasticsearchService } from './elasticsearch'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'

interface Gn4ProvideOptions {
  disableAuth?: boolean
}

export function provideGn4(provideOptions?: Gn4ProvideOptions): Provider[] {
  return [
    {
      provide: DISABLE_AUTH,
      useValue: provideOptions?.disableAuth,
    },
    {
      provide: PlatformServiceInterface,
      useClass: Gn4PlatformService,
    },
    {
      provide: RecordsRepositoryInterface,
      useClass: Gn4Repository,
    },
    Gn4PlatformMapper,
    { provide: AvatarServiceInterface, useClass: GravatarService },
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
  ]
}
