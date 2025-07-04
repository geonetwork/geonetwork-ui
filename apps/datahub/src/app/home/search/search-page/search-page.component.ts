import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import {
  FeatureSearchModule,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  getMetadataQualityConfig,
  getOptionalSearchConfig,
  MetadataQualityConfig,
  SearchConfig,
} from '@geonetwork-ui/util/app-config'
import { SearchFiltersComponent } from '../search-filters/search-filters.component'

@Component({
  selector: 'datahub-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeatureSearchModule, SearchFiltersComponent],
})
export class SearchPageComponent implements OnInit {
  metadataQualityDisplay: boolean
  displayRecordKindFilter

  constructor(
    private searchRouter: RouterFacade,
    public searchFacade: SearchFacade
  ) {}

  ngOnInit() {
    this.searchFacade.setResultsLayout('ROW')

    const metadataQualityConfig: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = metadataQualityConfig.ENABLED

    const searchConfig: SearchConfig = getOptionalSearchConfig()
    this.displayRecordKindFilter =
      searchConfig?.RECORD_KIND_QUICK_FILTER !== false
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
