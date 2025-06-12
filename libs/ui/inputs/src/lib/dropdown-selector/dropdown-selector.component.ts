import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayModule,
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
import { firstValueFrom } from 'rxjs'
import { DropdownChoice } from './dropdown-selector.model'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matExpandLess, matExpandMore } from '@ng-icons/material-icons/baseline'

const DEFAULT_ROW_NUMBERS = 6

@Component({
  selector: 'gn-ui-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    OverlayModule,
    TranslatePipe,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      matExpandLess,
      matExpandMore,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class DropdownSelectorComponent implements OnInit {
  @Input() title: string
  @Input() showTitle = true
  @Input() ariaName: string
  @Input() choices: Array<DropdownChoice>
  @Input() selected: DropdownChoice['value']
  @Input() maxRows: number
  @Input() extraBtnClass = ''
  @Input() minWidth = ''
  @Input() disabled: boolean
  @Output() selectValue = new EventEmitter<DropdownChoice['value']>()
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

  get selectedChoice(): DropdownChoice {
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

  isSelected(choice: DropdownChoice) {
    return choice === this.selectedChoice
  }

  onSelectValue(choice: DropdownChoice) {
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
      firstValueFrom(this.overlay.attach),
      firstValueFrom(this.choiceInputs.changes),
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

  selectIfEnter(event: KeyboardEvent, choice: DropdownChoice) {
    if (event.code === 'Enter') {
      event.preventDefault()
      this.onSelectValue(choice)
    }
  }
}
