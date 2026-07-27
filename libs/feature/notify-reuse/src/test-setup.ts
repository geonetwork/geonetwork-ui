import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import { ngMocks } from 'ng-mocks'
import { OverlayModule } from '@angular/cdk/overlay'

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})

ngMocks.globalKeep(OverlayModule, true)
