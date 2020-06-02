import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core'
import { Observable } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators'

@Component({
  selector: 'lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder: string
  @Input() action: () => Observable<string[]>
  @Output() change = new EventEmitter<string>()

  searching: boolean

  autocomplete = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => this.action())
    )

  constructor() {}

  ngOnInit(): void {}
}
