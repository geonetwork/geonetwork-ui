import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {
  // CdkConnectedOverlay,
  // CdkOverlayOrigin,
  ConnectedPosition,
  // Overlay,
  // ScrollStrategy,
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
  @Input() ariaName: string
  @Input() choices: Choice[]
  @Input() selected: unknown[]
  @Input() allowSearch = true
  @Output() selectValues = new EventEmitter<unknown[]>()

  private overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
  ]

  panelOpen = true

  attach() {}
  detach() {}
  handleKeyDown() {}

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
