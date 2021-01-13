import { Component, Input, OnInit } from '@angular/core'
import { IMyDpOptions, IMyMonthLabels } from 'mydatepicker'
import { forkJoin, from, Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'

export enum FormFieldType {
  TEXT,
  TEXT_AREA,
  CHIPS,
  DATA_PICKER,
  DROPDOWN,
}

const MONTH_OF_THE_YEAR = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

export interface FormFieldConfig {
  label: string
  icon: string
  type: FormFieldType
}

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent implements OnInit {
  @Input() config: FormFieldConfig

  datepickerOptions: IMyDpOptions = (this.datepickerOptions = {
    dateFormat: 'dd mmm yyyy',
  })

  spatialResolutionList = [
    { value: '10000', label: '1:10000' },
    { value: '25000', label: '1:25000' },
    { value: '50000', label: '1:50000' },
    { value: '100000', label: '1:100000' },
  ]

  getUrl(text): string {
    return `https://apps.titellus.net/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.place.regions&rows=200&q=${text}&uri=*QUERY*&lang=eng`
  }

  get formFieldConfig(): typeof FormFieldType {
    return FormFieldType
  }

  constructor(private translateService: TranslateService) {
    this.translateMonthLabels().subscribe((monthLabels) => {
      this.datepickerOptions = {
        todayBtnTxt: 'Today',
        markCurrentDay: true,
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        showTodayBtn: false,
        height: '100%',
        selectorHeight: '100%',
        monthLabels: monthLabels,
      }
    })
  }

  ngOnInit(): void {}

  translateMonthLabels(): Observable<IMyMonthLabels> {
    return new Observable<IMyMonthLabels>((result) => {
      const monthLabels = {}
      const monthTitleObs = []
      MONTH_OF_THE_YEAR.forEach((m) => {
        monthTitleObs.push(this.translateService.get(`datafeeder.month.${m}`))
      })

      forkJoin(monthTitleObs).subscribe((mLabel) => {
        mLabel.forEach((title, index) => (monthLabels[`${index + 1}`] = title))
        result.next(monthLabels)
        result.complete()
      })
    })
  }
}
