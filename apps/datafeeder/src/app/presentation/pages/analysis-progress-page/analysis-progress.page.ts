import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {LogService} from '@lib/common'
import {interval, Subscription} from 'rxjs'
import {take} from 'rxjs/operators'
import {marker} from '@biesbjerg/ngx-translate-extract-marker'

marker('datafeeder.analysisProgressBar.title')
marker('datafeeder.analysisProgressBar.subtitle')

@Component({
  selector: 'app-analysis-progress-page',
  templateUrl: './analysis-progress.page.html',
  styleUrls: ['./analysis-progress.page.css'],
})
export class AnalysisProgressPageComponent implements OnInit, OnDestroy {
  progress = 0
  private routeParamsSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.logService.log(`id: ${id}`)
    })

    interval(250)
      .pipe(take(100))
      .subscribe((value) => {
        this.progress = Math.floor((value * 100) / 100)
      })
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
