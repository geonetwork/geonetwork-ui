import { Component, Input, OnInit, Output } from '@angular/core'
import { IMyDateModel, IMyDpOptions } from 'mydatepicker'

@Component({
  selector: ' ui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent implements OnInit {
  @Input() options: IMyDpOptions
  @Input() currentDate: Date

  @Output()
  selectedDate: Date

  model: any

  onDateChanged(event: IMyDateModel) {
    console.log(
      'onDateChanged(): ',
      event.date,
      ' - jsdate: ',
      new Date(event.jsdate).toLocaleDateString(),
      ' - formatted: ',
      event.formatted,
      ' - epoc timestamp: ',
      event.epoc
    )
  }

  constructor() {}

  ngOnInit(): void {
    this.initializeDate(this.currentDate)
  }

  initializeDate(date: Date) {
    const sDate = date || new Date()
    this.model = {
      date: {
        year: sDate.getFullYear(),
        month: sDate.getMonth() + 1,
        day: sDate.getDate(),
      },
    }
  }
}
