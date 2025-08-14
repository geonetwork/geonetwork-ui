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
import {
  getQualityValidators,
  getAllKeysValidator,
  type ValidatorMapperKeys,
} from '@geonetwork-ui/util/shared'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matInfoOutline } from '@ng-icons/material-icons/outline'

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
  @Input() metadata: CatalogRecord
  @Input() smaller = false
  @Input() metadataQualityDisplay: boolean
  @Input() popoverDisplay = true
  @Input() propsToValidate?: ValidatorMapperKeys[]
  @Input() forceComputeScore = false // Instead of returning es' quality score

  items: MetadataQualityItem[] = []

  get qualityScore() {
    const qualityScore = !this.forceComputeScore
      ? this.metadata?.extras?.qualityScore
      : this.computedQualityScore

    return typeof qualityScore === 'number'
      ? qualityScore
      : this.computedQualityScore
  }

  get computedQualityScore(): number {
    return Math.round(
      (this.items.filter(({ value }) => value).length * 100) / this.items.length
    )
  }

  initialize() {
    if (!this.propsToValidate) {
      this.propsToValidate = getAllKeysValidator()
    }

    this.items = getQualityValidators(this.metadata, this.propsToValidate).map(
      ({ name, validator }) => ({ name, value: validator() })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata'] || changes['metadataQualityDisplay']) {
      this.initialize()
    }
  }
}
