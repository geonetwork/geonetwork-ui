import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { WizardService } from '../../services/wizard.service'
import { WizardFieldModel } from '../../models/wizard-field.model'

@Component({
  selector: 'lib-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
})
export class WizardComponent implements OnInit, AfterViewInit {
  @Input() id: string
  @Input() initialConfig: {
    configuration: WizardFieldModel[][]
    storageKey: string
  }

  @Output() stepChanges = new EventEmitter<number>()
  @Output() stepsNumber = new EventEmitter<number>()

  @ViewChild('wizardFields') wizardFieldsEl: ElementRef<HTMLElement>

  currentStep: number
  configuration: WizardFieldModel[]

  constructor(private wizardService: WizardService) {}

  ngOnInit(): void {
    this.wizardService.initialize(this.id, this.initialConfig)

    this.initializeCurrentStep()
    this.stepChanges.emit(this.wizardService.getCurrentStep())
    this.stepsNumber.emit(this.wizardService.getConfigurationStepNumber())
  }

  ngAfterViewInit() {
    this.setFocus()
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

    this.setFocus()
    this.initializeCurrentStep()
  }

  private initializeCurrentStep() {
    this.currentStep = this.wizardService.getCurrentStep()
    this.configuration = this.wizardService.getStepConfiguration()
  }

  private setFocus() {
    setTimeout(() => {
      const inputEl = this.wizardFieldsEl.nativeElement.querySelectorAll(
        'input, textarea, select'
      )[0] as HTMLElement
      inputEl.focus()
    }, 0)
  }
}
