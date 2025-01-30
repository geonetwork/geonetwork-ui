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

  selectedLicence: string

  ngOnInit(): void {
    // get the licence from the record constraints if it is one of the open data licence list
    this.selectedLicence = this.recordLicences.find((constraint) => {
      return this.licenceOptions.find((licence) => {
        return licence.value === constraint.text
      })
    })?.text
    // otherwise pre-select the first licence option
    if (this.selectedLicence === undefined) {
      this.selectedLicence = this.licenceOptions[0].value // cannot select 'etalab' as default as this would toggle the OpenData Toggle
      this.recordLicencesChange.emit([{ text: this.selectedLicence }])
    }
  }

  get licenceOptions(): Licence[] {
    return AVAILABLE_LICENSES.map((license) => ({
      label: marker(`editor.record.form.license.${license}`),
      value: license,
    }))
  }

  handleLicenceSelection(licenceValue: string) {
    this.selectedLicence = licenceValue
    this.recordLicencesChange.emit([{ text: licenceValue }])
  }
}
