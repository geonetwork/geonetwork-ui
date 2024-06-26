import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@geonetwork-ui/util/shared'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { EMPTY, firstValueFrom, Observable, timer } from 'rxjs'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import { expand, switchMap } from 'rxjs/operators'
import { UploadProgressGuard } from '../../../router/upload-progress.guard'

const { Pending, Analyzing, Done } = AnalysisStatusEnumApiModel

@Component({
  selector: 'gn-ui-analysis-progress-page',
  templateUrl: './analysis-progress.page.html',
  styleUrls: ['./analysis-progress.page.css'],
})
export class AnalysisProgressPageComponent implements OnInit {
  progress = 0
  statusFetch$: Observable<UploadJobStatusApiModel>

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private facade: DatafeederFacade,
    private fileUploadApiService: FileUploadApiService
  ) {}

  async ngOnInit() {
    const { id: jobId } = await firstValueFrom(this.activatedRoute.params)
    this.statusFetch$ = this.fileUploadApiService.findUploadJob(jobId).pipe(
      // this runs recursively on emitted values of the inner observable
      // once the job is finished, we return EMPTY to stop the recursion
      expand((job) => {
        this.facade.setUpload(job)
        this.progress = job.progress
        if ([Pending, Analyzing].includes(job.status)) {
          return timer(500).pipe(
            switchMap(() => this.fileUploadApiService.findUploadJob(jobId))
          )
        }
        this.onJobFinish(job)
        return EMPTY
      })
    )
    this.statusFetch$.subscribe()
  }

  onJobFinish(job: UploadJobStatusApiModel) {
    const done = job.status === Done && job.datasets?.length > 0
    this.router.navigate(
      [
        done
          ? UploadProgressGuard.getRedirectPage(job.datasets[0].format)
          : '/',
      ],
      {
        relativeTo: this.activatedRoute,
        queryParams: done ? {} : { error: 'analysis' },
      }
    )
  }
}
