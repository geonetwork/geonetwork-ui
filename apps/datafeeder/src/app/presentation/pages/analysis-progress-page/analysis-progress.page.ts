import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { interval, Subscription } from 'rxjs'
import { flatMap, map, takeWhile, tap } from 'rxjs/operators'

const { PENDING, ANALYZING, DONE } = UploadJobStatusApiModel.StatusEnum

@Component({
  selector: 'app-analysis-progress-page',
  templateUrl: './analysis-progress.page.html',
  styleUrls: ['./analysis-progress.page.css'],
})
export class AnalysisProgressPageComponent implements OnInit, OnDestroy {
  progress = 0
  private subscription: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private fileUploadApiService: FileUploadApiService
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription()
    this.subscription.add(
      this.activatedRoute.params.subscribe(({ id }) => {
        this.subscription.add(
          interval(100)
            .pipe(
              flatMap(() => this.fileUploadApiService.findUploadJob(id)),
              tap(
                (job: UploadJobStatusApiModel) => (this.progress = job.progress)
              ),
              takeWhile(
                (job: UploadJobStatusApiModel) =>
                  [PENDING, ANALYZING].includes(job.status),
                true
              ),
              map((job: UploadJobStatusApiModel) => {
                const done = job.status === DONE
                this.router.navigate([done ? 'validation' : '/'], {
                  relativeTo: this.activatedRoute,
                  queryParams: done ? {} : { error: 'analysis' },
                })
              })
            )
            .subscribe()
        )
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
