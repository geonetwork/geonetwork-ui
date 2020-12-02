import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import { interval, Subscription } from 'rxjs'
import { finalize, take } from 'rxjs/operators'

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
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.logService.log(`id: ${id}`)
    })

    interval(250)
      .pipe(
        take(100),
        finalize(() => {
          this.router.navigate(['validation'], {
            relativeTo: this.activatedRoute,
          })
        })
      )
      .subscribe((value) => {
        this.progress = Math.floor((value * 100) / 100)
      })
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
