import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import { interval, Subscription } from 'rxjs'
import { finalize, map, take, takeWhile, tap, flatMap } from 'rxjs/operators'
import {
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'

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
                  ['PENDING', 'ANALYZING'].includes(job.status),
                true
              ),
              map((job: UploadJobStatusApiModel) => {
                if (job.status == 'DONE') {
                  this.router.navigate(['validation'], {
                    relativeTo: this.activatedRoute,
                  })
                } else {
                  this.router.navigate(['/'], {
                    relativeTo: this.activatedRoute,
                    queryParams: { error: 'analysis'}
                  })
                }
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
