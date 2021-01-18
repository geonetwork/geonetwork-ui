import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { WizardService } from '../../services/wizard.service'
import { WizardFieldModel } from '../../models/wizard-field.model'

@Component({
  selector: 'lib-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
})
export class WizardComponent implements OnInit {
  @Output() stepChanges = new EventEmitter<number>()
  @Output() stepsNumber = new EventEmitter<number>()

  currentStep: number
  configuration: WizardFieldModel[]

  constructor(private wizardService: WizardService) {
    this.initializeCurrentStep()
  }

  ngOnInit(): void {
    this.stepChanges.emit(this.wizardService.getCurrentStep())
    this.stepsNumber.emit(this.wizardService.getConfigurationStepNumber())
  }

  handlePreviousBtnClick() {
    this.onStepChange(this.currentStep - 1)

    this.stepChanges.emit(this.currentStep)
  }

  handleNextBtnClick() {
    this.onStepChange(this.currentStep + 1)

    this.stepChanges.emit(this.currentStep)
  }

  onStepChange(step: number) {
    this.wizardService.onWizardStepChanged(step)
    this.initializeCurrentStep()
  }

  private initializeCurrentStep() {
    this.currentStep = this.wizardService.getCurrentStep()
    this.configuration = this.wizardService.getStepConfiguration()
  }
}
