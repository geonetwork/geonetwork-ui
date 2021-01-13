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
  steps = [
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
  ]

  stepId: number
  rootId: number
  private routeParamsSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(
      ({ id, stepId }) => {
        this.logService.log(`id: ${id}`)
        this.logService.log(`stepId: ${stepId}`)

        this.rootId = id
        this.stepId = Number(stepId)
      }
    )
  }

  handleNextBtnClick() {
    if (this.stepId === 4) {
      return
    }

    this.router.navigate(['/', this.rootId, 'step', ++this.stepId])
  }

  handlePreviousBtnClick() {
    if (this.stepId === 1) {
      this.router.navigate(['/', this.rootId, 'validation'])

      return
    }

    this.router.navigate(['/', this.rootId, 'step', --this.stepId])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
