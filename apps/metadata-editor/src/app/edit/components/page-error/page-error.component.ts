import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirEmojiPuzzled, iconoirJournal } from '@ng-icons/iconoir'
import { RouterModule } from '@angular/router'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'md-editor-page-error',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
  providers: [
    provideIcons({ iconoirEmojiPuzzled, iconoirJournal }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.css',
})
export class PageErrorComponent {}
