import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { Observable } from 'rxjs'
import { FeatureCatalogListComponent } from '@geonetwork-ui/ui/elements'
import { SearchFeatureCatalogComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'datahub-record-feature-catalog',
  templateUrl: './record-feature-catalog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SearchFeatureCatalogComponent,
    FeatureCatalogListComponent,
  ],
})
export class RecordFeatureCatalogComponent implements OnInit {
  @Input() metadata: CatalogRecord
  featureCatalog$: Observable<DatasetFeatureCatalog>
  filteredFeatureCatalog: DatasetFeatureCatalog

  constructor(public readonly metadataViewFacade: MdViewFacade) {}

  ngOnInit(): void {
    this.metadataViewFacade.featureCatalog$.subscribe((catalog) => {
      this.filteredFeatureCatalog = catalog
    })
  }

  onFilteredFeatureCatalogChange(catalog: DatasetFeatureCatalog) {
    this.filteredFeatureCatalog = catalog
  }
}
