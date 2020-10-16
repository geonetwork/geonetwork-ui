import { NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import { UiModule } from '../../../ui/src'
import { GnApiModule } from '../../../gn-api/src'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [SiteTitleComponent],
  imports: [UiModule, GnApiModule, CommonModule],
  exports: [SiteTitleComponent],
})
export class LibCatalogModule {}
