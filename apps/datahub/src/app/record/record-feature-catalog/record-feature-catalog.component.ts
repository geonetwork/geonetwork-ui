import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { SearchFeatureCatalogComponent } from './search-feature-catalog/search-feature-catalog.component'
import { FeatureCatalogListComponent } from './feature-catalog-list/feature-catalog-list.component'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { Observable } from 'rxjs'

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
export class RecordFeatureCatalogComponent implements OnInit {
  @Input() metadata: CatalogRecord
  featureCatalog$: Observable<DatasetFeatureCatalog>

  constructor(private readonly metadataViewFacade: MdViewFacade) {}

  ngOnInit(): void {
    this.metadataViewFacade.loadFeatureCatalog(this.metadata)
    this.featureCatalog$ = this.metadataViewFacade.featureCatalog$
  }
}
