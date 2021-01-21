import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
})
export class FormsPageComponent implements OnInit, OnDestroy {
  rootId: number

  currentStep: number
  numSteps: number

  private stepId: number
  private routeParamsSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(
      ({ id, stepId }) => {
        this.rootId = id
        this.stepId = Number(stepId)
      }
    )
    this.cd.detectChanges()
  }

  handleStepChanges(step: number) {
    this.currentStep = step
    this.router.navigate(['/', this.rootId, 'step', step])
  }

  handleStepNumberChanges(steps: number) {
    this.numSteps = steps
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
