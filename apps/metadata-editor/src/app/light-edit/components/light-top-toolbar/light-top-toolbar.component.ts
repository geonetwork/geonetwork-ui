import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateDirective } from '@ngx-translate/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirArrowLeft, iconoirFloppyDisk } from '@ng-icons/iconoir'

@Component({
  selector: 'md-editor-light-top-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    TranslateDirective,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirArrowLeft,
      iconoirFloppyDisk,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './light-top-toolbar.component.html',
  styleUrls: ['./light-top-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightTopToolbarComponent {
  private editorFacade = inject(EditorFacade)

  @Output() leave = new EventEmitter<void>()

  saving$ = this.editorFacade.saving$

  saveRecord() {
    this.editorFacade.saveRecord()
  }
}
