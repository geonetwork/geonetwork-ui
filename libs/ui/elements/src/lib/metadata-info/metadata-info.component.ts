import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  DatasetRecord,
  UpdateFrequencyCode,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: Partial<DatasetRecord>
  @Input() incomplete: boolean
  @Output() keyword = new EventEmitter<string>()
  updatedTimes: number

  get hasUsage() {
    return (
      this.metadata.extras?.isOpenData === true ||
      this.metadata.useLimitations?.length ||
      this.metadata.accessConstraints?.length
    )
  }

  get usages(): string[] {
    let array = []
    if (this.metadata.useLimitations?.length) {
      array = array.concat(this.metadata.useLimitations)
    }
    if (this.metadata.accessConstraints?.length) {
      array = array.concat(this.metadata.accessConstraints.map((c) => c.text))
    }
    return array
  }

  get updateFrequency(): string {
    if (
      (this.metadata.updateFrequency as UpdateFrequencyCustom).updatedTimes !==
      undefined
    ) {
      this.updatedTimes = (
        this.metadata.updateFrequency as UpdateFrequencyCustom
      ).updatedTimes
      return `domain.record.updateFrequency.${
        (this.metadata.updateFrequency as UpdateFrequencyCustom).per
      }`
    } else {
      return `domain.record.updateFrequency.${
        this.metadata.updateFrequency as UpdateFrequencyCode
      }`
    }
  }

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }

  onKeywordClick(keyword: string) {
    this.keyword.emit(keyword)
  }
}
