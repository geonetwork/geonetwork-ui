import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  toModel,
  toXml,
} from '@geonetwork-ui/metadata-converter'

@Component({
  selector: 'gn-ui-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  @Input() set recordNative(value: CatalogRecord) {
    const start = performance.now()
    this.status = 'Converting to ISO9139...'
    try {
      const output = toXml(value)
      this.newRecordIso19139.emit(output)
      const time = Math.round(performance.now() - start)
      this.status = `Converting to ISO9139... Done (${time} ms).`
    } catch (e) {
      this.status = `Converting to ISO9139... Failed: ${
        e instanceof Error ? e.message : e
      }`
      console.error(e)
    }
  }
  @Input() set recordIso19139(value: string) {
    const start = performance.now()
    this.status = 'Converting to native format...'
    try {
      const output = toModel(value)
      this.newRecordNative.emit(output)
      const time = Math.round(performance.now() - start)
      this.status = `Converting to native format... Done (${time} ms).`
    } catch (e) {
      this.status = `Converting to ISO9139... Failed: ${
        e instanceof Error ? e.message : e
      }`
      console.error(e)
    }
  }

  @Output() newRecordNative = new EventEmitter<CatalogRecord>()
  @Output() newRecordIso19139 = new EventEmitter<string>()

  status: string
}
