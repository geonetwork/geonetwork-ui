import { InjectionToken, NgModule } from '@angular/core'
import { SafePipe } from './pipes/SafePipe'
import { CommonModule } from '@angular/common'
import { ImageFallbackDirective } from './image-fallback.directive'

export type OrganizationsStrategy = 'metadata' | 'groups'

export const ORGANIZATIONS_STRATEGY = new InjectionToken<OrganizationsStrategy>(
  'organizations-strategy',
  {
    factory: () => 'metadata',
  }
)

@NgModule({
  declarations: [SafePipe, ImageFallbackDirective],
  imports: [CommonModule],
  exports: [SafePipe, ImageFallbackDirective],
})
export class UtilSharedModule {}
