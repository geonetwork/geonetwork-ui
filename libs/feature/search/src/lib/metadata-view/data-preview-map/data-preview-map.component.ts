import { ChangeDetectionStrategy, Component } from '@angular/core'
import { map, startWith } from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { DatasetFinderService, LinkUsage } from '@geonetwork-ui/feature/dataviz'
import {
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MapContextModel,
} from '@geonetwork-ui/feature/map'
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'
import { fromLonLat } from 'ol/proj'
import { BehaviorSubject, combineLatest } from 'rxjs'

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
    ),
    startWith([])
  )
  dropdownChoices$ = this.availableLinks$.pipe(
    map((links) =>
      links.length
        ? links.map((link, index) => ({
            label: `${link.name} (${link.protocol})`,
            value: index,
          }))
        : [{ label: 'No preview layer', value: 0 }]
    )
  )
  selectedLinkIndex$ = new BehaviorSubject(0)
  currentLayers$ = combineLatest([
    this.availableLinks$,
    this.selectedLinkIndex$,
  ]).pipe(
    map(([links, index]) => links[index]),
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

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
