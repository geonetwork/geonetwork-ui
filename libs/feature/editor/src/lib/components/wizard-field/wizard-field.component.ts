import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { getLangFromBrowser } from '@geonetwork-ui/util/i18n'
import { WizardFieldModel } from '../../models/wizard-field.model'
import { WizardFieldType } from '../../models/wizard-field.type'
import { WizardService } from '../../services/wizard.service'
import {
  ChipsInputComponent,
  DropdownSelectorComponent,
  TextAreaComponent,
  TextInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { Subscription } from 'rxjs'

marker('datafeeder.month.january')
marker('datafeeder.month.february')
marker('datafeeder.month.march')
marker('datafeeder.month.april')
marker('datafeeder.month.may')
marker('datafeeder.month.june')
marker('datafeeder.month.july')
marker('datafeeder.month.august')
marker('datafeeder.month.september')
marker('datafeeder.month.october')
marker('datafeeder.month.november')
marker('datafeeder.month.december')

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'gn-ui-wizard-field',
  templateUrl: './wizard-field.component.html',
  styleUrls: ['./wizard-field.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: getLangFromBrowser() },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardFieldComponent implements AfterViewInit, OnDestroy {
  @Input() wizardFieldConfig: WizardFieldModel

  @ViewChild('searchText') searchText: TextInputComponent
  @ViewChild('chips') chips: ChipsInputComponent
  @ViewChild('textArea') textArea: TextAreaComponent
  @ViewChild('dropdown') dropdown: DropdownSelectorComponent

  subs = new Subscription()

  get wizardFieldType(): typeof WizardFieldType {
    return WizardFieldType
  }

  get dropdownChoices(): any {
    return this.wizardFieldConfig.options
  }

  get wizardFieldData() {
    const data = this.wizardService.getWizardFieldData(
      this.wizardFieldConfig.id
    )
    switch (this.wizardFieldConfig.type) {
      case WizardFieldType.TEXT: {
        return data || ''
      }
      case WizardFieldType.CHIPS: {
        return data ? JSON.parse(data) : []
      }
      case WizardFieldType.TEXT_AREA: {
        return data || ''
      }
      case WizardFieldType.DATA_PICKER: {
        return data ? new Date(Number(data)) : new Date()
      }
      case WizardFieldType.DROPDOWN: {
        return data ? JSON.parse(data) : this.dropdownChoices[0]?.value
      }
    }
  }

  constructor(
    private wizardService: WizardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.initializeListeners()
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  private initializeListeners() {
    switch (this.wizardFieldConfig.type) {
      case WizardFieldType.TEXT: {
        this.initializeTextInputListener()
        break
      }
      case WizardFieldType.CHIPS: {
        this.initializeChipsListener()
        break
      }
      case WizardFieldType.TEXT_AREA: {
        this.initializeTextAreaListener()
        return
      }
      case WizardFieldType.DATA_PICKER: {
        this.initializeDateInput()
        return
      }
      case WizardFieldType.DROPDOWN: {
        this.initializeDropdownListener()
        return
      }
    }
  }

  private initializeTextInputListener() {
    this.subs.add(
      this.searchText.valueChange.subscribe((value) => {
        this.wizardService.onWizardWizardFieldDataChanged(
          this.wizardFieldConfig.id,
          value
        )
      })
    )
  }

  private initializeChipsListener() {
    this.subs.add(
      this.chips.itemsChange.subscribe((items) => {
        this.wizardService.onWizardWizardFieldDataChanged(
          this.wizardFieldConfig.id,
          JSON.stringify(items)
        )
      })
    )
  }

  private initializeTextAreaListener() {
    this.subs.add(
      this.textArea.valueChange.subscribe((value) => {
        this.wizardService.onWizardWizardFieldDataChanged(
          this.wizardFieldConfig.id,
          value
        )
      })
    )
  }

  initializeDateInput() {
    const time = this.wizardService.getWizardFieldData(
      this.wizardFieldConfig.id
    )
    if (!time) {
      this.wizardService.onWizardWizardFieldDataChanged(
        this.wizardFieldConfig.id,
        new Date().valueOf()
      )
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.wizardService.onWizardWizardFieldDataChanged(
      this.wizardFieldConfig.id,
      event.value.valueOf()
    )
  }

  private initializeDropdownListener() {
    if (
      this.wizardService.getWizardFieldData(this.wizardFieldConfig.id) ===
        undefined &&
      !!this.dropdown.selected
    ) {
      this.wizardService.setWizardFieldData(
        this.wizardFieldConfig.id,
        this.dropdown.selected
      )
    }

    this.subs.add(
      this.dropdown.selectValue.subscribe((value) => {
        this.wizardService.onWizardWizardFieldDataChanged(
          this.wizardFieldConfig.id,
          value
        )
      })
    )
  }
}
