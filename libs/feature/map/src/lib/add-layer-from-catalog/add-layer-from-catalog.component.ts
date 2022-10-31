import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  ES_SOURCE_BRIEF,
  LinkClassifierService,
  LinkUsage,
  MetadataLink,
  MetadataLinkType,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapFacade,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { Observable, of, throwError } from 'rxjs'
import { map } from 'rxjs/operators'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'gn-ui-add-layer-from-catalog',
  templateUrl: './add-layer-from-catalog.component.html',
  styleUrls: ['./add-layer-from-catalog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade, SearchService],
})
export class AddLayerFromCatalogComponent implements OnInit {
  constructor(
    private mapFacade: MapFacade,
    private mapUtils: MapUtilsService,
    private searchFacade: SearchFacade,
    private linkClassifier: LinkClassifierService
  ) {}
  async handleMdSelect(record: MetadataRecord) {
    console.log(record)
    if (!record.links) {
      console.warn('No data distribution found for that record.')
      return
    }
    const compatibleLinks = record.links.filter((link) =>
      this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
    )
    if (compatibleLinks.length === 0) {
      console.warn('No map layer found for that record.')
      return
    }
    const layer = await this.getLayerFromLink(compatibleLinks[0]).toPromise()
    this.mapFacade.addLayer({ ...layer, title: record.title })
  }

  ngOnInit() {
    this.searchFacade.init('map-add-layer')
    this.searchFacade.setConfigRequestFields({
      includes: [...ES_SOURCE_BRIEF, 'link'],
    })
  }

  getLayerFromLink(link: MetadataLink): Observable<MapContextLayerModel> {
    if (link.type === MetadataLinkType.WMS) {
      return of({
        url: link.url,
        type: MapContextLayerTypeEnum.WMS,
        name: link.name,
      })
    } else if (link.type === MetadataLinkType.WMTS) {
      return this.mapUtils.getWmtsOptionsFromCapabilities(link).pipe(
        map((options) => ({
          type: MapContextLayerTypeEnum.WMTS,
          options: options,
        }))
      )
    }
    return throwError('protocol not supported')
  }
}
