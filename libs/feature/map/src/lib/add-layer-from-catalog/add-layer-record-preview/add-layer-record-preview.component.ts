import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { RecordPreviewComponent } from '@geonetwork-ui/ui/search'
import {
  getLinkLabel,
  LinkClassifierService,
  LinkUsage,
} from '@geonetwork-ui/util/shared'
import { firstValueFrom, Observable, of, throwError } from 'rxjs'
import { MapFacade } from '../../+state/map.facade'
import {
  DatasetOnlineResource,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { MapContextLayer } from '@geospatial-sdk/core'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-add-layer-record-preview',
  templateUrl: './add-layer-record-preview.component.html',
  styleUrls: ['./add-layer-record-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ThumbnailComponent, ButtonComponent, CommonModule],
})
export class AddLayerRecordPreviewComponent extends RecordPreviewComponent {
  get mapLinks(): DatasetOnlineResource[] {
    return (this.record as DatasetRecord).onlineResources.filter((link) =>
      this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
    ) as DatasetOnlineResource[]
  }

  constructor(
    protected elementRef: ElementRef,
    private linkClassifier: LinkClassifierService,
    private mapFacade: MapFacade
  ) {
    super(elementRef)
  }

  async handleLinkClick(link: DatasetOnlineResource) {
    const layer = await firstValueFrom(this.getLayerFromLink(link))
    const context = await firstValueFrom(this.mapFacade.context$)
    this.mapFacade.applyContext({
      ...context,
      layers: [...context.layers, { ...layer, label: this.record.title }],
    })
  }

  getLayerFromLink(link: DatasetOnlineResource): Observable<MapContextLayer> {
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

  getLinkLabel(link: DatasetOnlineResource) {
    return getLinkLabel(link)
  }
}
