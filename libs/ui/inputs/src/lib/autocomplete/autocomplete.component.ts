import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { UntypedFormControl } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { merge, Observable, of, ReplaySubject, Subscription } from 'rxjs'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  first,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators'

export type AutocompleteItem = unknown

@Component({
  selector: 'gn-ui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<AutocompleteItem[]>
  @Input() value?: AutocompleteItem
  @Input() clearOnSelection = false
  @Output() itemSelected = new EventEmitter<AutocompleteItem>()
  @Output() inputSubmitted = new EventEmitter<string>()
  @ViewChild(MatAutocompleteTrigger) triggerRef: MatAutocompleteTrigger
  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete
  @ViewChild('searchInput') inputRef: ElementRef<HTMLInputElement>

  searching: boolean
  suggestions$: Observable<AutocompleteItem[]>
  control = new UntypedFormControl()
  subscription = new Subscription()
  cancelEnter = true
  selectionSubject = new ReplaySubject<MatAutocompleteSelectedEvent>(1)
  lastInputValue$ = new ReplaySubject<string>(1)
  error: string | null = null

  @Input() displayWithFn: (AutocompleteItem) => string = (item) => item

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes
    if (value) {
      const previousTextValue = this.displayWithFn(value.previousValue)
      const currentTextValue = this.displayWithFn(value.currentValue)
      if (previousTextValue !== currentTextValue) {
        this.updateInputValue(value.currentValue)
      }
    }
  }

  ngOnInit(): void {
    this.suggestions$ = merge(
      this.control.valueChanges.pipe(
        filter((value) => typeof value === 'string'),
        filter((value: string) => value.length > 2),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => (this.searching = true))
      ),
      this.control.valueChanges.pipe(
        filter((value) => typeof value === 'object' && value.title),
        map((item) => item.title)
      )
    ).pipe(
      switchMap((value) => (value ? this.action(value) : of([]))),
      catchError((error: Error) => {
        this.error = error.message
        return of([])
      }),
      finalize(() => (this.searching = false))
    )

    this.subscription = this.control.valueChanges.subscribe((any) => {
      if (any !== '') {
        this.cancelEnter = false
      }
    })
    this.control.valueChanges
      .pipe(filter((value) => typeof value === 'string'))
      .subscribe(this.lastInputValue$)
  }

  ngAfterViewInit(): void {
    this.autocomplete.optionSelected.subscribe(this.selectionSubject)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  updateInputValue(value: AutocompleteItem) {
    if (value) {
      this.control.setValue(value)
    }
    if (this.inputRef) {
      this.inputRef.nativeElement.value = (value as any)?.title || ''
    }
  }

  clear(): void {
    this.inputRef.nativeElement.value = ''
    this.inputSubmitted.emit('')
    this.selectionSubject
      .pipe(take(1))
      .subscribe((selection) => selection && selection.option.deselect())
    this.inputRef.nativeElement.focus()
    this.triggerRef.closePanel()
  }

  handleEnter(any: string) {
    if (!this.cancelEnter) {
      this.inputSubmitted.emit(any)
      this.triggerRef.closePanel()
    }
  }

  handleClickSearch() {
    this.inputSubmitted.emit(this.inputRef.nativeElement.value)
    this.triggerRef.closePanel()
  }

  handleSelection(event: MatAutocompleteSelectedEvent) {
    this.cancelEnter = true
    this.itemSelected.emit(event.option.value)
    if (this.clearOnSelection) {
      this.lastInputValue$.pipe(first()).subscribe((any) => {
        this.inputRef.nativeElement.value = any
      })
    }
  }
}
