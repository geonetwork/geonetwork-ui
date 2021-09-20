import { ChangeDetectionStrategy, Component } from '@angular/core'
import { filter, map, startWith, tap } from 'rxjs/operators'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { DatasetFinderService, LinkUsage } from '@geonetwork-ui/feature/dataviz'
import {
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MapContextModel,
} from '@geonetwork-ui/feature/map'
import { MetadataLink, MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { fromLonLat } from 'ol/proj'

@Component({
  selector: 'gn-ui-data-preview-map',
  templateUrl: './data-preview-map.component.html',
  styleUrls: ['./data-preview-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPreviewMapComponent {
  availableLinks$ = this.mdViewFacade.metadata$.pipe(
    map((metadata) => ('links' in metadata ? metadata.links : [])),
    map(
      (links) =>
        links.filter((link) => !('invalid' in link)) as MetadataLinkValid[]
    ),
    map((links) =>
      links.filter(
        (link) =>
          this.datasetFinder.getLinkUsages(link).indexOf(LinkUsage.MAP) > -1
      )
    )
  )
  currentLayers$ = this.availableLinks$.pipe(
    map((links) => links[0]),
    map((link) =>
      link
        ? [
            this.getBackgroundLayer(),
            {
              url: link.url,
              type: link.protocol === 'OGC:WMS' ? 'wms' : 'geojson',
              name: link.name,
            },
          ]
        : [this.getBackgroundLayer()]
    )
  )
  mapContext$ = this.currentLayers$.pipe(
    map(
      (layers) =>
        ({
          layers,
          view: {
            center: fromLonLat([2.1, 46.8], 'EPSG:3857'),
            zoom: 5,
          },
        } as MapContextModel)
    )
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private datasetFinder: DatasetFinderService
  ) {}

  getBackgroundLayer() {
    return MAP_CTX_LAYER_XYZ_FIXTURE
  }
}
