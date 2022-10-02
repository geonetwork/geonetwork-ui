import { Component, ViewChild } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/metadata-converter'
import { StatusComponent } from './components/status/status.component'
import { RecordOutputXmlComponent } from './components/record-output-xml/record-output-xml.component'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('status') statusComponent: StatusComponent
  @ViewChild('output') outputComponent: RecordOutputXmlComponent

  onRecordChange(record: CatalogRecord) {
    this.statusComponent.recordNative = record
  }
  onRecordOutputReceived(output: string) {
    this.outputComponent.recordXml = output
  }
}
