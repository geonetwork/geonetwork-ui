import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  CheckToggleComponent,
  DropdownSelectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-form-field-update-frequency',
  templateUrl: './form-field-update-frequency.component.html',
  styleUrls: ['./form-field-update-frequency.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CheckToggleComponent, DropdownSelectorComponent, TranslateModule],
})
export class FormFieldUpdateFrequencyComponent implements OnInit {
  @Input() control: FormControl

  get planned() {
    return this.control.value !== 'notPlanned'
  }

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    const updatedTimes = this.control.value?.updatedTimes
    const per = this.control.value?.per
    if (updatedTimes && updatedTimes !== 1 && updatedTimes !== 2) {
      this.choices = [
        {
          value: `${per}.${updatedTimes}`,
          label: this.translateService.instant(
            `domain.record.updateFrequency.${per}`,
            {
              count: updatedTimes,
            }
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

  get selectedFrequency() {
    const { updatedTimes, per } = this.control.value
    return `${per}.${updatedTimes}`
  }

  onSelectFrequencyValue(value: unknown) {
    const split = (value as string).split('.')
    this.control.setValue({ updatedTimes: Number(split[1]), per: split[0] })
  }

  choices = [
    {
      value: 'day.1',
      label: this.translateService.instant(
        'domain.record.updateFrequency.day',
        {
          count: 1,
        }
      ),
    },
    {
      value: 'day.2',
      label: this.translateService.instant(
        'domain.record.updateFrequency.day',
        {
          count: 2,
        }
      ),
    },
    {
      value: 'week.1',
      label: this.translateService.instant(
        'domain.record.updateFrequency.week',
        {
          count: 1,
        }
      ),
    },
    {
      value: 'week.2',
      label: this.translateService.instant(
        'domain.record.updateFrequency.week',
        {
          count: 2,
        }
      ),
    },
    {
      value: 'month.1',
      label: this.translateService.instant(
        'domain.record.updateFrequency.month',
        {
          count: 1,
        }
      ),
    },
    {
      value: 'month.2',
      label: this.translateService.instant(
        'domain.record.updateFrequency.month',
        {
          count: 2,
        }
      ),
    },
    {
      value: 'year.1',
      label: this.translateService.instant(
        'domain.record.updateFrequency.year',
        {
          count: 1,
        }
      ),
    },
    {
      value: 'year.2',
      label: this.translateService.instant(
        'domain.record.updateFrequency.year',
        {
          count: 2,
        }
      ),
    },
  ]
}
