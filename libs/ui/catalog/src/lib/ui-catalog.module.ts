import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { OrganisationPreviewComponent } from './organisation-preview/organisation-preview.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'

@NgModule({
  declarations: [CatalogTitleComponent, OrganisationPreviewComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UiElementsModule,
    MatIconModule,
  ],
  exports: [CatalogTitleComponent, OrganisationPreviewComponent],
})
export class UiCatalogModule {}
