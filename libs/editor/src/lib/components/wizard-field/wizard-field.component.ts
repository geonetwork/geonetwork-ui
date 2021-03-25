import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { WizardFieldModel } from '../../models/wizard-field.model'
import { WizardFieldType } from '../../models/wizard-field.type'
import { SPATIAL_RESOLUTION_LIST } from '../configs/spatial-resolution-dropdown.config'
import { WizardService } from '../../services/wizard.service'
import { IMyDpOptions } from 'mydatepicker'
import { DATEPICKER_OPTIONS } from '../configs/datepicker.config'
import {
  ChipsInputComponent,
  DatepickerComponent,
  DropdownSelectorComponent,
  TextAreaComponent,
  TextInputComponent,
} from '@lib/ui'
import { Subscription } from 'rxjs'

@Component({
  selector: 'lib-wizard-field',
  templateUrl: './wizard-field.component.html',
  styleUrls: ['./wizard-field.component.css'],
})
export class WizardFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() wizardFieldConfig: WizardFieldModel

  @ViewChild('searchText') searchText: TextInputComponent
  @ViewChild('chips') chips: ChipsInputComponent
  @ViewChild('textArea') textArea: TextAreaComponent
  @ViewChild('datepicker') datepicker: DatepickerComponent
  @ViewChild('dropdown') dropdown: DropdownSelectorComponent

  datepickerOptions: IMyDpOptions = DATEPICKER_OPTIONS
  subs = new Subscription()

  get wizardFieldType(): typeof WizardFieldType {
    return WizardFieldType
  }

  get spatialResolutionList(): any {
    return SPATIAL_RESOLUTION_LIST
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
        return data ? JSON.parse(data) : this.spatialResolutionList[1]
      }
    }
  }

  constructor(private wizardService: WizardService) {
    this.wizardService.translateMonthLabels().subscribe((monthLabels) => {
      const options = DATEPICKER_OPTIONS
      options.monthLabels = monthLabels

      this.datepickerOptions = options
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initializeListeners()
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
        this.initializeDatePickerListener()
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

  private initializeDatePickerListener() {
    this.subs.add(
      this.datepicker.selectedDate.subscribe((value: Date) => {
        this.wizardService.onWizardWizardFieldDataChanged(
          this.wizardFieldConfig.id,
          (+value).toString()
        )
      })
    )
  }

  private initializeDropdownListener() {
    this.subs.add(
      this.dropdown.selectValue.subscribe((value) => {
        this.wizardService.onWizardWizardFieldDataChanged(
          this.wizardFieldConfig.id,
          JSON.stringify(value)
        )
      })
    )
  }
}
