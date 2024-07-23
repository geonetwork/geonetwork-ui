import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { map } from 'rxjs/operators'

@Component({
  selector: 'md-editor-page-selector',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule],
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSelectorComponent {
  pages$ = this.facade.editorConfig$.pipe(map((config) => config.pages))

  constructor(public facade: EditorFacade) {}

  pageSectionClickHandler(index: number) {
    this.facade.setCurrentPage(index)
  }
}
