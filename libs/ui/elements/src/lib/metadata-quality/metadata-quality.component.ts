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
import { TranslateDirective } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matInfoOutline } from '@ng-icons/material-icons/outline'

type QualityChecks = {
  [key: string]: (metadata: Partial<CatalogRecord>) => boolean
}

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
    TranslateDirective,
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
    return url.toLowerCase().includes('capabilities')
  }

  private readonly COMMON_CHECKS: QualityChecks = {
    title: (metadata) => !!metadata?.title,
    description: (metadata) => !!metadata?.abstract,
    keywords: (metadata) => (metadata?.keywords?.length ?? 0) > 0,
    legalConstraints: (metadata) =>
      (metadata?.legalConstraints?.length ?? 0) > 0,
    contact: (metadata) => !!metadata?.contacts?.[0]?.email,
  }

  private readonly SPECIFIC_CHECKS: Record<string, QualityChecks> = {
    dataset: {
      updateFrequency: (metadata) => !!metadata?.updateFrequency,
      topic: (metadata) => (metadata?.topics?.length ?? 0) > 0,
      organisation: (metadata) => !!metadata?.contacts?.[0]?.organization?.name,
    },
    service: {
      capabilities: (metadata) =>
        (metadata?.onlineResources ?? []).some((resource) =>
          this.hasGetCapabilities(resource?.url?.href ?? '')
        ),
    },
    reuse: {
      topic: (metadata) => (metadata?.topics?.length ?? 0) > 0,
      organisation: (metadata) => !!metadata?.contacts?.[0]?.organization?.name,
      source: (metadata) => !!metadata?.extras?.sourcesIdentifiers,
    },
  }

  initialize() {
    this.items = []

    Object.entries(this.COMMON_CHECKS).forEach(([name, check]) => {
      this.add(name, check(this.metadata))
    })

    const datasetType = this.metadata?.kind
    if (datasetType && this.SPECIFIC_CHECKS[datasetType]) {
      Object.entries(this.SPECIFIC_CHECKS[datasetType]).forEach(
        ([name, check]) => {
          this.add(name, check(this.metadata))
        }
      )
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata'] || changes['metadataQualityDisplay']) {
      this.initialize()
    }
  }
}
