import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'
import { ConstraintCardComponent } from '../../../constraint-card/constraint-card.component'
import {
  CatalogRecordKeys,
  Constraint,
} from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'

marker('editor.record.form.constraint.add.legalConstraints')
marker('editor.record.form.constraint.add.securityConstraints')
marker('editor.record.form.constraint.add.otherConstraints')
marker('editor.record.form.constraint.header.legalConstraints')
marker('editor.record.form.constraint.header.securityConstraints')
marker('editor.record.form.constraint.header.otherConstraints')

@Component({
  selector: 'gn-ui-form-field-constraints',
  imports: [
    CommonModule,
    SortableListComponent,
    ConstraintCardComponent,
    UiInputsModule,
    ButtonComponent,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './form-field-constraints.component.html',
  styleUrls: ['./form-field-constraints.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormFieldConstraintsComponent implements OnInit {
  @Input() label: string
  @Input() value: Constraint[]
  @Input() constraintType: CatalogRecordKeys
  @Output() valueChange = new EventEmitter<Constraint[]>()

  constraintsHeader = ''
  additionalConstraintsButtonLabel = ''

  ngOnInit() {
    this.additionalConstraintsButtonLabel = `editor.record.form.constraint.add.${this.constraintType}`
    this.constraintsHeader = `editor.record.form.constraint.header.${this.constraintType}`
  }

  handleConstraintChange(constraint: Constraint, index: number) {
    this.value = [...this.value]
    this.value[index] = constraint
    this.valueChange.emit(this.value)
  }

  handleConstraintsOrderChange(constraints: Constraint[]) {
    const updatedConstraints = [...constraints]
    this.valueChange.emit(updatedConstraints)
  }

  addConstraintSectionToDisplay() {
    const updatedConstraints = [...this.value]
    updatedConstraints.push({ text: '' }) // url?
    this.valueChange.emit(updatedConstraints)
  }
}