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
import { EditorFacade } from '../../../../+state/editor.facade'
import { ButtonComponent, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { map, Observable } from 'rxjs'
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
  @Input() value: Constraint[] //constraintList
  @Input() constraintType: CatalogRecordKeys
  @Output() valueChange = new EventEmitter<Constraint[]>() //constraintListChange

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

  constraintsHeader = ''
  additionalConstraintsButtonLabel = ''
  isAdditonalElementsVisible$: Observable<boolean>

  ngOnInit() {
    this.additionalConstraintsButtonLabel = `editor.record.form.constraint.add.${this.constraintType}`
    this.constraintsHeader = `editor.record.form.constraint.header.${this.constraintType}`

    const constraintTypeObservableName = `${this.constraintType}$`
    this.isAdditonalElementsVisible$ = this[constraintTypeObservableName].pipe(
      map((constraints: Constraint[]) => constraints.length > 0)
    )
  }

  constructor(private editorFacade: EditorFacade) {}

  handleURLChange(url: URL, index: number) {
    const updatedConstraints = [...this.value]
    updatedConstraints[index].url = url
    console.log('updatedConstraints', updatedConstraints)
    this.valueChange.emit(updatedConstraints)
  }

  handleConstraintTextChange(text: string, index: number) {
    const updatedConstraints = [...this.value]
    updatedConstraints[index].text = text
    this.valueChange.emit(updatedConstraints)
  }

  handleConstraintsOrderChange(constraints: any) {
    const updatedConstraints = [...constraints]
    this.valueChange.emit(updatedConstraints)
  }

  addConstraintSectionToDisplay() {
    const updatedConstraints = [...this.value]
    updatedConstraints.push({ text: '' }) // url?
    this.valueChange.emit(updatedConstraints)
  }
}
