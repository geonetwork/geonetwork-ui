import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { DatasetFeatureCatalog } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'datahub-feature-catalog-list',
  templateUrl: './feature-catalog-list.component.html',
  styleUrls: ['./feature-catalog-list.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FeatureCatalogListComponent {
  @Input() featureCatalog: DatasetFeatureCatalog
}
