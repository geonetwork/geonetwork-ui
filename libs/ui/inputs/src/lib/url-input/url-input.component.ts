import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlInputComponent implements OnChanges, AfterViewInit {
  private cd = inject(ChangeDetectorRef)

  @Input() set value(v: string) {
    // we're making sure to only update the input if the URL representation of it has changed; otherwise we keep it identical
    // to avoid glitches when starting to write a URL and having some characters added/replaced automatically
    if (!v || !this.isValidUrl(v)) return
    if (
      this.isValidUrl(this.inputValue) &&
      new URL(v).toString() === new URL(this.inputValue).toString()
    )
      return
    this.inputValue = v
    this.cd.markForCheck()
  }
  @Input() extraClass = ''
  @Input() placeholder = 'https://'
  @Input() disabled: boolean
  @Input() showValidateButton = true
  @Input() resetUrlOnChange: number
  @Input() required = false

  @ViewChild('input') input: ElementRef<HTMLInputElement>
  private dirty = false

  /**
   * This will emit null if the field is emptied
   */
  @Output() valueChange = new EventEmitter<string | null>()
  @Output() uploadClick = new EventEmitter<string>()

  inputValue = ''

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['resetUrlOnChange'] &&
      !changes['resetUrlOnChange'].firstChange
    ) {
      this.inputValue = ''
      this.dirty = false
      this.checkValidity(this.inputValue)
    }
  }

  ngAfterViewInit() {
    this.checkValidity(this.inputValue)
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.inputValue = value
    this.dirty = true
    this.checkValidity(value)
    if (!value || !this.isValidUrl(value)) {
      this.valueChange.next(null)
      return
    }
    this.cd.markForCheck()
    this.valueChange.next(value)
  }

  checkValidity(value: string) {
    this.input?.nativeElement.classList.toggle(
      'invalid',
      this.required && this.dirty && !this.isValidUrl(value)
    )
  }

  handleUpload(element: HTMLInputElement, event: Event) {
    event.stopPropagation()
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
