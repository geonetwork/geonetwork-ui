import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogTitleComponent } from './catalog-title/catalog-title.component'

@NgModule({
  declarations: [CatalogTitleComponent],
  imports: [CommonModule],
  exports: [CatalogTitleComponent]
})
export class UiCatalogModule {}
