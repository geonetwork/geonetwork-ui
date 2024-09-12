import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { OrganisationPreviewComponent } from './organisation-preview/organisation-preview.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component'
import { OrganisationsResultComponent } from './organisations-result/organisations-result.component'
import { RouterLink } from '@angular/router'

@NgModule({
  declarations: [
    CatalogTitleComponent,
    OrganisationPreviewComponent,
    LanguageSwitcherComponent,
    OrganisationsResultComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UiElementsModule,
    UiInputsModule,
    MatIconModule,
    RouterLink,
  ],
  exports: [
    CatalogTitleComponent,
    OrganisationPreviewComponent,
    LanguageSwitcherComponent,
    OrganisationsResultComponent,
  ],
})
export class UiCatalogModule {}
