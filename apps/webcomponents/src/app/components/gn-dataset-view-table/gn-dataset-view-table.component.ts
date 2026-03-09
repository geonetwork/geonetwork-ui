import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { SearchService } from '@geonetwork-ui/feature/search'
import { BaseComponent, DefaultProviders } from '../base.component'
import { LinkUsage } from '@geonetwork-ui/util/shared'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'wc-gn-dataset-view-table',
  templateUrl: './gn-dataset-view-table.component.html',
  styleUrls: ['./gn-dataset-view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [DefaultProviders, SearchService],
  standalone: false,
})
export class GnDatasetViewTableComponent
  extends BaseComponent
  implements OnInit
{
  private changeDetector = inject(ChangeDetectorRef)

  @Input() datasetId!: string
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
