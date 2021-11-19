import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { Observable, ReplaySubject, Subscription } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  take,
  tap,
} from 'rxjs/operators'

export type AutcompleteItem = unknown

@Component({
  selector: 'gn-ui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<AutcompleteItem[]>
  @Output() itemSelected = new EventEmitter<AutcompleteItem>()
  @Output() inputSubmited = new EventEmitter<string>()
  @ViewChild(MatAutocompleteTrigger) triggerRef: MatAutocompleteTrigger
  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete
  @ViewChild('searchInput') inputRef: ElementRef<HTMLInputElement>
  selectionSubject = new ReplaySubject<MatAutocompleteSelectedEvent>(1)

  searching: boolean
  suggestions$: Observable<AutcompleteItem[]>
  control = new FormControl()
  subscription = new Subscription()
  cancelEnter = true

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
    this.subscription = this.control.valueChanges.subscribe((any) => {
      if (any !== '') {
        this.cancelEnter = false
      }
    })
  }

  ngAfterViewInit(): void {
    this.autocomplete.optionSelected.subscribe(this.selectionSubject)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  clear(): void {
    this.inputRef.nativeElement.value = ''
    this.selectionSubject
      .pipe(take(1))
      .subscribe((selection) => selection && selection.option.deselect())
    this.inputRef.nativeElement.focus()
    this.triggerRef.closePanel()
  }

  handleEnter(any: string) {
    if (!this.cancelEnter) {
      this.inputSubmited.emit(any)
      this.triggerRef.closePanel()
    }
  }
  handleSelection(event: MatAutocompleteSelectedEvent) {
    this.cancelEnter = true
    this.itemSelected.emit(event.option.value)
  }
}
