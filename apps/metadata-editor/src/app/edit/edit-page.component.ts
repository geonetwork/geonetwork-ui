import { Component } from '@angular/core'
import { FormFieldConfig } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'md-editor-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent {
  config: Array<FormFieldConfig> = [
    {
      labelKey: 'Metadata title',
      type: 'text',
    },
    {
      labelKey: 'Abstract',
      type: 'rich',
    },
    {
      labelKey: 'Unique identifier',
      type: 'text',
      locked: true,
    },
  ]
}
