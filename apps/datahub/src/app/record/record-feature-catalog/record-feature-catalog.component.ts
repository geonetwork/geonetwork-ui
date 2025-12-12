import { Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { Observable } from 'rxjs'
import { FeatureCatalogListComponent } from '@geonetwork-ui/ui/elements'
import { SearchFeatureCatalogComponent } from '@geonetwork-ui/ui/inputs'
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay'

@Component({
  selector: 'datahub-record-feature-catalog',
  templateUrl: './record-feature-catalog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    SearchFeatureCatalogComponent,
    FeatureCatalogListComponent,
    OverlayModule,
  ],
})
export class RecordFeatureCatalogComponent implements OnInit {
  readonly metadataViewFacade = inject(MdViewFacade)

  filteredFeatureCatalog: DatasetFeatureCatalog

  protected overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ]

  ngOnInit(): void {
    this.metadataViewFacade.featureCatalog$.subscribe((catalog) => {
      this.filteredFeatureCatalog = catalog
    })
  }

  onFilteredFeatureCatalogChange(catalog: DatasetFeatureCatalog) {
    this.filteredFeatureCatalog = catalog
  }
}
