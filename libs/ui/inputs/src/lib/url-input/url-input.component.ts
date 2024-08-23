import { ChangeDetectorRef, Component, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '../button/button.component'
import { MatIconModule } from '@angular/material/icon'
import { filter } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'gn-ui-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule],
})
export class UrlInputComponent {
  @Input() value = ''
  @Input() extraClass = ''
  @Input() placeholder = 'https://'
  @Input() disabled: boolean
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
}
