import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import {
  first,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirSearch } from '@ng-icons/iconoir'
import { matClose } from '@ng-icons/material-icons/baseline'

export type AutocompleteItem = unknown

@Component({
  selector: 'gn-ui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PopupAlertComponent,
    MatAutocompleteModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirSearch,
      matClose,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class AutocompleteComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<AutocompleteItem[]>
  @Input() value?: AutocompleteItem
  @Input() clearOnSelection = false
  @Input() preventCompleteOnSelection = false
  @Input() autoFocus = false
  @Input() minCharacterCount? = 3
  // this will show a submit button next to the input; if false, a search icon will appear on the left
  @Input() allowSubmit = false
  @Output() itemSelected = new EventEmitter<AutocompleteItem>()
  @Output() inputSubmitted = new EventEmitter<string>()
  @Output() inputCleared = new EventEmitter<void>()
  @ViewChild(MatAutocompleteTrigger) triggerRef: MatAutocompleteTrigger
  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete
  @ViewChild('searchInput') inputRef: ElementRef<HTMLInputElement>

  searching: boolean
  control = new UntypedFormControl()
  cancelEnter = true
  selectionSubject = new ReplaySubject<MatAutocompleteSelectedEvent>(1)
  lastInputValue$ = new ReplaySubject<string>(1)
  error: string | null = null
  suggestions$: Observable<AutocompleteItem[]>
  subscription = new Subscription()
  clearSuggestions$ = new Subject<void>()

  @Input() displayWithFn: (item: AutocompleteItem) => string = (item) =>
    item.toString()

  displayWithFnInternal = (item?: AutocompleteItem) => {
    if (item === null || item === undefined) return null
    return this.displayWithFn(item)
  }

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes
    if (value) {
      const previousTextValue = this.displayWithFnInternal(value.previousValue)
      const currentTextValue = this.displayWithFnInternal(value.currentValue)
      if (previousTextValue !== currentTextValue) {
        this.updateInputValue(value.currentValue)
      }
    }
  }

  ngOnInit(): void {
    const newValue$ = merge(
      of(''),
      this.inputCleared.pipe(map(() => '')),
      this.control.valueChanges.pipe(
        filter((value) => typeof value === 'string'),
        debounceTime(400)
      )
    )

    // this observable emits arrays of suggestions loaded using the given action
    const suggestionsFromAction = newValue$.pipe(
      switchMap((value: string) => {
        if (value.length === 0) {
          return of([]) // Emit an empty array for an empty value
        } else if (value.length >= this.minCharacterCount) {
          return merge(
            of(value),
            this.control.valueChanges.pipe(
              filter(
                (controlValue) =>
                  typeof controlValue === 'object' && controlValue.title
              ),
              map((item) => item.title)
            )
          ).pipe(
            takeUntil(this.clearSuggestions$), // Stop emitting when suggestions are cleared
            switchMap((title) =>
              this.action(title).pipe(
                catchError((error: Error) => {
                  this.error = error.message
                  return of([])
                }),
                finalize(() => (this.searching = false))
              )
            )
          )
        } else {
          return of([])
        }
      }),
      tap(() => {
        this.searching = true
        this.error = null
      })
    )

    this.suggestions$ = merge(
      this.clearSuggestions$.pipe(map(() => [])), // Clearing has the highest priority
      suggestionsFromAction,
      newValue$.pipe(
        filter((value: string) => value.length < this.minCharacterCount),
        map(() => [])
      )
    )

    // close the panel whenever suggestions are cleared
    this.subscription.add(
      this.suggestions$
        .pipe(filter((suggestions) => suggestions.length === 0))
        .subscribe(() => {
          this.triggerRef?.closePanel()
        })
    )

    this.subscription.add(
      this.control.valueChanges.subscribe((any) => {
        if (any !== '') {
          this.cancelEnter = false
        }
      })
    )

    this.control.valueChanges
      .pipe(filter((value) => typeof value === 'string'))
      .subscribe(this.lastInputValue$)
  }

  ngAfterViewInit(): void {
    this.autocomplete.optionSelected.subscribe(this.selectionSubject)
    if (this.autoFocus) {
      this.inputRef.nativeElement.focus()
      this.cdRef.detectChanges()
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  updateInputValue(value: AutocompleteItem) {
    if (value) {
      this.control.setValue(value)
    }
    if (this.inputRef) {
      this.inputRef.nativeElement.value = (value as any)?.title || ''
    }
    if (this.clearOnSelection) {
      this.clearSuggestions$.next()
    }
  }

  clear(): void {
    this.inputRef.nativeElement.value = ''
    this.inputCleared.emit()
    this.clearSuggestions$.next()
    this.selectionSubject
      .pipe(take(1))
      .subscribe((selection) => selection && selection.option.deselect())
    this.inputRef.nativeElement.focus()
  }

  handleEnter(any: string) {
    if (!this.cancelEnter && this.allowSubmit) {
      this.inputSubmitted.emit(any)
    }
  }

  handleClickSearch() {
    this.inputSubmitted.emit(this.inputRef.nativeElement.value)
  }

  /**
   * This function is triggered when an item is selected in the list of displayed items.
   * If preventCompleteOnSelection is true then the input will be left as entered by the user.
   * If preventCompleteOnSelection is false (by default) then the input will be completed with the item selected by the user.
   * If clearOnSelection is true then the input will be cleared upon selection.
   * @param event
   */
  handleSelection(event: MatAutocompleteSelectedEvent) {
    this.cancelEnter = true
    this.itemSelected.emit(event.option.value)
    if (this.preventCompleteOnSelection) {
      this.lastInputValue$.pipe(first()).subscribe((lastInputValue) => {
        this.inputRef.nativeElement.value = lastInputValue
      })
    }
    if (this.clearOnSelection) {
      this.clear()
    }
  }
}
