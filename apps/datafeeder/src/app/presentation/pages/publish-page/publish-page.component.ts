import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { WizardService } from '@geonetwork-ui/feature/editor'
import { EMPTY, firstValueFrom, Observable, timer } from 'rxjs'
import { expand, switchMap } from 'rxjs/operators'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

const { Pending, Running, Done } = PublishStatusEnumApiModel

@Component({
  selector: 'gn-ui-publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css'],
})
export class PublishPageComponent implements OnInit {
  progress = 0
  private rootId: number
  statusFetch$: Observable<PublishJobStatusApiModel>

  constructor(
    private publishService: DataPublishingApiService,
    private activatedRoute: ActivatedRoute,
    private facade: DatafeederFacade,
    private wizardService: WizardService,
    private router: Router
  ) {}

  async ngOnInit() {
    const { id: jobId } = await firstValueFrom(this.activatedRoute.params)
    this.rootId = jobId
    this.statusFetch$ = this.publishService.getPublishingStatus(jobId).pipe(
      // this runs recursively on emitted values of the inner observable
      // once the job is finished, we return EMPTY to stop the recursion
      expand((job) => {
        this.facade.setPublication(job)
        this.progress = Math.round(job.progress * 100)
        if ([Pending, Running].includes(job.status)) {
          return timer(500).pipe(
            switchMap(() => this.publishService.getPublishingStatus(jobId))
          )
        }
        this.onJobFinish(job)
        return EMPTY
      })
    )
    this.statusFetch$.subscribe()
  }

  onJobFinish(job: PublishJobStatusApiModel) {
    const done = job.status === Done
    this.wizardService.reset()
    this.router.navigate(done ? ['/', this.rootId, 'publishok'] : ['/'], {
      relativeTo: this.activatedRoute,
      queryParams: done ? {} : { error: 'publish' },
    })
  }
}
