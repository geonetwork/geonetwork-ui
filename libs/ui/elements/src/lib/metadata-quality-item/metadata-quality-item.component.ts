import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('record.metadata.quality.title.success')
marker('record.metadata.quality.title.failed')
marker('record.metadata.quality.description.success')
marker('record.metadata.quality.description.failed')
marker('record.metadata.quality.topic.success')
marker('record.metadata.quality.topic.failed')
marker('record.metadata.quality.keywords.success')
marker('record.metadata.quality.keywords.failed')
marker('record.metadata.quality.legalConstraints.success')
marker('record.metadata.quality.legalConstraints.failed')
marker('record.metadata.quality.contact.success')
marker('record.metadata.quality.contact.failed')
marker('record.metadata.quality.updateFrequency.success')
marker('record.metadata.quality.updateFrequency.failed')
marker('record.metadata.quality.organisation.success')
marker('record.metadata.quality.organisation.failed')

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
    return this.value ? 'matCheck' : 'matWarningAmber'
  }

  get labelKey() {
    return `record.metadata.quality.${this.name}.${
      this.value ? 'success' : 'failed'
    }`
  }
}
