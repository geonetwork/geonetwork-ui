import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

export interface MetadataQualityItem {
  name: string
  value: boolean
}

@Component({
  selector: 'gn-ui-metadata-quality-item',
  templateUrl: './metadata-quality-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityItemComponent implements MetadataQualityItem {
  @Input() name: string
  @Input() value: boolean

  get icon() {
    return this.value ? 'check' : 'warning_amber'
  }

  get labelKey() {
    return `record.metadata.quality.${this.name}.${
      this.value ? 'success' : 'failed'
    }`
  }
}
