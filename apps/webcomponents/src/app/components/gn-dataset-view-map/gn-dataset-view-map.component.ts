import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BaseComponent, DefaultProviders } from '../base.component'
import { LinkUsage } from '@geonetwork-ui/util/shared'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'wc-gn-dataset-view-map',
  templateUrl: './gn-dataset-view-map.component.html',
  styleUrls: ['./gn-dataset-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [DefaultProviders],
  standalone: false,
})
export class GnDatasetViewMapComponent extends BaseComponent implements OnInit {
  private mdViewFacade = inject(MdViewFacade)
  private changeDetector = inject(ChangeDetectorRef)

  @Input() datasetId: string
  link: DatasetOnlineResource

  async init() {
    super.init()
    this.mdViewFacade.loadFull(this.datasetId)
    this.link = await this.getRecordLink(this.datasetId, [
      LinkUsage.MAP_API,
      LinkUsage.GEODATA,
    ])
    this.changeDetector.detectChanges()
  }
}
