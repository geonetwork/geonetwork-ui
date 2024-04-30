import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-form-field-license',
  templateUrl: './form-field-license.component.html',
  styleUrls: ['./form-field-license.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DropdownSelectorComponent],
})
export class FormFieldLicenseComponent {
  @Input() control!: FormControl
  @Input() label: string

  get selected() {
    return this.control.value[0]?.text
  }

  onSelectValue(value: unknown) {
    this.control.setValue([{ text: value }])
  }

  choices = [
    {
      value: 'cc-by',
      label: marker('editor.record.form.license.cc-by'),
    },
    {
      value: 'cc-by-sa',
      label: marker('editor.record.form.license.cc-by-sa'),
    },
    {
      value: 'cc-zero',
      label: marker('editor.record.form.license.cc-zero'),
    },
    {
      value: 'etalab',
      label: marker('editor.record.form.license.etalab'),
    },
    {
      value: 'etalab-v2',
      label: marker('editor.record.form.license.etalab-v2'),
    },
    {
      value: 'odbl',
      label: marker('editor.record.form.license.odbl'),
    },
    {
      value: 'odc-by',
      label: marker('editor.record.form.license.odc-by'),
    },
    {
      value: 'pddl',
      label: marker('editor.record.form.license.pddl'),
    },
    {
      value: 'unknown',
      label: marker('editor.record.form.license.unknown'),
    },
  ]
}
