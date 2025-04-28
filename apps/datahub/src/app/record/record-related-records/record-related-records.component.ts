import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  InternalLinkCardComponent,
  RelatedRecordCardComponent,
} from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { FavoriteStarComponent } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'datahub-record-related-records',
  templateUrl: './record-related-records.component.html',
  styleUrls: ['./record-related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RelatedRecordCardComponent,
    TranslateModule,
    InternalLinkCardComponent,
    FavoriteStarComponent,
  ],
})
export class RecordRelatedRecordsComponent {
  @Input() records: CatalogRecord[]

  constructor(private routerFacade: RouterFacade) {}

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
