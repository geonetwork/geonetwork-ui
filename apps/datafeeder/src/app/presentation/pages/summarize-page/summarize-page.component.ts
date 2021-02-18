import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
  DatasetPublishRequestApiModel,
} from '@lib/datafeeder-api'
import { WizardService } from '@lib/editor'
import { Subscription } from 'rxjs'
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
    private wizard: WizardService,
    private publishService: DataPublishingApiService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.rootId = id
      this.wizard.initialize(id, wizardConfig)
      this.numberOfSteps = this.wizard.getConfigurationStepNumber() + 1
    })
  }

  submit() {
    const dataset = this.wizard.getDataObject()
    // fix property names
    const scale = dataset.dropdown
    delete dataset.dropdown
    dataset.scale = scale

    this.publishService
      .publish(this.rootId.toString(), {
        datasets: [dataset as DatasetPublishRequestApiModel],
      })
      .subscribe((job: PublishJobStatusApiModel) => {
        if (job.status === PublishStatusEnumApiModel.ERROR) {
          this.router.navigate(['/', this.rootId, 'publish'])
        }
      })
  }

  previous() {
    this.router.navigate(['/', this.rootId, 'step', 4])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
