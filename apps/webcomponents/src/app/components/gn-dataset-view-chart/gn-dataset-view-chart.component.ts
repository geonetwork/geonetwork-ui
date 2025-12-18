import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component.js'
import { LinkUsage } from '@geonetwork-ui/util/shared'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'wc-gn-dataset-view-chart',
  templateUrl: './gn-dataset-view-chart.component.html',
  styleUrls: ['./gn-dataset-view-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
  standalone: false,
})
export class GnDatasetViewChartComponent
  extends BaseComponent
  implements OnInit
{
  private changeDetector = inject(ChangeDetectorRef)

  @Input() datasetId!: string
  @Input() aggregation: string
  @Input() xProperty: string
  @Input() yProperty: string
  @Input() chartType: string
  link: DatasetOnlineResource

  async init() {
    super.init()
    this.link = await this.getRecordLink(this.datasetId, [
      LinkUsage.DATA,
      LinkUsage.GEODATA,
    ])
    this.changeDetector.detectChanges()
  }
}
