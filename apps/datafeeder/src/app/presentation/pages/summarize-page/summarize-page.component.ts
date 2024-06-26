import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  DataPublishingApiService,
  DatasetPublishRequestApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { WizardService } from '@geonetwork-ui/feature/editor'
import { Subscription } from 'rxjs'
import { config as wizardConfig } from '../../../configs/wizard.config'

@Component({
  selector: 'gn-ui-summarize-page',
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
    this.publishService
      .publish(this.rootId.toString(), {
        datasets: [this.formatDataset(this.wizard.getDataObject())],
      })
      .subscribe(() => {
        this.router.navigate(['/', this.rootId, 'publish'])
      })
  }

  formatDataset(dataset: any): DatasetPublishRequestApiModel {
    return {
      nativeName: dataset.nativeName,
      // publishedName?: string
      encoding: dataset.encoding,
      srs: dataset.crs,
      metadata: {
        title: dataset.title,
        abstract: dataset.abstract,
        tags: JSON.parse(dataset.tags || '[]').map((t) => t.value),
        creationDate: new Date(parseInt(dataset.datepicker, 10)).toISOString(),
        scale: parseInt(dataset.dropdown, 10),
        creationProcessDescription: dataset.description,
        options: {
          delimiter: dataset.csvDelimiter,
          quoteChar: dataset.quoteChar,
          latField: dataset.latField,
          lngField: dataset.lngField,
        },
      },
    }
  }

  previous() {
    this.router.navigate(['/', this.rootId, 'step', 4])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
