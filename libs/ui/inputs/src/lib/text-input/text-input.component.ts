import { Component, Input, Output, ViewChild } from '@angular/core'
import { distinctUntilChanged } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TextInputComponent {
  @Input() value = ''
  @Input() extraClass = ''
  @Input() placeholder: string
  @Input() required = false
  @Input() disabled: boolean
  @Input() type = 'text'
  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(distinctUntilChanged())
  @ViewChild('input') input

  handleChange($event) {
    const value = $event.target.value
    this.rawChange.next(value)
  }
}
