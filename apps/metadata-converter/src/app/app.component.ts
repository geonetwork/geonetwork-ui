import { Component, ViewChild } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { StatusComponent } from './components/status/status.component'
import { RecordOutputXmlComponent } from './components/record-output-xml/record-output-xml.component'
import { RecordFormComponent } from './components/record-form/record-form.component'
import { FORMATS, getFormatName } from './md-formats'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('status') statusComponent: StatusComponent
  @ViewChild('output') outputComponent: RecordOutputXmlComponent
  @ViewChild('form') formComponent: RecordFormComponent

  formats = FORMATS

  get originalFormat(): string {
    const converter = this.statusComponent?.currentConverter
    return getFormatName(converter)
  }

  currentFormat: string

  onRecordChange(record: CatalogRecord) {
    this.statusComponent.recordNative = record
  }
  onRecordOutputReceived(output: string) {
    this.outputComponent.recordXml = output
    this.currentFormat = this.originalFormat
  }
  onRecordNativeReceived(record: CatalogRecord) {
    this.formComponent.record = record
  }
  onFileSelect(event: InputEvent) {
    const files = (event.target as HTMLInputElement).files
    if (files.length === 0) {
      console.warn('no file selected')
      return
    }
    const file = files[0]
    const reader = new FileReader()
    this.statusComponent.startReadingFile()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (evt) => {
      const text = evt.target.result as string
      this.statusComponent.referenceMetadata = text
      this.statusComponent.currentMetadata = text
    }
    reader.onerror = () => this.statusComponent.errorReadingFile()
  }
  onFileUrlInput(url: string) {
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://')))
      return
    this.statusComponent.startLoadingFile()
    fetch(url)
      .then((resp) => resp.text())
      .then((text) => {
        this.statusComponent.referenceMetadata = text
        this.statusComponent.currentMetadata = text
      })
      .catch((e) => this.statusComponent.errorLoadingFile(e.message))
  }
  onFormatChange(format: string) {
    this.statusComponent.changeFormat(format)
  }
}
