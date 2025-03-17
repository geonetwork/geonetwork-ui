import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marked } from 'marked'

@Component({
  selector: 'gn-ui-markdown-parser',
  templateUrl: './markdown-parser.component.html',
  styleUrls: ['./markdown-parser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkdownParserComponent {
  @Input() textContent: string
  @Input() whitoutStyles?: boolean

  get parsedMarkdown() {
    return marked.parse(this.textContent ?? '')
  }
}
