import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Observable } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  tap,
} from 'rxjs/operators'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'ui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<string[]>
  @Output() changed = new EventEmitter<string>()
  @ViewChild(MatAutocompleteTrigger) triggerRef: MatAutocompleteTrigger
  @ViewChild('searchInput') inputRef: ElementRef<HTMLInputElement>

  searching: boolean
  suggestions$: Observable<string[]>
  control = new FormControl()

  constructor() {}

  ngOnInit(): void {
    this.suggestions$ = this.control.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((value) => this.action(value)),
      finalize(() => (this.searching = false))
    )
  }

  handleSelection(selected: string) {
    this.changed.emit(selected)
  }

  clear(): void {
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
    this.triggerRef.closePanel()
  }
}
