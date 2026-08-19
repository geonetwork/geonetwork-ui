import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  AssociatedRecord,
  AssociationType,
  associationTypeValues,
} from '@geonetwork-ui/common/domain/model/record'
import {
  CheckToggleComponent,
  DropdownChoice,
  DropdownSelectorComponent,
  TextInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-associated-records',
  templateUrl: './form-field-associated-records.component.html',
  styleUrls: ['./form-field-associated-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CheckToggleComponent,
    TextInputComponent,
    DropdownSelectorComponent,
    FormFieldWrapperComponent,
    TranslatePipe,
  ],
})
export class FormFieldAssociatedRecordsComponent {
  @Input() value?: AssociatedRecord[]
  @Output() valueChange = new EventEmitter<AssociatedRecord[]>()

  private get list() {
    return this.value ?? []
  }
  private get first() {
    return this.list[0]
  }
  private get rest() {
    return this.list.slice(1)
  }

  get hasParentLink() {
    return this.list.length > 0
  }
  get uniqueIdentifier() {
    return this.first?.uniqueIdentifier ?? ''
  }
  get selectedType() {
    return this.first?.associationType
  }
  get choices(): DropdownChoice[] {
    return associationTypeValues.map((value) => ({
      value,
      label: `domain.record.associationType.${value}`,
    }))
  }

  onToggle(checked: boolean) {
    this.valueChange.emit(
      checked
        ? [
            {
              uniqueIdentifier: '',
              associationType: associationTypeValues[0],
            },
            ...this.rest,
          ]
        : this.rest
    )
  }

  onUniqueIdentifierChange(uniqueIdentifier: string) {
    this.valueChange.emit(
      uniqueIdentifier
        ? [{ ...this.first, uniqueIdentifier }, ...this.rest]
        : this.rest
    )
  }

  onTypeChange(associationType: DropdownChoice['value']) {
    this.valueChange.emit([
      { ...this.first, associationType: associationType as AssociationType },
      ...this.rest,
    ])
  }
}
