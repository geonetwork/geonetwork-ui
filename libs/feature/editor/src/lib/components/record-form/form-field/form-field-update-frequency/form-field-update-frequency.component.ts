import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  CheckToggleComponent,
  DropdownChoice,
  DropdownSelectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import {
  UpdateFrequency,
  UpdateFrequencyCustom,
} from '@geonetwork-ui/common/domain/model/record'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'gn-ui-form-field-update-frequency',
  templateUrl: './form-field-update-frequency.component.html',
  styleUrls: ['./form-field-update-frequency.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CheckToggleComponent, DropdownSelectorComponent, TranslateModule],
})
export class FormFieldUpdateFrequencyComponent implements OnInit {
  @Input() control: FormControl<UpdateFrequency>

  protected choices: DropdownChoice[] = []

  get planned() {
    return typeof this.control.value !== 'string'
  }

  constructor(private translateService: TranslateService) {}

  async ngOnInit() {
    this.choices = await this.getInitialChoices()
    if (typeof this.control.value === 'string') {
      return
    }
    const updatedTimes = this.control.value.updatedTimes
    const per = this.control.value.per
    // the update frequency is not in the list; make it appear there
    if (updatedTimes && updatedTimes !== 1 && updatedTimes !== 2) {
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
      this.control.setValue('notPlanned')
    } else {
      this.control.setValue({ updatedTimes: 1, per: 'day' })
    }
  }

  get selectedFrequency(): string {
    if (typeof this.control.value === 'string') return null
    const { updatedTimes, per } = this.control.value
    return `${per}.${updatedTimes}`
  }

  onSelectFrequencyValue(value: unknown) {
    const split = (value as string).split('.')
    this.control.setValue({
      updatedTimes: Number(split[1]),
      per: split[0] as UpdateFrequencyCustom['per'],
    })
  }

  private async getInitialChoices() {
    return [
      {
        value: 'day.1',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.day', {
            count: 1,
          })
        ),
      },
      {
        value: 'day.2',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.day', {
            count: 2,
          })
        ),
      },
      {
        value: 'week.1',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.week', {
            count: 1,
          })
        ),
      },
      {
        value: 'week.2',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.week', {
            count: 2,
          })
        ),
      },
      {
        value: 'month.1',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.month', {
            count: 1,
          })
        ),
      },
      {
        value: 'month.2',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.month', {
            count: 2,
          })
        ),
      },
      {
        value: 'year.1',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.year', {
            count: 1,
          })
        ),
      },
      {
        value: 'year.2',
        label: await firstValueFrom(
          this.translateService.get('domain.record.updateFrequency.year', {
            count: 2,
          })
        ),
      },
    ]
  }
}
