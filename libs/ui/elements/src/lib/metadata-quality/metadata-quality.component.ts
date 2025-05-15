import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import {
  MetadataQualityItem,
  MetadataQualityItemComponent,
} from '../metadata-quality-item/metadata-quality-item.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  PopoverComponent,
  ProgressBarComponent,
} from '@geonetwork-ui/ui/widgets'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon } from '@ng-icons/core'
import { matInfoOutline } from '@ng-icons/material-icons/outline'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'

@Component({
  selector: 'gn-ui-metadata-quality',
  templateUrl: './metadata-quality.component.html',
  styleUrls: ['./metadata-quality.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    ProgressBarComponent,
    MetadataQualityItemComponent,
    TranslateModule,
    NgIcon,
  ],
  providers: [
    provideIcons({
      matInfoOutline,
    }),
    provideNgIconsConfig({
      size: '1.2em',
      strokeWidth: '1.5px',
    }),
  ],
})
export class MetadataQualityComponent implements OnChanges {
  @Input() metadata: Partial<CatalogRecord>
  @Input() smaller = false
  @Input() metadataQualityDisplay: boolean

  items: MetadataQualityItem[] = []

  get qualityScore() {
    const qualityScore = this.metadata?.extras?.qualityScore
    return typeof qualityScore === 'number'
      ? qualityScore
      : this.calculatedQualityScore
  }

  get calculatedQualityScore(): number {
    return Math.round(
      (this.items.filter(({ value }) => value).length * 100) / this.items.length
    )
  }

  private add(name: string, value: boolean) {
    if (this.metadataQualityDisplay?.[name] !== false) {
      this.items.push({ name, value })
    }
  }
  hasGetCapabilities(url: string): boolean {
    const searchParams = new URLSearchParams(url)
    return searchParams.get('REQUEST')?.toLowerCase() === 'getcapabilities'
  }

  initialize() {
    const datasetType = this.metadata?.kind
    const contact = this.metadata?.contacts?.[0]
    const linkUrl = this.metadata?.onlineResources?.map(
      (resource) => resource.url?.search
    )
    this.items = []
    this.add('title', !!this.metadata?.title)
    this.add('description', !!this.metadata?.abstract)
    this.add('keywords', this.metadata?.keywords?.length > 0)
    this.add('legalConstraints', this.metadata?.legalConstraints?.length > 0)
    this.add('contact', !!contact?.email)

    if (datasetType === 'dataset') {
      this.add('updateFrequency', !!this.metadata?.updateFrequency)
      this.add('topic', this.metadata?.topics?.length > 0)
      this.add('organisation', !!contact?.organization)
    } else if (datasetType === 'service') {
      this.add(
        'capabilities',
        linkUrl.some((url) => this.hasGetCapabilities(url))
      )
    } else if (datasetType === 'reuse') {
      this.add('topic', this.metadata?.topics?.length > 0)
      this.add('organisation', !!contact?.organization)
      this.add('source', !!this.metadata?.extras?.catalogUuid)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata'] || changes['metadataQualityDisplay']) {
      this.initialize()
    }
  }
}
