import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
  DatasetPublishingStatusApiModel
} from '@lib/datafeeder-api'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'


interface DatasetModel extends  DatasetPublishingStatusApiModel {
  _links: any
}
export interface JobStatusModel extends PublishJobStatusApiModel {
  jobId?: string
  progress?: number
  status?: PublishStatusEnumApiModel
  error?: string
  datasets: DatasetModel[]
}


@Component({
  selector: 'app-success-publish-page',
  templateUrl: './success-publish-page.component.html',
  styleUrls: ['./success-publish-page.component.css'],
})
export class SuccessPublishPageComponent implements OnInit, OnDestroy {
  id: string
  subscription: Subscription
  gnLink: string
  gsLink: string
  statusFetch$: Observable<PublishJobStatusApiModel>

  constructor(
    private publishService: DataPublishingApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription()
    this.statusFetch$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.publishService.getPublishingStatus(id))
    )
    this.subscription.add(
      this.statusFetch$.subscribe((job: JobStatusModel) => {
        const links = job.datasets[0]._links
        this.gsLink = links.preview.href
        this.gnLink = links.describedBy[1].href
      })
    )
  }

  openGeonetworkLink() {
    window.open(this.gnLink, '_blank')
  }

  openGeoserverLink() {
    window.open(this.gsLink, '_blank')
  }

  backToHome() {
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
