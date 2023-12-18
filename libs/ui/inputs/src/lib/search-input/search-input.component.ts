import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { Subject, distinctUntilChanged } from 'rxjs'

@Component({
  selector: 'gn-ui-search-input',
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  @Input() value = ''
  @Input() placeholder = ''
  rawChange = new Subject<string>()
  @Output() valueChange = this.rawChange.pipe(distinctUntilChanged())

  handleChange($event) {
    const value = $event.target.value
    this.rawChange.next(value)
  }

  clear() {
    this.value = null
    this.rawChange.next(null)
  }
}
