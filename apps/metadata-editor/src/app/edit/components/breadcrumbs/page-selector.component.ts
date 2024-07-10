import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { EditorFieldPage } from '@geonetwork-ui/feature/editor'

@Component({
  selector: 'md-editor-page-selector',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule],
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSelectorComponent {
  @Input() selectedPage = 0
  @Input() pages: EditorFieldPage[]

  @Output() selectedPageChange = new EventEmitter<number>()

  pageSectionClickHandler(index: number) {
    this.selectedPageChange.emit(index)
  }
}
