import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormFieldType } from '../../components/form-field/form-field.component'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css'],
})
export class FormsPageComponent implements OnInit, OnDestroy {
  rootId: number

  private stepId: number
  private routeParamsSub: Subscription
  private stepsConfiguration = [
    [
      {
        id: 'title',
        label: 'datafeeder.form.title',
        icon: 'icon-title',
        type: FormFieldType.TEXT,
      },
      {
        id: 'abstract',
        label: 'datafeeder.form.abstract',
        icon: 'icon-description',
        type: FormFieldType.TEXT_AREA,
      },
    ],
    [
      {
        id: 'tags',
        label: 'datafeeder.form.tags',
        icon: 'icon-tag',
        type: FormFieldType.CHIPS,
        options: {
          url: (text) =>
            `https://apps.titellus.net/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.place.regions&rows=200&q=${text}&uri=*QUERY*&lang=eng`,
        },
      },
    ],
    [
      {
        id: 'datepicker',
        label: 'datafeeder.form.datepicker',
        icon: 'icon-date',
        type: FormFieldType.DATA_PICKER,
      },
      {
        id: 'dropdown',
        label: 'datafeeder.form.dropdown',
        icon: 'icon-scale',
        type: FormFieldType.DROPDOWN,
      },
    ],
    [
      {
        id: 'description',
        label: 'datafeeder.form.description',
        icon: 'icon-process',
        type: FormFieldType.TEXT_AREA,
      },
    ],
    [],
  ]

  get currentStep(): number {
    return this.stepId
  }

  get configuration(): any {
    return this.stepsConfiguration
  }

  get numSteps(): number {
    return this.stepsConfiguration.length
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(
      ({ id, stepId }) => {
        this.rootId = id
        this.stepId = Number(stepId)
      }
    )
  }

  handleNextBtnClick() {
    if (this.currentStep === this.numSteps) {
      return
    }

    this.changeStep(this.currentStep + 1)

    this.router.navigate(['/', this.rootId, 'step', this.currentStep])
  }

  handlePreviousBtnClick() {
    if (this.currentStep === 1) {
      this.router.navigate(['/', this.rootId, 'validation'])
      return
    }

    this.changeStep(this.currentStep - 1)

    this.router.navigate(['/', this.rootId, 'step', this.currentStep])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }

  private changeStep(step: number) {
    this.stepId = step
  }
}
