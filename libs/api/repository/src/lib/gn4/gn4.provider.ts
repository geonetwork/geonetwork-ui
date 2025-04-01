import { Provider } from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Gn4PlatformService } from './platform/gn4-platform.service'
import { Gn4PlatformMapper } from './platform/gn4-platform.mapper'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Gn4Repository } from './gn4-repository'

export function provideGn4(): Provider[] {
  return [
    {
      provide: PlatformServiceInterface,
      useClass: Gn4PlatformService,
    },
    {
      provide: RecordsRepositoryInterface,
      useClass: Gn4Repository,
    },
    Gn4PlatformMapper,
  ]
}
