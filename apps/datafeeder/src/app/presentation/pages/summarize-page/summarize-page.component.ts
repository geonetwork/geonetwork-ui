import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { WizardService } from '@lib/editor'
import { config as wizardConfig } from '../../../configs/wizard.config'

@Component({
  selector: 'app-summarize-page',
  templateUrl: './summarize-page.component.html',
  styleUrls: ['./summarize-page.component.css'],
})
export class SummarizePageComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription
  private rootId: number

  numberOfSteps: number

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wizard: WizardService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.rootId = id
      this.wizard.initialize(id, wizardConfig)
      this.numberOfSteps = this.wizard.getConfigurationStepNumber() + 1
    })
  }

  submit() {
    this.router.navigate(['/', this.rootId, 'publish'])
  }

  previous() {
    this.router.navigate(['/', this.rootId, 'step', 4])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
