import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'
import { LinkUsage } from '@geonetwork-ui/util/shared'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'wc-gn-dataset-view-table',
  templateUrl: './gn-dataset-view-table.component.html',
  styleUrls: ['./gn-dataset-view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
})
export class GnDatasetViewTableComponent
  extends BaseComponent
  implements OnInit
{
  @Input() datasetId!: string
  link: DatasetOnlineResource
  constructor(
    injector: Injector,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector)
  }
  async init() {
    super.init()
    this.link = await this.getRecordLink(this.datasetId, [
      LinkUsage.DATA,
      LinkUsage.GEODATA,
    ])
    this.changeDetector.detectChanges()
  }
}
