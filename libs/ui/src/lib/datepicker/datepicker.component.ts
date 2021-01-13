import { Component, Input, OnInit } from '@angular/core'
import { IMyDateModel, IMyDpOptions } from 'mydatepicker'

@Component({
  selector: ' ui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent implements OnInit {
  @Input() options: IMyDpOptions

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
    this.initializeDate()
  }

  initializeDate() {
    const date = new Date()
    this.model = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    }
  }
}
