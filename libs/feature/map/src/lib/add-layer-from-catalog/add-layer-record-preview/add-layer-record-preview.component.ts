import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '@geonetwork-ui/ui/search'
import {
  getLinkLabel,
  LinkClassifierService,
  LinkUsage,
} from '@geonetwork-ui/util/shared'
import { firstValueFrom, Observable, of, throwError } from 'rxjs'
import { MapUtilsService } from '../../utils'
import { MapFacade } from '../../+state/map.facade'
import {
  DatasetDistribution,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { MapContextLayer } from '@geospatial-sdk/core'

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
    const layer = await firstValueFrom(this.getLayerFromLink(link))
    const context = await firstValueFrom(this.mapFacade.context$)
    this.mapFacade.applyContext({
      ...context,
      layers: [...context.layers, layer],
    }) // TODO: title
  }

  getLayerFromLink(link: DatasetDistribution): Observable<MapContextLayer> {
    if (link.type !== 'service')
      return throwError(
        () => 'map layer could not be built for this distribution'
      )
    if (link.accessServiceProtocol === 'wms') {
      return of({
        url: link.url.toString(),
        type: 'wms',
        name: link.name,
      })
    } else if (link.accessServiceProtocol === 'wmts') {
      return of({
        url: link.url.toString(),
        type: 'wmts',
        name: link.name,
      })
    }
    return throwError(() => 'protocol not supported')
  }

  getLinkLabel(link: DatasetDistribution) {
    return getLinkLabel(link)
  }
}
