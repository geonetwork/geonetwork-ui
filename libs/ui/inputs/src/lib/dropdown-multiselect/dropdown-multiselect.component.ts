import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import {
  CdkOverlayOrigin,
  ConnectedPosition,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'

interface Choice {
  value: unknown
  label: string
}

@Component({
  selector: 'gn-ui-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styleUrls: ['./dropdown-multiselect.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMultiselectComponent {
  @Input() title: string
  @Input() choices: Choice[]
  @Input() selected: unknown[]
  @Input() allowSearch = true
  @Input() maxRows: number
  @Output() selectValues = new EventEmitter<unknown[]>()
  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin
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

  constructor(private scrollStrategies: ScrollStrategyOptions) {}

  openOverlay() {
    this.overlayWidth =
      this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect()
        .width + 'px'
    this.overlayMaxHeight = this.maxRows
      ? `${this.maxRows * 32.5 + 18}px`
      : 'none'
    this.overlayOpen = true
  }
  closeOverlay() {
    this.overlayOpen = false
  }
  toggleOverlay() {
    this.overlayOpen = !this.overlayOpen
  }
  handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.code
    const isArrowKey =
      keyCode === 'ArrowDown' ||
      keyCode === 'ArrowUp' ||
      keyCode === 'ArrowLeft' ||
      keyCode === 'ArrowRight'
    const isOpenKey = keyCode === 'Enter' || keyCode === 'Space'
    if (isArrowKey || isOpenKey) {
      event.preventDefault() // prevents the page from scrolling down when pressing space
      this.toggleOverlay()
    }
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
}
