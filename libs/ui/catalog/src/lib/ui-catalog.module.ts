import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { OrganisationPreviewComponent } from './organisation-preview/organisation-preview.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { OrganisationsSortComponent } from './organisations-sort/organisations-sort.component'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component'

@NgModule({
  declarations: [
    CatalogTitleComponent,
    OrganisationPreviewComponent,
    OrganisationsSortComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UiElementsModule,
    UiInputsModule,
    MatIconModule,
  ],
  exports: [
    CatalogTitleComponent,
    OrganisationPreviewComponent,
    OrganisationsSortComponent,
    LanguageSwitcherComponent,
  ],
})
export class UiCatalogModule {}
