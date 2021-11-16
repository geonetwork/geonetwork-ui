import {
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

export type AutcompleteItem = unknown

@Component({
  selector: 'gn-ui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<AutcompleteItem[]>
  @Output() itemSelected = new EventEmitter<AutcompleteItem>()
  @Output() inputSubmited = new EventEmitter<string>()
  @ViewChild(MatAutocompleteTrigger) triggerRef: MatAutocompleteTrigger
  @ViewChild('searchInput') inputRef: ElementRef<HTMLInputElement>

  searching: boolean
  suggestions$: Observable<AutcompleteItem[]>
  control = new FormControl()

  @Input() itemToStringFn: (AutcompleteItem) => string = (item) => item
  @Input() displayWithFn: (AutcompleteItem) => string = (item) => item

  ngOnInit(): void {
    this.suggestions$ = this.control.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((value) => this.action(value)),
      finalize(() => (this.searching = false))
    )
  }

  clear(): void {
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
    this.triggerRef.closePanel()
  }

  handleEnter(value: string) {
    this.inputSubmited.emit(value)
  }
  handleSelection(item: AutcompleteItem) {
    this.itemSelected.emit(item)
  }
}
