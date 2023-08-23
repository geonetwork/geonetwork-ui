import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '@geonetwork-ui/ui/search'
import {
  getLinkLabel,
  LinkClassifierService,
  LinkUsage,
} from '@geonetwork-ui/util/shared'
import { Observable, of, throwError } from 'rxjs'
import { map } from 'rxjs/operators'
import { MapUtilsService } from '../../utils'
import { MapFacade } from '../../+state/map.facade'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
} from '../../map-context/map-context.model'
import {
  DatasetDistribution,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-add-layer-record-preview',
  templateUrl: './add-layer-record-preview.component.html',
  styleUrls: ['./add-layer-record-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLayerRecordPreviewComponent extends RecordPreviewComponent {
  get mapLinks(): DatasetDistribution[] {
    return (this.record as DatasetRecord).distributions.filter((link) =>
      this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
    ) as DatasetDistribution[]
  }

  constructor(
    protected elementRef: ElementRef,
    private linkClassifier: LinkClassifierService,
    private mapFacade: MapFacade,
    private mapUtils: MapUtilsService
  ) {
    super(elementRef)
  }

  async handleLinkClick(link: DatasetDistribution) {
    const layer = await this.getLayerFromLink(link).toPromise()
    this.mapFacade.addLayer({ ...layer, title: this.record.title })
  }

  getLayerFromLink(
    link: DatasetDistribution
  ): Observable<MapContextLayerModel> {
    if (link.type !== 'service')
      return throwError(
        () => 'map layer could not be built for this distribution'
      )
    if (link.accessServiceProtocol === 'wms') {
      return of({
        url: link.url.toString(),
        type: MapContextLayerTypeEnum.WMS,
        name: link.name,
      })
    } else if (link.accessServiceProtocol === 'wmts') {
      return this.mapUtils.getWmtsOptionsFromCapabilities(link).pipe(
        map((options) => ({
          type: MapContextLayerTypeEnum.WMTS,
          options: options,
        }))
      )
    }
    return throwError(() => 'protocol not supported')
  }

  getLinkLabel(link: DatasetDistribution) {
    return getLinkLabel(link)
  }
}
