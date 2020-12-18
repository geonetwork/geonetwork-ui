import { Component, OnInit } from '@angular/core'
import { FormFieldType } from '../../components/form-field/form-field.component'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('datafeeder.form.datasetTitle')

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
})
export class FormsPageComponent implements OnInit {
  config = {
    id: 'title',
    label: 'datafeeder.form.title',
    icon: 'icon-title',
    type: FormFieldType.TEXT,
  }

  constructor() {}

  ngOnInit(): void {}
}
