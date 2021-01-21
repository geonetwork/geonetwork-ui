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

  constructor(private translateService: TranslateService) {
    this.initialize()
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
    this.saveWizardFieldData(fieldId, data)
  }

  updateWizardFieldData(fieldId: string, data: any): void {
    this.wizardData.set(fieldId, data)
  }

  saveWizardFieldData(fieldId: string, data: any): void {
    localStorage.setItem(fieldId, data)
  }

  onWizardStepChanged(step: number) {
    if (step > 0 && step < this.getConfigurationStepNumber()) {
      this.wizardStep = step
      localStorage.setItem('wizard_step', this.wizardStep.toString())
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

  private initialize(): void {
    this.wizardStep = Number(localStorage.getItem('wizard_step') || 1)

    const wizardConfiguration = DEFAULT_WIZARD_CONFIGURATION
    wizardConfiguration.forEach((stepConfiguration) => {
      stepConfiguration.forEach((stepField) => {
        const fieldData = localStorage.getItem(stepField.id)
        this.wizardData.set(stepField.id, fieldData)
      })
    })
  }
}
