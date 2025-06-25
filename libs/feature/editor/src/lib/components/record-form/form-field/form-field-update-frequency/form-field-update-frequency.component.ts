import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {
  UpdateFrequency,
  UpdateFrequencyCode,
  updateFrequencyCodeValues,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/model/record'
import {
  CheckToggleComponent,
  DropdownChoice,
  DropdownSelectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'

const initialListValues = updateFrequencyCodeValues.filter(
  (code) => !['unknown', 'notPlanned', 'asNeeded', 'irregular'].includes(code)
)

@Component({
  selector: 'gn-ui-form-field-update-frequency',
  templateUrl: './form-field-update-frequency.component.html',
  styleUrls: ['./form-field-update-frequency.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CheckToggleComponent, DropdownSelectorComponent, TranslatePipe],
})
export class FormFieldUpdateFrequencyComponent implements OnInit {
  @Input() value: UpdateFrequency
  @Output() valueChange: EventEmitter<UpdateFrequency> = new EventEmitter()

  protected choices: DropdownChoice[] = []

  get planned() {
    return this.value && this.value !== 'notPlanned' && this.value !== 'unknown'
  }

  constructor(private translateService: TranslateService) {}

  async ngOnInit() {
    this.choices = await this.getInitialChoices()
    if (!this.planned) {
      return
    }
    if (
      typeof this.value === 'string' &&
      !this.choices.map((choice) => choice.value).includes(this.value)
    ) {
      this.choices = [
        {
          value: this.value,
          label: await firstValueFrom(
            this.translateService.get(
              `domain.record.updateFrequency.${this.value}`
            )
          ),
        },
        ...this.choices,
      ]
    }
    if (typeof this.value === 'string') {
      return
    }
    const updatedTimes = this.value.updatedTimes
    const per = this.value.per
    // the update frequency is not in the list; make it appear there
    if (updatedTimes) {
      this.choices = [
        {
          value: `${per}.${updatedTimes}`,
          label: await firstValueFrom(
            this.translateService.get(`domain.record.updateFrequency.${per}`, {
              count: updatedTimes,
            })
          ),
        },
        ...this.choices,
      ]
    }
  }

  onPlannedToggled() {
    if (this.planned) {
      this.valueChange.emit('notPlanned')
    } else {
      this.valueChange.emit(this.choices[0].value as UpdateFrequencyCode)
    }
  }

  get selectedFrequency(): string {
    if (!this.value) return null
    if (typeof this.value === 'string') return this.value
    const { updatedTimes, per } = this.value
    return `${per}.${updatedTimes}`
  }

  onSelectFrequencyValue(value: string) {
    if (!value.includes('.')) {
      this.valueChange.emit(value as UpdateFrequencyCode)
    } else {
      const split = (value as string).split('.')
      this.valueChange.emit({
        updatedTimes: Number(split[1]),
        per: split[0] as UpdateFrequencyCustom['per'],
      })
    }
  }

  private async getInitialChoices() {
    return Promise.all(
      initialListValues.map(async (value) => ({
        value,
        label: await firstValueFrom(
          this.translateService.get(`domain.record.updateFrequency.${value}`)
        ),
      }))
    )
  }
}
