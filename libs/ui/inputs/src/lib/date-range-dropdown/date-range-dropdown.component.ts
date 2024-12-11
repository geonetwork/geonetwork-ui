import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ButtonComponent } from '../button/button.component'
import { OverlayContainer } from '@angular/cdk/overlay'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matExpandLess, matExpandMore } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-date-range-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    MatNativeDateModule,
    MatDatepickerModule,
    ButtonComponent,
  ],
  providers: [
    provideIcons({
      matExpandMore,
      matExpandLess,
    }),
  ],
  templateUrl: './date-range-dropdown.component.html',
  styleUrls: ['./date-range-dropdown.component.css'],
})
export class DateRangeDropdownComponent implements AfterViewChecked {
  @Input() title: string
  @Input() startDate: Date
  @Input() endDate: Date
  @Output() startDateChange = new EventEmitter<Date>()
  @Output() endDateChange = new EventEmitter<Date>()

  @ViewChild('picker') picker: ElementRef
  isPickerDisplayed = false

  constructor(
    private overlayContainer: OverlayContainer,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    this.checkPickerOverlay()
  }

  checkPickerOverlay() {
    const overlayContainerElement = this.overlayContainer.getContainerElement()
    this.isPickerDisplayed =
      overlayContainerElement.querySelector('.mat-datepicker-content') !== null
    this.cdr.detectChanges()
  }
}
