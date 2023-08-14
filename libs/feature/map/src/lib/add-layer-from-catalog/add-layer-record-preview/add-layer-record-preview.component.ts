import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '@geonetwork-ui/ui/search'
import {
  getLinkLabel,
  LinkClassifierService,
  LinkUsage,
  MetadataLink,
  MetadataLinkType,
} from '@geonetwork-ui/util/shared'
import { Observable, of, throwError } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapUtilsService } from '../../utils'
import { MapFacade } from '../../+state/map.facade'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
} from '../../map-context/map-context.model'

@Component({
  selector: 'gn-ui-add-layer-record-preview',
  templateUrl: './add-layer-record-preview.component.html',
  styleUrls: ['./add-layer-record-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLayerRecordPreviewComponent extends RecordPreviewComponent {
  get mapLinks(): MetadataLink[] {
    return this.record.links.filter((link) =>
      this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
    ) as MetadataLink[]
  }

  constructor(
    protected elementRef: ElementRef,
    private linkClassifier: LinkClassifierService,
    private mapFacade: MapFacade,
    private mapUtils: MapUtilsService
  ) {
    super(elementRef)
  }

  async handleLinkClick(link: MetadataLink) {
    const layer = await this.getLayerFromLink(link).toPromise()
    this.mapFacade.addLayer({ ...layer, title: this.record.title })
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

  getLinkLabel(link: MetadataLink) {
    return getLinkLabel(link)
  }
}
