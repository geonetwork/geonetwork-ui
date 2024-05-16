import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Type,
} from '@angular/core'
import { FormArray, FormControl } from '@angular/forms'
import { SortableListComponent } from '@geonetwork-ui/ui/elements'
import { Subscription, combineLatest, map } from 'rxjs'
import { FormFieldTemporalExtentsDateComponent } from './form-field-temporal-extents-date/form-field-temporal-extents-date.component'
import { FormFieldTemporalExtentsRangeComponent } from './form-field-temporal-extents-range/form-field-temporal-extents-range.component'
import { TranslateService } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-form-field-temporal-extents',
  templateUrl: './form-field-temporal-extents.component.html',
  styleUrls: ['./form-field-temporal-extents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SortableListComponent],
})
export class FormFieldTemporalExtentsComponent implements OnInit, OnDestroy {
  @Input() control!: FormControl

  subscription: Subscription

  array: FormArray = new FormArray([])
  elements: Array<{
    component: Type<any>
    inputs: Record<string, any>
  }>

  addOptions$ = combineLatest([
    this.translateService
      .get('editor.record.form.temporalExtents.addDate')
      .pipe(map((buttonLabel) => ({ buttonLabel, eventName: 'date' }))),
    this.translateService
      .get('editor.record.form.temporalExtents.addRange')
      .pipe(map((buttonLabel) => ({ buttonLabel, eventName: 'range' }))),
  ])

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.resetValueFromInput(this.control.value)

    this.subscription = new Subscription()

    this.subscription.add(
      this.control.valueChanges.subscribe((value) => {
        this.resetValueFromInput(value)
      })
    )

    this.subscription.add(
      this.array.valueChanges.subscribe((value) => {
        this.control.setValue(value)
      })
    )
  }

  onElementsChange(elements: any) {
    this.array.clear({ emitEvent: false })
    elements.forEach((e: any, i: number) =>
      this.array.push(e.inputs.control, {
        emitEvent: i === elements.length - 1,
      })
    )
  }

  onAdd(eventName: string) {
    switch (eventName) {
      case 'date': {
        const dateControl = new FormControl({ start: new Date() })
        this.array.push(dateControl)
        break
      }
      case 'range': {
        const rangeControl = new FormControl({
          start: new Date(),
          end: new Date(),
        })
        this.array.push(rangeControl)
        break
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private resetValueFromInput(value) {
    this.array.clear({ emitEvent: false })
    this.elements = []
    value.forEach((v: any) => {
      if ('start' in v && 'end' in v) {
        const rangeControl = new FormControl({
          start: v.start,
          end: v.end,
        })
        this.array.push(rangeControl, { emitEvent: false })
        this.elements = [
          ...this.elements,
          {
            component: FormFieldTemporalExtentsRangeComponent,
            inputs: {
              control: rangeControl,
            },
          },
        ]
      } else {
        const dateControl = new FormControl({ start: v.start })
        this.array.push(dateControl, { emitEvent: false })
        this.elements = [
          ...this.elements,
          {
            component: FormFieldTemporalExtentsDateComponent,
            inputs: {
              control: dateControl,
            },
          },
        ]
      }
    })
  }
}
