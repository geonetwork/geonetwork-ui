import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorService } from '../services/editor.service'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFormComponent {
  constructor(public editorService: EditorService) {}
}
