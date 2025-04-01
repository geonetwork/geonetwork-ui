import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { SearchFeatureCatalogComponent } from './search-feature-catalog/search-feature-catalog.component'
import { FeatureCatalogListComponent } from './feature-catalog-list/feature-catalog-list.component'

@Component({
  selector: 'datahub-record-feature-catalog',
  templateUrl: './record-feature-catalog.component.html',
  styleUrls: ['./record-feature-catalog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchFeatureCatalogComponent,
    FeatureCatalogListComponent,
  ],
})
export class RecordFeatureCatalogComponent {}
