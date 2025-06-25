import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayModule,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'
import { take } from 'rxjs/operators'
import { Choice } from './dropdown-multiselect.model'
import {
  createFuzzyFilter,
  propagateToDocumentOnly,
} from '@geonetwork-ui/util/shared'
import { ButtonComponent } from '../button/button.component'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { FormsModule } from '@angular/forms'
import { TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import {
  matClose,
  matExpandLess,
  matExpandMore,
} from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styleUrls: ['./dropdown-multiselect.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    NgIcon,
    OverlayModule,
    FormsModule,
    TranslatePipe,
  ],
  providers: [
    provideIcons({
      matClose,
      matExpandMore,
      matExpandLess,
    }),
  ],
  standalone: true,
})
export class DropdownMultiselectComponent {
  @Input() title: string
  @Input() choices: Choice[]
  @Input() selected: unknown[] = []
  @Input() allowSearch = true
  @Input() maxRows: number
  @Input() searchInputValue = ''
  @Output() selectValues = new EventEmitter<unknown[]>()
  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin
  @ViewChild(CdkConnectedOverlay) overlay: CdkConnectedOverlay
  @ViewChild('overlayContainer', { read: ElementRef })
  overlayContainer: ElementRef
  @ViewChild('searchFieldInput')
  searchFieldInput: ElementRef<HTMLInputElement>
  @ViewChildren('checkBox', { read: ElementRef })
  checkboxes: QueryList<ElementRef>
  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ]
  scrollStrategy = this.scrollStrategies.reposition()
  overlayOpen = false
  overlayWidth = 'auto'
  overlayMaxHeight = 'none'
  id = `dropdown-multiselect-${Math.floor(Math.random() * 10000)}`

  get hasSelectedChoices() {
    return this.selected.length > 0
  }

  get selectedChoices() {
    return this.choices.filter(
      (choice) => this.selected.indexOf(choice.value) > -1
    )
  }

  get filteredChoicesByText() {
    if (!this.searchInputValue) return this.choices
    const filter = createFuzzyFilter(this.searchInputValue)
    return this.choices.filter((choice) => filter(choice.label))
  }

  get focusedIndex(): number | -1 {
    return this.checkboxes.reduce(
      (prev, curr, curIndex) =>
        curr.nativeElement === document.activeElement ? curIndex : prev,
      -1
    )
  }

  constructor(private scrollStrategies: ScrollStrategyOptions) {}

  private setFocus() {
    setTimeout(() => {
      this.searchFieldInput.nativeElement.focus()
    }, 0)
  }

  openOverlay() {
    this.overlayWidth =
      this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect()
        .width + 'px'
    this.overlayMaxHeight = this.maxRows
      ? `${this.maxRows * 29 + 60}px`
      : 'none'
    this.overlayOpen = true
    this.setFocus()

    // this will wait for the checkboxes to be referenced and the overlay to be attached
    return Promise.all([
      this.overlay.attach.pipe(take(1)).toPromise(),
      this.checkboxes.changes.pipe(take(1)).toPromise(),
    ])
  }

  closeOverlay() {
    this.overlayOpen = false
  }

  async handleTriggerKeydown(event: KeyboardEvent) {
    const keyCode = event.code
    const isOpenKey =
      keyCode === 'ArrowDown' ||
      keyCode === 'ArrowUp' ||
      keyCode === 'ArrowLeft' ||
      keyCode === 'ArrowRight' ||
      keyCode === 'Enter' ||
      keyCode === 'Space'
    const isCloseKey = keyCode === 'Escape' || isOpenKey
    if (!this.overlayOpen && isOpenKey) {
      event.preventDefault()
      await this.openOverlay()
      if (keyCode === 'ArrowLeft' || keyCode === 'ArrowUp') this.focusLastItem()
      else this.focusFirstItem()
    } else if (this.overlayOpen && isCloseKey) {
      event.preventDefault()
      this.closeOverlay()
    }
  }

  handleOverlayKeydown(event: KeyboardEvent) {
    if (!this.overlayOpen) return
    const keyCode = event.code
    if (keyCode === 'ArrowDown' || keyCode === 'ArrowRight') {
      event.preventDefault()
      if (document.activeElement['type'] !== 'checkbox') {
        this.focusFirstItem()
      } else this.shiftItemFocus(1)
    } else if (keyCode === 'ArrowLeft' || keyCode === 'ArrowUp') {
      event.preventDefault()
      this.shiftItemFocus(-1)
    } else if (keyCode === 'Escape') {
      this.closeOverlay()
    }
  }

  focusFirstItem() {
    this.checkboxes.get(0).nativeElement.focus()
  }

  focusLastItem() {
    this.checkboxes.get(this.checkboxes.length - 1).nativeElement.focus()
  }

  shiftItemFocus(shift: number) {
    const index = this.focusedIndex
    if (index === -1) return
    const max = this.checkboxes.length
    // modulo, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
    const newIndex = (((index + shift) % max) + max) % max
    this.checkboxes.get(newIndex).nativeElement.focus()
  }

  isSelected(choice: Choice) {
    return this.selected.indexOf(choice.value) > -1
  }

  select(choice: Choice, selected: boolean) {
    this.selected = selected
      ? [...this.selected.filter((v) => v !== choice.value), choice.value]
      : this.selected.filter((v) => v !== choice.value)
    this.selectValues.emit(this.selected)
  }

  toggle(choice: Choice) {
    this.select(choice, !this.isSelected(choice))
  }

  clearSelection(event: Event) {
    this.selectValues.emit([])
    propagateToDocumentOnly(event)
  }

  clearSearchInputValue(event: Event) {
    this.searchInputValue = ''
    propagateToDocumentOnly(event)
    this.setFocus()
  }
}
