import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { parse } from 'marked'

@Component({
  selector: 'gn-ui-markdown-parser',
  templateUrl: './markdown-parser.component.html',
  styleUrls: ['./markdown-parser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkdownParserComponent {
  // Note: long <a href/> urls within the markdown textContent can cause layout issues
  @Input() textContent: string
  @Input() whitoutStyles?: boolean

  get parsedMarkdown() {
    return parse(this.textContent ?? '')
  }
}
