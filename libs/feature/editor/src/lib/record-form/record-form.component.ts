import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/metadata-converter'
import { FormFieldConfig } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFormComponent {
  @Input() record: CatalogRecord
  @Input() fieldsConfig: FormFieldConfig[] = [
    {
      model: 'title',
      labelKey: 'Metadata title',
      type: 'text',
    },
    {
      model: 'abstract',
      labelKey: 'Abstract',
      type: 'rich',
    },
    {
      model: 'uniqueIdentifier',
      labelKey: 'Unique identifier',
      type: 'text',
      locked: true,
    },
  ]
}
