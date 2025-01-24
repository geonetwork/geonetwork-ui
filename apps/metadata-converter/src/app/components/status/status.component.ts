import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  BaseConverter,
  findConverterForDocument,
  Iso191153Converter,
} from '@geonetwork-ui/api/metadata-converter'
import { FORMATS, getFormatName } from '../../md-formats'

@Component({
  selector: 'gn-ui-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  _currentRecord: CatalogRecord
  @Input() set recordNative(value: CatalogRecord) {
    this._currentRecord = value
    this.convertRecordToXml(value)
  }
  @Input() set currentMetadata(value: string) {
    const start = performance.now()
    this.status = 'Converting to CatalogRecord...'
    this.xmlToRecord(value)
      .then((output) => {
        this._currentRecord = output
        this.newRecordNative.emit(output)
        this.newMetadata.emit(value)
        const time = Math.round(performance.now() - start)
        this.status = `Converting to CatalogRecord... Done (${time} ms).`
      })
      .catch((e) => {
        this.status = `Converting to CatalogRecord... Failed: ${
          e instanceof Error ? e.message : e
        }`
        console.error(e)
      })
  }
  @Input() referenceMetadata: string

  @Output() newRecordNative = new EventEmitter<CatalogRecord>()
  @Output() newMetadata = new EventEmitter<string>()

  currentConverter: BaseConverter<string> = null

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

  public changeFormat(format: string) {
    const converterClass = FORMATS[format]
    if (!converterClass) {
      throw new Error(`Metadata format ${format} not supported`)
    }
    this.referenceMetadata = ''
    this.convertRecordToXml(this._currentRecord, new converterClass())
  }

  private convertRecordToXml(
    record: CatalogRecord,
    currentConverter?: BaseConverter<string>
  ) {
    const start = performance.now()
    const converter = currentConverter ?? this.currentConverter
    const converterName = getFormatName(converter)
    this.status = `Converting to ${converterName}...`
    this.newMetadata.emit('')
    this.recordToXml(record, currentConverter)
      .then((output) => {
        this.newMetadata.emit(output)
        const time = Math.round(performance.now() - start)
        this.status = `Converting to ${converterName}... Done (${time} ms).`
      })
      .catch((e) => {
        this.status = `Converting to ${converterName}... Failed: ${
          e instanceof Error ? e.message : e
        }`
        console.error(e)
      })
  }

  private recordToXml(
    record: CatalogRecord,
    currentConverter?: BaseConverter<string>
  ) {
    try {
      this.currentConverter = currentConverter
        ? currentConverter
        : this.referenceMetadata
          ? findConverterForDocument(this.referenceMetadata)
          : new Iso191153Converter()
      return this.currentConverter.writeRecord(record, this.referenceMetadata)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  private xmlToRecord(metadata: string) {
    try {
      this.currentConverter = findConverterForDocument(metadata)
      return this.currentConverter.readRecord(metadata)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
