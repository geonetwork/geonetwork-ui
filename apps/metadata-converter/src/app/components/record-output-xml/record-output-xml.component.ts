import { Component, ElementRef, Input, ViewChild } from '@angular/core'

@Component({
  selector: 'gn-ui-record-output-xml',
  templateUrl: './record-output-xml.component.html',
  styleUrls: ['./record-output-xml.component.css'],
})
export class RecordOutputXmlComponent {
  @Input() set recordXml(value: string) {
    const hljs = (window as any).hljs
    const codeContent = hljs.highlight(value, {
      language: 'xml',
    }).value
    this.codeBlockEl.nativeElement.innerHTML = codeContent
  }
  @ViewChild('codeBlock') codeBlockEl: ElementRef
}
