import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorFacade } from '../../../../+state/editor.facade'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { firstValueFrom, map } from 'rxjs'

export type ConstraintChoice =
  | 'legalConstraints'
  | 'securityConstraints'
  | 'otherConstraints'

const NOT_APPLICABLE_CONSTRAINT = 'editor.record.form.constraint.not-applicable'
const NOT_KNOWN_CONSTRAINT = 'editor.record.form.constraint.not-known'

@Component({
  selector: 'gn-ui-form-field-constraints-shortcuts',
  standalone: true,
  imports: [
    CommonModule,
    CheckToggleComponent,
    ButtonComponent,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './form-field-constraints-shortcuts.component.html',
  styleUrls: ['./form-field-constraints-shortcuts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldConstraintsShortcutsComponent implements OnInit {
  legalConstraints$ = this.editorFacade.record$.pipe(
    map((record) =>
      'legalConstraints' in record ? record?.legalConstraints : []
    )
  )

  toggleApplicableConstraint = false
  toggleKnownConstraint = false

  constraintButtonChoices: ConstraintChoice[] = [
    'legalConstraints',
    'securityConstraints',
    'otherConstraints',
  ]
  constraintSectionsToDisplay: ConstraintChoice[] = []

  ngOnInit(): void {
    // check if toggle needs to be turned on based on existing constraints in legalConstraints
    this.legalConstraints$.subscribe((constraints) => {
      console.log('constraints', constraints)
      if (
        constraints.find(
          (constraint) => constraint.text === NOT_APPLICABLE_CONSTRAINT
        )
      ) {
        this.toggleApplicableConstraint = true
      } else if (
        constraints.find(
          (constraint) => constraint.text === NOT_KNOWN_CONSTRAINT
        )
      ) {
        this.toggleKnownConstraint = true
      }
    })
  }

  constructor(private editorFacade: EditorFacade) {}

  onToggleChange(toggleName: string) {
    if (toggleName === 'toggleApplicableConstraint') {
      this.toggleApplicableConstraint = !this.toggleApplicableConstraint

      if (this.toggleApplicableConstraint) {
        this.toggleKnownConstraint = false // if toggleApplicableConstraint is turned on, toggleKnownConstraint must be off

        this.editorFacade.updateRecordField('legalConstraints', [
          { text: NOT_APPLICABLE_CONSTRAINT },
        ])
      } else {
        // if only toggle is turned off, remove the constraint
        // this.removeConstraintFromRecord(NOT_APPLICABLE_CONSTRAINT)
        this.editorFacade.updateRecordField('legalConstraints', []) //remove all legal constraints
      }
    } else if (toggleName === 'toggleKnownConstraint') {
      this.toggleKnownConstraint = !this.toggleKnownConstraint

      if (this.toggleKnownConstraint) {
        this.toggleApplicableConstraint = false // if toggleKnownConstraint is turned on, toggleApplicableConstraint must be off

        this.editorFacade.updateRecordField('legalConstraints', [
          { text: NOT_KNOWN_CONSTRAINT },
        ])
      } else {
        // if only toggle is turned off, remove the constraint
        // this.removeConstraintFromRecord(NOT_KNOWN_CONSTRAINT)
        this.editorFacade.updateRecordField('legalConstraints', []) //remove all legal constraints
      }
    }
  }

  isConstraintButtonDisabled(constraintSection: ConstraintChoice) {
    return this.constraintSectionsToDisplay.includes(constraintSection)
  }

  addConstraintSectionToDisplay(constraintSection: ConstraintChoice) {
    if (!this.constraintSectionsToDisplay.includes(constraintSection)) {
      this.constraintSectionsToDisplay.push(constraintSection)
    }
  }
}
