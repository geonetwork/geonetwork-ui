import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'

@Component({
  selector: 'app-dataset-validation-page',
  templateUrl: './dataset-validation-page.html',
  styleUrls: ['./dataset-validation-page.css'],
})
export class DatasetValidationPageComponent implements OnInit, OnDestroy {
  encodingList = [
    {
      label: 'UTF8',
      value: 'UTF8',
    },
  ]
  refSystem = [
    {
      label: 'Lambert 93',
      value: 'Lambert93',
    },
  ]
  numOfEntities = 1549
  private routeParamsSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.logService.log(`id: ${id}`)
    })
  }

  submitValidation() {}

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
