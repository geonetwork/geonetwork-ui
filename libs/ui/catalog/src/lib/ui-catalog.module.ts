import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'
import { OrganisationPreviewComponent } from './organisation-preview/organisation-preview.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component'
import { OrganisationsResultComponent } from './organisations-result/organisations-result.component'
import { RouterLink } from '@angular/router'
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core'
import { tablerFolderOpen } from '@ng-icons/tabler-icons'
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
    RouterLink,
    // FIXME: these imports are required by non-standalone components and should be removed once all components have been made standalone
    NgIconsModule.withIcons({
      tablerFolderOpen,
    }),
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  exports: [
    CatalogTitleComponent,
    OrganisationPreviewComponent,
    LanguageSwitcherComponent,
    OrganisationsResultComponent,
  ],
})
export class UiCatalogModule {}
