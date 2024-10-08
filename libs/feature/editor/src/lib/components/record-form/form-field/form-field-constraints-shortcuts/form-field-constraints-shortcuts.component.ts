import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorFacade } from '../../../../+state/editor.facade'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { combineLatest, map, Observable } from 'rxjs'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('editor.record.form.constraint.legalConstraints')
marker('editor.record.form.constraint.securityConstraints')
marker('editor.record.form.constraint.otherConstraints')

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

  securityConstraints$ = this.editorFacade.record$.pipe(
    map((record) =>
      'securityConstraints' in record ? record?.securityConstraints : []
    )
  )

  otherConstraints$ = this.editorFacade.record$.pipe(
    map((record) =>
      'otherConstraints' in record ? record?.otherConstraints : []
    )
  )
  toggleApplicableConstraint = false
  toggleKnownConstraint = false

  constraintButtonChoices: ConstraintChoice[] = [
    'legalConstraints',
    'securityConstraints',
    'otherConstraints',
  ]
  constraintSectionsToDisplay$: Observable<ConstraintChoice[]>

  ngOnInit(): void {
    // check if toggle needs to be turned on based on existing constraints in legalConstraints
    this.legalConstraints$.subscribe((constraints) => {
      if (
        constraints.find(
          (constraint) => constraint.text === NOT_APPLICABLE_CONSTRAINT
        )
      ) {
        this.toggleApplicableConstraint = true

        this.hideAllConstraintSections()
      } else if (
        constraints.find(
          (constraint) => constraint.text === NOT_KNOWN_CONSTRAINT
        )
      ) {
        this.toggleKnownConstraint = true

        this.hideAllConstraintSections()
      }
    })

    // if constraint of one type is already present in the record, make the button for that type disabled
    this.handleConstraintSectionsToDisplay()
  }

  handleConstraintSectionsToDisplay() {
    this.constraintSectionsToDisplay$ = combineLatest([
      this.legalConstraints$,
      this.securityConstraints$,
      this.otherConstraints$,
    ]).pipe(
      map(([legalConstraints, securityConstraints, otherConstraints]) => {
        const constraints = [
          {
            type: 'legalConstraints' as ConstraintChoice,
            data: legalConstraints,
          },
          {
            type: 'securityConstraints' as ConstraintChoice,
            data: securityConstraints,
          },
          {
            type: 'otherConstraints' as ConstraintChoice,
            data: otherConstraints,
          },
        ]

        const constraintSectionsToDisplay = constraints
          .filter(({ data }) => data.length > 0)
          .map(({ type }) => {
            this.editorFacade.setFieldVisibility({ model: type }, true)
            return type
          })

        // Set field visibility to false for constraints with no data
        constraints
          .filter(({ data }) => data.length === 0)
          .forEach(({ type }) => {
            this.editorFacade.setFieldVisibility({ model: type }, false)
          })

        return constraintSectionsToDisplay
      })
    )
  }

  hideAllConstraintSections() {
    this.editorFacade.setFieldVisibility({ model: 'legalConstraints' }, false)
    this.editorFacade.setFieldVisibility(
      { model: 'securityConstraints' },
      false
    )
    this.editorFacade.setFieldVisibility({ model: 'otherConstraints' }, false)
  }

  showSpecificConstraintsTextAreas(constraintSection: ConstraintChoice) {
    this.editorFacade.setFieldVisibility({ model: constraintSection }, true)
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
        this.hideAllConstraintSections()
      } else {
        // if only toggle is turned off, remove the constraint
        this.editorFacade.updateRecordField('legalConstraints', []) //remove all legal constraints
        // TODO: show the constraint sections that are already present in the record
      }
    } else if (toggleName === 'toggleKnownConstraint') {
      this.toggleKnownConstraint = !this.toggleKnownConstraint

      if (this.toggleKnownConstraint) {
        this.toggleApplicableConstraint = false // if toggleKnownConstraint is turned on, toggleApplicableConstraint must be off

        this.editorFacade.updateRecordField('legalConstraints', [
          { text: NOT_KNOWN_CONSTRAINT },
        ])
        this.hideAllConstraintSections()
      } else {
        // if only toggle is turned off, remove the constraint
        this.editorFacade.updateRecordField('legalConstraints', []) //remove all legal constraints
        // TODO: show the constraint sections that are already present in the record
      }
    }
  }

  isConstraintButtonDisabled$(
    constraintSection: ConstraintChoice
  ): Observable<boolean> {
    return this.constraintSectionsToDisplay$.pipe(
      map((constraintSectionsToDisplay) => {
        if (constraintSectionsToDisplay.includes(constraintSection)) {
          this.editorFacade.setFieldVisibility(
            { model: constraintSection },
            true
          )
        }
        return constraintSectionsToDisplay.includes(constraintSection)
      })
    )
  }

  addConstraintSectionToDisplay(constraintSection: ConstraintChoice) {
    this.editorFacade.updateRecordField(constraintSection, [{ text: '' }])
    this.editorFacade.setFieldVisibility({ model: constraintSection }, true)
  }
}
