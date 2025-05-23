import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorFacade } from '../../../../+state/editor.facade'
import { ButtonComponent, CheckToggleComponent } from '@geonetwork-ui/ui/inputs'
import { TranslatePipe } from '@ngx-translate/core'
import {
  combineLatest,
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'
import {
  matchesNoApplicableConstraint,
  matchesNoKnownConstraint,
  NOT_APPLICABLE_CONSTRAINT,
  NOT_KNOWN_CONSTRAINT,
} from './constraints.utils'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirPlus } from '@ng-icons/iconoir'

marker('editor.record.form.constraint.legalConstraints')
marker('editor.record.form.constraint.securityConstraints')
marker('editor.record.form.constraint.otherConstraints')

export type ConstraintChoice =
  | 'legalConstraints'
  | 'securityConstraints'
  | 'otherConstraints'

/**
 * This component offers two toggles to easily define common constraints (no applicable constraint
 * and no known constraint) and shows and hides the various constraints fields accordingly using
 * the facade
 */
@Component({
  selector: 'gn-ui-form-field-constraints-shortcuts',
  standalone: true,
  imports: [
    CommonModule,
    CheckToggleComponent,
    ButtonComponent,
    TranslatePipe,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ iconoirPlus }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './form-field-constraints-shortcuts.component.html',
  styleUrls: ['./form-field-constraints-shortcuts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldConstraintsShortcutsComponent
  implements OnInit, OnDestroy
{
  legalConstraints$ = this.editorFacade.record$.pipe(
    map((record) => record?.legalConstraints ?? [])
  )
  securityConstraints$ = this.editorFacade.record$.pipe(
    map((record) => record?.securityConstraints ?? [])
  )
  otherConstraints$ = this.editorFacade.record$.pipe(
    map((record) => record?.otherConstraints ?? [])
  )

  noApplicableConstraint$: Observable<boolean> = this.legalConstraints$.pipe(
    map((constraints) =>
      constraints.some((constraint) =>
        matchesNoApplicableConstraint(constraint)
      )
    )
  )
  noKnownConstraint$: Observable<boolean> = this.legalConstraints$.pipe(
    map((constraints) =>
      constraints.some((constraint) => matchesNoKnownConstraint(constraint))
    )
  )
  anyToggleActivated$ = combineLatest([
    this.noApplicableConstraint$,
    this.noKnownConstraint$,
  ]).pipe(
    map(
      ([noApplicableConstraint, noKnownConstraint]) =>
        noApplicableConstraint || noKnownConstraint
    )
  )

  constraintButtonChoices: ConstraintChoice[] = [
    'legalConstraints',
    'securityConstraints',
    'otherConstraints',
  ]

  onDestroy$ = new Subject<void>()

  constructor(private editorFacade: EditorFacade) {}

  ngOnInit(): void {
    // hide all constraints if any toggle is activated
    this.anyToggleActivated$
      .pipe(takeUntil(this.onDestroy$), distinctUntilChanged())
      .subscribe((anyToggleActivated) => {
        if (anyToggleActivated) {
          this.hideAllConstraintSections()
        }
      })

    // also hide constraints which are empty arrays
    const hideEmptyConstraints = (
      constraints$: Observable<Constraint[]>,
      model: ConstraintChoice
    ) => {
      const isConstraintNotEmpty$ = constraints$.pipe(
        takeUntil(this.onDestroy$),
        map((c) => c.length > 0),
        distinctUntilChanged()
      )
      combineLatest([
        isConstraintNotEmpty$,
        this.anyToggleActivated$,
      ]).subscribe(([isNotEmpty, anyToggleActivated]) => {
        const visible = isNotEmpty && !anyToggleActivated
        this.editorFacade.setFieldVisibility({ model }, visible)
      })
    }
    hideEmptyConstraints(this.legalConstraints$, 'legalConstraints')
    hideEmptyConstraints(this.securityConstraints$, 'securityConstraints')
    hideEmptyConstraints(this.otherConstraints$, 'otherConstraints')
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }

  hideAllConstraintSections() {
    this.editorFacade.setFieldVisibility({ model: 'legalConstraints' }, false)
    this.editorFacade.setFieldVisibility(
      { model: 'securityConstraints' },
      false
    )
    this.editorFacade.setFieldVisibility({ model: 'otherConstraints' }, false)
  }

  async onToggleChange(
    toggleName: 'noApplicableConstraint' | 'noKnownConstraint',
    value: boolean
  ) {
    if (value) {
      const presetConstraint =
        toggleName === 'noApplicableConstraint'
          ? NOT_APPLICABLE_CONSTRAINT
          : NOT_KNOWN_CONSTRAINT
      this.editorFacade.updateRecordField('legalConstraints', [
        presetConstraint,
      ])
      this.hideAllConstraintSections()
    } else {
      const matcher =
        toggleName === 'noApplicableConstraint'
          ? matchesNoApplicableConstraint
          : matchesNoKnownConstraint
      // if the toggle is turned off, remove all matching constraints
      const constraints = await firstValueFrom(this.legalConstraints$)
      this.editorFacade.updateRecordField(
        'legalConstraints',
        constraints.filter((c) => !matcher(c))
      )
    }
  }

  isConstraintButtonDisabled$(
    constraintSection: ConstraintChoice
  ): Observable<boolean> {
    switch (constraintSection) {
      case 'legalConstraints':
        return this.legalConstraints$.pipe(
          map((constraints) => constraints.length > 0)
        )
      case 'securityConstraints':
        return this.securityConstraints$.pipe(
          map((constraints) => constraints.length > 0)
        )
      case 'otherConstraints':
        return this.otherConstraints$.pipe(
          map((constraints) => constraints.length > 0)
        )
    }
  }

  addConstraintSectionToDisplay(constraintSection: ConstraintChoice) {
    this.editorFacade.updateRecordField(constraintSection, [{ text: '' }])
    this.editorFacade.setFieldVisibility({ model: constraintSection }, true)
  }
}
