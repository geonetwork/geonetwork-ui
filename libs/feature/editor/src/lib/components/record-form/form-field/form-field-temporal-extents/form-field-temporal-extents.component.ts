import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { FormArray, FormControl } from '@angular/forms'
import { DatasetTemporalExtent } from '@geonetwork-ui/common/domain/model/record'
import {
  DynamicElement,
  SortableListComponent,
} from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateService } from '@ngx-translate/core'
import { Observable, combineLatest, map } from 'rxjs'
import { FormFieldTemporalExtentsDateComponent } from './form-field-temporal-extents-date/form-field-temporal-extents-date.component'
import { FormFieldTemporalExtentsRangeComponent } from './form-field-temporal-extents-range/form-field-temporal-extents-range.component'

@Component({
  selector: 'gn-ui-form-field-temporal-extents',
  templateUrl: './form-field-temporal-extents.component.html',
  styleUrls: ['./form-field-temporal-extents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent, SortableListComponent],
})
export class FormFieldTemporalExtentsComponent implements OnChanges {
  @Input() value: Array<DatasetTemporalExtent>
  @Output() valueChange: Observable<Array<DatasetTemporalExtent>>

  array: FormArray = new FormArray([])
  elements: DynamicElement[] = []

  addOptions$ = combineLatest([
    this.translateService
      .get('editor.record.form.temporalExtents.addDate')
      .pipe(map((buttonLabel) => ({ buttonLabel, eventName: 'date' }))),
    this.translateService
      .get('editor.record.form.temporalExtents.addRange')
      .pipe(map((buttonLabel) => ({ buttonLabel, eventName: 'range' }))),
  ])

  constructor(private translateService: TranslateService) {
    this.valueChange = this.array.valueChanges
  }

  ngOnChanges() {
    this.resetValueFromInput(this.value)
  }

  onElementsChange(elements: DynamicElement[]) {
    this.elements = elements
    this.array.clear({ emitEvent: false })

    this.elements.forEach((e: DynamicElement, i: number) =>
      this.array.push(e.inputs.control, {
        emitEvent: i === elements.length - 1,
      })
    )
  }

  onAdd(eventName: string) {
    switch (eventName) {
      case 'date': {
        const instant = { start: new Date() }
        this.pushDate(instant, this.elements, true)
        break
      }
      case 'range': {
        const range = {
          start: new Date(),
          end: new Date(),
        }
        this.pushRange(range, this.elements, true)
        break
      }
    }
  }

  private resetValueFromInput(value) {
    this.array.clear({ emitEvent: false })
    this.elements = []
    if (!value) return

    const newElements = []
    value.forEach((v: DatasetTemporalExtent) => {
      if ('start' in v && 'end' in v) {
        this.pushRange(v, newElements, false)
      } else {
        this.pushDate(v, newElements, false)
      }
    })
    this.elements = newElements
  }

  private pushDate(instant, elements, emitEvent) {
    const dateControl = new FormControl(instant)
    this.array.push(dateControl, { emitEvent })
    elements.push({
      component: FormFieldTemporalExtentsDateComponent,
      inputs: {
        control: dateControl,
      },
    })
  }

  private pushRange(period, elements, emitEvent) {
    const rangeControl = new FormControl(period)
    this.array.push(rangeControl, { emitEvent })
    elements.push({
      component: FormFieldTemporalExtentsRangeComponent,
      inputs: {
        control: rangeControl,
      },
    })
  }
}
