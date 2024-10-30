import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirArrowUp, iconoirLink } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgIconComponent],
  providers: [
    provideIcons({ iconoirLink, iconoirArrowUp }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class UrlInputComponent {
  @Input() value?: string
  @Input() extraClass = ''
  @Input() placeholder = 'https://'
  @Input() disabled: boolean
  @Input() showUploadButton = true

  /**
   * This will emit null if the field is emptied
   */
  @Output() valueChange = new EventEmitter<string | null>()
  @Output() uploadClick = new EventEmitter<string>()

  constructor(private cd: ChangeDetectorRef) {}

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    if (!value || !this.isValidUrl(value)) {
      this.valueChange.next(null)
      return
    }
    this.cd.markForCheck()
    this.valueChange.next(value)
  }

  handleUpload(element: HTMLInputElement) {
    const value = element.value
    if (!value || !this.isValidUrl(value)) return
    this.uploadClick.next(value)
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
}
