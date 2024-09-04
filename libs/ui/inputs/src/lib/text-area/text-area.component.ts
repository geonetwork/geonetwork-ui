import {
  AfterViewInit,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TextAreaComponent implements AfterViewInit {
  @Input() value = ''
  @Input() disabled = false
  @Input() extraClass = ''
  @Input() placeholder = ''
  @Input() required = false

  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(distinctUntilChanged())

  @ViewChild('input') input

  ngAfterViewInit() {
    this.checkRequired(this.input.nativeElement.value)
  }

  checkRequired(value) {
    this.input.nativeElement.classList.toggle(
      'invalid',
      this.required && value === ''
    )
  }

  handleChange($event) {
    const value = $event.target.value
    this.checkRequired(value)
    this.rawChange.next(value)
  }
}
