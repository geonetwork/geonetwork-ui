import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { OrganisationPreviewComponent } from './organisation-preview/organisation-preview.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [CatalogTitleComponent, OrganisationPreviewComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UiSearchModule,
    MatIconModule,
  ],
  exports: [CatalogTitleComponent, OrganisationPreviewComponent],
})
export class UiCatalogModule {}
