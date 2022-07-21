import { NgModule } from '@angular/core'
import { SiteTitleComponent } from './site-title/site-title.component'
import { UiCatalogModule } from '@geonetwork-ui/ui/catalog'
import { ApiModule } from '@geonetwork-ui/data-access/gn4'
import { CommonModule } from '@angular/common'
import { SourceLabelComponent } from './source-label/source-label.component'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { OrganisationsComponent } from './organisations/organisations.component'

@NgModule({
  declarations: [
    SiteTitleComponent,
    SourceLabelComponent,
    OrganisationsComponent,
  ],
  imports: [UiCatalogModule, ApiModule, CommonModule, UtilI18nModule],
  exports: [SiteTitleComponent, SourceLabelComponent, OrganisationsComponent],
})
export class FeatureCatalogModule {}
