import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
  ViewChild,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { InternalLinkCardComponent } from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import {
  FavoriteStarComponent,
  RECORD_DATASET_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
} from '@geonetwork-ui/feature/search'
import {
  BlockListComponent,
  PreviousNextButtonsComponent,
} from '@geonetwork-ui/ui/layout'
import { RouterLink } from '@angular/router'
import {
  getMetadataQualityConfig,
  MetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'datahub-record-internal-links',
  templateUrl: './record-internal-links.component.html',
  styleUrls: ['./record-internal-links.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PreviousNextButtonsComponent,
    BlockListComponent,
    RouterLink,
    InternalLinkCardComponent,
    FavoriteStarComponent,
  ],
})
export class RecordInternalLinksComponent {
  @Input() records: CatalogRecord[]
  @Input() title: string
  @Input() titleIsSectionTitle = false
  @Input() routerLinkButton: {
    routerLink: string[]
    label: string
    queryParams: Record<string, string>
  } = null
  @ViewChild(BlockListComponent) list: BlockListComponent
  metadataQualityDisplay: boolean
  recordUrlGetter = this.getRecordUrl.bind(this)

  constructor(
    @Optional()
    @Inject(RECORD_DATASET_URL_TOKEN)
    private recordDatasetUrlTemplate: string,
    @Optional()
    @Inject(RECORD_SERVICE_URL_TOKEN)
    private recordServiceUrlTemplate: string,
    @Optional()
    @Inject(RECORD_REUSE_URL_TOKEN)
    private recordReuseUrlTemplate: string
  ) {
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }

  getRecordUrl(metadata: CatalogRecord) {
    const tokenMap = {
      dataset: this.recordDatasetUrlTemplate,
      service: this.recordServiceUrlTemplate,
      reuse: this.recordReuseUrlTemplate,
    }
    if (
      !this.recordDatasetUrlTemplate &&
      !this.recordServiceUrlTemplate &&
      !this.recordReuseUrlTemplate
    )
      return null
    const urlKind = tokenMap[metadata.kind]
    return urlKind.replace('${uuid}', metadata.uniqueIdentifier)
  }
}
