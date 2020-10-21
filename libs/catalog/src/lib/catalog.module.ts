import { NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import { UiModule } from '@lib/ui'
import { GnApiModule } from '@lib/gn-api'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [SiteTitleComponent],
  imports: [UiModule, GnApiModule, CommonModule],
  exports: [SiteTitleComponent],
})
export class LibCatalogModule {}
