import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
  private route = inject(ActivatedRoute)

  saving$ = this.editorFacade.saving$

  // the "leave" button is shown only when a usable redirect target is given
  get redirectOnLeaveUrl(): string | null {
    const url = this.route.snapshot.queryParamMap.get('redirect_on_leave')
    return url && this.isHttpUrl(url) ? url : null
  }

  // only allow absolute http(s) targets (e.g. no javascript: or file: urls)
  private isHttpUrl(value: string): boolean {
    try {
      const { protocol } = new URL(value)
      return protocol === 'http:' || protocol === 'https:'
    } catch {
      return false
    }
  }

  saveRecord() {
    this.editorFacade.saveRecord()
  }

  leave() {
    const url = this.redirectOnLeaveUrl
    if (url) {
      window.open(url, '_self')
    }
  }
}
