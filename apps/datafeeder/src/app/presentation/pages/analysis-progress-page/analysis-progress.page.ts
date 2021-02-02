import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { interval, Observable, Subscription } from 'rxjs'
import { switchMap, takeWhile, tap } from 'rxjs/operators'

const { PENDING, ANALYZING, DONE } = AnalysisStatusEnumApiModel

@Component({
  selector: 'app-analysis-progress-page',
  templateUrl: './analysis-progress.page.html',
  styleUrls: ['./analysis-progress.page.css'],
})
export class AnalysisProgressPageComponent implements OnInit, OnDestroy {
  progress = 0
  private subscription: Subscription
  statusFetch$: Observable<UploadJobStatusApiModel>

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private fileUploadApiService: FileUploadApiService
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription()
    this.statusFetch$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) => {
        return interval(250).pipe(
          switchMap(() => {
            return this.fileUploadApiService.findUploadJob(id)
          }),
          tap((job: UploadJobStatusApiModel) => (this.progress = job.progress)),
          takeWhile(
            (job: UploadJobStatusApiModel) =>
              [PENDING, ANALYZING].includes(job.status),
            true
          )
        )
      })
    )

    this.subscription.add(
      this.statusFetch$.subscribe((job: UploadJobStatusApiModel) =>
        this.onJobFinish(job)
      )
    )
  }

  onJobFinish(job: UploadJobStatusApiModel) {
    const done = job.status === DONE
    this.router.navigate([done ? 'validation' : '/'], {
      relativeTo: this.activatedRoute,
      queryParams: done ? {} : { error: 'analysis' },
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
