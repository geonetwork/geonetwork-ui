import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import {
  FeatureSearchModule,
  ResultsHitsContainerComponent,
  ResultsListContainerComponent,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'
import {
  getMetadataQualityConfig,
  getOptionalSearchConfig,
  MetadataQualityConfig,
  SearchConfig,
} from '@geonetwork-ui/util/app-config'
import { SearchFiltersComponent } from '../search-filters/search-filters.component.js'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  RESULTS_LAYOUT_CONFIG,
} from '@geonetwork-ui/ui/search'

@Component({
  selector: 'datahub-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FeatureSearchModule,
    SearchFiltersComponent,
    ResultsHitsContainerComponent,
    ResultsListContainerComponent,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DEFAULT_RESULTS_LAYOUT_CONFIG },
  ],
})
export class SearchPageComponent implements OnInit {
  private searchRouter = inject(RouterFacade)
  searchFacade = inject(SearchFacade)

  metadataQualityDisplay: boolean
  displayRecordKindFilter

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
