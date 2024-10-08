import { ChangeDetectorRef, Component, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '../button/button.component'
import { filter } from 'rxjs/operators'
import { Subject } from 'rxjs'
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
  @Input() value = ''
  @Input() extraClass = ''
  @Input() placeholder = 'https://'
  @Input() disabled: boolean
  @Input() urlCanParse?: boolean
  @Input() showUploadButton = true
  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(filter((v) => !!v))

  constructor(private cd: ChangeDetectorRef) {}

  handleInput() {
    this.cd.markForCheck()
  }

  handleChange(element: HTMLInputElement) {
    const value = element.value
    this.rawChange.next(value)
  }

  URLcanParse(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
}
