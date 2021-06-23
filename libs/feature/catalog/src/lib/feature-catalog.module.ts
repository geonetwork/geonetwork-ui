import { NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import { UiCatalogModule } from '@geonetwork-ui/ui/catalog'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [SiteTitleComponent],
  imports: [UiCatalogModule, ApiModule, CommonModule],
  exports: [SiteTitleComponent],
})
export class FeatureCatalogModule {}
