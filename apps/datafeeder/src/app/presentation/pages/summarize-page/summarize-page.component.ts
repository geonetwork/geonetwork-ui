import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-summarize-page',
  templateUrl: './summarize-page.component.html',
  styleUrls: ['./summarize-page.component.css'],
})
export class SummarizePageComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription
  private rootId: number

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.rootId = id
    })
  }

  submit() {
    this.router.navigate(['/', this.rootId, 'publish'])
  }

  previous() {
    this.router.navigate(['/', this.rootId, 'step', 4])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
