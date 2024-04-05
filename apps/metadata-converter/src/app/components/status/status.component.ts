import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { findConverterForDocument } from '@geonetwork-ui/api/metadata-converter'
import { Iso191153Converter } from '@geonetwork-ui/api/metadata-converter'

@Component({
  selector: 'gn-ui-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  @Input() set recordNative(value: CatalogRecord) {
    const start = performance.now()
    this.status = 'Converting to ISO9139...'
    this.newMetadata.emit('')
    this.recordToXml(value)
      .then((output) => {
        this.newMetadata.emit(output)
        const time = Math.round(performance.now() - start)
        this.status = `Converting to ISO9139... Done (${time} ms).`
      })
      .catch((e) => {
        this.status = `Converting to ISO9139... Failed: ${
          e instanceof Error ? e.message : e
        }`
        console.error(e)
      })
  }
  @Input() set currentMetadata(value: string) {
    const start = performance.now()
    this.status = 'Converting to native format...'
    this.xmlToRecord(value)
      .then((output) => {
        this.newRecordNative.emit(output)
        this.newMetadata.emit(value)
        const time = Math.round(performance.now() - start)
        this.status = `Converting to native format... Done (${time} ms).`
      })
      .catch((e) => {
        this.status = `Converting to native format... Failed: ${
          e instanceof Error ? e.message : e
        }`
        console.error(e)
      })
  }
  @Input() referenceMetadata: string

  @Output() newRecordNative = new EventEmitter<CatalogRecord>()
  @Output() newMetadata = new EventEmitter<string>()

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

  private recordToXml(record: CatalogRecord) {
    const converter = this.referenceMetadata
      ? findConverterForDocument(this.referenceMetadata)
      : new Iso191153Converter()
    return converter.writeRecord(record, this.referenceMetadata)
  }

  private xmlToRecord(metadata: string) {
    const converter = findConverterForDocument(metadata)
    return converter.readRecord(metadata)
  }
}
