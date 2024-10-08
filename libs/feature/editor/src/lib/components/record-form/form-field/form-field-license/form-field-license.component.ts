import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import {
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { ConstraintCardComponent } from '../../../constraint-card/constraint-card.component'
import { OPEN_DATA_LICENSES } from '../../../../fields.config'

type ConstraintChoice = 'legal' | 'security' | 'other'
type Licence = {
  label: string
  value: string
}

const NOT_APPLICABLE_CONSTRAINT = marker(
  'editor.record.form.constraint.not-applicable'
)
const NOT_KNOWN_CONSTRAINT = marker('editor.record.form.constraint.not-known')

@Component({
  selector: 'gn-ui-form-field-license',
  templateUrl: './form-field-license.component.html',
  styleUrls: ['./form-field-license.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DropdownSelectorComponent,
    UiInputsModule,
    TranslateModule,
    CommonModule,
    SortableListComponent,
    MatIconModule,
    ConstraintCardComponent,
  ],
})
export class FormFieldLicenseComponent {
  @Input() label: string
  @Input() recordConstraints: Constraint[] = []
  @Output() recordConstraintsChange: EventEmitter<Constraint[]> =
    new EventEmitter()

  toggleApplicableConstraint = false
  toggleKnownConstraint = false

  constraintChoices: ConstraintChoice[] = ['legal', 'security', 'other']

  constraintSectionsToDisplay: ConstraintChoice[] = []

  selectedLicence = this.recordConstraints.find((constraint) =>
    this.licenceOptions.find((licence) => licence.value === constraint.text)
  )?.text // get the licence from the record constraints if it is one of the open data licence list

  handleLicenceSelection(licenceValue: string) {
    this.selectedLicence = licenceValue
    this.recordConstraintsChange.emit([{ text: licenceValue }])
    console.log('this.recordConstraints', this.recordConstraints)
  }

  get licenceOptions(): Licence[] {
    return OPEN_DATA_LICENSES.map((license) => ({
      label: marker(`editor.record.form.license.${license}`),
      value: license,
    }))
  }

  onToggleChange(toggleName: string) {
    if (toggleName === 'toggleApplicableConstraint') {
      this.toggleApplicableConstraint = !this.toggleApplicableConstraint

      if (this.toggleApplicableConstraint) {
        this.toggleKnownConstraint = false // if toggleApplicableConstraint is turned on, toggleKnownConstraint must be off

        this.addConstraintToRecord(NOT_APPLICABLE_CONSTRAINT)
        this.removeConstraintFromRecord(NOT_KNOWN_CONSTRAINT)
      }
    } else if (toggleName === 'toggleKnownConstraint') {
      this.toggleKnownConstraint = !this.toggleKnownConstraint

      if (this.toggleKnownConstraint) {
        this.toggleApplicableConstraint = false // if toggleKnownConstraint is turned on, toggleApplicableConstraint must be off

        this.addConstraintToRecord(NOT_KNOWN_CONSTRAINT)
        this.removeConstraintFromRecord(NOT_APPLICABLE_CONSTRAINT)
      }
    }
  }

  addConstraintToRecord(constraintText: string) {
    if (
      !this.recordConstraints.find(
        (constraint) => constraint.text === constraintText
      )
    ) {
      this.recordConstraints.push({ text: constraintText })
      this.recordConstraintsChange.emit(this.recordConstraints)
    }
    console.log('this.recordConstraints', this.recordConstraints)
  }

  removeConstraintFromRecord(constraintText: string) {
    this.recordConstraints = this.recordConstraints.filter(
      (constraint) => constraint.text !== constraintText
    )
    this.recordConstraintsChange.emit(this.recordConstraints)
    console.log('this.recordConstraints', this.recordConstraints)
  }

  addConstraintToDisplay(constraintToAdd: ConstraintChoice) {
    if (!this.constraintSectionsToDisplay.includes(constraintToAdd)) {
      this.constraintSectionsToDisplay.push(constraintToAdd)
    }
  }

  removeConstraintToDisplay(constraintToRemove: ConstraintChoice) {
    if (this.constraintSectionsToDisplay.includes(constraintToRemove)) {
      this.constraintSectionsToDisplay =
        this.constraintSectionsToDisplay.filter(
          (constraint) => constraint !== constraintToRemove
        )
    }
  }

  isConstraintSectionDisabled(constraintChoice: ConstraintChoice) {
    return this.constraintSectionsToDisplay.includes(constraintChoice)
  }

  handleConstraintsOrderChange(
    items: unknown[],
    constraintChoice: ConstraintChoice
  ) {
    const constraints = items as Constraint[]

    this.removeConstraintToDisplay(constraintChoice)

    console.log('constraints', constraints)
    console.log('constraintChoice', constraintChoice)

    // emit value change to the form
  }
}
