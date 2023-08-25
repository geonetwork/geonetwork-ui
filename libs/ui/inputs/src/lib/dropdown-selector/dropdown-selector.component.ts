import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import { Choice } from '../dropdown-multiselect/dropdown-multiselect.model'
import { take } from 'rxjs/operators'

export type DDChoices = Array<{
  label: string
  value: string
}>

const DEFAULT_ROW_NUMBERS = 6

@Component({
  selector: 'gn-ui-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectorComponent implements OnInit {
  @Input() title: string
  @Input() showTitle = true
  @Input() ariaName: string
  @Input() choices: DDChoices
  @Input() selected: any
  @Input() maxRows: number
  @Input() extraBtnClass = ''
  @Input() minWidth = ''
  @Output() selectValue = new EventEmitter<any>()
  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin
  @ViewChild(CdkConnectedOverlay) overlay: CdkConnectedOverlay
  overlayOpen = false
  overlayWidth = 'auto'
  overlayMaxHeight = 'none'
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
  @ViewChildren('choiceInputs', { read: ElementRef })
  choiceInputs: QueryList<ElementRef>

  get selectedChoice(): Choice {
    return (
      this.choices.find((choice) => choice.value === this.selected) ??
      this.choices[0]
    )
  }

  get id() {
    return this.title.toLowerCase().replace(/[^a-z]+/g, '-')
  }

  getChoiceLabel(): string {
    return this.selectedChoice?.label
  }

  ngOnInit(): void {
    if (!this.maxRows) this.maxRows = DEFAULT_ROW_NUMBERS
    if (!this.choices || this.choices.length === 0) {
      this.choices = []
    }
  }

  isSelected(choice) {
    return choice === this.selectedChoice
  }

  onSelectValue(choice: Choice): void {
    this.closeOverlay()
    this.selected = choice.value
    this.selectValue.emit(this.selected)
  }

  openOverlay() {
    this.overlayWidth =
      this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect()
        .width + 'px'
    this.overlayMaxHeight = this.maxRows
      ? `${this.maxRows * 29 + 60}px`
      : 'none'
    this.overlayOpen = true
    return Promise.all([
      this.overlay.attach.pipe(take(1)).toPromise(),
      this.choiceInputs.changes.pipe(take(1)).toPromise(),
    ])
  }

  closeOverlay() {
    this.overlayOpen = false
  }

  focusFirstItem() {
    this.choiceInputs.get(0).nativeElement.focus()
  }

  focusLastItem() {
    this.choiceInputs.get(this.choiceInputs.length - 1).nativeElement.focus()
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
    const isCloseKey = keyCode === 'Escape'
    if (isOpenKey) {
      event.preventDefault()
      if (!this.overlayOpen) {
        await this.openOverlay()
      }
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
      this.shiftItemFocus(1)
    } else if (keyCode === 'ArrowLeft' || keyCode === 'ArrowUp') {
      event.preventDefault()
      this.shiftItemFocus(-1)
    } else if (keyCode === 'Escape') {
      this.closeOverlay()
    }
  }

  shiftItemFocus(shift: number) {
    const index = this.focusedIndex
    if (index === -1) return
    const max = this.choiceInputs.length
    // modulo, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
    const newIndex = (((index + shift) % max) + max) % max
    this.choiceInputs.get(newIndex).nativeElement.focus()
  }

  get focusedIndex(): number | -1 {
    return this.choiceInputs.reduce(
      (prev, curr, curIndex) =>
        curr.nativeElement === document.activeElement ? curIndex : prev,
      -1
    )
  }

  selectIfEnter(event: KeyboardEvent, choice: Choice) {
    if (event.code === 'Enter') {
      event.preventDefault()
      this.onSelectValue(choice)
    }
  }
}
