import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'
import { ConstraintCardComponent } from '../../../constraint-card/constraint-card.component'
import { Constraint } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-form-field-constraints',
  standalone: true,
  imports: [CommonModule, SortableListComponent, ConstraintCardComponent],
  templateUrl: './form-field-constraints.component.html',
  styleUrls: ['./form-field-constraints.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldConstraintsComponent {
  @Input() label: string
  @Input() value: Constraint[] //constraintList
  @Output() valueChange = new EventEmitter<Constraint[]>() //constraintListChange

  handleConstraintsOrderChange(event: unknown) {
    console.log('constraints order changed')
  }
}
