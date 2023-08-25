import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Choice } from '../dropdown-multiselect/dropdown-multiselect.model'

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
  }

  closeOverlay() {
    this.overlayOpen = false
  }
}
