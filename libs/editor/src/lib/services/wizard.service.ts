import { Injectable } from '@angular/core'
import { forkJoin, Observable } from 'rxjs'
import { IMyMonthLabels } from 'mydatepicker'
import { MONTH_OF_THE_YEAR } from '../components/configs/datepicker.config'
import { TranslateService } from '@ngx-translate/core'
import { DEFAULT_WIZARD_CONFIGURATION } from '../components/configs/wizard.config'
import { WizardFieldModel } from '../models/wizard-field.model'

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private wizardStep = 1
  private wizardData: Map<string, any> = new Map()

  private id: string

  constructor(private translateService: TranslateService) {}

  initialize(id: string): void {
    this.id = id
    this.wizardData.clear()

    const datafeederData = this.getDataFeederState()

    const savedWizardData = datafeederData[id] || {}

    const wizardConfig = savedWizardData.config ? savedWizardData.config : []

    wizardConfig.forEach((i) => {
      this.wizardData.set(i.id, i.value)
    })
  }

  getCurrentStep(): number {
    return this.wizardStep
  }

  getStepConfiguration(): WizardFieldModel[] {
    return DEFAULT_WIZARD_CONFIGURATION[this.wizardStep - 1]
  }

  getConfiguration(): WizardFieldModel[][] {
    return DEFAULT_WIZARD_CONFIGURATION
  }

  getConfigurationStepNumber(): number {
    return DEFAULT_WIZARD_CONFIGURATION.length
  }

  getWizardFieldData(fieldId: string) {
    return this.wizardData.get(fieldId)
  }

  onWizardWizardFieldDataChanged(fieldId: string, data: any): void {
    this.updateWizardFieldData(fieldId, data)
    this.saveWizardFieldData()
  }

  updateWizardFieldData(fieldId: string, data: any): void {
    this.wizardData.set(fieldId, data)
  }

  saveWizardFieldData(): void {
    const config = []

    this.wizardData.forEach((value, key) => {
      config.push({
        id: key,
        value,
      })
    })

    const data = {
      step: this.wizardStep,
      config,
    }

    const datafeederState = this.getDataFeederState()
    datafeederState[this.id] = data

    localStorage.setItem('datafeeder-state', JSON.stringify(datafeederState))
  }

  onWizardStepChanged(step: number) {
    if (step > 0 && step < this.getConfigurationStepNumber()) {
      this.wizardStep = step
      this.saveWizardFieldData()
    }
  }

  translateMonthLabels(): Observable<IMyMonthLabels> {
    return new Observable<IMyMonthLabels>((result) => {
      const monthLabels = {}
      const monthTitleObs = []
      MONTH_OF_THE_YEAR.forEach((m) => {
        monthTitleObs.push(this.translateService.get(`datafeeder.month.${m}`))
      })

      forkJoin(monthTitleObs).subscribe((mLabel) => {
        mLabel.forEach((title, index) => (monthLabels[`${index + 1}`] = title))
        result.next(monthLabels)
        result.complete()
      })
    })
  }

  private getDataFeederState() {
    return localStorage.getItem('datafeeder-state')
      ? JSON.parse(localStorage.getItem('datafeeder-state'))
      : {}
  }
}
