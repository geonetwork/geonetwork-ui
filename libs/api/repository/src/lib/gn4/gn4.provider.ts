import { Provider } from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Gn4PlatformService } from './platform/gn4-platform.service'
import { Gn4PlatformMapper } from './platform/gn4-platform.mapper'

export function provideGn4(): Provider[] {
  return [
    {
      provide: PlatformServiceInterface,
      useClass: Gn4PlatformService,
    },
    Gn4PlatformMapper,
  ]
}
