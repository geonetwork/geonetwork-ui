import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  MetadataQualityConfig,
  getMetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'
import { SortByEnum } from '@geonetwork-ui/common/domain/model/search'

@Component({
  selector: 'datahub-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  metadataQualityDisplay: boolean

  constructor(
    private searchRouter: RouterFacade,
    public searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchFacade.setResultsLayout('ROW')
    this.searchRouter.searchParams$.subscribe((params) => {
      console.log(Object.keys(params).length)
      if (Object.keys(params).length === 0) {
        this.searchService.setSortBy(SortByEnum.CREATE_DATE)
      }
    })

    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
