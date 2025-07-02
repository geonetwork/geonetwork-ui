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
import { first, merge, Observable, of, ReplaySubject, Subscription } from 'rxjs'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirLongArrowDownLeft, iconoirSearch } from '@ng-icons/iconoir'
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
    TranslateDirective,
    ReactiveFormsModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirSearch,
      matClose,
      iconoirLongArrowDownLeft,
    }),
    provideNgIconsConfig({
      size: '1.75rem',
    }),
  ],
})
export class AutocompleteComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() placeholder: string
  @Input() enterButton = false
  @Input() action: (value: string) => Observable<AutocompleteItem[]>
  @Input() value?: AutocompleteItem
  @Input() clearOnSelection = false
  @Input() preventCompleteOnSelection = false
  @Input() autoFocus = false
  @Input() minCharacterCount? = 3
  // this will show a submit button next to the input; if false, a search icon will appear on the left
  @Input() allowSubmit = false
  @Input() forceTrackPosition = false
  @Output() itemSelected = new EventEmitter<AutocompleteItem>()
  @Output() inputSubmitted = new EventEmitter<string>()
  @Output() inputCleared = new EventEmitter<void>()
  @Output() isSearchActive = new EventEmitter<boolean>()
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
  private lastPosition: DOMRect | null = null
  private intervalIdPosition: number | undefined
  enterBtnPosition = 0
  searchActive = false

  @Input() displayWithFn: (item: AutocompleteItem) => string = (item) =>
    item.toString()

  get displayEnterBtn() {
    return this.enterButton && this.allowSubmit && !this.searchActive
  }

  displayWithFnInternal = (item?: AutocompleteItem) => {
    if (item === null || item === undefined) return null
    return this.displayWithFn(item)
  }

  getExtraClass(): string {
    if (this.allowSubmit) {
      if (this.enterButton) {
        return 'border rounded-lg absolute w-8 h-8 right-[calc(var(--icon-width)+var(--icon-padding))] inset-y-[--icon-padding]'
      } else {
        return 'border rounded-lg absolute w-8 h-8 right-[calc(var(--icon-width)+0.25*var(--icon-width))] inset-y-[calc(0.25*var(--icon-width))]'
      }
    } else {
      if (!this.enterButton) {
        return 'border rounded-lg absolute w-8 h-8 right-2 inset-y-2'
      }
    }
    return 'border rounded-lg absolute w-8 h-8'
  }

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes
    if (value) {
      const previousTextValue = this.displayWithFnInternal(value.previousValue)
      const currentTextValue = this.displayWithFnInternal(value.currentValue)
      if (previousTextValue !== currentTextValue) {
        if (currentTextValue) {
          this.searchActive = true
          this.isSearchActive.emit(true)
        } else {
          this.searchActive = false
          this.isSearchActive.emit(false)
        }
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
        distinctUntilChanged(),
        debounceTime(400)
      )
    )

    const externalValueChange$ = this.control.valueChanges.pipe(
      filter((value) => typeof value === 'object' && value.title),
      map((item) => item.title)
    )

    // this observable emits arrays of suggestions loaded using the given action
    const suggestionsFromAction = merge(
      newValue$.pipe(
        filter((value: string) => value.length >= this.minCharacterCount)
      ),
      externalValueChange$
    ).pipe(
      tap(() => {
        this.searching = true
        this.error = null
      }),
      switchMap((value) => this.action(value)),
      tap((suggestions) => {
        // forcing the panel to open if there are suggestions
        if (suggestions.length > 0 && !this.searchActive) {
          this.triggerRef?.openPanel()
        }
      }),
      catchError((error: Error) => {
        this.error = error.message
        return of([])
      }),
      finalize(() => (this.searching = false))
    )

    this.suggestions$ = merge(
      suggestionsFromAction,
      // if a new value is under the min char count, clear suggestions
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

    this.startTrackingPosition()
  }

  /**
   * !!! This function is used only for web component mode,
   * the autocomplete dropdown may not update its position
   * if the page or container is disabling wind scroll.
   */
  private trackPosition = () => {
    const dropdownOpened = this.triggerRef && this.triggerRef.panelOpen
    const rect = this.inputRef.nativeElement.getBoundingClientRect()

    if (
      dropdownOpened &&
      (!this.lastPosition ||
        rect.top !== this.lastPosition.top ||
        rect.left !== this.lastPosition.left)
    ) {
      this.triggerRef.updatePosition()
    }

    this.lastPosition = rect
    requestAnimationFrame(this.trackPosition)
  }

  /**
   * !!! This function is used only for web component mode,
   * the autocomplete dropdown may not update its position
   * if the page or container is disabling wind scroll.
   */
  startTrackingPosition() {
    if (this.forceTrackPosition) {
      requestAnimationFrame(this.trackPosition)
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()

    if (this.intervalIdPosition) {
      clearInterval(this.intervalIdPosition)
    }
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
    this.searchActive = false
    this.isSearchActive.emit(false)
    this.inputCleared.emit()
    this.selectionSubject
      .pipe(take(1))
      .subscribe((selection) => selection && selection.option.deselect())
    this.inputRef.nativeElement.focus()
  }

  handleSearch() {
    if (!this.cancelEnter && this.allowSubmit) {
      this.isSearchActive.emit(true)
      this.searchActive = true
      this.inputSubmitted.emit(this.inputRef.nativeElement.value)
    }
    this.triggerRef?.closePanel()
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
      return
    }
    if (this.clearOnSelection) {
      this.inputRef.nativeElement.value = ''
      this.control.setValue('')
    }
  }

  handleInput(event: InputEvent) {
    this.searchActive = false
    this.isSearchActive.emit(false)
    this.enterBtnPosition = event.target['value'].length * 8 + 80
  }
}
