import { Component, Input, OnInit } from '@angular/core'
import {IMyDpOptions} from 'mydatepicker'

export enum FormFieldType {
  TEXT,
  TEXT_AREA,
  CHIPS,
  DATA_PICKER,
  DROPDOWN
}

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

  datepickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd mmm yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    showTodayBtn: false,
    height: '100%',
    selectorHeight: '100%'
  }

  spatialResolutionList = [
    {value: '10000', label: '1:10000'},
    {value: '25000', label: '1:25000'},
    {value: '50000', label: '1:50000'},
    {value: '100000', label: '1:100000'}
  ]

  getUrl(text): string {
    return `https://apps.titellus.net/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.place.regions&rows=200&q=${text}&uri=*QUERY*&lang=eng`
  }

  get formFieldConfig(): typeof FormFieldType {
    return FormFieldType
  }

  constructor() {}

  ngOnInit(): void {}
}
