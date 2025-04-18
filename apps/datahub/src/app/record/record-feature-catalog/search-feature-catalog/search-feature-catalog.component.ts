import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matSearchOutline } from '@ng-icons/material-icons/outline'
import { DatasetFeatureCatalog } from '@geonetwork-ui/common/domain/model/record'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'datahub-search-feature-catalog',
  templateUrl: './search-feature-catalog.component.html',
  styleUrls: ['./search-feature-catalog.component.css'],
  standalone: true,
  imports: [CommonModule, NgIcon, TranslateModule, FormsModule],
  viewProviders: [
    provideIcons({ matSearchOutline }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class SearchFeatureCatalogComponent {
  private _featureCatalog: DatasetFeatureCatalog
  @Input() set featureCatalog(value: DatasetFeatureCatalog) {
    this._featureCatalog = value
    this.filteredFeatureCatalog = value
  }
  get featureCatalog(): DatasetFeatureCatalog {
    return this._featureCatalog
  }

  @Output() filteredFeatureCatalogChange =
    new EventEmitter<DatasetFeatureCatalog>()
  searchTerm = ''
  filteredFeatureCatalog: DatasetFeatureCatalog

  get totalObjects(): number {
    return this.filteredFeatureCatalog?.featureTypes?.length || 0
  }

  get totalAttributes(): number {
    return (
      this.filteredFeatureCatalog?.featureTypes?.reduce(
        (total, featureType) => total + (featureType.attributes?.length || 0),
        0
      ) || 0
    )
  }

  onSearchChange(value: string) {
    const terms = value
      .trim()
      .split(' ')
      .filter((term) => term.length > 0) // each space is a new term, AND operator between terms

    if (terms.length === 0) {
      this.filteredFeatureCatalog = this.featureCatalog
      this.filteredFeatureCatalogChange.emit(this.featureCatalog)
      return
    }

    const filteredCatalog = {
      ...this.featureCatalog,
      featureTypes: this.featureCatalog?.featureTypes.filter((featureType) => {
        return terms.every((term) => {
          const lcTerm = term.toLowerCase()
          return (
            featureType.name?.toLowerCase().includes(lcTerm) ||
            featureType.definition?.toLowerCase().includes(lcTerm)
          )
        })
      }),
    }
    this.filteredFeatureCatalog = filteredCatalog
    this.filteredFeatureCatalogChange.emit(filteredCatalog)
  }
}
