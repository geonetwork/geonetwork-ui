import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { IMyDateModel, IMyDpOptions } from 'mydatepicker'

@Component({
  selector: ' ui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @Input() options: IMyDpOptions
  @Input() currentDate: Date

  @Output()
  selectedDate = new EventEmitter<Date>()

  model: any

  onDateChanged(event: IMyDateModel) {
    this.selectedDate.emit(new Date(event.jsdate))
  }

  constructor() {}

  ngOnInit(): void {
    this.initializeDate(this.currentDate)
  }

  initializeDate(date: Date) {
    this.model = {
     jsdate: date || new Date()
    }
  }

  ngAfterViewInit() {
    // to delay emit after parent viewinit completed
    setTimeout(() => this.selectedDate.emit(this.model.jsdate))
  }
}
