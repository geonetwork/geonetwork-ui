import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matSearchOutline } from '@ng-icons/material-icons/outline'
import { DatasetFeatureCatalog } from '@geonetwork-ui/common/domain/model/record'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'datahub-search-feature-catalog',
  templateUrl: './search-feature-catalog.component.html',
  styleUrls: ['./search-feature-catalog.component.css'],
  standalone: true,
  imports: [CommonModule, NgIcon, TranslateModule],
  viewProviders: [provideIcons({ matSearchOutline })],
})
export class SearchFeatureCatalogComponent {
  @Input() featureCatalog: DatasetFeatureCatalog

  get totalObjects(): number {
    return this.featureCatalog?.featureTypes?.length || 0
  }

  get totalAttributes(): number {
    return (
      this.featureCatalog?.featureTypes?.reduce(
        (total, featureType) => total + (featureType.attributes?.length || 0),
        0
      ) || 0
    )
  }
}
