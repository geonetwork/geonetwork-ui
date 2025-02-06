import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { AVAILABLE_LICENSES } from '../../../../fields.config'

type Licence = {
  label: string
  value: string
}

@Component({
  selector: 'gn-ui-form-field-license',
  templateUrl: './form-field-license.component.html',
  styleUrls: ['./form-field-license.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DropdownSelectorComponent],
})
export class FormFieldLicenseComponent implements OnInit {
  @Input() label: string
  @Input() recordLicences: Constraint[] = []
  @Output() recordLicencesChange: EventEmitter<Constraint[]> =
    new EventEmitter()

  choices: Licence[] = AVAILABLE_LICENSES.map((license) => ({
    label: marker(`editor.record.form.license.${license}`),
    value: license,
  }))

  selectedLicence: string

  ngOnInit(): void {
    if (this.recordLicences.length === 0) {
      this.selectedLicence = 'unknown'
    } else {
      this.selectedLicence = this.recordLicences.find((constraint) => {
        return this.choices.find((licence) => {
          return licence.value === constraint.text
        })
      })?.text
    }

    if (this.selectedLicence === undefined) {
      this.choices = [
        {
          value: this.recordLicences[0].text,
          label: this.recordLicences[0].text,
        },
        ...this.choices,
      ]
      this.selectedLicence = this.recordLicences[0].text
    }
  }

  handleLicenceSelection(licenceValue: string) {
    this.selectedLicence = licenceValue
    if (licenceValue === 'unknown') {
      this.recordLicencesChange.emit([])
      return
    } else {
      this.recordLicencesChange.emit([{ text: licenceValue }])
    }
  }
}
