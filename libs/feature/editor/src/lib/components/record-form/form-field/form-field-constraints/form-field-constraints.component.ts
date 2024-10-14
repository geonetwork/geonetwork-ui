import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { ConstraintCardComponent } from '../../../constraint-card/constraint-card.component'

type ConstraintChoice = 'legal' | 'security' | 'other'

const NOT_APPLICABLE_CONSTRAINT = marker(
  'editor.record.form.constraint.not-applicable'
)
const NOT_KNOWN_CONSTRAINT = marker('editor.record.form.constraint.not-known')

@Component({
  selector: 'gn-ui-form-field-constraints',
  standalone: true,
  imports: [
    CommonModule,
    SortableListComponent,
    ButtonComponent,
    CheckToggleComponent,
    MatIconModule,
    TranslateModule,
    ConstraintCardComponent,
  ],
  templateUrl: './form-field-constraints.component.html',
  styleUrls: ['./form-field-constraints.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldConstraintsComponent implements OnInit {
  @Input() label: string
  @Input() recordConstraints: Constraint[] = []
  @Output() recordConstraintsChange: EventEmitter<Constraint[]> =
    new EventEmitter()

  toggleApplicableConstraint = false
  toggleKnownConstraint = false

  constraintChoices: ConstraintChoice[] = ['legal', 'security', 'other']

  constraintSectionsToDisplay: ConstraintChoice[] = []

  ngOnInit(): void {
    // check if the constraints contain the 'not applicable' constraint
    // check if the constraints contain the 'not known' constraint
    this.toggleApplicableConstraint = !!this.recordConstraints.find(
      (constraint) => constraint.text === NOT_APPLICABLE_CONSTRAINT
    )
    this.toggleKnownConstraint = !!this.recordConstraints.find(
      (constraint) => constraint.text === NOT_KNOWN_CONSTRAINT
    )

    console.log('!!!!!!!!!!!!!!!!!!!')
    console.log('this.recordConstraints', this.recordConstraints)
  }

  onToggleChange(toggleName: string) {
    if (toggleName === 'toggleApplicableConstraint') {
      this.toggleApplicableConstraint = !this.toggleApplicableConstraint

      if (this.toggleApplicableConstraint) {
        this.toggleKnownConstraint = false // if toggleApplicableConstraint is turned on, toggleKnownConstraint must be off

        this.addConstraintToRecord(NOT_APPLICABLE_CONSTRAINT)
        this.removeConstraintFromRecord(NOT_KNOWN_CONSTRAINT)
      } else {
        // if only toggle is turned off, remove the constraint
        this.removeConstraintFromRecord(NOT_APPLICABLE_CONSTRAINT)
      }
    } else if (toggleName === 'toggleKnownConstraint') {
      this.toggleKnownConstraint = !this.toggleKnownConstraint

      if (this.toggleKnownConstraint) {
        this.toggleApplicableConstraint = false // if toggleKnownConstraint is turned on, toggleApplicableConstraint must be off

        this.addConstraintToRecord(NOT_KNOWN_CONSTRAINT)
        this.removeConstraintFromRecord(NOT_APPLICABLE_CONSTRAINT)
      } else {
        // if only toggle is turned off, remove the constraint
        this.removeConstraintFromRecord(NOT_KNOWN_CONSTRAINT)
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
