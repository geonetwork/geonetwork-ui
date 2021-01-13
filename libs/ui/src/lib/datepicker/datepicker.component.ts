import {Component, Input, OnInit} from '@angular/core'
import {IMyDateModel, IMyDpOptions} from 'mydatepicker'

@Component({
  selector: 'ui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Input() options: IMyDpOptions

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ',
      event.formatted, ' - epoc timestamp: ', event.epoc)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
