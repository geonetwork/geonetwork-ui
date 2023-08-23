import { Component, EventEmitter, Input, Output } from '@angular/core'
import { toModel, toXml } from '@geonetwork-ui/api/metadata-converter'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  @Input() set recordNative(value: CatalogRecord) {
    const start = performance.now()
    this.status = 'Converting to ISO9139...'
    this.newRecordIso19139.emit('')
    try {
      const output = toXml(value, this.referenceIso19139)
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
      this.newRecordIso19139.emit(value)
      const time = Math.round(performance.now() - start)
      this.status = `Converting to native format... Done (${time} ms).`
    } catch (e) {
      this.status = `Converting to native format... Failed: ${
        e instanceof Error ? e.message : e
      }`
      console.error(e)
    }
  }
  @Input() referenceIso19139: string

  @Output() newRecordNative = new EventEmitter<CatalogRecord>()
  @Output() newRecordIso19139 = new EventEmitter<string>()

  status = 'Standing by.'

  startLoadingFile() {
    this.status = 'Loading file from url...'
  }
  errorLoadingFile(message: string) {
    this.status = `Loading file from url... Failed: ${message}`
    console.error(message)
  }
  startReadingFile() {
    this.status = 'Reading file...'
  }
  errorReadingFile() {
    this.status = `Reading file... Failed`
  }
}
