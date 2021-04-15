import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { interval, Observable, Subscription } from 'rxjs'
import { filter, mergeMap, switchMap, take, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

const { PENDING, RUNNING, DONE } = PublishStatusEnumApiModel

@Component({
  selector: 'app-publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css'],
})
export class PublishPageComponent implements OnInit, OnDestroy {
  progress = 0
  private subscription: Subscription
  private rootId: number
  statusFetch$: Observable<PublishJobStatusApiModel>

  constructor(
    private publishService: DataPublishingApiService,
    private activatedRoute: ActivatedRoute,
    private facade: DatafeederFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription()

    this.statusFetch$ = this.activatedRoute.params.pipe(
      mergeMap(({ id }) => {
        this.rootId = id
        return interval(500).pipe(
          switchMap(() => this.publishService.getPublishingStatus(id)),
          tap((job: PublishJobStatusApiModel) =>
            this.facade.setPublication(job)
          ),
          tap(
            (job: PublishJobStatusApiModel) => (this.progress = job.progress)
          ),
          filter(
            (job: PublishJobStatusApiModel) =>
              ![PENDING, RUNNING].includes(job.status)
          ),
          take(1)
        )
      })
    )
    this.subscription.add(
      this.statusFetch$.subscribe((job: PublishJobStatusApiModel) =>
        this.onJobFinish(job)
      )
    )
  }

  onJobFinish(job: PublishJobStatusApiModel) {
    const done = job.status === DONE
    this.router.navigate(done ? ['/', this.rootId, 'publishok'] : ['/'], {
      relativeTo: this.activatedRoute,
      queryParams: done ? {} : { error: 'publish' },
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
