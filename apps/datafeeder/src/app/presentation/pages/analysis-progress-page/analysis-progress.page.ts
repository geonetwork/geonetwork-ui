import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { interval, Observable, Subscription } from 'rxjs'
import { filter, mergeMap, switchMap, take, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

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
    private facade: DatafeederFacade,
    private fileUploadApiService: FileUploadApiService
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription()
    this.statusFetch$ = this.activatedRoute.params.pipe(
      mergeMap(({ id }) =>
        interval(500).pipe(
          switchMap(() => this.fileUploadApiService.findUploadJob(id)),
          tap((job: UploadJobStatusApiModel) => this.facade.setUpload(job)),
          tap((job: UploadJobStatusApiModel) => (this.progress = job.progress)),
          filter(
            (job: UploadJobStatusApiModel) =>
              ![PENDING, ANALYZING].includes(job.status)
          ),
          take(1)
        )
      )
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
