import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'

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

  constructor(
    private publishService: DataPublishingApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription()
    this.subscription.add(
      this.activatedRoute.params.subscribe(({ id }) => {
        this.id = id
        this.publishService
          .getPublishingStatus(id)
          .subscribe((job: PublishJobStatusApiModel) => {
            // FIXME links not part of OpenAPI
            const links = (job.datasets[0] as any)._links
            this.gsLink = links.preview.href
            this.gnLink = links.describedBy[1].href
          })
      })
    )
  }

  openGeonetworkLink() {
    window.open(this.gnLink, '_blank')
  }

  openGeoserverLink() {
    window.open(this.gsLink, '_blank')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
