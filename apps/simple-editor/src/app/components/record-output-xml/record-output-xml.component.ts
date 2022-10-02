import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-record-output-xml',
  templateUrl: './record-output-xml.component.html',
  styleUrls: ['./record-output-xml.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOutputXmlComponent {
  @Input() recordXml: string
}
