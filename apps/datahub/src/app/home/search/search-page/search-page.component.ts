import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  MetadataQualityConfig,
  getMetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'

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
    public searchFacade: SearchFacade
  ) {}

  ngOnInit() {
    this.searchFacade.setResultsLayout('ROW')

    this.searchFacade.setConfigFilters({
      resourceType: {
        service: false,
        map: false,
        'map/static': false,
        mapDigital: false,
      },
    })

    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
