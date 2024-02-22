import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MarkdownParserComponent } from '../markdown-parser/markdown-parser.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MarkdownParserComponent,
    TranslateModule,
  ],
})
export class MarkdownEditorComponent {
  @Input() maxLength: number
  @Input() placeholder: string
  @Input() textContent: string
  @Output() textContentChanged: EventEmitter<string> =
    new EventEmitter<string>()

  preview = false

  textContentChangedHandler(textContent: string) {
    this.textContent = textContent
    this.textContentChanged.emit(this.textContent)
  }
}
