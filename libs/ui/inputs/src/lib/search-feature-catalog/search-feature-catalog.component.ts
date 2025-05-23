import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { DatasetFeatureCatalog } from '@geonetwork-ui/common/domain/model/record'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { createFuzzyFilter } from '@geonetwork-ui/util/shared'
import { iconoirSearch } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-search-feature-catalog',
  templateUrl: './search-feature-catalog.component.html',
  styleUrls: ['./search-feature-catalog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    TranslateDirective,
    TranslatePipe,
    FormsModule,
  ],
  viewProviders: [
    provideIcons({ iconoirSearch }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class SearchFeatureCatalogComponent {
  private _featureCatalog: DatasetFeatureCatalog
  searchTerm: any
  @Input() set featureCatalog(value: DatasetFeatureCatalog) {
    this._featureCatalog = value
    this.filteredFeatureCatalog = value
  }
  get featureCatalog(): DatasetFeatureCatalog {
    return this._featureCatalog
  }

  @Output() filteredFeatureCatalogChange =
    new EventEmitter<DatasetFeatureCatalog>()
  filteredFeatureCatalog: DatasetFeatureCatalog

  filterAction = (searchTerm: string): void => {
    of(searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          const filtered = (this.featureCatalog?.featureTypes || []).filter(
            (featureType) => {
              const fuzzyFilter = createFuzzyFilter(searchTerm)
              return (
                fuzzyFilter(featureType.name) ||
                (featureType.definition && fuzzyFilter(featureType.definition))
              )
            }
          )
          this.filteredFeatureCatalog = {
            ...this.featureCatalog,
            featureTypes: filtered,
          }
          this.filteredFeatureCatalogChange.emit(this.filteredFeatureCatalog)
        })
      )
      .subscribe()
  }

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
}
