import { Component, Input, OnInit } from '@angular/core'

export enum FormFieldType {
  TEXT,
  TEXT_AREA,
  CHIPS,
  DATA_PICKER,
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

  get formFieldConfig(): typeof FormFieldType {
    return FormFieldType
  }

  constructor() {}

  ngOnInit(): void {}
}
