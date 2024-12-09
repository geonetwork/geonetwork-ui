import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { distinctUntilChanged, Subject } from 'rxjs'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matClose, matSearch } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-search-input',
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({ matSearch, matClose }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
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
