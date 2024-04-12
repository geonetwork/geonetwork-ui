import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MarkdownParserComponent } from '../markdown-parser/markdown-parser.component'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent, TextAreaComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'gn-ui-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    ButtonComponent,
    TextAreaComponent,
    MarkdownParserComponent,
    TranslateModule,
  ],
})
export class MarkdownEditorComponent {
  @Input() preview = false
  @Input() helperText?: string
  @Input() placeholder: string
  @Input() textContent: string
  @Output() textContentChanged: EventEmitter<string> =
    new EventEmitter<string>()

  textContentChangedHandler(textContent: string) {
    this.textContent = textContent
    this.textContentChanged.emit(this.textContent)
  }
}
