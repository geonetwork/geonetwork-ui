import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { Subscription } from 'rxjs'
import { config as wizardConfig } from '../../../configs/wizard.config'

marker('datafeeder.wizard.emptyRequiredValuesMessage')

@Component({
  selector: 'gn-ui-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
})
export class FormsPageComponent implements OnInit, OnDestroy {
  id: number

  currentStep: number
  numSteps = 6
  requiredMsgKey = 'datafeeder.wizard.emptyRequiredValuesMessage'

  wizardConfig = wizardConfig

  private routeParamsSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id
    })
    this.cd.detectChanges()
  }

  handleStepChanges(step: number) {
    let route
    if (this.currentStep === 1 && step === 1) {
      route = ['/', this.id, 'validation']
    } else if (this.currentStep === 4 && step === 4) {
      route = ['/', this.id, 'confirm']
    } else {
      this.currentStep = step
      route = ['/', this.id, 'step', step]
    }
    this.router.navigate(route)
  }

  handleStepNumberChanges(steps: number) {
    this.numSteps = steps
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
